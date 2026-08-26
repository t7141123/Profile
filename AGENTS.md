# Project Conventions

## Workflow
- 每次完成任務後，協助 commit → push → deploy（`npm run deploy`）。
- 沒有使用者明確指示時不要 commit/push/deploy 中任一步驟。
- 遵循此 repo 的 Conventional Commits 風格（`feat:`, `chore:`, `fix:` 等）。
- Commit message 使用繁體中文描述變更。
- Deploy 指令：`npm run deploy`（會跑 `vite build` + `wrangler pages deploy`）。
