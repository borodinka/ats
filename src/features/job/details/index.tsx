import { useParams } from "react-router-dom";

import {
  Breadcrumbs,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors, theme } from "@config/styles";

import { useGetJobByIdQuery, useUpdateJobMutation } from "../store/jobsApi";
import type { Job } from "../types";
import Hero from "./components/Hero";
import JobTabs from "./components/tabs/JobTabs";

export default function JobDetails() {
  const { jobId } = useParams();
  const {
    data: job,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useGetJobByIdQuery(jobId);
  const [updateJob] = useUpdateJobMutation();

  const onUpdate = (data: Partial<Job>) => {
    updateJob({ id: job!.id, data });
  };

  if (isLoading) {
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
    return (
      <Stack>
        <Stack sx={{ bgcolor: Colors.lightViolet, m: -4, p: 4, pb: 0 }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ color: theme.palette.grey[100] }}
          >
            <Link underline="hover" color="inherit" href={AppRoutes.jobs}>
              Job Listings
            </Link>
            <Typography sx={{ color: theme.palette.grey[200] }}>
              {job.title}
            </Typography>
          </Breadcrumbs>
          <Hero jobTitle={job.title} jobId={jobId} />
        </Stack>
        <JobTabs job={job} onUpdate={onUpdate} />
      </Stack>
    );
  } else if (isError) {
    throw error;
  }

  return null;
}
