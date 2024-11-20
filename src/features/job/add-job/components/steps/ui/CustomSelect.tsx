import { type Control, Controller } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { PerksBenefits } from "../benefits/data";
import GuideText from "./GuideText";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  requireErrorText: string;
  title: string;
  subtitle: string;
  isLarge?: boolean;
  buttonText: string;
  items: (string | PerksBenefits)[];
  name: string;
  id: string;
  renderSelectedItem: (
    item: string | PerksBenefits,
    removeItem: (item: string | PerksBenefits) => void,
  ) => React.ReactNode;
}

export default function CustomSelect({
  id,
  control,
  requireErrorText,
  title,
  subtitle,
  isLarge,
  buttonText,
  items,
  name,
  renderSelectedItem,
}: Props) {
  const isPerksBenefit = (
    item: string | PerksBenefits,
  ): item is PerksBenefits => {
    return (item as PerksBenefits).description !== undefined;
  };
  const { md } = useBreakpoints();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) =>
          value.length > 0 || `Please select ${requireErrorText}`,
      }}
      render={({ field: { value, ...field }, fieldState }) => {
        const typedValue = value as (string | PerksBenefits)[];
        return (
          <Box
            display="flex"
            gap={!md ? 2 : 15}
            flexDirection={!md ? "column" : "row"}
          >
            <GuideText title={title} subtitle={subtitle} />
            <Stack>
              <Select
                id={id}
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: Colors.primaryGrey,
                    borderWidth: "1.5px",
                  },
                  ".MuiSvgIcon-root": {
                    right: isLarge ? 106 : 90,
                    color: "primary.main",
                    fontSize: 20,
                  },
                  width: isLarge ? 142 : 126,
                  height: 42,
                }}
                multiple
                displayEmpty
                value={typedValue.map((v) => (isPerksBenefit(v) ? v.title : v))}
                onChange={(event) => {
                  const selectedValues = event.target.value;
                  const selectedItems = items.filter((item) =>
                    selectedValues.includes(
                      isPerksBenefit(item) ? item.title : item,
                    ),
                  );
                  field.onChange(selectedItems);
                }}
                input={<OutlinedInput />}
                IconComponent={AddIcon}
                renderValue={() => (
                  <Typography
                    variant="subtitle2"
                    color="primary.main"
                    ml={3.5}
                    mt={0.4}
                  >
                    Add {buttonText}
                  </Typography>
                )}
              >
                {items.map((item) => (
                  <MenuItem
                    key={isPerksBenefit(item) ? item.title : item}
                    value={isPerksBenefit(item) ? item.title : item}
                  >
                    {isPerksBenefit(item) ? item.title : item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={Boolean(fieldState.error)}>
                {fieldState.error?.message}
              </FormHelperText>
              {typedValue.length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {typedValue.map((v) =>
                    renderSelectedItem(v, (removedItem) => {
                      const updatedValue = typedValue.filter(
                        (item) => item !== removedItem,
                      );
                      field.onChange(updatedValue);
                    }),
                  )}
                </Box>
              )}
            </Stack>
          </Box>
        );
      }}
    />
  );
}
