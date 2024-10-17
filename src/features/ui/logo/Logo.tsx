import { Box, Typography } from "@mui/material";

import LogoIcon from "./logo.svg";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 1,
      }}
    >
      <LogoIcon />
      <Typography variant="h2" color="text.secondary">
        HireWise
      </Typography>
    </Box>
  );
}
