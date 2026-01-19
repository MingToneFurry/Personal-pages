<script setup lang="ts">
import { siteConfig } from '../content/site.config'
import LinkCard from '../components/LinkCard.vue'
import GlassCard from '../components/GlassCard.vue'
</script>

<template>
  <div class="page">
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Contact</h2>
      </div>

      <GlassCard class="note">
        <div class="note-title">联系方式 / 入口</div>
        <div class="note-body muted">每个 link 都可以单独配置图标：在 config 里给 link 填 <code>iconUrl</code> 即可，不填就用默认图标～</div>
      </GlassCard>

      <div class="grid">
        <LinkCard v-for="it in siteConfig.contactLinks" :key="it.url" :item="it" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.note {
  padding: 16px;
}

.note-title {
  font-weight: 650;
  letter-spacing: 0.2px;
}

.note-body {
  margin-top: 6px;
  line-height: 1.7;
  font-size: 13px;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  padding: 2px 6px;
  border-radius: 8px;
  border: 1px solid var(--card-border);
  background: rgba(255, 255, 255, 0.16);
}

:root[data-theme='dark'] code {
  background: rgba(255, 255, 255, 0.08);
}
</style>
