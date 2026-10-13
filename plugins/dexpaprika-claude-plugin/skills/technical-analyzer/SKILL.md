---
name: technical-analyzer
description: Analyze OHLCV data and API-computed indicators (RSI, EMA, MACD, Bollinger Bands, VWAP) to identify candlestick patterns, support/resistance levels, trend formations, and momentum signals. Activates when users ask about price patterns, chart analysis, or technical signals for any pool across 36 chains.
---

# Technical Analysis Skill

Analyzes OHLCV data across multiple timeframes to identify candlestick patterns, support/resistance levels, trend formations, and key price levels.

## When This Skill Activates

- User asks about price patterns or chart formations
- User mentions: "bullish?", "double top", "support level?", "resistance?"
- User requests technical analysis for a trading pair
- User asks about candlestick patterns, moving averages, or trends

## Data Retrieval

Use DexPaprika MCP tools:

1. `getCapabilities(rationale)` - Load network synonyms for input normalization
2. `getPoolOHLCV(network, pool_address, start, interval, limit)` - Fetch candle data
   - `start` is easiest as an offset from now: `-24h`, `-7d`
   - Intervals: `1m`, `5m`, `10m`, `15m`, `30m`, `1h`, `6h`, `12h`, `24h`
   - Up to 1000 candles per request
   - Fetch 100+ candles for robust pattern detection
   - For a token rather than one pair, `getTokenOHLCV(network, token_address, start, interval, limit)` returns USD candles across all its pools. It needs the user's Dev or Pro key; on `DP401_API_KEY_REQUIRED` or `DP403_PLAN_REQUIRED`, use `getPoolOHLCV` on the token's most liquid pool and say so
3. `getPoolIndicator(network, pool_address, indicator, interval, start, rationale)` - RSI, EMA, MACD, Bollinger Bands or VWAP, computed by the API from the pool's completed candles
   - `indicator`: `rsi`, `ema`, `macd`, `bbands` or `vwap`; always pass `interval`
   - Send only that indicator's parameters: `period` for rsi, ema, bbands and vwap; `fast_period`, `slow_period` and `signal_period` for macd; `std_dev` for bbands. Any other is refused with 400
   - For one USD series across all of a token's pools, `getTokenIndicator(network, token_address, indicator, ...)`. It needs the user's Dev or Pro key; on `DP401_API_KEY_REQUIRED` or `DP403_PLAN_REQUIRED`, use `getPoolIndicator` on the token's most liquid pool and say so
4. `getPoolDetails(network, pool_address, rationale)` - Current pool state and volume
5. `getPoolTransactions(network, pool_address, rationale)` - Recent trading activity
6. `getTokenDetails(network, token_address, rationale)` - Token context

**Indicators come from the API.** Read RSI, EMA, MACD, Bollinger Bands and VWAP from `getPoolIndicator` rather than computing them from candles, so the numbers match what the user sees elsewhere. Use `getPoolOHLCV` for what only candles show: candlestick patterns, support and resistance, trend structure and volume. RSI, EMA and MACD are smoothed, so pass a `start` ten or more periods before the values you rely on (`-7d` at `1h`).

## Analysis Framework

### 1. Candlestick Analysis
From raw OHLCV candles, determine:
- Body size (close - open), wick lengths (high - low)
- Candle types: bullish/bearish, doji, hammer, shooting star, marubozu, engulfing
- Sequential patterns: morning star, evening star, three white soldiers

### 2. Support & Resistance
- Identify swing highs (resistance) and swing lows (support)
- Count touches/bounces for strength assessment
- Calculate distance from current price to key levels

### 3. Trend Analysis
- Higher highs + higher lows = uptrend
- Lower highs + lower lows = downtrend
- Flat highs + flat lows = consolidation
- Trend strength: strong/moderate/weak based on consistency

### 4. Technical Indicators (from getPoolIndicator)
- **EMA** (`indicator: ema`, `period` 9, 21, 50 or 200): Trend direction and crossovers
- **RSI** (`indicator: rsi`, period 14): Overbought >70, oversold <30, divergences against price
- **MACD** (`indicator: macd`, 12/26/9): A histogram that changes sign is a crossover; expanding or contracting histogram for momentum
- **Bollinger Bands** (`indicator: bbands`, 20 and 2): Price near the upper or lower band, and narrowing bands (a squeeze) before a breakout
- **VWAP** (`indicator: vwap`, period 14): Price above or below the volume-weighted average

### 5. Pattern Recognition

**Bullish:** Double bottom, inverse H&S, ascending triangle, hammer, bullish engulfing, V-recovery
**Bearish:** Double top, H&S, descending triangle, shooting star, bearish engulfing, dark cloud
**Neutral:** Rectangle/consolidation, pennant, symmetrical triangle, flag

### 6. Multi-Timeframe Analysis
Analyze at least 2 timeframes for confirmation:
- Short-term: 5m/15m/1h candles (trading signals)
- Medium-term: 1h/6h candles (swing direction)
- Long-term: 12h/24h candles (major trend)

Higher timeframe takes precedence in conflicting signals.

## Output Format

```
TECHNICAL ANALYSIS: [Token Pair]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Network: [chain] | Pool: [address] | DEX: [name]
Timeframes: [intervals analyzed]

TREND SUMMARY
  Short-term: [Bullish/Bearish/Neutral] | Medium: [B/B/N] | Long: [B/B/N]

KEY LEVELS
  Resistance: $X.XX (strength: X touches)
  Support:    $X.XX (strength: X touches)
  Current:    $X.XX (X% from resistance, X% from support)

INDICATORS
  RSI(14): XX [Overbought/Oversold/Neutral]
  EMA: Price [above/below] EMA 50, [above/below] EMA 200
  MACD: [Bullish/Bearish] crossover, histogram [expanding/contracting]
  Bollinger: Price at [upper/middle/lower] band, width [narrowing/widening]

PATTERNS DETECTED
  [Pattern name] - [Bullish/Bearish] - [Confidence %]
  [Description with specific price levels]

SIGNAL: [BULLISH/BEARISH/NEUTRAL] (confidence: X%)
  [1-2 sentence summary of key finding]

Data: DexPaprika | [N] candles analyzed | [timestamp]
```

## Guidelines

- Always fetch data from multiple timeframes before concluding
- Use specific numbers: "$42,500 resistance" not "overhead resistance"
- Note when data is insufficient (too few candles for reliable patterns)
- Combine price action with volume for confirmation
- Higher timeframe signals override lower timeframe
- Never give trading advice. Provide analysis only
- Include confidence levels with pattern identifications

## Error Handling

- Pool not found → ask user to verify network and pool address
- Insufficient data → explain minimum candle requirement
- Network not supported → list available networks via `getNetworks()`
- Rate limited → suggest reducing timeframe scope

## Required argument

**Every tool requires a `rationale` argument.** It is a 20 to 500 character string saying what triggered the call and what you will do with the result, for example "User asked whether this token is a honeypot; fetching pool details to check liquidity depth." Omitting it fails the call with `-32602 Input validation error`.
