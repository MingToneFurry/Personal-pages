export type AutoGalleryItem = {
  title: string
  src: string
  group: string
  /**
   * 原始相对路径（用于排序/调试）
   */
  _path: string
}

export type BuiltGallery = {
  items: AutoGalleryItem[]
  groups: string[]
}

type BuildOptions = {
  /**
   * 是否把子目录层级也作为 group 的一部分。
   * - false：只取第一级目录作为 group（推荐，group 不会爆炸）
   * - true：用完整子路径作为 group（适合你真的想按 2024/xx 这种细分）
   */
  groupUseFullPath?: boolean

  /**
   * 当图片直接放在 gallery 根目录时使用的 group 名
   */
  rootGroupName?: string

  /**
   * groups 的排序方式
   */
  sortGroups?: (a: string, b: string) => number

  /**
   * items 的排序方式
   */
  sortItems?: (a: AutoGalleryItem, b: AutoGalleryItem) => number
}

function titleFromFilename(filename: string): string {
  const noExt = filename.replace(/\.[^/.]+$/, '')
  // 文件名里常见的 - _ 变成空格；再做一点点清理
  return noExt
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeSlashes(p: string): string {
  return p.replace(/\\/g, '/')
}

function pickGroup(relPath: string, opts: Required<Pick<BuildOptions, 'groupUseFullPath' | 'rootGroupName'>>): string {
  const parts = relPath.split('/').filter(Boolean)
  if (parts.length <= 1) return opts.rootGroupName

  // parts: [group, ...subdirs, filename]
  if (!opts.groupUseFullPath) return parts[0]

  // full path group: join all but last segment (filename)
  return parts.slice(0, -1).join('/')
}

export function buildGalleryFromAssets(options: BuildOptions = {}): BuiltGallery {
  const opts = {
    groupUseFullPath: options.groupUseFullPath ?? false,
    rootGroupName: options.rootGroupName ?? 'All',
    sortGroups: options.sortGroups ?? ((a, b) => a.localeCompare(b)),
    sortItems: options.sortItems ?? ((a, b) => a._path.localeCompare(b._path))
  }

  // 重要：query: '?url' + import: 'default' 会让 Vite 返回可直接用于 <img> 的 URL 字符串
 
  const modules = import.meta.glob('../assets/gallery/**/*.{png,jpg,jpeg,webp,gif,avif}', {
    eager: true,
    query: '?url',
    import: 'default'
  }) as Record<string, string>

  const prefix = '../assets/gallery/'

  const items: AutoGalleryItem[] = []
  const groupsSet = new Set<string>()

  for (const rawPath of Object.keys(modules)) {
    const p = normalizeSlashes(rawPath)
    const url = modules[rawPath]

    const rel = p.startsWith(prefix) ? p.slice(prefix.length) : p
    const group = pickGroup(rel, opts)

    const filename = rel.split('/').pop() ?? rel
    const title = titleFromFilename(filename)

    items.push({
      title,
      src: url,
      group,
      _path: rel
    })
    groupsSet.add(group)
  }

  items.sort(opts.sortItems)

  // groups：保证 rootGroupName 在最前
  const groups = Array.from(groupsSet).sort(opts.sortGroups)
  const rootIdx = groups.indexOf(opts.rootGroupName)
  if (rootIdx !== -1) {
    groups.splice(rootIdx, 1)
  }
  groups.unshift(opts.rootGroupName)

  return { items, groups }
}
