import { describe, expect, it } from "vitest";
import { calculateIndiaCostSnapshot, INDIA_GRID } from "./indiaGrid";

describe("calculateIndiaCostSnapshot", () => {
  it("calculates diesel versus solar monthly economics", () => {
    const snapshot = calculateIndiaCostSnapshot(1000, 150000);

    expect(snapshot.dieselCostMonthly).toBe(1000 * INDIA_GRID.dieselCostInrPerKwh);
    expect(snapshot.solarCostMonthly).toBe(1000 * INDIA_GRID.solarCostInrPerKwh);
    expect(snapshot.monthlySavingsInr).toBeGreaterThan(0);
  });

  it("calculates carbon and tree-equivalent impact", () => {
    const snapshot = calculateIndiaCostSnapshot(800, 150000);

    expect(snapshot.co2AvoidedKgPerMonth).toBeCloseTo(800 * INDIA_GRID.carbonIntensityKgPerKwh, 5);
    expect(snapshot.treeEquivalent).toBeGreaterThan(0);
  });
});
