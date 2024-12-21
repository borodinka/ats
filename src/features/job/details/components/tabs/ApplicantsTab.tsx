import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";

import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

import type { Job } from "../../../types";
import ResumeUploadDialog from "../applicants/components/ResumeUploadDialog";

interface Props {
  jobId: Job["id"];
  recruitmentStages: Job["stages"];
}

export default function ApplicantsTab({ jobId, recruitmentStages }: Props) {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const { md } = useBreakpoints();

  return (
    <Stack gap={2}>
      <AppButton
        variant="outlined"
        onClick={open}
        sx={{ alignSelf: "flex-end" }}
      >
        <Stack
          component="span"
          gap={1}
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <AddIcon /> {md && "Add"}
        </Stack>
      </AppButton>
      <ResumeUploadDialog
        isOpen={isOpen}
        onClose={close}
        jobId={jobId}
        recruitmentStages={recruitmentStages}
      />
    </Stack>
  );
}
