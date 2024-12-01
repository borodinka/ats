import { useEffect, useState } from "react";
import { type Control, Controller, useFormState } from "react-hook-form";

import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { type RecruitmentStages } from "./data";

interface Props {
  key: React.Key;
  stage: RecruitmentStages;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  index: number;
  stageNumber: number;
}

interface FormData {
  stages: {
    email: string;
  }[];
}

export default function StageCard({
  onClose,
  stage,
  control,
  index,
  stageNumber,
}: Props) {
  const { md } = useBreakpoints();
  const [expanded, setExpanded] = useState(false);
  const { errors } = useFormState<FormData>({ control });
  const fieldError = errors?.stages?.[index]?.email;
  useEffect(() => {
    if (fieldError) {
      setExpanded(true);
    }
  }, [fieldError]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Typography color="text.secondary" variant="h5">
        {stageNumber}.
      </Typography>
      <Accordion
        expanded={expanded}
        onChange={(_, isExpanded) => setExpanded(isExpanded)}
        sx={{ maxWidth: md ? 450 : 1, width: 1 }}
      >
        <AccordionSummary
          expandIcon={<InfoOutlinedIcon sx={{ color: "primary.main" }} />}
          aria-controls={`panel${stage.title}-content`}
          id={`panel${stage.title}-header`}
          sx={{
            bgcolor: Colors.lightViolet,
            pr: 7,
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "rotate(0deg)",
            },
          }}
        >
          <Typography color="text.secondary">{stage.title}</Typography>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {stage.description}
          </Typography>
          <Typography variant="subtitle2">Employee Email</Typography>
          <Controller
            name={`stages[${index}].email`}
            control={control}
            rules={{
              required: "Please specify email of the employee",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            defaultValue=""
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                inputRef={ref}
                variant="outlined"
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                sx={{
                  "& .MuiOutlinedInput-input": {
                    p: 0.5,
                    color: Colors.lightGrey,
                  },
                }}
                {...field}
              />
            )}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
