import { type Control } from "react-hook-form";

import NumberInput from "./NumberInput";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  currentApplicants?: number;
}

export default function CapacityForm({ control, currentApplicants }: Props) {
  return (
    <NumberInput
      id="capacity"
      name="capacity"
      control={control}
      maxValue={12}
      currentApplicants={currentApplicants}
    />
  );
}
