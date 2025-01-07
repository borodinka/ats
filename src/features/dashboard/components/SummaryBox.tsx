import { useNavigate } from "react-router-dom";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton, Stack, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import { useGetApplicantsQuery } from "@features/applicant/store/applicantsApi";

interface Props {
  bg: string;
  text: string;
  count: number;
  page: string;
}

export default function SummaryBox({ bg, text, count, page }: Props) {
  const navigate = useNavigate();
  const { data: applicants } = useGetApplicantsQuery();
  const applicant = applicants?.find(
    (applicant) => applicant.status === "Final Decision",
  );

  const handleClick = () => {
    navigate(
      page === "offers"
        ? AppRoutes.jobs
        : page === "schedule"
          ? AppRoutes.schedule
          : `${AppRoutes.jobs}/${applicant?.jobId}/applicants/${applicant?.id}`,
    );
  };

  return (
    <Stack
      sx={{
        py: { xs: 2, md: 3 },
        pl: { xs: 2, md: 3 },
        pr: 2,
        bgcolor: bg,
        width: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "2.3rem", sm: "2.7rem" } }}
          fontWeight={FontWeights.semibold}
          color={Colors.white}
        >
          {count}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={FontWeights.medium}
          color={Colors.white}
        >
          {text}
        </Typography>
      </Stack>
      <IconButton
        aria-label="navigate to page"
        onClick={handleClick}
        disabled={count === 0}
        sx={{ p: 1.5 }}
      >
        <ArrowForwardIosIcon sx={{ color: Colors.white }} />
      </IconButton>
    </Stack>
  );
}
