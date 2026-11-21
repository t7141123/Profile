import { describe, it, expect, vi } from 'vitest'
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
  it('disables send buttons until the idea is filled', async () => {
    const w = mountBrief()
    const buttons = w.findAll('button')
    expect(buttons.every(b => b.attributes('disabled') !== undefined)).toBe(true)
    await w.find('#brief-idea').setValue('社團活動報名 App')
    expect(buttons.every(b => b.attributes('disabled') === undefined)).toBe(true)
  })

  it('copies a message containing the idea and opens LINE', async () => {
    const writeText = vi.fn().mockResolvedValue()
    Object.assign(navigator, { clipboard: { writeText } })
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    const w = mountBrief()
    await w.find('#brief-idea').setValue('社團活動報名 App')
    await w.find('button[type="button"]').trigger('click')
    await Promise.resolve()
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('社團活動報名 App'))
    expect(open).toHaveBeenCalled()
  })
})
