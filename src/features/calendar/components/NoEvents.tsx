import { Stack, Typography } from "@mui/material";

import { useBreakpoints } from "@hooks/useBreakpoints";

import NoEventsImage from "../assets/no-events.png";

export default function NoEvents() {
  const { md } = useBreakpoints();

  return (
    <Stack>
      <img
        src={NoEventsImage}
        alt="Girl with scheduler"
        style={{
          display: "block",
          width: !md ? 330 : 400,
        }}
      />
      <Stack gap={2} textAlign="center">
        <Typography variant="h2" color="text.secondary">
          No events here
        </Typography>
        <Typography>Schedule an interview to get started!</Typography>
      </Stack>
    </Stack>
  );
}
