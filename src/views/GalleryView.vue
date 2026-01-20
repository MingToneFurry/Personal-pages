<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { siteConfig } from '../content/site.config'
import GlassCard from '../components/GlassCard.vue'
import LazyImage from '../components/LazyImage.vue'
import ImageLightbox from '../components/ImageLightbox.vue'

/**
 * 关键点：模板里不能写 `as any`，所以在 TS 层把类型补齐
 * 让 `_path` 成为可选字段，这样模板可以直接用 `it._path`
 */
type GalleryItem = {
  title: string
  src: string
  group?: string
  _path?: string
}

const groups = siteConfig.gallery.groups as string[]
const activeGroup = ref<string>(groups[0] ?? 'All')

const filtered = computed<GalleryItem[]>(() => {
  const all = siteConfig.gallery.items as GalleryItem[]
  if (activeGroup.value === 'All') return all
  return all.filter((it) => it.group === activeGroup.value)
})

// === “很多图片”优化：分批渲染 + 滚动到底自动加载更多 ===
const pageSize = siteConfig.gallery.pageSize ?? 36
const visibleCount = ref(pageSize)

const lightboxIndex = ref<number | null>(null)

watch(activeGroup, () => {
  visibleCount.value = pageSize
  lightboxIndex.value = null
})

const visibleItems = computed(() => filtered.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filtered.value.length)

function loadMore() {
  visibleCount.value = Math.min(visibleCount.value + pageSize, filtered.value.length)
}

const sentinel = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

onMounted(() => {
  if (typeof window === 'undefined') return
  if (!('IntersectionObserver' in window)) return
  if (!sentinel.value) return

  // 提前触发，滚到接近底部就开始补下一批
  io = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (!e) return
      if (e.isIntersecting) loadMore()
    },
    {
      root: null,
      rootMargin: '1200px 0px',
      threshold: 0.01
    }
  )

  io.observe(sentinel.value)
})

onBeforeUnmount(() => {
  if (io) {
    io.disconnect()
    io = null
  }
})

// === 点击放大：轻量灯箱 ===
function openLightbox(idx: number) {
  lightboxIndex.value = idx
}
</script>

<template>
  <div class="page">
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Gallery</h2>
        <div class="muted meta">{{ visibleItems.length }} / {{ filtered.length }}</div>
      </div>

      <div class="tabs" role="tablist" aria-label="Gallery groups">
        <button
          v-for="g in groups"
          :key="g"
          type="button"
          class="tag"
          :class="{ active: activeGroup === g }"
          role="tab"
          :aria-selected="activeGroup === g"
          @click="activeGroup = g"
        >
          {{ g }}
        </button>
      </div>

      <!-- 瀑布流：CSS columns（最轻量），再配合分批渲染减少 DOM 压力 -->
      <div class="masonry" aria-live="polite">
        <GlassCard
          v-for="(it, idx) in visibleItems"
          :key="it._path ?? it.title + idx"
          class="masonry-item"
        >
          <button class="thumb" type="button" :aria-label="`查看大图：${it.title}`" @click="openLightbox(idx)">
            <LazyImage :src="it.src" :alt="it.title" :min-height="150" />
          </button>
          <div class="cap">{{ it.title }}</div>
        </GlassCard>
      </div>

      <div v-if="hasMore" class="more">
        <button class="btn" type="button" @click="loadMore">加载更多</button>
      </div>

      <div ref="sentinel" class="sentinel" aria-hidden="true"></div>

      <p class="muted hint">
        <span v-if="siteConfig.gallery.mode === 'placeholder'">当前目录为空</span>
      </p>
    </section>

    <ImageLightbox v-model:index="lightboxIndex" :items="filtered" />
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.meta {
  font-size: 13px;
}

/* Masonry */
.masonry {
  column-count: 3;
  column-gap: 16px;
}

@media (max-width: 980px) {
  .masonry {
    column-count: 2;
  }
}

@media (max-width: 640px) {
  .masonry {
    column-count: 1;
  }
}

.masonry-item {
  display: inline-block;
  width: 100%;
  margin: 0 0 16px;
  padding: 12px;

  /* 浏览器可以跳过屏外内容的渲染（对“非常非常多图片”很有用） */
  content-visibility: auto;
  contain-intrinsic-size: 1px 260px;
}

.thumb {
  appearance: none;
  border: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  background: transparent;
  cursor: zoom-in;
}

.cap {
  margin-top: 10px;
  font-weight: 650;
  letter-spacing: 0.2px;
}

.more {
  display: flex;
  justify-content: center;
  margin-top: 6px;
}

.sentinel {
  height: 1px;
}

.hint {
  margin: 6px 0 0;
  font-size: 13px;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
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
  code {
    transition: none !important;
  }
}
</style>
