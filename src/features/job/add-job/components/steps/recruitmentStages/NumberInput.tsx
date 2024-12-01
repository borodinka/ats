import { type Control, Controller } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { Colors, theme } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import GuideText from "../ui/GuideText";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  title: string;
  subtitle: string;
  id: string;
  maxValue: number;
  name: string;
}

export default function NumberInput({
  control,
  title,
  subtitle,
  id,
  maxValue,
  name,
}: Props) {
  const { md } = useBreakpoints();
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) => value > 0 || "Please specify number of stages",
      }}
      render={({ field: { ref, value, ...field }, fieldState }) => (
        <Box
          sx={{
            display: "flex",
            gap: !md ? 2 : 15,
            flexDirection: !md ? "column" : "row",
          }}
        >
          <GuideText title={title} subtitle={subtitle} />
          <Stack id={id} ref={ref}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: 142,
                border: 1.5,
                borderColor: fieldState.error ? Colors.red : Colors.primaryGrey,
              }}
            >
              <IconButton
                onClick={() => field.onChange(Math.max(value - 1, 1))}
                disabled={value <= 1}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography color="text.secondary">{value}</Typography>
              <IconButton
                onClick={() => field.onChange(Math.min(value + 1, maxValue))}
                disabled={value >= maxValue}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <FormHelperText error={Boolean(fieldState.error)}>
              {fieldState.error?.message}
            </FormHelperText>
          </Stack>
        </Box>
      )}
    />
  );
}
