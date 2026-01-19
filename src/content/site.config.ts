export type NavItem = {
  label: string
  to: string
}

export type LinkItem = {
  label: string
  url: string
  desc?: string
  /**
   * 可选：每个 link 单独的图标（直链加载）。
   * - 建议用 svg/png，大小统一由组件固定。
   * - 不填则使用默认图标。
   */
  iconUrl?: string
}

export type ProjectItem = {
  name: string
  desc: string
  tags: string[]
  status?: 'active' | 'planned'
  links: LinkItem[]
}

export type PlanItem = {
  title: string
  desc?: string
}

export type GalleryItem = {
  title: string
  src: string
  group?: string
}

export const siteConfig = {
  siteTitle: 'MingTone',

  avatarUrl: 'https://q.qlogo.cn/headimg_dl?dst_uin=2244347713&spec=5',

  hero: {
    title: '你好，我是 MingTone',
    tagline: 'furry / web / Cloudflare探索者'
  },

  background: {
    endpoint: 'https://api.furry.ist/furry-img',

    /**
     * 你的背景接口：刷新页面就会换图。
     * 因此这里默认「不」在路由切换时刷新，避免背景过于频繁变化。
     */
    refreshOnRouteChange: false,

    /** 页面首次加载后自动刷新一次：0 = 关闭 */
    refreshOnceAfterMs: 0,

    /**
     * 背景视觉参数（建议你从这里微调）
     * - blurPx：模糊强度（越小越清晰）
     * - saturate / contrast：色彩饱和度 / 对比度（轻微即可）
     */
    blurPx: 6,
    saturate: 1.12,
    contrast: 1.05
  },

  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' }
  ] satisfies NavItem[],

  quickLinks: [
    {
      label: '博客',
      url: 'https://blog.furry.ist/',
      desc: 'MingTone 滴小站'
    },
    {
      label: 'FurryAPI',
      url: 'https://api.furry.ist/',
      desc: 'API 主站'
    },
    {
      label: 'API 背景接口',
      url: 'https://api.furry.ist/furry-img',
      desc: '来点毛毛！'
    }
  ] satisfies LinkItem[],

  about: {
    blocks: [
      {
        title: '关于我',
        body:
          '喜欢折腾网站和基础设施，常驻 X tg'
      },
      {
        title: '我在做什么',
        body: '逐梦'
      }
    ]
  },

  projects: [
    {
      name: 'FurryAPI',
      desc: '面向中国 furry 圈子的 API 服务',
      tags: ['API', 'Infra'],
      status: 'active',
      links: [
        { label: 'Website', url: 'https://api.furry.ist/' },
        { label: 'Background API', url: 'https://api.furry.ist/furry-img' }
      ]
    },
    {
      name: 'MingTone滴小站',
      desc: '我的博客，一个小透明的个人空间',
      tags: ['Web', 'Blog'],
      status: 'active',
      links: [{ label: 'Open', url: 'https://blog.furry.ist/' }]
    },
    {
      name: '综合平台（规划中）',
      desc: '约稿、票务、聊天、返图、交友一体化。',
      tags: ['Product', 'Community'],
      status: 'planned',
      links: [{ label: 'Idea', url: 'https://furryrealm.com/' }]
    }
  ] satisfies ProjectItem[],

  plans: [
    {
      title: '中国 furry 圈最大综合平台',
      desc: '约稿、票务、聊天、返图、交友一体化'
    },
    {
      title: 'Cloudflare 新玩法整合',
      desc: '把缓存、边缘计算组合得更顺滑'
    },
    {
      title: '监控与稳定性',
      desc: '更直观的状态反馈、更稳的 SLA （存疑）'
    }
  ] satisfies PlanItem[],

  gallery: {
    /**
     * 图集是可选的：你可以把 src 换成你自己的直链。
     * 这里先给一些占位，方便你确认布局是否喜欢。
     */
    items: [
      {
        title: '占位图 1',
        src: 'https://api.furry.ist/furry-img',
        group: 'All'
      },
      {
        title: '占位图 2',
        src: 'https://api.furry.ist/furry-img',
        group: 'All'
      },
      {
        title: '占位图 3',
        src: 'https://api.furry.ist/furry-img',
        group: 'All'
      }
    ] satisfies GalleryItem[],
    groups: ['All']
  },

  contactLinks: [
    {
      label: '博客',
      url: 'https://blog.furry.ist/',
      desc: 'blog.furry.ist'
    },
    {
      label: 'API',
      url: 'https://api.furry.ist/',
      desc: 'api.furry.ist'
    }
  ] satisfies LinkItem[],

  footer: {
    text: '© {year} MingTone · Furry！'
  }
}
