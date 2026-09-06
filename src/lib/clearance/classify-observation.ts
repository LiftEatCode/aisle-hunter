import type { ClearanceClassification, ProductObservation } from "./types";

const CLEARANCE_PATTERN = /clearance|final markdown|closeout/i;

export function classifyObservation(
  observation: ProductObservation,
): ClearanceClassification | null {
  const regularPrice = observation.regularPrice;
  if (!regularPrice || regularPrice <= 0 || observation.price >= regularPrice) {
    return null;
  }

  const discountPercent = Math.round(
    ((regularPrice - observation.price) / regularPrice) * 100,
  );

  if (
    observation.clearanceLabel &&
    CLEARANCE_PATTERN.test(observation.clearanceLabel)
  ) {
    return {
      confidence: "confirmed",
      discountPercent,
      reason: "The authorized source explicitly labels this item as clearance.",
    };
  }

  if (discountPercent >= 30) {
    return {
      confidence: "likely",
      discountPercent,
      reason: "The store-specific price is at least 30% below regular price.",
    };
  }

  if (discountPercent >= 15) {
    return {
      confidence: "possible",
      discountPercent,
      reason: "The price is reduced, but no explicit clearance evidence exists.",
    };
  }

  return null;
}
