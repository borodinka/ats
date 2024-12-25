import { Colors, theme } from "@config/styles";
import { getDownloadURL } from "@services/firebase";

import type { Status } from "./types";

export const handleOpenResume = async (
  showErrorMessage: (message: string) => void,
  storagePath?: string | null,
) => {
  if (!storagePath) {
    showErrorMessage("No file available to open");
    return;
  }

  try {
    const url = await getDownloadURL(storagePath);
    if (url) {
      window.open(url, "_blank");
    } else {
      showErrorMessage("Failed to retrieve the file URL");
    }
  } catch (error) {
    showErrorMessage(`Failed to open the file: ${error}`);
  }
};

export function capitalizeWords(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const getStatusColor = (type: Status): string => {
  switch (type) {
    case "Hired":
      return Colors.aquamarine;
    case "Interview":
      return Colors.orange;
    case "Declined":
      return Colors.tomato;
    default:
      return theme.palette.text.primary;
  }
};

export const getStageColor = (
  stages: { title: string }[] | undefined,
  currentStageTitle: string | undefined,
): string => {
  const stageColors = [
    Colors.aquamarine,
    Colors.orange,
    Colors.blue,
    Colors.tomato,
    theme.palette.primary.main,
  ];

  if (!stages || !currentStageTitle) {
    return theme.palette.text.primary;
  }

  const index = stages.findIndex((stage) => stage.title === currentStageTitle);
  return stageColors[index] || theme.palette.text.primary;
};
