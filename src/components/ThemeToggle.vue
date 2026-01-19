<script setup lang="ts">
import { computed } from 'vue'
import { useTheme, toggleTheme } from '../composables/useTheme'

const { theme } = useTheme()
const isDark = computed(() => theme.value === 'dark')

// 这里的 icon 显示的是“将要切换到的模式”，更符合直觉
const aria = computed(() => (isDark.value ? 'Switch to light theme' : 'Switch to dark theme'))
</script>

<template>
  <button class="toggle" type="button" :aria-label="aria" @click="toggleTheme">
    <!-- 当前是暗色：显示太阳（提示点了会切到亮色） -->
    <svg
      v-if="isDark"
      class="icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </svg>

    <!-- 当前是亮色：显示月亮（提示点了会切到暗色） -->
    <svg
      v-else
      class="icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>

    <span class="sr-only">toggle theme</span>
  </button>
</template>

<style scoped>
.toggle {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: var(--text);

  transition: transform 140ms ease, border-color 140ms ease,
    background-color var(--theme-dur) var(--theme-ease),
    color var(--theme-dur) var(--theme-ease);
}

:root[data-theme='dark'] .toggle {
  background-color: rgba(255, 255, 255, 0.06);
}

.toggle:hover {
  transform: translateY(-1px);
  border-color: var(--card-border-hover);
}

.icon {
  opacity: 0.86;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .toggle {
    transition: none !important;
  }
}
</style>
