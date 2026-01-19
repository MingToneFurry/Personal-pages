<script setup lang="ts">
import { onMounted, ref } from 'vue'

const el = ref<HTMLElement | null>(null)

let raf = 0
let lastX = 0
let lastY = 0

function setSpot(x: string, y: string) {
  if (!el.value) return
  el.value.style.setProperty('--mx', x)
  el.value.style.setProperty('--my', y)
}

function onMove(ev: MouseEvent) {
  if (!el.value) return

  const rect = el.value.getBoundingClientRect()
  lastX = ev.clientX - rect.left
  lastY = ev.clientY - rect.top

  if (raf) return
  raf = window.requestAnimationFrame(() => {
    if (!el.value) return
    el.value.style.setProperty('--mx', `${lastX}px`)
    el.value.style.setProperty('--my', `${lastY}px`)
    raf = 0
  })
}

function onLeave() {
  // 回到一个舒服的默认高光位置
  setSpot('50%', '35%')
}

onMounted(() => {
  onLeave()
})
</script>

<template>
  <div class="glass" ref="el" @mousemove="onMove" @mouseleave="onLeave">
    <slot />
  </div>
</template>

<style scoped>
.glass {
  position: relative;
  overflow: hidden;

  border-radius: var(--radius);
  border: 1px solid var(--card-border);
  background-color: var(--card-bg);
  backdrop-filter: blur(var(--blur));
  box-shadow: var(--card-shadow);
  padding: 16px;

  transition: transform 140ms ease, box-shadow 140ms ease,
    background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease);
}

/* 鼠标跟随的渐变高光（仅卡片内） */
.glass:before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  pointer-events: none;

  opacity: 0;
  transition: opacity 140ms ease;

  background:
    radial-gradient(720px 280px at var(--mx, 50%) var(--my, 35%), rgba(45, 212, 191, 0.28), transparent 60%),
    radial-gradient(520px 240px at 90% 10%, rgba(52, 211, 153, 0.12), transparent 62%);
}

.glass:hover {
  transform: translateY(-1px);
}

.glass:hover:before {
  opacity: 1;
}

@media (max-width: 640px) {
  .glass {
    padding: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .glass {
    transition: none !important;
  }
  .glass:before {
    transition: none !important;
  }
}
</style>
