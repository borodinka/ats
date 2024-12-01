import { type PerksBenefits } from "./benefits/data";
import { type RecruitmentStages } from "./recruitmentStages/data";

export type ObjectType = string | PerksBenefits | RecruitmentStages;

export const isObjectItem = (
  item: ObjectType,
): item is PerksBenefits | RecruitmentStages => {
  return typeof item !== "string";
};
