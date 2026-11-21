import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import zhTW from '@/locales/zh-TW.json'
import ContactBrief from '@/components/ContactBrief.vue'

const mountBrief = () =>
  mount(ContactBrief, {
    global: {
      plugins: [createI18n({ legacy: false, locale: 'zh-tw', messages: { 'zh-tw': zhTW } })],
    },
  })

describe('ContactBrief', () => {
  it('has a single email send button, disabled until the idea is filled', async () => {
    const w = mountBrief()
    const buttons = w.findAll('button')
    expect(buttons.length).toBe(1)
    expect(buttons[0].attributes('disabled')).toBeDefined()
    await w.find('#brief-idea').setValue('社團活動報名工具')
    expect(buttons[0].attributes('disabled')).toBeUndefined()
  })
})
