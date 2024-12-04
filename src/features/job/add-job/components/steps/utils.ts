import { type PerkBenefit, type RecruitmentStage } from "../../../types";
import type { CustomSelectType } from "../../types";

export const isCustomSelectObject = (
  item: CustomSelectType,
): item is PerkBenefit | RecruitmentStage => {
  return typeof item !== "string";
};
