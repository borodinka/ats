import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";

import { Colors, theme } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import type { WizardStep } from "../../types";

interface Props {
  currentStep: number;
  steps: WizardStep[];
}

export default function StyledStepper({ currentStep, steps }: Props) {
  const { md } = useBreakpoints();

  return (
    <Stepper
      activeStep={currentStep}
      alternativeLabel={!md}
      sx={{
        ".MuiStepConnector-root": {
          top: 27,
        },
        ".MuiStepConnector-root span": {
          border: 1,
          borderColor: Colors.primaryGrey,
          mx: !md ? 1.5 : 0,
        },
        ".MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
          mt: 0,
        },
      }}
    >
      {steps.map(({ title, Icon }, index) => (
        <Step key={title}>
          <StepLabel
            StepIconComponent={({ active, completed }) => (
              <Box
                sx={{
                  height: 54,
                  width: 54,
                  bgcolor:
                    active || completed
                      ? theme.palette.primary.main
                      : Colors.lavender,
                  color:
                    active || completed
                      ? Colors.white
                      : theme.palette.grey[100],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                }}
              >
                <Icon />
              </Box>
            )}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Typography
                sx={{
                  color:
                    index > currentStep ? Colors.lightGrey : "primary.main",
                }}
              >
                Step {index + 1}/4
              </Typography>
              <Typography
                variant="h4"
                color={
                  index > currentStep
                    ? theme.palette.grey[100]
                    : "text.secondary"
                }
              >
                {title}
              </Typography>
            </Box>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
