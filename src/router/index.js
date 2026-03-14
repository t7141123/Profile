import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

// Supported locales
const locales = ['zh-TW', 'zh-CN', 'en'];
const defaultLocale = 'zh-TW';

// Helper function to check if a path segment is a locale
const isLocale = (path) => locales.includes(path);

// Base routes without locale prefix
const baseRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: () => import("../views/Portfolio.vue"),
  },
  {
    path: "/services",
    name: "Services",
    component: () => import("../views/Services.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

// Generate routes with locale prefix
const localizedRoutes = baseRoutes.map(route => ({
  ...route,
  path: `/:locale${route.path}`,
  beforeEnter: (to, from, next) => {
    const locale = to.params.locale;
    if (!isLocale(locale)) {
      // If locale is not valid, redirect to default locale
      next(`/${defaultLocale}${to.path.replace(`/${locale}`, '')}`);
    } else {
      next();
    }
  }
}));

// Redirect routes - redirect root and non-localized paths to default locale
const redirectRoutes = [
  {
    path: "/",
    redirect: `/${defaultLocale}/`
  }
];

// Add catch-all redirect for non-localized paths
baseRoutes.forEach(route => {
  if (route.path !== "/" && route.path !== "/:pathMatch(.*)*") {
    redirectRoutes.push({
      path: route.path,
      redirect: (to) => `/${defaultLocale}${to.path}`
    });
  }
});

const routes = [
  ...redirectRoutes,
  ...localizedRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation guard to sync locale with i18n
router.beforeEach((to, from, next) => {
  const locale = to.params.locale;
  
  if (locale && isLocale(locale)) {
    // Store locale in localStorage for persistence
    localStorage.setItem('locale', locale);
  }
  
  next();
});

export { locales, defaultLocale, isLocale };
export default router;
