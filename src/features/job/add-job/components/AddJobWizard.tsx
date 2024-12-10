import { Box, Stack, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import Divider from "@features/ui/Divider";
import { useAppSelector } from "@store/index";

import { WIZARD_STEPS } from "../data";
import { selectCurrentStep } from "../store/jobWizardSlice";
import StyledStepper from "./navigation/StyledStepper";

export default function AddJobWizard() {
  const currentStep = useAppSelector(selectCurrentStep);
  const stepData = WIZARD_STEPS[currentStep];
  const StepComponent = stepData.Component;

  return (
    <Stack sx={{ gap: { xs: 2.5, md: 4 } }}>
      <Typography variant="h1" color="text.secondary">
        Post a Job
      </Typography>
      <StyledStepper steps={WIZARD_STEPS} currentStep={currentStep} />
      <Stack position="relative">
        <Stack
          direction="row"
          gap={1}
          sx={{ display: { xs: "flex", md: "none" }, mb: 1.5 }}
        >
          <Typography sx={{ color: "primary.main" }}>
            Step {currentStep + 1}/4
          </Typography>
          <Box sx={{ width: 1.5, height: 26, bgcolor: Colors.primaryGrey }} />
          <Typography variant="h3" color="text.secondary">
            {stepData.title}
          </Typography>
        </Stack>
        <Divider />
        <Box
          sx={{
            overflowY: "scroll",
            minHeight: { xs: "52vh", md: "auto" },
            maxHeight: { xs: "52vh", md: "65vh" },
            mt: 3,
          }}
        >
          <StepComponent />
        </Box>
      </Stack>
    </Stack>
  );
}
