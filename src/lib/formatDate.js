export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formatted;
};
