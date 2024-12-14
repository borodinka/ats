import { LinkProps, createTheme } from "@mui/material";

import { Colors } from "./Colors";
import { FontFamilies } from "./FontFamilies";
import { FontWeights } from "./FontWeights";
import LinkBehavior from "./LinkBehavior";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4640DE",
    },
    text: {
      primary: "#515B6F",
      secondary: "#25324B",
    },
    grey: {
      [100]: "#7C8493",
      [200]: "#202430",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: FontWeights.semibold,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: Colors.primaryGrey,
          borderRadius: 0,
          borderWidth: "1.5px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.grey[100],
        }),
      },
    },
  },
});

theme.typography.h1 = {
  fontSize: "2rem",
  lineHeight: "2.4rem",
  fontFamily: FontFamilies.bricolageGrotesque,
  fontWeight: FontWeights.semibold,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
  },
};

theme.typography.h2 = {
  fontSize: "1.5rem",
  lineHeight: "1.8rem",
  fontFamily: FontFamilies.bricolageGrotesque,
  fontWeight: FontWeights.semibold,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
    lineHeight: "1.7rem",
  },
};

theme.typography.h3 = {
  fontSize: "1.25rem",
  lineHeight: "1.5rem",
  fontFamily: FontFamilies.bricolageGrotesque,
  fontWeight: FontWeights.semibold,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.125rem",
    lineHeight: "1.4rem",
  },
};

theme.typography.h4 = {
  fontSize: "1.125rem",
  lineHeight: "1.8rem",
  fontFamily: FontFamilies.epilogue,
  fontWeight: FontWeights.semibold,
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    lineHeight: "1.6rem",
  },
};

theme.typography.h5 = {
  fontSize: "1rem",
  lineHeight: "1.6rem",
  fontFamily: FontFamilies.epilogue,
  fontWeight: FontWeights.semibold,
};

theme.typography.body1 = {
  fontSize: "1rem",
  lineHeight: "1.6rem",
  fontFamily: FontFamilies.epilogue,
  fontWeight: FontWeights.regular,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
  },
};

theme.typography.body2 = {
  fontSize: "1rem",
  lineHeight: "1.6rem",
  fontFamily: FontFamilies.epilogue,
  fontWeight: FontWeights.bold,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
  },
};

theme.typography.subtitle1 = {
  fontSize: "0.875rem",
  lineHeight: "1.5rem",
  fontFamily: FontFamilies.epilogue,
  fontWeight: FontWeights.regular,
};

theme.typography.subtitle2 = {
  fontSize: "0.875rem",
  lineHeight: "1.5rem",
  fontFamily: FontFamilies.epilogue,
  fontWeight: FontWeights.bold,
};

export default theme;
