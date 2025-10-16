---
name: analyze-token
description: Analyze a token for scams, honeypots, and security risks using the DeFi data analyst
---

Invoke the DeFi data analyst agent to perform comprehensive security analysis on the specified token.

**Task**: Analyze the token provided by the user for:
- Scam indicators (pump & dump, rug pull signals, clone tokens)
- Honeypot detection (buy/sell asymmetry, liquidity traps)
- Market manipulation (wash trading, spoofing)
- Security risk assessment
- Stablecoin identification

**Available User Input**:
- Network (e.g., "ethereum", "bsc", "base", "solana")
- Token address OR token name/symbol
- Optional: timeframe for analysis (default 24h)

**Instructions**:
1. If user didn't specify network or token, ask: "Which network and token address/symbol would you like to analyze?"
2. Normalize network name (e.g., "Binance Smart Chain" → "bsc", "Ethereum" → "ethereum")
3. Use DexPaprika MCP tools to gather data
4. Apply security framework to detect scams/honeypots
5. Return concise security report with risk level

**Output Format**: Use concise format (15-20 lines) with:
- One-line verdict
- Key metrics (price, volume, liquidity, transactions)
- Security findings (✓ positive, ⚠️ warnings, ❌ critical issues)
- Clear recommendation
