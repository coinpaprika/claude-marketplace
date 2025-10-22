---
description: Complete command reference and help guide
---

# DexPaprika Plugin - Complete Help Guide

Your one-stop reference for all DeFi analytics features.

## 📊 Quick Start Commands

### Network & Discovery
- `/dexpaprika-defi-tools:networks` - List all 26+ supported blockchains
- `/dexpaprika-defi-tools:intro` - Getting started guide

### Pool Analytics
- `/dexpaprika-defi-tools:trending` - Top pools by 24h volume

### Token Analysis
- `/dexpaprika-defi-tools:prices` - Batch token pricing (up to 10)
- `/dexpaprika-defi-tools:analyze` - Security analysis (honeypot detection)

### System
- `/dexpaprika-defi-tools:help` - This help guide

## 🤖 Expert Agent

### @defi-data-analyst
DeFi security specialist for fraud detection and risk assessment.

**Use for**:
- Honeypot detection (buy-only tokens)
- Rug pull risk assessment
- Market manipulation identification
- Scam pattern recognition
- Token security analysis

**Example**:
```
@defi-data-analyst Analyze this token for security risks: 0x123... on ethereum
```

## 💬 Natural Language Queries

Just ask! Claude understands natural questions:

**Pool Discovery**:
- "Show me top pools on Ethereum"
- "What are the highest volume pools on Base?"
- "Find trending pools on Binance Smart Chain"

**Token Analysis**:
- "Get price for USDC on Solana"
- "Show me all pools containing WETH"
- "Is this token a honeypot: 0x..."

**Network Info**:
- "List all supported networks"
- "What DEXes are on Polygon?"
- "Show me Arbitrum pools"

**Security**:
- "Analyze this token for scams: 0x..."
- "Check if this is a rug pull"
- "Is this pool safe?"

## 🔧 Available MCP Tools

These tools power the plugin (used automatically):

### Discovery
- `getNetworks` - List 26+ supported blockchains
- `getNetworkDexes` - DEXes on specific network
- `search` - Global search across all networks

### Pool Analytics
- `getNetworkPools` - Top pools by volume on network
- `getDexPools` - Pools filtered by DEX
- `getPoolDetails` - Comprehensive pool data
- `getPoolOHLCV` - Historical price data (OHLCV)
- `getPoolTransactions` - Recent trading activity

### Token Intelligence
- `getTokenDetails` - Token metadata, price, liquidity
- `getTokenPools` - All pools containing token
- `getTokenMultiPrices` - Batch prices (max 10 tokens)

## 📖 Command Details

### /dexpaprika-defi-tools:networks
List all 26+ supported blockchain networks.

**Example**:
```
/dexpaprika-defi-tools:networks
```

### /dexpaprika-defi-tools:trending
Show top liquidity pools by 24-hour trading volume.

**Required**: Network name

**Example**:
```
/dexpaprika-defi-tools:trending
Show me trending pools on Base
Top 20 pools on Ethereum by volume
```

### /dexpaprika-defi-tools:prices
Get batch prices for multiple tokens (max 10 per request).

**Required**: Network and token addresses

**Example**:
```
/dexpaprika-defi-tools:prices
Get prices for USDC, USDT, DAI on Ethereum
```

### /dexpaprika-defi-tools:analyze
Comprehensive security analysis for honeypots, rug pulls, and scams.

**Required**: Token address and network

**Example**:
```
/dexpaprika-defi-tools:analyze
Analyze 0x123... on ethereum for security risks
Is this token safe: 0x456... on bsc
```

### /dexpaprika-defi-tools:intro
Getting started guide with workflows and best practices.

**Example**:
```
/dexpaprika-defi-tools:intro
```

## 🎯 Common Use Cases

### Trending Snapshot
```
"Show me top 10 pools on Ethereum by volume"
"What's trending on Base today?"
"Top pools on Solana"
```

### Token Research
```
"Get details for token 0x... on ethereum"
"Find all pools with USDC on Polygon"
"What's the price of this token?"
```

### Security Analysis
```
"Is this token a honeypot: 0x..."
"Analyze this for rug pull risks"
"Check if this pool is safe"
"Scan for scam patterns"
```

### Historical Analysis
```
"Show price history for this pool"
"Get 7-day OHLCV data"
"Show recent transactions for pool 0x..."
```

## 🌐 Supported Networks

26+ blockchains including:

**Major Networks**:
- Ethereum, Solana, Polygon, Arbitrum, Optimism, Base

**L2s & Sidechains**:
- Arbitrum, Optimism, Base, Polygon, zkSync

**Other Networks**:
- BSC, Avalanche, Fantom, Cronos, and 15+ more

**Full List**: Run `/dexpaprika-defi-tools:networks`

## ⚡ Pro Tips

### Network Normalization
User-friendly names work automatically:
- "Binance Smart Chain" → `bsc`
- "Polygon" → `polygon`
- "Base" → `base`

Claude handles normalization for you!

### Batch Price Queries
Efficiently fetch up to 10 token prices in one request:
```
"Get prices for USDC, USDT, DAI, WETH, and WBTC on Ethereum"
```

### Field Projection
For large datasets, request specific fields for faster responses.

## ⚠️ Important Notes

### Token Addresses
- EVM networks: `0x` hex format (40 characters)
- Solana: Base58 format (32-44 characters)
- Always include full address

### Batch Limits
- **Max 10 tokens** per `getTokenMultiPrices` request
- Claude will automatically split larger requests

### Rate Limiting
- Free tier: ~10,000 requests/day
- Use batching to stay under limit
- Cache frequently accessed data

### Data Freshness
- Pool data: Real-time or near real-time
- Prices: Updated continuously
- Historical data: Various intervals available

## 🔐 Security Features

### Honeypot Detection
Identifies tokens where you can buy but cannot sell:
- Buy/sell transaction ratio analysis
- Trading pattern examination
- Liquidity trap detection

### Rug Pull Assessment
Evaluates risk of liquidity removal:
- Liquidity concentration analysis
- Lock status checking
- Historical liquidity changes

### Market Manipulation
Spots artificial price/volume activity:
- Wash trading detection
- Volume/liquidity ratio analysis
- Price pattern anomalies

## 🤝 Need General Crypto Data?

Looking for market cap rankings, global stats, or CEX data?

Try the CoinPaprika plugin:
```
/coinpaprika-market-data:intro
```

Features:
- 8000+ cryptocurrencies
- Real-time prices and market data
- Historical data and trends
- Exchange information

## 🆘 Troubleshooting

### "Invalid network" error
→ Run `/dexpaprika-defi-tools:networks` for full list
→ Use common names (Claude normalizes automatically)

### "Too many tokens" error
→ Max 10 tokens per batch request
→ Split into multiple requests

### "Token not found" error
→ Verify address format and network
→ Token may not have price data yet

### "Rate limit exceeded"
→ Wait for daily reset (shown in error message)
→ Use batching and caching

### Need help?
→ Run `/dexpaprika-defi-tools:intro` for getting started
→ Visit: https://github.com/coinpaprika/claude-marketplace

## 📚 Additional Resources

- **API Documentation**: https://mcp.dexpaprika.com/openapi
- **Capabilities**: https://mcp.dexpaprika.com/api/capabilities
- **Website**: https://dexpaprika.com
- **Support**: https://github.com/coinpaprika/claude-marketplace/issues

---

**💡 Pro Tip**: Use @defi-data-analyst agent for comprehensive security analysis!

**⚠️ Disclaimer**: This plugin provides DeFi analytics for research purposes only. Not financial advice. Always verify token authenticity and conduct thorough research before trading. DeFi investments carry extremely high risk.
