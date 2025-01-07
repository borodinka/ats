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

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  id: string;
  maxValue: number;
  name: string;
  currentApplicants?: number;
}

export default function NumberInput({
  control,
  id,
  maxValue,
  name,
  currentApplicants,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) => {
          if (currentApplicants !== undefined) {
            return (
              value >= currentApplicants ||
              "Capacity can't be less than the number of applicants"
            );
          }
          return value > 0 || "Please specify the number of stages";
        },
      }}
      render={({ field: { ref, value, ...field }, fieldState }) => (
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
              aria-label="decrease value"
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
              aria-label="increase value"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <FormHelperText error={Boolean(fieldState.error)} sx={{ width: 142 }}>
            {fieldState.error?.message}
          </FormHelperText>
        </Stack>
      )}
    />
  );
}
