export function capitalizeWords(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const formatTimeRange = (
  start: Date | null,
  end: Date | null,
): string => {
  if (!start || !end) {
    return "Invalid time range";
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const startTime = start.toLocaleTimeString([], options);
  const endTime = end.toLocaleTimeString([], options);

  const startAmPm = startTime.split(" ")[1];
  const endAmPm = endTime.split(" ")[1];

  if (startAmPm === endAmPm) {
    return `${startTime.split(" ")[0]} - ${endTime.split(" ")[0]} ${startAmPm}`;
  } else {
    return `${startTime} - ${endTime}`;
  }
};
