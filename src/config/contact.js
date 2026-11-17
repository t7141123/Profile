// Contact links, overridable via VITE_* env vars (see .env.example)
const env = import.meta.env

export const contact = {
  line: env.VITE_LINE_URL || 'https://line.me/ti/p/2w7bwfksdF',
  telegram: env.VITE_TELEGRAM_URL || 'https://t.me/davidliu71411',
  github: env.VITE_GITHUB_URL || 'https://github.com/t7141123',
  email: env.VITE_EMAIL || 'david.liu@action-lead.com',
}
