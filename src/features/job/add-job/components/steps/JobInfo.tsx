import { type SubmitHandler, useForm } from "react-hook-form";

import { Box, Stack } from "@mui/material";

import Divider from "@features/ui/Divider";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { useAppDispatch, useAppSelector } from "@store/index";

import type { Job } from "../../../types";
import {
  CategoriesForm,
  EmploymentTypesForm,
  RequiredSkillsForm,
  SalaryForm,
  TitleForm,
} from "../../../ui/forms";
import { nextStep, selectJob, setJobInfo } from "../../store/jobWizardSlice";
import Pagination from "../navigation/Pagination";
import GuideText from "./ui/GuideText";

interface FormInput {
  title: Job["title"];
  employmentTypes: Job["employmentTypes"];
  salary: Job["salary"];
  categories: Job["categories"];
  requiredSkills: Job["requiredSkills"];
}

export default function JobInfo() {
  const { handleSubmit, control, onSubmit } = useJobInfoForm();
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
          title="Job Title"
          subtitle="Specify the title of the position to clearly define the role"
        />
        <TitleForm control={control} autoFocus />
      </Box>
      <Divider />
      <Box sx={BOX_STYLES}>
        <GuideText
          title="Type of Employment"
          subtitle="You can select multiple type of employment"
        />
        <EmploymentTypesForm control={control} />
      </Box>
      <Divider />
      <Box sx={BOX_STYLES}>
        <GuideText
          title="Categories"
          subtitle="You can select multiple job categories"
        />
        <CategoriesForm control={control} />
      </Box>
      <Divider />
      <Box sx={BOX_STYLES}>
        <GuideText
          title="Salary"
          subtitle="Please specify the estimated salary range for the role"
        />
        <SalaryForm control={control} isWizard />
      </Box>
      <Divider />
      <Box sx={BOX_STYLES}>
        <GuideText
          title="Required Skills"
          subtitle="Add required skills for the job"
        />
        <RequiredSkillsForm control={control} />
      </Box>
      <Divider />
      <Pagination />
    </Stack>
  );
}

function useJobInfoForm() {
  const job = useAppSelector(selectJob);
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      title: job.title,
      employmentTypes: job.employmentTypes,
      salary: job.salary,
      categories: job.categories,
      requiredSkills: job.requiredSkills,
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(nextStep());
    dispatch(setJobInfo(data));
  };

  return {
    handleSubmit,
    control,
    onSubmit,
  };
}
