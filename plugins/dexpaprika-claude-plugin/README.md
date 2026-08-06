# DexPaprika Claude Plugin

DeFi data across 36 blockchains, 36M+ liquidity pools, and 33M+ tokens via the DexPaprika MCP server.

## What's Included

- **17 MCP tools**: tokens, pools, OHLCV, transactions, search, batch prices
- **1 agent** (`@defi-data-analyst`): DeFi security analysis, honeypot detection, scam identification
- **4 skills**: Token Security Analyzer, Technical Analyzer, Batch Token Price Lookup, Trending Pools Analyzer

## MCP Tools

| Tool | Description |
|------|-------------|
| `getCapabilities` | Server capabilities, workflow examples, network synonyms |
| `getNetworks` | List every supported blockchain |
| `getStats` | Platform-wide statistics |
| `getNetworkDexes` | DEXes on a network |
| `getNetworkPools` | Top pools on a network (sortable by volume, price, txns) |
| `getNetworkPoolsFilter` | Filter pools by volume, txns, creation date |
| `getDexPools` | Pools for a specific DEX. REST equivalent: `GET /networks/{network}/pools/search?dex_name={dex_id}` |
| `getPoolDetails` | Pool details (tokens, volume, liquidity) |
| `getPoolOHLCV` | Historical price candles (1m to 24h intervals) |
| `getPoolTransactions` | Recent swaps and trades |
| `getTokenDetails` | Token price, liquidity, metrics |
| `getTokenPools` | All pools containing a token |
| `getTokenMultiPrices` | Batch prices for up to 10 tokens |
| `getTopTokens` | Top tokens on a network by volume, liquidity, transactions, FDV, or 24h price change |
| `filterNetworkTokens` | Filter tokens by volume, liquidity, FDV, transactions, creation date |
| `search` | Search tokens, pools, DEXes across all networks |
| `submitFeedback` | Report a problem back to the DexPaprika team |

The old REST path for pools on a single DEX, `/networks/{network}/dexes/{dex}/pools`, was removed and returns HTTP 410. Pools on one DEX now come from `/networks/{network}/pools/search` with a `dex_name` filter, which takes the dex id (`uniswap_v3`) from `/networks/{network}/dexes`, matched case-insensitively. Passing the display name (`Uniswap V3`) returns HTTP 200 with an empty `results` array rather than an error, so a wrong value looks like a DEX with no pools. That endpoint returns rows under `results` with `has_next_page`/`next_cursor` pagination and a `volume_usd_24h` field, so there is no `pools` array, no `page_info` and no bare `volume_usd` on it.

## Skills

| Skill | What it does |
|-------|-------------|
| **token-security-analyzer** | Honeypot detection, rug pull risk, market manipulation analysis |
| **technical-analyzer** | OHLCV chart analysis, candlestick patterns, support/resistance, indicators |
| **batch-token-price-lookup** | Quick price checks for multiple tokens |
| **trending-pools-analyzer** | Discover top pools by 24h volume on any network |

## Rate Limits

- **Keyless**: 200,000 credits/month per IP, 30/min, data delayed up to 15 seconds. No API key needed to start.
- **Free API key**: 500,000 credits/month, 30/min, data delayed up to 15 seconds.
- **Pro** ($99/month): 5,000,000 credits/month, 300/min, real-time data.

One request costs one credit. Batch endpoints cost one credit per item.

See the [rate limits guide](https://docs.dexpaprika.com/knowledge-base/rate-limits) for details.

## Common Network IDs

`ethereum`, `solana`, `bsc`, `polygon`, `arbitrum`, `base`, `avalanche`, `optimism`, `sui`, `ton`, `tron`

Full list: call `getNetworks()`.

## Resources

- [API Docs](https://docs.dexpaprika.com)
- [Streaming API](https://streaming.dexpaprika.com) (SSE, pushed when a swap moves the price)
- [CLI](https://github.com/coinpaprika/dexpaprika-cli)
- [AI Agents Showcase](https://agents.dexpaprika.com)
- SDKs: [Go](https://github.com/coinpaprika/dexpaprika-sdk-go) | [Python](https://github.com/coinpaprika/dexpaprika-sdk-python) | [TypeScript](https://github.com/coinpaprika/dexpaprika-sdk-ts) | [PHP](https://github.com/coinpaprika/dexpaprika-sdk-php)

## Privacy

This plugin connects to the hosted DexPaprika MCP server at `mcp.dexpaprika.com`. See the [DexPaprika privacy policy](https://dexpaprika.com/privacy-policy) for details on what data is collected, how it is used, and how long it is retained.
