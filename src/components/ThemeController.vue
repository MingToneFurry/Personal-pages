<script setup lang="ts">
import { onMounted } from 'vue'
import { startThemeWatcher } from '../composables/useTheme'

onMounted(() => {
  startThemeWatcher()
})
</script>

<template>
  <!-- no-op: only for side effects -->
  <span style="display: none" aria-hidden="true"></span>
</template>
