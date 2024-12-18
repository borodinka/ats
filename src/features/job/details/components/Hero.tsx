import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, Stack, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors } from "@config/styles";
import AppButton from "@features/ui/AppButton";
import AppDialog from "@features/ui/AppDialog";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useToast from "@hooks/useToast";

import { useDeleteJobMutation } from "../../store/jobsApi";
import type { Job } from "../../types";

interface Props {
  jobTitle: Job["title"];
  jobId: Job["id"] | undefined;
}

export default function Hero({ jobTitle, jobId }: Props) {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const { md } = useBreakpoints();
  const { showSuccessMessage } = useToast();
  const navigate = useNavigate();
  const [deleteJob] = useDeleteJobMutation();

  const onDelete = async () => {
    close();
    navigate(AppRoutes.jobs);
    await deleteJob(jobId!);
    showSuccessMessage("Job offer was successfully deleted!");
  };

  return (
    <Stack
      direction="row"
      sx={{
        p: md ? 2 : 1,
        my: 3,
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: Colors.white,
        border: 1,
        borderColor: Colors.primaryGrey,
        gap: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h1" color="text.secondary">
        {jobTitle}
      </Typography>
      <Stack direction="row" gap={md ? 4 : 2}>
        <Box
          sx={{
            width: 1.5,
            height: 50,
            bgcolor: Colors.primaryGrey,
          }}
        />
        <Stack direction="row" gap={1}>
          <AppButton onClick={open}>
            <Stack
              component="span"
              gap={1}
              alignItems="center"
              justifyContent="center"
              direction="row"
            >
              {md && "Delete"}
              <DeleteOutlineOutlinedIcon />
            </Stack>
          </AppButton>
        </Stack>
      </Stack>
      <AppDialog
        title="Are you sure you want to delete this job offer?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        isOpen={isOpen}
        onClose={close}
        onPrimaryButtonClick={onDelete}
        onSecondaryButtonClick={close}
        hideCloseButton
      />
    </Stack>
  );
}
