import { MobileStepper } from "@mui/material";

import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { useAppDispatch, useAppSelector } from "@store/index";

import { WIZARD_STEPS } from "../../data";
import { previousStep, selectCurrentStep } from "../../store/jobWizardSlice";

interface Props {
  isLoading?: boolean;
}

export default function Pagination({ isLoading }: Props) {
  const currentStep = useAppSelector(selectCurrentStep);
  const { md } = useBreakpoints();
  const dispatch = useAppDispatch();
  const onBackClick = () => dispatch(previousStep());

  return (
    <MobileStepper
      variant="dots"
      steps={WIZARD_STEPS.length}
      position="static"
      activeStep={currentStep}
      nextButton={
        <AppButton
          type="submit"
          fullWidth={!md}
          loading={isLoading}
          sx={{ px: md ? 5 : 0 }}
        >
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
          onClick={onBackClick}
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
