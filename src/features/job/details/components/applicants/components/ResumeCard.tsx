import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  name: string;
  url: string | undefined;
  onRemove: () => void;
  uploadProgress: number | undefined;
}

export default function ResumeCard({
  name,
  url,
  onRemove,
  uploadProgress,
}: Props) {
  const { md } = useBreakpoints();

  const truncateFilename = (filename: string, maxLength: number) => {
    const index = filename.lastIndexOf(".");
    if (index === -1) {
      return filename;
    }

    const extension = filename.slice(index);
    const name = filename.slice(0, index);

    if (name.length > maxLength) {
      const partLength = maxLength - 5;
      return `${name.substring(0, partLength)}...${name.slice(-2)}${extension}`;
    }

    return filename;
  };

  const maxLength = !md ? 14 : 17;
  const truncatedName = truncateFilename(name, maxLength);

  return (
    <Box
      sx={{
        width: { xs: 160, md: 200 },
        height: { xs: 220, md: 260 },
        borderRadius: 3,
        border: 1.5,
        borderColor: Colors.primaryGrey,
        position: "relative",
      }}
    >
      {uploadProgress != undefined && (
        <CircularProgress
          value={uploadProgress}
          variant="determinate"
          sx={{
            position: "absolute",
            top: "calc(50% - 1.25rem)",
            left: "calc(50% - 1.25rem)",
          }}
        />
      )}
      <IconButton
        onClick={onRemove}
        aria-label="remove selected file"
        sx={{
          color: "text.secondary",
          padding: 0,
          position: "absolute",
          top: 12,
          right: 12,
          width: "fit-content",
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Stack
        component={Link}
        href={url ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          textDecoration: "none",
          width: 1,
          height: 1,
          p: 2,
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        <Stack
          sx={{ height: 1, justifyContent: "center", gap: { xs: 3, md: 5 } }}
        >
          <InsertDriveFileOutlinedIcon fontSize="large" sx={{ mx: "auto" }} />
          <Typography color={Colors.lightGrey} textAlign="center">
            {truncatedName}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
