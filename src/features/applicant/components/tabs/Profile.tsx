import { Stack, Typography } from "@mui/material";

import { theme } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import type { Applicant } from "../../types";

interface Props {
  applicant: Applicant;
}

export default function Profile({ applicant }: Props) {
  const { md } = useBreakpoints();

  return (
    <Stack gap={md ? 4 : 2}>
      {!md && (
        <>
          <Stack>
            <Typography color={theme.palette.grey[100]}>Email</Typography>
            <Typography color="text.secondary">{applicant.email}</Typography>
          </Stack>
          <Stack>
            <Typography color={theme.palette.grey[100]}>Phone</Typography>
            <Typography color="text.secondary">{applicant.phone}</Typography>
          </Stack>
        </>
      )}
      <Stack>
        <Typography color={theme.palette.grey[100]}>About Me</Typography>
        <Typography color="text.secondary">
          {applicant.aboutMe ? applicant.aboutMe : "Not provided"}
        </Typography>
      </Stack>
      <Stack>
        <Typography color={theme.palette.grey[100]}>Address</Typography>
        <Typography color="text.secondary">
          {applicant.address ? applicant.address : "Not provided"}
        </Typography>
      </Stack>
      <Stack>
        <Typography color={theme.palette.grey[100]}>Education</Typography>
        <Typography color="text.secondary">{applicant.education}</Typography>
      </Stack>
      <Stack>
        <Typography color={theme.palette.grey[100]}>
          Experience in Years
        </Typography>
        <Typography color="text.secondary">
          {applicant.yearsOfExperience === 0
            ? "No experience"
            : `${applicant.yearsOfExperience} ${applicant.yearsOfExperience === 1 ? "year" : "years"}`}
        </Typography>
      </Stack>
      {applicant.declineReason && (
        <Stack>
          <Typography color={theme.palette.grey[100]}>
            Reason for Non-Selection
          </Typography>
          <Typography color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
            {applicant.declineReason}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
