# External Integrations

Community-maintained examples that extend TAKT without modifying its core. They are not officially supported by TAKT, and inclusion in this list is not an endorsement — please review each project's license, dependencies, and security posture before adopting it.

To add an integration here, open a PR with a one-line description and a link to a public repository.

## Audit Trail / Receipt Signing

| Integration | Description |
|-------------|-------------|
| [ScopeBlind/examples/takt-workflow-receipts](https://github.com/ScopeBlind/examples/tree/main/takt-workflow-receipts) | Adds Ed25519-signed receipts and Cedar policy enforcement via an MCP server declared in `mcp_servers`. Receipts sit alongside TAKT's NDJSON logs and can be verified offline. No TAKT core changes required. |
