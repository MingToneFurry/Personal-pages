<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfig } from '../content/site.config'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const open = ref(false)

watch(
  () => route.fullPath,
  () => {
    open.value = false
  }
)

const navItems = computed(() => siteConfig.nav)
</script>

<template>
  <header class="nav-wrap">
    <div class="nav-inner">
      <RouterLink class="brand" to="/">
        <img class="brand-avatar" :src="siteConfig.avatarUrl" alt="avatar" referrerpolicy="no-referrer" />
        <span class="brand-title">{{ siteConfig.siteTitle }}</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Primary">
        <RouterLink v-for="it in navItems" :key="it.to" class="nav-link" :to="it.to">
          {{ it.label }}
        </RouterLink>
      </nav>

      <div class="nav-actions">
        <ThemeToggle />
        <button class="burger" type="button" :aria-expanded="open" aria-label="Menu" @click="open = !open">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <div v-if="open" class="mobile-panel">
      <RouterLink v-for="it in navItems" :key="it.to + '-m'" class="mobile-link" :to="it.to">
        {{ it.label }}
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.nav-wrap {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(16px);
  background-color: rgba(255, 255, 255, 0.22);
  border-bottom: 1px solid var(--card-border);

  transition: background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease);
}

:root[data-theme='dark'] .nav-wrap {
  background-color: rgba(8, 14, 13, 0.22);
}

.nav-inner {
  height: var(--nav-height);
  max-width: var(--max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 0 20px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 140px;
}

.brand-avatar {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);

  transition: border-color var(--theme-dur) var(--theme-ease);
}

.brand-title {
  font-weight: 650;
  letter-spacing: 0.2px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-link {
  position: relative;
  padding: 10px 12px;
  border-radius: 999px;
  color: var(--muted);
  font-size: 14px;
  transition: background-color 140ms ease, color 140ms ease;
}

.nav-link:hover {
  background-color: rgba(45, 212, 191, 0.12);
  color: var(--text);
}

.nav-link.router-link-exact-active {
  background-color: rgba(45, 212, 191, 0.18);
  color: var(--text);
  border: 1px solid rgba(45, 212, 191, 0.35);
}

.nav-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.burger {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);

  transition: background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease);
}

:root[data-theme='dark'] .burger {
  background-color: rgba(255, 255, 255, 0.06);
}

.burger span {
  display: block;
  width: 16px;
  height: 2px;
  background: currentColor;
  margin: 3px auto;
  border-radius: 2px;
  opacity: 0.75;
}

.mobile-panel {
  display: none;
  max-width: var(--max);
  margin: 0 auto;
  padding: 12px 20px 16px;
  border-bottom: 1px solid var(--card-border);
  background-color: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(16px);

  transition: background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease);
}

:root[data-theme='dark'] .mobile-panel {
  background-color: rgba(8, 14, 13, 0.22);
}

.mobile-link {
  display: block;
  padding: 12px 12px;
  border-radius: 12px;
  color: var(--muted);
  transition: background-color 140ms ease, color 140ms ease;
}

.mobile-link:hover {
  background-color: rgba(45, 212, 191, 0.12);
  color: var(--text);
}

.mobile-link.router-link-exact-active {
  background-color: rgba(45, 212, 191, 0.18);
  color: var(--text);
  border: 1px solid rgba(45, 212, 191, 0.35);
}

@media (max-width: 820px) {
  .nav-links {
    display: none;
  }

  .burger {
    display: inline-block;
  }

  .mobile-panel {
    display: block;
  }
}

@media (max-width: 640px) {
  .nav-inner {
    padding: 0 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-wrap,
  .brand-avatar,
  .burger,
  .mobile-panel {
    transition: none !important;
  }
}
</style>
