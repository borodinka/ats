import { Box, Stack, Typography } from "@mui/material";

import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";

interface Props {
  date: Date;
  label: string;
  isWeekView: boolean;
}

export default function DayHeader({ date, label, isWeekView }: Props) {
  const day = date.getDate();
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  return (
    <Stack py={1}>
      <Typography
        variant="subtitle1"
        fontWeight={FontWeights.semibold}
        color={theme.palette.grey[100]}
        textTransform="uppercase"
      >
        {label}
      </Typography>
      {isWeekView && (
        <Box
          sx={{
            bgcolor: isToday ? theme.palette.primary.main : "transparent",
            width: { xs: 38, md: 44 },
            height: { xs: 38, md: 44 },
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: { xs: -0.5, md: 0 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight={FontWeights.semibold}
            color={isToday ? Colors.white : "text.secondary"}
          >
            {day}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
