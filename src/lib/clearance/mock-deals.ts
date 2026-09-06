import type { ClearanceDeal } from "./types";

export const clearanceDeals: ClearanceDeal[] = [
  { id: "deal-dewalt-kit", product: { id: "dewalt-kit", retailerSku: "1008859542", brand: "DeWalt", name: "20V MAX Cordless 5-Tool Combo Kit", category: "Tools" }, store: { id: "hd-magnolia", retailer: "Home Depot", retailerStoreId: "6530", name: "Magnolia" }, regularPrice: 499, clearancePrice: 249, discountPercent: 50, confidence: "confirmed", isNew: true, observedAt: "2026-09-06T15:00:00Z" },
  { id: "deal-kobalt-mower", product: { id: "kobalt-mower", retailerSku: "5066257", brand: "Kobalt", name: "80V 21-in Self-Propelled Lawn Mower", category: "Outdoor" }, store: { id: "lowes-tomball", retailer: "Lowe's", retailerStoreId: "1052", name: "Tomball" }, regularPrice: 599, clearancePrice: 299, discountPercent: 50, confidence: "likely", isNew: false, observedAt: "2026-09-06T14:54:00Z" },
  { id: "deal-milwaukee-light", product: { id: "milwaukee-light", retailerSku: "1006299550", brand: "Milwaukee", name: "M18 LED Tower Light", category: "Tools" }, store: { id: "hd-magnolia", retailer: "Home Depot", retailerStoreId: "6530", name: "Magnolia" }, regularPrice: 229, clearancePrice: 137, discountPercent: 40, confidence: "possible", isNew: true, observedAt: "2026-09-06T14:48:00Z" },
];
