---
description: Verify plugin installation and check system health
---

# CoinPaprika Plugin - Health Check

Run diagnostics to verify your plugin is properly configured and operational.

## Running Health Check

This command will:
1. ✓ Test MCP server connectivity
2. ✓ Verify available tools
3. ✓ Check rate limit status
4. ✓ Test sample API call
5. ✓ Report any issues

## Diagnostics

**Testing connectivity to CoinPaprika MCP server...**

Please call the following MCP tools to verify functionality:

### 1. Server Connectivity Test
```
Call: getGlobalMarketOverview()
Expected: Should return global market statistics
```

If successful: ✓ MCP server is connected and responsive

If failed: Check that MCP server is configured:
```bash
claude mcp list
```

Should show:
```
plugin:coinpaprika:coinpaprika: https://mcp.coinpaprika.com/sse (SSE) - ✓ Connected
```

### 2. Tool Availability Test
```
If getCapabilities tool exists:
  Call: getCapabilities()
  Expected: Returns tool list, validation rules, rate limits

Otherwise:
  Assume tools are available if getGlobalMarketOverview worked
```

### 3. Rate Limit Check
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
- 90-95%: ⚠️ High usage - consider caching
- >95%: 🛑 Nearly exhausted - wait for reset

### 4. Data Quality Test
```
Call: getTicker("btc-bitcoin")
Expected: Should return current Bitcoin price and market data
```

Verify response includes:
- `price` (number)
- `market_cap` (number)
- `volume_24h` (number)
- `price_change_24h` (percentage)

## Health Status Report

After running checks above, status should show:

```
COINPAPRIKA PLUGIN HEALTH STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ MCP Server Connected
  URL: https://mcp.coinpaprika.com/sse
  Transport: SSE
  Response Time: [X]ms

✓ Tools Available
  Total Tools: 14
  Categories: Market, Coins, Search, Exchanges, Historical

✓ Rate Limit Status
  Used: [X] / 10,000 requests ([X.X%])
  Remaining: [X,XXX]
  Resets: [timestamp]
  Status: [Healthy/Caution/Critical]

✓ Data Quality
  Sample API call: SUCCESS
  Bitcoin Price: $[X,XXX]
  Data Timestamp: [recent]

✓ Commands Available
  - /coinpaprika:help
  - /coinpaprika:intro
  - /coinpaprika:overview
  - /coinpaprika:top
  - /coinpaprika:info
  - /coinpaprika:search
  - /coinpaprika:health

✓ Agents Available
  - @crypto-analyst (Market Analysis)

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

2. Verify URL is correct:
   ```
   https://mcp.coinpaprika.com/sse
   ```

3. Test connectivity:
   ```bash
   curl https://mcp.coinpaprika.com/sse
   ```

4. Restart Claude Code if needed

### Issue: Rate Limit Exceeded

**Symptoms**:
- 429 error codes
- "Rate limit exceeded" messages

**Solutions**:
1. Wait for rate limit reset (shown in error message)
2. Use caching for frequently accessed data
3. Reduce number of API calls
4. Use batch endpoints when available

### Issue: "Coin not found" Errors

**Symptoms**:
- 404 errors for coin lookups
- "Invalid coin ID" messages

**Solutions**:
1. Use correct coin ID format: `symbol-name` (e.g., `btc-bitcoin`)
2. Use search to find correct ID:
   ```
   /coinpaprika:search bitcoin
   ```
3. Check for typos in coin ID

### Issue: Stale or Missing Data

**Symptoms**:
- Old timestamps on data
- Missing fields in responses
- Incomplete information

**Solutions**:
1. Verify coin is still active (not delisted)
2. Check if coin has sufficient trading history
3. Try different endpoints for same data
4. Report data issues to CoinPaprika support

## Performance Benchmarks

Expected response times:

| Operation | Expected Time | Acceptable Range |
|-----------|---------------|------------------|
| getGlobalMarketOverview | 150-300ms | < 500ms |
| getTicker (single) | 100-200ms | < 400ms |
| getTickers (100 coins) | 500-1000ms | < 2000ms |
| getCoinById | 150-300ms | < 500ms |
| getHistoricalTicks | 300-800ms | < 2000ms |
| searchCoins | 200-400ms | < 600ms |

If response times consistently exceed acceptable range:
- Network connectivity issues
- Server load (try again later)
- Large dataset requested (reduce limit)

## Rate Limit Guidelines

To stay within the 10,000 requests/day limit:

**Low Usage** (< 2000/day):
- Individual queries anytime
- Real-time price checks
- Ad-hoc research

**Medium Usage** (2000-5000/day):
- Portfolio tracking (multiple coins)
- Regular market monitoring
- Historical analysis

**High Usage** (5000-8000/day):
- Extensive research
- Multiple portfolios
- Frequent updates
- Consider caching

**Very High Usage** (> 8000/day):
- Automated monitoring
- Comprehensive analysis
- Must use caching
- Batch requests where possible

## Next Steps

If all checks pass:
- ✓ Plugin is ready to use
- ✓ Try `/coinpaprika:intro` for getting started
- ✓ Use `/coinpaprika:help` for full reference
- ✓ Invoke `@crypto-analyst` for analysis

If any checks fail:
- Review error messages above
- Check MCP server configuration
- Consult troubleshooting section
- Visit: https://github.com/coinpaprika/claude-marketplace/issues

---

**Last Updated**: [Run this command to see current status]
