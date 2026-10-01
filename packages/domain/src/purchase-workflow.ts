export type PurchaseStatus = "draft" | "submitted" | "approved" | "ordered" | "partially_received" | "received" | "cancelled";
export type PurchaseEvent = "submit" | "approve" | "place_order" | "receive" | "cancel";

const transitions: Record<PurchaseStatus, Partial<Record<PurchaseEvent, PurchaseStatus>>> = {
  draft: { submit: "submitted", cancel: "cancelled" },
  submitted: { approve: "approved", cancel: "cancelled" },
  approved: { place_order: "ordered", cancel: "cancelled" },
  ordered: { receive: "partially_received", cancel: "cancelled" },
  partially_received: { receive: "received", cancel: "cancelled" },
  received: {},
  cancelled: {}
};

export function transitionPurchase(status: PurchaseStatus, event: PurchaseEvent): PurchaseStatus {
  const next = transitions[status]?.[event];
  if (!next) throw new Error(`PURCHASE_INVALID_TRANSITION:${status}:${event}`);
  return next;
}

export type PurchaseLine = { skuId: string; quantity: number; unitCost: number; currency: string };
export function calculatePurchaseSubtotal(lines: PurchaseLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity * line.unitCost, 0);
}
