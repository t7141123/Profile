<!-- vault-bridge:start (managed block, see the vault's system/AGENT_CORE.md) -->
## Shared project memory (Obsidian vault)
- Before working: read `~/Documents/SecondBrain/system/AGENT_CORE.md` and `~/Documents/SecondBrain/projects/Profile/STATUS.md`. Vault not on this machine? Clone `t7141123/ObsidianSecondBrain` to `~/Documents/SecondBrain` first.
- After working: update that `STATUS.md`, append a line to `system/HANDOFF_LOG.md`, then commit and push the vault (AGENT_CORE section 2).
- The rules in this repo still apply to the code here.
<!-- vault-bridge:end -->

# Project Conventions

## Workflow
- 每次完成任務後，協助 commit → push → deploy（`npm run deploy`）。
- 沒有使用者明確指示時不要 commit/push/deploy 中任一步驟。
- 遵循此 repo 的 Conventional Commits 風格（`feat:`, `chore:`, `fix:` 等）。
- Commit message 使用繁體中文描述變更。
- Deploy 指令：`npm run deploy`（會跑 `vite build` + `wrangler pages deploy`）。
