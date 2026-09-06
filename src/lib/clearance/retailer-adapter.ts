import type { ProductObservation, Retailer } from "./types";

export interface CollectionRequest { storeId: string; categories: string[]; }

export interface RetailerAdapter {
  readonly retailer: Retailer;
  collectStoreProducts(request: CollectionRequest): Promise<ProductObservation[]>;
}
