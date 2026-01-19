<template>
  <div class="header">
    <h1 class="title">{{ title }}</h1>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<style scoped>
.header {
  margin: 0 0 18px;
}
.title {
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.15;
  margin: 0;
  letter-spacing: -0.2px;
}
.subtitle {
  margin: 10px 0 0;
  color: var(--text-muted);
  line-height: 1.6;
}
</style>
