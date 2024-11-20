import { type SubmitHandler, useForm } from "react-hook-form";

import { Stack } from "@mui/material";

import Divider from "@features/ui/Divider";

import Pagination from "../../navigation/Pagination";
import CustomSelect from "../ui/CustomSelect";
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

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <CustomSelect
        id="perksBenefits"
        name="perksBenefits"
        control={control}
        title="Perks and Benefits"
        subtitle="Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees"
        requireErrorText="perks and benefits"
        buttonText="Benefit"
        items={PERKS_BENEFITS}
        isLarge
        renderSelectedItem={(item, removeItem) => {
          return (
            typeof item !== "string" && (
              <BenefitCard
                key={(item as PerksBenefits).title}
                val={item as PerksBenefits}
                onClose={() => removeItem(item)}
              />
            )
          );
        }}
      />
      <Divider />
      <Pagination />
    </Stack>
  );
}
