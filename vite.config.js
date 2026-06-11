import { defineConfig } from 'vite'
import { resolve, relative } from 'node:path'
import { readdirSync, existsSync } from 'node:fs'

const root = import.meta.dirname

// 掃描 pages/**/*.html 作為 build 入口；新增頁面不用改這個檔
function pageEntries() {
  const dir = resolve(root, 'pages')
  if (!existsSync(dir)) return {}
  const entries = {}
  for (const e of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (e.isFile() && e.name.endsWith('.html')) {
      const full = resolve(e.parentPath, e.name)
      entries[relative(root, full).replace(/\.html$/, '').replaceAll('/', '-')] = full
    }
  }
  return entries
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: { index: resolve(root, 'index.html'), ...pageEntries() },
    },
  },
})
