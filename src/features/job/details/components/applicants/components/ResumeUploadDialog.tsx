import { useEffect, useRef, useState } from "react";
import {
  Controller,
  type FieldErrors,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { FormHelperText, Stack } from "@mui/material";

import {
  useAddApplicantMutation,
  useGetApplicantsByJobIdQuery,
  useGetApplicantsQuery,
  useUpdateApplicantMutation,
} from "@features/applicant/store/applicantsApi";
import { type Applicant, type FileUpload } from "@features/applicant/types";
import AppDialog from "@features/ui/AppDialog";
import useToast from "@hooks/useToast";

import type { Job } from "../../../../types";
import {
  extractTextFromPDF,
  getStructuredDataFromPDF,
  useResumeUpload,
} from "../utils";
import ResumeCard from "./ResumeCard";
import UploadButton from "./UploadButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  jobId: Job["id"];
  jobTitle: Job["title"];
  recruitmentStages: Job["stages"];
}

interface FormInput {
  resume: FileUpload | null;
}

export default function ResumeUploadDialog({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  recruitmentStages,
}: Props) {
  const {
    inputRef,
    handleSubmit,
    control,
    onSubmit,
    onInputChange,
    onReset,
    resume,
    uploadProgress,
    onValidate,
    isLoading,
    loadingMessage,
  } = useResumeForm({ jobId, jobTitle, recruitmentStages, onClose });

  useEffect(() => {
    if (!isOpen) {
      onReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <AppDialog
      title="Upload candidate's resume"
      isOpen={isOpen}
      onClose={onClose}
      primaryButtonText="Save"
      onPrimaryButtonClick={handleSubmit(onSubmit, onValidate)}
      isLoading={isLoading}
    >
      <Stack component="form" alignItems="center">
        {resume ? (
          <>
            <ResumeCard
              name={resume.fileName}
              url={resume.url}
              onRemove={onReset}
              uploadProgress={uploadProgress}
            />
            {loadingMessage && (
              <FormHelperText sx={{ mt: 1, textAlign: "center" }}>
                {loadingMessage}
              </FormHelperText>
            )}
          </>
        ) : (
          <UploadButton onClick={() => inputRef.current?.click()} />
        )}
        <Controller
          name="resume"
          control={control}
          rules={{
            required: "Please upload file",
          }}
          render={({ field }) => (
            <input
              id="resumeInput"
              ref={inputRef}
              type="file"
              hidden
              accept=".pdf"
              onChange={(event) => onInputChange(event, field.onChange)}
            />
          )}
        />
      </Stack>
    </AppDialog>
  );
}

function useResumeForm({
  jobId,
  jobTitle,
  recruitmentStages,
  onClose,
}: Pick<Props, "jobId" | "jobTitle" | "recruitmentStages" | "onClose">) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { handleSubmit, control, watch, setValue } = useForm<FormInput>({
    defaultValues: {
      resume: null,
    },
  });
  const { uploadResume, uploadProgress } = useResumeUpload();
  const { showSuccessMessage, showErrorMessage } = useToast();
  const [addApplicant, { isLoading }] = useAddApplicantMutation();
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const { data: applicants } = useGetApplicantsByJobIdQuery(jobId);
  const { data: allApplicants } = useGetApplicantsQuery();
  const [updateApplicant] = useUpdateApplicantMutation();

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (newFile: FileUpload) => void,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onChange({
      fileName: file?.name,
      url: URL.createObjectURL(file),
      file,
    });
  };

  const onReset = () => {
    setValue("resume", null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const resume = watch("resume");
  const stages: Applicant["stages"] = recruitmentStages.map((stage) => ({
    ...stage,
    feedback: "",
  }));

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!data.resume || isLoading) {
      return;
    }

    setLoadingMessage("Extracting text from resume...");
    try {
      const text = await extractTextFromPDF(data.resume.file!);
      if (!text) {
        showErrorMessage("Failed to extract text from the resume");
        onClose();
        return;
      }

      setLoadingMessage("Processing structured data...");
      const structuredData = await getStructuredDataFromPDF(text);
      if (
        !structuredData ||
        !structuredData.fullName ||
        !structuredData.email ||
        !structuredData.jobRole
      ) {
        showErrorMessage("The uploaded file is not a valid resume");
        onClose();
        return;
      }

      if (structuredData.jobRole.toLowerCase() !== jobTitle.toLowerCase()) {
        showErrorMessage(
          "The job role in the resume does not match the job offer",
        );
        onClose();
        return;
      }

      const alreadyApplied = applicants?.some(
        (applicant) => applicant.email === structuredData.email,
      );

      if (alreadyApplied) {
        showErrorMessage(
          "This applicant already exists. Please upload a different resume",
        );
        onClose();
        return;
      }

      const existingApplicant = allApplicants?.find(
        (applicant) =>
          applicant.email === structuredData.email &&
          applicant.jobRole === jobTitle.toLowerCase(),
      );

      if (existingApplicant) {
        const updatedFields: Partial<Applicant> = {
          jobId: jobId,
          score: 0,
          status: "Interview",
          declineReason: null,
          stages: stages,
          currentStage: stages[0],
        };

        setLoadingMessage("Adding applicant to the database...");

        const updateResult = await updateApplicant({
          id: existingApplicant.id,
          data: updatedFields,
        });

        if (!updateResult) {
          showErrorMessage("Failed to add the applicant");
          onClose();
          return;
        }

        showSuccessMessage("Applicant added successfully!");
        onClose();
        return;
      }

      setLoadingMessage("Uploading file...");
      const uploadedFile = await uploadResume(
        data.resume,
        structuredData.jobRole,
      );
      if (!uploadedFile) {
        onClose();
        return;
      }

      setLoadingMessage("Adding applicant to the database...");
      const applicant: Applicant = {
        id: uuidv4(),
        fullName: structuredData.fullName,
        email: structuredData.email,
        phone: structuredData.phone,
        address: structuredData.address,
        aboutMe: structuredData.aboutMe,
        education: structuredData.education,
        yearsOfExperience: structuredData.yearsOfExperience,
        resume: uploadedFile,
        jobRole: structuredData.jobRole.toLowerCase(),
        jobId: jobId,
        stages: stages,
        currentStage: stages[0],
        score: 0,
        status: "Interview",
        declineReason: null,
      };

      const result = await addApplicant(applicant);

      if ("error" in result) {
        showErrorMessage("Failed to add a new applicant");
        onClose();
        return;
      }

      showSuccessMessage("Applicant added successfully!");
      onClose();
    } catch (error) {
      const typedError = error as { message: string };
      showErrorMessage(typedError.message || "An unexpected error occurred");
    } finally {
      setLoadingMessage(null);
    }
  };

  const onValidate = (errors: FieldErrors<FormInput>) => {
    if (errors.resume && errors.resume.message) {
      showErrorMessage(errors.resume.message);
    }
  };

  return {
    inputRef,
    handleSubmit,
    control,
    onInputChange,
    onReset,
    resume,
    onSubmit,
    uploadProgress,
    onValidate,
    isLoading,
    loadingMessage,
  };
}
