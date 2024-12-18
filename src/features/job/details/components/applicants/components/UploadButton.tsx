import AddIcon from "@mui/icons-material/Add";
import { Box, ButtonBase, Typography } from "@mui/material";

import { Colors } from "@config/styles";

interface Props {
  onClick: () => void;
}

export default function UploadButton({ onClick }: Props) {
  return (
    <Box
      sx={{ width: { xs: 160, md: 200 }, height: { xs: 220, md: 260 } }}
      onClick={onClick}
    >
      <ButtonBase
        sx={{
          bgcolor: Colors.lavender,
          display: "flex",
          gap: 1,
          flexDirection: "column",
          color: "primary.main",
          borderRadius: 3,
          height: "100%",
          width: "100%",
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23A8ADB7FF' stroke-width='4' stroke-dasharray='15%2c 12' stroke-dashoffset='38' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
      >
        <AddIcon fontSize="large" />
        <Typography variant="body2">Upload file</Typography>
        <Typography color="text.secondary" variant="subtitle1">
          .pdf
        </Typography>
      </ButtonBase>
    </Box>
  );
}
