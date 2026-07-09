export function toDateString(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function toISODateString(date: Date) {
  return date.toISOString().slice(0, 10);
}
