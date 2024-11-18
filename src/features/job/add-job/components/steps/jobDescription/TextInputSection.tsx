import { type ControllerFieldState, type Noop } from "react-hook-form";

import { Box, Stack, TextField, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import GuideText from "../ui/GuideText";

interface Props {
  id: string;
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef: React.Ref<any>;
  fieldState: ControllerFieldState;
  field: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (...event: any[]) => void;
    onBlur: Noop;
    value: string;
    disabled?: boolean;
    name: string;
  };
  placeHolder: string;
  autoFocus?: boolean | undefined;
}

export default function TextInputSection({
  id,
  title,
  subtitle,
  inputRef,
  fieldState,
  field,
  placeHolder,
  autoFocus,
}: Props) {
  const { md } = useBreakpoints();

  return (
    <Box
      display="flex"
      gap={2}
      justifyContent="space-between"
      flexDirection={!md ? "column" : "row"}
    >
      <GuideText title={title} subtitle={subtitle} />
      <Stack width={1} gap={0.5} maxWidth={md ? 728 : 1}>
        <TextField
          id={id}
          inputRef={inputRef}
          variant="outlined"
          required
          fullWidth
          placeholder={`Enter ${placeHolder}`}
          multiline
          rows={6}
          inputProps={{ maxLength: 500 }}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          autoFocus={autoFocus}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: Colors.primaryGrey,
              borderWidth: "1.5px",
            },
          }}
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
    </Box>
  );
}
