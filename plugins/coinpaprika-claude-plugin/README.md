# CoinPaprika Claude Plugin

Cryptocurrency market data for 12,000+ cryptocurrencies and 350+ exchanges via the CoinPaprika MCP server.

## What's Included

- **31 MCP tools**: prices, tickers, OHLCV, exchanges, contract lookups, tags, search, price converter
- **1 agent** (`@crypto-analyst`): market analysis, price trends, risk assessment
- **1 skill** (`crypto-market-search`): search and discover coins

## MCP Tools

### Market Overview
| Tool | Description |
|------|-------------|
| `getGlobal` | Total market cap, BTC dominance, 24h volume |
| `getTickers` | All tickers with price, market cap, volume |
| `getTickersById` | Ticker for a specific coin |
| `getTickersHistoricalById` | Historical price ticks (Starter+, paid) |

### Coin Research
| Tool | Description |
|------|-------------|
| `getCoins` | List all coins |
| `getCoinById` | Coin details (description, links, team, tags) |
| `getCoinEvents` | Upcoming/past events |

### OHLCV (Candlestick Data)
| Tool | Description |
|------|-------------|
| `getCoinOHLCVHistorical` | Historical candles, 5m to 24h intervals (Starter+, paid) |
| `getCoinOHLCVLatest` | Last full day OHLCV |
| `getCoinOHLCVToday` | Today's partial OHLCV |

### Exchanges
| Tool | Description |
|------|-------------|
| `getExchanges` | List all exchanges |
| `getExchangeByID` | Exchange details |
| `getExchangeMarkets` | Markets on an exchange |

### Contract Lookups
| Tool | Description |
|------|-------------|
| `getPlatforms` | List contract platforms |
| `getContracts` | Contracts on a platform |
| `getTickerByContract` | Price by contract address |
| `getHistoricalTickerByContract` | Historical data by contract (Starter+, paid) |

### Coins listed and traded
| Tool | Description |
|------|-------------|
| `getCoinExchanges` | Exchanges listing a coin |
| `getCoinMarkets` | Trading pairs for a coin, with per-market price and volume |

### Discovery & Utilities
| Tool | Description |
|------|-------------|
| `getCapabilities` | Server name and version, tool count, plan tiers per tool, coin ID format |
| `status` | Server status and configuration |
| `submitFeedback` | Report a problem back to the CoinPaprika team |
| `search` | Search coins, exchanges, people, tags |
| `resolveId` | Resolve fuzzy names to canonical IDs |
| `priceConverter` | Convert between currencies |
| `getTags` | List all categories |
| `getTagById` | Tag details with coin lists |
| `getPeopleById` | Person/founder details |

### Paid Tier

These need a paid CoinPaprika key. On the hosted server they return an upgrade stub
(`{"error":"paid_endpoint"}`) rather than data. Three more paid tools are marked
"(Starter+, paid)" in the tables above: `getTickersHistoricalById`,
`getCoinOHLCVHistorical` and `getHistoricalTickerByContract`. The authoritative list
is `plan_tiers` in a live `getCapabilities` call.

| Tool | Description |
|------|-------------|
| `keyInfo` | API key status (Pro+) |
| `getMappings` | Cross-platform ID mapping (Business+) |
| `getChangelogIDs` | Coin ID changes (Starter+) |

## Rate Limits

- **Free tier**: 20,000 calls/month, no API key needed
- **Paid plans**: from $99/month for 400,000 calls, via `api-pro.coinpaprika.com`. See https://coinpaprika.com/api/pricing/
- **Global**: 10 requests/second per IP

## Coin ID Format

Pattern: `{symbol}-{name}` (lowercase, hyphens)

Examples: `btc-bitcoin`, `eth-ethereum`, `sol-solana`, `ada-cardano`

Use `search` or `resolveId` if unsure of the correct ID.

## Resources

- [API Docs](https://docs.coinpaprika.com)
- [LLM Docs](https://docs.coinpaprika.com/llms-full.txt)
- [CLI](https://github.com/coinpaprika/coinpaprika-cli)
- [API Pricing](https://coinpaprika.com/api/pricing)

## Privacy

This plugin connects to the hosted CoinPaprika MCP server at `mcp.coinpaprika.com`. See the [CoinPaprika privacy policy](https://coinpaprika.com/privacy-policy/) for details on what data is collected, how it is used, and how long it is retained.
