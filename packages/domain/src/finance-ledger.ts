export type Money = { amount:number; currency:string };
export type LedgerEntryType = "sale" | "refund" | "purchase" | "shipping" | "fee" | "adjustment";
export type LedgerEntry = { id:string; tenantId:string; type:LedgerEntryType; referenceId:string; debit?:Money; credit?:Money; occurredAt:string };

export function assertMoney(value: Money) {
  if (!Number.isFinite(value.amount) || value.amount < 0) throw new Error("MONEY_AMOUNT_INVALID");
  if (!/^[A-Z]{3}$/.test(value.currency)) throw new Error("CURRENCY_INVALID");
}

export function calculateGrossMargin(revenue:Money, productCost:Money, shippingCost:Money, platformFee:Money) {
  for (const value of [revenue, productCost, shippingCost, platformFee]) assertMoney(value);
  if (new Set([revenue.currency, productCost.currency, shippingCost.currency, platformFee.currency]).size !== 1) throw new Error("CURRENCY_MISMATCH");
  const grossProfit = revenue.amount - productCost.amount - shippingCost.amount - platformFee.amount;
  return { currency: revenue.currency, grossProfit, marginRate: revenue.amount === 0 ? 0 : grossProfit / revenue.amount };
}
