import { Box, Chip, Typography } from "@mui/material";

import { FontWeights } from "@config/styles/FontWeights";
import { useBreakpoints } from "@hooks/useBreakpoints";

import type { Job } from "../types";
import { getCategoryColor } from "../utils";

interface Props {
  categories: Job["categories"];
}

export default function CategoryChips({ categories }: Props) {
  const { md } = useBreakpoints();
  return (
    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: md ? 3 : 2 }}>
      {categories.map((category) => {
        const categoryColor = getCategoryColor(category);
        return (
          <Chip
            key={category}
            label={
              <Typography
                variant="subtitle1"
                color={categoryColor}
                fontWeight={FontWeights.semibold}
              >
                {category}
              </Typography>
            }
            sx={{
              border: 1.5,
              borderColor: categoryColor,
              backgroundColor: "transparent",
            }}
          />
        );
      })}
    </Box>
  );
}
