import { NavLink } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors, theme } from "@config/styles";
import AppButton from "@features/ui/AppButton";
import Logo from "@features/ui/logo/Logo";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { ACCOUNT_LINKS } from "./data";

interface Props {
  onClose: () => void;
  isMinimized?: boolean;
  onClick?: () => void;
}

export default function AccountSidebar({
  isMinimized,
  onClose,
  onClick,
}: Props) {
  const { md } = useBreakpoints();

  const onLinkClick = () => {
    if (!md) {
      onClose();
    }
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        py: 4,
        height: "100%",
        bgcolor: Colors.lightViolet,
      }}
    >
      <Box borderBottom={!md ? 1 : "none"} borderColor={Colors.primaryGrey}>
        <Stack
          mb={4}
          pl={isMinimized ? 0 : 3}
          direction="row"
          justifyContent={isMinimized ? "center" : "flex-start"}
        >
          <Logo isMinimized={isMinimized} onClick={onClick} />
        </Stack>
        <List>
          {ACCOUNT_LINKS.map(({ Icon, text, path }) => (
            <ListItem key={text} disablePadding>
              <NavLink
                to={path}
                style={{
                  width: "100%",
                  textDecoration: "none",
                }}
                onClick={onLinkClick}
              >
                {({ isActive }) => (
                  <Stack
                    flexDirection="row"
                    gap={1.5}
                    alignItems="center"
                    pr={2}
                    pl={isActive ? 0 : 2}
                  >
                    <Box
                      sx={{
                        display: isActive ? "block" : "none",
                        height: 32,
                        width: 4,
                        bgcolor: theme.palette.primary.main,
                      }}
                    />
                    <ListItemButton
                      sx={{
                        background: isActive ? Colors.lavender : "transparent",
                        color: isActive
                          ? theme.palette.primary.main
                          : theme.palette.grey[100],
                        px: isMinimized ? 1 : 2,
                        py: 1.5,
                        justifyContent: isMinimized ? "center" : "flex-start",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: isMinimized ? "inherit" : 56,
                          color: isActive
                            ? theme.palette.primary.main
                            : theme.palette.grey[100],
                        }}
                      >
                        <Icon />
                      </ListItemIcon>
                      {!isMinimized && (
                        <Typography variant="body1">{text}</Typography>
                      )}
                    </ListItemButton>
                  </Stack>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Box>
      <Stack mt={2.5} height={!md ? 1 : "none"} justifyContent="space-between">
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          px={isMinimized ? 0 : 4}
          justifyContent={isMinimized ? "center" : "flex-start"}
        >
          <Avatar
            sx={{
              height: 48,
              width: 48,
              background: theme.palette.primary.main,
            }}
          >
            J
          </Avatar>
          {!isMinimized && (
            <Typography color="text.secondary" variant="h4">
              John Doe
            </Typography>
          )}
        </Stack>
        {!md && (
          <AppButton
            LinkComponent={Link}
            href={AppRoutes.addJob}
            onClick={onLinkClick}
            sx={{ mx: 2 }}
          >
            <Stack
              component="span"
              gap={1}
              alignItems="center"
              justifyContent="center"
              direction="row"
            >
              <AddIcon />
              {isMinimized ? "" : "Post a Job"}
            </Stack>
          </AppButton>
        )}
      </Stack>
    </Stack>
  );
}
