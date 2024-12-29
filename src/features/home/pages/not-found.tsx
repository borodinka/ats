import { Link, Stack, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

import NotFoundImage from "../assets/not-found.png";

export default function NotFound() {
  const { md } = useBreakpoints();

  return (
    <Stack
      sx={{
        width: "100vw",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        p: 3,
      }}
    >
      <Typography variant="h1" color="text.secondary">
        This page is out of this world!
      </Typography>
      <Typography textAlign="center">
        Let's navigate back to safety. Click below to return home
      </Typography>
      <img
        src={NotFoundImage}
        alt="Hand shake"
        style={{ width: md ? 550 : 380 }}
      />
      <AppButton LinkComponent={Link} href={AppRoutes.home} sx={{ mt: 2 }}>
        Go Home
      </AppButton>
    </Stack>
  );
}
