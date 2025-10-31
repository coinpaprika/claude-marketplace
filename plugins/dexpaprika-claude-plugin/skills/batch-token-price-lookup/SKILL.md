# Batch Token Price Lookup Skill

## Description
Automatically fetches current prices for multiple tokens on any supported blockchain network when users ask about token prices, price comparisons, or market prices.

## When This Skill Activates

Claude will use this skill when:
- User asks for current prices of one or more tokens
- User wants to compare prices across multiple tokens
- User asks "What's the price of X and Y?"
- User mentions price checking or price monitoring
- User needs quick price snapshot before trading
- A URL contains token addresses that need pricing

**Examples that trigger this skill:**
- "What's the current price of USDC and ETH on Base?"
- "Show me prices for these tokens: 0x123... and 0x456..."
- "What are the prices of SOL, USDC, and BONK on Solana?"
- "Check the current price of this token"
- "How much does this cost right now?"
- "Give me a price check on USDT across different chains"

## How It Works

When activated, this skill performs efficient price lookups:

### Stage 1: Input Validation
- Extract network and token addresses/symbols from user input
- Normalize network name (e.g., "Ethereum" → "ethereum", "BSC" → "bsc")
- Validate address format or resolve symbols
- Call `getCapabilities()` to load network synonyms
- Validate token count (max 10 per request)

### Stage 2: Price Collection
Using DexPaprika MCP tools:
1. Call `getTokenMultiPrices(network, [addresses])` - Get batch prices for up to 10 tokens
2. If more than 10 tokens needed, make multiple requests
3. Retrieve current price, 24h change, and trading volume

### Stage 3: Data Formatting

Output format:
```
CURRENT PRICES - [Network Name]
═══════════════════════════════════════════════════════════

Token Name (Symbol) | Address | Price | 24h Change
────────────────────────────────────────────────────────────
[Token] | [addr] | $X.XX | +X% / -X%
[Token] | [addr] | $X.XX | +X% / -X%
[Token] | [addr] | $X.XX | +X% / -X%

Data from: DexPaprika | [timestamp]
```

## Tools Available

You have access to:
- `getTokenMultiPrices(network, tokens)` - Get prices for up to 10 tokens at once
- `getTokenDetails(network, address)` - Get detailed token info including price
- `getCapabilities()` - Get network synonyms and validation rules
- `getNetworks()` - List supported blockchains

## Important Guidelines

1. **Batch Efficiently**
   - Group requests to minimize API calls
   - Max 10 tokens per call
   - Split into multiple requests if needed

2. **Normalize Input**
   - Always call `getCapabilities()` first to load network synonyms
   - User says "Solana" → normalize to "solana"
   - User says "Base Mainnet" → normalize to "base"

3. **Handle Multiple Networks**
   - If user asks for prices on multiple networks, clarify which network
   - Or make separate requests per network
   - Example: "USDC on Base" vs "USDC on Ethereum" are different

4. **Address Resolution**
   - If user provides symbol (SOL, USDC), try to resolve to address
   - If resolution fails, ask user for explicit address
   - Support both symbol lookup and direct address input

5. **Display Clearly**
   - Show prices with consistent decimal places
   - Include network name prominently
   - Highlight large price movements (>10%)
   - Sort by relevance (most requested tokens first)

6. **Provide Context**
   - Include 24h price change when available
   - Show trading volume if available
   - Mention source DEX if applicable
   - Add timestamp for price accuracy

7. **Error Handling**
   - Token not found → suggest checking address or network
   - Invalid network → list available networks
   - Price unavailable → explain why (new token, low liquidity)

## Example Scenarios

### Scenario 1: Simple Price Comparison
User: "What's the price of USDC and DAI on Base?"

Response:
```
CURRENT PRICES - Base Mainnet
═══════════════════════════════════════════════════════════

Token Name (Symbol)        | Address              | Price   | 24h Change
─────────────────────────────────────────────────────────────────────────
USD Coin (USDC)            | 0x833589...         | $1.0002 | -0.02%
Dai Stablecoin (DAI)       | 0x50c556...         | $1.0001 | +0.01%

Data from: DexPaprika | 2025-10-31 14:30 UTC
```

### Scenario 2: Multi-Token Batch
User: "Show me prices for: USDC, ETH, SOL, BONK on their native chains"

Response:
```
CURRENT PRICES - Multi-Chain
═══════════════════════════════════════════════════════════

Base Mainnet:
  USD Coin (USDC)          | $1.0002 | -0.02%
  Ether (ETH)              | $2,845  | +2.5%

Solana:
  Solana (SOL)             | $152.45 | +5.2%
  Bonk (BONK)              | $0.00045 | -3.1%

Data from: DexPaprika | 2025-10-31 14:30 UTC
```

### Scenario 3: New Token Price
User: "What's the price of this token? 0xabc123... on Solana"

Response:
```
CURRENT PRICE - Solana
═══════════════════════════════════════════════════════════

Token: NewToken (NEW)
Address: 0xabc123...
Current Price: $0.0234
24h Change: +120% (high volatility)
24h Volume: $450K
Liquidity: $85K

⚠️ Note: New token detected (created within 7 days)
- Limited trading history
- Price may be volatile
- Low liquidity - use caution

Recommendation: Run security analysis before trading
Data from: DexPaprika | 2025-10-31 14:30 UTC
```

### Scenario 4: Price Not Available
User: "What's the price of 0xdeadbeef on Ethereum?"

Response:
```
⚠️ PRICE UNAVAILABLE

Token Address: 0xdeadbeef (Ethereum)
Status: Not found or insufficient liquidity

Possible reasons:
- Token address is incorrect or malformed
- Token doesn't exist on this network
- Token has no trading pairs/liquidity
- Token was delisted or removed

Suggestions:
- Verify the token address (should be 42 characters, start with 0x)
- Check the correct network (this is Ethereum data)
- Try "Token Security Analyzer" to validate if token exists

Need help? You can:
1. Double-check the address
2. Ask for security analysis on the token
3. Search for the token on a different network
```

## Context Integration

This skill works best when:
- Combined with Token Security Analyzer for safety checks before trading
- Combined with Technical Analyzer for chart analysis
- Used before any trading decision
- Cross-referenced with market conditions
- Used for quick price snapshots in conversations

## Limitations

This skill provides:
- ✓ Current prices from DexPaprika
- ✓ Price history and 24h changes
- ✓ Trading volume metrics
- ✓ Multi-token batch lookups
- ✗ Historical price charts (use Technical Analyzer)
- ✗ Advanced market analysis (use Technical Analyzer)
- ✗ Fundamental data (use Crypto Market Search)

## Success Criteria

A successful skill invocation:
1. Validates and normalizes all inputs
2. Makes efficient batch API calls (max 10 tokens)
3. Displays prices clearly with network context
4. Includes 24h change and volume
5. Handles errors gracefully with suggestions
6. Never assumes or guesses prices
7. Provides timestamp for price accuracy
8. Suggests related skills when appropriate (security, technical analysis)
