import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { FormHelperText, Rating, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { theme } from "@config/styles";
import { TextInputForm } from "@features/job/ui/forms";

import type { Applicant } from "../../types";
import Pagination from "../navigation/Pagination";
import StyledStepper from "../navigation/StyledStepper";

interface Props {
  stages: Applicant["stages"];
  currentStage: Applicant["currentStage"];
  onUpdate: (data: Partial<Applicant>) => void;
  isLoading: boolean;
  status: Applicant["status"];
}

interface FormInput {
  feedback: string;
  rating: number;
  interviewDate: Date | null;
}

export default function HiringProgress({
  stages,
  currentStage,
  onUpdate,
  isLoading,
  status,
}: Props) {
  const { control, handleSubmit, onSubmit, handleBack, handleNext, viewStage } =
    useHiringForm({
      stages,
      currentStage,
      onUpdate,
      isLoading,
    });

  return (
    <Stack sx={{ gap: { xs: 2, md: 3 } }}>
      <StyledStepper
        steps={stages}
        currentStage={currentStage}
        viewStage={viewStage}
      />

      <Stack
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack>
          <Typography color={theme.palette.grey[100]}>
            Interview Date
          </Typography>
          {viewStage < currentStage || status === "Final Decision" ? (
            <Typography color="text.secondary">
              {dayjs(stages[viewStage].interviewDate).format("D MMMM YYYY")}
            </Typography>
          ) : (
            <Controller
              name="interviewDate"
              control={control}
              rules={{
                required: "Please specify interview date",
                validate: (value) =>
                  dayjs(value).isAfter(dayjs(), "day") ||
                  "Date cannot be in the past",
              }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <DatePicker
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
                  sx={{ mt: 0.5, svg: { color: theme.palette.grey[100] } }}
                />
              )}
            />
          )}
        </Stack>
        <Stack>
          <Typography color={theme.palette.grey[100]}>Assigned to</Typography>
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: "100%",
              overflow: "hidden",
              wordBreak: "break-all",
            }}
          >
            {stages[viewStage].email}
          </Typography>
        </Stack>
      </Stack>

      <Stack>
        <Typography color={theme.palette.grey[100]} mb={0.5}>
          Rating
        </Typography>
        {viewStage < currentStage || status === "Final Decision" ? (
          <Rating value={stages[viewStage].rating} precision={0.5} readOnly />
        ) : (
          <Controller
            name="rating"
            control={control}
            rules={{
              validate: (value) => value > 0 || "Please rate the applicant",
            }}
            render={({ field, fieldState }) => (
              <Stack gap={0.5}>
                <Rating
                  {...field}
                  value={field.value || 0}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  precision={0.5}
                />
                <FormHelperText error={Boolean(fieldState.error)}>
                  {fieldState.error?.message}
                </FormHelperText>
              </Stack>
            )}
          />
        )}
      </Stack>

      <Stack>
        <Typography color={theme.palette.grey[100]} mb={0.5}>
          Feedback
        </Typography>
        {viewStage < currentStage || status === "Final Decision" ? (
          <Typography color="text.secondary">
            {stages[viewStage].feedback}
          </Typography>
        ) : (
          <TextInputForm
            control={control}
            name="feedback"
            requireErrorText="feedback"
            placeHolder="feedback for this stage"
            isFeedback
          />
        )}
      </Stack>

      <Pagination
        isLoading={isLoading}
        stages={stages}
        currentStage={currentStage}
        handleBack={handleBack}
        handleNext={handleNext}
        viewStage={viewStage}
        status={status}
        onSubmit={handleSubmit(onSubmit)}
        onUpdate={onUpdate}
      />
    </Stack>
  );
}

function useHiringForm({
  stages,
  currentStage,
  onUpdate,
  isLoading,
}: Pick<Props, "stages" | "currentStage" | "onUpdate" | "isLoading">) {
  const { control, handleSubmit, reset } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      feedback: stages[currentStage].feedback,
      rating: stages[currentStage].rating,
      interviewDate: stages[currentStage].interviewDate,
    },
  });
  const [viewStage, setViewStage] = useState(currentStage);

  useEffect(() => {
    reset({
      feedback: stages[currentStage].feedback,
      rating: stages[currentStage].rating,
      interviewDate: stages[currentStage].interviewDate,
    });
  }, [currentStage, stages, reset]);

  const handleBack = () => {
    if (viewStage > 0) {
      setViewStage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (viewStage < stages.length - 1) {
      setViewStage((prev) => prev + 1);
    }
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (isLoading) {
      return;
    }

    const updatedStages = stages.map((stage, index) => ({
      ...stage,
      feedback: index === currentStage ? data.feedback : stage.feedback,
      rating: index === currentStage ? data.rating : stage.rating,
      interviewDate:
        index === currentStage ? data.interviewDate : stage.interviewDate,
    }));

    const completedStages = updatedStages.slice(0, currentStage + 1);
    const newScore =
      completedStages.reduce((acc, stage) => acc + stage.rating, 0) /
      completedStages.length;

    const updatedData: Partial<Applicant> = {
      stages: updatedStages,
      score: newScore,
    };

    if (viewStage < stages.length - 1) {
      updatedData.currentStage = currentStage + 1;
    }

    onUpdate(updatedData);

    if (viewStage < stages.length - 1) {
      setViewStage(currentStage + 1);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    handleBack,
    handleNext,
    viewStage,
  };
}
