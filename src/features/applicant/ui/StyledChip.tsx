import { Chip, type SxProps, type Theme, Typography } from "@mui/material";

import { FontWeights } from "@config/styles/FontWeights";

interface Props {
  text: string | undefined;
  color: string;
  sx?: SxProps<Theme>;
}

export default function StyledChip({ text, color, sx }: Props) {
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
        ...sx,
      }}
    />
  );
}
