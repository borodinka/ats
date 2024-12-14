import { Colors, theme } from "@config/styles";

import {
  type CustomSelectType,
  type EmploymentType,
  type JobCategory,
  type PerkBenefit,
  type RecruitmentStage,
} from "./types";

export const getEmploymentTypeColor = (type: EmploymentType): string => {
  switch (type) {
    case "Full-Time":
      return Colors.aquamarine;
    case "Part-Time":
      return Colors.orange;
    case "Remote":
      return Colors.blue;
    case "Internship":
      return Colors.tomato;
    case "Contract":
      return theme.palette.primary.main;
    default:
      return theme.palette.text.primary;
  }
};

export const getCategoryColor = (category: JobCategory): string => {
  switch (category) {
    case "Design":
      return theme.palette.primary.main;
    case "Sales":
      return Colors.tomato;
    case "Marketing":
      return Colors.orange;
    case "Business":
      return Colors.aquamarine;
    case "Finance":
      return Colors.amethyst;
    case "Engineering":
      return Colors.pink;
    case "Technology":
      return Colors.blue;
    default:
      return theme.palette.text.primary;
  }
};

export const isCustomSelectObject = (
  item: CustomSelectType,
): item is PerkBenefit | RecruitmentStage => {
  return typeof item !== "string";
};
