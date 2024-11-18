import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

import RecruitmentStages from "./components/steps/RecruitmentStages";
import Benefits from "./components/steps/benefits";
import JobDescription from "./components/steps/jobDescription";
import JobInfo from "./components/steps/jobInfo";
import { WizardSteps } from "./types";

export const WIZARD_STEPS: WizardSteps[] = [
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
    title: "Perks & Benefit",
    Icon: CardGiftcardOutlinedIcon,
    Component: Benefits,
  },
  {
    title: "Recruitment Stages",
    Icon: BallotOutlinedIcon,
    Component: RecruitmentStages,
  },
];
