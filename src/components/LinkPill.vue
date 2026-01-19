<script setup lang="ts">
import LinkIcon from './LinkIcon.vue'
import type { LinkItem } from '../content/site.config'

const props = defineProps<{
  item: LinkItem
}>()
</script>

<template>
  <a class="pill" :href="props.item.url" target="_blank" rel="noopener noreferrer">
    <LinkIcon :icon-url="props.item.iconUrl" :alt="props.item.label" :size="18" />
    <span class="label">{{ props.item.label }}</span>
  </a>
</template>

<style scoped>
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--card-border);
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  color: var(--text);
  font-size: 13px;

  transition: transform 140ms ease, border-color 140ms ease,
    background-color var(--theme-dur) var(--theme-ease),
    color var(--theme-dur) var(--theme-ease);
}

:root[data-theme='dark'] .pill {
  background-color: rgba(255, 255, 255, 0.06);
}

.pill:hover {
  transform: translateY(-1px);
  border-color: var(--card-border-hover);
}

.label {
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .pill {
    transition: none !important;
  }
}
</style>
