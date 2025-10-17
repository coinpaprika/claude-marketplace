# CoinPaprika Claude Marketplace

Official Claude Code marketplace for CoinPaprika and DexPaprika plugins.

**🚀 One-Install Bundle**: MCP Server + DeFi Analyst Agent + Slash Commands - all configured automatically!

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
/plugin install dexpaprika-defi-tools@coinpaprika-plugins
# Restart Claude Code
```

**No manual MCP setup needed** - the plugin bundles everything!

## What You Get

✅ **MCP Server** - Hosted at `https://mcp.dexpaprika.com/sse` (auto-configured)
✅ **DeFi Analyst Agent** - Scam detection, honeypot analysis, security assessment
✅ **Slash Commands** - `/dexpaprika:intro`, `/dexpaprika:networks`, `/dexpaprika:trending`, `/dexpaprika:prices`, `/dexpaprika:analyze`
✅ **26+ Networks** - Ethereum, BSC, Base, Solana, Polygon, Arbitrum, and more
✅ **9 MCP Tools** - getNetworks, getTokenDetails, getPoolOHLCV, getTokenPools, etc.

## Quick Test

After installation, try:
```
/dexpaprika:intro
```
This shows the quick start guide and all available commands.

Or test a command:
```
/dexpaprika:trending
```
Then specify "Base" - you should see top pools ranked by 24h volume!

Or test MCP tools directly:
```
Using DexPaprika MCP, show top 10 pools on Base by 24h volume
```

## Features

### 🔍 DeFi Security Analysis
- **Scam Detection**: Identifies pump & dumps, rug pulls, clone tokens
- **Honeypot Analysis**: Detects buy/sell asymmetry and liquidity traps
- **Market Manipulation**: Spots wash trading and spoofing
- **Risk Assessment**: LOW/MEDIUM/HIGH/CRITICAL ratings

### 📊 Available Data
- Real-time token prices and metrics
- Liquidity pool data across 26+ networks
- Historical OHLCV (candlestick) data
- Transaction history and patterns
- DEX aggregation and comparison

### 🤖 Agent Included
- `@defi-data-analyst` - DeFi analytics and security analysis agent

### 📝 Slash Commands
- `/dexpaprika:intro` - Overview and quick start guide
- `/dexpaprika:networks` - List all 26+ supported blockchain networks
- `/dexpaprika:trending` - Show top pools by 24h volume on a network
- `/dexpaprika:prices` - Get batched prices for multiple tokens (max 10)
- `/dexpaprika:analyze` - Analyze a token for security risks and honeypots

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
│   └── settings.json               # Auto-install configuration
├── .claude-plugin/
│   └── marketplace.json            # Marketplace definition
├── plugins/
│   └── dexpaprika-claude-plugin/
│       ├── .claude-plugin/
│       │   └── plugin.json         # Plugin config (MCP + agents + commands)
│       ├── agents/
│       │   └── defi-data-analyst.md       # DeFi analyst agent
│       ├── commands/
│       │   ├── intro.md
│       │   ├── networks.md
│       │   ├── trending.md
│       │   ├── prices.md
│       │   └── analyze.md
│       └── README.md
├── INSTALLATION.md                 # Complete installation guide
├── AGENT_OPTIMIZATION_REPORT.md   # Agent improvements and analysis
└── README.md                       # This file
```

## Verification

Check everything is working:
```bash
# 1. Check MCP server
claude mcp list
# Should show: plugin:dexpaprika-defi-tools:dexpaprika: https://mcp.dexpaprika.com/sse (SSE) - ✓

# 2. Check agents
/agents
# Should show: defi-data-analyst

# 3. Check commands
/dexpaprika:intro
# Should show: DexPaprika quick start guide
```

## Example Workflows

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

**Direct MCP Usage**:
```
Using DexPaprika MCP:
1. List all supported blockchain networks
2. Get token details for 0x... on ethereum
3. Show 24h OHLCV for pool 0x... on base
```

## Support

- **Issues**: [GitHub Issues](https://github.com/coinpaprika/claude-marketplace/issues)
- **Documentation**: https://mcp.dexpaprika.com/openapi
- **Website**: https://dex.paprika.tools

## License

MIT - see [LICENSE](LICENSE)

---

**Made with ❤️ by CoinPaprika & DexPaprika**
