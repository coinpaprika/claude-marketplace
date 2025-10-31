# DexPaprika Claude Plugin

A Claude Code plugin that provides access to comprehensive DeFi data from DexPaprika, including DEXes, liquidity pools, tokens, and trading information across 26+ blockchain networks.

## Features

- **26+ Blockchain Networks**: Access data from Ethereum, Solana, Polygon, Arbitrum, Optimism, Base, and many more
- **DEX Discovery**: Find and analyze DEXes across different networks
- **Pool Analytics**: Get detailed information about liquidity pools, including volume, transactions, and price data
- **Token Information**: Access comprehensive token data including prices, liquidity, and trading metrics
- **Historical Data**: Retrieve OHLCV data for technical analysis
- **Real-time Transactions**: Monitor recent trading activity
- **Batched Price Queries**: Efficiently fetch prices for up to 10 tokens in a single request
- **Smart Network Normalization**: User-friendly network names automatically converted to API format
- **Optimized Payloads**: Field projection support for compact, efficient responses

## Installation

### Prerequisites

- Claude Code CLI installed
- Internet connection for accessing the hosted MCP server

### Step-by-Step Installation

#### Step 1: Add the CoinPaprika Marketplace

```bash
claude plugin marketplace add coinpaprika/claude-marketplace
```

This command clones the marketplace repository and makes the DexPaprika plugin available.

#### Step 2: Add the DexPaprika MCP Server

**IMPORTANT:** You must specify the `--transport sse` flag for the SSE (Server-Sent Events) server:

```bash
claude mcp add --transport sse dexpaprika https://mcp.dexpaprika.com/sse
```

⚠️ **Common Mistake:** Do NOT forget the `--transport sse` flag! Without it, the server will be configured incorrectly and won't connect.

#### Step 3: Verify Installation

```bash
claude mcp list
```

Expected output:
```
dexpaprika: https://mcp.dexpaprika.com/sse (SSE) - ✓ Connected
```

If you see "✓ Connected", the installation was successful!

## Quick Start

### Skills (Automatic Analysis)

DexPaprika provides **4 automatic skills** that Claude uses without needing slash commands:

1. **Token Security Analyzer** - Automatically analyzes tokens for honeypots, scams, and security risks
2. **Technical Analyzer** - Analyzes OHLCV data for candlestick patterns and technical indicators
3. **Batch Token Price Lookup** - Fetches current prices for multiple tokens
4. **Trending Pools Analyzer** - Shows top pools ranked by 24-hour trading volume

Just ask Claude naturally and it will use the appropriate skill:
- "Is this token safe?" → Uses Token Security Analyzer
- "Analyze the 4h chart" → Uses Technical Analyzer
- "What's the price of USDC and ETH?" → Uses Batch Token Price Lookup
- "What's trending on Solana?" → Uses Trending Pools Analyzer

### Using the Agent

For comprehensive DeFi analysis, use the DeFi data analyst agent:

```
@defi-data-analyst
```

The agent specializes in:
- Honeypot detection and scam identification
- Risk assessment and rug pull analysis
- Market manipulation detection
- Token security evaluation

## Usage

Once installed, you can access DexPaprika data through Claude using natural language queries:

### Basic Queries

- "Show me the top pools on Ethereum by volume"
- "What tokens have the highest liquidity on Polygon?"
- "Get historical price data for USDC on Solana"
- "Find DEXes available on Arbitrum"
- "Show recent transactions for this pool address"

### Advanced Queries

- "Get prices for these 5 tokens on Base: [addresses]" (batched pricing)
- "Find trending pools on binance smart chain" (auto-normalizes to 'bsc')
- "Show compact pool data with only volume and price fields"
- "Search for Jupiter token across all networks"

## Best Practices

### 1. Always Start with getCapabilities

Call `getCapabilities` at the beginning of your session to:
- Learn available workflow patterns
- Get network synonyms for normalization
- Understand common pitfalls
- See API version and features

### 2. Batched Price Queries

When fetching multiple token prices:
- **Maximum 10 tokens** per request
- **Format**: Comma-separated string: `"0xabc...,0xdef...,0x123..."`
- Pre-validate array length on client-side
- Handle missing tokens gracefully (unpriced tokens are omitted)

Example:
```
"Get batched prices for USDC, USDT, DAI, WETH, and WBTC on Ethereum"
```

### 3. Network Normalization

User-friendly network names are automatically converted:
- "Binance Smart Chain" / "BNB Chain" → `bsc`
- "Polygon" → `polygon`
- "Base" → `base`

The plugin handles this automatically using synonyms from `getCapabilities`.

### 4. Optimized Responses

For large datasets, request specific fields:
- Use field projection: `fields=pools,page_info`
- Reduces bandwidth and improves performance
- Particularly useful for pool listings and token searches

### 5. Error Handling

The plugin provides intelligent error handling:
- **Structured 400 errors** with `code`, `message`, `hint`, and `corrected_example`
- Automatic retry suggestions for correctable errors
- Client-side validation to prevent common mistakes

## Recommended Workflows

### Workflow 1: Trending Snapshot
```
1. List all networks
2. Get top 10 pools by volume on desired network
3. Optional: Use field projection for compact view
```

### Workflow 2: Token Deep Dive
```
1. Search for token by name or address
2. Get token details (price, FDV, metrics)
3. Find all pools containing the token
4. Analyze pool transactions and history
```

### Workflow 3: Batched Price Monitoring
```
1. Collect up to 10 token addresses
2. Request batched prices in single call
3. Monitor price changes over time
4. Handle missing/unpriced tokens gracefully
```

### Workflow 4: Pool Performance Analysis
```
1. Get current pool details (state, volume, transactions)
2. Fetch historical OHLCV data for trends
3. Review recent transactions for activity patterns
4. Compare across different time intervals
```

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

## API Tools Reference

### Core Functions

- **getCapabilities**: Load workflows, synonyms, and best practices (always call first!)
- **getNetworks**: List all 26+ supported blockchain networks
- **getStats**: High-level ecosystem statistics

### DEX & Pool Tools

- **getNetworkDexes**: Find DEXes on a specific network
- **getNetworkPools**: Get top liquidity pools (PRIMARY pool function)
- **getDexPools**: Filter pools by specific DEX
- **getPoolDetails**: Comprehensive pool data
- **getPoolOHLCV**: Historical price data (OHLCV)
- **getPoolTransactions**: Recent trading activity

### Token Tools

- **getTokenDetails**: Token metadata, price, FDV, metrics
- **getTokenPools**: Find all pools containing a token
- **getTokenMultiPrices**: Batched prices (up to 10 tokens)

### Search Tools

- **search**: Global search across ALL networks for tokens, pools, DEXes

## Configuration

The plugin can be configured through the `.mcp.json` file to:
- Use different MCP server endpoints (hosted at `https://mcp.dexpaprika.com/sse`)
- Set custom environment variables
- Configure connection parameters

### Hosted MCP Server

The plugin uses the hosted DexPaprika MCP server at:
```
https://mcp.dexpaprika.com/sse
```

Additional endpoints:
- **OpenAPI Spec**: `https://mcp.dexpaprika.com/openapi`
- **Capabilities**: `https://mcp.dexpaprika.com/api/capabilities`

## Troubleshooting

### Installation Issues

**MCP Server Not Connecting?**

If you see "No MCP servers configured" or the server shows as disconnected:

1. **Verify you used the correct command with `--transport sse`:**
   ```bash
   claude mcp list
   ```

2. **If missing the SSE transport, remove and re-add:**
   ```bash
   claude mcp remove dexpaprika
   claude mcp add --transport sse dexpaprika https://mcp.dexpaprika.com/sse
   ```

3. **Verify the connection:**
   ```bash
   claude mcp list
   ```
   Should show: `dexpaprika: https://mcp.dexpaprika.com/sse (SSE) - ✓ Connected`

### Common Runtime Issues

If you encounter issues during use:

1. **Network Issues**: Verify connectivity to `mcp.dexpaprika.com`
2. **Invalid Network Names**: Use `getCapabilities` to get valid network IDs and synonyms
3. **Too Many Tokens**: Batched price requests limited to 10 tokens maximum
4. **Missing Data**: Some tokens may not have price data (they're omitted from results)
5. **Debug Output**: Check Claude's debug output for detailed error messages

### Common Error Codes

- **DP400_TOO_MANY_TOKENS**: Exceeded 10 token limit in batched price request
- **DP400_INVALID_NETWORK**: Network ID not recognized (use synonyms from `getCapabilities`)
- **DP400_MISSING_TOKENS**: No tokens provided in batched price request

When you receive a 400 error, check for `error.corrected_example` which shows the correct format.

## Performance Tips

1. **Use Field Projection**: Request only needed fields with `?fields=pools,page_info`
2. **Batch Price Requests**: Fetch up to 10 token prices in one call instead of multiple requests
3. **Cache getCapabilities**: No need to call it repeatedly in the same session
4. **Parallel Requests**: When fetching data from multiple networks, make parallel calls

## License

MIT License - See plugin.json for details.

## Resources

- **Plugin Homepage**: <https://mcp.dexpaprika.com>
- **API Documentation**: <https://mcp.dexpaprika.com/openapi>
- **Capabilities Endpoint**: <https://mcp.dexpaprika.com/api/capabilities>
- **GitHub Repository**: <https://github.com/coinpaprika/claude-marketplace>

## Support

For issues related to:
- **Plugin functionality**: Check Claude Code documentation
- **DexPaprika data**: Contact CoinPaprika support
- **MCP server issues**: Verify server configuration and connectivity at `mcp.dexpaprika.com`
- **Feature requests**: Submit to the GitHub repository
