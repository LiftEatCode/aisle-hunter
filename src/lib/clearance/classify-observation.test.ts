import { describe, expect, it } from "vitest";
import { classifyObservation } from "./classify-observation";
import type { ProductObservation } from "./types";

const base: ProductObservation = {
  retailerSku: "12345",
  storeId: "store-1",
  price: 60,
  regularPrice: 100,
  observedAt: "2026-09-06T15:00:00Z",
  source: "authorized_api",
};

describe("classifyObservation", () => {
  it("confirms an explicitly labeled clearance item", () => {
    expect(classifyObservation({ ...base, clearanceLabel: "Clearance" })).toEqual({
      confidence: "confirmed",
      discountPercent: 40,
      reason: "The authorized source explicitly labels this item as clearance.",
    });
  });

  it("marks a large unlabeled reduction as likely", () => {
    expect(classifyObservation(base)?.confidence).toBe("likely");
  });

  it("marks a smaller reduction as possible", () => {
    expect(classifyObservation({ ...base, price: 80 })?.confidence).toBe("possible");
  });

  it("rejects ordinary prices and shallow promotions", () => {
    expect(classifyObservation({ ...base, price: 90 })).toBeNull();
    expect(classifyObservation({ ...base, price: 100 })).toBeNull();
  });

  it("rejects observations without a valid regular price", () => {
    expect(classifyObservation({ ...base, regularPrice: undefined })).toBeNull();
    expect(classifyObservation({ ...base, regularPrice: 0 })).toBeNull();
  });
});
