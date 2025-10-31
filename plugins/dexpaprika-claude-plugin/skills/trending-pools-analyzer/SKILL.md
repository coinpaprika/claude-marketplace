# Trending Pools Analyzer Skill

## Description
Automatically analyzes and displays the top performing liquidity pools on any blockchain network ranked by 24-hour trading volume. Helps users discover hot trading opportunities and trending tokens.

## When This Skill Activates

Claude will use this skill when:
- User asks for trending tokens or hot pools
- User wants to see top volume pools on a network
- User searches for popular trading pairs
- User asks "What's trending on [network]?"
- User wants to find the best performing pools
- User asks about market activity or volume leaders

**Examples that trigger this skill:**
- "What are the trending tokens on Solana?"
- "Show me the top pools by volume on Base"
- "What's hot right now on Ethereum?"
- "Which pools are getting the most trading action?"
- "Show me trending on BSC"
- "What pools have the highest volume today?"
- "Which tokens are moving the most volume?"

## How It Works

When activated, this skill identifies and analyzes trending pools:

### Stage 1: Input Validation
- Extract network from user input
- Normalize network name (e.g., "Ethereum" → "ethereum", "Solana" → "solana")
- Call `getCapabilities()` to load network synonyms
- Determine how many pools to display (default: 10, max: 20)

### Stage 2: Pool Discovery
Using DexPaprika MCP tools:
1. Call `getNetworkPools(network, order_by=volume_usd, sort=desc, limit=N)` - Get top pools by volume
2. For each pool, retrieve:
   - Pool address and DEX name
   - Trading pair (Token A / Token B)
   - 24h volume (USD)
   - Current price
   - 24h transactions
   - Liquidity metrics

### Stage 3: Analysis & Formatting

Analyze trending patterns:
- Volume strength relative to historical average
- Recent momentum indicators
- Pair composition (stable/volatile)
- Concentration of volume

Output format:
```
TOP TRENDING POOLS - [Network Name]
═══════════════════════════════════════════════════════════

Rank | Pool Pair | DEX | 24h Volume | Price | TX Count
─────────────────────────────────────────────────────────────
#1   | Token/USDC | Orca | $2.5M | $... | 1,245
#2   | Token/SOL  | Meteora | $1.8M | $... | 892
...

Data from: DexPaprika | [timestamp] | [N] pools analyzed
```

## Tools Available

You have access to:
- `getNetworkPools(network, order_by, sort, limit)` - Get top pools ranked by volume
- `getPoolDetails(network, pool_address)` - Get detailed pool metrics
- `getPoolTransactions(network, pool_address)` - Analyze trading activity
- `getTokenDetails(network, address)` - Get token information
- `getCapabilities()` - Get network synonyms and validation rules
- `getNetworks()` - List supported blockchains

## Important Guidelines

1. **Volume-Focused Analysis**
   - Rank pools primarily by 24h trading volume
   - This indicates genuine trading activity
   - Avoid low-liquidity or wash-traded pools when possible

2. **Network Normalization**
   - Always call `getCapabilities()` first
   - User says "Base Mainnet" → normalize to "base"
   - User says "Solana Devnet" → clarify or normalize to "solana"

3. **Pool Quality Assessment**
   - Show liquidity alongside volume
   - Flag extremely low liquidity with high volume (wash trading warning)
   - Highlight stable pairs vs. volatile token pairs
   - Note pool age if very new (<7 days)

4. **Presentation**
   - Display top 10 by default
   - Allow user to request more (up to 20)
   - Show clear ranking numbers
   - Highlight the top 3 pools
   - Include DEX name for execution clarity

5. **Context Clues**
   - Identify common themes in trending pools
   - Example: "Current trend: Solana meme tokens dominating volume"
   - Note if specific tokens appear in multiple high-volume pools

6. **Actionability**
   - Each pool listed should be ready for analysis
   - Include pool addresses for easy security/technical checks
   - Suggest next steps (analyze security, check charts)
   - Link to related skills

7. **Error Handling**
   - Network not supported → list available networks
   - No pools found → explain possible reasons
   - Low activity → explain market conditions
   - API issues → graceful degradation with available data

## Example Scenarios

### Scenario 1: Top Pools on Solana
User: "What's trending on Solana?"

Response:
```
TOP TRENDING POOLS - Solana (24-Hour Rankings)
═══════════════════════════════════════════════════════════

Rank | Pool Pair              | DEX      | 24h Volume  | Price      | TX Count
─────────────────────────────────────────────────────────────────────────────
#1   | BONK/SOL               | Raydium  | $28.5M      | $0.00045   | 12,543
#2   | SOL/USDC               | Orca     | $24.2M      | $152.45    | 8,921
#3   | JitoSOL/SOL            | Meteora  | $18.9M      | $153.20    | 6,245
#4   | MARINADE/SOL           | Orca     | $15.3M      | $2.85      | 4,123
#5   | PYTH/USDC              | Raydium  | $12.8M      | $1.45      | 3,891

⭐ Current Trend: Solana ecosystem tokens leading activity
- BONK dominance continues with highest volume
- SOL/USDC pair shows institutional interest
- Liquid staking derivatives gaining traction

Want to dive deeper?
→ Use Token Security Analyzer for any token
→ Use Technical Analyzer for chart patterns
→ Check prices with Batch Price Lookup

Data from: DexPaprika | 2025-10-31 14:30 UTC | 5 pools shown
```

### Scenario 2: More Pools Requested
User: "Show me top 15 on Base"

Response:
```
TOP TRENDING POOLS - Base Mainnet (24-Hour Rankings)
═══════════════════════════════════════════════════════════

Rank | Pool Pair              | DEX        | 24h Volume  | Price      | TX Count
─────────────────────────────────────────────────────────────────────────────
#1   | ETH/USDC               | Uniswap v3 | $45.2M      | $2,845     | 23,456
#2   | cbETH/USDC             | Orca       | $12.3M      | $2,950     | 5,123
#3   | AERODROME/USDC         | Aerodrome  | $8.5M       | $0.18      | 3,245
... [remaining 12 pools]
#15  | USDBC/USDC             | Curve      | $0.8M       | $1.00      | 234

⭐ Current Trend: ETH ecosystem dominance on Base
- Major institutional volume on core ETH/USDC pair
- Liquid staking tokens (cbETH) showing strong activity
- Aerodrome DEX token rising in volume rankings

Data from: DexPaprika | 2025-10-31 14:30 UTC | 15 pools shown
```

### Scenario 3: Specific Pair Volume Check
User: "How's SOL/USDC performing? Is it in the trending list?"

Response:
```
SOL/USDC POOL ANALYSIS - Solana
═══════════════════════════════════════════════════════════

Pool Ranking: #2 (Top performer)

Pair Details:
  Base Token: Solana (SOL)
  Quote Token: USD Coin (USDC)
  DEXes: Orca (main), Raydium (secondary)

Volume Metrics (24h):
  Total Volume: $24.2M
  Transaction Count: 8,921 trades
  Average Trade Size: $2,715

Price Action:
  Current: $152.45
  24h High: $154.20 (+1.1%)
  24h Low: $148.90 (-2.3%)
  Change: +2.3% (bullish)

Liquidity:
  Pool Depth: $8.5M
  Slippage on $100k trade: ~0.12% (healthy)

Status: ✓ Excellent liquidity and volume
This is a primary trading pair with strong institutional interest

Next Steps:
→ Check technical chart with Technical Analyzer
→ Monitor security with Token Security Analyzer
→ Track price changes with Batch Price Lookup

Data from: DexPaprika | 2025-10-31 14:30 UTC
```

### Scenario 4: Network Not Specified
User: "Show me trending pools"

Response:
```
⚠️ NETWORK NOT SPECIFIED

Which blockchain would you like to analyze?

Supported Networks:
  • Solana (most active, 50K+ daily pools)
  • Ethereum (largest liquidity, 30K+ daily pools)
  • Base (fastest growing, 15K+ daily pools)
  • Polygon (high volume, 20K+ daily pools)
  • Arbitrum (institutional focus, 12K+ daily pools)
  • BSC (high volume, 25K+ daily pools)
  ... and more

Example: "Show me trending on Solana"
Or: "Top 10 pools on Ethereum"
```

## Context Integration

This skill works best when:
- Combined with Token Security Analyzer to vet trending tokens for scams
- Combined with Technical Analyzer to analyze price charts of hot pools
- Combined with Batch Price Lookup for quick price checks
- Used for market reconnaissance and opportunity hunting
- Referenced when users want to understand current market activity

## Limitations

This skill provides:
- ✓ Top pools ranked by volume
- ✓ Current trading activity metrics
- ✓ Pool pair composition
- ✓ DEX location information
- ✗ Detailed technical analysis (use Technical Analyzer)
- ✗ Security assessment (use Token Security Analyzer)
- ✗ Historical volume trends (limited to 24h)
- ✗ Fundamental token analysis (use Crypto Market Search)

## Success Criteria

A successful skill invocation:
1. Validates and normalizes network input
2. Retrieves accurate top pool rankings
3. Displays pools with clear volume metrics
4. Identifies current market trends
5. Flags low-liquidity or suspicious patterns
6. Provides contextual insights about trending activity
7. Handles errors gracefully with suggestions
8. Suggests related skills for deeper analysis
9. Never provides investment recommendations
10. Always includes data timestamp and pool count
