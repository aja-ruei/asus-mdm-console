import { renderSidebar } from '../components/sidebar.js'
import { renderHeader } from '../components/header.js'

const registry = { sidebar: renderSidebar, header: renderHeader }

// 渲染頁面上所有 <div data-component="..."> 掛載點，並接上 shell 層級的互動
export function mountShell() {
  document.querySelectorAll('[data-component]').forEach((el) => {
    registry[el.dataset.component]?.(el)
  })
  document
    .querySelector('.header__menu-toggle')
    ?.addEventListener('click', () => document.body.classList.toggle('is-sidebar-collapsed'))
}
