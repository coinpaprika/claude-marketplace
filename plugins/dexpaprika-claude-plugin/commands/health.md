---
description: Verify plugin installation and check system health
---

# DexPaprika Plugin - Health Check

Run diagnostics to verify your plugin is properly configured and operational.

## Running Health Check

This command will:
1. ✓ Test MCP server connectivity
2. ✓ Verify available tools
3. ✓ Check rate limit status
4. ✓ Test sample API calls
5. ✓ Validate network access
6. ✓ Report any issues

## Diagnostics

**Testing connectivity to DexPaprika MCP server...**

Please call the following MCP tools to verify functionality:

### 1. Server Connectivity Test
```
Call: getNetworks()
Expected: Should return list of 26+ supported blockchain networks
```

If successful: ✓ MCP server is connected and responsive

If failed: Check that MCP server is configured:
```bash
claude mcp list
```

Should show:
```
plugin:dexpaprika:dexpaprika: https://mcp.dexpaprika.com/sse (SSE) - ✓ Connected
```

### 2. Tool Availability Test
```
If getCapabilities tool exists:
  Call: getCapabilities()
  Expected: Returns tool list, network synonyms, validation rules, rate limits

Otherwise:
  Assume tools are available if getNetworks worked
```

### 3. Network Validation
```
Call: getNetworks()

Verify response includes key networks:
- ethereum
- bsc (Binance Smart Chain)
- polygon
- base
- arbitrum
- optimism
- solana
- avalanche

Total count should be 26+
```

### 4. Rate Limit Check
```
Check response metadata for rate_limit information:
{
  "meta": {
    "rate_limit": {
      "limit": 10000,
      "remaining": 9XXX,
      "used": XXX,
      "percentage_used": X.X%
    }
  }
}
```

If percentage_used:
- < 80%: ✓ Plenty of quota remaining
- 80-90%: ⚠️ Approaching limit
- 90-95%: ⚠️ High usage - use batching and caching
- >95%: 🛑 Nearly exhausted - wait for reset

### 5. Data Quality Test
```
Call: getNetworkPools("ethereum", limit=5)
Expected: Should return top 5 pools on Ethereum by volume
```

Verify response includes:
- `pools` array with 5 items
- Each pool has: `id`, `volume_usd`, `liquidity_usd`, `transactions`
- Volumes are reasonable (> $0)

### 6. Token Price Test
```
Call: getTokenDetails("ethereum", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
Note: This is USDC on Ethereum

Expected: Should return token details with price near $1.00
```

## Health Status Report

After running checks above, status should show:

```
DEXPAPRIKA PLUGIN HEALTH STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ MCP Server Connected
  URL: https://mcp.dexpaprika.com/sse
  Transport: SSE
  Response Time: [X]ms

✓ Tools Available
  Total Tools: 10+
  Categories: Discovery, Pools, Tokens, Search

✓ Networks Accessible
  Total Networks: 26+
  Test Network (Ethereum): ✓ Accessible
  Major Networks: ✓ All available

✓ Rate Limit Status
  Used: [X] / 10,000 requests ([X.X%])
  Remaining: [X,XXX]
  Resets: [timestamp]
  Status: [Healthy/Caution/Critical]

✓ Data Quality
  Pool Data: ✓ Valid
  Token Prices: ✓ Accurate
  Recent Data: ✓ Timestamps current

✓ Commands Available
  - /dexpaprika:help
  - /dexpaprika:intro
  - /dexpaprika:networks
  - /dexpaprika:trending
  - /dexpaprika:prices
  - /dexpaprika:analyze
  - /dexpaprika:health

✓ Agents Available
  - @defi-data-analyst (Security Analysis)

OVERALL STATUS: ✓ ALL SYSTEMS OPERATIONAL
```

## Common Issues

### Issue: MCP Server Not Connected

**Symptoms**:
- "No MCP server found" error
- Tools not available
- Connection timeouts

**Solutions**:
1. Check MCP configuration:
   ```bash
   claude mcp list
   ```

2. Verify URL and transport type:
   ```
   URL: https://mcp.dexpaprika.com/sse
   Transport: SSE (Server-Sent Events)
   ```

3. Test connectivity:
   ```bash
   curl https://mcp.dexpaprika.com/sse
   ```

4. Restart Claude Code if needed

### Issue: "Invalid Network" Errors

**Symptoms**:
- 400 errors for network names
- "Network not recognized" messages

**Solutions**:
1. Use canonical network IDs: `ethereum`, `bsc`, `polygon`, `base`
2. Run `/dexpaprika:networks` to see full list
3. Network synonyms should work automatically (e.g., "Binance Smart Chain" → `bsc`)
4. If getCapabilities exists, check `network_synonyms` mapping

### Issue: "Too Many Tokens" Error

**Symptoms**:
- Error code `DP400_TOO_MANY_TOKENS`
- Batch price requests fail

**Solutions**:
1. **Max 10 tokens** per `getTokenMultiPrices` request
2. Split larger requests:
   ```
   Batch 1: tokens 1-10
   Batch 2: tokens 11-20
   etc.
   ```
3. Claude should handle splitting automatically

### Issue: Rate Limit Exceeded

**Symptoms**:
- 429 error codes
- "Rate limit exceeded" messages
- Code: `DP429_RATE_LIMIT`

**Solutions**:
1. Wait for rate limit reset (shown in error message)
2. Use batch endpoints (getTokenMultiPrices for multiple tokens)
3. Cache frequently accessed data
4. Use field projection to reduce payload size

### Issue: Token/Pool Not Found

**Symptoms**:
- 404 errors
- Code: `DP404_NOT_FOUND`
- Empty results

**Solutions**:
1. Verify token address format:
   - EVM: `0x` + 40 hex characters
   - Solana: Base58, 32-44 characters
2. Check correct network (token exists on Ethereum but querying BSC)
3. Token may be very new (< 24h) with no data yet
4. Use `search` to find token across all networks

### Issue: Stale or Missing Data

**Symptoms**:
- Old timestamps
- Zero volume pools
- Missing price data

**Solutions**:
1. Pool/token may be inactive (no recent trades)
2. Verify pool address is correct
3. Check timestamp - data should be < 5 minutes old
4. Try different pool if available
5. Report persistent issues to DexPaprika support

## Performance Benchmarks

Expected response times:

| Operation | Expected Time | Acceptable Range |
|-----------|---------------|------------------|
| getNetworks | 100-200ms | < 400ms |
| getNetworkPools | 300-600ms | < 1000ms |
| getTokenDetails | 200-400ms | < 800ms |
| getTokenPools | 300-600ms | < 1000ms |
| getPoolDetails | 200-400ms | < 800ms |
| getPoolOHLCV | 400-800ms | < 1500ms |
| getTokenMultiPrices | 300-600ms | < 1000ms |
| search | 400-800ms | < 1500ms |

If response times consistently exceed acceptable range:
- Network connectivity issues
- Server load (try again later)
- Large dataset requested (reduce limit or use field projection)
- Specific network may be slow (Solana data sometimes slower)

## Rate Limit Guidelines

To stay within the 10,000 requests/day limit:

**Low Usage** (< 2000/day):
- Individual token/pool queries
- Spot checks
- Security analysis

**Medium Usage** (2000-5000/day):
- Portfolio tracking
- Regular pool monitoring
- Multiple network queries

**High Usage** (5000-8000/day):
- Comprehensive research
- Multi-token analysis
- Historical data pulls
- Use batching (getTokenMultiPrices)

**Very High Usage** (> 8000/day):
- Automated monitoring
- Extensive analysis
- Must use batching and caching
- Use field projection (`?fields=pools,page_info`)

## Network-Specific Notes

### Ethereum
- Most data available
- Highest pool counts
- Best for testing

### Solana
- Different address format (Base58)
- Pool IDs may be longer
- Some operations slightly slower

### Base, Arbitrum, Optimism
- L2 networks
- Faster, cheaper transactions
- Growing pool ecosystems

### BSC, Polygon, Avalanche
- High activity
- Many pools available
- Popular for DeFi

## Next Steps

If all checks pass:
- ✓ Plugin is ready to use
- ✓ Try `/dexpaprika:intro` for getting started
- ✓ Use `/dexpaprika:help` for full reference
- ✓ Invoke `@defi-data-analyst` for security analysis

If any checks fail:
- Review error messages above
- Check MCP server configuration
- Consult troubleshooting section
- Visit: https://github.com/coinpaprika/claude-marketplace/issues

## Additional Validation

For comprehensive testing, try these workflows:

**1. Trending Analysis**:
```
/dexpaprika:trending
Network: Ethereum
Should show top 10 pools with volume data
```

**2. Token Security Check**:
```
/dexpaprika:analyze
Token: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
Network: ethereum
Should identify USDC as safe, established stablecoin
```

**3. Batch Pricing**:
```
/dexpaprika:prices
Network: ethereum
Tokens: USDC, USDT, DAI
Should return prices near $1 for all three stablecoins
```

---

**Last Updated**: [Run this command to see current status]
