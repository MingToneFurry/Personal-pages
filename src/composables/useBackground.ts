import { ref } from 'vue'
import { siteConfig } from '../content/site.config'

const endpoint = siteConfig.background.endpoint

const url = ref<string>('')
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

async function preloadImage(src: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('Image failed to load'))
    img.src = src
  })
}

/**
 * Get a fresh background image.
 * The API returns a raw image, so we just update the image URL with a cache-bust query.
 */
export async function refreshBackground(): Promise<void> {
  if (isLoading.value) return

  isLoading.value = true
  error.value = null

  const next = `${endpoint}?t=${Date.now()}`

  try {
    await preloadImage(next)
    url.value = next
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    isLoading.value = false
  }
}

export function useBackground() {
  return {
    url,
    isLoading,
    error,
    refreshBackground
  }
}
