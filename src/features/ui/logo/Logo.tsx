import { Box, Typography } from "@mui/material";

import LogoIcon from "./logo.svg";

interface Props {
  isMinimized?: boolean;
  onClick?: () => void;
}

export default function Logo({ isMinimized, onClick }: Props) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <LogoIcon />
      {!isMinimized && (
        <Typography variant="h2" color="text.secondary">
          HireWise
        </Typography>
      )}
    </Box>
  );
}
