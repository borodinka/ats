import { useState } from "react";

import EastIcon from "@mui/icons-material/East";
import { MobileStepper, Stack } from "@mui/material";

import AppButton from "@features/ui/AppButton";
import AppDialog from "@features/ui/AppDialog";
import { useBreakpoints } from "@hooks/useBreakpoints";

import type { Applicant } from "../../types";
import AgreementImage from "./assets/agreement.png";

interface Props {
  stages: Applicant["stages"];
  currentStage: Applicant["currentStage"];
  handleBack: () => void;
  handleNext: () => void;
  isLoading: boolean;
  viewStage: number;
  onSubmit: () => void;
  status: Applicant["status"];
  onUpdate: (data: Partial<Applicant>) => void;
}

export default function Pagination({
  stages,
  currentStage,
  handleBack,
  handleNext,
  isLoading,
  viewStage,
  onSubmit,
  status,
  onUpdate,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const { md } = useBreakpoints();

  const isLastStage = viewStage === stages.length - 1;
  const isAtCurrentStage = viewStage === currentStage;

  const handleNextClick = () => {
    if (isAtCurrentStage) {
      onSubmit();
      if (isLastStage) {
        open();
      } else {
        handleNext();
      }
    } else {
      handleNext();
    }
  };

  return (
    <>
      <MobileStepper
        variant="dots"
        steps={stages.length}
        position="static"
        activeStep={viewStage}
        nextButton={
          <AppButton
            type={viewStage === currentStage ? "submit" : "button"}
            loading={isLoading}
            onClick={handleNextClick}
            sx={{
              visibility:
                viewStage >= currentStage && status === "Final Decision"
                  ? "hidden"
                  : "visible",
            }}
          >
            {viewStage < currentStage ? (
              <Stack alignItems="center">
                <EastIcon />
              </Stack>
            ) : isLastStage ? (
              "Finish"
            ) : (
              "Move To Next Step"
            )}
          </AppButton>
        }
        backButton={
          <AppButton
            variant="outlined"
            sx={{
              visibility: viewStage === 0 ? "hidden" : "visible",
            }}
            onClick={handleBack}
          >
            <Stack alignItems="center" sx={{ transform: "scaleX(-1)" }}>
              <EastIcon />
            </Stack>
          </AppButton>
        }
        sx={{
          ".MuiMobileStepper-dots": {
            visibility: "hidden",
          },
          px: 0,
        }}
      />
      {isOpen && (
        <AppDialog
          title="All stages are complete. Do you want to hire this applicant now?"
          primaryButtonText="Yes"
          secondaryButtonText="No"
          isOpen={isOpen}
          onClose={close}
          onPrimaryButtonClick={() => console.log("hire")}
          onSecondaryButtonClick={() => {
            onUpdate({ status: "Final Decision" });
            close();
          }}
          hideCloseButton
        >
          <Stack alignItems="center">
            <img
              src={AgreementImage}
              alt="Hand shake"
              style={{ width: md ? 260 : 220 }}
            />
          </Stack>
        </AppDialog>
      )}
    </>
  );
}
