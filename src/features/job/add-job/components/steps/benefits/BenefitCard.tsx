import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { PerksBenefits } from "../benefits/data";

interface Props {
  key: React.Key;
  val: PerksBenefits;
  onClose?: () => void;
}

export default function BenefitCard({ val, onClose }: Props) {
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
          onClick={onClose}
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
