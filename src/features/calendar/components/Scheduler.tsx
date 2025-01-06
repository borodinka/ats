import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { CircularProgress, Stack } from "@mui/material";

import { useGetEventsQuery } from "../store/eventsApi";
import Calendar from "./Calendar";
import NoEvents from "./NoEvents";
import EventCreatingDialog from "./dialogs/EventCreatingDialog";

export default function Scheduler() {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const {
    data: events,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useGetEventsQuery();

  const location = useLocation();
  const {
    jobId,
    applicantId,
    applicantFullName,
    applicantEmail,
    jobRole,
    stageTitle,
    currentStage,
    stages,
  } = location.state || {};

  const shouldOpenDialog = Boolean(
    jobId &&
      applicantId &&
      applicantFullName &&
      applicantEmail &&
      jobRole &&
      stageTitle &&
      currentStage != null &&
      stages,
  );

  useEffect(() => {
    if (shouldOpenDialog) {
      open();
    }
  }, [shouldOpenDialog]);

  if (isLoading) {
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess && events.length > 0) {
    return (
      <>
        <Calendar events={events} />
        {isOpen && (
          <EventCreatingDialog
            jobId={jobId}
            applicantId={applicantId}
            applicantFullName={applicantFullName}
            applicantEmail={applicantEmail}
            jobRole={jobRole}
            stageTitle={stageTitle}
            currentStage={currentStage}
            stages={stages}
            isOpen={isOpen}
            close={close}
          />
        )}
      </>
    );
  } else if (isSuccess && events.length === 0) {
    return (
      <>
        <Stack
          alignItems="center"
          justifyContent={{ xs: "flex-start", md: "center" }}
          height="70%"
        >
          <NoEvents />
        </Stack>
        {isOpen && (
          <EventCreatingDialog
            jobId={jobId}
            applicantId={applicantId}
            applicantFullName={applicantFullName}
            applicantEmail={applicantEmail}
            jobRole={jobRole}
            stageTitle={stageTitle}
            currentStage={currentStage}
            stages={stages}
            isOpen={isOpen}
            close={close}
          />
        )}
      </>
    );
  } else if (isError) {
    throw error;
  }

  return null;
}
