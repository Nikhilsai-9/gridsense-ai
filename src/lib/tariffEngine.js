export const BESCOM_DEMO_SLABS = [
  { upto: 50, rate: 0 },
  { upto: 100, rate: 3.15 },
  { upto: 200, rate: 6.0 },
  { upto: 300, rate: 7.1 },
  { upto: Number.POSITIVE_INFINITY, rate: 7.45 },
];

export const INDIA_GRID_EMISSION_FACTOR = 0.82;
export const TREE_OFFSET_KG_PER_YEAR = 22;

export function calculateTariffBreakdown(units, slabs = BESCOM_DEMO_SLABS) {
  let remaining = Math.max(0, Number(units) || 0);
  let previousCap = 0;

  const breakdown = slabs.map((slab) => {
    const slabLimit = slab.upto - previousCap;
    const slabUnits = Math.max(0, Math.min(remaining, slabLimit));
    const cost = slabUnits * slab.rate;

    remaining -= slabUnits;
    previousCap = slab.upto;

    return {
      upto: slab.upto,
      rate: slab.rate,
      units: slabUnits,
      cost,
    };
  });

  const totalCost = breakdown.reduce((sum, item) => sum + item.cost, 0);

  return {
    units: Math.max(0, Number(units) || 0),
    totalCost,
    effectiveRate: units > 0 ? totalCost / units : 0,
    breakdown,
  };
}

export function estimateScenarioImpact({
  baseMonthlyUnits,
  solarKw,
  batteryKwh,
  shiftableLoadPct,
}) {
  const normalizedBaseUnits = Math.max(0, Number(baseMonthlyUnits) || 0);
  const normalizedSolarKw = Math.max(0, Number(solarKw) || 0);
  const normalizedBatteryKwh = Math.max(0, Number(batteryKwh) || 0);
  const normalizedShiftableLoadPct = Math.max(0, Math.min(100, Number(shiftableLoadPct) || 0));

  const solarGenerationUnits = normalizedSolarKw * 4.6 * 30 * 0.78;
  const solarOffsetUnits = Math.min(normalizedBaseUnits * 0.65, solarGenerationUnits);
  const batteryRecoveryUnits = Math.min(normalizedBaseUnits * 0.14, normalizedBatteryKwh * 24);
  const shiftableOptimizationUnits = normalizedBaseUnits * (normalizedShiftableLoadPct / 100) * 0.09;
  const totalUnitsSaved = Math.min(
    normalizedBaseUnits,
    solarOffsetUnits + batteryRecoveryUnits + shiftableOptimizationUnits,
  );
  const optimizedUnits = Math.max(0, normalizedBaseUnits - totalUnitsSaved);

  const baselineTariff = calculateTariffBreakdown(normalizedBaseUnits);
  const optimizedTariff = calculateTariffBreakdown(optimizedUnits);
  const rupeeSavings = baselineTariff.totalCost - optimizedTariff.totalCost;
  const carbonSavedKg = totalUnitsSaved * INDIA_GRID_EMISSION_FACTOR;

  return {
    baselineUnits: normalizedBaseUnits,
    optimizedUnits,
    unitsSaved: totalUnitsSaved,
    solarOffsetUnits,
    batteryRecoveryUnits,
    shiftableOptimizationUnits,
    baselineTariff,
    optimizedTariff,
    rupeeSavings,
    carbonSavedKg,
    treeEquivalent: carbonSavedKg / TREE_OFFSET_KG_PER_YEAR,
  };
}

export function formatRupees(value) {
  return `Rs ${Math.round(value).toLocaleString("en-IN")}`;
}
