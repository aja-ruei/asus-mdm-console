export function renderHeader(el) {
  el.outerHTML = `
    <header class="header">
      <button class="header__menu-toggle" type="button" aria-label="切換側邊欄">
        <img src="/assets/icon_open-panel.svg" alt="" />
      </button>
      <div class="header__search">
        <img src="/assets/icon_search.svg" alt="" />
        <input type="search" placeholder="Search" aria-label="搜尋" />
      </div>
      <div class="header__actions">
        <button class="header__icon-btn" type="button" aria-label="通知">
          <img src="/assets/icon_notification.svg" alt="" />
        </button>
        <button class="header__avatar" type="button" aria-label="使用者選單">R</button>
      </div>
    </header>`
}
