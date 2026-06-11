import '/src/scss/main.scss'
import { mountShell } from '../utils/mount.js'
import { getState } from '../utils/state.js'
import { sample } from '../data/sample.js'

mountShell()

const state = getState()
const data = sample[state]
const tbody = document.querySelector('[data-list="sample"]')
document.querySelector('[data-state-note]').textContent =
  `目前狀態：${state}（用 ?state=loading|empty|error|max 切換）`

if (data === null) {
  // loading：之後依設計稿換成 skeleton 元件
  tbody.innerHTML = `<tr class="data-table__state-row"><td colspan="3">載入中…</td></tr>`
} else if (!Array.isArray(data)) {
  tbody.innerHTML = `<tr class="data-table__state-row"><td colspan="3">發生錯誤（${data.code}）：${data.message}</td></tr>`
} else if (data.length === 0) {
  tbody.innerHTML = `<tr class="data-table__state-row"><td colspan="3">沒有資料</td></tr>`
} else {
  tbody.innerHTML = data
    .map(
      (d) => `
      <tr>
        <td class="data-table__cell--truncate">${d.name}</td>
        <td>${d.os}</td>
        <td>${d.status}</td>
      </tr>`,
    )
    .join('')
}
