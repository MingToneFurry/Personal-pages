<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from './content/site.config'

import BackgroundLayer from './components/BackgroundLayer.vue'
import Navbar from './components/Navbar.vue'
import ThemeController from './components/ThemeController.vue'

const footerText = computed(() => {
  const year = new Date().getFullYear()
  return siteConfig.footer.text.replace('{year}', String(year))
})
</script>

<template>
  <div class="app-root">
    <ThemeController />
    <BackgroundLayer
      :endpoint="siteConfig.background.endpoint"
      :refresh-on-route-change="siteConfig.background.refreshOnRouteChange"
      :refresh-once-after-ms="siteConfig.background.refreshOnceAfterMs"
      :blur-px="siteConfig.background.blurPx"
      :saturate="siteConfig.background.saturate"
      :contrast="siteConfig.background.contrast"
    />

    <Navbar />

    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="footer">
      {{ footerText }}
    </footer>
  </div>
</template>
