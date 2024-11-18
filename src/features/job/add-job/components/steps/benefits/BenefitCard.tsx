import { type Noop, type RefCallBack } from "react-hook-form";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { PerksBenefits } from "../benefits/data";

interface Props {
  key: React.Key;
  field: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (...event: any[]) => void;
    onBlur: Noop;
    disabled?: boolean;
    name: string;
    ref: RefCallBack;
  };
  value: PerksBenefits[];
  val: PerksBenefits;
}

export default function BenefitCard({ value, val, field }: Props) {
  const { md } = useBreakpoints();

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: md ? 274 : 1,
        width: 1,
        border: 1.5,
        borderColor: Colors.primaryGrey,
        borderRadius: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        mb={3}
      >
        {val.Icon && <val.Icon />}
        <IconButton
          onClick={() => {
            const updatedValue = value.filter(
              (item) => item.title !== val.title,
            );
            field.onChange(updatedValue);
          }}
          sx={{
            color: "text.secondary",
            padding: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h3" color="text.secondary" mb={1}>
        {val.title}
      </Typography>
      <Typography>{val.description}</Typography>
    </Box>
  );
}
