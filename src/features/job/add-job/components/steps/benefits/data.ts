import type { Job } from "../../../../types";
import CameraIcon from "./assets/Camera.svg";
import CharityIcon from "./assets/Charity.svg";
import HealthIcon from "./assets/Health.svg";
import TeaIcon from "./assets/Tea.svg";
import TeamIcon from "./assets/Team.svg";
import TrainIcon from "./assets/Train.svg";
import VacationIcon from "./assets/Vacation.svg";

export const PERKS_BENEFITS: Job["perksBenefits"] = [
  {
    id: "1",
    Icon: HealthIcon,
    title: "Full Healthcare",
    description:
      "We believe in thriving communities and that starts with our team being happy and healthy",
  },
  {
    id: "2",
    Icon: VacationIcon,
    title: "Unlimited Vacation",
    description:
      "We believe you should have a flexible schedule that makes space for family, wellness, and fun",
  },
  {
    id: "3",
    Icon: CameraIcon,
    title: "Skill Development",
    description:
      "We believe in always learning and leveling up our skills. Whether it's a conference or online course",
  },
  {
    id: "4",
    Icon: TeamIcon,
    title: "Team Summits",
    description:
      "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter",
  },
  {
    id: "5",
    Icon: TeaIcon,
    title: "Remote Working",
    description:
      "You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it",
  },
  {
    id: "6",
    Icon: TrainIcon,
    title: "Commuter Benefits",
    description:
      "We're grateful for all the time and energy each team member puts into getting to work every day",
  },
  {
    id: "7",
    Icon: CharityIcon,
    title: "We give back",
    description:
      "We anonymously match any donation our employees make so they can support the organizations they care about most",
  },
];
