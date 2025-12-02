export const exportToCSV = (data, filename) => {
  if (!data || !data.length) return;

  const csvRows = [];
  const headers = Object.keys(data[0]).join(",");
  csvRows.push(headers);

  for (const row of data) {
    const values = Object.values(row).map((val) =>
      `"${String(val).replace(/"/g, '""')}"`
    );
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
