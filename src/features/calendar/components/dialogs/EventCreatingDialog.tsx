import dayjs from "dayjs";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Box, Stack, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors, theme } from "@config/styles";
import { useUpdateApplicantMutation } from "@features/applicant/store/applicantsApi";
import type { Applicant } from "@features/applicant/types";
import type { Job } from "@features/job/types";
import AppDialog from "@features/ui/AppDialog";
import InterviewDatePicker from "@features/ui/InterviewDatePicker";
import useToast from "@hooks/useToast";

import { useAddEventMutation } from "../../store/eventsApi";
import type { Event } from "../../types";
import { capitalizeWords } from "../../utils";
import InterviewTimePicker from "../InterviewTimePicker";

interface Props {
  jobId: Job["id"];
  applicantId: Applicant["id"];
  applicantFullName: Applicant["fullName"];
  applicantEmail: Applicant["email"];
  jobRole: Applicant["jobRole"];
  stageTitle: string;
  currentStage: Applicant["currentStage"];
  stages: Applicant["stages"];
  isOpen: boolean;
  close: () => void;
}

interface FormInput {
  interviewDate: Date | null;
  startTime: string | null;
  endTime: string | null;
}

export default function EventCreatingDialog({
  jobId,
  applicantId,
  applicantFullName,
  applicantEmail,
  jobRole,
  stageTitle,
  currentStage,
  stages,
  isOpen,
  close,
}: Props) {
  const navigate = useNavigate();
  const [updateApplicant] = useUpdateApplicantMutation();

  const onUpdate = (data: Partial<Applicant>) => {
    updateApplicant({ id: applicantId, data });
  };

  const title = `${stageTitle} with ${applicantFullName}`;

  const { handleSubmit, control, onSubmit, start, end, isLoading } =
    useInterviewScheduleForm({
      title,
      close,
      applicantEmail,
      jobRole,
      onUpdate,
      currentStage,
      stages,
      applicantId,
    });

  return (
    <Stack component="form">
      <AppDialog
        isLoading={isLoading}
        title={title}
        isOpen={isOpen}
        onClose={close}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onPrimaryButtonClick={handleSubmit(onSubmit)}
        onSecondaryButtonClick={() => {
          close();
          navigate(`${AppRoutes.jobs}/${jobId}/applicants/${applicantId}`);
        }}
        hideCloseButton
      >
        <Stack gap={2}>
          <Box>
            <Typography color={theme.palette.grey[100]}>Job Role:</Typography>
            <Typography color="text.secondary">
              {capitalizeWords(jobRole)}
            </Typography>
          </Box>
          <Box>
            <Typography color={theme.palette.grey[100]}>
              Applicant Email:
            </Typography>
            <Typography color="text.secondary">{applicantEmail}</Typography>
          </Box>
          <Box>
            <Typography color={theme.palette.grey[100]}>
              Interview Date:
            </Typography>
            <InterviewDatePicker control={control} />
          </Box>
          <Box>
            <Typography color={theme.palette.grey[100]}>Start Time:</Typography>
            <InterviewTimePicker
              name="startTime"
              control={control}
              requireErrorText="Please specify start time of the interview"
              maxTime={end}
              validate={{
                startTime: (startTime) =>
                  !startTime || (startTime && end && startTime < end)
                    ? undefined
                    : "Start time should be before end time",
              }}
            />
          </Box>
          <Box>
            <Typography color={theme.palette.grey[100]}>End Time:</Typography>
            <InterviewTimePicker
              name="endTime"
              control={control}
              requireErrorText="Please specify end time of the interview"
              minTime={start}
              validate={{
                endTime: (endTime) =>
                  !endTime || (endTime && start && start < endTime)
                    ? undefined
                    : "End time should be after start time",
              }}
            />
          </Box>
        </Stack>
      </AppDialog>
    </Stack>
  );
}

function useInterviewScheduleForm({
  title,
  close,
  applicantEmail,
  jobRole,
  onUpdate,
  currentStage,
  stages,
  applicantId,
}: {
  title: string;
  close: () => void;
  applicantEmail: Applicant["email"];
  jobRole: Applicant["jobRole"];
  onUpdate: (data: Partial<Applicant>) => void;
  currentStage: Applicant["currentStage"];
  stages: Applicant["stages"];
  applicantId: Applicant["id"];
}) {
  const { handleSubmit, control, watch, trigger, setError } =
    useForm<FormInput>({
      defaultValues: {
        interviewDate: null,
        startTime: null,
        endTime: null,
      },
    });
  const [addEvent, { isLoading }] = useAddEventMutation();
  const { showSuccessMessage } = useToast();

  const start = watch("startTime");
  const end = watch("endTime");

  useEffect(() => {
    if (start && end) {
      trigger("startTime");
      trigger("endTime");
    }
  }, [start, end, trigger]);

  const bgColors = [
    Colors.pink,
    Colors.blue,
    Colors.orange,
    Colors.amethyst,
    Colors.aquamarine,
  ];

  function getRandomColorFromArray(colors: string[]) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const interviewDate = dayjs(data.interviewDate);

    const startTime = interviewDate
      .set("hour", dayjs(data.startTime).hour())
      .set("minute", dayjs(data.startTime).minute())
      .format();

    const endTime = interviewDate
      .set("hour", dayjs(data.endTime).hour())
      .set("minute", dayjs(data.endTime).minute())
      .format();

    const now = dayjs();

    if (dayjs(startTime).isBefore(now)) {
      setError("startTime", {
        type: "manual",
        message: "Start time cannot be in the past",
      });
      return;
    }

    const event: Event = {
      id: uuidv4(),
      title: title,
      start: startTime,
      end: endTime,
      backgroundColor: getRandomColorFromArray(bgColors),
      extendedProps: {
        interviewDate: data.interviewDate,
        applicantEmail: applicantEmail,
        jobRole: jobRole,
        applicantId: applicantId,
        stages: stages,
        currentStage: currentStage,
      },
    };

    const updatedStages = [...stages];
    const updatedStage = {
      ...updatedStages[currentStage],
      interviewDate: data.interviewDate,
    };
    updatedStages[currentStage] = updatedStage;

    const result = await addEvent(event);

    onUpdate({ stages: updatedStages });

    if (!("error" in result)) {
      close();
      showSuccessMessage("Event added successfully!");
    }
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    start,
    end,
    isLoading,
  };
}
