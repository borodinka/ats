import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  Box,
  type CSSObject,
  Drawer,
  type Theme,
  Toolbar,
  styled,
} from "@mui/material";

import { useBreakpoints } from "@hooks/useBreakpoints";

import AccountSidebar from "./AccountSidebar";
import StyledAppBar from "./StyledAppBar";

const DESKTOP_DRAWER_WIDTH = 272;
const DESKTOP_MINIMIZED_DRAWER_WIDTH = 94;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DESKTOP_DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: DESKTOP_MINIMIZED_DRAWER_WIDTH,
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DESKTOP_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AccountLayout() {
  const { md } = useBreakpoints();
  const [isOpen, setOpen] = useState(true);

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Desktop */}
      {md && (
        <>
          <StyledAppBar />
          <StyledDrawer variant="permanent" open={isOpen}>
            <AccountSidebar
              onClose={closeDrawer}
              isMinimized={!isOpen}
              onClick={handleDrawerToggle}
            />
          </StyledDrawer>
        </>
      )}
      {/* Mobile */}
      {!md && (
        <>
          <StyledAppBar onClick={handleDrawerToggle} />
          <Drawer
            variant="temporary"
            open={isOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DESKTOP_DRAWER_WIDTH,
              },
            }}
          >
            <AccountSidebar onClose={closeDrawer} />
          </Drawer>
        </>
      )}
      <Box
        component="main"
        sx={{
          width: "100%",
          minHeight: "100vh",
          height: "auto",
          px: {
            xs: 2,
            md: 4,
          },
          pt: {
            xs: 0,
            md: 3,
          },
          pb: 4,
        }}
      >
        <Toolbar sx={{ mt: 1.5, mb: 1 }} />
        <Outlet />
      </Box>
    </Box>
  );
}
