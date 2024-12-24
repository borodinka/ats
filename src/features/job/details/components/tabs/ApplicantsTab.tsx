import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";

import { useGetApplicantsByJobIdQuery } from "@features/applicant/store/applicantsApi";
import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

import type { Job } from "../../../types";
import ApplicantList from "../applicants/components/ApplicantList";
import ResumeUploadDialog from "../applicants/components/ResumeUploadDialog";

interface Props {
  jobId: Job["id"];
  jobTitle: Job["title"];
  recruitmentStages: Job["stages"];
  capacity: Job["capacity"];
}

export default function ApplicantsTab({
  jobId,
  jobTitle,
  recruitmentStages,
  capacity,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const { md } = useBreakpoints();
  const { data: applicants } = useGetApplicantsByJobIdQuery(jobId);

  const currentApplicants = applicants?.length ?? 0;

  return (
    <Stack gap={2}>
      <AppButton
        variant="outlined"
        onClick={open}
        disabled={currentApplicants >= capacity}
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
        jobTitle={jobTitle}
        recruitmentStages={recruitmentStages}
      />
      <ApplicantList jobId={jobId} />
    </Stack>
  );
}
