import AddIcon from "@mui/icons-material/Add";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { AppBar, IconButton, Link, Stack, Toolbar } from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors } from "@config/styles";
import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  onClick?: () => void;
}

export default function StyledAppBar({ onClick }: Props) {
  const { md } = useBreakpoints();

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: "none", background: "transparent" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: !md ? "space-between" : "flex-end",
          borderBottom: 1,
          borderColor: Colors.primaryGrey,
          gap: md ? 5 : 0,
          py: md ? 2 : 0,
        }}
      >
        {!md && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onClick}
          >
            <NotesOutlinedIcon sx={{ color: "text.secondary", fontSize: 30 }} />
          </IconButton>
        )}
        <IconButton color="inherit" aria-label="open notifications" edge="end">
          <NotificationsOutlinedIcon
            sx={{ color: "text.secondary", fontSize: 30 }}
          />
        </IconButton>
        {md && (
          <AppButton LinkComponent={Link} href={AppRoutes.addJob}>
            <Stack
              component="span"
              gap={1}
              alignItems="center"
              justifyContent="center"
              direction="row"
            >
              <AddIcon />
              Post a Job
            </Stack>
          </AppButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
