import { jobCategories, skills, typesOfEmployment } from "./data";

export type EmploymentType = (typeof typesOfEmployment)[number];

export type JobCategory = (typeof jobCategories)[number];

export type Skill = (typeof skills)[number];

export interface PerkBenefit {
  id: string;
  Icon: string;
  title: string;
  description: string;
}

export interface RecruitmentStage {
  id: string;
  title: string;
  description: string;
  email?: string;
}

export interface Job {
  id: string;
  title: string;
  employmentTypes: EmploymentType[];
  categories: JobCategory[];
  salary: [number, number];
  requiredSkills: Skill[];
  description: string;
  responsibilities: string;
  qualifications: string;
  niceToHaves: string;
  perksBenefits: PerkBenefit[];
  numberOfStages: number;
  stages: RecruitmentStage[];
  capacity: number;
}
