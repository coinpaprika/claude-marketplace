# Cryptocurrency Market Search Skill

## Description
Automatically searches for cryptocurrencies, provides market overviews, shows top cryptocurrencies by market cap, and delivers detailed project information. Helps users discover, research, and understand cryptocurrency projects and market conditions.

## When This Skill Activates

Claude will use this skill when:
- User searches for a specific cryptocurrency
- User asks for market overview or global crypto market data
- User wants to see top cryptocurrencies
- User asks about Bitcoin, Ethereum, or any crypto by name
- User wants project fundamentals or market cap info
- User asks market-related questions like "What's dominating the market?"

**Examples that trigger this skill:**
- "Search for Bitcoin alternatives"
- "What are the top 10 cryptocurrencies by market cap?"
- "Tell me about Ethereum"
- "Give me a market overview"
- "Which cryptocurrencies are trending?"
- "Search for DeFi tokens"
- "What's the global crypto market cap?"
- "Find layer 2 blockchain projects"

## How It Works

When activated, this skill performs cryptocurrency research:

### Stage 1: Input Validation
- Determine user intent (search vs. overview vs. top list vs. specific info)
- Extract search keywords or cryptocurrency name
- Call `getCapabilities()` to understand available data
- Validate search parameters

### Stage 2: Data Retrieval
Using CoinPaprika MCP tools:
1. **For Search**: Call `search(query)` - Find cryptos by name, symbol, or keyword
2. **For Top List**: Call `getTop(limit)` - Get top cryptos by market cap
3. **For Overview**: Call `getOverview()` - Get global market data
4. **For Details**: Call `getInfo(crypto_id)` - Get detailed project info

### Stage 3: Analysis & Formatting

Compile comprehensive market data:
- Project overview and use case
- Market cap and ranking
- Price and 24h/7d trends
- Supply and circulation metrics
- Links to official sources
- Comparative market position

Output format:
```
CRYPTOCURRENCY MARKET DATA
═══════════════════════════════════════════════════════════

[Token Name] ([Symbol])
─────────────────────────────────────────────────────────────
Market Cap: $X.XB (#X globally)
Price: $X.XX | 24h Change: +X% | 7d Change: +X%
Circulating Supply: X.XXB tokens
...
```

## Tools Available

You have access to:
- `search(query)` - Search for cryptocurrencies by name, symbol, or keyword
- `getInfo(crypto_id)` - Get detailed information about a specific cryptocurrency
- `getTop(limit)` - Get top cryptocurrencies ranked by market cap (default: 10)
- `getOverview()` - Get global cryptocurrency market overview
- `getHealth()` - Verify plugin installation and data health

## Important Guidelines

1. **Search Intent Recognition**
   - "Bitcoin alternatives" → search for similar projects
   - "DeFi tokens" → search by category
   - "Layer 2 solutions" → search by use case
   - "Top 10 by market cap" → use getTop()
   - "Global market data" → use getOverview()

2. **Search Scope**
   - Search is broad (name, symbol, keywords)
   - Always show top 5 results for search
   - Rank by market cap relevance
   - Include brief description for each result

3. **Detailed Information**
   - When requesting specific crypto info, show:
     - Market cap rank and value
     - Current price (24h, 7d, 30d change)
     - Circulating and total supply
     - Official website and social links
     - Use case and technology description
     - Market dominance percentage (for major cryptos)

4. **Market Overview Context**
   - When showing top list, include market context
   - Example: "Bitcoin dominance at 52%"
   - Show total crypto market cap
   - Note market trends (bullish/bearish indicators)
   - Highlight unusual movements

5. **Supply Metrics**
   - Clearly distinguish between:
     - Circulating supply (currently tradable)
     - Total supply (all issued)
     - Max supply (hard cap)
   - Flag potential inflation concerns
   - Note staking or vesting schedules

6. **Price Movement Context**
   - Show changes across multiple timeframes (24h, 7d, 30d)
   - Highlight unusual volatility
   - Compare individual crypto movement to market average
   - Note all-time highs and lows (if significantly different)

7. **Error Handling**
   - Crypto not found → suggest similar names
   - Typo detected → offer corrections
   - No data available → explain why (delisted, new, etc.)
   - Search too broad → suggest narrowing terms

## Example Scenarios

### Scenario 1: Specific Crypto Information
User: "Tell me about Ethereum"

Response:
```
CRYPTOCURRENCY PROFILE: Ethereum (ETH)
═══════════════════════════════════════════════════════════

Market Position:
  Global Rank: #2
  Market Cap: $210B (ranked 2nd)
  Price: $2,845.32

Price Movement:
  24h Change: +2.5% ↗
  7d Change: +8.3% ↗
  30d Change: +12.1% ↗
  All-time High: $4,891.70 (Nov 2021) - Currently 42% below ATH

Supply Metrics:
  Circulating Supply: 120.5M ETH
  Total Supply: 120.5M ETH (all issued)
  Max Supply: Unlimited
  Market Dominance: 13.2% of total crypto market

Technology:
  Type: Layer 1 Blockchain (Smart Contract Platform)
  Consensus: Proof of Stake (since Sept 2022)
  Annual Inflation: ~0% (post-merge)

Use Case:
  Ethereum is the leading smart contract platform enabling:
  • DeFi (Decentralized Finance)
  • NFTs and digital assets
  • Decentralized applications (dApps)
  • Staking and tokenomics

Key Metrics:
  ✓ Second largest by market cap
  ✓ Highest developer activity
  ✓ Largest DeFi ecosystem
  ✓ Strong institutional adoption
  ⚠️ High gas fees during congestion
  ⚠️ Competition from Layer 2s and alt-L1s

Links:
  Official: ethereum.org
  Block Explorer: etherscan.io
  Community: Discord, Twitter: @ethereum

Related Analysis:
→ Use Trending Pools Analyzer to see ETH trading activity
→ Use Technical Analyzer for ETH price chart analysis
→ Use Batch Price Lookup for current ETH prices

Data from: CoinPaprika | 2025-10-31 14:30 UTC
```

### Scenario 2: Search Query
User: "Search for Bitcoin alternatives"

Response:
```
CRYPTOCURRENCY SEARCH: "Bitcoin alternatives"
═══════════════════════════════════════════════════════════

Top Results:
─────────────────────────────────────────────────────────────

1. Litecoin (LTC)
   Rank: #20 | Market Cap: $18.5B | Price: $145.20 (+2.1% 24h)
   Description: Peer-to-peer digital currency, faster blocks than Bitcoin

2. Bitcoin Cash (BCH)
   Rank: #28 | Market Cap: $12.3B | Price: $485.90 (-1.5% 24h)
   Description: Bitcoin fork with larger block size for payments

3. Dogecoin (DOGE)
   Rank: #11 | Market Cap: $38.2B | Price: $0.28 (+5.3% 24h)
   Description: Meme coin turned major cryptocurrency, fast payments

4. Monero (XMR)
   Rank: #31 | Market Cap: $3.8B | Price: $185.40 (+8.2% 24h)
   Description: Privacy-focused cryptocurrency with ring signatures

5. Zcash (ZEC)
   Rank: #90 | Market Cap: $810M | Price: $35.20 (-3.2% 24h)
   Description: Privacy-preserving cryptocurrency with optional anonymity

Search Summary:
  • Bitcoin alternatives range from $810M to $38B market cap
  • Privacy coins (Monero, Zcash) offer anonymity features
  • Litecoin remains most established Bitcoin alternative
  • Payment-focused coins dominating this category

Want to dive deeper?
→ Select a specific crypto for detailed analysis
→ Use DeFi-specific search for smart contract alternatives
→ Check technical charts for price analysis

Data from: CoinPaprika | 2025-10-31 14:30 UTC | 5 results shown
```

### Scenario 3: Top Cryptocurrencies
User: "Show me the top 15 cryptos by market cap"

Response:
```
TOP 15 CRYPTOCURRENCIES BY MARKET CAP
═══════════════════════════════════════════════════════════

Rank | Name (Symbol)           | Market Cap | Price    | 24h Change
─────────────────────────────────────────────────────────────────────
#1   | Bitcoin (BTC)           | $850B      | $42,500  | +3.2%
#2   | Ethereum (ETH)          | $210B      | $2,845   | +2.5%
#3   | Binance Coin (BNB)      | $78B       | $625     | +1.8%
#4   | XRP (XRP)               | $45B       | $2.85    | +5.1%
#5   | Cardano (ADA)           | $32B       | $0.95    | -0.5%
#6   | Solana (SOL)            | $67B       | $152.45  | +4.2%
#7   | Polkadot (DOT)          | $28B       | $7.50    | +2.1%
#8   | Dogecoin (DOGE)         | $38B       | $0.28    | +5.3%
#9   | Polygon (MATIC)         | $12B       | $0.85    | -1.2%
#10  | Litecoin (LTC)          | $18.5B     | $145.20  | +2.1%
#11  | Chainlink (LINK)        | $15B       | $28.50   | +3.7%
#12  | Uniswap (UNI)           | $11B       | $9.25    | +1.5%
#13  | Cosmos (ATOM)           | $8.5B      | $8.20    | -0.8%
#14  | Avalanche (AVAX)        | $14B       | $38.90   | +2.9%
#15  | Wrapped Bitcoin (WBTC)  | $11B       | $42,480  | +3.1%

Market Context:
  Total Crypto Market Cap: $2.15T
  Bitcoin Dominance: 39.5% (healthy concentration)
  Ethereum Dominance: 9.8% (stable)
  Top 15 Control: 85% of total market cap

Market Sentiment: BULLISH
  • 11 out of 15 showing positive 24h movement
  • Average movement: +2.3% (positive bias)
  • High volatility assets leading gains

Top Gainers Today:
  🔝 Dogecoin (DOGE): +5.3%
  🔝 XRP: +5.1%
  🔝 Chainlink (LINK): +3.7%

Want deeper analysis?
→ Select a specific crypto for full profile
→ Use DeFi-specific search for yield opportunities
→ Check technical charts for trading signals

Data from: CoinPaprika | 2025-10-31 14:30 UTC
```

### Scenario 4: Global Market Overview
User: "Give me the crypto market overview"

Response:
```
GLOBAL CRYPTOCURRENCY MARKET OVERVIEW
═══════════════════════════════════════════════════════════

Market Size:
  Total Market Cap: $2.15 Trillion
  24h Volume: $125 Billion
  Bitcoin Dominance: 39.5%
  Ethereum Dominance: 9.8%

Market Sentiment:
  Status: BULLISH 📈
  • Total market cap +12.3% (30 days)
  • Trading volume above average
  • Bitcoin above 200-week moving average

Top Asset Classes by Market Cap:
  Layer 1 Blockchains: $580B (27% of market)
  DeFi Tokens: $85B (4% of market)
  Stablecoins: $145B (7% of market)
  Payment Tokens: $250B (12% of market)
  Meme Coins: $95B (4% of market)

Price Movements (24h):
  Gainers: 62% of cryptocurrencies up (bullish)
  Losers: 38% of cryptocurrencies down
  Average Change: +2.1%

Major Catalysts:
  ✓ Federal Reserve pause on rate hikes
  ✓ Institutional adoption increasing
  ✓ Spot Bitcoin ETF approval (US)
  ⚠️ Regulatory scrutiny in Asia
  ⚠️ AI token sector consolidation

Key Metrics:
  Fear & Greed Index: 65/100 (Greed)
  Volatility: Moderate (ATR improving)
  Whale Activity: Accumulating ↗

Recommendations:
→ Use Trending Pools Analyzer for DEX volume trends
→ Use Batch Price Lookup for quick price checks
→ Use Technical Analyzer for trend analysis

Data from: CoinPaprika | 2025-10-31 14:30 UTC
```

### Scenario 5: Typo/Not Found
User: "Tell me about Ethareum"

Response:
```
⚠️ CRYPTOCURRENCY NOT FOUND

Search Term: "Ethareum"

Did you mean: Ethereum (ETH)?
  → Market Cap Rank: #2
  → Price: $2,845.32
  → 24h Change: +2.5%

Other similar names found:
  • Ethereal (ETC) - Ethereum Classic (Rank #25)
  • Aether (ATH) - Small project (Rank #1,250+)

Suggestions:
  1. Try searching again with correct spelling
  2. Use symbol instead (ETH for Ethereum)
  3. Search for project category (e.g., "smart contract platforms")
  4. Browse top cryptos by market cap

Would you like detailed info on Ethereum instead?
```

## Context Integration

This skill works best when:
- Used to research projects before trading (fundamental analysis)
- Combined with DeFi tools for ecosystem analysis
- Referenced for market cap context and project positioning
- Used for discovering new projects and opportunities
- Applied in due diligence before DeFi interactions

## Limitations

This skill provides:
- ✓ Comprehensive cryptocurrency information
- ✓ Market cap rankings and global metrics
- ✓ Project fundamentals and use cases
- ✓ Supply and inflation metrics
- ✓ Market sentiment and trends
- ✗ Technical price analysis (use Technical Analyzer)
- ✗ DEX pool activity (use Trending Pools Analyzer)
- ✗ Smart contract security (use Token Security Analyzer)
- ✗ On-chain activity metrics (requires blockchain analysis)

## Success Criteria

A successful skill invocation:
1. Validates and normalizes search input
2. Retrieves accurate market data
3. Displays information clearly with context
4. Handles search results with multiple options
5. Provides comparative market position
6. Flags unusual market movements
7. Explains supply and tokenomics clearly
8. Handles errors gracefully with suggestions
9. Suggests related skills for deeper analysis
10. Never provides investment recommendations
11. Always includes data timestamp
12. Distinguishes between price and market cap metrics
