import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Configure NProgress with custom styling
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200
})

// Custom CSS for NProgress to match the professional blue design
const nprogressStyles = document.createElement('style')
nprogressStyles.textContent = `
  #nprogress {
    pointer-events: none;
  }
  
  #nprogress .bar {
    background: linear-gradient(90deg, #2563EB, #7C3AED);
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
  }
  
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #2563EB, 0 0 5px #7C3AED;
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }
  
  #nprogress .spinner {
    display: none;
  }
`
document.head.appendChild(nprogressStyles)

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
