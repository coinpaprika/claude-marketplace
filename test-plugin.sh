#!/bin/bash

echo "=== DexPaprika Claude Plugin Test ==="
echo ""

echo "1. Navigate to the marketplace directory:"
echo "   cd $(pwd)"
echo ""

echo "2. Start Claude Code (in another terminal):"
echo "   claude"
echo ""

echo "3. Add the marketplace:"
echo "   /plugin marketplace add ./dexpaprika-marketplace"
echo ""

echo "4. Install the plugin (hosted MCP):"
echo "   /plugin install dexpaprika-defi-tools@dexpaprika-plugins"
echo ""

echo "5. Smoke tests:"
echo "   - List supported networks from DexPaprika"
echo "   - Show top pools on ethereum by 24h volume"
echo ""

echo "=== Troubleshooting ==="
echo ""
echo "If the plugin fails to load:"
echo ""
echo "Hosted MCP configuration is already set to: https://mcp.dexpaprika.com/sse"
echo ""
echo "=== Next Steps ==="
echo ""
echo "1. Test the plugin with the smoke tests above"
echo "2. If needed, update .mcp.json to point to the hosted URL"
echo "3. Set up GitHub repository for distribution"
echo "4. Publish to Claude plugin ecosystem"
