// Guard: this project does not use GitHub Actions (free quota). Fail if a workflow file appears.
import { existsSync, readdirSync } from 'node:fs';

const dir = new URL('../.github/workflows/', import.meta.url);
if (existsSync(dir) && readdirSync(dir).length > 0) {
  console.error('FAIL: .github/workflows/ must stay empty. Remove the workflow files (see AGENTS.md).');
  process.exit(1);
}
console.log('ok: no GitHub workflow files');
