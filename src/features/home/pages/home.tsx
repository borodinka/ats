import { Box, Grid, Link, Stack, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import AppButton from "@features/ui/AppButton";
import Logo from "@features/ui/logo/Logo";
import { useBreakpoints } from "@hooks/useBreakpoints";

import CalendarImage from "../assets/calendar.png";
import HeroImage from "../assets/hero.webp";
import PostImage from "../assets/post.png";
import ProfilesImage from "../assets/profiles.png";
import TrackingImage from "../assets/tracking.png";

export default function Home() {
  const { md } = useBreakpoints();
  return (
    <Box sx={{ minHeight: "100vh", height: "auto", maxHeight: "auto" }}>
      <Box sx={{ bgcolor: Colors.lightViolet }}>
        {/* Header Section */}
        <Box p={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "1200px",
              m: "0 auto",
            }}
          >
            <Logo />
            <Box>
              <AppButton
                LinkComponent={Link}
                href={AppRoutes.login}
                variant="outlined"
                sx={{ mr: { xs: 1, md: 2 }, px: 3 }}
              >
                Login
              </AppButton>
              <AppButton LinkComponent={Link} href={AppRoutes.signUp}>
                Sign Up
              </AppButton>
            </Box>
          </Box>
        </Box>
        {/* Hero Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ maxWidth: "1200px", m: "0 auto" }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h1"
                  color="text.secondary"
                  fontWeight={FontWeights.bold}
                  sx={{
                    fontSize: { xs: "2.2rem", md: "4rem" },
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  Recruit Smarter,
                </Typography>
                <Typography
                  variant="h1"
                  color={Colors.blue}
                  fontWeight={FontWeights.bold}
                  sx={{
                    fontSize: { xs: "2.2rem", md: "4rem" },
                    pt: { xs: 1, md: 3 },
                    pb: { xs: 2, md: 3 },
                  }}
                >
                  Hire Faster
                </Typography>
                <Typography>
                  Take your hiring process to the next level with AI-powered
                  tools and an intuitive platform. Post jobs, track applicants,
                  and manage interviews effortlessly — all in one place
                </Typography>
                <AppButton
                  LinkComponent={Link}
                  href={AppRoutes.signUp}
                  fullWidth={!md}
                  sx={{ mt: 2, px: 8 }}
                >
                  Get Started
                </AppButton>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: { xs: "none", md: "inline-block" } }}
              >
                <img
                  src={HeroImage}
                  alt="Hand shake"
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    boxShadow: "0px 0px 30px 5px  rgba(124, 132, 147, 1)",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* Features Section */}
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: "1200px", m: "0 auto" }}>
          <Typography
            variant="h2"
            textAlign="center"
            my={1}
            color="text.secondary"
          >
            Why Choose HireWise?
          </Typography>
          <Typography textAlign="center" color={theme.palette.grey[100]}>
            Discover tools that simplify hiring, save time, and help you find
            the perfect candidates
          </Typography>
          <Stack pb={md ? 0 : 2}>
            {[
              {
                title: "Posting Job Offers",
                description:
                  "Easily create and publish job offers with detailed requirements, and manage recruitment stages to find the right candidates",
                src: PostImage,
              },
              {
                title: "Tracking Applicants",
                description:
                  "Effortlessly manage applicants through each stage of the recruitment process with real-time updates, providing seamless tracking and detailed insights",
                src: TrackingImage,
              },
              {
                title: "AI-Generated Profiles",
                description:
                  "Save hours by uploading resumes, and let our AI automatically generate structured profiles for easy management and organization",
                src: ProfilesImage,
              },
              {
                title: "Interview Scheduler",
                description:
                  "Manage your interviews with our advanced scheduler, ensuring easy coordination and smooth organization of appointments",
                src: CalendarImage,
              },
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: index % 2 === 0 ? "row" : "row-reverse",
                  },
                  alignItems: "center",
                  gap: { md: 4 },
                  mt: { xs: 0, md: -2 },
                }}
              >
                <Box
                  width={md ? "40%" : 1}
                  textAlign={
                    md ? (index % 2 === 0 ? "start" : "end") : "center"
                  }
                >
                  <img
                    src={feature.src}
                    alt={`${feature.title} picture`}
                    style={{
                      width: md ? 250 : 200,
                      height: md ? 250 : 200,
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5">{feature.title}</Typography>
                  <Typography>{feature.description}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: "text.secondary",
          color: Colors.white,
          p: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: "1200px", m: "0 auto", textAlign: "center" }}>
          <Typography variant="body2">
            &copy;2025 HireWise. All rights reserved
          </Typography>
          <Typography>
            Contact us at support@hirewise.com | Privacy Policy | Terms of
            Service
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
