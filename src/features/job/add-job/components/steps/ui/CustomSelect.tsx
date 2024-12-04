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

import { useBreakpoints } from "@hooks/useBreakpoints";

import type { CustomSelectType } from "../../../types";
import { isCustomSelectObject } from "../utils";
import GuideText from "./GuideText";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  requireErrorText: string;
  title: string;
  subtitle: string;
  buttonText: string;
  items: CustomSelectType[];
  name: string;
  id: string;
  renderSelectedItem: (
    item: CustomSelectType,
    removeItem: (item: CustomSelectType) => void,
  ) => React.ReactNode;
  maxAmount?: number;
}
export default function CustomSelect({
  id,
  control,
  requireErrorText,
  title,
  subtitle,
  buttonText,
  items,
  name,
  renderSelectedItem,
  maxAmount,
}: Props) {
  const { md } = useBreakpoints();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) => {
          if (value.length === 0) {
            return `Please select ${requireErrorText}`;
          }
          if (maxAmount && value.length !== maxAmount) {
            return `You need to select exactly ${maxAmount} stages`;
          }
          return true;
        },
      }}
      render={({ field: { value, ...field }, fieldState }) => {
        const typedValue = value as CustomSelectType[];
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
                  ".MuiSvgIcon-root": {
                    right: 106,
                    color: "primary.main",
                    fontSize: 20,
                  },
                  width: 142,
                  height: 42,
                }}
                multiple
                displayEmpty
                value={typedValue.map((item) =>
                  isCustomSelectObject(item) ? item.title : item,
                )}
                onChange={(event) => {
                  const selectedValues = event.target.value;
                  const selectedItems = items.filter((item) =>
                    selectedValues.includes(
                      isCustomSelectObject(item) ? item.title : item,
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
                    key={isCustomSelectObject(item) ? item.title : item}
                    value={isCustomSelectObject(item) ? item.title : item}
                    disabled={
                      maxAmount !== undefined &&
                      typedValue.length >= maxAmount &&
                      !typedValue.includes(item)
                    }
                  >
                    {isCustomSelectObject(item) ? item.title : item}
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
