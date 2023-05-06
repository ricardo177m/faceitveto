export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-UK", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleTimeString("en-UK", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
