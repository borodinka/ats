import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { PERKS_ICONS } from "../data";
import type { PerkBenefit } from "../types";

interface Props {
  key: React.Key;
  val: PerkBenefit;
  onClose?: () => void;
}

export default function BenefitCard({ val, onClose }: Props) {
  const { md } = useBreakpoints();
  const Icon = PERKS_ICONS[val.iconName];

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: md ? 274 : 1,
        width: 1,
        border: onClose ? 1.5 : 0,
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
        {Icon && <Icon />}
        {onClose && (
          <IconButton
            onClick={onClose}
            aria-label="remove benefit card"
            sx={{
              color: "text.secondary",
              padding: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Typography variant="h3" color="text.secondary" mb={1}>
        {val.title}
      </Typography>
      <Typography>{val.description}</Typography>
    </Box>
  );
}
