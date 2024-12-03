import { Grid, Stack, Typography } from "@mui/material";

import { jobs } from "../data";
import JobCard from "./JobCard";

export default function JobList() {
  return (
    <Stack gap={4}>
      <Typography variant="h1" color="text.secondary">
        All Jobs
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          overflowY: "scroll",
          maxHeight: "68vh",
          minHeight: "auto",
        }}
      >
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
            <JobCard
              jobTitle={job.jobTitle}
              typesOfEmployment={job.typesOfEmployment}
              categories={job.categories}
              capacity={job.capacity}
              currentApplicants={job.currentApplicants}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
