import { Stack, Typography } from "@mui/material";

import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import { useGetApplicantsQuery } from "@features/applicant/store/applicantsApi";
import { selectUser } from "@features/auth/store/authSlice";
import { useGetEventsQuery } from "@features/calendar/store/eventsApi";
import { useGetJobsQuery } from "@features/job/store/jobsApi";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { useAppSelector } from "@store/index";

import EmploymentTypeChart from "./EmploymentTypeChart";
import JobStatusChart from "./JobStatusChart";
import SummaryBox from "./SummaryBox";

export default function Overview() {
  const user = useAppSelector(selectUser);
  const { data: jobs } = useGetJobsQuery();
  const { data: events } = useGetEventsQuery();
  const { data: applicants } = useGetApplicantsQuery();
  const { md } = useBreakpoints();

  const userFullName = user?.displayName?.split(" ")[0];

  const activeJobOffersCount =
    jobs?.filter(
      (job) => job.applicantsNumber !== undefined && job.applicantsNumber > 0,
    ).length ?? 0;

  const eventsTodayCount =
    events?.filter((event) => {
      if (!event.start) return false;
      const eventDate = new Date(event.start);
      const today = new Date();

      return eventDate.toDateString() === today.toDateString();
    }).length ?? 0;

  const finalDecisionCount =
    applicants?.filter((applicant) => applicant.status === "Final Decision")
      .length ?? 0;

  const interviewCount =
    applicants?.filter((applicant) => applicant.status === "Interview")
      .length ?? 0;

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <Stack gap={md ? 4 : 2} pb={3}>
      <Typography variant="h1" color="text.secondary">
        {getGreeting()}, {userFullName}!
      </Typography>
      <Stack flexDirection={md ? "row" : "column"} gap={md ? 3 : 1} width={1}>
        <SummaryBox
          bg="primary.main"
          text={`Job offer${activeJobOffersCount !== 1 ? "s" : ""} with active recruitment`}
          count={activeJobOffersCount}
          page="offers"
        />
        <SummaryBox
          bg={Colors.aquamarine}
          text={`Interview${eventsTodayCount !== 1 ? "s" : ""} Today`}
          count={eventsTodayCount}
          page="schedule"
        />
        <SummaryBox
          bg={Colors.blue}
          text={`Applicant${finalDecisionCount !== 1 ? "s" : ""} awaiting final decision`}
          count={finalDecisionCount}
          page="applicants"
        />
      </Stack>
      <Stack flexDirection={md ? "row" : "column"} gap={3}>
        <EmploymentTypeChart jobs={jobs} />
        <Stack gap={md ? 3 : 2} width={1}>
          <Stack
            sx={{
              border: 1,
              borderColor: Colors.primaryGrey,
              p: { xs: 2, md: 3 },
            }}
          >
            <Typography variant="h3" color="text.secondary">
              Interviewing
            </Typography>
            <Stack flexDirection="row" gap={1} mt={4}>
              <Typography
                sx={{ fontSize: { xs: "2.7rem", sm: "3.5rem" } }}
                color="text.secondary"
                fontWeight={FontWeights.semibold}
              >
                {interviewCount}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={FontWeights.regular}
                color={theme.palette.grey[100]}
                mt={1}
              >
                Applicants in Hiring Process
              </Typography>
            </Stack>
          </Stack>
          <JobStatusChart jobs={jobs} />
        </Stack>
      </Stack>
    </Stack>
  );
}
