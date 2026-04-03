---
name: token-security-analyzer
description: Analyze tokens for security risks, scams, and honeypots. Activates when users share token addresses, ask about token safety, or request honeypot/rug pull analysis across 34+ chains.
---

# Token Security Analyzer Skill

## Description
Automatically analyzes Ethereum and other blockchain tokens for security risks, scams, and honeypots when users share token addresses or ask about token safety.

## When This Skill Activates

Claude will use this skill when:
- User shares a token address (0x... format)
- User asks: "Is this token safe?", "Check this token for scams"
- User mentions suspicious trading patterns
- User wants to validate a token before trading/investing
- A URL contains a token contract address
- User asks about honeypot detection or rug pull risks

**Examples that trigger this skill:**
- "Is 0x1234567890abcdef... safe?"
- "Check this token for honeypots"
- "I found this token, can you analyze it?"
- "Is there a rug pull risk in this pool?"
- "This token looks suspicious..."

## How It Works

When activated, this skill performs a multi-stage security analysis:

### Stage 1: Input Validation
- Extract network and token address from user input
- Normalize network name (e.g., "Ethereum" → "ethereum", "BSC" → "bsc")
- Validate address format
- Call `getCapabilities()` first to load network synonyms

### Stage 2: Data Collection
Using DexPaprika MCP tools:
1. Call `getTokenDetails(network, address)` - Get token metrics
2. Call `getTokenPools(network, address)` - Find all pools
3. For each pool, call `getPoolDetails(network, pool_address)` - Get pool state
4. Call `getPoolTransactions(network, pool_address)` - Analyze trading patterns (get last 100 transactions)

### Stage 3: Security Analysis

**Honeypot Detection:**
```
✓ Check buy/sell transaction ratio
  - Analyze last 50-100 transactions
  - Flag if >10:1 (mostly buys, few sells)
  - Flag if 90%+ are buys with no successful sells

✓ Check slippage patterns
  - Low slippage on buy, extremely high on sell = honeypot

✓ Check holder liquidity
  - Large holder count but no successful sells = red flag
```

**Rug Pull Risk:**
```
✓ Liquidity concentration
  - Single pool >80% of liquidity = high risk

✓ Liquidity velocity
  - Sudden adds/removes in recent history = suspicious

✓ Token age
  - <7 days old + low liquidity = critical risk

✓ Deployer control
  - Check if deployer holds >50% of supply
```

**Market Manipulation:**
```
✓ Volume/liquidity ratio
  - Volume > liquidity by 10x = possible wash trading

✓ Price movement patterns
  - Perfectly smooth prices without volatility = artificial

✓ Transaction clustering
  - Same addresses repeatedly trading = potential manipulation

✓ Slippage spread
  - Buy slippage 0.5%, sell slippage 45% = manipulation
```

### Stage 4: Risk Assessment

Output format:
```
[VERDICT: LOW/MEDIUM/HIGH/CRITICAL RISK]

Token: [Name] ([Address])
Network: [blockchain]
Risk Level: [Rating with confidence %]

KEY METRICS (24h)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Volume:       $X.XM
Liquidity:    $X.XK across N pools
Transactions: N buys / N sells
Price:        $X.XX (±X% 24h)

SECURITY FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Positive indicators (if any)
⚠️ Warnings (concerns found)
🔴 Critical issues (if any)

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Action based on risk level]
Data from: DexPaprika | [N] pools analyzed | [timestamp]
```

## Tools Available

You have access to all DexPaprika MCP tools:
- `getTokenDetails(network, address)` - Token metrics and basic info
- `getTokenPools(network, address)` - All pools containing token
- `getPoolDetails(network, pool_address)` - Pool state and metrics
- `getPoolOHLCV(network, pool_address, start, interval)` - Historical price data
- `getPoolTransactions(network, pool_address)` - Recent swaps and trades (use for pattern analysis)
- `getTokenMultiPrices(network, tokens)` - Batch prices (max 10)
- `getNetworks()` - List supported blockchains
- `getCapabilities()` - Get network synonyms and validation rules

## Important Guidelines

1. **Always call `getCapabilities()` first** to get network synonyms
   - User says "Binance Smart Chain" → normalize to "bsc"
   - Ensures compatibility across different user inputs

2. **Validate before making calls**
   - Check address format (should be 0x...)
   - Validate network name against capabilities
   - Save API quota by validating first

3. **Be decisive with findings**
   - Provide clear verdict with supporting evidence
   - Use specific numbers ("98% buys", not "mostly buys")
   - When uncertain, err on side of caution

4. **Never give investment advice**
   - Provide analysis only
   - Say: "This token shows high-risk indicators"
   - Don't say: "Don't buy this token"

5. **Handle errors gracefully**
   - Token not found → suggest checking network or address
   - Network not supported → list available networks
   - Rate limit hit → suggest checking later
   - Invalid address format → request proper 0x... address

6. **Transaction analysis specifics**
   - Analyze buy/sell ratio from transaction data
   - Look for patterns: are the same addresses repeatedly buying?
   - Check if there are successful sell transactions
   - If no sells found after purchases, flag as honeypot risk

## Example Scenarios

### Scenario 1: Obvious Honeypot
User: "Check 0xbadtoken123 on Ethereum"

Response:
```
[VERDICT: CRITICAL RISK - Likely honeypot detected]

Token: BadToken (0xbadtoken123)
Network: Ethereum
Risk Level: CRITICAL (95% confidence)

KEY METRICS (24h)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Volume:       $1.2M
Liquidity:    $850K in 1 pool
Transactions: 247 buys / 3 sells
Price:        $0.0012 (-8% 24h)

SECURITY FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 CRITICAL ISSUES:
  • Buy/sell ratio: 247:3 (98.8% buys)
  • Zero successful sells in last 100 transactions
  • Extreme slippage asymmetry (2% buy, 50% sell)

⚠️ WARNINGS:
  • Liquidity concentrated in 1 pool (100%)
  • Low absolute liquidity ($850K)

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⛔ DO NOT TRADE - Clear honeypot indicators. Users cannot sell tokens.
This is a classic buy-only scam where sell transactions fail or revert.
```

### Scenario 2: Legitimate Token with Some Risk
User: "Is USDC safe on Base?"

Response:
```
[VERDICT: LOW RISK - Established stablecoin]

Token: USD Coin (USDC)
Network: Base
Risk Level: LOW (strong indicators)

KEY METRICS (24h)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Volume:       $245M
Liquidity:    $580M across 8 pools
Transactions: 2,847 buys / 2,756 sells
Price:        $1.00 (±0.02% 24h)

SECURITY FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ POSITIVE INDICATORS:
  • Balanced buy/sell ratio (51% buys, 49% sells)
  • High liquidity ($580M total)
  • Distributed across 8 pools (largest: 22%)
  • Established token (3+ years)
  • Stablecoin price maintenance

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Safe to trade. Standard stablecoin with proper mechanics and liquidity.
Liquidity distribution and buy/sell balance indicate healthy market.
```

### Scenario 3: Suspicious New Token
User: "Should I invest in this new token 0xnewtoken on Base?"

Response:
```
[VERDICT: HIGH RISK - Multiple red flags]

Token: NewShitcoin (0xnewtoken)
Network: Base
Risk Level: HIGH (multiple indicators)

KEY METRICS (24h)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Volume:       $145K
Liquidity:    $15K in 1 pool
Transactions: 892 buys / 47 sells
Price:        $0.0045 (±65% 24h)

SECURITY FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 CRITICAL ISSUES:
  • Token age: 2 days old
  • Buy/sell ratio: 892:47 (94.8% buys) - very asymmetric

⚠️ WARNINGS:
  • Extremely low liquidity ($15K total)
  • Single pool dominance (100% concentration)
  • High volatility: 65% price swings in 24h
  • Volume exceeds liquidity by 9.7x (wash trading concern)

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ HIGH-RISK speculative token with typical pump-and-dump indicators.
Recommend: Avoiding, or waiting for token maturity and liquidity growth.
This pattern matches classic rug pull precursors.
```

## Context Integration

This skill works best when:
- Combined with market context from CoinPaprika for wrapped versions (e.g., WBTC on Base)
- Used before trading or providing liquidity
- Referenced in due diligence processes
- Applied when users discover new tokens or ask about unfamiliar tokens
- Used as a protective mechanism before user makes trading decisions

## Limitations

This skill analyzes on-chain data only:
- ✓ Transaction patterns, liquidity, trading activity, slippage
- ✗ Team reputation (check CoinPaprika/social media separately)
- ✗ Project fundamentals (check whitepaper, roadmap)
- ✗ Developer history or background
- ✗ Code audits or smart contract analysis

Always combine with other research for complete due diligence.

## Success Criteria

A successful skill invocation:
1. Validates input and normalizes network names
2. Retrieves accurate token and pool data
3. Analyzes trading patterns with specific numbers
4. Produces clear risk verdict with confidence level
5. Explains findings with actionable insights
6. Never gives investment advice
7. Handles errors gracefully and suggests alternatives
