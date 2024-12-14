import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, Stack, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

import type { Job } from "../../types";

interface Props {
  jobTitle: Job["title"];
  onDelete: () => void;
}

export default function Hero({ jobTitle, onDelete }: Props) {
  const { md } = useBreakpoints();
  return (
    <Stack
      direction="row"
      sx={{
        p: md ? 2 : 1,
        my: 3,
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: Colors.white,
        border: 1,
        borderColor: Colors.primaryGrey,
        gap: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h1" color="text.secondary">
        {jobTitle}
      </Typography>
      <Stack direction="row" gap={md ? 4 : 2}>
        <Box
          sx={{
            width: 1.5,
            height: 50,
            bgcolor: Colors.primaryGrey,
          }}
        />
        <Stack direction="row" gap={1}>
          <AppButton onClick={onDelete}>
            <Stack
              component="span"
              gap={1}
              alignItems="center"
              justifyContent="center"
              direction="row"
            >
              {md && "Delete"}
              <DeleteOutlineOutlinedIcon />
            </Stack>
          </AppButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
