import { useParams } from "react-router-dom";

import { CircularProgress, Stack, Typography } from "@mui/material";

import { useGetApplicantByIdQuery } from "../store/applicantsApi";

export default function ApplicantProfile() {
  const { applicantId } = useParams();
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
    return (
      <>
        <Typography>{applicant.fullName}</Typography>
        <Typography>{applicant.email}</Typography>
      </>
    );
  } else if (isError) {
    throw error;
  }

  return null;
}
