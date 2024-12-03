import { type SubmitHandler, useForm } from "react-hook-form";

import { Stack } from "@mui/material";

import Divider from "@features/ui/Divider";

import type { Job } from "../../../../types";
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
        ({ name, requireErrorText, title, subtitle, placeholder }) => (
          <Stack key={name} gap={3}>
            <TextInputSection
              id={name}
              control={control}
              name={name}
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
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      description: "",
      responsibilities: "",
      qualifications: "",
      niceToHaves: "",
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return {
    handleSubmit,
    control,
    onSubmit,
  };
}
