import { ref } from 'vue'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'mt_theme'

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return true
  if (!window.matchMedia) return true
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function readInitialTheme(): ThemeMode {
  try {
    const fromDom = (document.documentElement.dataset.theme as ThemeMode | undefined) ?? undefined
    if (fromDom === 'light' || fromDom === 'dark') return fromDom
  } catch {
    // ignore
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // ignore
  }

  return getSystemPrefersDark() ? 'dark' : 'light'
}

const theme = ref<ThemeMode>(readInitialTheme())

function applyTheme(next: ThemeMode) {
  theme.value = next
  try {
    document.documentElement.dataset.theme = next
  } catch {
    // ignore
  }
}

export function setTheme(next: ThemeMode, persist = true) {
  applyTheme(next)
  try {
    if (persist) localStorage.setItem(STORAGE_KEY, next)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark', true)
}

export function clearThemeOverrideAndFollowSystem() {
  const system = getSystemPrefersDark() ? 'dark' : 'light'
  setTheme(system, false)
}

let watcherStarted = false
let mql: MediaQueryList | null = null

export function startThemeWatcher() {
  if (watcherStarted) return
  watcherStarted = true

  if (typeof window === 'undefined' || !window.matchMedia) return

  mql = window.matchMedia('(prefers-color-scheme: dark)')

  const handler = () => {
    // 如果用户手动指定过主题，就不强行跟随系统
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'light' || saved === 'dark') return
    } catch {
      // ignore
    }

    applyTheme(mql?.matches ? 'dark' : 'light')
  }

  // 初始化同步一次
  handler()

  // 监听系统变化
  try {
    mql.addEventListener('change', handler)
  } catch {
    // Safari fallback
    // eslint-disable-next-line deprecation/deprecation
    mql.addListener(handler)
  }
}

export function useTheme() {
  return {
    theme,
    setTheme,
    toggleTheme,
    clearThemeOverrideAndFollowSystem
  }
}
