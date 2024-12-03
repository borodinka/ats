import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

import { type PerkBenefit, type RecruitmentStage, type Skill } from "../types";

export interface WizardStep {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  Component: () => JSX.Element;
}

export type CustomSelectType = Skill | PerkBenefit | RecruitmentStage;
