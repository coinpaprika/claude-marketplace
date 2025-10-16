---
name: find-best-token
description: Find the best performing legitimate (non-scam) token on a specified blockchain network
---

Find the best performing, legitimate token on the specified blockchain network, excluding scams, honeypots, and stablecoins.

**Available User Input**:
- Network (e.g., "ethereum", "bsc", "base", "solana", "polygon", "arbitrum")
- Optional: number of top candidates to analyze (default: 3)

**Instructions**:
1. If user didn't specify network, ask: "Which blockchain network would you like to analyze? (e.g., BSC, Ethereum, Base, Solana)"
2. Normalize network name using getCapabilities synonyms
3. Execute the optimized workflow:
   - Call getNetworkPools(network, order_by=volume_usd, limit=30)
   - Filter out stablecoins (USDT, USDC, BUSD, DAI, FDUSD, etc.)
   - FIRST PASS: Exclude tokens with >100% 24h gains, <5K transactions, <$100K liquidity
   - For remaining top 5-7 candidates:
     - getTokenDetails for metrics
     - getPoolTransactions for trading patterns
     - Calculate buy/sell ratios
   - SECURITY FILTER: Exclude honeypots (buy/sell ratio >2:1 or <0.5:1), rug pull risks (liquidity ratio >20:1)
   - Rank by 24h performance
4. Return top 3 legitimate tokens with comparative analysis

**Output Format**: Use comparative format showing:
- Top 3 tokens with performance %, price, volume, liquidity, risk level
- Security assessment for each
- List of excluded scam tokens with red flags
- Clear #1 recommendation
