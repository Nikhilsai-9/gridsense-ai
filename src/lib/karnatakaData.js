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

function formatHourLabel(hour) {
  const normalizedHour = ((Number(hour) % 24) + 24) % 24;
  const suffix = normalizedHour >= 12 ? "PM" : "AM";
  const displayHour = normalizedHour % 12 === 0 ? 12 : normalizedHour % 12;
  return `${displayHour} ${suffix}`;
}

function getHour(row) {
  if (typeof row.hour === "number") return row.hour;
  if (typeof row.hour === "string" && row.hour !== "") return Number(row.hour);
  if (typeof row.timestamp === "string") return new Date(row.timestamp).getUTCHours();
  return 0;
}

function getLabel(row) {
  if (row.label) return row.label;
  return formatHourLabel(getHour(row));
}

function getSolarValue(row) {
  return typeof row.solar_kwh === "number" ? row.solar_kwh : 0;
}

function getNetLoad(row) {
  if (typeof row.net_load_kwh === "number") return row.net_load_kwh;
  return Object.entries(row).reduce((sum, [key, value]) => {
    if (key === "hour") return sum;
    return typeof value === "number" ? sum + value : sum;
  }, 0);
}

export function buildLoadCurve(rows) {
  return rows
    .filter((row) => [6, 9, 12, 15, 18, 21, 0].includes(getHour(row)))
    .map((row) => ({
      time: getLabel(row),
      total: getNetLoad(row),
      solar: getSolarValue(row),
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

  const peakLoadRow = rows.reduce((max, row) => (getNetLoad(row) > getNetLoad(max) ? row : max), rows[0]);
  const solarPeakRow = rows.reduce((max, row) => (getSolarValue(row) > getSolarValue(max) ? row : max), rows[0]);
  const dailyUnits = rows.reduce((sum, row) => sum + getNetLoad(row), 0);
  const baseMonthlyUnits = dailyUnits * 30;
  const hasSolar = rows.some((row) => getSolarValue(row) > 0);
  const hasBenchmarkColumns = rows.some((row) => Object.prototype.hasOwnProperty.call(row, "small_business_kwh"));
  const summaryText = hasBenchmarkColumns
    ? `The benchmark India sample shows morning pump activity, daytime small-business demand, and a sharp evening lighting ramp suitable for Earth-focused micro-grid storytelling.`
    : `Peak feeder pressure appears at ${getLabel(peakLoadRow)} with ${getNetLoad(peakLoadRow)} kWh net load, while solar relief is strongest at ${getLabel(solarPeakRow)}.`;

  return {
    baseMonthlyUnits,
    peakHour: getLabel(peakLoadRow),
    peakLoad: getNetLoad(peakLoadRow),
    solarSurplusHour: hasSolar ? getLabel(solarPeakRow) : "No direct solar column",
    solarSurplus: getSolarValue(solarPeakRow),
    summaryText,
  };
}
