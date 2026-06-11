import { nav, navFooter } from '../data/nav-config.js'

function itemHtml(item, currentPage) {
  const active = item.id === currentPage ? ' is-active' : ''
  const inner = `
    <img class="sidebar__icon" src="/assets/${item.icon}" alt="" />
    <span class="sidebar__label">${item.label}</span>`
  if (!item.path) {
    return `<span class="sidebar__item is-disabled${active}" title="尚未切版">${inner}</span>`
  }
  return `<a class="sidebar__item${active}" href="${item.path}">${inner}</a>`
}

export function renderSidebar(el) {
  const current = document.body.dataset.page
  el.outerHTML = `
    <nav class="sidebar" aria-label="主導覽">
      <button class="sidebar__toggle" type="button" aria-label="切換側邊欄">
        <img src="/assets/icon_open-panel.svg" alt="" />
      </button>
      <div class="sidebar__nav">${nav.map((i) => itemHtml(i, current)).join('')}</div>
      <div class="sidebar__footer">${navFooter.map((i) => itemHtml(i, current)).join('')}</div>
    </nav>`
}
