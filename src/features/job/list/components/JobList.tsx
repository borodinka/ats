import { CircularProgress, Grid, Stack, Typography } from "@mui/material";

import { useGetJobsQuery } from "../../store/jobsApi";
import JobCard from "./JobCard";
import NoJobs from "./NoJobs";

export default function JobList() {
  const {
    data: jobs,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useGetJobsQuery();

  if (isLoading) {
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess && jobs.length > 0) {
    return (
      <Stack gap={4}>
        <Typography variant="h1" color="text.secondary">
          All Job Offers
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            overflowY: "scroll",
            maxHeight: { xs: "68vh", md: "78vh" },
            minHeight: "auto",
          }}
        >
          {jobs?.map((job) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
              <JobCard job={job} currentApplicants={4} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    );
  } else if (isSuccess && jobs.length === 0) {
    return (
      <Stack
        alignItems="center"
        justifyContent={{ xs: "flex-start", md: "center" }}
        height="70%"
      >
        <NoJobs />
      </Stack>
    );
  } else if (isError) {
    throw error;
  }

  return null;
}
