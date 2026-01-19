<script setup lang="ts">
import GlassCard from './GlassCard.vue'
import LinkPill from './LinkPill.vue'
import IconRocket from './IconRocket.vue'
import type { ProjectItem } from '../content/site.config'

const props = defineProps<{
  project: ProjectItem
}>()
</script>

<template>
  <GlassCard class="card">
    <div class="head">
      <div class="name-row">
        <h3 class="name">{{ props.project.name }}</h3>
        <div v-if="props.project.status" class="badge" :class="props.project.status">
          <IconRocket v-if="props.project.status === 'planned'" />
          <span>{{ props.project.status === 'planned' ? 'Planned' : 'Active' }}</span>
        </div>
      </div>

      <p class="desc">{{ props.project.desc }}</p>
    </div>

    <div class="tags">
      <span v-for="t in props.project.tags" :key="t" class="tag">{{ t }}</span>
    </div>

    <div class="links">
      <LinkPill v-for="l in props.project.links" :key="l.url" :item="l" />
    </div>
  </GlassCard>
</template>

<style scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.name {
  margin: 0;
  font-size: 16px;
  letter-spacing: 0.2px;
}

.desc {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 2px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--card-border);
  background-color: rgba(255, 255, 255, 0.14);
  color: var(--muted);
  font-size: 12px;

  transition: background-color var(--theme-dur) var(--theme-ease),
    border-color var(--theme-dur) var(--theme-ease),
    color var(--theme-dur) var(--theme-ease);
}

:root[data-theme='dark'] .badge {
  background-color: rgba(255, 255, 255, 0.06);
}

.badge.active {
  border-color: rgba(45, 212, 191, 0.35);
  color: var(--text);
  background-color: rgba(45, 212, 191, 0.12);
}

.badge.planned {
  border-color: rgba(52, 211, 153, 0.35);
  color: var(--text);
  background-color: rgba(52, 211, 153, 0.1);
}

@media (prefers-reduced-motion: reduce) {
  .badge {
    transition: none !important;
  }
}
</style>
