import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const config = JSON.parse(
  await readFile(new URL("../data/retailers/home-depot.json", import.meta.url)),
);

const outputDirectory = new URL("../data/observations/", import.meta.url);
const outputFile = new URL(
  `home-depot-${config.storeId}.json`,
  outputDirectory,
);

const browser = await chromium.launch({ headless: true });

try {
  const context = await browser.newContext({
    locale: "en-US",
    timezoneId: "America/Chicago",
  });
  const page = await context.newPage();

  await page.goto(config.clearanceUrl, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  await page.waitForTimeout(3_000);

  const accessState = await page.evaluate(() => {
    const body = document.body.innerText.toLowerCase();
    return {
      title: document.title,
      denied:
        body.includes("access denied") ||
        body.includes("verify you are human") ||
        body.includes("captcha"),
    };
  });

  if (accessState.denied) {
    throw new Error(
      "Home Depot denied automated access. Collection stopped without attempting a bypass.",
    );
  }

  const products = await page.evaluate(() => {
    const selectors = [
      "[data-testid='product-pod']",
      "[data-testid='product-pod-container']",
      "[data-component='ProductPod']",
    ];
    const nodes = selectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector)),
    );
    const uniqueNodes = Array.from(new Set(nodes));

    return uniqueNodes.flatMap((node) => {
      const link = node.querySelector("a[href*='/p/']");
      const text = node.textContent?.replace(/\s+/g, " ").trim() ?? "";
      const priceMatches = Array.from(
        text.matchAll(/\$\s?([0-9,]+(?:\.\d{2})?)/g),
        (match) => Number(match[1].replaceAll(",", "")),
      ).filter(Number.isFinite);

      if (!(link instanceof HTMLAnchorElement) || priceMatches.length === 0) {
        return [];
      }

      const title =
        link.getAttribute("aria-label") ||
        node.querySelector("[data-testid='product-header']")?.textContent ||
        link.textContent ||
        "Unknown product";
      const itemId = link.href.match(/\/(\d{6,})(?:\?|$)/)?.[1] ?? null;

      return [
        {
          itemId,
          title: title.replace(/\s+/g, " ").trim(),
          url: link.href,
          visiblePrices: priceMatches,
          visibleText: text.slice(0, 1_000),
        },
      ];
    });
  });

  const result = {
    retailer: "Home Depot",
    source: "public_clearance_page",
    store: config,
    observedAt: new Date().toISOString(),
    pageTitle: accessState.title,
    productCount: products.length,
    products,
  };

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(result, null, 2)}\n`);
  console.log(
    `Collected ${products.length} visible products for Home Depot store ${config.storeId}.`,
  );
  console.log(`Saved ${outputFile.pathname}`);
} finally {
  await browser.close();
}
