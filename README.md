# CoinPaprika Claude Marketplace

Official Claude Code marketplace for CoinPaprika and DexPaprika plugins.

## Quick Start

To install the DexPaprika plugin, run these two commands:

```bash
# 1. Add the marketplace
claude plugin marketplace add coinpaprika/claude-marketplace

# 2. Add the MCP server (IMPORTANT: include --transport sse)
claude mcp add --transport sse dexpaprika https://mcp.dexpaprika.com/sse
```

## Installation

### Step 1: Add the Marketplace

```bash
claude plugin marketplace add coinpaprika/claude-marketplace
```

### Step 2: Add the MCP Server

```bash
claude mcp add --transport sse dexpaprika https://mcp.dexpaprika.com/sse
```

### Step 3: Verify Installation

```bash
claude mcp list
```

You should see:
```
dexpaprika: https://mcp.dexpaprika.com/sse (SSE) - ✓ Connected
```

## Smoke tests

- "List supported networks from DexPaprika"
- "Show top pools on ethereum by 24h volume"

## Plan limits

Free plans guarantee roughly 10,000 requests per day. Please avoid bursty traffic.

## Structure

```
claude-marketplace/
├── .claude-plugin/marketplace.json
└── plugins/
    └── dexpaprika-claude-plugin/
        ├── .claude-plugin/plugin.json
        ├── .mcp.json
        └── commands/intro.md
```
