import { Box, Stack, Typography } from "@mui/material";

import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";

interface Props {
  value: number;
}

export default function ValueBlock({ value }: Props) {
  return (
    <Box
      sx={{
        width: 130,
        px: 2,
        py: 1.5,
        border: 1,
        borderColor: Colors.primaryGrey,
      }}
    >
      <Stack flexDirection="row">
        <Typography
          fontWeight={FontWeights.semibold}
          color={theme.palette.grey[100]}
        >
          $
        </Typography>
        <Box
          sx={{
            width: 1.2,
            bgcolor: Colors.lightGrey,
            height: 24,
            mr: 1,
            ml: 2,
          }}
        />
        <Typography fontWeight={FontWeights.semibold} color="text.secondary">
          {value}
        </Typography>
      </Stack>
    </Box>
  );
}
