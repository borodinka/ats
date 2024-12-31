import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  ButtonBase,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors, theme } from "@config/styles";
import type { Job } from "@features/job/types";
import AppDialog from "@features/ui/AppDialog";
import useToast from "@hooks/useToast";

import type { Applicant } from "../types";
import StyledChip from "./StyledChip";

interface Props {
  status: Applicant["status"];
  fullName: Applicant["fullName"];
  jobId: Job["id"];
  currentStage: Applicant["currentStage"];
  onUpdate: (data: Partial<Applicant>) => void;
}

interface FormInput {
  declineReason: Applicant["declineReason"];
}

export default function DeclineButton({
  status,
  onUpdate,
  fullName,
  jobId,
  currentStage,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const [isSecondOpen, setSecondOpen] = useState(false);
  const openSecond = () => setSecondOpen(true);
  const closeSecond = () => setSecondOpen(false);
  const [customReason, setCustomReason] = useState("");
  const { showSuccessMessage } = useToast();
  const navigate = useNavigate();

  const { handleSubmit, control, onSubmit } = useDeclineReasonForm({
    onUpdate,
    close,
    openSecond,
    fullName,
    showSuccessMessage,
    currentStage,
  });

  const onDelete = async () => {
    const updatedData: Partial<Applicant> = {
      jobId: null,
      stages: [],
      score: 0,
      currentStage: 0,
    };

    onUpdate(updatedData);
    closeSecond();
    navigate(`${AppRoutes.jobs}/${jobId}?selectedTab=1`);
    showSuccessMessage(
      "Applicant was successfully removed from the job offer!",
    );
  };

  const reasons = [
    "The candidate was late for the interview",
    "The candidate demonstrated inappropriate or unprofessional behavior",
    "The candidate's availability does not match the job requirements",
    "The candidate's expectations did not align with the role or company",
  ];

  return (
    <>
      <Tooltip
        title={
          status === "Hired"
            ? "This applicant has already been hired for this position. You can't decline the applicant"
            : status === "Declined"
              ? "This applicant has already been declined for this position"
              : ""
        }
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: theme.palette.grey[100],
              textAlign: "center",
            },
          },
        }}
      >
        <span>
          <ButtonBase
            sx={{ borderRadius: 4, height: 32 }}
            disabled={status === "Hired" || status === "Declined"}
            onClick={open}
          >
            <StyledChip
              text="Decline"
              color={
                status === "Hired" || status === "Declined"
                  ? Colors.primaryGrey
                  : Colors.tomato
              }
              sx={{ width: 80 }}
            />
          </ButtonBase>
        </span>
      </Tooltip>
      <Stack component="form">
        <AppDialog
          title="Please specify the reason for declining"
          primaryButtonText="Save"
          isOpen={isOpen}
          onClose={close}
          onPrimaryButtonClick={handleSubmit(onSubmit)}
          hideCloseButton
        >
          <Controller
            name="declineReason"
            control={control}
            rules={{
              validate: (value) =>
                (value && value.trim().length > 0) ||
                "Please select reason for declining",
            }}
            render={({ field: { value, ...field }, fieldState }) => {
              const selectedReasons = value ? value.split("\n") : [];

              const handleCustomReasonChange = (
                e: React.ChangeEvent<HTMLInputElement>,
              ) => {
                setCustomReason(e.target.value);
                if (e.target.value.trim()) {
                  const updatedReasons = [
                    ...selectedReasons.filter((r) => r !== customReason),
                    e.target.value.trim(),
                  ];
                  field.onChange(updatedReasons.join("\n"));
                }
              };

              return (
                <FormGroup id="declineReason" sx={{ mx: "auto" }}>
                  {reasons.map((reason, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={selectedReasons.includes(reason)}
                          onChange={(e) => {
                            let updatedReasons: string[];
                            if (e.target.checked) {
                              updatedReasons = [...selectedReasons, reason];
                            } else {
                              updatedReasons = selectedReasons.filter(
                                (item) => item !== reason,
                              );
                            }
                            field.onChange(updatedReasons.join("\n"));
                          }}
                          sx={{ color: Colors.primaryGrey }}
                        />
                      }
                      label={reason}
                      sx={{ mb: 1 }}
                      {...field}
                    />
                  ))}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={customReason.trim() !== ""}
                        onChange={(e) => {
                          if (!e.target.checked) {
                            const updatedReasons = selectedReasons.filter(
                              (item) => item !== customReason.trim(),
                            );
                            field.onChange(updatedReasons.join("\n"));
                            setCustomReason("");
                          }
                        }}
                        sx={{ color: Colors.primaryGrey }}
                      />
                    }
                    label={
                      <TextField
                        value={customReason}
                        onChange={handleCustomReasonChange}
                        placeholder="Enter a custom reason..."
                        variant="standard"
                        sx={{
                          width: 1,
                          "& .MuiInput-underline:before": {
                            display: "none",
                          },
                          "& .MuiInput-underline:after": {
                            display: "none",
                          },
                        }}
                      />
                    }
                    sx={{
                      mb: 1,
                      ".MuiTypography-root": {
                        width: 1,
                      },
                    }}
                  />
                  <FormHelperText
                    error={Boolean(fieldState.error)}
                    sx={{ textAlign: "center" }}
                  >
                    {fieldState.error?.message}
                  </FormHelperText>
                </FormGroup>
              );
            }}
          />
        </AppDialog>
      </Stack>
      <AppDialog
        title="Do you want to delete this applicant from the job offer?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        isOpen={isSecondOpen}
        onClose={closeSecond}
        onPrimaryButtonClick={onDelete}
        onSecondaryButtonClick={closeSecond}
        hideCloseButton
      />
    </>
  );
}

function useDeclineReasonForm({
  onUpdate,
  close,
  openSecond,
  fullName,
  showSuccessMessage,
  currentStage,
}: {
  onUpdate: (data: Partial<Applicant>) => void;
  close: () => void;
  openSecond: () => void;
  fullName: Applicant["fullName"];
  showSuccessMessage: (message: string) => void;
  currentStage: Applicant["currentStage"];
}) {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      declineReason: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    onUpdate({
      status: "Declined",
      declineReason: data.declineReason,
      currentStage: currentStage === 0 ? 0 : currentStage - 1,
    });
    close();
    showSuccessMessage(
      `${fullName} has been declined! Please remember to send a rejection email`,
    );

    setTimeout(() => {
      openSecond();
    }, 1300);
  };

  return {
    handleSubmit,
    control,
    onSubmit,
  };
}
