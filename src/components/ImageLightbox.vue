<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'

export type LightboxItem = {
  src: string
  title?: string
}

const props = defineProps<{
  items: LightboxItem[]
  /**
   * 当前打开的索引；null 表示关闭
   */
  index: number | null
}>()

const emit = defineEmits<{
  (e: 'update:index', value: number | null): void
}>()

const open = computed(() => typeof props.index === 'number' && props.index >= 0)

const current = computed<LightboxItem | null>(() => {
  if (!open.value) return null
  const idx = props.index as number
  return props.items[idx] ?? null
})

const counterText = computed(() => {
  if (!open.value) return ''
  return `${(props.index as number) + 1} / ${props.items.length}`
})

function close() {
  emit('update:index', null)
}

function prev() {
  if (!open.value) return
  const len = props.items.length
  if (len <= 0) return
  const idx = (props.index as number)
  emit('update:index', (idx - 1 + len) % len)
}

function next() {
  if (!open.value) return
  const len = props.items.length
  if (len <= 0) return
  const idx = (props.index as number)
  emit('update:index', (idx + 1) % len)
}

function onKeydown(ev: KeyboardEvent) {
  if (!open.value) return
  if (ev.key === 'Escape') {
    ev.preventDefault()
    close()
    return
  }
  if (ev.key === 'ArrowLeft') {
    ev.preventDefault()
    prev()
    return
  }
  if (ev.key === 'ArrowRight') {
    ev.preventDefault()
    next()
    return
  }
}

watch(
  () => open.value,
  (v) => {
    // 打开时锁滚动；关闭时恢复
    try {
      if (v) document.documentElement.style.overflow = 'hidden'
      else document.documentElement.style.overflow = ''
    } catch {
      // ignore
    }
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  try {
    document.documentElement.style.overflow = ''
  } catch {
    // ignore
  }
})
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="overlay" role="dialog" aria-modal="true" @click.self="close">
      <div class="panel">
        <button class="icon-btn close" type="button" aria-label="关闭" @click="close">×</button>

        <button class="icon-btn nav prev" type="button" aria-label="上一张" @click="prev">‹</button>
        <button class="icon-btn nav next" type="button" aria-label="下一张" @click="next">›</button>

        <figure class="figure">
          <img class="img" :src="current?.src" :alt="current?.title ?? ''" referrerpolicy="no-referrer" />
          <figcaption v-if="current?.title" class="cap">{{ current.title }}</figcaption>
        </figure>

        <div class="counter" aria-hidden="true">{{ counterText }}</div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;

  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);

  padding: 22px 12px;
  overflow: auto;
}

.panel {
  position: relative;
  width: min(980px, calc(100% - 12px));
  margin: 0 auto;

  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(18px);
  box-shadow: var(--card-shadow);

  padding: 14px;
}

:root[data-theme='dark'] .panel {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(10, 14, 13, 0.55);
}

.figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.img {
  max-width: 100%;
  max-height: calc(100vh - 160px);
  border-radius: 18px;
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
}

.cap {
  color: var(--muted);
  font-size: 13px;
  text-align: center;
}

.counter {
  position: absolute;
  right: 12px;
  bottom: 10px;

  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(0, 0, 0, 0.18);
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
}

.icon-btn {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.16);
  color: rgba(255, 255, 255, 0.92);

  width: 40px;
  height: 40px;
  border-radius: 999px;

  display: inline-grid;
  place-items: center;

  cursor: pointer;
  user-select: none;
  transition: transform 140ms ease, background 140ms ease, border 140ms ease;
}

.icon-btn:hover {
  transform: translateY(-1px);
  background: rgba(0, 0, 0, 0.22);
  border-color: rgba(255, 255, 255, 0.28);
}

.icon-btn:active {
  transform: translateY(0);
}

.close {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 22px;
  line-height: 1;
}

.nav {
  position: absolute;
  top: calc(50% - 20px);
  font-size: 26px;
  line-height: 1;
}

.prev {
  left: 12px;
}

.next {
  right: 12px;
}

@media (max-width: 640px) {
  .panel {
    padding: 12px;
  }

  .nav {
    top: auto;
    bottom: 12px;
  }

  .prev {
    left: 12px;
  }

  .next {
    right: 60px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .icon-btn {
    transition: none !important;
  }
}
</style>
