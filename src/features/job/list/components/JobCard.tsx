import { Box, Chip, LinearProgress, Typography, alpha } from "@mui/material";

import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { getCategoryColor, getEmploymentTypeColor } from "../utils/chipColor";

interface Props {
  jobTitle: string;
  typesOfEmployment: string[];
  categories: string[];
  capacity: number;
  currentApplicants: number;
}

export default function JobCard({
  jobTitle,
  typesOfEmployment,
  categories,
  capacity,
  currentApplicants,
}: Props) {
  const { md } = useBreakpoints();
  const progress = (currentApplicants / capacity) * 100;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: 1.5,
        borderColor: Colors.primaryGrey,
        p: 3,
        minHeight: md ? 300 : "auto",
        height: 1,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            flexWrap: "wrap",
            justifyContent: "flex-end",
            mb: 2.5,
          }}
        >
          {typesOfEmployment.map((type) => {
            const color = getEmploymentTypeColor(type);
            return (
              <Chip
                key={type}
                label={
                  <Typography
                    variant="subtitle1"
                    color={color}
                    fontWeight={FontWeights.semibold}
                  >
                    {type}
                  </Typography>
                }
                sx={{
                  backgroundColor: alpha(color, 0.1),
                }}
              />
            );
          })}
        </Box>
        <Typography variant="h4" color="text.secondary">
          {jobTitle}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 3 }}>
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
      </Box>
      <Box sx={{ marginTop: "auto" }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            mb: 1,
            mt: 3,
            height: 6,
            backgroundColor: Colors.primaryGrey,
            "& .MuiLinearProgress-bar": {
              backgroundColor: Colors.aquamarine,
            },
          }}
        />
        <Typography component="span" variant="subtitle2">
          {`${currentApplicants} applied `}
        </Typography>
        <Typography
          component="span"
          variant="subtitle1"
          color={theme.palette.grey[100]}
        >
          {`of ${capacity} capacity`}
        </Typography>
      </Box>
    </Box>
  );
}
