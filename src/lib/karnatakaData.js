export function parseCsvRows(csvText) {
  const rows = csvText.trim().split(/\r?\n/);
  const [header, ...lines] = rows;
  const columns = header.split(",");

  return lines.map((line) => {
    const values = line.split(",");
    return columns.reduce((row, column, index) => {
      const rawValue = values[index] ?? "";
      const numericValue = Number(rawValue);
      row[column] = Number.isNaN(numericValue) || rawValue === "" ? rawValue : numericValue;
      return row;
    }, {});
  });
}

export function buildLoadCurve(rows) {
  return rows
    .filter((row) => [6, 9, 12, 15, 18, 21, 0].includes(row.hour))
    .map((row) => ({
      time: row.label,
      total: row.net_load_kwh,
      solar: row.solar_kwh,
    }));
}

export function summarizeVillageData(rows) {
  if (!rows.length) {
    return {
      baseMonthlyUnits: 0,
      peakHour: "N/A",
      peakLoad: 0,
      solarSurplusHour: "N/A",
      solarSurplus: 0,
      summaryText: "No Karnataka sample loaded",
    };
  }

  const peakLoadRow = rows.reduce((max, row) => (row.net_load_kwh > max.net_load_kwh ? row : max), rows[0]);
  const solarPeakRow = rows.reduce((max, row) => (row.solar_kwh > max.solar_kwh ? row : max), rows[0]);
  const dailyUnits = rows.reduce((sum, row) => sum + row.net_load_kwh, 0);
  const baseMonthlyUnits = dailyUnits * 30;

  return {
    baseMonthlyUnits,
    peakHour: peakLoadRow.label,
    peakLoad: peakLoadRow.net_load_kwh,
    solarSurplusHour: solarPeakRow.label,
    solarSurplus: solarPeakRow.solar_kwh,
    summaryText: `Peak feeder pressure appears at ${peakLoadRow.label} with ${peakLoadRow.net_load_kwh} kWh net load, while solar relief is strongest at ${solarPeakRow.label}.`,
  };
}
