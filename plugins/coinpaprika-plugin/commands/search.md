---
description: Search for cryptocurrencies by name, symbol, or keyword
---

You are tasked with helping users search for cryptocurrencies using CoinPaprika MCP tools.

## Instructions

1. Use `searchCoins` with the user's query
2. Present results in a clear, actionable format
3. If multiple matches, show top results with key details
4. Provide coin_id for each result for further queries

## Search Capabilities

- Search by name (e.g., "Bitcoin", "Ethereum")
- Search by symbol (e.g., "BTC", "ETH")
- Search by keyword (e.g., "DeFi", "NFT", "Stable")
- Partial matching supported

## Output Format

For multiple results:
```
SEARCH RESULTS FOR: "ethereum"

Found 12 matches:

1. Ethereum (ETH)
   ID: eth-ethereum
   Type: coin
   Rank: #2

2. Ethereum Classic (ETC)
   ID: etc-ethereum-classic
   Type: coin
   Rank: #23

3. Wrapped Ethereum (WETH)
   ID: weth-weth
   Type: token
   Rank: #15

... (showing top 10)

Use coin ID for detailed information:
Example: "Show me details for eth-ethereum"
```

For single/exact match:
```
FOUND: Bitcoin (BTC)
ID: btc-bitcoin
Type: coin
Rank: #1

Would you like to see:
1. Detailed information
2. Current price and market data
3. Historical price data
4. Upcoming events
```

## Error Handling

- No results found: Suggest checking spelling or trying related terms
- Too many results: Show top 10 and suggest being more specific
- Invalid search: Prompt for valid query
