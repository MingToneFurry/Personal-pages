<template>
  <span class="icon" :class="`icon--${size}`" aria-hidden="true" v-html="svg" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

type IconName =
  | 'spark'
  | 'refresh'
  | 'moon'
  | 'sun'
  | 'github'
  | 'telegram'
  | 'email'
  | 'link'
  | 'blog'
  | 'api'
  | 'rocket'

const props = withDefaults(defineProps<{ name: IconName; size?: 'sm' | 'md' | 'lg' }>(), {
  size: 'md'
})

const svg = computed(() => {
  switch (props.name) {
    case 'refresh':
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 4v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    case 'moon':
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 14.5A7.5 7.5 0 0 1 9.5 3a6.5 6.5 0 1 0 11.5 11.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`
    case 'sun':
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
    case 'github':
      // Lucide-style GitHub icon (clean viewBox 0..24)
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    case 'telegram':
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.9 4.6 3.2 11.8c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 11.1-7c.5-.3 1-.1.6.2l-9 8.1-.3 4.4c.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.9l3-14.2c.2-1.2-.4-1.7-1.4-1.3Z" fill="currentColor"/></svg>`
    case 'email':
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v12H4V6Z" stroke="currentColor" stroke-width="2"/><path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    case 'link':
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
    case 'blog':
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4h14v16H5V4Z" stroke="currentColor" stroke-width="2"/><path d="M8 8h8M8 12h8M8 16h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
    case 'api':
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8h10M7 12h10M7 16h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" stroke="currentColor" stroke-width="2"/></svg>`
    case 'rocket':
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13c3-6 9-10 14-10 0 5-4 11-10 14l-4-4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 17l-1 4 4-1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 9a2 2 0 1 0 0.01 0Z" stroke="currentColor" stroke-width="2"/>
      </svg>`
    case 'spark':
    default:
      return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l1.2 5.2L18 8l-4.8 0.8L12 14l-1.2-5.2L6 8l4.8-0.8L12 2Z" fill="currentColor"/></svg>`
  }
})
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}
.icon :deep(svg) {
  display: block;
  width: 1em;
  height: 1em;
}
.icon--sm {
  font-size: 14px;
}
.icon--md {
  font-size: 18px;
}
.icon--lg {
  font-size: 22px;
}
</style>
