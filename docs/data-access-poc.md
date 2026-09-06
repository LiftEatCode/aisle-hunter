# Data-access proof of concept

Validated September 6, 2026.

## Decision

Aisle Hunter will not scrape either retailer's consumer website. Collection is
restricted to authorized APIs and observations entered by the app owner. This
keeps retailer integrations replaceable and avoids depending on undocumented
website internals or bypassing access controls.

## Lowe's

Lowe's Developer Hub advertises Product Catalog capabilities for products,
prices, promotions, and inventory. Its Product Discovery documentation says the
Product Detail API supplies current pricing, inventory availability, and active
promotions. An application and credentials are required before we can validate
the exact production response contract.

The consumer-site terms prohibit robots and automated retrieval/data mining.
They also state that online pricing may differ from in-store pricing and excludes
some store-specific in-store markdowns. The official API can therefore provide
one signal, but manual shelf-tag observations remain necessary for full coverage.

## Home Depot

No suitable public, documented consumer Product Catalog API was identified for
this proof of concept. Home Depot also warns that local store prices may vary and
that displayed availability is not guaranteed. The Home Depot adapter remains
manual until an authorized source or partnership is available.

## Implemented

- A retailer-neutral observation contract
- Source provenance: `authorized_api` or `manual`
- A manual observation adapter for either retailer
- Conservative clearance classification
- Tests covering confirmed, likely, possible, and rejected observations

## Classification rules

1. Explicit clearance/closeout evidence: `confirmed`
2. At least 30% below regular price: `likely`
3. At least 15% below regular price: `possible`
4. Smaller reductions, missing regular price, or non-reductions: ignored

These are product rules, not claims made by either retailer, and can be tuned
after real observations are collected.

## Next gate

1. Register an application in the Lowe's Developer Hub.
2. Obtain access to the Product Catalog/Product Detail APIs.
3. Save the credentials locally using `.env.local`.
4. Capture and sanitize representative API responses.
5. Implement the Lowe's response normalizer against the approved contract.
6. Add a mobile-first manual observation form for both retailers.

## Official references

- Lowe's Developer Hub: https://developer.lowes.com/portal/components/
- Lowe's Product Catalog: https://developer.lowes.com/portal/business-components/Product%20Catalog/
- Lowe's Product Discovery: https://developer.lowes.com/portal/solutions/product-discovery/
- Lowe's Terms: https://www.lowes.com/l/about/terms-and-conditions-of-use
- Home Depot Terms: https://www.homedepot.com/c/Terms_of_Use
