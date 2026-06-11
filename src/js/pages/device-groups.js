import '/src/scss/main.scss'
import { mountShell } from '../utils/mount.js'
import { getState } from '../utils/state.js'
import { deviceGroups } from '../data/device-groups.js'

mountShell()

const tbody = document.querySelector('[data-list="device-groups"]')
const pager = document.querySelector('[data-pagination]')
const selectAll = document.querySelector('[data-select-all]')
const deleteBtn = document.querySelector('.toolbar__delete')

const state = getState()
const data = deviceGroups[state]

const COLSPAN = 5
let pageSize = 10
let page = 1

function stateRow(text) {
  return `<tr class="data-table__state-row"><td colspan="${COLSPAN}">${text}</td></tr>`
}

function rowHtml(d) {
  return `
    <tr>
      <td class="data-table__check"><input type="checkbox" data-row-check aria-label="選取 ${d.name}" /></td>
      <td>
        <span class="folder-chip">
          <img class="folder-chip__icon" src="/assets/icon_folder.svg" alt="" />
          <span class="folder-chip__label">${d.name}</span>
        </span>
      </td>
      <td>${d.count}</td>
      <td>${d.created}</td>
      <td>${d.modified}</td>
    </tr>`
}

function renderPager(total) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  pager.innerHTML = `
    <label class="pagination__size">每頁行數：
      <select data-page-size>
        ${[10, 20, 50].map((n) => `<option value="${n}"${n === pageSize ? ' selected' : ''}>${n}</option>`).join('')}
      </select>
    </label>
    <span class="pagination__range">${start}-${end} 共 ${total} 條</span>
    <span class="pagination__pages">共 ${pageCount} 頁</span>
    <span class="pagination__nav">
      <button type="button" data-page-prev aria-label="上一頁"${page <= 1 ? ' disabled' : ''}>‹</button>
      <button type="button" data-page-next aria-label="下一頁"${page >= pageCount ? ' disabled' : ''}>›</button>
    </span>`
}

function syncDeleteState() {
  const checked = tbody.querySelectorAll('[data-row-check]:checked').length
  deleteBtn.disabled = checked === 0
  const all = tbody.querySelectorAll('[data-row-check]')
  if (selectAll) {
    selectAll.checked = all.length > 0 && checked === all.length
    selectAll.indeterminate = checked > 0 && checked < all.length
  }
}

function renderTable() {
  if (data === null) {
    tbody.innerHTML = stateRow('載入中…')
    pager.innerHTML = ''
    return
  }
  if (!Array.isArray(data)) {
    tbody.innerHTML = stateRow(`發生錯誤（${data.code}）：${data.message}`)
    pager.innerHTML = ''
    return
  }
  if (data.length === 0) {
    tbody.innerHTML = stateRow('目前沒有裝置群組')
    renderPager(0)
    return
  }
  const slice = data.slice((page - 1) * pageSize, page * pageSize)
  tbody.innerHTML = slice.map(rowHtml).join('')
  renderPager(data.length)
  syncDeleteState()
}

// 事件：分頁、每頁行數、全選、單列選取
pager.addEventListener('click', (e) => {
  if (e.target.closest('[data-page-prev]')) page--
  else if (e.target.closest('[data-page-next]')) page++
  else return
  renderTable()
})
pager.addEventListener('change', (e) => {
  if (e.target.matches('[data-page-size]')) {
    pageSize = Number(e.target.value)
    page = 1
    renderTable()
  }
})
selectAll?.addEventListener('change', () => {
  tbody.querySelectorAll('[data-row-check]').forEach((c) => {
    c.checked = selectAll.checked
  })
  syncDeleteState()
})
tbody.addEventListener('change', (e) => {
  if (e.target.matches('[data-row-check]')) syncDeleteState()
})

renderTable()
