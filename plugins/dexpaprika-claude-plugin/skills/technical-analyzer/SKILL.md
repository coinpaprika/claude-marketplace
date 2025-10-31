# Technical Analysis Skill

## Description
Automatically analyzes OHLCV (Open, High, Low, Close, Volume) data across multiple timeframes to identify candlestick patterns, support/resistance levels, trend formations, and key price levels when users ask about price movements, patterns, or technical analysis.

## When This Skill Activates

Claude will use this skill when:
- User asks about price patterns or formations
- User mentions: "Is this bullish?", "I see a double top", "What's the support level?"
- User requests technical analysis for a trading pair
- User asks about candlestick patterns or trends
- User wants to identify breakout/breakdown levels
- User mentions chart patterns like head-and-shoulders, triangles, flags
- User asks about moving averages or price trends

**Examples that trigger this skill:**
- "What's happening with the price of this pool?"
- "I see a triple bottom forming on Base..."
- "Can you analyze the 4h chart?"
- "Is this a bullish breakout?"
- "What's the resistance level here?"
- "Looks like a head and shoulders pattern..."
- "Can you spot patterns in this OHLCV data?"

## How It Works

When activated, this skill performs comprehensive technical analysis:

### Stage 1: Input Validation & Data Retrieval
- Extract network, pool address, and desired timeframe from context
- Call `getCapabilities()` to normalize network names
- Determine analysis timeframes (5m, 15m, 1h, 4h, 1d, 1w)
- Call `getPoolOHLCV(network, pool_address, start, interval)` to fetch historical data
  - Typically fetch 100+ candles for robust pattern detection

### Stage 2: Data Processing

**Candlestick Analysis:**
- Calculate body size (close - open)
- Calculate wicks (high - low)
- Determine candle type: bullish/bearish/doji/hammer/shooting star
- Identify candlestick characteristics:
  - Long-legged doji (indecision)
  - Hammer (potential reversal bottom)
  - Shooting star (potential reversal top)
  - Spinning top (indecision)
  - Marubozu (strong directional)

**Support & Resistance:**
- Identify swing lows (support levels)
- Identify swing highs (resistance levels)
- Determine strength by counting bounces off level
- Calculate: previous S/R, current distance, breakout potential

**Trend Analysis:**
- Calculate simple trend using HLC (high, low, close)
- Identify: higher highs/higher lows (uptrend), lower highs/lower lows (downtrend)
- Determine trend strength: strong/moderate/weak
- Calculate trend lines: connect swing points
- Identify: breakout, breakdown, consolidation

**Technical Indicators Calculation:**

**Moving Averages:**
- **EMA 9** (short-term) - Fast momentum indicator
- **EMA 21** (medium-term) - Balance between fast and slow
- **EMA 50** (long-term) - Overall trend direction
- **EMA 200** (very long-term) - Major trend filter
- Interpret: Price above all EMAs = strong uptrend, below all = strong downtrend
- Golden Cross: EMA 9 crosses above EMA 50 = bullish signal
- Death Cross: EMA 9 crosses below EMA 50 = bearish signal

**RSI (Relative Strength Index) - 14 period:**
- Range: 0-100
- **Overbought** (RSI > 70): Asset may be overextended, potential pullback
- **Oversold** (RSI < 30): Asset may be underdeveloped, potential bounce
- **Neutral (30-70)**: Normal trading range
- **Divergence Detection**:
  - Bullish divergence: Price makes lower low but RSI makes higher low (reversal signal up)
  - Bearish divergence: Price makes higher high but RSI makes lower high (reversal signal down)

**MACD (Moving Average Convergence Divergence):**
- Calculate: MACD line = EMA 12 - EMA 26
- Signal line = EMA 9 of MACD line
- Histogram = MACD - Signal line
- **Signals:**
  - MACD crosses above signal line = bullish (potential buy)
  - MACD crosses below signal line = bearish (potential sell)
  - Histogram positive = bullish momentum
  - Histogram negative = bearish momentum
  - Histogram expanding = strengthening move
  - Histogram contracting = weakening move
- **Extreme zones:**
  - MACD far above signal = momentum strong but potentially overbought
  - MACD far below signal = momentum weak or oversold

**VWAP (Volume Weighted Average Price):**
- Calculate: Cumulative(Typical Price × Volume) / Cumulative Volume
- Typical Price = (High + Low + Close) / 3
- **Interpretation:**
  - Price above VWAP = institutional buying accumulation
  - Price below VWAP = institutional selling distribution
  - Price approaching VWAP = reversion likely
  - Break above VWAP with volume = strong bullish
  - Break below VWAP with volume = strong bearish
- **Use as:**
  - Dynamic support/resistance
  - Entry/exit zones
  - Trend confirmation indicator

### Stage 3: Pattern Recognition

**Bullish Patterns:**
```
Double Bottom:     Two lows at similar level + upward breakout
Triple Bottom:     Three lows at similar level + strong upward move
Head & Shoulders Inverse: Lower high, lower low, higher high + breakout
Ascending Triangle: Higher lows, flat resistance + breakout up
Wedge (Rising):    Narrowing range, upward bias + breakout

V-Shape Recovery:  Sharp down, sharp up - strong reversal
Hammer:            Small body, long lower wick - reversal at support
Engulfing Bullish: Red candle followed by green engulfing it
```

**Bearish Patterns:**
```
Double Top:        Two highs at similar level + downward breakdown
Triple Top:        Three highs at similar level + strong downward move
Head & Shoulders:   Higher high, higher low, lower high + breakdown
Descending Triangle: Lower highs, flat support + breakout down
Wedge (Falling):    Narrowing range, downward bias + breakdown

Inverted Hammer:   Small body, long upper wick - reversal at resistance
Engulfing Bearish: Green candle followed by red engulfing it
Dark Cloud Cover:   Large green candle followed by large red candle
```

**Neutral Patterns:**
```
Rectangle/Consolidation: Price bouncing between support/resistance
Pennant:           Small consolidation triangle after big move
Continuation Flag:  Small channel in direction of trend
Symmetrical Triangle: Converging highs and lows, unclear direction
```

### Stage 4: Multi-Timeframe Analysis

Analyze across timeframes:
1. **Daily (1d)** - Overall trend and major support/resistance
2. **4-Hour (4h)** - Intermediate trend and consolidations
3. **1-Hour (1h)** - Short-term momentum and entry points
4. **15-Minute (15m)** - Very short-term price action (if available)

**Confluence:** When patterns align across timeframes, strength increases

### Stage 5: Report Generation

## Output Format

```
[TECHNICAL ANALYSIS: Pool Name]

═══════════════════════════════════════════════════════════
ANALYSIS TIMEFRAME: [4h / 1d / 1h etc]
Analysis Date: [timestamp]

CURRENT PRICE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Price:     $X.XXXX
24h High:          $X.XXXX
24h Low:           $X.XXXX
Range:             $X.XXXX (+X% volatility)

SUPPORT & RESISTANCE LEVELS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Resistance 1:      $X.XXXX (-X% away) [Strong, 5 bounces]
Current Price:     $X.XXXX
Support 1:         $X.XXXX (-X% away) [Strong, 4 bounces]
Support 2:         $X.XXXX (-X% away) [Moderate, 2 bounces]

TREND ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Trend:     [BULLISH / BEARISH / CONSOLIDATING]
Trend Strength:    [STRONG / MODERATE / WEAK]
Higher Highs:      ✓ [Yes] / ✗ [No]
Higher Lows:       ✓ [Yes] / ✗ [No]
Last 24h Movement: +X% (bullish) / -X% (bearish)

PATTERN RECOGNITION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Active Pattern:    [Pattern Name]
Pattern Stage:     [Early / Mid / Late / Completion]
Significance:      [Major reversal / Continuation / Consolidation]
Reliability:       X% confidence
Breakout Target:   $X.XXXX (+X%)
Breakdown Target:  $X.XXXX (-X%)

CANDLESTICK ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Last 5 Candles:
  [Candle 5, oldest] - [Type]: [Description]
  [Candle 4] - [Type]: [Description]
  [Candle 3] - [Type]: [Description]
  [Candle 2] - [Type]: [Description]
  [Candle 1, newest] - [Type]: [Description] ← Current

Volume Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Volume Trend:      [Increasing / Decreasing / Stable]
Volume on Up Days:  [X% above average] - [Strong / Weak]
Volume on Down Days: [X% above average] - [Strong / Weak]
Volume Confirmation: [Yes / No] ← Does volume confirm price move?

TECHNICAL INDICATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Moving Averages (Price Relationship):
  EMA 9 (fast):      $X.XXXX [Price above/below/at EMA]
  EMA 21 (medium):   $X.XXXX [Price X% above/below]
  EMA 50 (trend):    $X.XXXX [Price X% above/below]
  EMA 200 (major):   $X.XXXX [Price X% above/below]

  Alignment:         ✓ [All aligned bullish] / ⚠️ [Mixed] / ✗ [All aligned bearish]
  Golden Cross:      ✓ [EMA 9 above EMA 50 - BULLISH] / ✗ [Not present]
  Death Cross:       ✓ [EMA 9 below EMA 50 - BEARISH] / ✗ [Not present]

RSI (Relative Strength Index - 14 period):
  Current RSI:       [XX] [Overbought / Normal / Oversold]
  Zone:              [Above 70 / 30-70 / Below 30]
  Divergence:        ✓ [Bullish divergence detected] / ✗ [None / ⚠️ [Bearish divergence detected]]
  Strength:          [Strong trend / Weak trend]

MACD (Moving Average Convergence Divergence):
  MACD Line:         [Positive / Negative] - [Above / Below] signal line
  Signal Line:       [Value]
  Histogram:         [Positive (Bullish) / Negative (Bearish)] [Expanding / Contracting]
  Signal Strength:   [Strong / Moderate / Weak]
  Momentum Status:   [Accelerating / Decelerating]

VWAP (Volume Weighted Average Price):
  VWAP Level:        $X.XXXX
  Position:          Price [X%] [above / below] VWAP
  Interpretation:    [Institutional buying / Normal trading / Institutional selling]
  Support/Resistance: [Strong VWAP support] / [VWAP acting as resistance]
  Signal:            [Price approaching VWAP = reversion likely] / [Breaking VWAP with volume]

Indicator Confluence:
  EMAs:              [Bullish alignment / Mixed signals / Bearish alignment]
  RSI + MACD:        [Both confirm bullish] / [Divergence warning] / [Both confirm bearish]
  VWAP + Price:      [Price respecting VWAP] / [Potential breakout] / [Reversal likely]
  Overall Strength:  [Very Strong (4-5 indicators align)] / [Moderate] / [Weak (conflicting)]

MULTI-TIMEFRAME ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Daily (1d):      [Bullish / Bearish / Neutral] - [Pattern]
4-Hour (4h):     [Bullish / Bearish / Neutral] - [Pattern]
1-Hour (1h):     [Bullish / Bearish / Neutral] - [Pattern]
Confluence:      [2-3 timeframes align = STRONG signal]

KEY OBSERVATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• [Specific finding with data]
• [Pattern confirmation with candle count]
• [Volume or momentum insight]
• [Risk/opportunity assessment]

TECHNICAL OUTLOOK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Short-term (1-4h):  [Bullish / Bearish / Neutral]
Medium-term (1-3d): [Bullish / Bearish / Neutral]
Key Events:
  ✓ Watch: [Specific level or pattern completion]
  ✓ Support Break Below: [Level] = [Implication]
  ✓ Resistance Break Above: [Level] = [Implication]

RISK/REWARD ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If Bullish Pattern Triggers:
  Entry:    $X.XXXX (breakout)
  Target:   $X.XXXX (+X%)
  Risk:     $X.XXXX (-X%)
  R/R Ratio: 1:X

If Bearish Pattern Triggers:
  Entry:    $X.XXXX (breakdown)
  Target:   $X.XXXX (-X%)
  Risk:     $X.XXXX (+X%)
  R/R Ratio: 1:X

LIMITATIONS & CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Technical analysis shows probability, not certainty
• Combine with fundamental analysis and market context
• DEX pools are less liquid than centralized exchanges
• Price can be affected by: bridge swaps, arbitrage, manipulation
• Recent pools (<30 days) have less reliable pattern history

Data from: DexPaprika | [N] candles analyzed | [timestamp]
```

## Tools Available

You have access to:
- `getPoolOHLCV(network, pool_address, start, interval)` - Fetch historical candlestick data
- `getPoolDetails(network, pool_address)` - Current pool state and volume
- `getPoolTransactions(network, pool_address)` - Recent trading activity
- `getTokenDetails(network, address)` - Token metrics
- `getCapabilities()` - Network synonyms and validation

**Important**: These indicators are NOT provided by the API. You must calculate them from the raw OHLCV data returned by `getPoolOHLCV()`. Use the calculation formulas below.

---

## Indicator Calculation Guide

This section provides the exact formulas and step-by-step instructions to calculate all technical indicators from OHLCV data.

### Understanding OHLCV Data Format

Each candle contains:
```
{
  "timestamp": 1234567890,
  "open": 100.00,        // Price at candle open
  "high": 105.50,        // Highest price in candle
  "low": 98.20,          // Lowest price in candle
  "close": 102.30,       // Price at candle close
  "volume": 1500000      // Trading volume in period
}
```

All calculations work on a series of these candles (typically 50-100 candles).

---

### 1. EMA (Exponential Moving Average) Calculation

**EMA Formula:**
```
EMA = (Close - EMA_previous) × Multiplier + EMA_previous

Where:
  Multiplier = 2 / (Period + 1)
  For EMA 9: Multiplier = 2 / (9 + 1) = 0.2
  For EMA 21: Multiplier = 2 / (21 + 1) = 0.0909
  For EMA 50: Multiplier = 2 / (50 + 1) = 0.0196
  For EMA 200: Multiplier = 2 / (200 + 1) = 0.0099
```

**Step-by-Step Calculation:**

```
Step 1: Calculate initial SMA (Simple Moving Average)
  SMA = Sum of last N closes / N

  Example for EMA 9 with closes: [100, 101, 99, 102, 98, 103, 100, 105, 104]
  SMA = (100+101+99+102+98+103+100+105+104) / 9 = 101.33

Step 2: Calculate first EMA (equals the SMA)
  EMA[9] = 101.33

Step 3: For each subsequent candle, apply formula
  EMA_new = (Close - EMA_old) × 0.2 + EMA_old

  Example: Next close = 106
  EMA = (106 - 101.33) × 0.2 + 101.33
  EMA = 4.67 × 0.2 + 101.33
  EMA = 0.934 + 101.33
  EMA = 102.264

Step 4: Repeat Step 3 for all remaining candles
```

**Pseudocode for Claude:**
```
function calculateEMA(closes, period):
    multiplier = 2 / (period + 1)

    // Calculate initial SMA
    sma = sum(closes[0:period]) / period

    ema_values = [sma]
    current_ema = sma

    // Calculate EMA for each subsequent candle
    for i from period to length(closes):
        current_ema = (closes[i] - current_ema) * multiplier + current_ema
        ema_values.append(current_ema)

    return ema_values
```

---

### 2. RSI (Relative Strength Index - 14 period) Calculation

**RSI Formula:**
```
RSI = 100 - (100 / (1 + RS))

Where:
  RS = Average Gain / Average Loss
  Average Gain = Sum of all positive price changes / 14
  Average Loss = Sum of all negative price changes / 14
```

**Step-by-Step Calculation:**

```
Step 1: Calculate price changes
  For each candle (starting from candle 2):
    change = close[i] - close[i-1]
    if change > 0: gain = change, loss = 0
    if change < 0: gain = 0, loss = abs(change)
    if change = 0: gain = 0, loss = 0

  Example with closes: [100, 102, 101, 105, 103, 107, 106, 109, 108]
  Changes:              [2,    -1,   4,    -2,   4,    -1,   3,    -1]
  Gains:                [2,    0,    4,    0,    4,    0,    3,    0]
  Losses:               [0,    1,    0,    2,    0,    1,    0,    1]

Step 2: Calculate Average Gain and Average Loss (first 14 candles)
  Avg_Gain = Sum of first 14 gains / 14
  Avg_Loss = Sum of first 14 losses / 14

Step 3: Calculate RS
  RS = Avg_Gain / Avg_Loss

  Example: Avg_Gain = 2, Avg_Loss = 1
  RS = 2 / 1 = 2

Step 4: Calculate RSI
  RSI = 100 - (100 / (1 + RS))
  RSI = 100 - (100 / (1 + 2))
  RSI = 100 - (100 / 3)
  RSI = 100 - 33.33
  RSI = 66.67

Step 5: For subsequent candles, use smoothed average (Wilder's method)
  Avg_Gain_new = (Avg_Gain_old × 13 + New_Gain) / 14
  Avg_Loss_new = (Avg_Loss_old × 13 + New_Loss) / 14
  Then recalculate RS and RSI
```

**Pseudocode for Claude:**
```
function calculateRSI(closes, period = 14):
    changes = []
    gains = []
    losses = []

    // Calculate price changes
    for i from 1 to length(closes):
        change = closes[i] - closes[i-1]
        changes.append(change)

        if change > 0:
            gains.append(change)
            losses.append(0)
        else:
            gains.append(0)
            losses.append(abs(change))

    // Calculate average gain and loss
    avg_gain = sum(gains[0:period]) / period
    avg_loss = sum(losses[0:period]) / period

    rsi_values = []

    // Calculate RSI for each subsequent candle
    for i from period to length(closes):
        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        rsi_values.append(rsi)

        // Update averages (Wilder's smoothing)
        avg_gain = (avg_gain * (period - 1) + gains[i]) / period
        avg_loss = (avg_loss * (period - 1) + losses[i]) / period

    return rsi_values
```

---

### 3. MACD (Moving Average Convergence Divergence) Calculation

**MACD Formula:**
```
MACD Line = EMA 12 - EMA 26
Signal Line = EMA 9 of MACD Line
Histogram = MACD Line - Signal Line
```

**Step-by-Step Calculation:**

```
Step 1: Calculate EMA 12 and EMA 26 from close prices
  Use the EMA calculation above with periods 12 and 26
  EMA_12 = calculateEMA(closes, 12)
  EMA_26 = calculateEMA(closes, 26)

Step 2: Calculate MACD Line for each candle
  MACD[i] = EMA_12[i] - EMA_26[i]

  Example:
  EMA_12 = 102.50
  EMA_26 = 101.20
  MACD = 102.50 - 101.20 = 1.30

Step 3: Calculate Signal Line (EMA 9 of MACD values)
  Signal_Line = calculateEMA(MACD_values, 9)

Step 4: Calculate Histogram for each candle
  Histogram[i] = MACD[i] - Signal_Line[i]

  Example:
  MACD = 1.30
  Signal = 1.15
  Histogram = 1.30 - 1.15 = 0.15
```

**Pseudocode for Claude:**
```
function calculateMACD(closes):
    // Calculate EMAs
    ema_12 = calculateEMA(closes, 12)
    ema_26 = calculateEMA(closes, 26)

    // Calculate MACD line
    macd_line = []
    for i from 0 to length(ema_12):
        macd_line.append(ema_12[i] - ema_26[i])

    // Calculate Signal line (EMA 9 of MACD)
    signal_line = calculateEMA(macd_line, 9)

    // Calculate Histogram
    histogram = []
    for i from 0 to length(macd_line):
        histogram.append(macd_line[i] - signal_line[i])

    return {
        macd: macd_line,
        signal: signal_line,
        histogram: histogram
    }
```

---

### 4. VWAP (Volume Weighted Average Price) Calculation

**VWAP Formula:**
```
VWAP = Cumulative(Typical Price × Volume) / Cumulative(Volume)

Where:
  Typical Price = (High + Low + Close) / 3
```

**Step-by-Step Calculation:**

```
Step 1: Calculate Typical Price for each candle
  Typical_Price = (High + Low + Close) / 3

  Example:
  High = 105.50, Low = 98.20, Close = 102.30
  Typical_Price = (105.50 + 98.20 + 102.30) / 3 = 102.00

Step 2: Multiply Typical Price by Volume
  TP_Volume = Typical_Price × Volume

  Example (with Volume = 1500000):
  TP_Volume = 102.00 × 1500000 = 153,000,000

Step 3: Calculate cumulative sums from start of period
  Cumulative_TP_Volume = Sum of all TP_Volume values so far
  Cumulative_Volume = Sum of all Volume values so far

Step 4: Calculate VWAP
  VWAP = Cumulative_TP_Volume / Cumulative_Volume

  Example after 5 candles:
  Cumulative_TP_Volume = 500,000,000
  Cumulative_Volume = 5,000,000
  VWAP = 500,000,000 / 5,000,000 = 100.00
```

**Pseudocode for Claude:**
```
function calculateVWAP(candles):
    // candles = [{open, high, low, close, volume}, ...]

    cumulative_tp_volume = 0
    cumulative_volume = 0
    vwap_values = []

    for each candle in candles:
        // Calculate typical price
        typical_price = (candle.high + candle.low + candle.close) / 3

        // Accumulate
        cumulative_tp_volume += typical_price × candle.volume
        cumulative_volume += candle.volume

        // Calculate VWAP
        vwap = cumulative_tp_volume / cumulative_volume
        vwap_values.append(vwap)

    return vwap_values
```

**Important**: VWAP should be calculated from a specific start time (usually day start or session start). For this skill, calculate from the beginning of your analysis period.

---

### 5. Support & Resistance Level Detection

**Algorithm for Swing Lows (Support):**
```
Step 1: Identify swing lows
  A swing low is a candle where:
    - Its low is lower than the previous candle's low
    - Its low is lower than the next candle's low

  Example with lows: [100, 98, 95, 97, 96, 98, 102]
  Swing lows at indices: 2 (95), 4 (96)

Step 2: Find clusters of support
  Group swing lows that are within 0.5% of each other

  Example: [95.00, 95.23, 95.15] → cluster at ~95.13

Step 3: Count bounce strength
  Count how many times price bounced off each level
  More bounces = stronger support
```

**Algorithm for Swing Highs (Resistance):**
```
Same as support, but look for highs:
  A swing high is a candle where:
    - Its high is higher than the previous candle's high
    - Its high is higher than the next candle's high
```

**Pseudocode for Claude:**
```
function findSwingLows(candles, tolerance = 0.005):
    swing_lows = []

    // Find individual swing lows
    for i from 1 to length(candles) - 1:
        if candles[i].low < candles[i-1].low and
           candles[i].low < candles[i+1].low:
            swing_lows.append(candles[i].low)

    // Cluster similar levels
    clusters = []
    for low in swing_lows:
        found_cluster = false
        for cluster in clusters:
            if abs(low - cluster.level) / cluster.level < tolerance:
                cluster.lows.append(low)
                cluster.level = average(cluster.lows)
                found_cluster = true
                break

        if not found_cluster:
            clusters.append({level: low, lows: [low]})

    // Return clusters sorted by strength
    return sort(clusters, by length descending)
```

---

### Quick Reference: Order of Calculations

When analyzing a pool, calculate in this order:

```
1. Fetch OHLCV data with getPoolOHLCV()
2. Calculate EMA 9, 21, 50, 200 from closes
3. Calculate RSI 14 from closes
4. Calculate MACD (which uses EMA 12 and EMA 26)
5. Calculate VWAP from all candles
6. Find Support & Resistance levels from highs/lows
7. Analyze patterns (requires all above data)
8. Generate interpretation (use all indicators)
```

---

### Testing Your Calculations

**Verify your calculations are correct:**

```
✓ EMA 9 should be closer to recent prices than EMA 200
✓ RSI should always be between 0 and 100
✓ MACD histogram should oscillate around zero
✓ VWAP should be between the lowest low and highest high
✓ Support levels should cluster near actual price bounces
```

If any value is outside these ranges, recalculate - there's an error.

---

## Pattern Detection Guidelines

### Bullish Reversal Patterns (at Support)
- **Hammer**: Small body + long lower wick (2-3x body size) = potential bounce
- **Double Bottom**: Two similar lows, upbreak between them
- **V-Shape**: Sharp decline followed by sharp recovery
- **Inverse H&S**: Left shoulder higher, head lowest, right shoulder between = bullish breakout

### Bearish Reversal Patterns (at Resistance)
- **Shooting Star**: Small body + long upper wick (2-3x body size) = potential drop
- **Double Top**: Two similar highs, downbreak between them
- **H&S**: Left shoulder high, head higher, right shoulder between = bearish breakdown
- **Inverted V**: Sharp rally followed by sharp decline

### Continuation Patterns
- **Ascending Triangle**: Higher lows, flat resistance = bullish continuation
- **Descending Triangle**: Lower highs, flat support = bearish continuation
- **Flag/Pennant**: Small consolidation after big move = trend continues
- **Wedge**: Narrowing range with directional bias = breakout in bias direction

### Trend Confirmation Indicators
- **Higher Highs + Higher Lows** = Strong Uptrend
- **Lower Highs + Lower Lows** = Strong Downtrend
- **Volume confirming move** = Strong signal (volume up on breakout, volume down on pull back)

## Important Guidelines

1. **Data Sufficiency**
   - Need 20+ candles minimum for pattern recognition
   - 50+ candles preferred for reliability
   - Very new pools may not have enough history

2. **Pattern Confirmation**
   - Don't predict patterns until they're ~70% complete
   - Wait for actual breakout/breakdown, not just proximity
   - Multiple timeframe confluence increases confidence

3. **Volume Analysis**
   - Breakouts with volume are more reliable
   - Breakouts without volume are often false
   - Compare to average volume (20-period average)

4. **Support/Resistance Strength**
   - First touch = weak level
   - Second touch = moderate level
   - Third+ touches = strong level
   - Show touch count in analysis

5. **Avoid Overconfidence**
   - DEX pools have lower liquidity, wider spreads
   - Whales can move price more easily
   - Recent pools have unreliable patterns
   - Use probabilities, not certainties

6. **Never Give Trading Advice**
   - Present analysis objectively
   - Say: "Pattern suggests potential breakout to $X"
   - Don't say: "Buy at the breakout"
   - Let user decide based on analysis

## Indicator Interpretation Guide

### Strong Bullish Signal (4-5 indicators align)
```
✓ All EMAs aligned bullish (price above all EMAs)
✓ RSI 30-70 or bouncing from oversold (<30)
✓ MACD above signal line with expanding positive histogram
✓ VWAP support confirmed (price above VWAP)
✓ Volume increasing on up days
→ VERY HIGH PROBABILITY BULLISH MOVE
```

### Strong Bearish Signal (4-5 indicators align)
```
✓ All EMAs aligned bearish (price below all EMAs)
✓ RSI 30-70 or declining from overbought (>70)
✓ MACD below signal line with expanding negative histogram
✓ VWAP resistance confirmed (price below VWAP)
✓ Volume increasing on down days
→ VERY HIGH PROBABILITY BEARISH MOVE
```

### Warning Signals (Indicator Divergence)
```
⚠️ Price making higher high but RSI making lower high = Bearish divergence
⚠️ EMAs showing weakness while price above = Possible false breakout
⚠️ MACD histogram shrinking = Momentum loss, reversal possible
⚠️ Price above VWAP but RSI overbought (>80) = Pullback likely
⚠️ Volume declining on breakout = Weakness, may not hold
→ CAUTION: Wait for confirmation before acting
```

### Weak/Conflicting Signals (Be Careful)
```
⚠️ Mixed EMA alignment (some bullish, some bearish)
⚠️ RSI neutral (40-60) = No clear direction
⚠️ MACD near zero line = Momentum unclear
⚠️ Price near VWAP = Indecision
→ LOW PROBABILITY MOVE - Avoid trading until clarity
```

### How to Weight Indicators (by reliability)

1. **VWAP** (Most Reliable) - Shows institutional accumulation/distribution
2. **EMA Alignment** - Clear trend confirmation across timeframes
3. **MACD** - Strong momentum and reversal signals
4. **RSI** - Best for overbought/oversold and divergence detection
5. **Volume** - Confirms all other signals

Use all 5 together for highest confidence analysis.

## Example Scenarios

### Scenario 1: Clear Bullish Pattern
User: "Analyze the 4h chart for this pool on Base"

Response:
```
[TECHNICAL ANALYSIS: ETH/USDC on Base]

═══════════════════════════════════════════════════════════
ANALYSIS TIMEFRAME: 4-Hour
Analysis Date: 2025-10-31 14:23 UTC

CURRENT PRICE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Price:     $2,845.32
24h High:          $2,920.15
24h Low:           $2,680.90
Range:             $239.25 (+8.9% volatility)

SUPPORT & RESISTANCE LEVELS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Resistance 2:      $2,950.00 (+3.6%) [Strong, 6 bounces]
Resistance 1:      $2,880.00 (+1.2%) [Moderate, 3 bounces]
Current Price:     $2,845.32
Support 1:         $2,750.00 (-3.3%) [Strong, 5 bounces]
Support 2:         $2,680.00 (-5.8%) [Moderate, 2 bounces]

TREND ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Trend:     BULLISH ✓
Trend Strength:    STRONG
Higher Highs:      ✓ Yes (last 6 candles)
Higher Lows:       ✓ Yes (last 8 candles)
Last 24h Movement: +5.2% (bullish)

PATTERN RECOGNITION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Active Pattern:    Ascending Triangle
Pattern Stage:     90% Complete (Late stage)
Significance:      Bullish Continuation
Reliability:       87% confidence
Breakout Target:   $2,950+ (resistance break) → $3,050 (+7%)
Breakdown Target:  $2,750 (if support breaks) → $2,650 (-6%)

CANDLESTICK ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Last 5 Candles:
  4h ago - Bullish (Green): Strong close, higher high
  3h ago - Bullish (Green): Confirming strength, consolidating
  2h ago - Doji: Indecision, consolidation
  1h ago - Bullish (Green): Breakout candle, higher close
  Current - Hammer-like: Current candle forming near support of triangle

Volume Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Volume Trend:      Increasing ↗
Volume on Up Days:  +28% above average - STRONG
Volume on Down Days: -15% below average - WEAK
Volume Confirmation: YES ✓ (volume confirms uptrend)

TECHNICAL INDICATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Moving Averages (Price Relationship):
  EMA 9 (fast):      $2,820.45 [Price +0.9% above EMA]
  EMA 21 (medium):   $2,795.30 [Price +1.8% above EMA]
  EMA 50 (trend):    $2,755.80 [Price +3.3% above EMA]
  EMA 200 (major):   $2,680.15 [Price +6.1% above EMA]

  Alignment:         ✓ ALL BULLISH ALIGNED - price above all EMAs
  Golden Cross:      ✓ EMA 9 above EMA 50 - STRONG BULLISH
  Death Cross:       ✗ Not present

RSI (Relative Strength Index - 14 period):
  Current RSI:       58 [Normal zone]
  Zone:              30-70 [Healthy, neither overbought nor oversold]
  Divergence:        ✗ None detected
  Strength:          Strong uptrend (RSI in healthy zone, trending up)

MACD (Moving Average Convergence Divergence):
  MACD Line:         +8.32 [Positive] - ABOVE signal line
  Signal Line:       +6.15 [Value]
  Histogram:         +2.17 [Positive (Bullish)] [Expanding ↗]
  Signal Strength:   Strong ✓
  Momentum Status:   ACCELERATING - histogram growing

VWAP (Volume Weighted Average Price):
  VWAP Level:        $2,812.50
  Position:          Price +1.2% ABOVE VWAP ✓
  Interpretation:    Institutional buying accumulation ✓
  Support/Resistance: VWAP acting as strong support
  Signal:            Price breaking above VWAP with volume = VERY BULLISH

Indicator Confluence:
  EMAs:              ✓ Bullish alignment (all 4 EMAs pointing up)
  RSI + MACD:        ✓ Both confirm bullish (RSI healthy, MACD expanding)
  VWAP + Price:      ✓ Price above VWAP with institutional backing
  Overall Strength:  ✓✓✓ VERY STRONG (5/5 indicators align bullish)

MULTI-TIMEFRAME ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Daily (1d):      Bullish - Higher highs, higher lows
4-Hour (4h):     Bullish - Ascending triangle forming
1-Hour (1h):     Bullish - Momentum continuation
Confluence:      3/3 timeframes bullish = STRONG SIGNAL ✓✓✓

KEY OBSERVATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Ascending triangle nearly complete after 3-day formation
• Volume increasing on up moves confirms buyer strength
• Support at $2,750 held 5 times in past week - very strong
• Current consolidation near breakout point suggests imminent move
• Price approaching upper boundary of triangle with high volume

TECHNICAL OUTLOOK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Short-term (1-4h):  Bullish - Watch for triangle breakout
Medium-term (1-3d): Bullish - Trend should continue
Key Events:
  ✓ Watch: $2,880 resistance breakout for triangle confirmation
  ✓ If $2,750 breaks: First target $2,650 (previous low)
  ✓ If $2,880 breaks: First target $2,950, then $3,050

RISK/REWARD ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If Bullish Breakout:
  Entry:    $2,880+ (triangle break)
  Target:   $2,950-$3,050 (+3-7%)
  Risk:     $2,750 (-4%)
  R/R Ratio: 1:1.7 (favorable)

If Bearish Breakdown:
  Entry:    $2,750 (support break)
  Target:   $2,650-$2,500 (-6 to -12%)
  Risk:     $2,880 (+4%)
  R/R Ratio: 1:1.5 (less favorable)

LIMITATIONS & CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• This is probability-based analysis, not a guarantee
• ETH/USDC is fairly liquid, but patterns may break unexpectedly
• Whale movements can invalidate technical patterns
• Always use stop losses on actual trades
• Combine with fundamental analysis and market sentiment

Data from: DexPaprika | 56 candles analyzed | 2025-10-31
```

### Scenario 2: Bearish Pattern Warning
User: "What does the chart look like for this new Base token?"

Response:
```
[TECHNICAL ANALYSIS: NewToken/USDC on Base]

CURRENT PRICE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Price:     $0.00245
24h High:          $0.00892
24h Low:           $0.00089
Range:             $0.00803 (+900% volatility - EXTREME)

TREND ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Trend:     BEARISH
Trend Strength:    STRONG
Lower Highs:       ✓ Yes (each bounce is lower)
Lower Lows:        ✓ Yes (each drop is lower)
Last 24h Movement: -73% (bearish)

PATTERN RECOGNITION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Active Pattern:    Head & Shoulders (Distribution)
Pattern Stage:     70% Complete
Significance:      Bearish Reversal - Strong downside signal
Reliability:       79% confidence
Target:            $0.00045 (-82%)

KEY OBSERVATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 CRITICAL OBSERVATIONS:
• Extreme volatility (900%) indicates speculation/manipulation
• Clear downtrend with lower highs every bounce
• Volume declining on up moves, increasing on down moves
• Head & Shoulders pattern confirms bearish momentum
• Only 24 hours of price history - very unreliable

TECHNICAL OUTLOOK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Short-term (1-4h):  Bearish
Medium-term (1-3d): Caution - Highly volatile
Key Events:
  ⚠️ Support $0.00150 may break soon
  ⚠️ High-risk environment - avoid without major liquidity
  ⚠️ Very new token - patterns not reliable

LIMITATIONS & CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 WARNING: This token is extremely new and volatile
• Only 24 hours of data - insufficient for reliable analysis
• Extreme volatility ($0.00089 to $0.00892) suggests:
  - Pump & dump activity
  - Low liquidity moves
  - Potential scam indicators
• Chart patterns unreliable this early in token lifecycle
• This volatility pattern matches pump-and-dump profiles

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Consider running security analysis on this token address
(Use Token Security Analyzer for honeypot/scam detection)
```

### Scenario 3: Indicator Divergence Warning
User: "The price went up but something feels off..."

Response:
```
[TECHNICAL ANALYSIS: Token/USDC - Divergence Warning]

TREND ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Trend:     BULLISH (on surface)
Price Action:      ↗ Making higher highs (+2.3% today)
Last Movement:     Up $1,200 in 4 hours

TECHNICAL INDICATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Moving Averages:
  EMA 9:           $45,800 [Price +2.6% above]
  EMA 21:          $45,200 [Price +3.2% above]
  Status:          ✓ Bullish (price above both)

RSI (Relative Strength Index):
  Current RSI:      82 [OVERBOUGHT]
  Zone:             Above 70 [OVERBOUGHT ZONE]
  Price Action:     ✓ Making HIGHER HIGH ($46,500)
  RSI Action:       ✗ Making LOWER HIGH (RSI was 86, now 82)
  ⚠️ BEARISH DIVERGENCE DETECTED: Price higher, RSI lower = reversal warning

MACD:
  MACD Line:       [Positive but weakening]
  Histogram:       [Shrinking ↙] - Momentum loss
  Status:          ⚠️ Momentum decelerating despite price rise

VWAP:
  VWAP Level:      $45,500
  Position:        Price only +2.2% above VWAP
  Volume:          ↙ Decreasing on the rally
  Status:          ⚠️ Weak breakout (volume not confirming)

Indicator Confluence:
  EMAs:            ✓ Bullish
  RSI + Divergence: ✗ BEARISH DIVERGENCE (major warning)
  MACD:            ⚠️ Weakening momentum
  Volume:          ✗ Declining on rally
  Overall Strength: ⚠️⚠️ WEAK - Only 1/4 indicators confirming, multiple warnings

KEY OBSERVATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 RED FLAG: Price making higher high but RSI making lower high
   This is classic bearish divergence = likely reversal coming

⚠️ Momentum is decelerating (MACD histogram shrinking)
   Price is rising on declining volume = weakness

⚠️ RSI overbought at 82 = pullback very likely
   Expect reversal to $45,200 (previous EMA) or deeper

TECHNICAL OUTLOOK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Short-term (1-4h):  ⚠️ CAUTION - Bearish divergence suggests pullback
Medium-term (1-3d): Depends on next move - wait for confirmation

Key Events:
  ⚠️ WATCH: If price breaks below $45,200 → pullback confirmed
  ⚠️ WATCH: RSI needs to cool below 70 to remove overbought
  ✓ Support: $45,200 (EMA 21) is first major support
  ✓ Support: $45,000 (previous resistance)

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ WAIT FOR CONFIRMATION before trading
Bearish divergence suggests pullback likely
The overbought RSI + declining volume + MACD weakness = high probability reversal
Better to wait for price to break below $45,200 before shorting
Or wait for RSI to cool below 70 before buying more
```

## Success Criteria

A successful skill invocation:
1. Fetches adequate OHLCV data (20+ candles)
2. Identifies all relevant support/resistance levels
3. Recognizes candlestick patterns accurately
4. Detects larger chart patterns (triangles, H&S, etc.)
5. Analyzes volume confirmation
6. Provides multi-timeframe perspective
7. Calculates risk/reward ratios
8. Never gives investment advice
9. Warns about low-confidence situations
10. Provides actionable observations with specific levels
