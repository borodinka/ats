import { Box, LinearProgress, Typography } from "@mui/material";

import { Colors, theme } from "@config/styles";

import type { Job } from "../types";

interface Props {
  capacity: Job["capacity"];
  currentApplicants: number;
  background?: boolean;
}

export default function ApplicationProgressBar({
  capacity,
  currentApplicants,
  background,
}: Props) {
  const progress = (currentApplicants / capacity) * 100;

  return (
    <Box
      sx={{
        bgcolor: background ? Colors.lightViolet : "inherit",
        p: background ? 2 : 0,
        display: "flex",
        flexDirection: background ? "column-reverse" : "column",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          mb: 1,
          mt: !background ? 3 : 1,
          height: 6,
          backgroundColor: Colors.primaryGrey,
          "& .MuiLinearProgress-bar": {
            backgroundColor: Colors.aquamarine,
          },
        }}
      />
      <Box display="flex" gap={0.5} flexWrap="wrap">
        <Typography variant="subtitle2" whiteSpace="nowrap">
          {currentApplicants} applied
        </Typography>
        <Typography
          variant="subtitle1"
          color={theme.palette.grey[100]}
          whiteSpace="nowrap"
        >
          of {capacity} capacity
        </Typography>
      </Box>
    </Box>
  );
}
