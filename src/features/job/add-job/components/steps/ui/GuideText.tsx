import { Stack, Typography } from "@mui/material";

import { theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  title: string;
  subtitle: string;
}

export default function GuideText({ title, subtitle }: Props) {
  const { md } = useBreakpoints();

  return (
    <Stack gap={!md ? 0 : 1} minWidth={259} width={md ? 259 : "auto"}>
      <Typography fontWeight={FontWeights.semibold} color="text.secondary">
        {title}
      </Typography>
      <Typography color={theme.palette.grey[100]}>{subtitle}</Typography>
    </Stack>
  );
}
