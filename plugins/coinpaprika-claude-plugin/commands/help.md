---
description: Complete command reference and help guide
---

# CoinPaprika Plugin - Complete Help Guide

Your one-stop reference for all cryptocurrency market data features.

## 📊 Quick Start Commands

### Market Overview
- `/coinpaprika:overview` - Global crypto market statistics
- `/coinpaprika:top` - Top cryptocurrencies by market cap

### Coin Research
- `/coinpaprika:info` - Detailed coin information
- `/coinpaprika:search` - Find cryptocurrencies by name/symbol

### System
- `/coinpaprika:help` - This help guide
- `/coinpaprika:intro` - Getting started guide

## 🤖 Expert Agent

### @crypto-analyst
Market analysis specialist for comprehensive cryptocurrency research.

**Use for**:
- Deep market analysis and price trends
- Fundamental analysis (tokenomics, adoption)
- Comparative analysis between cryptocurrencies
- Risk assessment and scoring
- Technical indicators and patterns

**Example**:
```
@crypto-analyst Analyze Bitcoin's current market position and outlook
```

## 💬 Natural Language Queries

Just ask! Claude understands natural questions:

**Price Checks**:
- "What's the price of Bitcoin?"
- "Show me Ethereum's current price"
- "How much is Solana worth?"

**Market Research**:
- "Show me the top 20 cryptocurrencies"
- "What's the total crypto market cap?"
- "Find information about Cardano"

**Analysis**:
- "Analyze Bitcoin's price trend"
- "Compare Bitcoin and Ethereum"
- "What are the fundamentals of Polkadot?"

**Historical Data**:
- "Show Bitcoin's price history for last 30 days"
- "How has Ethereum performed this year?"

## 🔧 Available MCP Tools

These tools power the plugin (used automatically):

### Market Data
- `getGlobalMarketOverview` - Total market cap, BTC dominance, volume
- `getTickers` - Market data for all active coins
- `getTicker` - Specific coin market data

### Coin Information
- `getCoins` - List all cryptocurrencies
- `getCoinById` - Detailed coin information
- `getCoinEvents` - Important events timeline
- `getCoinTwitter` - Social media metrics

### Historical Data
- `getHistoricalTicks` - OHLCV price data

### Search & Discovery
- `searchCoins` - Find coins by keyword
- `getTags` - Browse by categories

### Exchanges
- `getExchanges` - List exchanges
- `getExchangeById` - Exchange details
- `getExchangeMarkets` - Trading pairs

### Utilities
- `getPriceConverter` - Currency conversion

## 📖 Command Details

### /coinpaprika:overview
Get global cryptocurrency market statistics including total market cap, Bitcoin dominance, and 24h volume.

**Example**:
```
/coinpaprika:overview
```

### /coinpaprika:top
Show top cryptocurrencies ranked by market capitalization.

**Options**: Specify number (default: 20)

**Example**:
```
/coinpaprika:top
Show me top 50 cryptocurrencies
```

### /coinpaprika:info
Get comprehensive information about a specific cryptocurrency.

**Required**: Coin name or symbol

**Example**:
```
/coinpaprika:info Bitcoin
Tell me about Ethereum
```

### /coinpaprika:search
Search for cryptocurrencies by name, symbol, or keyword.

**Required**: Search query

**Example**:
```
/coinpaprika:search
Search for DeFi coins
Find tokens with "chain" in the name
```

### /coinpaprika:intro
Getting started guide with examples and workflows.

**Example**:
```
/coinpaprika:intro
```

## 🎯 Common Use Cases

### Portfolio Tracking
```
"What's the current price of BTC, ETH, and SOL?"
"Show me 24h change for my watchlist"
```

### Market Research
```
"What are the top DeFi tokens?"
"Show me top gainers in the last 24 hours"
"Find all Layer 1 blockchains"
```

### Fundamental Analysis
```
"What is the circulating supply of XRP?"
"How many exchanges is Chainlink listed on?"
"What's Bitcoin's all-time high?"
```

### Technical Analysis
```
"Show Bitcoin's price history for last 7 days"
"What's the 30-day trend for Ethereum?"
"Analyze volume patterns for BNB"
```

## ⚙️ Important Notes

### Coin ID Format
CoinPaprika uses specific coin IDs (not just symbols):
- ✅ Correct: `btc-bitcoin`, `eth-ethereum`, `ada-cardano`
- ❌ Incorrect: `bitcoin`, `BTC`, `Ethereum`

**Tip**: If unsure, use the search command first!

### Rate Limiting
- Free tier: ~10,000 requests/day
- Response caching recommended
- Batch requests when possible

### Data Freshness
- Ticker data: Updated every 5 minutes
- Historical data: Various intervals available
- Events: Updated periodically

## 🤝 Need DeFi Analytics?

Looking for liquidity pools, DEX trading, or token security analysis?

Try the DexPaprika plugin:
```
/dexpaprika:intro
```

Features:
- 26+ blockchain networks
- DEX pools and liquidity data
- Token security analysis (honeypots, rug pulls)
- On-chain analytics

## 🆘 Troubleshooting

### "Coin not found" error
→ Use `/coinpaprika:search` to find correct coin ID

### Rate limit exceeded
→ Wait a few minutes or reduce number of requests

### No data returned
→ Coin might be inactive/delisted or ID incorrect

### Need help?
→ Run `/coinpaprika:intro` for getting started guide
→ Visit: https://github.com/coinpaprika/claude-marketplace

## 📚 Additional Resources

- **API Documentation**: https://api.coinpaprika.com
- **Website**: https://coinpaprika.com
- **GitHub**: https://github.com/coinpaprika
- **Support**: https://github.com/coinpaprika/claude-marketplace/issues

---

**💡 Pro Tip**: Use the @crypto-analyst agent for comprehensive analysis and research!

**⚠️ Disclaimer**: This plugin provides market data for informational purposes only. Not financial advice. Cryptocurrency investments carry significant risk.
