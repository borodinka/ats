import { type SubmitHandler, useForm } from "react-hook-form";

import { Box, Stack } from "@mui/material";

import Divider from "@features/ui/Divider";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { useAppDispatch, useAppSelector } from "@store/index";

import type { Job } from "../../../types";
import { BenefitsForm } from "../../../ui/forms";
import { nextStep, selectJob, setBenefits } from "../../store/jobWizardSlice";
import Pagination from "../navigation/Pagination";
import GuideText from "./ui/GuideText";

interface FormInput {
  perksBenefits: Job["perksBenefits"];
}

export default function Benefits() {
  const { handleSubmit, control, onSubmit } = useBenefitsForm();
  const { md } = useBreakpoints();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <Box
        display="flex"
        gap={!md ? 2 : 15}
        flexDirection={!md ? "column" : "row"}
      >
        <GuideText
          title="Perks and Benefits"
          subtitle="Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees"
        />
        <BenefitsForm control={control} />
      </Box>
      <Divider />
      <Pagination />
    </Stack>
  );
}

function useBenefitsForm() {
  const job = useAppSelector(selectJob);
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      perksBenefits: job.perksBenefits,
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(nextStep());
    dispatch(setBenefits(data.perksBenefits));
  };

  return {
    handleSubmit,
    control,
    onSubmit,
  };
}
