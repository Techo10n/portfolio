EcoShelf is a Chrome extension for online shopping. The goal is for it to estimate the emissions from shipping a product and recommend more sustainable alternatives at a similar price.

## Overview

EcoShelf doesn't ask people to change what they buy. On sites like Amazon there are often dozens of nearly identical products, and EcoShelf is meant to help you sort through them with sustainability in mind, without giving up function or price. When you find a product you like, the extension would tell you about other sellers offering the same product who would produce less emissions shipping it, while staying in a similar price range.

## What I built

- **A product-page scraper.** On an Amazon product page, a content script collects the title, price, rating, review count, delivery destination and date, where the product ships from, who sells it, and the package and product weight and volume. Where it ships from and where it's going give the distance. Weight and volume give the load. Together, those are what an emissions estimate needs.
- **A title-trimming API.** An Amazon listing title is useless as a search term on other stores. A small Express server uses OpenAI to cut it down to a short, generic description of about five words that works for searching.
- **The popup.** A React and Tailwind popup shows the product data it collected. It recognizes major shopping sites and shows a separate screen when you're on a site it doesn't support.

The search for alternatives and the emissions calculation itself weren't built before I paused the project.

## How it works

The repo holds two separate Node projects. The extension, built with WXT, has a content script, a background service worker, and the popup. The backend exists for one reason only: to keep the OpenAI API key out of the extension, since anyone can read a browser extension's code.

The scraper starts collecting as soon as the page loads and stores the result, so the popup shows data right away instead of starting a scrape when you open it. Amazon renders some fields late, so the scraper waits up to a few seconds for each one. When a field can't be read, it returns an empty value instead of failing, so a change to one part of Amazon's layout can't break the whole extension.

## Tech stack

- WXT, React, TypeScript, and Tailwind CSS 4
- Express and Node
- OpenAI API

## What I learned

- **Keep the server as small as possible.** The backend holds the API key and does one job.
- **Scraping fails quietly.** Falling back to empty values keeps the extension from crashing, but it also means a broken selector shows up as missing or wrong data, not as an error. If I come back to this, the first thing I'd add is a test that runs the scraper against a saved Amazon page.

## Status

On hold. EcoShelf isn't in active development, but I may pick it back up. The source is on [GitHub](https://github.com/Techo10n/ecoshelf).
