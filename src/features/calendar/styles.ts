import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";

export const CALENDAR_STYLES = {
  ".fc-today-button": {
    backgroundColor: "inherit !important",
    color: `${theme.palette.primary.main} !important`,
    borderColor: `${Colors.primaryGrey} !important`,
    borderWidth: "1px !important",
    borderRadius: "0 !important",
    fontWeight: `${FontWeights.bold} !important`,
    px: 3,
    py: 1.5,
    boxShadow: "none !important",
    ml: { md: 30, lg: -8, xl: -14 },
    "&:hover": {
      backgroundColor: "rgba(70, 64, 222, 0.04) !important",
      borderColor: "rgb(193, 199, 212) !important",
      cursor: "pointer",
    },
  },
  ".fc-toolbar.fc-header-toolbar ": {
    mb: { xs: 1, md: 2 },
  },
  ".fc-header-toolbar button": {
    textTransform: "capitalize",
  },
  ".fc-toolbar-title": {
    textTransform: "uppercase",
    fontSize: { xs: 14, md: 16 },
    color: "text.secondary",
  },
  ".fc-header-toolbar .fc-toolbar-chunk:nth-of-type(2) div": {
    display: "flex !important",
    alignItems: "center",
    gap: 1,
  },
  ".fc-prev-button, .fc-next-button": {
    background: "none !important",
    border: "none !important",
    color: `${theme.palette.primary.main} !important`,
    "&:hover, &:focus, &:active": {
      border: "none !important",
      boxShadow: "none !important",
    },
  },
  ".fc-button-primary:not(:disabled).fc-button-active": {
    boxShadow: "none !important",
    color: `${theme.palette.text.secondary} !important`,
    borderBottom: `3px solid ${theme.palette.primary.main} !important`,
  },
  ".fc-button-group button": {
    background: "none !important",
    color: `${theme.palette.grey[100]} !important`,
    fontWeight: `${FontWeights.semibold} !important`,
    borderBottom: "3px solid !important",
    borderRadius: "0 !important",
    borderColor: "transparent !important",
    mx: 1,
    "&:focus, &:active": {
      boxShadow: "none !important",
      color: `${theme.palette.text.secondary} !important`,
      borderBottom: `3px solid ${theme.palette.primary.main} !important`,
    },
    "&:hover": {
      boxShadow: "none !important",
      color: "rgb(95, 103, 118) !important",
    },
  },
  ".fc-day-today": {
    backgroundColor: `${Colors.lightTomato} !important`,
  },
  ".fc-col-header-cell": {
    backgroundColor: "transparent !important",
  },
  ".fc-v-event": {
    border: "none",
    backgroundColor: "transparent !important",
  },
  ".fc-daygrid-dot-event:hover": {
    backgroundColor: "transparent !important",
  },
  ".fc-timegrid-event": {
    boxShadow: "none !important",
  },
  ".fc-timegrid-body table": {
    width: "100% !important",
  },
  ".fc-scrollgrid-section-body table": {
    width: "100% !important",
  },
  height: 1,
  mt: { md: -5, lg: -0.5 },
  width: 1,
  pb: { xs: 2, md: 0 },
};
