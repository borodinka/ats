import { Outlet, useLocation } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";

import LoginBackground from "@features/auth/assets/login-background.jpg";
import SignUpBackground from "@features/auth/assets/sign-up-background.jpg";
import { useBreakpoints } from "@hooks/useBreakpoints";

import Divider from "../Divider";
import Logo from "../logo/Logo";

export default function AuthLayout() {
  const { md } = useBreakpoints();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "100vh",
        height: "100vh",
        maxHeight: "-webkit-fill-available",
        position: "relative",
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: `url(${
            isLoginPage ? LoginBackground : SignUpBackground
          })`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {md && (
          <Box
            sx={{
              position: "absolute",
              top: "5%",
              left: "15%",
            }}
          >
            <Logo />
          </Box>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "100%",
            mx: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 400,
          }}
        >
          {!md && (
            <Box mb={4}>
              <Logo />
            </Box>
          )}
          <Typography variant="h1" color="text.secondary" mb={3}>
            {isLoginPage ? "Welcome back!" : "Get more opportunities!"}
          </Typography>
          <Divider />
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}
