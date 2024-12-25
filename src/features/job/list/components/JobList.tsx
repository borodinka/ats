import { CircularProgress, Grid, Stack, Typography } from "@mui/material";

import { Colors } from "@config/styles";

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
        <Stack
          sx={{
            gap: 1,
            width: 1,
            position: "fixed",
            bgcolor: Colors.white,
            zIndex: 1,
            pt: 3.2,
            mt: -3.2,
            pb: { xs: 1, md: 2 },
          }}
        >
          <Typography variant="h1" color="text.secondary">
            All Job Offers
          </Typography>
          <Typography color="text.secondary">
            Showing {jobs.length} {jobs.length === 1 ? "result" : "results"}
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ pb: 5, pt: { xs: 10, md: 12 } }}>
          {jobs?.map((job) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
              <JobCard job={job} />
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
