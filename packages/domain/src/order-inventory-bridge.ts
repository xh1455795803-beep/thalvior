export type OrderLineForInventory = { skuId: string; quantity: number };
export type InventoryReservation = { skuId: string; quantity: number };

export function buildInventoryReservations(lines: OrderLineForInventory[]): InventoryReservation[] {
  const quantities = new Map<string, number>();
  for (const line of lines) {
    if (!line.skuId || line.quantity <= 0) throw new Error("ORDER_LINE_INVALID");
    quantities.set(line.skuId, (quantities.get(line.skuId) ?? 0) + line.quantity);
  }
  return [...quantities.entries()].map(([skuId, quantity]) => ({ skuId, quantity }));
}

export function validateReservationRelease(reserved: number, releaseQuantity: number) {
  if (releaseQuantity <= 0 || releaseQuantity > reserved) throw new Error("INVENTORY_RELEASE_INVALID");
  return reserved - releaseQuantity;
}
