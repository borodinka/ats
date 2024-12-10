import { useParams } from "react-router-dom";

import { CircularProgress, Stack } from "@mui/material";

import { useGetJobByIdQuery } from "../store/jobsApi";

export default function JobDetails() {
  const { jobId } = useParams();
  const {
    data: job,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useGetJobByIdQuery(jobId);

  if (isLoading) {
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
    return <>{job.title}</>;
  } else if (isError) {
    throw error;
  }

  return null;
}
