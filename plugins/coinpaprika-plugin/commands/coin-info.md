---
description: Get detailed information about a specific cryptocurrency
---

You are tasked with providing comprehensive information about a specific cryptocurrency using CoinPaprika MCP tools.

## Instructions

1. If user provides a symbol/name, use `searchCoins` to find the correct coin_id
2. Call `getCoinById` to get detailed coin information
3. Call `getTicker` to get current market data
4. Optionally call `getCoinEvents` for upcoming events
5. Optionally call `getCoinTwitter` for social metrics

## Required Information to Display

### Basic Info
- Name and Symbol
- Coin ID
- Type (coin/token)
- Description (if available)
- Official website and whitepaper links

### Market Data
- Current Price (USD)
- Market Cap & Rank
- 24h Trading Volume
- Circulating Supply / Total Supply / Max Supply
- All-Time High/Low
- Price Changes (24h, 7d, 30d, 1y)

### Additional Metrics
- Number of Markets
- Number of Exchanges
- First Historical Data Date
- Last Updated

### Social & Events (if requested)
- Twitter followers, statuses
- Reddit subscribers
- Upcoming/Recent events

## Output Format

Present data in a structured, easy-to-read format:

```
═══════════════════════════════════════════════════
BITCOIN (BTC) - Cryptocurrency
═══════════════════════════════════════════════════

OVERVIEW
--------
Description: [Brief description]
Type: Coin
Website: https://bitcoin.org
Whitepaper: [link]

MARKET DATA
-----------
Price:          $45,234.56 USD
Market Cap:     $882.5B (#1)
24h Volume:     $28.4B
Circulating:    19.5M BTC
Total Supply:   19.5M BTC
Max Supply:     21M BTC

PRICE PERFORMANCE
-----------------
24h Change:     +2.34% ($1,034.50)
7d Change:      +5.67%
30d Change:     +12.34%
1y Change:      +156.78%
All-Time High:  $69,000.00 (Nov 2021)
All-Time Low:   $67.81 (Jul 2013)

TRADING
-------
Markets:        247 active markets
Exchanges:      89 exchanges
First Data:     2013-04-28
Last Updated:   2025-10-17 14:23:15 UTC
```

## Error Handling

- If coin not found, suggest similar coins from search results
- If data is missing, note it clearly
- Validate coin_id format before making API calls
