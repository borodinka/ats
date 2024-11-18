import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Box, Stack } from "@mui/material";

import Divider from "@features/ui/Divider";
import { useBreakpoints } from "@hooks/useBreakpoints";

import Pagination from "../../navigation/Pagination";
import CustomSelect from "../ui/CustomSelect";
import GuideText from "../ui/GuideText";
import BenefitCard from "./BenefitCard";
import { PERKS_BENEFITS, PerksBenefits } from "./data";

interface FormInput {
  perksBenefits: PerksBenefits[];
}

export default function Benefits() {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      perksBenefits: [],
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) =>
    console.log(data.perksBenefits);
  const { md } = useBreakpoints();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <Controller
        name="perksBenefits"
        control={control}
        rules={{
          validate: (value) =>
            value.length > 0 || "Please select perks and benefits",
        }}
        render={({ field: { value, ...field }, fieldState }) => (
          <Box
            display="flex"
            gap={!md ? 2 : 15}
            flexDirection={!md ? "column" : "row"}
          >
            <GuideText
              title="Perks and Benefits"
              subtitle="Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees"
            />
            <CustomSelect
              id="perksBenefits"
              fieldState={fieldState}
              field={field}
              value={value}
              items={PERKS_BENEFITS}
              buttonText="Benefit"
              isLarge
            >
              {value.map((perk) => (
                <BenefitCard
                  key={perk.title}
                  value={value}
                  val={perk}
                  field={field}
                />
              ))}
            </CustomSelect>
          </Box>
        )}
      />
      <Divider />
      <Pagination />
    </Stack>
  );
}
