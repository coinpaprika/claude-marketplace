---
description: Overview of CoinPaprika plugin capabilities
---

# CoinPaprika Plugin - Quick Start Guide

Access comprehensive cryptocurrency market data for 8000+ cryptocurrencies with CoinPaprika.

## 🚀 Getting Started

**IMPORTANT: Always start by calling `getCapabilities`** (if available) to learn about:
- Available workflow patterns
- Common use cases and best practices
- API version and features

## 📊 Core Capabilities

### 1. Market Overview
- **getGlobalMarketOverview**: Get global cryptocurrency market statistics
- **getCoins**: List all available cryptocurrencies (8000+)
- **getTickers**: Get market data for all active coins

### 2. Coin Data & Analytics
- **getCoinById**: Detailed information about a specific cryptocurrency
- **getTicker**: Real-time market data for a specific coin
- **getHistoricalTicks**: Historical price data (OHLCV)
- **getCoinEvents**: Important events for a cryptocurrency
- **getCoinTwitter**: Social media activity and metrics

### 3. Search & Discovery
- **searchCoins**: Find coins by name, symbol, or keyword
- **getTags**: Browse coins by categories/tags
- **getPeople**: Information about people in the crypto space

### 4. Exchanges
- **getExchanges**: List all cryptocurrency exchanges
- **getExchangeById**: Detailed exchange information
- **getExchangeMarkets**: Trading pairs on specific exchanges

### 5. Price Conversion
- **getPriceConverter**: Convert between cryptocurrencies and fiat currencies

## 💡 Recommended Workflows

### Workflow 1: Market Snapshot
```
1. Call getGlobalMarketOverview for overall market stats
2. Call getTickers with limit=20 for top coins
3. Filter by market cap, volume, or price change
```

### Workflow 2: Coin Deep Dive
```
1. Call searchCoins to find coin by name/symbol
2. Call getCoinById for detailed information
3. Call getTicker for current price and market metrics
4. Call getHistoricalTicks for price history
5. Call getCoinEvents for upcoming/recent events
```

### Workflow 3: Price Tracking
```
1. Call getTicker for current price
2. Compare price_change_24h, price_change_7d, price_change_30d
3. Call getHistoricalTicks for detailed historical analysis
```

### Workflow 4: Exchange Analysis
```
1. Call getExchanges to list all exchanges
2. Call getExchangeById for specific exchange details
3. Call getExchangeMarkets to see available trading pairs
```

## ⚠️ Common Pitfalls & Best Practices

### Coin Identification
- **Use coin IDs** not symbols (symbols can be duplicated)
- **Search first**: Use searchCoins to find the correct coin_id
- **Case sensitivity**: IDs are usually lowercase (bitcoin, ethereum, etc.)

### Rate Limiting
- **Respect limits**: CoinPaprika has rate limits for API calls
- **Cache data**: Store frequently accessed data locally
- **Batch requests**: Use getTickers instead of multiple getCoinById calls

### Data Freshness
- **Ticker data**: Updated every 5 minutes
- **Historical data**: Available in various intervals (1h, 24h, 7d, 30d, 1y)
- **Events**: Check regularly for updates

### Error Handling
- **404 errors**: Coin ID not found - verify using searchCoins
- **429 errors**: Rate limit exceeded - implement backoff
- **Empty results**: Coin might be inactive or delisted

## 📝 Quick Examples

```
# Market overview
"Show me global cryptocurrency market statistics"
"What are the top 10 coins by market cap?"

# Coin information
"Get details about Bitcoin"
"What's the current price of Ethereum?"
"Show me historical prices for BTC over the last 30 days"

# Search and discovery
"Find all DeFi related coins"
"Search for coins with 'stable' in the name"
"Show me upcoming events for Cardano"

# Exchange data
"List top cryptocurrency exchanges"
"Show me trading pairs on Binance"
"What's the trading volume on Coinbase?"

# Price conversion
"Convert 1 BTC to USD"
"How much is 100 USD in Ethereum?"
```

## 🛠️ Helper Recipes

1. **Top Gainers/Losers**: `getTickers` + filter by price_change_24h
2. **Market Cap Ranking**: `getTickers` + sort by market_cap
3. **Volume Leaders**: `getTickers` + sort by volume_24h
4. **Price Alerts**: Poll `getTicker` for specific coins
5. **Portfolio Tracking**: `getTickers` for multiple coin_ids

## 🔗 Resources

- API Documentation: https://api.coinpaprika.com
- Website: https://coinpaprika.com
- Support: Contact CoinPaprika for data-related questions

---

**Pro Tip**: Use coin IDs (like 'btc-bitcoin', 'eth-ethereum') instead of symbols for accurate data retrieval!
