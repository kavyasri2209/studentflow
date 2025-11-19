// Export Array -> CSV File
export const exportToCSV = (filename, rows) => {
  if (!rows || rows.length === 0) return;

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","), // header row
    ...rows.map((row) =>
      headers.map((h) => `"${row[h] !== undefined ? row[h] : ""}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

// Export JSON File
export const exportToJSON = (filename, data) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.json`;
  link.click();
};

// Print a specific element by ID
export const printData = (elementId) => {
  const element = document.getElementById(elementId);

  if (!element) return;

  const printContent = element.innerHTML;
  const original = document.body.innerHTML;

  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = original;
};
