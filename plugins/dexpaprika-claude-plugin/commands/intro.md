---
description: Overview of DexPaprika plugin capabilities
---

# DexPaprika Plugin - Quick Start Guide

Access comprehensive DeFi data across 26+ blockchain networks with DexPaprika.

## 🚀 Getting Started

**IMPORTANT: Always start by calling `getCapabilities`** to learn about:
- Available workflow patterns
- Network synonyms for user-friendly queries
- Common pitfalls and best practices
- API version and features

```
Call getCapabilities to load onboarding guide
```

## 📊 Core Capabilities

### 1. Network Discovery
- **getNetworks**: List all 26+ supported blockchain networks
- Returns network IDs like `ethereum`, `solana`, `base`, `bsc`, etc.

### 2. DEX & Pool Analytics
- **getNetworkDexes**: Find DEXes on a specific network
- **getNetworkPools**: Get top liquidity pools by volume (PRIMARY pool function)
- **getDexPools**: Filter pools by specific DEX
- **getPoolDetails**: Comprehensive pool data with prices, volume, transactions
- **getPoolOHLCV**: Historical price data for analysis and backtesting
- **getPoolTransactions**: Recent trading activity and liquidity changes

### 3. Token Intelligence
- **getTokenDetails**: Token metadata, price, FDV, liquidity, trading metrics
- **getTokenPools**: Find all pools containing a specific token
- **getTokenMultiPrices**: Batched prices for up to 10 tokens (efficient!)

### 4. Search & Discovery
- **search**: Global search across ALL networks for tokens, pools, DEXes by name/symbol/address

## 🔑 Network Synonyms (User-Friendly)

Use `getCapabilities` to get the latest synonyms. Common examples:
- "Binance Smart Chain" / "BNB Chain" → `bsc`
- "Polygon" → `polygon`
- "Base" → `base`
- "Ethereum" → `ethereum`

**Always normalize user input** using synonyms from `getCapabilities` before making API calls.

## 💡 Recommended Workflows

### Workflow 1: Trending Snapshot
```
1. Call getNetworks
2. Call getNetworkPools(network, order_by=volume_usd, limit=10)
3. Optional: Use fields=pools,page_info for compact response
```

### Workflow 2: Token Drill-Down
```
1. Call search(query="token name or address")
2. Extract network + token_address from results
3. Call getTokenDetails(network, token_address)
4. Call getTokenPools(network, token_address) to see where it trades
```

### Workflow 3: Batched Price Check
```
1. Collect up to 10 token addresses
2. Join into comma-separated string (no spaces)
3. Call getTokenMultiPrices(network, tokens="0xabc...,0xdef...,0x123...")
4. Handle missing tokens gracefully (unpriced tokens are omitted)
```

### Workflow 4: Pool Analysis
```
1. Call getPoolDetails(network, pool_address) for current state
2. Call getPoolOHLCV(network, pool_address, start, interval) for historical data
3. Call getPoolTransactions(network, pool_address) for recent activity
```

## ⚠️ Common Pitfalls & Best Practices

### Multi Prices (getTokenMultiPrices)
- **MAX 10 tokens** per request (enforced by server)
- **Format**: Comma-separated string, no spaces: `"0xabc,0xdef,0x123"`
- **Client-side check**: Pre-validate array length ≤ 10 before calling
- **Server 400**: If you get `DP400_TOO_MANY_TOKENS`, show user-friendly error with hint

### Network Synonyms
- **Always normalize** user phrases like "binance smart chain" → `bsc`
- Use synonyms from `getCapabilities` to avoid 404 errors

### Payload Efficiency
- **Use `fields` parameter** when you only need specific data
- Example: `fields=pools,page_info` returns only those top-level keys
- Reduces bandwidth and improves performance for large datasets

### Error Handling
- **Watch for 400 errors** with structured payloads:
  - `error.code`: Machine-readable error code (e.g., `DP400_TOO_MANY_TOKENS`)
  - `error.message`: Human-readable description
  - `error.hint`: Actionable guidance
  - `error.corrected_example`: Example of correct request
- **Offer one-click retry** when `corrected_example` is provided

### Pool Discovery
- **No global pools function** - always use `getNetworkPools(network)` with specific network
- For trending pools across networks, call `getNetworkPools` for each network separately

### Search Results
- Searches across ALL networks simultaneously
- Results include network context for each match
- Use search as starting point, then drill down with specific tools

## 📝 Quick Examples

```
# Get started
"Call getCapabilities to show me what's available"

# Network discovery
"List all supported networks"
"Show me DEXes on Base blockchain"

# Pool analytics
"Get top 10 pools on Ethereum by volume"
"Show me details for pool 0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640 on ethereum"
"Get historical prices for this pool from 2024-01-01 with 1h interval"

# Token intelligence
"Search for Jupiter token"
"Get details for token JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN on solana"
"Show me all pools containing USDC on Base"
"Get prices for 5 tokens on ethereum: 0xabc...,0xdef...,0x123...,0x456...,0x789..."

# Advanced queries
"Find trending pools on binance smart chain" (auto-normalizes to 'bsc')
"Show recent transactions for this pool"
"Compare prices across multiple networks"
```

## 🛠️ Helper Recipes (Client-Side)

These are patterns you can implement without server changes:

1. **Compact Trending View**: `getNetworkPools` + `fields=pools` + format as table
2. **Token Deep Dive**: `search` → `getTokenDetails` → `getTokenPools` with reorder
3. **Price Monitoring**: `getTokenMultiPrices` every N seconds with retry logic
4. **Pool Performance**: `getPoolDetails` + `getPoolOHLCV` to show current vs historical

## 🔗 Resources

- API Documentation: https://mcp.dexpaprika.com/openapi
- Capabilities Endpoint: https://mcp.dexpaprika.com/api/capabilities
- Support: Contact CoinPaprika for data-related questions

---

**Pro Tip**: Start every session with `getCapabilities` to ensure you have the latest workflows, synonyms, and best practices!

