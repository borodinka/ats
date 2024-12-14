import type { Control } from "react-hook-form";

import CloseIcon from "@mui/icons-material/Close";
import { Chip } from "@mui/material";

import { Colors } from "@config/styles";

import { skills } from "../../data";
import { isCustomSelectObject } from "../../utils";
import CustomSelect from "../CustomSelect";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
}

export default function RequiredSkillsForm({ control }: Props) {
  return (
    <CustomSelect
      id="requiredSkills"
      name="requiredSkills"
      control={control}
      requireErrorText="required skills"
      buttonText="Skills"
      items={skills.map((skill) => skill)}
      renderSelectedItem={(item, removeItem) => {
        return (
          !isCustomSelectObject(item) && (
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
  );
}
