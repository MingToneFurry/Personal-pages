import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Inline the entry CSS into index.html.
 *
 * Why:
 * - Lighthouse 会把入口 CSS 当成 render-blocking request。
 * - 这个项目入口 CSS 很小（~20KiB），直接内联通常更快、也能减少一次请求。
 */
function inlineEntryCssPlugin(): Plugin {
  return {
    name: 'inline-entry-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const htmlKey = Object.keys(bundle).find((k) => k.endsWith('.html'))
      if (!htmlKey) return

      const htmlAsset = bundle[htmlKey]
      if (!htmlAsset || htmlAsset.type !== 'asset') return

      let html = String(htmlAsset.source)

      const cssLinks: Array<{ rawHref: string; fileName: string }> = []

      // Replace <link rel="stylesheet" ... href="...css"> with placeholders
      html = html.replace(/<link\b[^>]*rel=("|')stylesheet\1[^>]*>/g, (tag) => {
        const hrefMatch = tag.match(/href=("|')([^"']+\.css)\1/)
        const href = hrefMatch?.[2]
        if (!href) return tag

        const fileName = href.replace(/^\.\//, '').replace(/^\//, '')
        cssLinks.push({ rawHref: href, fileName })
        return `<!-- inline-css:${href} -->`
      })

      for (const { rawHref, fileName } of cssLinks) {
        const cssAsset = bundle[fileName]
        if (!cssAsset || cssAsset.type !== 'asset') continue

        const cssSource =
          typeof cssAsset.source === 'string'
            ? cssAsset.source
            : Buffer.from(cssAsset.source).toString('utf-8')

        // Avoid breaking out of <style> by a rare "</style" sequence in CSS
        const safeCss = cssSource.replace(/<\/style/gi, '<\\/style')

        html = html.replace(`<!-- inline-css:${rawHref} -->`, `<style>${safeCss}</style>`)

        // Remove emitted css file to avoid an extra request
        delete bundle[fileName]
      }

      htmlAsset.source = html
    }
  }
}

export default defineConfig({
  plugins: [vue(), inlineEntryCssPlugin()],
  base: './',
  server: {
    port: 3287,
    strictPort: true
  },
  preview: {
    port: 3287,
    strictPort: true
  },
  build: {
    // 显式开启（默认就是 true）：配合路由懒加载，把非首屏 CSS 拆出去
    cssCodeSplit: true
  }
})
