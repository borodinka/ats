import dayjs from "dayjs";
import { type Control, Controller, type Validate } from "react-hook-form";

import { TimePicker } from "@mui/x-date-pickers";

import { theme } from "@config/styles";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  name: string;
  requireErrorText: string;
  minTime?: string | null;
  maxTime?: string | null;
  validate?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Validate<any, any> | Record<string, Validate<any, any>> | undefined;
}

export default function InterviewTimePicker({
  control,
  name,
  requireErrorText,
  validate,
  minTime,
  maxTime,
}: Props) {
  const minTimeParsed = minTime ? dayjs(minTime) : null;
  const maxTimeParsed = maxTime ? dayjs(maxTime) : null;

  const timeRangeValidation = (value: string) => {
    const selectedTime = dayjs(value);
    const rangeStart = dayjs().set("hour", 8).set("minute", 0);
    const rangeEnd = dayjs().set("hour", 17).set("minute", 0);

    if (!selectedTime.isValid()) {
      return "Invalid time format";
    }
    if (selectedTime.isBefore(rangeStart) || selectedTime.isAfter(rangeEnd)) {
      return "Time must be between 08:00 and 17:00";
    }
    return true;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: requireErrorText,
        validate: {
          ...validate,
          timeRange: timeRangeValidation,
        },
      }}
      render={({ field: { ref, ...field }, fieldState }) => (
        <TimePicker
          slotProps={{
            textField: {
              inputRef: ref,
              variant: "outlined",
              helperText: fieldState.error?.message,
              error: Boolean(fieldState.error),
            },
          }}
          {...field}
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => {
            const parsedValue = newValue ? dayjs(newValue).toISOString() : null;
            field.onChange(parsedValue);
          }}
          {...(minTimeParsed && { minTime: minTimeParsed })}
          {...(maxTimeParsed && { maxTime: maxTimeParsed })}
          sx={{ mt: 0.5, svg: { color: theme.palette.grey[100] } }}
        />
      )}
    />
  );
}
