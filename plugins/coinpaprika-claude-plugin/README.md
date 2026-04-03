# CoinPaprika Claude Plugin

Cryptocurrency market data for 12,000+ coins and 350+ exchanges via the CoinPaprika MCP server.

## What's Included

- **29 MCP tools** — prices, tickers, OHLCV, exchanges, contract lookups, tags, search, price converter
- **1 agent** (`@crypto-analyst`) — market analysis, price trends, risk assessment
- **1 skill** (`crypto-market-search`) — search and discover coins

## MCP Tools

### Market Overview
| Tool | Description |
|------|-------------|
| `getGlobal` | Total market cap, BTC dominance, 24h volume |
| `getTickers` | All tickers with price, market cap, volume |
| `getTickersById` | Ticker for a specific coin |
| `getTickersHistoricalById` | Historical price ticks |

### Coin Research
| Tool | Description |
|------|-------------|
| `getCoins` | List all coins |
| `getCoinById` | Coin details (description, links, team, tags) |
| `getCoinEvents` | Upcoming/past events |
| `getCoinExchanges` | Exchanges listing this coin |
| `getCoinMarkets` | Trading pairs for this coin |

### OHLCV (Candlestick Data)
| Tool | Description |
|------|-------------|
| `getCoinOHLCVHistorical` | Historical candles (5m to 24h intervals) |
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
| `getHistoricalTickerByContract` | Historical data by contract |

### Discovery & Utilities
| Tool | Description |
|------|-------------|
| `search` | Search coins, exchanges, people, tags |
| `resolveId` | Resolve fuzzy names to canonical IDs |
| `priceConverter` | Convert between currencies |
| `getTags` | List all categories |
| `getTagById` | Tag details with coin lists |
| `getPeopleById` | Person/founder details |

### Account (Paid Tiers)
| Tool | Description |
|------|-------------|
| `keyInfo` | API key status (Pro+) |
| `getMappings` | Cross-platform ID mapping (Business+) |
| `getChangelogIDs` | Coin ID changes (Starter+) |
| `status` | Server health check |

## Rate Limits

- **Free tier**: 20,000 calls/month, no API key needed
- **Pro tier**: Higher limits via `api-pro.coinpaprika.com`
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
