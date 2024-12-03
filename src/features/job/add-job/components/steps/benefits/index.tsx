import { type SubmitHandler, useForm } from "react-hook-form";

import { Stack } from "@mui/material";

import Divider from "@features/ui/Divider";

import { type Job, type PerkBenefit } from "../../../../types";
import Pagination from "../../navigation/Pagination";
import CustomSelect from "../ui/CustomSelect";
import { isCustomSelectObject } from "../utils";
import BenefitCard from "./BenefitCard";
import { PERKS_BENEFITS } from "./data";

interface FormInput {
  perksBenefits: Job["perksBenefits"];
}

export default function Benefits() {
  const { handleSubmit, control, onSubmit } = useBenefitsForm();

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
        renderSelectedItem={(item, removeItem) => {
          return (
            isCustomSelectObject(item) && (
              <BenefitCard
                key={item.id}
                val={item as PerkBenefit}
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

function useBenefitsForm() {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      perksBenefits: [],
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) =>
    console.log(data.perksBenefits);

  return {
    handleSubmit,
    control,
    onSubmit,
  };
}
