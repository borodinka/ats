import dayjs from "dayjs";
import { type Control, Controller } from "react-hook-form";

import { Tooltip } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { theme } from "@config/styles";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  isUserAssignedToStage?: boolean;
}

export default function InterviewDatePicker({
  control,
  isUserAssignedToStage,
}: Props) {
  return (
    <Tooltip
      title={
        isUserAssignedToStage
          ? "Click the 'Schedule Interview' button to pick a date"
          : ""
      }
    >
      <span>
        <Controller
          name="interviewDate"
          control={control}
          rules={{
            required: "Please specify interview date",
            validate: (value) =>
              dayjs(value).isSame(dayjs(), "day") ||
              dayjs(value).isAfter(dayjs(), "day") ||
              "Date cannot be in the past",
          }}
          render={({ field: { ref, ...field }, fieldState }) => (
            <DatePicker
              disabled={isUserAssignedToStage}
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
                const parsedValue = newValue
                  ? dayjs(newValue).toISOString()
                  : null;
                field.onChange(parsedValue);
              }}
              minDate={dayjs()}
              shouldDisableDate={(date) => {
                const day = date.day();
                return day === 0 || day === 6;
              }}
              sx={{ mt: 0.5, svg: { color: theme.palette.grey[100] } }}
            />
          )}
        />
      </span>
    </Tooltip>
  );
}
