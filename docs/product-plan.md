# Aisle Hunter product plan

## Problem

Clearance prices and availability can vary by retailer and store. Shoppers need
a fast way to discover meaningful local markdowns, understand how recently the
data was checked, and decide whether a trip is worthwhile.

## MVP workflow

1. Configure a Home Depot store and a Lowe's store.
2. Run a retailer-specific collection adapter.
3. Normalize products, prices, availability, and evidence.
4. Compare each observation with its previous observation.
5. Classify the deal and its confidence.
6. Show new and reduced items in a private dashboard.

## Clearance confidence

- `confirmed`: The retailer explicitly labels the item as clearance.
- `likely`: Strong retailer evidence or a substantial store-specific markdown.
- `possible`: A meaningful price difference without explicit clearance evidence.
- `reported`: Manually observed in a store.
- `expired`: The deal is no longer observable or available.

## Initial entities

- Retailer
- Store
- Product
- StoreProduct
- PriceObservation
- InventoryObservation
- ClearanceDeal
- Watchlist
- AlertRule
- CollectionRun

The store-product combination owns price and inventory state. A product must not
have one assumed universal price.

## Proposed stack

- Next.js, React, and TypeScript
- Tailwind CSS and shadcn/ui
- PostgreSQL and Prisma
- Private authentication
- Vercel for the web application
- A separate collection worker if browser-based retrieval is required

## Validation gate

Before building the complete dashboard, prove that the collector can reliably:

1. Retrieve store-specific prices.
2. Distinguish clearance from ordinary promotions.
3. Capture enough availability evidence to make the results useful.
