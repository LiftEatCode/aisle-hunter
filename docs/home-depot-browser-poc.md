# Home Depot browser proof of concept

The collector targets the publicly visible Home Depot clearance page for West
Woodlands store #6819 in Magnolia, Texas. It performs one page load, extracts
visible product cards, writes a local JSON observation file, and exits.

It does not sign in, evade access controls, solve CAPTCHAs, call undocumented
private endpoints, or continue when Home Depot denies access.

## Run locally

```bash
npm install
npx playwright install chromium
npm run collect:home-depot
```

Output is written to:

```text
data/observations/home-depot-6819.json
```

Observation JSON is ignored by Git because live retailer data should not be
committed. The configured store and source URL are versioned under
`data/retailers/home-depot.json`.

## Validation status

The Playwright package and collector compile in the project. The live experiment
could not run in the Codex workspace because its network timed out while
downloading the Chromium binary. Run the commands above on the development
machine to determine whether Home Depot serves product cards or denies the
browser session.

## Success gate

Continue only if the collector returns product cards with stable product URLs
and visible prices for store #6819. A successful page load does not prove that
all in-store clearance is represented or that inventory is accurate.
