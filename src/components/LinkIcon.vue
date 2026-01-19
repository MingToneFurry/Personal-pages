<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    iconUrl?: string
    alt?: string
    size?: number
  }>(),
  {
    alt: 'icon',
    size: 18
  }
)
</script>

<template>
  <span class="icon" :style="{ width: props.size + 'px', height: props.size + 'px' }">
    <img
      v-if="props.iconUrl"
      :src="props.iconUrl"
      :alt="props.alt"
      :width="props.size"
      :height="props.size"
      loading="lazy"
      referrerpolicy="no-referrer"
    />

    <!-- 默认图标：简洁链条 -->
    <svg
      v-else
      viewBox="0 0 24 24"
      :width="props.size"
      :height="props.size"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
    </svg>
  </span>
</template>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  color: rgba(127, 127, 127, 0.95);
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
}
</style>
