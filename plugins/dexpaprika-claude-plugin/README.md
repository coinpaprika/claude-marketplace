# DexPaprika Claude Plugin

DeFi data across 34+ blockchains, 30M+ liquidity pools, and 27M+ tokens via the DexPaprika MCP server.

## What's Included

- **14 MCP tools** — tokens, pools, OHLCV, transactions, search, batch prices
- **1 agent** (`@defi-data-analyst`) — DeFi security analysis, honeypot detection, scam identification
- **4 skills** — Token Security Analyzer, Technical Analyzer, Batch Token Price Lookup, Trending Pools Analyzer

## MCP Tools

| Tool | Description |
|------|-------------|
| `getCapabilities` | Server capabilities, workflow examples, network synonyms |
| `getNetworks` | List 34+ supported blockchains |
| `getStats` | Platform-wide statistics |
| `getNetworkDexes` | DEXes on a network |
| `getNetworkPools` | Top pools on a network (sortable by volume, price, txns) |
| `getNetworkPoolsFilter` | Filter pools by volume, txns, creation date |
| `getDexPools` | Pools for a specific DEX |
| `getPoolDetails` | Pool details (tokens, volume, liquidity) |
| `getPoolOHLCV` | Historical price candles (1m to 24h intervals) |
| `getPoolTransactions` | Recent swaps and trades |
| `getTokenDetails` | Token price, liquidity, metrics |
| `getTokenPools` | All pools containing a token |
| `getTokenMultiPrices` | Batch prices for up to 10 tokens |
| `search` | Search tokens, pools, DEXes across all networks |

## Skills

| Skill | What it does |
|-------|-------------|
| **token-security-analyzer** | Honeypot detection, rug pull risk, market manipulation analysis |
| **technical-analyzer** | OHLCV chart analysis, candlestick patterns, support/resistance, indicators |
| **batch-token-price-lookup** | Quick price checks for multiple tokens |
| **trending-pools-analyzer** | Discover top pools by 24h volume on any network |

## Rate Limits

- **Free tier**: 10,000 requests/day, no API key needed
- **Enterprise**: Unlimited via `api-pro.dexpaprika.com`
- **Global**: 10 requests/second

## Common Network IDs

`ethereum`, `solana`, `bsc`, `polygon`, `arbitrum`, `base`, `avalanche`, `optimism`, `sui`, `ton`, `tron`

Full list: call `getNetworks()`.

## Resources

- [API Docs](https://docs.dexpaprika.com)
- [Streaming API](https://streaming.dexpaprika.com) (real-time SSE, ~1s updates)
- [CLI](https://github.com/coinpaprika/dexpaprika-cli)
- [AI Agents Showcase](https://agents.dexpaprika.com)
- SDKs: [Go](https://github.com/coinpaprika/dexpaprika-sdk-go) | [Python](https://github.com/coinpaprika/dexpaprika-sdk-python) | [TypeScript](https://github.com/coinpaprika/dexpaprika-sdk-ts) | [PHP](https://github.com/coinpaprika/dexpaprika-sdk-php) | [Rust](https://github.com/coinpaprika/dexpaprika-sdk-rust)
