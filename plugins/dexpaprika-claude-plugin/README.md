# DexPaprika Claude Plugin

A Claude Code plugin that provides access to comprehensive DeFi data from DexPaprika, including DEXes, liquidity pools, tokens, and trading information across 26+ blockchain networks.

## Features

- **26+ Blockchain Networks**: Access data from Ethereum, Solana, Polygon, Arbitrum, Optimism, Base, and many more
- **DEX Discovery**: Find and analyze DEXes across different networks
- **Pool Analytics**: Get detailed information about liquidity pools, including volume, transactions, and price data
- **Token Information**: Access comprehensive token data including prices, liquidity, and trading metrics
- **Historical Data**: Retrieve OHLCV data for technical analysis
- **Real-time Transactions**: Monitor recent trading activity

## Installation

### Option 1: Using the npm package (if available)

The plugin is configured to use the `@coinpaprika/dexpaprika-mcp` npm package. Make sure you have Node.js installed, then:

```bash
# The plugin will automatically install required dependencies when loaded
/plugin install dexpaprika-defi-tools@your-marketplace
```

### Option 2: Using hosted MCP server

If DexPaprika provides a hosted MCP server endpoint, the configuration can be updated in `.mcp.json`:

```json
{
  "mcpServers": {
    "dexpaprika": {
      "url": "https://your-hosted-mcp-server-endpoint"
    }
  }
}
```

## Usage

Once installed, you can access DexPaprika data through Claude using natural language queries:

- "Show me the top pools on Ethereum by volume"
- "What tokens have the highest liquidity on Polygon?"
- "Get historical price data for USDC on Solana"
- "Find DEXes available on Arbitrum"
- "Show recent transactions for this pool address"

## Supported Networks

The plugin provides access to data from 26+ blockchain networks including:

- Ethereum
- Solana
- Polygon
- Arbitrum
- Optimism
- Base
- Avalanche
- Binance Smart Chain
- Fantom
- And many more...

## Development

### Plugin Structure

```
dexpaprika-claude-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── .mcp.json                # MCP server configuration
└── README.md               # This file
```

### Local Testing

To test the plugin locally:

1. Create a development marketplace
2. Add the plugin to your marketplace
3. Install and test the plugin

See the Claude plugin documentation for detailed setup instructions.

## Configuration

The plugin can be configured through the `.mcp.json` file to:
- Use different MCP server endpoints
- Set custom environment variables
- Configure connection parameters

## Troubleshooting

If you encounter issues:

1. Check that Node.js is installed and accessible
2. Verify the npm package is available and correctly named
3. Ensure network connectivity for hosted servers
4. Check Claude's debug output for detailed error messages

## License

MIT License - See plugin.json for details.

## Support

For issues related to:
- Plugin functionality: Check Claude Code documentation
- DexPaprika data: Contact CoinPaprika support
- MCP server issues: Verify server configuration and connectivity
