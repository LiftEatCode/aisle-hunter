import type { CollectionRequest, RetailerAdapter } from "./retailer-adapter";
import type { ProductObservation, Retailer } from "./types";

export class ManualObservationAdapter implements RetailerAdapter {
  constructor(
    public readonly retailer: Retailer,
    private readonly observations: ProductObservation[],
  ) {}

  async collectStoreProducts(
    request: CollectionRequest,
  ): Promise<ProductObservation[]> {
    return this.observations.filter(
      (observation) => observation.storeId === request.storeId,
    );
  }
}
