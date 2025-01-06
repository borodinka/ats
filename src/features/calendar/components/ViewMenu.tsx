import { useState } from "react";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Menu, MenuItem, Stack } from "@mui/material";

import { Colors } from "@config/styles";
import AppButton from "@features/ui/AppButton";
import type FullCalendar from "@fullcalendar/react";

interface Props {
  currentView: string;
  calendarRef: React.MutableRefObject<FullCalendar | null>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

export default function ViewMenu({
  currentView,
  calendarRef,
  setCurrentView,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewChange = (view: string) => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.changeView(view);
    setCurrentView(view);
    handleMenuClose();
  };

  return (
    <>
      <AppButton
        variant="outlined"
        onClickEvent={handleMenuOpen}
        sx={{ height: 46 }}
      >
        <Stack>
          <FilterListOutlinedIcon style={{ fontSize: "1.8rem" }} />
        </Stack>
      </AppButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => handleViewChange("timeGridDay")}
          sx={{
            backgroundColor:
              currentView === "timeGridDay" ? Colors.lavender : "transparent",
          }}
        >
          Day
        </MenuItem>
        <MenuItem
          onClick={() => handleViewChange("timeGridWeek")}
          sx={{
            backgroundColor:
              currentView === "timeGridWeek" ? Colors.lavender : "transparent",
          }}
        >
          Week
        </MenuItem>
        <MenuItem
          onClick={() => handleViewChange("dayGridMonth")}
          sx={{
            backgroundColor:
              currentView === "dayGridMonth" ? Colors.lavender : "transparent",
          }}
        >
          Month
        </MenuItem>
      </Menu>
    </>
  );
}
