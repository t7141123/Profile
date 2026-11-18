<!-- vault-bridge:start (managed block, see the vault's system/AGENT_CORE.md) -->
## Shared project memory (Obsidian vault)
- Before working: read `~/Documents/SecondBrain/system/AGENT_CORE.md` and `~/Documents/SecondBrain/projects/Profile/STATUS.md`. Vault not on this machine? Clone `t7141123/ObsidianSecondBrain` to `~/Documents/SecondBrain` first.
- After working: update that `STATUS.md`, append a line to `system/HANDOFF_LOG.md`, then commit and push the vault (AGENT_CORE section 2).
- The rules in this repo still apply to the code here.
<!-- vault-bridge:end -->

<!-- auto-workflow:start (owner's standing instruction) -->
## 自動 commit、push、部署（擁有者的長期指示，2026-11-18 起）
每完成一個段落（一個獨立的小單元，不是等整個請求結束），依序做：
1. 驗證：跑專案現有的檢查（package.json 裡有的 lint、typecheck、test），全部通過才繼續。
2. commit：沿用 `git log` 的寫法，一次只做一件事；再 `git push origin main`。
3. 部署：`npm run deploy`（Cloudflare Pages；帳號 T71411）。
4. 實測：打開線上網址或呼叫主要 API 確認正常，把結果回報給我。
遇到這些情況先停下來問我，不要硬做：commit 被 hook 擋下（不要用 `--no-verify`）、檢查或建置失敗、部署帳號與上面寫的不符。
<!-- auto-workflow:end -->

# Project Conventions

## Workflow
- 每次完成任務後，協助 commit → push → deploy（`npm run deploy`）。
- commit、push、deploy 依上方「自動 commit、push、部署」一節自動進行。
- 遵循此 repo 的 Conventional Commits 風格（`feat:`, `chore:`, `fix:` 等）。
- Commit message 使用繁體中文描述變更。
- Deploy 指令：`npm run deploy`（會跑 `vite build` + `wrangler pages deploy`）。
