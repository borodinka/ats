import { type Control } from "react-hook-form";

import type { PerkBenefit } from "../../../types";
import { isCustomSelectObject } from "../../../utils";
import BenefitCard from "../../BenefitCard";
import CustomSelect from "../../CustomSelect";
import { PERKS_BENEFITS } from "./data";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
}

export default function BenefitsForm({ control }: Props) {
  return (
    <CustomSelect
      id="perksBenefits"
      name="perksBenefits"
      control={control}
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
  );
}
