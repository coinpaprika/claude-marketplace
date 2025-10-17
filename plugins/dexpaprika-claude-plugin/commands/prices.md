---
description: Get batched prices for multiple tokens (max 10)
---

# Batch Token Prices

Get current prices for multiple tokens on a specified network in a single efficient request.

**Available User Input**:
- Network (e.g., "ethereum", "base", "bsc", "solana")
- Token addresses (up to 10)

**Instructions**:
1. If user didn't specify network or tokens, ask: "Which network and which token addresses (up to 10)?"
2. Normalize network name
3. Validate that token count ≤ 10
4. Call `getTokenMultiPrices(network, tokens)` with comma-separated addresses
5. Display prices with token symbols/names if available

**Output Format**: Display as a clear list:
- Token symbol/name
- Contract address
- Current price (USD)
- Source pool or DEX

**Note**: Maximum 10 tokens per request. For more tokens, split into multiple requests.
