import { Stack, Typography } from "@mui/material";

import { useBreakpoints } from "@hooks/useBreakpoints";

import NoApplicantsImage from "../assets/no-applicants.png";

interface Props {
  isJobView?: boolean;
}

export default function NoApplicants({ isJobView }: Props) {
  const { md } = useBreakpoints();

  return (
    <Stack>
      <img
        src={NoApplicantsImage}
        alt="Empty clipboards"
        style={{
          display: "block",
          width: !md ? (isJobView ? 250 : 330) : isJobView ? 330 : 400,
        }}
      />
      <Stack gap={2} textAlign="center">
        <Typography variant="h2" color="text.secondary">
          No applicants here
        </Typography>
        <Typography>Add one to get started!</Typography>
      </Stack>
    </Stack>
  );
}
