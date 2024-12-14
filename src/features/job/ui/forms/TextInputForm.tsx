import { type Control, Controller } from "react-hook-form";

import { Box, Stack, TextField, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  name: string;
  requireErrorText: string;
  placeHolder: string;
  autoFocus?: boolean;
}

export default function TextInputForm({
  id,
  control,
  name,
  requireErrorText,
  placeHolder,
  autoFocus,
}: Props) {
  const { md } = useBreakpoints();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: `Please specify ${requireErrorText}`,
        pattern: {
          value: /\S/,
          message: `Please specify ${requireErrorText}`,
        },
      }}
      render={({ field: { ref, ...field }, fieldState }) => (
        <Stack width={1} gap={0.5} maxWidth={md ? 728 : 1}>
          <TextField
            id={id}
            inputRef={ref}
            variant="outlined"
            required
            fullWidth
            autoFocus={autoFocus}
            placeholder={`Enter ${placeHolder}`}
            multiline
            rows={6}
            inputProps={{ maxLength: 500 }}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            {...field}
          />
          {!fieldState.error?.message && (
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="subtitle1" color={Colors.lightGrey}>
                Maximum 500 characters
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                {`${field.value.length}/500`}
              </Typography>
            </Box>
          )}
        </Stack>
      )}
    />
  );
}
