import { type Control } from "react-hook-form";

import NumberInput from "./NumberInput";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
}

export default function CapacityForm({ control }: Props) {
  return (
    <NumberInput
      id="capacity"
      name="capacity"
      control={control}
      maxValue={12}
    />
  );
}
