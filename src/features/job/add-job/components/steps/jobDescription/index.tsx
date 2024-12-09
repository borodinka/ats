import { type SubmitHandler, useForm } from "react-hook-form";

import { Stack } from "@mui/material";

import Divider from "@features/ui/Divider";
import { useAppDispatch, useAppSelector } from "@store/index";

import type { Job } from "../../../../types";
import {
  nextStep,
  selectJob,
  setJobDescription,
} from "../../../store/jobWizardSlice";
import Pagination from "../../navigation/Pagination";
import TextInputSection from "./TextInputSection";
import { FORM_FIELDS } from "./data";

export interface FormInput {
  description: Job["description"];
  responsibilities: Job["responsibilities"];
  qualifications: Job["qualifications"];
  niceToHaves: Job["niceToHaves"];
}

export default function JobDescription() {
  const { handleSubmit, control, onSubmit } = useJobDescriptionForm();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      {FORM_FIELDS.map(
        ({ name, requireErrorText, title, subtitle, placeholder }, index) => (
          <Stack key={name} gap={3}>
            <TextInputSection
              id={name}
              control={control}
              name={name}
              autoFocus={index === 0}
              requireErrorText={requireErrorText}
              title={title}
              subtitle={subtitle}
              placeHolder={placeholder}
            />
            <Divider />
          </Stack>
        ),
      )}
      <Pagination />
    </Stack>
  );
}

function useJobDescriptionForm() {
  const job = useAppSelector(selectJob);
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      description: job.description,
      responsibilities: job.responsibilities,
      qualifications: job.qualifications,
      niceToHaves: job.niceToHaves,
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(nextStep());
    dispatch(setJobDescription(data));
  };

  return {
    handleSubmit,
    control,
    onSubmit,
  };
}
