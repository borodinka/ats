import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EastIcon from "@mui/icons-material/East";
import { MobileStepper, Stack } from "@mui/material";

import { AppRoutes } from "@config/routes";
import { useDeleteJobMutation } from "@features/job/store/jobsApi";
import type { Job } from "@features/job/types";
import AppButton from "@features/ui/AppButton";
import AppDialog from "@features/ui/AppDialog";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useToast from "@hooks/useToast";

import {
  useGetApplicantsByJobIdQuery,
  useUpdateApplicantMutation,
} from "../../store/applicantsApi";
import type { Applicant } from "../../types";
import AgreementImage from "./assets/agreement.png";

interface Props {
  stages: Applicant["stages"];
  currentStage: Applicant["currentStage"];
  handleBack: () => void;
  handleNext: () => void;
  isLoading: boolean;
  viewStage: number;
  onSubmit: () => void;
  status: Applicant["status"];
  fullName: Applicant["fullName"];
  jobId: Job["id"];
  applicantId: Applicant["id"];
  onUpdate: (data: Partial<Applicant>) => void;
}

export default function Pagination({
  stages,
  currentStage,
  handleBack,
  handleNext,
  isLoading,
  viewStage,
  onSubmit,
  status,
  fullName,
  jobId,
  applicantId,
  onUpdate,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const [isSecondOpen, setSecondOpen] = useState(false);
  const openSecond = () => setSecondOpen(true);
  const closeSecond = () => setSecondOpen(false);
  const { md } = useBreakpoints();
  const { showSuccessMessage } = useToast();
  const [deleteJob] = useDeleteJobMutation();
  const { data: applicants } = useGetApplicantsByJobIdQuery(jobId);
  const [updateApplicant] = useUpdateApplicantMutation();
  const navigate = useNavigate();

  const isLastStage = viewStage === stages.length - 1;
  const isAtCurrentStage = viewStage === currentStage;

  const handleNextClick = () => {
    if (isAtCurrentStage) {
      onSubmit();
      if (isLastStage) {
        open();
      } else {
        handleNext();
      }
    } else {
      handleNext();
    }
  };

  const handleHireClick = () => {
    close();
    onUpdate({ status: "Hired" });
    showSuccessMessage(
      `${fullName} has been hired! Please remember to send the official confirmation email`,
    );

    setTimeout(() => {
      openSecond();
    }, 1300);
  };

  const updatedDataForAll: Partial<Applicant> = {
    jobId: null,
    stages: [],
    score: 0,
    currentStage: 0,
  };

  const onDelete = async () => {
    if (applicants) {
      applicants.forEach((applicant) => {
        const updatedApplicantData: Partial<Applicant> = {
          ...updatedDataForAll,
          status: "Declined",
          declineReason: !applicant.declineReason
            ? "The other candidate was a better fit for the job requirements"
            : applicant.declineReason,
        };

        if (applicant.id !== applicantId) {
          updateApplicant({
            id: applicant.id,
            data: updatedApplicantData,
          });
        } else {
          onUpdate(updatedDataForAll);
        }
      });
    }
    closeSecond();
    navigate(AppRoutes.jobs);
    await deleteJob(jobId!);
    showSuccessMessage("Job offer was successfully deleted!");
  };

  return (
    <>
      <MobileStepper
        variant="dots"
        steps={stages.length}
        position="static"
        activeStep={viewStage}
        nextButton={
          <AppButton
            type={viewStage === currentStage ? "submit" : "button"}
            loading={isLoading}
            onClick={handleNextClick}
            sx={{
              visibility:
                viewStage >= currentStage && status !== "Interview"
                  ? "hidden"
                  : "visible",
            }}
          >
            {viewStage < currentStage ? (
              <Stack alignItems="center">
                <EastIcon />
              </Stack>
            ) : isLastStage ? (
              "Finish"
            ) : (
              "Move To Next Step"
            )}
          </AppButton>
        }
        backButton={
          <AppButton
            variant="outlined"
            sx={{
              visibility: viewStage === 0 ? "hidden" : "visible",
            }}
            onClick={handleBack}
          >
            <Stack alignItems="center" sx={{ transform: "scaleX(-1)" }}>
              <EastIcon />
            </Stack>
          </AppButton>
        }
        sx={{
          ".MuiMobileStepper-dots": {
            visibility: "hidden",
          },
          px: 0,
        }}
      />
      {isOpen && (
        <AppDialog
          title="All stages are complete. Do you want to hire this applicant now?"
          primaryButtonText="Yes"
          secondaryButtonText="No"
          isOpen={isOpen}
          onClose={close}
          onPrimaryButtonClick={handleHireClick}
          onSecondaryButtonClick={() => {
            onUpdate({ status: "Final Decision" });
            close();
          }}
          hideCloseButton
        >
          <Stack alignItems="center">
            <img
              src={AgreementImage}
              alt="Hand shake"
              style={{ width: md ? 260 : 220 }}
            />
          </Stack>
        </AppDialog>
      )}
      <AppDialog
        title="Do you want to delete this job offer?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        isOpen={isSecondOpen}
        onClose={closeSecond}
        onPrimaryButtonClick={onDelete}
        onSecondaryButtonClick={closeSecond}
        hideCloseButton
      />
    </>
  );
}
