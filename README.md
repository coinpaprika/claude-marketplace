# CoinPaprika Claude Marketplace

Official Claude Code marketplace providing **two powerful crypto data plugins**:
- **CoinPaprika** - Market data for 8000+ cryptocurrencies
- **DexPaprika** - DeFi analytics across 26+ blockchain networks

**🚀 Complete Bundle**: 2 MCP Servers + 2 Specialized Agents + 14 Slash Commands - all configured automatically!

## Quick Start (2 Options)

### Option 1: Auto-Install (Recommended) ⭐
```bash
git clone https://github.com/coinpaprika/claude-marketplace.git
cd claude-marketplace
# Open in Claude Code and Trust the workspace
```
**That's it!** Everything installs automatically via `.claude/settings.json`

### Option 2: Manual Install
```bash
# In Claude Code
/plugin marketplace add coinpaprika/claude-marketplace

# Install both plugins:
/plugin install coinpaprika@coinpaprika-plugins
/plugin install dexpaprika@coinpaprika-plugins

# Restart Claude Code
```

**No manual MCP setup needed** - both plugins bundle everything!

## What You Get

### 🪙 CoinPaprika Plugin
✅ **MCP Server** - Hosted at `https://mcp.coinpaprika.com/sse` (auto-configured)
✅ **Crypto Analyst Agent** - Market analysis, price tracking, coin research
✅ **33 MCP Tools** - getCoins, getTickers, getCoinById, getExchanges, search, and more
✅ **8000+ Coins** - Comprehensive cryptocurrency market coverage
✅ **7 Slash Commands** - `/coinpaprika:intro`, `/coinpaprika:help`, `/coinpaprika:top`, `/coinpaprika:info`, `/coinpaprika:overview`, `/coinpaprika:search`, `/coinpaprika:health`

### 🔄 DexPaprika Plugin
✅ **MCP Server** - Hosted at `https://mcp.dexpaprika.com/sse` (auto-configured)
✅ **DeFi Analyst Agent** - Scam detection, honeypot analysis, security assessment
✅ **14 MCP Tools** - getNetworks, getTokenDetails, getPoolOHLCV, getTokenPools, and more
✅ **26+ Networks** - Ethereum, BSC, Base, Solana, Polygon, Arbitrum, and more
✅ **7 Slash Commands** - `/dexpaprika:intro`, `/dexpaprika:help`, `/dexpaprika:networks`, `/dexpaprika:trending`, `/dexpaprika:prices`, `/dexpaprika:analyze`, `/dexpaprika:health`

## Quick Test

### Test CoinPaprika
```
/coinpaprika:intro
# Shows quick start guide

/coinpaprika:top
# Shows top cryptocurrencies by market cap

# Or natural language:
Using CoinPaprika, show me Bitcoin price and market cap
```

### Test DexPaprika
```
/dexpaprika:intro
# Shows quick start guide

/dexpaprika:trending
# Shows top DEX pools (specify network like "Base")

# Or natural language:
Using DexPaprika, show top 10 pools on Base by 24h volume
```

## Features

### 🪙 CoinPaprika - Cryptocurrency Market Data

#### 📊 Market Intelligence
- **8000+ Cryptocurrencies**: Complete market coverage with real-time data
- **Price Tracking**: Live prices, market caps, volumes, rankings
- **Historical Data**: OHLCV candlestick data (latest, today, historical)
- **Exchange Data**: Track coins across multiple exchanges and markets
- **Global Metrics**: Total market cap, 24h volume, BTC dominance

#### 🔍 Research & Discovery
- **Powerful Search**: Find coins by name, symbol, or ID
- **Coin Profiles**: Detailed information including teams, events, social links
- **Contract Addresses**: Multi-platform contract tracking
- **Price Converter**: Convert between any cryptocurrency pairs
- **Tags & Categories**: Browse coins by sector or category

#### 🤖 Crypto Analyst Agent
- `@crypto-analyst` - Market analysis, price tracking, research

#### 📝 Slash Commands
- `/coinpaprika:intro` - Quick start guide
- `/coinpaprika:help` - Complete command reference
- `/coinpaprika:top` - Top cryptocurrencies by market cap
- `/coinpaprika:info` - Detailed coin information
- `/coinpaprika:overview` - Global market statistics
- `/coinpaprika:search` - Search for cryptocurrencies
- `/coinpaprika:health` - System diagnostics

---

### 🔄 DexPaprika - DeFi & DEX Analytics

#### 🔒 Security Analysis
- **Scam Detection**: Identifies pump & dumps, rug pulls, clone tokens
- **Honeypot Analysis**: Detects buy/sell asymmetry and liquidity traps
- **Market Manipulation**: Spots wash trading and spoofing
- **Risk Assessment**: LOW/MEDIUM/HIGH/CRITICAL ratings

#### 📊 DeFi Data
- **26+ Networks**: Ethereum, BSC, Base, Solana, Polygon, Arbitrum, and more
- **Real-time Pools**: Liquidity pool data across all major DEXes
- **Token Metrics**: Prices, liquidity, volume, holder counts
- **Historical Charts**: OHLCV candlestick data for pools
- **Transaction Analysis**: Track swaps, adds, removes across pools

#### 🤖 DeFi Analyst Agent
- `@defi-data-analyst` - DeFi analytics and security assessment

#### 📝 Slash Commands
- `/dexpaprika:intro` - Quick start guide
- `/dexpaprika:help` - Complete command reference
- `/dexpaprika:networks` - List all 26+ supported networks
- `/dexpaprika:trending` - Top pools by 24h volume
- `/dexpaprika:prices` - Batch token prices (max 10)
- `/dexpaprika:analyze` - Security and honeypot analysis
- `/dexpaprika:health` - System diagnostics

## Documentation

📖 [**Full Installation Guide**](INSTALLATION.md) - Complete setup, troubleshooting, usage examples
📈 [**Agent Optimization Report**](AGENT_OPTIMIZATION_REPORT.md) - Performance analysis and improvements

## API Rate Limits

**Free Tier**: ~10,000 requests/day (no auth required)

**Best Practices**:
- Use batching for multiple tokens
- Filter stablecoins early
- Cache results during session

## Repository Structure

```
claude-marketplace/
├── .claude/
│   └── settings.json                      # Auto-install configuration
├── .claude-plugin/
│   └── marketplace.json                   # Marketplace definition
├── plugins/
│   ├── coinpaprika-claude-plugin/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json                # Plugin config (MCP + agents + commands)
│   │   ├── .mcp-hosted.json              # MCP server connection
│   │   ├── agents/
│   │   │   └── crypto-analyst.md          # Crypto market analyst agent
│   │   ├── commands/
│   │   │   ├── intro.md
│   │   │   ├── help.md
│   │   │   ├── health.md
│   │   │   ├── top-coins.md
│   │   │   ├── coin-info.md
│   │   │   ├── market-overview.md
│   │   │   └── search.md
│   │   └── README.md
│   └── dexpaprika-claude-plugin/
│       ├── .claude-plugin/
│       │   └── plugin.json                # Plugin config (MCP + agents + commands)
│       ├── .mcp-hosted.json              # MCP server connection
│       ├── agents/
│       │   └── defi-data-analyst.md       # DeFi analyst agent
│       ├── commands/
│       │   ├── intro.md
│       │   ├── help.md
│       │   ├── health.md
│       │   ├── networks.md
│       │   ├── trending.md
│       │   ├── prices.md
│       │   └── analyze.md
│       └── README.md
├── INSTALLATION.md                        # Complete installation guide
├── MCP_IMPLEMENTATION_GUIDE.md            # Backend implementation guide
├── MCP_TEST_RESULTS.md                    # Test results and verification
├── CHANGELOG.md                           # Change history
└── README.md                              # This file
```

## Verification

Check everything is working:
```bash
# 1. Check MCP servers
claude mcp list
# Should show:
# - plugin:coinpaprika:coinpaprika: https://mcp.coinpaprika.com/sse (SSE) - ✓
# - plugin:dexpaprika:dexpaprika: https://mcp.dexpaprika.com/sse (SSE) - ✓

# 2. Check agents
/agents
# Should show: crypto-analyst, defi-data-analyst

# 3. Check CoinPaprika commands
/coinpaprika:intro
# Should show: CoinPaprika quick start guide

# 4. Check DexPaprika commands
/dexpaprika:intro
# Should show: DexPaprika quick start guide

# 5. Run health checks
/coinpaprika:health
/dexpaprika:health
# Both should show: All systems operational
```

## Example Workflows

### CoinPaprika Workflows

**Market Overview**:
```
/coinpaprika:overview
# Shows global crypto market statistics
```

**Research a Coin**:
```
/coinpaprika:info
# Get detailed information about any cryptocurrency
```

**Search for Coins**:
```
/coinpaprika:search
# Find cryptocurrencies by name or symbol
```

**Natural Language Queries**:
```
Using CoinPaprika:
- Show me Bitcoin price and 24h volume
- What are the top 10 cryptocurrencies by market cap?
- Get historical OHLCV data for Ethereum
- Compare prices of BTC, ETH, and SOL
```

### DexPaprika Workflows

**List Supported Networks**:
```
/dexpaprika:networks
# Shows all 26+ blockchain networks available
```

**Show Trending Pools**:
```
/dexpaprika:trending
# Shows top pools by 24h volume on specified network
```

**Analyze Token Security**:
```
/dexpaprika:analyze
# Comprehensive security check for honeypots, rug pulls, manipulation
```

**Natural Language Queries**:
```
Using DexPaprika:
- Show top 10 pools on Base by 24h volume
- Get token details for 0x... on ethereum
- Show 24h OHLCV for pool 0x... on base
- Analyze this token for security risks
```

## Support

- **Issues**: [GitHub Issues](https://github.com/coinpaprika/claude-marketplace/issues)
- **CoinPaprika Docs**: https://docs.coinpaprika.com
- **DexPaprika Docs**: https://docs.dexpaprika.com
- **CoinPaprika API**: https://mcp.coinpaprika.com/openapi
- **DexPaprika API**: https://mcp.dexpaprika.com/openapi
- **CoinPaprika Website**: https://coinpaprika.com
- **DexPaprika Website**: https://dexpaprika.com

## License

MIT - see [LICENSE](LICENSE)

---

**Made with ❤️ by CoinPaprika & DexPaprika Team**
