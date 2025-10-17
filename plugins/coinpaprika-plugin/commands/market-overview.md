---
description: Get global cryptocurrency market overview
---

You are tasked with providing a comprehensive overview of the global cryptocurrency market using CoinPaprika MCP tools.

## Instructions

1. Call `getGlobalMarketOverview` to get global market statistics
2. Call `getTickers` with limit=10 to show top coins
3. Present data in a dashboard-style format

## Required Information

### Global Market Stats
- Total Market Capitalization (USD)
- 24h Trading Volume
- Bitcoin Dominance (%)
- Number of Active Cryptocurrencies
- Number of Active Markets
- Number of Active Exchanges
- Last Updated

### Top Movers
- Top 5 Gainers (24h)
- Top 5 Losers (24h)
- Highest Volume Coins

## Output Format

```
╔═══════════════════════════════════════════════════════════╗
║     GLOBAL CRYPTOCURRENCY MARKET OVERVIEW                 ║
╚═══════════════════════════════════════════════════════════╝

MARKET STATISTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Market Cap:        $2.34T
24h Trading Volume:      $156.8B
Bitcoin Dominance:       48.5%
Active Cryptocurrencies: 8,234
Active Markets:          42,156
Active Exchanges:        347
Last Updated:            2025-10-17 14:30:00 UTC

TOP 10 CRYPTOCURRENCIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 #  Coin         Price        Market Cap   24h Volume  24h Chg
 1  BTC          $45.2K       $882.5B      $28.4B      +2.3%
 2  ETH          $3.1K        $375.2B      $15.8B      -1.2%
 3  USDT         $1.00        $95.6B       $52.3B      +0.0%
 ...

TOP 5 GAINERS (24H)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟢 COIN-A  +45.67%  ($0.1234)
🟢 COIN-B  +32.45%  ($1.5678)
🟢 COIN-C  +28.90%  ($0.0456)
...

TOP 5 LOSERS (24H)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 COIN-X  -23.45%  ($0.0123)
🔴 COIN-Y  -18.90%  ($2.3456)
🔴 COIN-Z  -15.67%  ($0.5678)
...
```

## Additional Options

- Compare with previous day/week
- Show market cap distribution
- Display fear & greed index (if available)
- Trending coins or topics
