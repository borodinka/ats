import { Box } from "@mui/material";

import { Colors } from "@config/styles";

export default function Divider() {
  return (
    <Box
      sx={{
        height: "1px",
        bgcolor: Colors.primaryGrey,
        width: "100%",
      }}
    />
  );
}
