import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

import Divider from "../../../../ui/Divider";
import { type Job, type PerkBenefit } from "../../../types";
import ApplicationProgressBar from "../../../ui/ApplicationProgressBar";
import BenefitCard from "../../../ui/BenefitCard";
import CategoryChips from "../../../ui/CategoryChips";
import {
  BenefitsForm,
  CapacityForm,
  CategoriesForm,
  EmploymentTypesForm,
  NumberOfStagesForm,
  RequiredSkillsForm,
  SalaryForm,
  StagesForm,
  TextInputForm,
  TitleForm,
} from "../../../ui/forms";
import { TEXT_INPUT_FIELDS } from "../../data";
import BulletList from "../BulletList";

interface Props {
  job: Job;
  onUpdate: (data: Partial<Job>) => void;
}

interface FormInput {
  title: Job["title"];
  employmentTypes: Job["employmentTypes"];
  salary: Job["salary"];
  categories: Job["categories"];
  requiredSkills: Job["requiredSkills"];
  description: Job["description"];
  responsibilities: Job["responsibilities"];
  qualifications: Job["qualifications"];
  niceToHaves: Job["niceToHaves"];
  perksBenefits: Job["perksBenefits"];
  numberOfStages: Job["numberOfStages"];
  stages: Job["stages"];
  capacity: Job["capacity"];
}

export default function DetailsTab({ job, onUpdate }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { control, setValue, handleSubmit } = useJobDetailsForm({
    job,
    onUpdate,
  });
  const { md } = useBreakpoints();
  const [minSalary, maxSalary] = job.salary;

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const formatSalary = (salary: number) => {
    return `$${Math.round(salary / 1000)}k`;
  };

  return (
    <Stack gap={2}>
      <AppButton
        variant="outlined"
        onClick={() => {
          handleSubmit(() => {
            toggleEditMode?.();
          })();
        }}
        sx={{ alignSelf: "flex-end" }}
      >
        <Stack
          component="span"
          gap={1}
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          {isEditMode ? (
            <>
              <DoneOutlineOutlinedIcon /> {md && "Save"}
            </>
          ) : (
            <>
              <EditOutlinedIcon />
              {md && "Edit"}
            </>
          )}
        </Stack>
      </AppButton>
      <Stack gap={md ? 3 : 2}>
        <Grid container spacing={md ? 8 : 2}>
          <Grid item xs={12} md={8} mt={-5}>
            <Stack gap={md ? 4 : 2}>
              {isEditMode && (
                <Box>
                  <Typography variant="h2" color="text.secondary" mb={2}>
                    Job Title
                  </Typography>
                  <TitleForm control={control} />
                </Box>
              )}
              {TEXT_INPUT_FIELDS.map(
                ({ title, name, requireErrorText, placeholder }) => {
                  const isBulletList =
                    name === "responsibilities" ||
                    name === "qualifications" ||
                    name === "niceToHaves";

                  return (
                    <Box key={name}>
                      <Typography
                        variant="h2"
                        color="text.secondary"
                        mb={
                          (isEditMode && isBulletList) || name === "description"
                            ? 2
                            : 0
                        }
                      >
                        {title}
                      </Typography>
                      {isEditMode ? (
                        <TextInputForm
                          id={name}
                          control={control}
                          name={name}
                          requireErrorText={requireErrorText}
                          placeHolder={placeholder}
                        />
                      ) : isBulletList ? (
                        <BulletList items={job[name as keyof Job] as string} />
                      ) : (
                        job.description
                      )}
                    </Box>
                  );
                },
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack gap={md ? 4 : 2}>
              <Stack gap={2}>
                <Typography variant="h2" color="text.secondary">
                  About this role
                </Typography>
                {isEditMode && (
                  <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>Capacity</Typography>
                    <CapacityForm control={control} />
                  </Stack>
                )}
                <ApplicationProgressBar
                  capacity={job.capacity}
                  currentApplicants={4}
                  background
                />
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography>Job Type</Typography>
                  {isEditMode ? (
                    <EmploymentTypesForm control={control} />
                  ) : (
                    <Typography
                      color="text.secondary"
                      fontWeight={FontWeights.semibold}
                    >
                      {job.employmentTypes.join(", ")}
                    </Typography>
                  )}
                </Stack>
                <Stack
                  flexDirection={isEditMode ? "column" : "row"}
                  justifyContent="space-between"
                  gap={1}
                >
                  <Typography>Salary</Typography>
                  {isEditMode ? (
                    <SalaryForm control={control} />
                  ) : (
                    <Typography
                      color="text.secondary"
                      fontWeight={FontWeights.semibold}
                    >
                      {formatSalary(minSalary)}-{formatSalary(maxSalary)} USD
                    </Typography>
                  )}
                </Stack>
              </Stack>
              <Divider />
              <Box>
                <Typography
                  variant="h2"
                  color="text.secondary"
                  mb={isEditMode ? 2 : 0}
                >
                  Categories
                </Typography>
                {isEditMode ? (
                  <CategoriesForm control={control} />
                ) : (
                  <CategoryChips categories={job.categories} />
                )}
              </Box>
              <Divider />
              <Box>
                <Typography
                  variant="h2"
                  color="text.secondary"
                  mb={isEditMode ? 2 : 0}
                >
                  Required Skills
                </Typography>
                {isEditMode ? (
                  <RequiredSkillsForm control={control} />
                ) : (
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {job.requiredSkills.map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        sx={{
                          backgroundColor: Colors.lightViolet,
                          color: "primary.main",
                          borderRadius: 0,
                          ".MuiChip-deleteIcon": {
                            color: "primary.main",
                            fontSize: 18,
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
              <Divider />
              <Box>
                <Typography variant="h2" color="text.secondary" mb={2}>
                  Recruitment Stages
                </Typography>
                {isEditMode ? (
                  <Stack gap={2}>
                    <Stack
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography>Number of stages</Typography>
                      <NumberOfStagesForm control={control} />
                    </Stack>
                    <StagesForm
                      control={control}
                      numberOfStages={job.numberOfStages}
                      selectedStages={job.stages}
                      setValue={setValue}
                    />
                  </Stack>
                ) : (
                  <Box>
                    {job.stages.map((stage, index) => (
                      <Stack key={stage.id} sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          {index + 1}. {stage.title}
                        </Typography>
                        <Typography color={Colors.lightGrey} ml={2}>
                          {stage.email}
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
        <Stack>
          <Typography
            variant="h2"
            color="text.secondary"
            mb={isEditMode ? 2 : 0}
          >
            Perks & Benefits
          </Typography>
          {isEditMode ? (
            <BenefitsForm control={control} />
          ) : (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {job.perksBenefits.map((item) => (
                <BenefitCard key={item.id} val={item as PerkBenefit} />
              ))}
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

function useJobDetailsForm({ job, onUpdate }: Props) {
  const { control, watch, setValue, handleSubmit } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      title: job.title,
      employmentTypes: job.employmentTypes,
      salary: job.salary,
      categories: job.categories,
      requiredSkills: job.requiredSkills,
      description: job.description,
      responsibilities: job.responsibilities,
      qualifications: job.qualifications,
      niceToHaves: job.niceToHaves,
      perksBenefits: job.perksBenefits,
      numberOfStages: job.numberOfStages,
      stages: job.stages,
      capacity: job.capacity,
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateDebounced = useCallback(
    debounce((data: Partial<Job>) => {
      onUpdate(data);
    }, 500),
    [],
  );

  useEffect(() => {
    const formUpdateSubscription = watch((newValue) => {
      if (
        newValue.title &&
        newValue.categories &&
        newValue.employmentTypes &&
        newValue.salary &&
        newValue.requiredSkills &&
        newValue.description &&
        newValue.responsibilities &&
        newValue.qualifications &&
        newValue.niceToHaves &&
        newValue.perksBenefits &&
        newValue.capacity &&
        newValue.numberOfStages &&
        newValue.stages
      ) {
        onUpdateDebounced(newValue as Partial<Job>);
      }
    });

    return () => formUpdateSubscription.unsubscribe();
  }, [onUpdateDebounced, watch]);

  return {
    control,
    setValue,
    handleSubmit,
  };
}
