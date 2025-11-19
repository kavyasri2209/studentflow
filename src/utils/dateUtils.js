// Format to YYYY-MM-DD
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

// Today -> YYYY-MM-DD
export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

// Convert to readable -> 12 Jan 2024
export const formatReadableDate = (value) => {
  if (!value) return "";
  const d = new Date(value);

  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Sort objects by descending date
export const sortByDateDesc = (a, b) => {
  return new Date(b.date) - new Date(a.date);
};
