import CameraIcon from "./assets/Camera.svg";
import CharityIcon from "./assets/Charity.svg";
import HealthIcon from "./assets/Health.svg";
import TeaIcon from "./assets/Tea.svg";
import TeamIcon from "./assets/Team.svg";
import TrainIcon from "./assets/Train.svg";
import VacationIcon from "./assets/Vacation.svg";

export interface PerksBenefits {
  Icon: string;
  title: string;
  description: string;
}

export const PERKS_BENEFITS: PerksBenefits[] = [
  {
    Icon: HealthIcon,
    title: "Full Healthcare",
    description:
      "We believe in thriving communities and that starts with our team being happy and healthy",
  },
  {
    Icon: VacationIcon,
    title: "Unlimited Vacation",
    description:
      "We believe you should have a flexible schedule that makes space for family, wellness, and fun",
  },
  {
    Icon: CameraIcon,
    title: "Skill Development",
    description:
      "We believe in always learning and leveling up our skills. Whether it's a conference or online course",
  },
  {
    Icon: TeamIcon,
    title: "Team Summits",
    description:
      "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter",
  },
  {
    Icon: TeaIcon,
    title: "Remote Working",
    description:
      "You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it",
  },
  {
    Icon: TrainIcon,
    title: "Commuter Benefits",
    description:
      "We're grateful for all the time and energy each team member puts into getting to work every day",
  },
  {
    Icon: CharityIcon,
    title: "We give back",
    description:
      "We anonymously match any donation our employees make so they can support the organizations they care about most",
  },
];
