import { CircularProgress, Stack } from "@mui/material";

import NoApplicants from "@features/applicant/components/NoApplicants";
import { useGetApplicantsByJobIdQuery } from "@features/applicant/store/applicantsApi";
import ApplicantsTable from "@features/applicant/ui/ApplicantsTable";

import type { Job } from "../../../../types";

interface Props {
  jobId: Job["id"];
}

export default function ApplicantList({ jobId }: Props) {
  const {
    data: applicants,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useGetApplicantsByJobIdQuery(jobId);

  if (isLoading) {
    return (
      <Stack height="30vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess && applicants.length > 0) {
    return <ApplicantsTable applicants={applicants} isJobView jobId={jobId} />;
  } else if (isSuccess && applicants.length === 0) {
    return (
      <Stack
        alignItems="center"
        justifyContent={{ xs: "flex-start", md: "center" }}
        height="70%"
      >
        <NoApplicants isJobView />
      </Stack>
    );
  } else if (isError) {
    throw error;
  }

  return null;
}
