---
description: Show top cryptocurrencies by market cap
---

You are tasked with showing the user the top cryptocurrencies ranked by market capitalization using CoinPaprika MCP tools.

## Instructions

1. Call `getTickers` with appropriate parameters to get top coins by market cap
2. Default to showing top 20 unless user specifies otherwise
3. Present data in a clean, formatted table or list

## Output Format

Present the data showing:
- Rank
- Name & Symbol
- Current Price (USD)
- Market Cap
- 24h Volume
- 24h Price Change (%)
- 7d Price Change (%)

Use compact number formatting:
- Billions: $1.23B
- Millions: $456.78M
- Thousands: $12.34K

Example output format:
```
TOP 20 CRYPTOCURRENCIES BY MARKET CAP

 #  Coin              Price        Market Cap    24h Volume   24h Chg  7d Chg
 1  Bitcoin (BTC)     $45,234.56   $882.5B       $28.4B       +2.34%   +5.67%
 2  Ethereum (ETH)    $3,123.45    $375.2B       $15.8B       -1.23%   +3.45%
...
```

## Additional Features

- Allow filtering by price change (gainers/losers)
- Support custom limits (top 10, 50, 100)
- Option to show additional metrics (circulating supply, all-time high, etc.)
