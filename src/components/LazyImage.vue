<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    /**
     * 提前多少距离开始加载（越大越“积极”，但请求更早）
     */
    rootMargin?: string
    /**
     * 占位骨架的最小高度（瀑布流里不想一开始都挤成一条线的话就给个最小值）
     */
    minHeight?: number
  }>(),
  {
    alt: '',
    rootMargin: '900px 0px',
    minHeight: 140
  }
)

const host = ref<HTMLElement | null>(null)

const isVisible = ref(false)
const loaded = ref(false)
const errored = ref(false)

let io: IntersectionObserver | null = null

function cleanup() {
  if (io) {
    io.disconnect()
    io = null
  }
}

function startObserve() {
  cleanup()
  loaded.value = false
  errored.value = false
  isVisible.value = false

  // 没有 window 的场景（理论上不会发生在本项目）直接当作可见
  if (typeof window === 'undefined') {
    isVisible.value = true
    return
  }

  // 浏览器不支持 IntersectionObserver：退化成直接加载
  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  if (!host.value) {
    isVisible.value = true
    return
  }

  io = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (!e) return
      if (e.isIntersecting) {
        isVisible.value = true
        cleanup()
      }
    },
    {
      root: null,
      rootMargin: props.rootMargin,
      threshold: 0.01
    }
  )

  io.observe(host.value)
}

onMounted(() => {
  startObserve()
})

onBeforeUnmount(() => {
  cleanup()
})

watch(
  () => props.src,
  () => {
    startObserve()
  }
)

const wrapStyle = computed(() => ({
  '--min-h': `${props.minHeight}px`
}))

function onLoad() {
  loaded.value = true
}

function onError() {
  errored.value = true
}
</script>

<template>
  <div ref="host" class="wrap" :class="{ loaded, errored }" :style="wrapStyle">
    <div class="skeleton" aria-hidden="true"></div>

    <img
      v-if="isVisible"
      class="img"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      referrerpolicy="no-referrer"
      @load="onLoad"
      @error="onError"
    />

    <div v-if="errored" class="error" aria-live="polite">图片加载失败</div>

    <slot :loaded="loaded" :errored="errored" />
  </div>
</template>

<style scoped>
.wrap {
  position: relative;
  width: 100%;
  min-height: var(--min-h, 140px);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--card-border);
  background: rgba(255, 255, 255, 0.10);
  transition: border-color var(--theme-dur) var(--theme-ease);
}

:root[data-theme='dark'] .wrap {
  background: rgba(255, 255, 255, 0.06);
}

.skeleton {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(240px 160px at 20% 20%, rgba(45, 212, 191, 0.22), transparent 60%),
    linear-gradient(120deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.08));
  opacity: 1;
  transition: opacity 220ms ease;
}

:root[data-theme='dark'] .skeleton {
  background:
    radial-gradient(240px 160px at 20% 20%, rgba(45, 212, 191, 0.18), transparent 60%),
    linear-gradient(120deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.04));
}

.img {
  display: block;
  width: 100%;
  height: auto;
  opacity: 0;
  transform: translateY(2px);
  transition: opacity 220ms ease, transform 220ms ease;
}

.wrap.loaded .img {
  opacity: 1;
  transform: translateY(0);
}

.wrap.loaded .skeleton {
  opacity: 0;
}

.error {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 12px;
  color: var(--muted);
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.06);
}

:root[data-theme='dark'] .error {
  background: rgba(0, 0, 0, 0.22);
}

@media (prefers-reduced-motion: reduce) {
  .img,
  .skeleton {
    transition: none !important;
  }
}
</style>
