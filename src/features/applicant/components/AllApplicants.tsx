import { CircularProgress, Stack, Typography } from "@mui/material";

import { Colors } from "@config/styles";

import { useGetApplicantsQuery } from "../store/applicantsApi";
import ApplicantsTable from "../ui/ApplicantsTable";
import NoApplicants from "./NoApplicants";

export default function AllApplicants() {
  const {
    data: applicants,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useGetApplicantsQuery();

  if (isLoading) {
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess && applicants.length > 0) {
    return (
      <Stack sx={{ gap: { xs: 1.5, md: 3 } }}>
        <Stack
          sx={{
            width: 1,
            position: "fixed",
            bgcolor: Colors.white,
            zIndex: 1,
            pt: 3.1,
            mt: -3.1,
            pb: 2,
          }}
        >
          <Typography variant="h1" color="text.secondary">
            Total Applicants: {applicants.length}
          </Typography>
        </Stack>
        <Stack pt={5}>
          <ApplicantsTable applicants={applicants} />
        </Stack>
      </Stack>
    );
  } else if (isSuccess && applicants.length === 0) {
    return (
      <Stack
        alignItems="center"
        justifyContent={{ xs: "flex-start", md: "center" }}
        height="70%"
      >
        <NoApplicants />
      </Stack>
    );
  } else if (isError) {
    throw error;
  }

  return null;
}
