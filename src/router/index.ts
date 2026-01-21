import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { siteConfig } from '../content/site.config'

type RouteSeoMeta = {
  title?: string
  description?: string
  keywords?: string[]
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '')
}

function buildCanonicalUrl(siteUrl: string, path: string): string {
  const base = normalizeBaseUrl(siteUrl || `${location.origin}${location.pathname}`)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  // Hash Router: canonical 需要包含 hash，否则不同页面在服务端看起来都是同一个 URL
  return `${base}/#${normalizedPath}`
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  if (!content) return

  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector) as HTMLMetaElement | null

  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }

  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  if (!href) return

  const selector = `link[rel="${rel}"]`
  let el = document.head.querySelector(selector) as HTMLLinkElement | null

  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }

  el.setAttribute('href', href)
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Home'
    } satisfies RouteSeoMeta
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'About'
    } satisfies RouteSeoMeta
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: {
      title: 'Projects'
    } satisfies RouteSeoMeta
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/GalleryView.vue'),
    meta: {
      title: 'Gallery'
    } satisfies RouteSeoMeta
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'Contact'
    } satisfies RouteSeoMeta
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const baseTitle = siteConfig.siteTitle
  const pageTitle = (to.meta.title as string | undefined) ?? ''
  const fullTitle = pageTitle ? `${pageTitle} · ${baseTitle}` : baseTitle
  document.title = fullTitle

  // ===== SEO Meta (全站默认 + 可在路由 meta 中覆盖) =====
  const defaultDesc = siteConfig.seo.description
  const defaultKeywords = siteConfig.seo.keywords

  const desc = (to.meta.description as string | undefined) ?? defaultDesc
  const keywords = (to.meta.keywords as string[] | undefined) ?? defaultKeywords

  const canonical = buildCanonicalUrl(siteConfig.seo.siteUrl, to.path)

  // 基础
  upsertMeta('name', 'description', desc)
  upsertMeta('name', 'keywords', keywords.join(', '))
  upsertMeta('name', 'author', siteConfig.seo.author ?? baseTitle)
  upsertMeta('name', 'robots', 'index,follow')
  upsertLink('canonical', canonical)

  // OpenGraph
  upsertMeta('property', 'og:site_name', baseTitle)
  upsertMeta('property', 'og:title', fullTitle)
  upsertMeta('property', 'og:description', desc)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('property', 'og:locale', 'zh_CN')
  if (siteConfig.seo.ogImage) upsertMeta('property', 'og:image', siteConfig.seo.ogImage)

  // Twitter
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', fullTitle)
  upsertMeta('name', 'twitter:description', desc)
  if (siteConfig.seo.ogImage) upsertMeta('name', 'twitter:image', siteConfig.seo.ogImage)
})

export default router
