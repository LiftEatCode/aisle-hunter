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

## Local development

Requires Node.js 24.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

## Status

The Next.js foundation includes a responsive deal-feed dashboard, typed domain
models, mock clearance data, and the shared retailer-adapter contract. Database,
authentication, and live retailer collection are intentionally deferred until
the data-access proof of concept.

The initial data-access proof is documented in
[docs/data-access-poc.md](docs/data-access-poc.md). Automated collection prefers
authorized retailer APIs and permits only bounded public-page experiments that
stop when access is denied.

The bounded Home Depot browser experiment is documented in
[docs/home-depot-browser-poc.md](docs/home-depot-browser-poc.md).
