export const INDIA_GRID = {
  carbonIntensityKgPerKwh: 0.82,
  dieselCostInrPerKwh: 25,
  solarCostInrPerKwh: 7.5,
  referenceInstallCostInr: 150000,
  treeOffsetKgPerYear: 21,
};

export const INDIA_PROGRAMS = {
  mnreWindow: "MNRE subsidy-aligned pilot economics",
  programs: ["PM-KUSUM", "DDUGJY", "Rural feeder modernization"],
  note: "Use this panel as a judge-friendly economics layer, not as a formal tariff filing.",
};

export function formatInr(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateIndiaCostSnapshot(
  totalKwhPerMonth,
  installCostInr = INDIA_GRID.referenceInstallCostInr,
) {
  const normalizedUnits = Math.max(0, Number(totalKwhPerMonth) || 0);
  const dieselCostMonthly = normalizedUnits * INDIA_GRID.dieselCostInrPerKwh;
  const solarCostMonthly = normalizedUnits * INDIA_GRID.solarCostInrPerKwh;
  const monthlySavingsInr = Math.max(0, dieselCostMonthly - solarCostMonthly);
  const annualSavingsInr = monthlySavingsInr * 12;
  const co2AvoidedKgPerMonth = normalizedUnits * INDIA_GRID.carbonIntensityKgPerKwh;
  const paybackMonths =
    monthlySavingsInr > 0 ? installCostInr / monthlySavingsInr : Number.POSITIVE_INFINITY;
  const treeEquivalent = Math.round(
    (co2AvoidedKgPerMonth * 12) / INDIA_GRID.treeOffsetKgPerYear,
  );

  return {
    monthlyUnits: normalizedUnits,
    dieselCostMonthly,
    solarCostMonthly,
    monthlySavingsInr,
    annualSavingsInr,
    co2AvoidedKgPerMonth,
    paybackMonths,
    paybackYears: Number.isFinite(paybackMonths) ? paybackMonths / 12 : 0,
    treeEquivalent,
    installCostInr,
  };
}
