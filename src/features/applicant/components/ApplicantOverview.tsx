import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors, theme } from "@config/styles";
import { selectUser } from "@features/auth/store/authSlice";
import type { Job } from "@features/job/types";
import AppButton from "@features/ui/AppButton";
import Divider from "@features/ui/Divider";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useToast from "@hooks/useToast";
import { useAppSelector } from "@store/index";

import { useUpdateApplicantMutation } from "../store/applicantsApi";
import type { Applicant } from "../types";
import DeclineButton from "../ui/DeclineButton";
import HireButton from "../ui/HireButton";
import Score from "../ui/Score";
import StyledChip from "../ui/StyledChip";
import {
  capitalizeWords,
  getStageColor,
  getStatusColor,
  handleOpenResume,
} from "../utils";
import ApplicantTabs from "./tabs/ApplicantTabs";

interface Props {
  applicant: Applicant;
  jobId: Job["id"];
}

export default function ApplicantOverview({ applicant, jobId }: Props) {
  const navigate = useNavigate();
  const { showErrorMessage } = useToast();
  const { md } = useBreakpoints();
  const [updateApplicant, { isLoading }] = useUpdateApplicantMutation();
  const user = useAppSelector(selectUser);

  const isUserAssignedToStage =
    applicant.stages.length > 0 &&
    applicant.stages[applicant.currentStage].email === user?.email;

  const isJobView = Boolean(jobId);

  const handleClick = () => {
    navigate(
      isJobView
        ? `${AppRoutes.jobs}/${jobId}?selectedTab=1`
        : AppRoutes.applicants,
    );
  };

  const onUpdate = (data: Partial<Applicant>) => {
    updateApplicant({ id: applicant!.id, data });
  };

  return (
    <Stack gap={2} height={1}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: md ? 2 : 1,
            mt: !md ? -1 : 0,
          }}
        >
          <IconButton aria-label="go back to list" onClick={handleClick}>
            <ArrowBackIcon sx={{ color: "text.secondary", fontSize: 30 }} />
          </IconButton>
          <Typography variant="h2" color="text.secondary">
            {isJobView ? "Applicants" : "All Applicants"}
          </Typography>
        </Stack>
        {isJobView && (
          <Stack flexDirection="row" gap={1}>
            <HireButton
              status={applicant.status}
              onUpdate={onUpdate}
              fullName={applicant.fullName}
              jobId={jobId}
              applicantId={applicant.id}
            />
            <DeclineButton
              status={applicant.status}
              onUpdate={onUpdate}
              fullName={applicant.fullName}
              jobId={jobId}
              currentStage={applicant.currentStage}
            />
          </Stack>
        )}
      </Stack>
      <Grid
        container
        spacing={md ? 3 : 0}
        sx={{ height: { md: 1 }, pb: { xs: 3 } }}
      >
        <Grid item xs={12} md={3} sx={{ height: { md: 1 } }}>
          <Stack
            sx={{
              border: 1,
              borderColor: Colors.primaryGrey,
              p: 2,
              pb: { xs: 1 },
              gap: 2,
              height: { md: 1 },
              borderBottom: !md ? "none" : "block",
            }}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              mb={isJobView ? 1 : 0}
            >
              <Stack gap={1}>
                <Typography variant="h3" color="text.secondary">
                  {capitalizeWords(applicant.fullName)}
                </Typography>
                <Typography color={theme.palette.grey[100]}>
                  {capitalizeWords(applicant.jobRole)}
                </Typography>
              </Stack>
              {!isJobView && (
                <StyledChip
                  text={applicant.status}
                  color={getStatusColor(applicant.status)}
                />
              )}
              {isJobView && <Score score={applicant.score} />}
            </Stack>
            {isJobView && (
              <StyledChip
                text={
                  applicant.status === "Interview"
                    ? applicant.stages[applicant.currentStage].title
                    : applicant.status
                }
                color={
                  applicant.status === "Interview"
                    ? getStageColor(
                        applicant.stages,
                        applicant.stages[applicant.currentStage].title,
                      )
                    : getStatusColor(applicant.status)
                }
              />
            )}
            <Stack flexDirection="row" gap={1} mb={1}>
              {isJobView && (
                <Tooltip
                  title={
                    applicant.status === "Hired"
                      ? "This applicant has already been hired. You cannot schedule another interview"
                      : applicant.status === "Declined"
                        ? "This applicant has been declined. You cannot schedule an interview"
                        : applicant.status === "Final Decision"
                          ? "All recruitment stages are complete. You cannot schedule additional interviews"
                          : !isUserAssignedToStage
                            ? `The interview for this stage is assigned to ${applicant.stages[applicant.currentStage].email}. Please reach out to them for more information`
                            : applicant.stages[applicant.currentStage]
                                  .interviewDate !== null
                              ? "Interview already scheduled"
                              : ""
                  }
                >
                  <span style={{ width: "100%" }}>
                    <AppButton
                      variant="outlined"
                      onClick={() =>
                        navigate(AppRoutes.schedule, {
                          state: {
                            jobId: jobId,
                            applicantId: applicant.id,
                            applicantFullName: applicant.fullName,
                            applicantEmail: applicant.email,
                            jobRole: applicant.jobRole,
                            stageTitle:
                              applicant.stages[applicant.currentStage].title,
                            currentStage: applicant.currentStage,
                            stages: applicant.stages,
                          },
                        })
                      }
                      fullWidth
                      disabled={
                        applicant.status !== "Interview" ||
                        !isUserAssignedToStage ||
                        applicant.stages[applicant.currentStage]
                          .interviewDate !== null
                      }
                    >
                      Schedule Interview
                    </AppButton>
                  </span>
                </Tooltip>
              )}
              <AppButton
                variant="outlined"
                fullWidth={!isJobView}
                onClick={() =>
                  handleOpenResume(
                    showErrorMessage,
                    applicant.resume.storagePath,
                  )
                }
              >
                {!isJobView ? (
                  "See application"
                ) : (
                  <Stack alignItems="center">
                    <InsertDriveFileOutlinedIcon />
                  </Stack>
                )}
              </AppButton>
            </Stack>
            {md && (
              <>
                <Divider />
                <Typography variant="h4" color="text.secondary">
                  Contact
                </Typography>
                <Stack flexDirection="row" gap={2}>
                  <EmailOutlinedIcon sx={{ color: theme.palette.grey[100] }} />
                  <Stack>
                    <Typography color={theme.palette.grey[100]}>
                      Email
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        maxWidth: "100%",
                        overflow: "hidden",
                        wordBreak: "break-all",
                      }}
                    >
                      {applicant.email}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack flexDirection="row" gap={2}>
                  <PhoneIphoneOutlinedIcon
                    sx={{ color: theme.palette.grey[100] }}
                  />
                  <Stack>
                    <Typography color={theme.palette.grey[100]}>
                      Phone
                    </Typography>
                    <Typography color="text.secondary">
                      {applicant.phone}
                    </Typography>
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={9} sx={{ height: { md: 1 } }}>
          <Box
            sx={{
              border: 1,
              borderColor: Colors.primaryGrey,
              height: { md: 1 },
              px: 2,
            }}
          >
            <ApplicantTabs
              isJobView={isJobView}
              applicant={applicant}
              onUpdate={onUpdate}
              isLoading={isLoading}
              jobId={jobId}
            />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
