<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '../content/site.config'
import GlassCard from '../components/GlassCard.vue'
import LinkCard from '../components/LinkCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import IconRocket from '../components/IconRocket.vue'

const featuredProjects = computed(() => siteConfig.projects.slice(0, 3))
</script>

<template>
  <div class="page">
    <!-- Hero -->
    <GlassCard class="hero">
      <div class="hero-top">
        <img class="avatar" :src="siteConfig.avatarUrl" alt="avatar" referrerpolicy="no-referrer" />

        <div class="hero-text">
          <h1 class="title">{{ siteConfig.hero.title }}</h1>
          <p class="tagline">{{ siteConfig.hero.tagline }}</p>

          <div class="cta">
            <RouterLink class="btn primary" to="/projects">查看项目</RouterLink>
            <RouterLink class="btn primary" to="/contact">联系我</RouterLink>
          </div>
        </div>
      </div>
    </GlassCard>

    <!-- Quick links -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">快速入口</h2>
      </div>
      <div class="grid">
        <LinkCard v-for="it in siteConfig.quickLinks" :key="it.url" :item="it" />
      </div>
    </section>

    <!-- Featured projects -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">精选项目</h2>
        <RouterLink class="text-link" to="/projects">全部 →</RouterLink>
      </div>
      <div class="grid">
        <ProjectCard v-for="p in featuredProjects" :key="p.name" :project="p" />
      </div>
    </section>

    <!-- Plans -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">计划中</h2>
      </div>

      <GlassCard class="plan">
        <div class="plan-head">
          <div class="plan-icon">
            <IconRocket />
          </div>
          <div>
            <div class="plan-title">Next Todo</div>
            <div class="plan-desc muted">学习vue！</div>
          </div>
        </div>

        <ul class="plan-list">
          <li v-for="(it, idx) in siteConfig.plans" :key="idx" class="plan-item">
            <span class="dot" aria-hidden="true"></span>
            <div class="plan-item-body">
              <div class="plan-item-title">{{ it.title }}</div>
              <div v-if="it.desc" class="plan-item-desc">{{ it.desc }}</div>
            </div>
          </li>
        </ul>
      </GlassCard>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 20px;
}

.hero-top {
  display: flex;
  align-items: center;
  gap: 18px;
}

.avatar {
  width: 84px;
  height: 84px;
  border-radius: 22px;
  border: 1px solid var(--card-border);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);
}

.title {
  margin: 0;
  font-size: 26px;
  letter-spacing: 0.3px;
}

.tagline {
  margin: 8px 0 0;
  color: var(--muted);
}

.cta {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.plan {
  padding: 18px;
}

.plan-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.plan-icon {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  border: 1px solid var(--card-border);
  background: rgba(45, 212, 191, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
}

.plan-title {
  font-weight: 650;
  letter-spacing: 0.2px;
}

.plan-desc {
  margin-top: 2px;
  font-size: 13px;
}

.plan-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-top: 6px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}

.plan-item-title {
  font-weight: 600;
}

.plan-item-desc {
  margin-top: 2px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .hero {
    padding: 16px;
  }

  .hero-top {
    align-items: flex-start;
  }

  .avatar {
    width: 72px;
    height: 72px;
    border-radius: 18px;
  }

  .title {
    font-size: 22px;
  }
}
</style>
