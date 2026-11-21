import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import zhTW from '@/locales/zh-TW.json'
import Home from '@/views/Home.vue'
import Services from '@/views/Services.vue'

window.matchMedia = window.matchMedia || vi.fn().mockReturnValue({
  matches: false, addEventListener() {}, removeEventListener() {},
})

const noop = { mounted() {} }
const directives = Object.fromEntries(
  ['scramble', 'reveal', 'ripple', 'magnetic', 'inview', 'spotlight', 'count', 'tilt'].map(n => [n, noop])
)

const mountView = (view) => {
  const i18n = createI18n({ legacy: false, locale: 'zh-tw', messages: { 'zh-tw': zhTW } })
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:p(.*)*', component: { template: '<div />' } }],
  })
  return mount(view, {
    global: {
      plugins: [i18n, router],
      directives,
      stubs: { PageHeader: { template: '<div><slot name="aside" /></div>' } },
    },
  })
}

describe('split page views', () => {
  it('Home renders all sections', () => {
    const w = mountView(Home)
    expect(w.findAll('section').length).toBe(7)
    expect(w.find('.marquee-band').exists()).toBe(true)
    expect(w.findAll('.bento-card').length).toBe(4)
    expect(w.findAll('.testimonial-card').length).toBe(3)
    expect(w.find('.cta-section').exists()).toBe(true)
  })

  it('Services renders all sections', () => {
    const w = mountView(Services)
    expect(w.findAll('.pillar-row').length).toBe(4)
    expect(w.findAll('.service-detail-card').length).toBe(4)
    expect(w.findAll('.pricing-card').length).toBe(3)
    expect(w.findAll('.accordion-item').length).toBe(9)
    expect(w.find('.cta-section').exists()).toBe(true)
  })
})
