import LoadingButton from "@mui/lab/LoadingButton";
import { type SxProps, type Theme, Typography } from "@mui/material";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  fullWidth?: boolean;
  children: React.ReactNode;
  LinkComponent?: React.ElementType;
  href?: string;
  onClick?: () => void;
  onClickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export default function AppButton({
  type = "button",
  variant = "contained",
  fullWidth = false,
  children,
  LinkComponent,
  href,
  onClick,
  onClickEvent,
  loading,
  disabled = false,
  sx,
}: Props) {
  return (
    <LoadingButton
      LinkComponent={LinkComponent}
      href={href}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClickEvent ? onClickEvent : onClick}
      loading={loading}
      disabled={disabled}
      sx={{ height: 50, textTransform: "none", ...sx }}
    >
      <Typography component="span" variant="body2">
        {children}
      </Typography>
    </LoadingButton>
  );
}
