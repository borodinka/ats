import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Stack, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";

import type { Applicant } from "../types";

interface Props {
  score: Applicant["score"];
}
export default function Score({ score }: Props) {
  return (
    <Stack flexDirection="row" gap={1} alignItems="center">
      {score === 0 ? (
        <StarBorderIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
      ) : (
        <StarIcon
          sx={{
            color: Colors.yellow,
            fontSize: { xs: 24, md: 28 },
          }}
        />
      )}
      <Typography color="text.secondary" fontWeight={FontWeights.medium}>
        {score?.toFixed(1)}
      </Typography>
    </Stack>
  );
}
