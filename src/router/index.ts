import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { siteConfig } from '../content/site.config'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import GalleryView from '../views/GalleryView.vue'
import ContactView from '../views/ContactView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
  { path: '/about', name: 'about', component: AboutView, meta: { title: 'About' } },
  { path: '/projects', name: 'projects', component: ProjectsView, meta: { title: 'Projects' } },
  { path: '/gallery', name: 'gallery', component: GalleryView, meta: { title: 'Gallery' } },
  { path: '/contact', name: 'contact', component: ContactView, meta: { title: 'Contact' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const base = siteConfig.siteTitle
  const page = (to.meta.title as string | undefined) ?? ''
  document.title = page ? `${page} · ${base}` : base
})

export default router
