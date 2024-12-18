import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";

import AppButton from "./AppButton";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick?: () => void;
  hideCloseButton?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default function AppDialog({
  title,
  isOpen,
  onClose,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  children,
  hideCloseButton,
  isLoading,
}: Props) {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      disableRestoreFocus
      PaperProps={{
        sx: {
          borderRadius: 0,
          width: 450,
        },
      }}
    >
      {!hideCloseButton && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 5,
            top: 8,
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      )}
      <Typography
        textAlign="center"
        variant="h4"
        sx={{
          pt: 7,
          px: 3,
          pb: { xs: 3, md: 4 },
        }}
      >
        {title}
      </Typography>
      <DialogContent sx={{ px: 3, py: 0 }}>{children}</DialogContent>
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 3,
        }}
      >
        {secondaryButtonText && (
          <AppButton fullWidth onClick={onSecondaryButtonClick}>
            {secondaryButtonText}
          </AppButton>
        )}
        {primaryButtonText && (
          <AppButton
            fullWidth
            onClick={onPrimaryButtonClick}
            loading={isLoading}
          >
            {primaryButtonText}
          </AppButton>
        )}
      </DialogActions>
    </Dialog>
  );
}
