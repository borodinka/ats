import { Box, ButtonBase, Chip, Link, Typography, alpha } from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import { useGetApplicantsByJobIdQuery } from "@features/applicant/store/applicantsApi";
import { useBreakpoints } from "@hooks/useBreakpoints";

import type { Job } from "../../types";
import ApplicationProgressBar from "../../ui/ApplicationProgressBar";
import CategoryChips from "../../ui/CategoryChips";
import { getEmploymentTypeColor } from "../../utils";

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  const { md } = useBreakpoints();
  const { data: applicants } = useGetApplicantsByJobIdQuery(job.id);

  const currentApplicants = applicants?.length ?? 0;

  return (
    <ButtonBase
      component={Link}
      href={`${AppRoutes.jobs}/${job.id}`}
      sx={{
        display: "block",
        textAlign: "inherit",
        width: 1,
        height: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: 1.5,
          borderColor: Colors.primaryGrey,
          p: 3,
          minHeight: md ? 300 : "auto",
          height: 1,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              flexWrap: "wrap",
              justifyContent: "flex-end",
              mb: 2.5,
            }}
          >
            {job.employmentTypes.map((type) => {
              const color = getEmploymentTypeColor(type);
              return (
                <Chip
                  key={type}
                  label={
                    <Typography
                      variant="subtitle1"
                      color={color}
                      fontWeight={FontWeights.semibold}
                    >
                      {type}
                    </Typography>
                  }
                  sx={{
                    backgroundColor: alpha(color, 0.1),
                  }}
                />
              );
            })}
          </Box>
          <Typography variant="h4" color="text.secondary">
            {job.title}
          </Typography>
          <CategoryChips categories={job.categories} />
        </Box>
        <Box sx={{ marginTop: "auto" }}>
          <ApplicationProgressBar
            capacity={job.capacity}
            currentApplicants={currentApplicants}
          />
        </Box>
      </Box>
    </ButtonBase>
  );
}
