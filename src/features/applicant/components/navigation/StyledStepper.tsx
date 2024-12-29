import { useEffect, useRef } from "react";

import { Step, StepLabel, Stepper, Typography } from "@mui/material";

import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";

import type { Applicant } from "../../types";

interface Props {
  currentStage: Applicant["currentStage"];
  steps: Applicant["stages"];
  viewStage: number;
}

export default function StyledStepper({
  currentStage,
  steps,
  viewStage,
}: Props) {
  const activeStage = viewStage < currentStage ? viewStage : currentStage;

  const stepperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stepper = stepperRef.current;
    if (stepper) {
      const activeStepElement = stepper.children[activeStage] as HTMLElement;
      if (activeStepElement) {
        const offset = activeStepElement.offsetLeft;
        stepper.scrollTo({
          left:
            offset -
            stepper.clientWidth / 2 +
            activeStepElement.clientWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeStage, steps]);

  return (
    <Stepper
      ref={stepperRef}
      activeStep={activeStage}
      alternativeLabel
      connector={null}
      sx={{
        overflowY: "hidden",
        overflowX: "auto",
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        width: "calc(100% + 10px)",
      }}
    >
      {steps.map(({ title }, index) => (
        <Step
          key={index}
          sx={{
            backgroundColor:
              index === activeStage
                ? Colors.blue
                : index < activeStage
                  ? Colors.lavender
                  : Colors.lightViolet,
            "&:first-of-type": {
              transform: "skewX(-20deg)",
              transformOrigin: "top left",
              mr: -0.5,
            },
            "&:last-of-type": {
              transform: "skewX(-20deg)",
              transformOrigin: "bottom right",
              ml: -0.5,
              pr: 2.5,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                right: -1,
                top: 0,
                bottom: 0,
                width: 0,
                height: 0,
                borderLeft: "22px solid transparent",
                borderTop: "62px solid white",
              },
            },
            "&:not(:first-of-type):not(:last-of-type)": {
              transform: "skewX(-20deg)",
              mx: 0.5,
            },
            padding: { xs: 1, md: 1.5 },
          }}
        >
          <StepLabel
            sx={{
              "& .MuiStepLabel-iconContainer": {
                display: "none",
              },
              transform: "translate(-5%, -5%) skewX(20deg)",
              "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
                mt: 0,
                color:
                  index === activeStage
                    ? Colors.white
                    : index < activeStage
                      ? Colors.blue
                      : theme.palette.grey[100],
              },
              ml: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={FontWeights.semibold}>
              {title}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
