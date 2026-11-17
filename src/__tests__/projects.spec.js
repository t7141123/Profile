import { describe, it, expect } from 'vitest'
import { existsSync, readdirSync, readFileSync } from 'node:fs'

import { join } from 'node:path'
import projects from '@/assets/data/projects.json'

const root = join(import.meta.dirname, '..')
const localeDir = join(root, 'locales')
const readLocale = (file) => JSON.parse(readFileSync(join(localeDir, file), 'utf8'))

describe('projects.json', () => {
  it('has unique ids and keys', () => {
    expect(new Set(projects.map(p => p.id)).size).toBe(projects.length)
    expect(new Set(projects.map(p => p.key)).size).toBe(projects.length)
  })

  it('references existing image files', () => {
    for (const p of projects) {
      expect(existsSync(join(root, 'assets/images', p.imageName)), p.imageName).toBe(true)
    }
  })

  it('has title, category and description in every locale', () => {
    for (const file of readdirSync(localeDir)) {
      const msgs = readLocale(file).portfolio.projects
      for (const p of projects) {
        expect(msgs[p.key], `${file}:${p.key}`).toBeTruthy()
        expect(msgs[`${p.key}Desc`], `${file}:${p.key}Desc`).toBeTruthy()
        expect(msgs[p.categoryKey], `${file}:${p.categoryKey}`).toBeTruthy()
      }
    }
  })
})

describe('locale files', () => {
  const flat = (o, p = '') =>
    Object.entries(o).flatMap(([k, v]) =>
      v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [`${p}${k}`])

  it('all share the same keys as zh-TW', () => {
    const base = flat(readLocale('zh-TW.json')).sort()
    for (const file of readdirSync(localeDir)) {
      expect(flat(readLocale(file)).sort(), file).toEqual(base)
    }
  })
})
