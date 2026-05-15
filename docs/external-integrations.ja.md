# External Integrations

TAKT のコアを変更せずに機能を拡張する、コミュニティメンテナンスのサンプル集です。TAKT として公式にサポート・推奨するものではありません。各プロジェクトのライセンス、依存関係、セキュリティ面を必ず確認した上で利用してください。

ここに追加したい場合は、1 行の説明とパブリックリポジトリへのリンクを添えて PR を送ってください。

## 監査ログ / レシート署名

| 統合 | 説明 |
|-----|------|
| [ScopeBlind/examples/takt-workflow-receipts](https://github.com/ScopeBlind/examples/tree/main/takt-workflow-receipts) | `mcp_servers` で MCP サーバーを宣言する形で Ed25519 署名レシートと Cedar ポリシー検証を追加する。レシートは TAKT の NDJSON ログと並んで生成され、オフラインで検証可能。TAKT コアの変更不要。 |
