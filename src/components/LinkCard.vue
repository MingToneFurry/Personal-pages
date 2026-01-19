<script setup lang="ts">
import GlassCard from './GlassCard.vue'
import LinkIcon from './LinkIcon.vue'
import type { LinkItem } from '../content/site.config'

const props = defineProps<{
  item: LinkItem
}>()
</script>

<template>
  <a class="link" :href="props.item.url" target="_blank" rel="noopener noreferrer">
    <GlassCard class="card">
      <div class="row">
        <div class="left">
          <LinkIcon :icon-url="props.item.iconUrl" :alt="props.item.label" :size="20" />
        </div>
        <div class="body">
          <div class="title">{{ props.item.label }}</div>
          <div v-if="props.item.desc" class="desc">{{ props.item.desc }}</div>
        </div>
        <div class="arrow" aria-hidden="true">→</div>
      </div>
    </GlassCard>
  </a>
</template>

<style scoped>
.link {
  display: block;
}

.card {
  height: 100%;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.left {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid var(--card-border);
  background-color: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease);
}

:root[data-theme='dark'] .left {
  background-color: rgba(255, 255, 255, 0.06);
}

.body {
  flex: 1 1 auto;
  min-width: 0;
}

.title {
  font-weight: 650;
  letter-spacing: 0.2px;
}

.desc {
  margin-top: 2px;
  font-size: 13px;
  color: var(--muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow {
  color: rgba(127, 127, 127, 0.8);
  font-size: 18px;
}

@media (prefers-reduced-motion: reduce) {
  .left {
    transition: none !important;
  }
}
</style>
