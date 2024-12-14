import { type Control, Controller } from "react-hook-form";

import { Box, Stack, TextField, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  autoFocus?: boolean;
}

export default function TitleForm({ control, autoFocus }: Props) {
  const { md } = useBreakpoints();
  return (
    <Controller
      name="title"
      control={control}
      rules={{
        required: "Please specify job title",
        pattern: {
          value: /\S/,
          message: "Please specify job title",
        },
      }}
      render={({ field: { ref, ...field }, fieldState }) => (
        <Stack
          gap={0.5}
          sx={{
            flexBasis: md ? 430 : 1,
            flexShrink: 1,
            maxWidth: 1,
          }}
        >
          <TextField
            id="title"
            inputRef={ref}
            variant="outlined"
            required
            fullWidth
            placeholder="e.g. Software Engineer"
            inputProps={{ maxLength: 80 }}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            autoFocus={autoFocus}
            {...field}
          />
          {!fieldState.error?.message && (
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="subtitle1" color={Colors.lightGrey}>
                Maximum 80 characters
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                {`${field.value.length}/80`}
              </Typography>
            </Box>
          )}
        </Stack>
      )}
    />
  );
}
