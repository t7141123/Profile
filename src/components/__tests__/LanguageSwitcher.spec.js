import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSwitcher from '../LanguageSwitcher.vue'
import { createI18n } from 'vue-i18n'

describe('LanguageSwitcher', () => {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh-TW',
    messages: {
      'zh-TW': {},
      'zh-CN': {},
      'en': {}
    }
  })

  it('renders properly', () => {
    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays correct language name', () => {
    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.text()).toContain('繁體中文')
  })
})
