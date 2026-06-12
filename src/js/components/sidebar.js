import { nav } from '../data/nav-config.js'

const CHEVRON = `<svg class="sidebar__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
  <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
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
  // 預設不自動展開（即使當前頁屬於此群組）：展開側欄維持七個一級入口的乾淨佈局（對齊設計稿），
  // 展開↔收合切換時各 icon 的水平與垂直位置完全一致、零位移。展開仍可由使用者點擊切換。
  const expandedCls = ''

  const icon = `<img class="sidebar__icon" src="/assets/${item.icon}" alt="" />`
  const label = `<span class="sidebar__label">${item.label}</span>`

  let row
  if (item.children) {
    row = `<button class="sidebar__item${activeCls}" type="button" data-toggle aria-expanded="false">
      ${icon}${label}${CHEVRON}
    </button>`
  } else if (item.path) {
    row = `<a class="sidebar__item${activeCls}" href="${item.path}">${icon}${label}</a>`
  } else {
    row = `<span class="sidebar__item is-disabled${activeCls}" title="尚未切版">${icon}${label}</span>`
  }

  // sub：展開時 inline（高度漸變）；收合時作為 hover 飛出 popup（含標題）
  // 內層 .sidebar__sub-inner 供 grid 高度漸變使用
  const subItems = (item.children ?? []).map((c) => childHtml(c, current)).join('')
  const sub = `<div class="sidebar__sub"><div class="sidebar__sub-inner">
    <div class="sidebar__sub-title">${item.label}</div>
    ${item.children ? `<ul class="sidebar__sub-list">${subItems}</ul>` : ''}
  </div></div>`

  return `<div class="sidebar__group${expandedCls}">${row}${sub}</div>`
}

export function renderSidebar(el) {
  const current = document.body.dataset.nav

  // 設計稿：設定為第 7 個一級入口，與其他項連續排列（不釘在底部）
  el.outerHTML = `
    <nav class="sidebar" aria-label="主導覽">
      <div class="sidebar__head">
        <div class="sidebar__brand">
          <img class="sidebar__logo" src="/assets/logo.svg" alt="ASUS Console" />
          <span class="sidebar__brand-text">Console</span>
        </div>
        <button class="sidebar__toggle" type="button" aria-label="切換側邊欄">
          <img src="/assets/icon_open-panel.svg" alt="" />
        </button>
      </div>
      <div class="sidebar__nav">${nav.map((i) => groupHtml(i, current)).join('')}</div>
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
