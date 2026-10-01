export type SettlementLine = { referenceId:string; type:"sale"|"refund"|"fee"|"shipping"|"adjustment"; amount:number; currency:string };
export type ReconciliationResult = { currency:string; expected:number; actual:number; difference:number; matched:boolean };

export function reconcile(lines: SettlementLine[], actual: {amount:number;currency:string}): ReconciliationResult {
  if (!lines.length) throw new Error("RECONCILIATION_LINES_REQUIRED");
  const currencies = new Set(lines.map(x => x.currency));
  if (currencies.size !== 1 || !currencies.has(actual.currency)) throw new Error("RECONCILIATION_CURRENCY_MISMATCH");
  const expected = lines.reduce((sum, line) => {
    const sign = line.type === "refund" || line.type === "fee" || line.type === "shipping" ? -1 : 1;
    return sum + sign * line.amount;
  }, 0);
  const difference = actual.amount - expected;
  return { currency: actual.currency, expected, actual: actual.amount, difference, matched: Math.abs(difference) < 0.01 };
}

export function calculatePlatformSettlement(revenue:number, refunds:number, fees:number, shipping:number) {
  return revenue - refunds - fees - shipping;
}
