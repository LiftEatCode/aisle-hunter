# Aisle Hunter

Private clearance intelligence for nearby Home Depot and Lowe's stores.

## Product goal

Aisle Hunter collects store-specific product observations and surfaces useful
clearance opportunities in one private dashboard. It will track price changes,
availability confidence, and newly discovered markdowns without treating every
sale price as confirmed clearance.

## First vertical slice

- Private, single-user web application
- One Home Depot store and one Lowe's store
- Tools and outdoor equipment
- Product name, image, store, price, discount, availability, and retailer link
- Price history and `new`, `price_dropped`, and `gone` states
- Manual collection runs while retailer data access is validated

See [docs/product-plan.md](docs/product-plan.md) for the initial implementation
plan and data model.

## Status

Repository initialized. Application scaffolding is the next step.
