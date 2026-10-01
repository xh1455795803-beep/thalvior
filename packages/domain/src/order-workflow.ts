export type OrderStatus = "pending" | "paid" | "processing" | "partially_shipped" | "shipped" | "completed" | "cancelled" | "refunded";
export type OrderEvent = "pay" | "process" | "ship" | "complete" | "cancel" | "refund";

const transitions: Record<OrderStatus, Partial<Record<OrderEvent, OrderStatus>>> = {
  pending: { pay: "paid", cancel: "cancelled" },
  paid: { process: "processing", cancel: "cancelled" },
  processing: { ship: "shipped", cancel: "cancelled" },
  partially_shipped: { ship: "shipped", complete: "completed" },
  shipped: { complete: "completed", refund: "refunded" },
  completed: { refund: "refunded" },
  cancelled: {},
  refunded: {}
};

export function transitionOrder(status: OrderStatus, event: OrderEvent): OrderStatus {
  const next = transitions[status]?.[event];
  if (!next) throw new Error(`ORDER_INVALID_TRANSITION:${status}:${event}`);
  return next;
}

export type OrderLine = { skuId: string; quantity: number; unitPrice: number; currency: string };
export function calculateOrderSubtotal(lines: OrderLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
}
