import { describe, it, expect } from 'vitest'
import { contact } from '@/config/contact'

describe('contact config', () => {
  it('provides valid links by default', () => {
    expect(contact.line).toMatch(/^https:\/\//)
    expect(contact.telegram).toMatch(/^https:\/\//)
    expect(contact.github).toMatch(/^https:\/\//)
    expect(contact.email).toContain('@')
  })
})
