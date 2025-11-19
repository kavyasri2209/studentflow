// Convert data to CSV
export const exportToCSV = (filename, rows) => {
  if (!rows || rows.length === 0) return;

  const keys = Object.keys(rows[0]);
  const csvContent = [
    keys.join(","), // headers
    ...rows.map((row) => keys.map((k) => `"${row[k] ?? ""}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

// Export JSON
export const exportToJSON = (filename, data) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.json`;
  link.click();
};

// Print DOM Element by ID
export const printData = (elementId) => {
  const printContent = document.getElementById(elementId).innerHTML;
  const originalPage = document.body.innerHTML;

  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalPage;
};
