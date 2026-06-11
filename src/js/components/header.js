// 麵包屑由掛載點 data-breadcrumb 提供（以 / 分隔，末項為當前頁）。
function breadcrumbHtml(raw) {
  const crumbs = (raw || '').split('/').map((s) => s.trim()).filter(Boolean)
  if (!crumbs.length) return ''
  return `<nav class="breadcrumb" aria-label="麵包屑">${crumbs
    .map((c, i) => {
      const current = i === crumbs.length - 1
      const sep = current ? '' : '<span class="breadcrumb__sep" aria-hidden="true">›</span>'
      return `<span class="breadcrumb__item${current ? ' is-current' : ''}"${current ? ' aria-current="page"' : ''}>${c}</span>${sep}`
    })
    .join('')}</nav>`
}

export function renderHeader(el) {
  const crumbs = breadcrumbHtml(el.dataset.breadcrumb)
  el.outerHTML = `
    <header class="header">
      ${crumbs}
      <div class="header__actions">
        <button class="header__icon-btn" type="button" aria-label="通知">
          <img src="/assets/icon_notification.svg" alt="" />
        </button>
        <button class="header__user" type="button" aria-label="使用者選單">
          <span class="header__avatar">AB</span>
          <span class="header__user-meta">
            <span class="header__user-name">Abby Chen</span>
            <span class="header__user-email">adim@gmail.com</span>
          </span>
        </button>
      </div>
    </header>`
}
