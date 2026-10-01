export type FulfillmentStatus = "pending" | "allocated" | "packed" | "label_pending" | "label_ready" | "shipped" | "delivered" | "exception" | "cancelled";
export type FulfillmentEvent = "allocate" | "pack" | "request_label" | "label_ready" | "ship" | "deliver" | "exception" | "cancel";

const transitions: Record<FulfillmentStatus, Partial<Record<FulfillmentEvent, FulfillmentStatus>>> = {
  pending: { allocate: "allocated", cancel: "cancelled" },
  allocated: { pack: "packed", cancel: "cancelled" },
  packed: { request_label: "label_pending", cancel: "cancelled" },
  label_pending: { label_ready: "label_ready", exception: "exception" },
  label_ready: { ship: "shipped", exception: "exception" },
  shipped: { deliver: "delivered", exception: "exception" },
  delivered: {},
  exception: { request_label: "label_pending", cancel: "cancelled" },
  cancelled: {}
};

export function transitionFulfillment(status: FulfillmentStatus, event: FulfillmentEvent): FulfillmentStatus {
  const next = transitions[status]?.[event];
  if (!next) throw new Error(`FULFILLMENT_INVALID_TRANSITION:${status}:${event}`);
  return next;
}

export type PackageItem = { skuId: string; quantity: number };
export type Package = { warehouseId: string; items: PackageItem[]; carrierCode?: string; trackingNumber?: string; labelUrl?: string };

export function validatePackage(pkg: Package) {
  const errors: string[] = [];
  if (!pkg.warehouseId) errors.push("仓库不能为空");
  if (!pkg.items.length) errors.push("包裹至少需要一个商品");
  for (const item of pkg.items) if (item.quantity <= 0) errors.push(`SKU ${item.skuId} 数量必须大于 0`);
  if (pkg.trackingNumber && !pkg.carrierCode) errors.push("填写物流单号时必须指定承运商");
  return { valid: errors.length === 0, errors };
}
