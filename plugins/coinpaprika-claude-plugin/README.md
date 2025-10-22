# CoinPaprika Plugin for Claude Code

Access comprehensive cryptocurrency market data for 8000+ cryptocurrencies directly from Claude Code using the CoinPaprika API.

## 🚀 Features

- **Real-time Market Data**: Live prices, market caps, and trading volumes for all cryptocurrencies
- **Historical Analysis**: Access historical price data (OHLCV) for technical analysis
- **Global Market Overview**: Track total market cap, Bitcoin dominance, and market trends
- **Comprehensive Coin Data**: Detailed information including supply metrics, social stats, and events
- **Exchange Information**: Data on 300+ exchanges and their trading pairs
- **Search & Discovery**: Find coins by name, symbol, or category
- **Price Conversion**: Convert between cryptocurrencies and fiat currencies

## 📦 Installation

The plugin is part of the coinpaprika-plugins marketplace.

```bash
# Add the marketplace (if not already added)
claude plugin marketplace add coinpaprika/claude-marketplace

# Install the plugin
claude plugin install coinpaprika-market-data
```

## 🎯 Quick Start

### Slash Commands

Use these slash commands to quickly access common features:

- `/coinpaprika-market-data:intro` - Overview of plugin capabilities
- `/coinpaprika-market-data:top-coins` - Show top cryptocurrencies by market cap
- `/coinpaprika-market-data:coin-info` - Get detailed coin information
- `/coinpaprika-market-data:market-overview` - Global market statistics
- `/coinpaprika-market-data:search` - Search for cryptocurrencies

### Example Usage

```
# Get market overview
"Show me the global cryptocurrency market overview"

# Check Bitcoin price
"What's the current price of Bitcoin?"

# Analyze a specific coin
"Analyze Ethereum in detail"

# Find top performers
"Show me the top 20 cryptocurrencies by market cap"

# Search for coins
"Find all DeFi related coins"

# Historical data
"Show me Bitcoin's price history for the last 30 days"
```

## 🤖 Crypto Analyst Agent

The plugin includes a specialized crypto analyst agent for deep market analysis:

```
"Analyze Solana's market performance and risk level"
"Compare Bitcoin and Ethereum price trends"
"What are the fundamentals of Cardano?"
```

The agent provides:
- Technical analysis (price trends, support/resistance)
- Fundamental analysis (tokenomics, adoption, development)
- Risk assessment and scoring
- Comparative analysis with peers
- Market context and insights

## 🔧 Available MCP Tools

### Market Data
- `getGlobalMarketOverview` - Global market statistics
- `getTickers` - Market data for all active coins
- `getTicker` - Market data for specific coin

### Coin Information
- `getCoins` - List all available cryptocurrencies
- `getCoinById` - Detailed cryptocurrency information
- `getCoinEvents` - Important events for a cryptocurrency
- `getCoinTwitter` - Social media metrics

### Historical Data
- `getHistoricalTicks` - Historical price data (OHLCV)

### Search & Discovery
- `searchCoins` - Find coins by name, symbol, or keyword
- `getTags` - Browse coins by categories

### Exchanges
- `getExchanges` - List all cryptocurrency exchanges
- `getExchangeById` - Detailed exchange information
- `getExchangeMarkets` - Trading pairs on specific exchanges

### Utilities
- `getPriceConverter` - Convert between cryptocurrencies and fiat

## 📊 Use Cases

### Portfolio Tracking
```
"What's the current price of BTC, ETH, and SOL?"
"Show me the 24h price change for my watchlist"
```

### Market Research
```
"Find the top DeFi tokens by market cap"
"What are the top gainers in the last 24 hours?"
"Show me upcoming events for Polkadot"
```

### Technical Analysis
```
"Show me Bitcoin's price history for the last 7 days"
"What are the support and resistance levels for Ethereum?"
"Analyze the volume trends for BNB"
```

### Fundamental Analysis
```
"What is the circulating supply of XRP?"
"How many exchanges is Chainlink listed on?"
"What's the all-time high for Dogecoin?"
```

## ⚙️ Configuration

The plugin connects to CoinPaprika's hosted MCP server:
- **URL**: `https://mcp.coinpaprika.com/sse`
- **Type**: Server-Sent Events (SSE)
- **Authentication**: None required

## 📝 Important Notes

### Coin ID Format
CoinPaprika uses specific coin IDs (not just symbols):
- ✅ Correct: `btc-bitcoin`, `eth-ethereum`
- ❌ Incorrect: `bitcoin`, `BTC`, `ethereum`

**Always use `searchCoins` first if you're unsure about the coin ID.**

### Rate Limiting
The CoinPaprika API has rate limits:
- Free tier: ~10,000 requests/day
- Response caching recommended for frequently accessed data
- Use batch endpoints (like `getTickers`) when possible

### Data Freshness
- Ticker data: Updated every 5 minutes
- Historical data: Available in various intervals (1h, 24h, 7d, 30d, 1y)
- Events and social data: Updated periodically

## 🐛 Troubleshooting

### Common Issues

**"Coin not found" error**
- Use `searchCoins` to find the correct coin ID
- Verify spelling and format (lowercase-with-dashes)

**Rate limit exceeded**
- Wait a few minutes before retrying
- Reduce number of API calls
- Cache frequently accessed data

**No data returned**
- Coin might be inactive or delisted
- Check if coin ID is correct
- Some newer coins might have limited data

### Getting Help

1. Use `/coinpaprika-market-data:intro` for quick reference
2. Check the [CoinPaprika API documentation](https://api.coinpaprika.com)
3. Report issues on the [GitHub repository](https://github.com/coinpaprika/claude-marketplace)

## 🔗 Resources

- **Website**: [coinpaprika.com](https://coinpaprika.com)
- **API Documentation**: [api.coinpaprika.com](https://api.coinpaprika.com)
- **GitHub**: [github.com/coinpaprika](https://github.com/coinpaprika)
- **Support**: Contact CoinPaprika team for data-related questions

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve the plugin.

---

**Disclaimer**: This plugin provides market data for informational purposes only. It is not financial advice. Always do your own research before making investment decisions. Cryptocurrency investments carry significant risk.
