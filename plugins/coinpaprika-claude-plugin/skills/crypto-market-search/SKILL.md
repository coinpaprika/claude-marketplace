---
name: crypto-market-search
description: Search and analyze cryptocurrency market data using CoinPaprika. Activates when users search for coins, ask about prices, request market overviews, or look up tokens by contract address.
---

## Purpose

Search, discover, and analyze cryptocurrency market data across 12,000+ cryptocurrencies and 350+ exchanges using CoinPaprika MCP tools.

## Available Tools

| Tool | Use case |
|------|----------|
| `search(q, categories, limit, rationale)` | Find coins by name, symbol, or keyword |
| `resolveId(type, query, rationale)` | Resolve fuzzy names to canonical coin IDs |
| `getTickersById(coinId, quotes, rationale)` | Price, market cap, volume for one coin |
| `getTickers(limit, quotes, rationale)` | Top coins by market cap |
| `getGlobal(rationale)` | Total market cap, BTC dominance, 24h volume |
| `getCoinById(coinId, rationale)` | Coin description, links, team, tags |
| `getCoinExchanges(coinId, rationale)` | Which exchanges list this coin |
| `getCoinMarkets(coinId, quotes, rationale)` | Trading pairs for a coin |
| `getCoinOHLCVHistorical(coinId, start, rationale)` | Historical candlestick data |
| `getCoinOHLCVLatest(coinId, rationale)` | Last full day OHLCV |
| `getCoinOHLCVToday(coinId, rationale)` | Today's partial OHLCV |
| `getExchanges(limit, quotes, rationale)` | List exchanges |
| `getExchangeByID(exchangeId, rationale)` | Exchange details |
| `getPlatforms(rationale)` | List contract platforms |
| `getTickerByContract(platformId, contractAddress, rationale)` | Price lookup by contract address |
| `getTagById(tagId, additionalFields, rationale)` | Get coins by category (use `additionalFields: "coins"`) |
| `getTags(rationale)` | List all categories/tags |
| `priceConverter(baseCurrencyId, quoteCurrencyId, amount, rationale)` | Convert between currencies |
| `status(rationale)` | API health check |

**Every tool requires a `rationale` argument.** It is a 20 to 500 character string saying what triggered the call and what you will do with the result, for example "User asked for the BTC price; fetching the ticker to report the current USD value." Omitting it fails the call with `-32602 Input validation error`.

## Coin ID Format

Pattern: `{symbol}-{name}` (lowercase, hyphens). Examples: `btc-bitcoin`, `eth-ethereum`, `sol-solana`.

If unsure of the ID, call `search(q: "user query", rationale)` or `resolveId(type: "coin", query: "user query", rationale)` first.

## Workflows

**Search for a coin:**
1. `search(q: "pepe", categories: "currencies", limit: 5, rationale)`
2. Pick the correct result, use its `id` field for further queries

**Get coin price and details:**
1. `getTickersById(coinId: "btc-bitcoin", quotes: "USD,BTC", rationale)`
2. Key fields: `quotes.USD.price`, `quotes.USD.market_cap`, `quotes.USD.volume_24h`, `quotes.USD.percent_change_24h`

**Top coins by market cap:**
1. `getTickers(limit: 10, quotes: "USD", rationale)`
2. Results are sorted by rank

**Market overview:**
1. `getGlobal(rationale)` for total market cap, BTC dominance, volume
2. `getTickers(limit: 10, rationale)` for top movers

**Look up token by contract address:**
1. `getTickerByContract(platformId: "eth-ethereum", contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", rationale)`
2. Platform IDs: `eth-ethereum`, `bnb-binance-coin`, `matic-polygon`, `sol-solana`, `arb-arbitrum`, `avax-avalanche`, `op-optimism`, `base-base`

**Find coins by category:**
1. `getTagById(tagId: "stablecoin", additionalFields: "coins", rationale)` returns array of coin IDs
2. Common tags: `stablecoin`, `defi`, `nft`, `layer-1`, `layer-2`, `meme-token`

**Historical OHLCV:**
1. `getCoinOHLCVHistorical(coinId: "btc-bitcoin", start: "2025-01-01", interval: "24h", limit: 30, rationale)`
2. Intervals: `5m`, `15m`, `30m`, `1h`, `6h`, `12h`, `24h`

## Output Guidelines

- Use compact numbers: 1.2B, 450M, 12.3K
- Show multiple timeframes: 1h, 24h, 7d, 30d changes
- Include market cap rank for context
- Note distance from ATH when significant
- Distinguish circulating vs total vs max supply
- Never provide investment advice
- Always cite which MCP tools provided the data

## Error Handling

- Coin not found → use `search` to find similar names
- Invalid coin ID → must be `symbol-name` format (lowercase, hyphens)
- Rate limited → wait briefly, suggest caching results

## Rate Limits

- Free tier: 20,000 calls/month (no API key needed)
- Pro tier: higher limits via api-pro.coinpaprika.com
- Global: 10 requests/second
