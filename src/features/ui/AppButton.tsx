import { Button, type SxProps, type Theme, Typography } from "@mui/material";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  fullWidth?: boolean;
  children: React.ReactNode;
  LinkComponent?: React.ElementType;
  href?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export default function AppButton({
  type = "button",
  variant = "contained",
  fullWidth,
  children,
  LinkComponent,
  href,
  onClick,
  sx,
}: Props) {
  return (
    <Button
      LinkComponent={LinkComponent}
      href={href}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{ height: 50, textTransform: "none", ...sx }}
    >
      <Typography component="span" variant="body2">
        {children}
      </Typography>
    </Button>
  );
}
