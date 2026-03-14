import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for handling scroll-based animations and reveal effects
 */
export function useScrollReveal() {
  const revealedElements = ref(new Set())

  const checkScroll = () => {
    const elements = document.querySelectorAll('.reveal-on-scroll')
    const windowHeight = window.innerHeight

    elements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('revealed')
        revealedElements.value.add(el)
      }
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', checkScroll)
    checkScroll() // Check on mount
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll)
  })

  return {
    checkScroll
  }
}

/**
 * Composable for smooth scroll to element
 */
export function useSmoothScroll() {
  const scrollToElement = (selector, offset = 0) => {
    const element = document.querySelector(selector)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      return true
    }
    return false
  }

  return {
    scrollToElement
  }
}

/**
 * Composable for intersection observer (lazy loading, animations)
 */
export function useIntersectionObserver(options = {}) {
  const observedElements = ref(new Set())
  const callback = options.callback || (() => {})

  const observe = (selector, observerOptions = {}) => {
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...observerOptions
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry)
          entry.target.classList.add('observed')
          observedElements.value.add(entry.target)
        }
      })
    }, defaultOptions)

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }

  return {
    observe,
    observedElements
  }
}
