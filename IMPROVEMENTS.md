# CoinPaprika & DexPaprika MCP Improvement Recommendations

This document outlines suggested improvements for both the CoinPaprika and DexPaprika MCP servers based on analysis of the DexPaprika implementation.

## 🎯 High Priority Improvements

### 1. Add `/api/capabilities` Endpoint

**Current State**: DexPaprika has this, CoinPaprika does NOT

**Recommendation**: Implement a `/api/capabilities` endpoint for CoinPaprika MCP that returns:

```json
{
  "server": {
    "name": "CoinPaprika MCP Server",
    "version": "1.0.0",
    "description": "Cryptocurrency market data aggregation",
    "last_updated": "2025-10-17",
    "documentation_url": "https://docs.coinpaprika.com"
  },
  "workflow_patterns": {
    "market_overview": {
      "description": "Get global market snapshot",
      "steps": ["..."],
      "example_use_case": "..."
    },
    "coin_analysis": { "..." },
    "price_tracking": { "..." }
  },
  "common_pitfalls": {
    "coin_id_format": {
      "issue": "Using symbols instead of IDs",
      "solution": "Always use coin_id format (btc-bitcoin)",
      "example": "..."
    }
  },
  "best_practices": ["..."],
  "tool_examples": {"..."}
}
```

**Benefits**:
- Agents can discover capabilities automatically
- Provides onboarding guide for new users
- Reduces errors through best practices documentation
- Makes API more self-documenting

**Implementation Priority**: HIGH

---

### 2. Implement Structured Error Responses

**Current State**: Both services may benefit from more structured errors

**Recommendation**: Standardize error responses across both MCPs:

```json
{
  "error": {
    "code": "CP400_INVALID_COIN_ID",
    "message": "Coin ID 'bitcoin' not found",
    "hint": "Use coin_id format like 'btc-bitcoin'. Try searchCoins first.",
    "corrected_example": {
      "coin_id": "btc-bitcoin"
    },
    "documentation": "https://api.coinpaprika.com/docs#tag/coins"
  }
}
```

**Error Code Prefixes**:
- `CP400_*` - CoinPaprika client errors
- `CP500_*` - CoinPaprika server errors
- `DP400_*` - DexPaprika client errors
- `DP500_*` - DexPaprika server errors

**Common Error Codes to Implement**:
- `CP400_INVALID_COIN_ID` - Coin ID format incorrect
- `CP400_COIN_NOT_FOUND` - Coin doesn't exist
- `CP400_RATE_LIMIT_EXCEEDED` - Too many requests
- `CP400_INVALID_TIMEFRAME` - Invalid historical data range
- `DP400_INVALID_NETWORK` - Network not supported
- `DP400_TOO_MANY_TOKENS` - Exceeds batch limit (already exists)
- `DP400_POOL_NOT_FOUND` - Pool address not found

**Benefits**:
- Easier error handling for clients
- Better user experience with actionable hints
- Consistent error format across both services
- Machine-readable error codes for automation

**Implementation Priority**: HIGH

---

### 3. Add Batch Endpoint Validation

**Current State**: DexPaprika has `getTokenMultiPrices` with 10-token limit

**Recommendation**: Implement both client-side AND server-side validation:

**Client-Side (in agent prompts)**:
```markdown
Before calling getTokenMultiPrices:
1. Check array length ≤ 10
2. If > 10, split into multiple requests
3. Show clear error if user exceeds limit
```

**Server-Side**:
```json
{
  "error": {
    "code": "DP400_TOO_MANY_TOKENS",
    "message": "Maximum 10 tokens per request, received 15",
    "hint": "Split your request into multiple calls: [10] + [5]",
    "corrected_example": {
      "batch_1": ["token1", "...", "token10"],
      "batch_2": ["token11", "...", "token15"]
    }
  }
}
```

**For CoinPaprika**, add similar batch endpoints:
- `getMultipleCoins` - Get data for up to 10 coins at once
- `getBatchPrices` - Get prices for multiple coins efficiently

**Benefits**:
- Prevents unnecessary API calls
- Clear guidance on how to fix
- Better rate limit management
- Improved performance

**Implementation Priority**: MEDIUM

---

### 4. Add Response Field Filtering

**Current State**: DexPaprika mentions `fields` parameter but needs better documentation

**Recommendation**: Implement consistent field filtering across all endpoints:

**Usage Example**:
```
GET /api/network/ethereum/pools?fields=pools,page_info&limit=10
```

**Response**:
```json
{
  "pools": [...],
  "page_info": {...}
  // Other fields omitted
}
```

**Apply to CoinPaprika**:
```
GET /api/tickers?fields=id,symbol,price,market_cap&limit=20
```

**Benefits**:
- Reduces payload size
- Faster response times
- Lower bandwidth usage
- Client only receives needed data

**Documentation Needed**:
- List of available fields per endpoint
- Examples for common use cases
- Performance comparison with/without filtering

**Implementation Priority**: MEDIUM

---

### 5. Add Rate Limit Headers

**Recommendation**: Include rate limit information in response headers:

```
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9543
X-RateLimit-Reset: 1729180800
X-RateLimit-Window: 86400
```

**Response Body (when limit exceeded)**:
```json
{
  "error": {
    "code": "CP429_RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "hint": "Wait 124 seconds or upgrade plan",
    "rate_limit": {
      "limit": 10000,
      "remaining": 0,
      "reset_at": "2025-10-17T15:30:00Z",
      "retry_after_seconds": 124
    }
  }
}
```

**Benefits**:
- Clients can self-regulate requests
- Better error messaging
- Proactive rate limit management
- Transparent API usage

**Implementation Priority**: MEDIUM

---

## 💡 Medium Priority Improvements

### 6. Add Pagination Metadata

**Current State**: DexPaprika has page info, but could be enhanced

**Recommendation**: Standardize pagination across both services:

```json
{
  "data": [...],
  "pagination": {
    "page": 0,
    "limit": 20,
    "total_pages": 45,
    "total_items": 892,
    "has_next": true,
    "has_previous": false,
    "next_cursor": "pool_abc123...",
    "links": {
      "first": "/api/...?page=0",
      "next": "/api/...?page=1",
      "last": "/api/...?page=44"
    }
  }
}
```

**Benefits**:
- Easier pagination implementation
- Better UX for large datasets
- Support for cursor-based pagination
- Clear navigation between pages

---

### 7. Add Data Freshness Indicators

**Recommendation**: Include timestamps and cache information:

```json
{
  "data": {...},
  "metadata": {
    "generated_at": "2025-10-17T14:30:15.234Z",
    "data_timestamp": "2025-10-17T14:30:00Z",
    "cache_status": "hit",
    "cache_ttl_seconds": 300,
    "next_update_at": "2025-10-17T14:35:00Z",
    "is_real_time": true
  }
}
```

**Benefits**:
- Users know data freshness
- Can optimize polling intervals
- Understand caching behavior
- Better data reliability assessment

---

### 8. Add Health Check Endpoint

**Recommendation**: Implement `/health` endpoint for both services:

```json
{
  "status": "healthy",
  "version": "1.2.0",
  "uptime_seconds": 3456789,
  "services": {
    "database": "healthy",
    "cache": "healthy",
    "external_apis": "degraded"
  },
  "metrics": {
    "requests_per_second": 142.3,
    "average_response_time_ms": 45.2,
    "error_rate_percent": 0.12
  },
  "timestamp": "2025-10-17T14:30:00Z"
}
```

**Benefits**:
- Monitor service health
- Debug connectivity issues
- Display status to users
- Automated health checks

---

### 9. Add WebSocket Support (Future Enhancement)

**Current State**: Both use SSE (Server-Sent Events)

**Recommendation**: Consider adding WebSocket endpoints for:
- Real-time price updates
- Live transaction streams
- Pool liquidity changes
- Market event notifications

**Example**:
```javascript
ws://mcp.coinpaprika.com/ws/prices?coins=btc-bitcoin,eth-ethereum
ws://mcp.dexpaprika.com/ws/pools?network=ethereum&min_volume=1000000
```

**Benefits**:
- True bi-directional communication
- Lower latency for real-time data
- Reduced polling overhead
- Better for monitoring use cases

**Implementation Priority**: LOW (Future)

---

## 📚 Documentation Improvements

### 10. Interactive API Documentation

**Recommendation**: Enhance OpenAPI documentation with:

1. **Interactive Examples**
   - Try API calls directly from docs
   - Copy-paste ready code snippets
   - Live responses

2. **Use Case Guides**
   - Portfolio tracking tutorial
   - DeFi analytics walkthrough
   - Trading bot examples
   - Risk analysis guide

3. **SDKs and Libraries**
   - Official Python SDK
   - TypeScript/JavaScript SDK
   - Example integrations
   - Claude Code plugin examples

4. **Migration Guides**
   - Moving from other data providers
   - API version changes
   - Deprecation notices

---

### 11. Add Changelog Endpoint

**Recommendation**: Implement `/changelog` endpoint:

```json
{
  "versions": [
    {
      "version": "1.2.0",
      "released_at": "2025-10-17",
      "changes": {
        "added": ["getCapabilities endpoint", "Batch price endpoint"],
        "improved": ["Error messages", "Response times"],
        "deprecated": ["Old pool format"],
        "removed": [],
        "fixed": ["Rate limit calculation", "Cache invalidation"]
      },
      "breaking_changes": false
    }
  ]
}
```

**Benefits**:
- Transparent API evolution
- Easy to track changes
- Migration planning
- Version awareness

---

## 🔒 Security & Reliability

### 12. Add API Key Authentication (Optional Tier)

**Recommendation**: Offer optional authenticated tier:

```
Authorization: Bearer your-api-key-here
```

**Benefits of Auth Tier**:
- Higher rate limits
- Priority support
- Advanced features
- Analytics dashboard
- Custom data retention

**Free Tier Remains**:
- No auth required for basic use
- Lower rate limits
- Community support
- Standard features

---

### 13. Add Request Validation Middleware

**Recommendation**: Validate all inputs before processing:

**CoinPaprika Validations**:
- Coin ID format: `^[a-z0-9]+-[a-z0-9-]+$`
- Date format: ISO 8601
- Limit: 1-100
- Currency codes: ISO 4217

**DexPaprika Validations**:
- Network ID: from `getNetworks`
- Address format: chain-specific validation
- Interval values: enum from allowed list
- Token count: max 10

**Error Response**:
```json
{
  "error": {
    "code": "CP400_VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "validation_errors": [
      {
        "field": "coin_id",
        "value": "Bitcoin",
        "error": "Must be lowercase with dash separator",
        "expected_format": "btc-bitcoin"
      }
    ]
  }
}
```

---

## 📊 Analytics & Monitoring

### 14. Add Usage Analytics for Developers

**Recommendation**: Provide usage dashboard showing:

- API calls per endpoint
- Error rates
- Response times
- Most used features
- Peak usage times
- Cost projections (if paid tiers exist)

**Benefits**:
- Optimize API usage
- Identify bottlenecks
- Plan capacity
- Budget forecasting

---

## 🎨 Plugin-Specific Improvements

### 15. Enhance Agent Prompts

**Recommendation**: Both plugins' agents should:

1. **Always call getCapabilities first** (when available)
2. **Cache network/coin lists** within session
3. **Validate inputs** before API calls
4. **Provide clear error messages** with solutions
5. **Suggest next steps** after analysis
6. **Use batch endpoints** when applicable

### 16. Add More Slash Commands

**CoinPaprika New Commands**:
- `/coinpaprika-market-data:trending` - Trending coins
- `/coinpaprika-market-data:gainers` - Top gainers
- `/coinpaprika-market-data:losers` - Top losers
- `/coinpaprika-market-data:compare` - Compare two coins
- `/coinpaprika-market-data:alerts` - Set price alerts

**DexPaprika New Commands**:
- `/dexpaprika-defi-tools:find-arbitrage` - Find arbitrage opportunities
- `/dexpaprika-defi-tools:monitor-pool` - Monitor pool changes
- `/dexpaprika-defi-tools:whale-watch` - Watch large transactions

---

## 🚀 Implementation Roadmap

### Phase 1: Critical (1-2 weeks)
- [ ] Add `/api/capabilities` endpoint for CoinPaprika
- [ ] Implement structured error responses
- [ ] Add rate limit headers
- [ ] Improve error messages with hints

### Phase 2: Important (2-4 weeks)
- [ ] Add batch endpoints for CoinPaprika
- [ ] Implement response field filtering
- [ ] Standardize pagination
- [ ] Add data freshness indicators

### Phase 3: Enhancement (1-2 months)
- [ ] Add health check endpoints
- [ ] Interactive API documentation
- [ ] SDK development
- [ ] Usage analytics dashboard

### Phase 4: Future (3+ months)
- [ ] WebSocket support
- [ ] Advanced authentication tiers
- [ ] Custom data pipelines
- [ ] Enterprise features

---

## 📝 Summary

**Immediate Actions**:
1. ✅ Add `getCapabilities` endpoint to CoinPaprika MCP
2. ✅ Standardize error responses with codes and hints
3. ✅ Document field filtering capabilities
4. ✅ Add rate limit information to responses

**Most Impactful Improvements**:
- **Capabilities endpoint**: Self-documenting API
- **Structured errors**: Better developer experience
- **Batch operations**: Improved performance
- **Field filtering**: Reduced bandwidth

**Long-term Vision**:
- Both services should have feature parity where applicable
- Consistent API patterns across CoinPaprika and DexPaprika
- Best-in-class developer experience
- Comprehensive documentation and examples

---

*Document created: October 17, 2025*
*Review cycle: Quarterly*
