<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = withDefaults(
  defineProps<{
    endpoint: string
    refreshOnRouteChange?: boolean
    refreshOnceAfterMs?: number

    /** 背景模糊强度（px） */
    blurPx?: number
    /** 背景饱和度（1 = 原始） */
    saturate?: number
    /** 背景对比度（1 = 原始） */
    contrast?: number
  }>(),
  {
    refreshOnRouteChange: false,
    refreshOnceAfterMs: 0,
    blurPx: 12,
    saturate: 1.12,
    contrast: 1.05
  }
)

const route = useRoute()

const rootStyle = computed(() => {
  return {
    '--bg-blur': `${props.blurPx}px`,
    '--bg-saturate': String(props.saturate),
    '--bg-contrast': String(props.contrast)
  } as Record<string, string>
})

function buildUrl() {
  // cache-busting：保证「刷新页面」一定能拿到新图
  const stamp = `${Date.now()}_${Math.random().toString(16).slice(2)}`
  const joiner = props.endpoint.includes('?') ? '&' : '?'
  return `${props.endpoint}${joiner}_=${stamp}`
}

const currentUrl = ref<string>(buildUrl())
const nextUrl = ref<string | null>(null)
const nextReady = ref(false)

function refresh() {
  nextReady.value = false
  nextUrl.value = buildUrl()
}

function onNextLoaded() {
  nextReady.value = true
  // 给 CSS 过渡一点时间，再切换为 current
  window.setTimeout(() => {
    if (!nextUrl.value) return
    currentUrl.value = nextUrl.value
    nextUrl.value = null
    nextReady.value = false
  }, 520)
}

watch(
  () => route.fullPath,
  () => {
    if (props.refreshOnRouteChange) refresh()
  }
)

onMounted(() => {
  if (typeof props.refreshOnceAfterMs === 'number' && props.refreshOnceAfterMs > 0) {
    window.setTimeout(() => refresh(), props.refreshOnceAfterMs)
  }
})
</script>

<template>
  <!--
    背景图层：不要用负 z-index（容易被 body 背景盖住）
    这里用 0，内容层用 1。
  -->
  <div class="bg-root" aria-hidden="true" :style="rootStyle">
    <img class="bg-img bg-current" :src="currentUrl" alt="background" referrerpolicy="no-referrer" />

    <img
      v-if="nextUrl"
      class="bg-img bg-next"
      :class="{ ready: nextReady }"
      :src="nextUrl"
      alt="background"
      @load="onNextLoaded"
      referrerpolicy="no-referrer"
    />

    <!-- 主题遮罩：用两层 opacity 交叉淡入淡出，确保切换有 1s 动画 -->
    <div class="bg-overlay bg-overlay-light"></div>
    <div class="bg-overlay bg-overlay-dark"></div>

    <div class="bg-grain"></div>
  </div>
</template>

<style scoped>
.bg-root {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-img {
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
  object-fit: cover;
  transform: scale(1.02);

  /* 模糊强度由配置控制 */
  filter: blur(var(--bg-blur)) saturate(var(--bg-saturate)) contrast(var(--bg-contrast));
  transition: filter 1s ease;

  opacity: 0.95;
}

.bg-next {
  opacity: 0;
  transition: opacity 520ms ease;
}

.bg-next.ready {
  opacity: 1;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  transition: opacity 1s ease;
}

/* Light overlay */
.bg-overlay-light {
  opacity: 1;
  background:
    radial-gradient(900px 520px at 18% 8%, rgba(45, 212, 191, 0.26), transparent 58%),
    radial-gradient(760px 460px at 88% 12%, rgba(52, 211, 153, 0.18), transparent 55%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.62));
}

/* Dark overlay */
.bg-overlay-dark {
  opacity: 0;
  background:
    radial-gradient(900px 520px at 18% 8%, rgba(45, 212, 191, 0.16), transparent 60%),
    radial-gradient(760px 460px at 88% 12%, rgba(52, 211, 153, 0.12), transparent 58%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.72));
}

:root[data-theme='dark'] .bg-overlay-light {
  opacity: 0;
}

:root[data-theme='dark'] .bg-overlay-dark {
  opacity: 1;
}

/* 轻微颗粒感（很淡，不会遮住背景） */
.bg-grain {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image: radial-gradient(rgba(255, 255, 255, 0.85) 1px, transparent 1px);
  background-size: 3px 3px;
  mix-blend-mode: overlay;
  transition: opacity 1s ease;
}

:root[data-theme='dark'] .bg-grain {
  opacity: 0.06;
}

@media (prefers-reduced-motion: reduce) {
  .bg-img,
  .bg-overlay,
  .bg-next,
  .bg-grain {
    transition: none !important;
  }
}
</style>
