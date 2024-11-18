import { MobileStepper } from "@mui/material";

import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { WIZARD_STEPS } from "../../data";

export default function Pagination() {
  const currentStep = 0;
  const { md } = useBreakpoints();

  return (
    <MobileStepper
      variant="dots"
      steps={WIZARD_STEPS.length}
      position="static"
      activeStep={currentStep}
      nextButton={
        <AppButton type="submit" fullWidth={!md} sx={{ px: md ? 5 : 0 }}>
          Next
        </AppButton>
      }
      backButton={
        <AppButton
          variant="outlined"
          fullWidth={!md}
          sx={{
            px: md ? 5 : 0,
            visibility: currentStep === 0 ? "hidden" : "visible",
          }}
        >
          Back
        </AppButton>
      }
      sx={{
        ".MuiMobileStepper-dots": {
          visibility: "hidden",
        },
        gap: 3,
      }}
    />
  );
}
