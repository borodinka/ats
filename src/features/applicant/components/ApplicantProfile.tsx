import { useParams } from "react-router-dom";

import { CircularProgress, Stack } from "@mui/material";

import { useGetApplicantByIdQuery } from "../store/applicantsApi";
import ApplicantOverview from "./ApplicantOverview";

export default function ApplicantProfile() {
  const { jobId, applicantId } = useParams();
  const {
    data: applicant,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useGetApplicantByIdQuery(applicantId);

  if (isLoading) {
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
    return <ApplicantOverview applicant={applicant} jobId={jobId!} />;
  } else if (isError) {
    throw error;
  }

  return null;
}
