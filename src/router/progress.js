import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200
})

/**
 * Setup router progress bar
 * @param {Router} router - Vue Router instance
 */
export function setupRouterProgress(router) {
  router.beforeEach((to, from, next) => {
    // Start progress bar
    NProgress.start()
    next()
  })

  router.afterEach(() => {
    // Complete progress bar
    NProgress.done()
  })

  router.onError(() => {
    // Ensure progress bar ends on error
    NProgress.done()
  })
}
