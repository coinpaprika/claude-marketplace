# DexPaprika Claude Plugin

DeFi data across 36 blockchains, 36M+ liquidity pools, and 33M+ tokens via the DexPaprika MCP server.

## What's Included

- **18 MCP tools**: tokens, pools, OHLCV, transactions, search, batch prices
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
| `getTokenOHLCV` | USD candles for a token across every pool it trades in. Needs your own Dev, Pro or Enterprise key (see below) |
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

## API key

Every tool works without a key except `getTokenOHLCV`, which runs on your own Dev, Pro or Enterprise key and never on ours. To use it, set the key in the environment you start Claude Code from:

```bash
export DEXPAPRIKA_API_KEY=YOUR_API_KEY
```

The plugin sends it to the hosted server as the `Authorization` header. The server reads it when the session opens, so restart Claude Code after setting or changing it. Without it the plugin connects as before, and `getTokenOHLCV` answers `DP401_API_KEY_REQUIRED`; the agent then falls back to `getPoolOHLCV`.

Get a key at [console.dexpaprika.com](https://console.dexpaprika.com). Plans and current quotas are on [pricing](https://dexpaprika.com/api/pricing), and the [hosted MCP guide](https://docs.dexpaprika.com/ai-integration/hosted-mcp-server#your-own-api-key-for-token-ohlcv) covers the details.

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
