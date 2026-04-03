---
name: technical-analyzer
description: Analyze OHLCV data to identify candlestick patterns, support/resistance levels, trend formations, and technical indicators. Activates when users ask about price patterns, chart analysis, or technical signals for any pool across 34+ chains.
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

1. `getCapabilities()` - Load network synonyms for input normalization
2. `getPoolOHLCV(network, pool_address, start, interval, limit)` - Fetch candle data
   - Intervals: `1m`, `5m`, `10m`, `15m`, `30m`, `1h`, `6h`, `12h`, `24h`
   - Max 366 data points per request
   - Fetch 100+ candles for robust pattern detection
3. `getPoolDetails(network, pool_address)` - Current pool state and volume
4. `getPoolTransactions(network, pool_address)` - Recent trading activity
5. `getTokenDetails(network, token_address)` - Token context

**Important:** OHLCV data provides raw price candles only. Technical indicators (EMA, RSI, MACD, VWAP) must be calculated from the raw data.

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

### 4. Technical Indicators (calculate from OHLCV)
- **EMA** (9, 21, 50, 200 periods): Trend direction and crossovers
- **RSI** (14 period): Overbought >70, oversold <30, divergences
- **MACD** (12/26/9): Momentum crossovers and histogram
- **VWAP**: Institutional accumulation/distribution zones

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
- Never give trading advice — provide analysis only
- Include confidence levels with pattern identifications

## Error Handling

- Pool not found → ask user to verify network and pool address
- Insufficient data → explain minimum candle requirement
- Network not supported → list available networks via `getNetworks()`
- Rate limited → suggest reducing timeframe scope
