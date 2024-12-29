import { useState } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";

import useToast from "@hooks/useToast";
import { removeFileFromStorage } from "@services/firebase/helpers/removeFileFromStorage";

import {
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
} from "../store/applicantsApi";
import { type Applicant, type ResumeFile } from "../types";

interface Props {
  isJobView?: boolean;
  applicantId: Applicant["id"];
  resumePath: ResumeFile["storagePath"];
  declineReason: Applicant["declineReason"];
}

export default function DotsMenu({
  isJobView,
  applicantId,
  resumePath,
  declineReason,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [updateApplicant] = useUpdateApplicantMutation();
  const [deleteApplicant] = useDeleteApplicantMutation();
  const { showSuccessMessage } = useToast();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (isJobView) {
      const updatedData: Partial<Applicant> = {
        jobId: null,
        status: "Declined",
        stages: [],
        score: 0,
        currentStage: 0,
        declineReason:
          declineReason ?? "The candidate didn't match the job requirements",
      };

      await updateApplicant({ id: applicantId, data: updatedData });
      showSuccessMessage(
        "Applicant was successfully removed from the job offer!",
      );
    } else {
      await deleteApplicant(applicantId!);
      await removeFileFromStorage(resumePath);
      showSuccessMessage("Applicant was successfully removed!");
    }
  };

  return (
    <div>
      <IconButton
        aria-label="open menu to remove applicant"
        onClick={handleClick}
      >
        <MoreHorizIcon sx={{ color: "text.secondary" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
