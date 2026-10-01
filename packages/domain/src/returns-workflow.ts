export type ReturnStatus = "requested" | "approved" | "rejected" | "received" | "inspecting" | "refunded" | "closed";
export type ReturnEvent = "approve" | "reject" | "receive" | "inspect" | "refund" | "close";

const transitions: Record<ReturnStatus, Partial<Record<ReturnEvent, ReturnStatus>>> = {
  requested: { approve: "approved", reject: "rejected" },
  approved: { receive: "received" },
  rejected: { close: "closed" },
  received: { inspect: "inspecting" },
  inspecting: { refund: "refunded", close: "closed" },
  refunded: { close: "closed" },
  closed: {}
};

export function transitionReturn(status: ReturnStatus, event: ReturnEvent): ReturnStatus {
  const next = transitions[status]?.[event];
  if (!next) throw new Error(`RETURN_INVALID_TRANSITION:${status}:${event}`);
  return next;
}

export type RefundLine = { quantity: number; unitAmount: number };
export function calculateRefund(lines: RefundLine[], shippingRefund = 0, adjustment = 0) {
  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.unitAmount, 0);
  const total = subtotal + shippingRefund + adjustment;
  if (total < 0) throw new Error("REFUND_AMOUNT_INVALID");
  return { subtotal, shippingRefund, adjustment, total };
}
