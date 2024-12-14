import { type Control, Controller } from "react-hook-form";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { typesOfEmployment } from "../../data";
import type { EmploymentType } from "../../types";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
}

export default function EmploymentTypesForm({ control }: Props) {
  const { md } = useBreakpoints();
  return (
    <Controller
      name="employmentTypes"
      control={control}
      rules={{
        validate: (value) =>
          value?.length > 0 || "Please select type of employment",
      }}
      render={({ field: { value, ...field }, fieldState }) => (
        <FormGroup
          id="employmentTypes"
          sx={{
            my: -1,
            display: "grid",
            gridTemplateColumns: !md ? "1fr 1fr" : "1fr",
          }}
        >
          {typesOfEmployment.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={value?.includes(type)}
                  onChange={(e) => {
                    const selectedTypes = value || [];
                    if (e.target.checked) {
                      field.onChange([...selectedTypes, type]);
                    } else {
                      field.onChange(
                        selectedTypes.filter(
                          (item: EmploymentType) => item !== type,
                        ),
                      );
                    }
                  }}
                  sx={{ color: Colors.primaryGrey }}
                />
              }
              label={type}
              sx={{
                ".MuiTypography-root": {
                  ml: !md ? 0.5 : 1,
                },
              }}
              {...field}
            />
          ))}
          <FormHelperText error={Boolean(fieldState.error)}>
            {fieldState.error?.message}
          </FormHelperText>
        </FormGroup>
      )}
    />
  );
}
