# CoinPaprika Claude Marketplace

Official Claude Code marketplace for CoinPaprika and DexPaprika plugins.

## Install

```bash
/plugin marketplace add coinpaprika/claude-marketplace
/plugin install dexpaprika-defi-tools@coinpaprika-plugins
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
