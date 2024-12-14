import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

import Benefits from "./components/steps/Benefits";
import JobInfo from "./components/steps/JobInfo";
import RecruitmentStages from "./components/steps/RecruitmentStages";
import JobDescription from "./components/steps/jobDescription";
import type { WizardStep } from "./types";

export const WIZARD_STEPS: WizardStep[] = [
  {
    title: "Job Information",
    Icon: BusinessCenterOutlinedIcon,
    Component: JobInfo,
  },
  {
    title: "Job Description",
    Icon: AssignmentOutlinedIcon,
    Component: JobDescription,
  },
  {
    title: "Perks & Benefits",
    Icon: CardGiftcardOutlinedIcon,
    Component: Benefits,
  },
  {
    title: "Recruitment Stages",
    Icon: BallotOutlinedIcon,
    Component: RecruitmentStages,
  },
];
