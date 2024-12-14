import type { Control } from "react-hook-form";

import NumberInput from "./NumberInput";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
}

export default function NumberOfStagesForm({ control }: Props) {
  return (
    <NumberInput
      id="numberOfStages"
      name="numberOfStages"
      control={control}
      maxValue={5}
    />
  );
}
