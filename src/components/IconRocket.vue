<template>
  <svg
    class="rocket"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- 主体：对称“胶囊”形 -->
    <path d="M12 2c-2.9 2.2-4.5 5.4-4.5 8.8 0 3.4 1.6 6.6 4.5 8.8 2.9-2.2 4.5-5.4 4.5-8.8S14.9 4.2 12 2Z" />
    <!-- 舷窗 -->
    <circle cx="12" cy="10" r="1.6" />
    <!-- 左右尾翼 -->
    <path d="M8.2 15.4 6.1 16.2l0.7-2.2" />
    <path d="M15.8 15.4 17.9 16.2l-0.7-2.2" />
    <!-- 火焰 -->
    <path d="M12 22c0.9-1 1.4-2.1 1.4-3.1 0-1.1-0.5-2.2-1.4-3.3-0.9 1.1-1.4 2.2-1.4 3.3 0 1 0.5 2.1 1.4 3.1Z" />
  </svg>
</template>

<style scoped>
.rocket {
  width: 18px;
  height: 18px;
  opacity: 0.9;
}
</style>
