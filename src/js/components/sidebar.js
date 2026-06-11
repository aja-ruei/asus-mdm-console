import { nav } from '../data/nav-config.js'

const CHEVRON = `<svg class="sidebar__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
</svg>`

// 二級選單：分組標題 + 葉項；葉 path 為 null 渲染為停用
function childHtml(child, current) {
  if (child.group) {
    return `<li class="sidebar__sub-group">${child.group}</li>`
  }
  const active = child.id === current ? ' is-active' : ''
  if (!child.path) {
    return `<li><span class="sidebar__sub-item is-disabled${active}" title="尚未切版">${child.label}</span></li>`
  }
  return `<li><a class="sidebar__sub-item${active}" href="${child.path}">${child.label}</a></li>`
}

function hasActiveChild(item, current) {
  return (item.children ?? []).some((c) => !c.group && c.id === current)
}

// 一級項：含 children → 可展開群組；否則連結／停用
function groupHtml(item, current) {
  const childActive = hasActiveChild(item, current)
  const selfActive = item.id === current
  const activeCls = childActive || selfActive ? ' is-active' : ''
  const expandedCls = childActive ? ' is-expanded' : ''

  const icon = `<img class="sidebar__icon" src="/assets/${item.icon}" alt="" />`
  const label = `<span class="sidebar__label">${item.label}</span>`

  let row
  if (item.children) {
    row = `<button class="sidebar__item${activeCls}" type="button" data-toggle aria-expanded="${childActive}">
      ${icon}${label}${CHEVRON}
    </button>`
  } else if (item.path) {
    row = `<a class="sidebar__item${activeCls}" href="${item.path}">${icon}${label}</a>`
  } else {
    row = `<span class="sidebar__item is-disabled${activeCls}" title="尚未切版">${icon}${label}</span>`
  }

  // sub：展開時 inline 顯示；收合時作為 hover 飛出 popup（含標題）
  const subItems = (item.children ?? []).map((c) => childHtml(c, current)).join('')
  const sub = `<div class="sidebar__sub">
    <div class="sidebar__sub-title">${item.label}</div>
    ${item.children ? `<ul class="sidebar__sub-list">${subItems}</ul>` : ''}
  </div>`

  return `<div class="sidebar__group${expandedCls}">${row}${sub}</div>`
}

export function renderSidebar(el) {
  const current = document.body.dataset.nav
  const main = nav.filter((i) => i.id !== 'settings')
  const footer = nav.filter((i) => i.id === 'settings')

  el.outerHTML = `
    <nav class="sidebar" aria-label="主導覽">
      <div class="sidebar__head">
        <span class="sidebar__brand">ASUS Console</span>
        <button class="sidebar__toggle" type="button" aria-label="切換側邊欄">
          <img src="/assets/icon_open-panel.svg" alt="" />
        </button>
      </div>
      <div class="sidebar__nav">${main.map((i) => groupHtml(i, current)).join('')}</div>
      <div class="sidebar__footer">${footer.map((i) => groupHtml(i, current)).join('')}</div>
    </nav>`
}

// 接上一級展開/收合切換（由 mountShell 在渲染後呼叫）
export function wireSidebar() {
  document.querySelectorAll('.sidebar__item[data-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.sidebar__group')
      const expanded = group.classList.toggle('is-expanded')
      btn.setAttribute('aria-expanded', String(expanded))
    })
  })
}
