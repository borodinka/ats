import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Colors, theme } from "@config/styles";
import Divider from "@features/ui/Divider";
import { useBreakpoints } from "@hooks/useBreakpoints";

import Pagination from "../../navigation/Pagination";
import CustomSelect from "../ui/CustomSelect";
import GuideText from "../ui/GuideText";
import ValueBlock from "./ValueBlock";
import { jobCategories, skills, typesOfEmployment } from "./data";

interface FormInput {
  title: string;
  employmentTypes: string[];
  salary: [number, number];
  categories: string[];
  requiredSkills: string[];
}

export default function JobInfo() {
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      title: "",
      employmentTypes: [],
      salary: [35000, 80000],
      categories: [],
      requiredSkills: [],
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);
  const { md } = useBreakpoints();
  const BOX_STYLES = {
    display: "flex",
    gap: !md ? 2 : 15,
    flexDirection: !md ? "column" : "row",
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <Controller
        name="title"
        control={control}
        rules={{ required: "Please specify job title" }}
        render={({ field: { ref, ...field }, fieldState }) => (
          <Box sx={BOX_STYLES}>
            <GuideText
              title="Job Title"
              subtitle="Specify the title of the position to clearly define the role"
            />
            <Stack gap={0.5} width={md ? 430 : 1}>
              <TextField
                id="title"
                inputRef={ref}
                variant="outlined"
                required
                fullWidth
                placeholder="e.g. Software Engineer"
                inputProps={{ maxLength: 80 }}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                autoFocus
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: Colors.primaryGrey,
                    borderWidth: "1.5px",
                  },
                }}
                {...field}
              />
              {!fieldState.error?.message && (
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography variant="subtitle1" color={Colors.lightGrey}>
                    Maximum 80 characters
                  </Typography>
                  <Typography variant="subtitle1" color="text.primary">
                    {`${field.value.length}/80`}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        )}
      />
      <Divider />
      <Controller
        name="employmentTypes"
        control={control}
        rules={{
          validate: (value) =>
            value?.length > 0 || "Please select type of employment",
        }}
        render={({ field: { value, ...field }, fieldState }) => (
          <Box sx={BOX_STYLES}>
            <GuideText
              title="Type of Employment"
              subtitle="You can select multiple type of employment"
            />
            <FormGroup
              id="employmentTypes"
              sx={{
                my: -1,
                display: "grid",
                gridTemplateColumns: !md ? "1fr 1fr" : "1fr",
              }}
            >
              {typesOfEmployment.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={value?.includes(type)}
                      onChange={(e) => {
                        const selectedTypes = value || [];
                        if (e.target.checked) {
                          field.onChange([...selectedTypes, type]);
                        } else {
                          field.onChange(
                            selectedTypes.filter((item) => item !== type),
                          );
                        }
                      }}
                      sx={{ color: Colors.primaryGrey }}
                    />
                  }
                  label={type}
                  sx={{
                    ".MuiTypography-root": {
                      ml: !md ? "4px" : "8px",
                    },
                  }}
                />
              ))}
              <FormHelperText error={Boolean(fieldState.error)}>
                {fieldState.error?.message}
              </FormHelperText>
            </FormGroup>
          </Box>
        )}
      />
      <Divider />
      <Controller
        name="categories"
        control={control}
        rules={{
          validate: (value) => value.length > 0 || "Please select job category",
        }}
        render={({ field: { value, ...field }, fieldState }) => (
          <Box sx={BOX_STYLES}>
            <GuideText
              title="Categories"
              subtitle="You can select multiple job categories"
            />
            <FormControl
              sx={{ width: md ? 314 : 1 }}
              error={Boolean(fieldState.error)}
            >
              <Select
                id="categories"
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: Colors.primaryGrey,
                    borderWidth: "1.5px",
                  },
                }}
                multiple
                displayEmpty
                value={value}
                onChange={field.onChange}
                input={<OutlinedInput />}
                IconComponent={ExpandMoreIcon}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.length === 0 ? (
                      <Typography color={Colors.lightGrey}>
                        Select Job Category
                      </Typography>
                    ) : (
                      selected.map((val) => (
                        <Chip
                          key={val}
                          label={val}
                          sx={{
                            backgroundColor: Colors.lavender,
                            color: "text.secondary",
                          }}
                        />
                      ))
                    )}
                  </Box>
                )}
              >
                {jobCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={Boolean(fieldState.error)}>
                {fieldState.error?.message}
              </FormHelperText>
            </FormControl>
          </Box>
        )}
      />
      <Divider />
      <Controller
        name="salary"
        control={control}
        rules={{
          validate: (value) =>
            (value?.[0] > 0 && value?.[1] > 0 && value?.[0] < value?.[1]) ||
            "Please select a valid salary range",
        }}
        render={({ field: { value, ...field }, fieldState }) => (
          <Box sx={BOX_STYLES}>
            <GuideText
              title="Salary"
              subtitle="Please specify the estimated salary range for the role"
            />
            <Stack>
              <Box
                display="flex"
                justifyContent={md ? "space-around" : "space-between"}
                mb={2.5}
                alignItems="center"
              >
                <ValueBlock value={value[0]} />
                <Typography color={theme.palette.grey[100]}>to</Typography>
                <ValueBlock value={value[1]} />
              </Box>
              <Slider
                id="salary"
                value={value}
                onChange={field.onChange}
                min={0}
                max={150000}
                step={1000}
                sx={{
                  ".MuiSlider-rail": {
                    opacity: 0.1,
                  },
                  width: md ? 446 : 1,
                  height: 6,
                }}
              />
              <FormHelperText error={Boolean(fieldState.error)}>
                {fieldState.error?.message}
              </FormHelperText>
            </Stack>
          </Box>
        )}
      />
      <Divider />
      <CustomSelect
        id="requiredSkills"
        name="requiredSkills"
        control={control}
        title="Required Skills"
        subtitle="Add required skills for the job"
        requireErrorText="required skills"
        buttonText="Skills"
        items={skills.map((skill) => skill)}
        renderSelectedItem={(item, removeItem) => {
          return (
            typeof item === "string" && (
              <Chip
                key={item}
                label={item}
                onDelete={() => removeItem(item)}
                deleteIcon={<CloseIcon />}
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
            )
          );
        }}
      />
      <Divider />
      <Pagination />
    </Stack>
  );
}
