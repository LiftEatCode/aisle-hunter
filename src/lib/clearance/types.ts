export type Retailer = "Home Depot" | "Lowe's";
export type ClearanceConfidence = "confirmed" | "likely" | "possible";

export interface Store { id: string; retailer: Retailer; retailerStoreId: string; name: string; }
export interface Product { id: string; retailerSku: string; brand: string; name: string; category: "Tools" | "Outdoor"; }
export interface ClearanceDeal { id: string; product: Product; store: Store; regularPrice: number; clearancePrice: number; discountPercent: number; confidence: ClearanceConfidence; isNew: boolean; observedAt: string; }
export type ObservationSource = "authorized_api" | "manual";

export interface ProductObservation {
  retailerSku: string;
  storeId: string;
  price: number;
  regularPrice?: number;
  availableQuantity?: number;
  clearanceLabel?: string;
  observedAt: string;
  source: ObservationSource;
}

export interface ClearanceClassification {
  confidence: ClearanceConfidence;
  discountPercent: number;
  reason: string;
}
