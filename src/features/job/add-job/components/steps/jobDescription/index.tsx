import { type SubmitHandler, useForm } from "react-hook-form";

import { Stack } from "@mui/material";

import Divider from "@features/ui/Divider";

import Pagination from "../../navigation/Pagination";
import TextInputSection from "./TextInputSection";
import { FORM_FIELDS } from "./data";

export interface FormInput {
  description: string;
  responsibilities: string;
  qualifications: string;
  niceToHaves: string;
}

export default function JobDescription() {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      description: "",
      responsibilities: "",
      qualifications: "",
      niceToHaves: "",
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

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
