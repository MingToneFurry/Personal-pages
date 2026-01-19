<script setup lang="ts">
import { computed, ref } from 'vue'
import { siteConfig } from '../content/site.config'
import GlassCard from '../components/GlassCard.vue'

const groups = siteConfig.gallery.groups
const activeGroup = ref(groups[0] ?? 'All')

const items = computed(() => {
  if (activeGroup.value === 'All') return siteConfig.gallery.items
  return siteConfig.gallery.items.filter((it) => it.group === activeGroup.value)
})

// 重要：不要在每次 render 时都用 Date.now()，否则会导致图片“频繁变化/闪烁”
const seed = `${Date.now().toString(16)}_${Math.random().toString(16).slice(2)}`

function imgSrc(src: string, idx: number) {
  const joiner = src.includes('?') ? '&' : '?'
  // 给占位图一个稳定参数：
  // - 同一页渲染过程保持不变
  // - 仅当切换分组/刷新页面时才会变
  return `${src}${joiner}g=${encodeURIComponent(activeGroup.value)}&i=${idx}&s=${seed}`
}
</script>

<template>
  <div class="page">
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Gallery</h2>
      </div>

      <div class="tabs">
        <button
          v-for="g in groups"
          :key="g"
          type="button"
          class="tag"
          :class="{ active: activeGroup === g }"
          @click="activeGroup = g"
        >
          {{ g }}
        </button>
      </div>

      <div class="grid">
        <GlassCard v-for="(it, idx) in items" :key="it.title + idx" class="item">
          <img class="img" :src="imgSrc(it.src, idx)" :alt="it.title" loading="lazy" referrerpolicy="no-referrer" />
          <div class="cap">{{ it.title }}</div>
        </GlassCard>
      </div>

      <p class="muted hint">图集内容在 <code>src/content/site.config.ts</code> 里改～</p>
    </section>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.item {
  padding: 12px;
}

.img {
  width: 100%;
  height: 180px;
  border-radius: 14px;
  object-fit: cover;
  border: 1px solid var(--card-border);
  transition: border-color var(--theme-dur) var(--theme-ease);
}

.cap {
  margin-top: 10px;
  font-weight: 650;
  letter-spacing: 0.2px;
}

.hint {
  margin: 6px 0 0;
  font-size: 13px;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  padding: 2px 6px;
  border-radius: 8px;
  border: 1px solid var(--card-border);
  background-color: rgba(255, 255, 255, 0.16);
  transition: background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease);
}

:root[data-theme='dark'] code {
  background-color: rgba(255, 255, 255, 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .img,
  code {
    transition: none !important;
  }
}
</style>
