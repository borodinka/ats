import { Chip, Typography } from "@mui/material";

import { FontWeights } from "@config/styles/FontWeights";

interface Props {
  text: string | undefined;
  color: string;
}

export default function StyledChip({ text, color }: Props) {
  return (
    <Chip
      label={
        <Typography
          variant="subtitle1"
          color={color}
          fontWeight={FontWeights.semibold}
        >
          {text}
        </Typography>
      }
      sx={{
        border: 1.5,
        borderColor: color,
        backgroundColor: "transparent",
      }}
    />
  );
}
