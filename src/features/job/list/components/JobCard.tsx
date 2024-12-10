import { Link } from "react-router-dom";

import {
  Box,
  ButtonBase,
  Chip,
  LinearProgress,
  Typography,
  alpha,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import { useBreakpoints } from "@hooks/useBreakpoints";

import type { Job } from "../../types";
import { getCategoryColor, getEmploymentTypeColor } from "../utils/chipColor";

interface Props {
  job: Job;
  currentApplicants: number;
}

export default function JobCard({ job, currentApplicants }: Props) {
  const { md } = useBreakpoints();
  const progress = (currentApplicants / job.capacity) * 100;

  return (
    <ButtonBase
      component={Link}
      to={`${AppRoutes.jobs}/${job.id}`}
      sx={{
        display: "block",
        textAlign: "inherit",
        width: 1,
        height: 1,
      }}
    >
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
            {job.employmentTypes.map((type) => {
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
            {job.title}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 3 }}>
            {job.categories.map((category) => {
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
            {`of ${job.capacity} capacity`}
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  );
}
