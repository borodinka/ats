import { useMemo } from "react";

import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

import { Colors } from "@config/styles";
import { typesOfEmployment } from "@features/job/data";
import { type EmploymentType, type Job } from "@features/job/types";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  jobs: Job[] | undefined;
}

export default function EmploymentTypeChart({ jobs }: Props) {
  const { md } = useBreakpoints();
  const employmentTypeCounts = useMemo(() => {
    const counts = typesOfEmployment.reduce<Record<EmploymentType, number>>(
      (acc, type) => {
        acc[type] = 0;
        return acc;
      },
      {} as Record<EmploymentType, number>,
    );

    if (jobs && jobs.length > 0) {
      jobs.forEach((job) => {
        job.employmentTypes.forEach((type) => {
          counts[type]++;
        });
      });
    }

    return counts;
  }, [jobs]);

  const chartData = typesOfEmployment.map((type) => ({
    type,
    count: employmentTypeCounts[type],
  }));

  return (
    <Box
      sx={{
        border: 1,
        borderColor: Colors.primaryGrey,
        pt: md ? 3 : 2,
        width: 1,
      }}
    >
      <Typography variant="h3" color="text.secondary" pl={md ? 3 : 2}>
        Job Listings by Employment Type
      </Typography>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: chartData.map((d) => d.type),
          },
        ]}
        series={[
          {
            data: chartData.map((d) => d.count),
            color: Colors.amethyst,
          },
        ]}
        height={md ? 450 : 380}
      />
    </Box>
  );
}
