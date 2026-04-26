import { describe, expect, it } from "vitest";
import {
  INDIA_GRID_EMISSION_FACTOR,
  calculateTariffBreakdown,
  estimateScenarioImpact,
} from "./tariffEngine";

describe("calculateTariffBreakdown", () => {
  it("keeps the first 50 units free in the demo slab model", () => {
    const result = calculateTariffBreakdown(50);
    expect(result.totalCost).toBe(0);
  });

  it("calculates a stepped BESCOM-style bill across slabs", () => {
    const result = calculateTariffBreakdown(250);
    expect(result.totalCost).toBeCloseTo(1112.5, 3);
    expect(result.breakdown[1].units).toBe(50);
    expect(result.breakdown[2].units).toBe(100);
  });
});

describe("estimateScenarioImpact", () => {
  it("reduces monthly units and reports carbon savings", () => {
    const result = estimateScenarioImpact({
      baseMonthlyUnits: 1800,
      solarKw: 18,
      batteryKwh: 30,
      shiftableLoadPct: 20,
    });

    expect(result.optimizedUnits).toBeLessThan(result.baselineUnits);
    expect(result.carbonSavedKg).toBeCloseTo(result.unitsSaved * INDIA_GRID_EMISSION_FACTOR, 5);
    expect(result.rupeeSavings).toBeGreaterThan(0);
  });
});
