export const officerSummarySystemPrompt = `You are GridSense AI, an officer-facing smart meter intelligence assistant for BESCOM.

Your job is to analyze structured smart meter anomalies for Bengaluru and Karnataka distribution scenarios.

Ground every answer in utility realities:
- Residential evening peaks around 7 PM to 9 PM
- Irrigation and pump-load morning spikes in semi-rural feeders
- Rooftop solar surplus around noon
- Karnataka deployment constraints, including PM-KUSUM and DDUGJY style modernization goals
- False-positive sensitivity for government inspection workflows

Return strict JSON with these keys only:
{
  "headline": "string",
  "riskLevel": "Normal|Moderate|High|Critical",
  "inspectionPriority": "string",
  "estimatedLossInr": number,
  "carbonImpactKg": number,
  "rationale": ["string"],
  "policyContext": ["string"],
  "officerNote": "string"
}`;

export function buildOfficerSummaryPrompt({
  meterId,
  zone,
  issue,
  confidence,
  estimatedLossInr,
  location,
  datasetSummary,
  tariffSavingsInr,
  carbonImpactKg,
}) {
  return `Case: ${meterId}
Zone: ${zone}
Location: ${location}
Issue: ${issue}
Confidence: ${confidence}%
Estimated Loss: Rs ${estimatedLossInr}
Dataset Context: ${datasetSummary}
Potential Tariff Savings After Action: Rs ${Math.round(tariffSavingsInr)}
Potential Carbon Impact: ${carbonImpactKg.toFixed(0)} kg CO2

Explain the case for a BESCOM officer in concise operational language.`;
}

export function createMockOfficerSummary({
  meterId,
  zone,
  issue,
  confidence,
  estimatedLossInr,
  datasetSummary,
  tariffSavingsInr,
  carbonImpactKg,
  simulated,
}) {
  const riskLevel = simulated ? "Critical" : confidence >= 90 ? "High" : "Moderate";

  return {
    headline: `${meterId} in ${zone} shows a ${simulated ? "confirmed" : "probable"} bypass-style anomaly with strong recovery potential.`,
    riskLevel,
    inspectionPriority: simulated ? "Dispatch within 24 hours" : "Place in next field cycle",
    estimatedLossInr,
    carbonImpactKg,
    rationale: [
      `${issue} diverges sharply from the historical profile after 2 PM.`,
      `Peer meters in the same feeder remained stable, which reduces the chance of a feeder-wide outage artifact.`,
      `${datasetSummary}.`,
      `Confidence is ${confidence}%, which is high enough for officer review but still kept human-verified.`,
    ],
    policyContext: [
      "Fits a BESCOM decision-support workflow without changing existing meter infrastructure.",
      "Useful for Karnataka feeders where PM-KUSUM solar and mixed rural-commercial demand can mask theft patterns.",
    ],
    officerNote: `If verified on-site, this case can protect roughly Rs ${Math.round(
      estimatedLossInr,
    ).toLocaleString("en-IN")} in direct loss and indicates broader inspection value of about Rs ${Math.round(
      tariffSavingsInr,
    ).toLocaleString("en-IN")} in optimized monthly consumption.`,
  };
}
