import { renderSidebar, wireSidebar } from '../components/sidebar.js'
import { renderHeader } from '../components/header.js'

const registry = { sidebar: renderSidebar, header: renderHeader }

const COLLAPSE_KEY = 'sidebar-collapsed'
const DESKTOP_MIN = 1280 // 與 SCSS $bp-desktop 一致：≥ 桌機、< 平板

// 預設：桌機展開、平板收合。使用者一旦手動 toggle，其偏好（localStorage）優先且不受視窗寬度影響。
function isCollapsedDefault() {
  const saved = localStorage.getItem(COLLAPSE_KEY)
  if (saved !== null) return saved === 'true'
  return window.innerWidth < DESKTOP_MIN
}

function applyCollapsed() {
  document.body.classList.toggle('is-sidebar-collapsed', isCollapsedDefault())
}

// 渲染頁面上所有 <div data-component="..."> 掛載點，並接上 shell 層級的互動
export function mountShell() {
  // 初次套用預設狀態時抑制過場（避免平板載入時的開場收合動畫），下一影格再恢復
  document.body.classList.add('no-anim')
  applyCollapsed()

  document.querySelectorAll('[data-component]').forEach((el) => {
    registry[el.dataset.component]?.(el)
  })
  wireSidebar()

  // toggle：使用者明確選擇，記住偏好並優先（桌機/平板皆可展開或收合，不限制）
  document.querySelector('.sidebar__toggle')?.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('is-sidebar-collapsed')
    localStorage.setItem(COLLAPSE_KEY, String(collapsed))
  })

  // 尚未手動設定偏好時，隨視窗寬度套用裝置預設（跨越 1280 斷點即彈性切換）
  window.addEventListener('resize', () => {
    if (localStorage.getItem(COLLAPSE_KEY) === null) applyCollapsed()
  })

  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove('no-anim')))
}
