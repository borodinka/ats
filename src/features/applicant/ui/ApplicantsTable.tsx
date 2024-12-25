import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import {
  ButtonBase,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors, theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";
import type { Job } from "@features/job/types";
import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useToast from "@hooks/useToast";

import type { Applicant } from "../types";
import {
  capitalizeWords,
  getStageColor,
  getStatusColor,
  handleOpenResume,
} from "../utils";
import DotsMenu from "./DotsMenu";
import Score from "./Score";
import StyledChip from "./StyledChip";

interface Props {
  applicants: Applicant[];
  isJobView?: boolean;
  jobId?: Job["id"];
}

export default function ApplicantsTable({
  applicants,
  isJobView,
  jobId,
}: Props) {
  const { md } = useBreakpoints();
  const { showErrorMessage } = useToast();

  const sortedApplicants = isJobView
    ? [...applicants].sort((a, b) => (b.score || 0) - (a.score || 0))
    : applicants;

  const path = isJobView
    ? `${AppRoutes.jobs}/${jobId}/applicants/`
    : `${AppRoutes.applicants}/`;

  return (
    <TableContainer
      sx={{
        mt: isJobView ? { xs: -4.5, md: -6.5 } : 0,
        pb: !isJobView ? 5 : 2,
      }}
    >
      <Table aria-label="Applicants table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "25%" }}>
              <Typography color={theme.palette.grey[100]}>Full Name</Typography>
            </TableCell>
            {isJobView && (
              <TableCell sx={{ width: "25%" }}>
                <Typography color={theme.palette.grey[100]}>Score</Typography>
              </TableCell>
            )}
            {isJobView && md && (
              <TableCell sx={{ width: "35%" }}>
                <Typography color={theme.palette.grey[100]}>
                  Hiring Stage
                </Typography>
              </TableCell>
            )}
            {!isJobView && md && (
              <TableCell sx={{ width: "25%" }}>
                <Typography color={theme.palette.grey[100]}>Status</Typography>
              </TableCell>
            )}
            {!isJobView && (
              <TableCell sx={{ width: "25%" }}>
                <Typography color={theme.palette.grey[100]}>
                  Job Role
                </Typography>
              </TableCell>
            )}
            <TableCell sx={{ width: "2%" }}>
              <Typography color={theme.palette.grey[100]}>Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ border: 1, borderColor: Colors.primaryGrey }}>
          {sortedApplicants.map((applicant, index) => {
            return (
              <TableRow
                key={applicant.id}
                sx={{
                  bgcolor: index % 2 === 0 ? Colors.lightViolet : "transparent",
                  "& td:last-child, & th:last-child": {
                    p: 2,
                    pt: { xs: 2.5, md: 2 },
                  },
                  "& td, & th": { border: "none", p: 0 },
                }}
              >
                <TableCell>
                  <ButtonBase
                    component={Link}
                    href={`${path}${applicant.id}`}
                    sx={{ display: "block", p: 3, pl: 2 }}
                  >
                    <Typography
                      color="text.secondary"
                      fontWeight={FontWeights.medium}
                    >
                      {capitalizeWords(applicant.fullName)}
                    </Typography>
                  </ButtonBase>
                </TableCell>
                {isJobView && (
                  <TableCell>
                    <ButtonBase
                      component={Link}
                      href={`${path}${applicant.id}`}
                      sx={{ display: "block", p: 3, pl: 2 }}
                    >
                      <Score score={applicant.score} />
                    </ButtonBase>
                  </TableCell>
                )}
                {isJobView && md && (
                  <TableCell>
                    <ButtonBase
                      component={Link}
                      href={`${path}${applicant.id}`}
                      sx={{ display: "block", p: 3, pl: 2 }}
                    >
                      <StyledChip
                        text={applicant.currentStage?.title}
                        color={getStageColor(
                          applicant.stages,
                          applicant.currentStage?.title,
                        )}
                      />
                    </ButtonBase>
                  </TableCell>
                )}
                {!isJobView && md && (
                  <TableCell>
                    <ButtonBase
                      component={Link}
                      href={`${path}${applicant.id}`}
                      sx={{ display: "block", p: 3, pl: 2 }}
                    >
                      <StyledChip
                        text={applicant.status}
                        color={getStatusColor(applicant.status)}
                      />
                    </ButtonBase>
                  </TableCell>
                )}
                {!isJobView && (
                  <TableCell>
                    <ButtonBase
                      component={Link}
                      href={`${path}${applicant.id}`}
                      sx={{ display: "block", p: 3, pl: 2 }}
                    >
                      <Typography
                        color="text.secondary"
                        fontWeight={FontWeights.medium}
                      >
                        {capitalizeWords(applicant.jobRole)}
                      </Typography>
                    </ButtonBase>
                  </TableCell>
                )}
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: md ? 1 : 0.5,
                    p: 2,
                  }}
                >
                  <AppButton
                    variant="outlined"
                    onClick={() =>
                      handleOpenResume(
                        showErrorMessage,
                        applicant.resume.storagePath,
                      )
                    }
                    sx={{
                      bgcolor: Colors.lavender,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {md ? (
                      "See Application"
                    ) : (
                      <Stack>
                        <InsertDriveFileOutlinedIcon />
                      </Stack>
                    )}
                  </AppButton>
                  <DotsMenu
                    isJobView={isJobView}
                    applicantId={applicant.id}
                    resumePath={applicant.resume.storagePath}
                    declineReason={applicant.declineReason}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
