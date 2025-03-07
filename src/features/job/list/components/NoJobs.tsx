import { Stack, Typography } from "@mui/material";

import { useBreakpoints } from "@hooks/useBreakpoints";

import NoDataImage from "../assets/no-data.png";

export default function NoJobs() {
  const { md } = useBreakpoints();

  return (
    <Stack>
      <img
        src={NoDataImage}
        alt="Empty clipboards"
        style={{ display: "block", width: !md ? 330 : 400 }}
      />
      <Stack gap={2} textAlign="center">
        <Typography variant="h2" color="text.secondary">
          No job offers here
        </Typography>
        <Typography>Create one to get started!</Typography>
      </Stack>
    </Stack>
  );
}
