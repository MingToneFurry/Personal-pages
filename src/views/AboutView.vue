<script setup lang="ts">
import { siteConfig } from '../content/site.config'
import GlassCard from '../components/GlassCard.vue'
</script>

<template>
  <div class="page">
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">About</h2>
      </div>

      <div class="stack">
        <GlassCard v-for="(b, idx) in siteConfig.about.blocks" :key="idx" class="block">
          <h3 class="block-title">{{ b.title }}</h3>
          <p class="block-body">{{ b.body }}</p>
        </GlassCard>
      </div>
    </section>
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.block-title {
  margin: 0;
  font-size: 16px;
}

.block-body {
  margin: 10px 0 0;
  color: var(--muted);
  line-height: 1.8;
}
</style>
