import { Controller, type SubmitHandler, useForm } from "react-hook-form";

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
      {FORM_FIELDS.map((val) => (
        <Stack key={val.name} gap={3}>
          <Controller
            name={val.name}
            control={control}
            rules={val.rules}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextInputSection
                id={field.name}
                title={val.title}
                subtitle={val.subtitle}
                inputRef={ref}
                fieldState={fieldState}
                field={field}
                autoFocus
                placeHolder={val.placeholder}
              />
            )}
          />
          <Divider />
        </Stack>
      ))}
      <Pagination />
    </Stack>
  );
}
