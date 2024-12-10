import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

import { AppRoutes } from "@config/routes/AppRoutes";

interface AccountLinks {
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  text: string;
  path: string;
}

export const ACCOUNT_LINKS: AccountLinks[] = [
  {
    Icon: HomeOutlinedIcon,
    text: "Dashboard",
    path: AppRoutes.dashboard,
  },
  {
    Icon: GroupsOutlinedIcon,
    text: "All Applicants",
    path: AppRoutes.applicants,
  },
  {
    Icon: AssignmentOutlinedIcon,
    text: "Job Listings",
    path: AppRoutes.jobs,
  },
  {
    Icon: EventOutlinedIcon,
    text: "My Schedule",
    path: AppRoutes.schedule,
  },
];
