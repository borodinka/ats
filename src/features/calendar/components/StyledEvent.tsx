import { Stack, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  title: string;
  time: string;
  bgColor: string;
  isDayView: boolean;
}

export default function StyledEvent({
  title,
  time,
  bgColor,
  isDayView,
}: Props) {
  const { md } = useBreakpoints();
  const MOBILE_STYLES = {
    overflow: !md && !isDayView ? "hidden" : "visible",
    whiteSpace: !md && !isDayView ? "nowrap" : "normal",
    textOverflow: !md && !isDayView ? "ellipsis" : "clip",
  };

  return (
    <Stack
      sx={{
        bgcolor: bgColor,
        width: "95%",
        height: 1,
        pt: 1,
        px: 1,
        color: Colors.white,
        overflow: "hidden",
        gap: 0.5,
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={FontWeights.medium}
        sx={MOBILE_STYLES}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={MOBILE_STYLES}>
        {time}
      </Typography>
    </Stack>
  );
}
