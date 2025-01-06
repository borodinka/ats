import dayjs from "dayjs";

import { Box, Stack, Typography } from "@mui/material";

import { theme } from "@config/styles";
import AppDialog from "@features/ui/AppDialog";

import type { EventDetails } from "../../types";
import { capitalizeWords } from "../../utils";

interface Props {
  isOpen: boolean;
  close: () => void;
  selectedEvent: EventDetails | null;
}
export default function EventDetailsDialog({
  isOpen,
  close,
  selectedEvent,
}: Props) {
  if (!selectedEvent) {
    return;
  }

  return (
    <AppDialog title={selectedEvent.title} isOpen={isOpen} onClose={close}>
      <Stack gap={2}>
        <Box>
          <Typography color={theme.palette.grey[100]}>Job Role:</Typography>
          <Typography color="text.secondary">
            {capitalizeWords(selectedEvent.extendedProps.jobRole)}
          </Typography>
        </Box>
        <Box>
          <Typography color={theme.palette.grey[100]}>
            Applicant Email:
          </Typography>
          <Typography color="text.secondary">
            {selectedEvent.extendedProps.applicantEmail}
          </Typography>
        </Box>
        <Box>
          <Typography color={theme.palette.grey[100]}>
            Interview Date:
          </Typography>
          <Typography color="text.secondary">
            {dayjs(selectedEvent.extendedProps.interviewDate).format(
              "D MMMM YYYY",
            )}
          </Typography>
        </Box>
        <Box>
          <Typography color={theme.palette.grey[100]}>Time:</Typography>
          <Typography color="text.secondary">{selectedEvent.time}</Typography>
        </Box>
      </Stack>
    </AppDialog>
  );
}
