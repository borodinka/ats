import { ref, uploadBytesResumable } from "firebase/storage";
import { useRef, useState } from "react";
import {
  Controller,
  type FieldErrors,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

import { FormHelperText, Stack } from "@mui/material";

import { selectUser } from "@features/auth/store/authSlice";
import AppDialog from "@features/ui/AppDialog";
import useToast from "@hooks/useToast";
import { storage } from "@services/firebase";
import { useAppSelector } from "@store/index";

import { type FileUpload, type ResumeFile } from "../../../../types";
import ResumeCard from "./ResumeCard";
import UploadButton from "./UploadButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  applicantId: string;
}

interface FormInput {
  resume: FileUpload | null;
}

export default function ResumeUploadDialog({
  isOpen,
  onClose,
  applicantId,
}: Props) {
  const {
    inputRef,
    handleSubmit,
    control,
    onSubmit,
    onInputChange,
    onRemove,
    resume,
    uploadProgress,
    uploadError,
    onValidate,
  } = useResumeForm({ applicantId });

  return (
    <AppDialog
      title="Upload candidate's resume"
      isOpen={isOpen}
      onClose={onClose}
      primaryButtonText="Save"
      onPrimaryButtonClick={handleSubmit(onSubmit, onValidate)}
    >
      <Stack component="form" alignItems="center">
        {resume ? (
          <>
            <ResumeCard
              name={resume.fileName}
              url={resume.url}
              onRemove={onRemove}
              uploadProgress={uploadProgress}
            />
            {uploadError && (
              <FormHelperText error sx={{ mt: 1 }}>
                {uploadError}
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

function useResumeForm({ applicantId }: Pick<Props, "applicantId">) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { handleSubmit, control, watch, setValue } = useForm<FormInput>({
    defaultValues: {
      resume: null,
    },
  });
  const { uploadResume, uploadProgress, uploadError } = useResumeUpload();
  const { showErrorMessage } = useToast();

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

  const onRemove = () => {
    setValue("resume", null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const resume = watch("resume");

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    uploadResume(data.resume!, applicantId);
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
    onRemove,
    resume,
    onSubmit,
    uploadProgress,
    uploadError,
    onValidate,
  };
}

function useResumeUpload() {
  const [state, setState] = useState<{
    uploadProgress: number | undefined;
    uploadError: string;
    uploadedFile: ResumeFile | null;
  }>({ uploadProgress: 0, uploadError: "", uploadedFile: null });
  const user = useAppSelector(selectUser);

  const uploadResume = (file: FileUpload, applicantId: string) => {
    if (!file?.file) {
      return;
    }

    const storageRef = ref(
      storage,
      `applicants-data/${user?.uid}/${applicantId}/${file.fileName}`,
    );

    const uploadTask = uploadBytesResumable(storageRef, file.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setState((prevState) => {
          return { ...prevState, uploadProgress: progress };
        });
      },
      (error) => {
        setState((prevState) => {
          return {
            ...prevState,
            uploadProgress: undefined,
            uploadError: `Oops! Something went wrong: ${error.message}`,
          };
        });
      },
      () => {
        setState((prevState) => ({
          ...prevState,
          uploadProgress: undefined,
          uploadError: "",
          uploadedFile: {
            fileName: file.fileName,
            storagePath: uploadTask.snapshot.ref.fullPath,
          },
        }));
      },
    );
  };

  return { ...state, uploadResume };
}
