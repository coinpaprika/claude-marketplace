---
description: Show top pools by 24h volume on a blockchain network
---

# Top Trending Pools

Show the top liquidity pools ranked by 24-hour trading volume on the specified blockchain network.

**Available User Input**:
- Network (e.g., "ethereum", "base", "bsc", "solana", "polygon", "arbitrum")
- Optional: number of pools to display (default: 10)

**Instructions**:
1. If user didn't specify network, ask: "Which blockchain network? (e.g., Ethereum, Base, BSC, Solana)"
2. Normalize network name using getCapabilities synonyms
3. Call `getNetworkPools(network, order_by=volume_usd, sort=desc, limit=10)`
4. Display pools with key metrics: volume, price, transactions, liquidity

**Output Format**: Display as a formatted table or list showing:
- Pool pair names
- 24h volume (USD)
- Current price
- 24h transaction count
- DEX name
