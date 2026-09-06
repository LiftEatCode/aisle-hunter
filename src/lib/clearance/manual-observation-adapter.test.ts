import { describe, expect, it } from "vitest";
import { ManualObservationAdapter } from "./manual-observation-adapter";
import type { ProductObservation } from "./types";

const observations: ProductObservation[] = [
  { retailerSku: "A", storeId: "magnolia", price: 50, regularPrice: 100, observedAt: "2026-09-06T15:00:00Z", source: "manual" },
  { retailerSku: "B", storeId: "tomball", price: 25, regularPrice: 50, observedAt: "2026-09-06T15:00:00Z", source: "manual" },
];

describe("ManualObservationAdapter", () => {
  it("returns only observations for the requested store", async () => {
    const adapter = new ManualObservationAdapter("Home Depot", observations);
    await expect(adapter.collectStoreProducts({ storeId: "magnolia", categories: ["Tools"] })).resolves.toEqual([observations[0]]);
  });
});
