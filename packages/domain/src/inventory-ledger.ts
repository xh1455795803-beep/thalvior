export type InventoryTransactionType = "purchase_receipt" | "sale_reserve" | "sale_release" | "sale_ship" | "adjustment" | "transfer_in" | "transfer_out" | "return";
export type InventoryTransaction = { tenantId:string; warehouseId:string; skuId:string; type:InventoryTransactionType; quantity:number; referenceId?:string; occurredAt:string };

export function applyInventoryTransaction(onHand:number, reserved:number, tx:InventoryTransaction) {
  if (tx.quantity <= 0) throw new Error("INVENTORY_QUANTITY_INVALID");
  let nextOnHand = onHand;
  let nextReserved = reserved;
  if (["purchase_receipt","transfer_in","return"].includes(tx.type)) nextOnHand += tx.quantity;
  if (["transfer_out","sale_ship"].includes(tx.type)) nextOnHand -= tx.quantity;
  if (tx.type === "sale_reserve") { nextReserved += tx.quantity; if (nextReserved > nextOnHand) throw new Error("INVENTORY_INSUFFICIENT_AVAILABLE"); }
  if (tx.type === "sale_release") { nextReserved -= tx.quantity; if (nextReserved < 0) throw new Error("INVENTORY_RESERVED_INVALID"); }
  if (nextOnHand < 0) throw new Error("INVENTORY_ON_HAND_INVALID");
  return { onHand: nextOnHand, reserved: nextReserved, available: nextOnHand - nextReserved };
}
