import { type Control, Controller } from "react-hook-form";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { jobCategories } from "../../data";
import type { JobCategory } from "../../types";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
}

export default function CategoriesForm({ control }: Props) {
  const { md } = useBreakpoints();
  return (
    <Controller
      name="categories"
      control={control}
      rules={{
        validate: (value) => value.length > 0 || "Please select job category",
      }}
      render={({ field: { value, ...field }, fieldState }) => (
        <FormControl
          sx={{ width: md ? 314 : 1, maxWidth: 1 }}
          error={Boolean(fieldState.error)}
        >
          <Select
            id="categories"
            multiple
            displayEmpty
            value={value}
            onChange={field.onChange}
            input={<OutlinedInput />}
            IconComponent={ExpandMoreIcon}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.length === 0 ? (
                  <Typography color={Colors.lightGrey}>
                    Select Job Category
                  </Typography>
                ) : (
                  selected.map((val: JobCategory) => (
                    <Chip
                      key={val}
                      label={val}
                      sx={{
                        backgroundColor: Colors.lavender,
                        color: "text.secondary",
                      }}
                    />
                  ))
                )}
              </Box>
            )}
          >
            {jobCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={Boolean(fieldState.error)}>
            {fieldState.error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
