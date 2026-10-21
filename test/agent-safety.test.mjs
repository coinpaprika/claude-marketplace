// Run with: node --test test/agent-safety.test.mjs
//
// Both marketplace agents declared `model: inherit` with no `tools:` key, so a subagent
// picked up every tool the host session had permission for (Bash, Write, Edit, and so on)
// while its own job is to summarize text a third party controls: a token deployer's name and
// symbol, a pool's metadata, a listed coin's description, links and team text. This pins
// three things so they cannot regress silently: each agent declares an explicit, MCP-only
// tools allowlist; neither manifest nor marketplace.json was left invalid JSON by the edit;
// and each agent's body tells the model that tool output is data, not instructions.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const path = (p) => new URL(p, `file://${root}`).pathname;

function readAgent(relPath) {
  const text = readFileSync(path(relPath), "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  assert.ok(match, `${relPath} has no frontmatter block`);
  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    frontmatter[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { frontmatter, body: match[2], text };
}

const AGENTS = [
  {
    file: "plugins/coinpaprika-claude-plugin/agents/crypto-analyst.md",
    serverTag: "mcp__plugin_coinpaprika_coinpaprika__",
    sampleTool: "mcp__plugin_coinpaprika_coinpaprika__getGlobal",
  },
  {
    file: "plugins/dexpaprika-claude-plugin/agents/defi-data-analyst.md",
    serverTag: "mcp__plugin_dexpaprika_dexpaprika__",
    sampleTool: "mcp__plugin_dexpaprika_dexpaprika__getNetworks",
  },
];

for (const agent of AGENTS) {
  test(`${agent.file} declares an explicit, MCP-only tools allowlist`, () => {
    const { frontmatter } = readAgent(agent.file);
    assert.ok(frontmatter.tools, "no tools: field in frontmatter: the agent inherits every session tool");
    const tools = frontmatter.tools.split(",").map((t) => t.trim());
    assert.ok(tools.length > 0);
    for (const forbidden of ["Bash", "Write", "Edit", "Task", "WebFetch", "mcp__*"]) {
      assert.ok(!tools.includes(forbidden), `tools: must not include ${forbidden}`);
    }
    for (const t of tools) {
      assert.ok(t.startsWith("mcp__"), `${t} is not an MCP tool`);
    }
    assert.ok(tools.includes(agent.sampleTool), `${agent.sampleTool} missing from the allowlist`);
  });

  test(`${agent.file} tells the model tool output is data, not instructions`, () => {
    const { body } = readAgent(agent.file);
    assert.match(
      body,
      /not instructions|never instructions|not a command/i,
      "agent body has no instruction that MCP tool output is untrusted data",
    );
  });
}

test("both plugin manifests still parse as JSON", () => {
  for (const p of [
    "plugins/coinpaprika-claude-plugin/.claude-plugin/plugin.json",
    "plugins/dexpaprika-claude-plugin/.claude-plugin/plugin.json",
    ".claude-plugin/marketplace.json",
  ]) {
    assert.doesNotThrow(() => JSON.parse(readFileSync(path(p), "utf8")), `${p} is not valid JSON`);
  }
});
