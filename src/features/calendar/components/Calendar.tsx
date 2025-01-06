import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

import { Colors, theme } from "@config/styles";
import { useUpdateApplicantMutation } from "@features/applicant/store/applicantsApi";
import {
  type EventClickArg,
  type EventDropArg,
} from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  type EventResizeDoneArg,
} from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useToast from "@hooks/useToast";

import {
  useDeleteEventMutation,
  useUpdateEventMutation,
} from "../store/eventsApi";
import { CALENDAR_STYLES } from "../styles";
import { type Event, type EventDetails, type ExtendedProps } from "../types";
import { formatTimeRange } from "../utils";
import DayHeader from "./DayHeader";
import StyledEvent from "./StyledEvent";
import ViewMenu from "./ViewMenu";
import EventDetailsDialog from "./dialogs/EventDetailsDialog";

interface Props {
  events: Event[];
}

export default function Calendar({ events }: Props) {
  const [currentEvents, setCurrentEvents] = useState(events);
  const [currentView, setCurrentView] = useState<string>("timeGridWeek");
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => {
    setSelectedEvent(null);
    setOpen(false);
  };
  const calendarRef = useRef<FullCalendar | null>(null);
  const [updateEvent] = useUpdateEventMutation();
  const [updateApplicant] = useUpdateApplicantMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const { md, lg } = useBreakpoints();
  const { showSuccessMessage, showErrorMessage } = useToast();

  useEffect(() => {
    const timegridBody = document.querySelector(
      ".fc-timegrid-body",
    ) as HTMLElement;
    const daygridBody = document.querySelector(
      ".fc-daygrid-body",
    ) as HTMLElement;
    const header = document.querySelector(".fc-col-header") as HTMLElement;
    if (header) {
      header.style.width = "100%";
    }

    if (currentView === "timeGridWeek" && timegridBody) {
      timegridBody.style.width = "100%";
    } else if (currentView === "dayGridMonth" && daygridBody) {
      daygridBody.style.width = "100%";
    }
  }, [currentView]);

  useEffect(() => {
    setCurrentEvents(events);
  }, [events]);

  const validRangeStart = dayjs().format("YYYY-MM-DD");
  const currentTime = dayjs();

  useEffect(() => {
    currentEvents.forEach((event) => {
      const startDate = dayjs(event.start);
      const endDate = dayjs(event.end);
      if (
        startDate.isBefore(validRangeStart) ||
        endDate.isBefore(validRangeStart) ||
        endDate.isBefore(currentTime)
      ) {
        deleteEvent(event.id);
        setCurrentEvents((prevEvents) =>
          prevEvents.filter((prev) => prev.id !== event.id),
        );
      }
    });
  }, [currentEvents, deleteEvent, validRangeStart, currentTime]);

  const handleEventClick = (arg: EventClickArg) => {
    const { event } = arg;
    const startDate = event.start;
    const endDate = event.end;
    const formattedTimeRange = formatTimeRange(startDate, endDate);

    setSelectedEvent({
      title: event.title,
      time: formattedTimeRange,
      extendedProps: {
        interviewDate: event.extendedProps.interviewDate,
        jobRole: event.extendedProps.jobRole,
        applicantEmail: event.extendedProps.applicantEmail,
      },
    });
    open();
  };

  const handleEventDrop = async (arg: EventDropArg) => {
    const { event, oldEvent } = arg;
    const currentTime = dayjs();

    if (!oldEvent.start || !oldEvent.end) {
      return;
    }

    if (
      dayjs(event.start).isBefore(currentTime) ||
      dayjs(event.end).isBefore(currentTime)
    ) {
      showErrorMessage("You cannot schedule an event in the past");
      event.setDates(oldEvent.start, oldEvent.end);
      return;
    }

    const updatedInterviewDate = dayjs(event.start).format();
    const updatedData: Partial<Event> = {
      start: dayjs(event.start).format(),
      end: dayjs(event.end).format(),
      extendedProps: {
        ...(event.extendedProps as ExtendedProps),
        interviewDate: updatedInterviewDate,
      },
    };

    await updateEvent({ id: event.id, data: updatedData });

    const updatedStages = [...event.extendedProps.stages];
    const updatedStage = {
      ...updatedStages[event.extendedProps.currentStage],
      interviewDate: updatedInterviewDate,
    };
    updatedStages[event.extendedProps.currentStage] = updatedStage;

    const result = await updateApplicant({
      id: event.extendedProps.applicantId,
      data: { stages: updatedStages },
    });

    if (!("error" in result)) {
      showSuccessMessage("Interview data updated successfully!");
    }
  };

  const handleEventResize = async (arg: EventResizeDoneArg) => {
    const { event, oldEvent } = arg;

    if (!oldEvent.start || !oldEvent.end) {
      return;
    }

    if (
      dayjs(event.start).isBefore(currentTime) ||
      dayjs(event.end).isBefore(currentTime)
    ) {
      showErrorMessage("You cannot schedule an event in the past");
      event.setDates(oldEvent.start, oldEvent.end);
      return;
    }

    const updatedData = {
      start: dayjs(event.start).format(),
      end: dayjs(event.end).format(),
    };

    const result = await updateEvent({ id: event.id, data: updatedData });

    if (!("error" in result)) {
      showSuccessMessage("Interview data updated successfully!");
    }
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          height: 1,
          pb: { xs: 3 },
        }}
      >
        <Grid
          item
          xs={12}
          lg={3}
          sx={{ height: { md: 1 }, display: lg ? "block" : "none" }}
        >
          <Typography variant="h1" color="text.secondary">
            My Schedule
          </Typography>
          <DateCalendar
            disabled
            sx={{
              pr: 5,
              ml: { lg: -2, xl: -1 },
              mt: 2,
              color: theme.palette.grey[100],
              ".MuiPickersDay-today": {
                backgroundColor: "primary.main",
                color: `${Colors.white} !important`,
                border: "none !important",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} lg={9} sx={{ height: 1 }}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            pb={1}
          >
            {!lg && (
              <Typography variant="h1" color="text.secondary">
                My Schedule
              </Typography>
            )}
            {!md && (
              <ViewMenu
                currentView={currentView}
                calendarRef={calendarRef}
                setCurrentView={setCurrentView}
              />
            )}
          </Stack>
          <Box sx={CALENDAR_STYLES}>
            <FullCalendar
              ref={calendarRef}
              timeZone="local"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              events={currentEvents}
              firstDay={1}
              allDaySlot={false}
              weekends={false}
              slotMinTime="8:00AM"
              slotMaxTime="18:00PM"
              eventClick={handleEventClick}
              eventDrop={handleEventDrop}
              eventResize={handleEventResize}
              headerToolbar={{
                left: "today",
                center: "prev,title,next",
                right: !md ? "" : "timeGridDay,timeGridWeek,dayGridMonth",
              }}
              slotLabelFormat={{
                hour: "numeric",
                hour12: true,
              }}
              editable={true}
              height="100%"
              expandRows={true}
              validRange={{
                start: validRangeStart,
              }}
              datesSet={(args) => {
                setCurrentView(args.view.type);
              }}
              dayHeaderContent={(args) => {
                const isWeekView = currentView === "timeGridWeek";
                return <DayHeader date={args.date} isWeekView={isWeekView} />;
              }}
              eventContent={(event) => {
                const startDate = event.event.start;
                const endDate = event.event.end;
                const formattedTimeRange = formatTimeRange(startDate, endDate);
                const isDayView = currentView === "timeGridDay";

                return (
                  <StyledEvent
                    title={event.event.title}
                    time={formattedTimeRange}
                    bgColor={event.event.backgroundColor}
                    isDayView={isDayView}
                  />
                );
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {isOpen && (
        <EventDetailsDialog
          isOpen={isOpen}
          close={close}
          selectedEvent={selectedEvent}
        />
      )}
    </>
  );
}
