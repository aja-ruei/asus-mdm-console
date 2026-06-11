import { renderSidebar, wireSidebar } from '../components/sidebar.js'
import { renderHeader } from '../components/header.js'

const registry = { sidebar: renderSidebar, header: renderHeader }

const COLLAPSE_KEY = 'sidebar-collapsed'

// 還原收合狀態：localStorage 記住的使用者偏好（桌機）。tablet 以下由 CSS 強制收合。
function restoreCollapsed() {
  if (localStorage.getItem(COLLAPSE_KEY) === 'true') {
    document.body.classList.add('is-sidebar-collapsed')
  }
}

// 渲染頁面上所有 <div data-component="..."> 掛載點，並接上 shell 層級的互動
export function mountShell() {
  restoreCollapsed()
  document.querySelectorAll('[data-component]').forEach((el) => {
    registry[el.dataset.component]?.(el)
  })
  wireSidebar()
  document.querySelector('.sidebar__toggle')?.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('is-sidebar-collapsed')
    localStorage.setItem(COLLAPSE_KEY, String(collapsed))
  })
}
