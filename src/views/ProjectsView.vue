<script setup lang="ts">
import { computed, ref } from 'vue'
import { siteConfig } from '../content/site.config'
import ProjectCard from '../components/ProjectCard.vue'
import GlassCard from '../components/GlassCard.vue'

const q = ref('')
const activeTag = ref('All')

const allTags = computed(() => {
  const set = new Set<string>()
  for (const p of siteConfig.projects) {
    for (const t of p.tags) set.add(t)
  }
  return ['All', ...Array.from(set).sort()]
})

const filtered = computed(() => {
  const query = q.value.trim().toLowerCase()
  return siteConfig.projects.filter((p) => {
    const tagOk = activeTag.value === 'All' || p.tags.includes(activeTag.value)
    if (!tagOk) return false

    if (!query) return true
    const hay = `${p.name} ${p.desc} ${p.tags.join(' ')}`.toLowerCase()
    return hay.includes(query)
  })
})
</script>

<template>
  <div class="page">
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Projects</h2>
      </div>

      <GlassCard class="toolbar">
        <div class="search">
          <input v-model="q" class="input" type="search" placeholder="搜索项目 / 标签..." />
        </div>

        <div class="tags">
          <button
            v-for="t in allTags"
            :key="t"
            class="tag"
            :class="{ active: activeTag === t }"
            type="button"
            @click="activeTag = t"
          >
            {{ t }}
          </button>
        </div>
      </GlassCard>

      <div class="grid">
        <ProjectCard v-for="p in filtered" :key="p.name" :project="p" />
      </div>

      <p v-if="filtered.length === 0" class="empty muted">没有匹配到内容～可以试试换个关键字 (ง •̀_•́)ง</p>
    </section>
  </div>
</template>

<style scoped>
.toolbar {
  padding: 16px;
}

.search {
  margin-bottom: 12px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  cursor: pointer;
}

.empty {
  margin: 10px 0 0;
  font-size: 13px;
}
</style>
