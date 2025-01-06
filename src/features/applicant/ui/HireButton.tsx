import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ButtonBase, Tooltip } from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors } from "@config/styles";
import { useDeleteJobMutation } from "@features/job/store/jobsApi";
import type { Job } from "@features/job/types";
import AppDialog from "@features/ui/AppDialog";
import useToast from "@hooks/useToast";

import {
  useGetApplicantsByJobIdQuery,
  useUpdateApplicantMutation,
} from "../store/applicantsApi";
import type { Applicant } from "../types";
import StyledChip from "./StyledChip";

interface Props {
  status: Applicant["status"];
  fullName: Applicant["fullName"];
  jobId: Job["id"];
  applicantId: Applicant["id"];
  onUpdate: (data: Partial<Applicant>) => void;
}

export default function HireButton({
  status,
  onUpdate,
  fullName,
  jobId,
  applicantId,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const { showSuccessMessage } = useToast();
  const navigate = useNavigate();
  const [deleteJob] = useDeleteJobMutation();
  const { data: applicants } = useGetApplicantsByJobIdQuery(jobId);
  const [updateApplicant] = useUpdateApplicantMutation();

  const handleClick = () => {
    onUpdate({ status: "Hired" });
    showSuccessMessage(
      `${fullName} has been hired! Please remember to send the official confirmation email`,
    );

    setTimeout(() => {
      open();
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
    close();
    navigate(AppRoutes.jobs);
    await deleteJob(jobId!);
    showSuccessMessage("Job offer was successfully deleted!");
  };

  return (
    <>
      <Tooltip
        title={
          status === "Hired"
            ? "This applicant has already been hired for this position"
            : status !== "Final Decision"
              ? status === "Declined"
                ? "This applicant cannot be hired as they have been declined for this position"
                : "Hiring is only available after all stages are completed"
              : ""
        }
      >
        <span>
          <ButtonBase
            sx={{ borderRadius: 4, height: 32 }}
            disabled={status !== "Final Decision"}
            onClick={handleClick}
          >
            <StyledChip
              text="Hire"
              color={
                status === "Final Decision"
                  ? Colors.aquamarine
                  : Colors.primaryGrey
              }
              sx={{ width: 80 }}
            />
          </ButtonBase>
        </span>
      </Tooltip>
      <AppDialog
        title="Do you want to delete this job offer?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        isOpen={isOpen}
        onClose={close}
        onPrimaryButtonClick={onDelete}
        onSecondaryButtonClick={close}
        hideCloseButton
      />
    </>
  );
}
