// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

// Today's date (YYYY-MM-DD)
export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

// Sort objects by date (latest first)
export const sortByDateDesc = (a, b) => {
  return new Date(b.date) - new Date(a.date);
};

// Convert to readable format (e.g., 12 Jan 2024)
export const formatReadableDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
