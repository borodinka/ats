import {
  type ControllerFieldState,
  type Noop,
  type RefCallBack,
} from "react-hook-form";

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

import { PerksBenefits } from "../benefits/data";

interface Props {
  id: string;
  fieldState: ControllerFieldState;
  field: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (...event: any[]) => void;
    onBlur: Noop;
    disabled?: boolean;
    name: string;
    ref: RefCallBack;
  };
  value: (string | PerksBenefits)[];
  items: (string | PerksBenefits)[];
  buttonText: string;
  isLarge?: boolean;
  children: React.ReactNode;
}

export default function CustomSelect({
  id,
  fieldState,
  field,
  value,
  items,
  buttonText,
  isLarge,
  children,
}: Props) {
  const isPerksBenefit = (
    item: string | PerksBenefits,
  ): item is PerksBenefits => {
    return (item as PerksBenefits).description !== undefined;
  };

  return (
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
        value={value.map((v) => (isPerksBenefit(v) ? v.title : v))}
        onChange={(event) => {
          const selectedValues = event.target.value;
          const selectedItems = items.filter((item) =>
            selectedValues.includes(isPerksBenefit(item) ? item.title : item),
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
      {value.length > 0 && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {children}
        </Box>
      )}
    </Stack>
  );
}
