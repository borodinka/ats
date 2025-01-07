import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import type { Job } from "@features/job/types";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  jobs: Job[] | undefined;
}

export default function JobStatusChart({ jobs }: Props) {
  const { md } = useBreakpoints();
  const activeJobsCount =
    jobs?.filter(
      (job) => job.applicantsNumber !== undefined && job.applicantsNumber > 0,
    ).length ?? 0;

  const fullJobsCount =
    jobs?.filter((job) => job.applicantsNumber === job.capacity).length ?? 0;

  const emptyJobsCount =
    jobs?.filter((job) => job.applicantsNumber === 0).length ?? 0;

  const jobStatusData = [
    { label: "With Applicants", value: activeJobsCount },
    { label: "Fully Filled", value: fullJobsCount },
    { label: "No Applicants", value: emptyJobsCount },
  ];

  const jobsCount = jobs?.length ?? 0;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: Colors.primaryGrey,
        p: { xs: 2, md: 3 },
        width: 1,
      }}
    >
      <Typography variant="h3" color="text.secondary">
        Job Offers Summary
      </Typography>
      <Stack flexDirection="row" gap={1} mt={4} mb={1.5}>
        <Typography
          sx={{ fontSize: { xs: "2.7rem", sm: "3.5rem" } }}
          color="text.secondary"
          fontWeight={FontWeights.semibold}
        >
          {jobsCount}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={FontWeights.regular}
          color={theme.palette.grey[100]}
          mt={1}
        >
          Job Offers
        </Typography>
      </Stack>
      <PieChart
        series={[
          {
            data: jobStatusData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: {
              innerRadius: 20,
              additionalRadius: -20,
              color: `${Colors.primaryGrey}`,
            },
            valueFormatter: (value) => `${value.value}`,
            paddingAngle: 0.5,
            cornerRadius: 5,
            cx: md ? 95 : 65,
          },
        ]}
        colors={[`${Colors.orange}`, `${Colors.pink}`, `${Colors.tomato}`]}
        height={md ? 200 : 150}
      />
    </Box>
  );
}
