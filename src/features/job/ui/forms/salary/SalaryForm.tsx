import { type Control, Controller } from "react-hook-form";

import { Box, FormHelperText, Slider, Stack, Typography } from "@mui/material";

import { theme } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import ValueBlock from "./ValueBlock";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  isWizard?: boolean;
}

export default function SalaryForm({ control, isWizard }: Props) {
  const { md } = useBreakpoints();
  return (
    <Controller
      name="salary"
      control={control}
      rules={{
        validate: (value) =>
          (value?.[0] > 0 && value?.[1] > 0 && value?.[0] < value?.[1]) ||
          "Please select a valid salary range",
      }}
      render={({ field: { value, ...field }, fieldState }) => (
        <Stack flexShrink={1} flexBasis={isWizard ? (md ? 446 : 1) : undefined}>
          <Box
            display="flex"
            justifyContent={md ? "space-around" : "space-between"}
            mb={2.5}
            alignItems="center"
          >
            <ValueBlock value={value[0]} />
            <Typography color={theme.palette.grey[100]}>to</Typography>
            <ValueBlock value={value[1]} />
          </Box>
          <Slider
            id="salary"
            value={value}
            onChange={field.onChange}
            min={0}
            max={150000}
            step={1000}
            sx={{
              ".MuiSlider-rail": {
                opacity: 0.1,
              },
              height: 6,
            }}
          />
          <FormHelperText error={Boolean(fieldState.error)}>
            {fieldState.error?.message}
          </FormHelperText>
        </Stack>
      )}
    />
  );
}
