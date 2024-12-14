import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Box, Stack } from "@mui/material";

import { AppRoutes } from "@config/routes";
import Divider from "@features/ui/Divider";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { useAppDispatch, useAppSelector } from "@store/index";

import { useAddJobMutation } from "../../../store/jobsApi";
import type { Job } from "../../../types";
import {
  CapacityForm,
  NumberOfStagesForm,
  StagesForm,
} from "../../../ui/forms";
import {
  reset,
  selectJob,
  setRecruitmentStages,
} from "../../store/jobWizardSlice";
import Pagination from "../navigation/Pagination";
import GuideText from "./ui/GuideText";

interface FormInput {
  numberOfStages: Job["numberOfStages"];
  stages: Job["stages"];
  capacity: Job["capacity"];
}

export default function RecruitmentStages() {
  const {
    handleSubmit,
    control,
    numberOfStages,
    selectedStages,
    onSubmit,
    isLoading,
    setValue,
  } = useRecruitmentStagesForm();
  const { md } = useBreakpoints();
  const BOX_STYLES = {
    display: "flex",
    gap: !md ? 2 : 15,
    flexDirection: !md ? "column" : "row",
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <Box sx={BOX_STYLES}>
        <GuideText
          title="Number of Stages"
          subtitle="Specify the total number of stages in the recruitment process"
        />
        <NumberOfStagesForm control={control} />
      </Box>
      <Divider />
      <Box sx={BOX_STYLES}>
        <GuideText
          title="Recruitment Stages"
          subtitle="List each stage in the order they will occur"
        />
        <StagesForm
          control={control}
          numberOfStages={numberOfStages}
          selectedStages={selectedStages}
          setValue={setValue}
        />
      </Box>
      <Divider />
      <Box sx={BOX_STYLES}>
        <GuideText
          title="Total Capacity"
          subtitle="Indicate the maximum number of candidates for this job"
        />
        <CapacityForm control={control} />
      </Box>
      <Divider />
      <Pagination isLoading={isLoading} />
    </Stack>
  );
}

function useRecruitmentStagesForm() {
  const job = useAppSelector(selectJob);
  const { handleSubmit, control, watch, setValue } = useForm<FormInput>({
    defaultValues: {
      numberOfStages: job.numberOfStages,
      stages: job.stages,
      capacity: job.capacity,
    },
  });
  const numberOfStages = watch("numberOfStages");
  const selectedStages = watch("stages");

  const dispatch = useAppDispatch();
  const [addJob, { isLoading }] = useAddJobMutation();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (isLoading) {
      return;
    }

    dispatch(setRecruitmentStages(data));
    const result = await addJob({
      ...job,
      numberOfStages: data.numberOfStages,
      stages: data.stages,
      capacity: data.capacity,
    });

    if (!("error" in result)) {
      navigate(AppRoutes.jobs);
      dispatch(reset());
    }
  };

  return {
    handleSubmit,
    control,
    numberOfStages,
    selectedStages,
    onSubmit,
    isLoading,
    setValue,
  };
}
