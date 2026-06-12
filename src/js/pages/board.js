import '/src/scss/main.scss'
import { groups } from '../data/progress-config.js'
import { STATES } from '../utils/state.js'
import { components } from '../data/components-registry.js'

const STATUS_LABEL = { todo: '未開始', wip: '進行中', done: '已完成' }
const STATE_LABEL = { default: '預設', loading: '載入', empty: '空', error: '錯誤', max: '極限' }

const priorityClass = (p) => (p === 'P1' ? 'p1' : p === 'P2' ? 'p2' : 'tbd')

const stateLinks = (path) =>
  STATES.map((s) => `<a class="board__state-link" href="${path}?state=${s}">${STATE_LABEL[s]}</a>`).join('')

const itemHtml = (it) => `
  <li class="board__item">
    <span class="board__title">${it.title}</span>
    <span class="badge badge--${priorityClass(it.priority)}">${it.priority}</span>
    <span class="badge badge--${it.status}">${STATUS_LABEL[it.status]}</span>
    <span class="board__links">${it.path ? stateLinks(it.path) : '—'}</span>
  </li>`

document.querySelector('#board').innerHTML = groups
  .map(
    (g) => `
    <section class="board__group">
      <h2>${g.title}</h2>
      ${g.sections
        .map(
          (sec) => `
        <h3>${sec.name}</h3>
        <ul>${sec.items.map(itemHtml).join('')}</ul>`,
        )
        .join('')}
    </section>`,
  )
  .join('')

const COMP_STATUS = { draft: 'wip', stable: 'done' } // 借用 badge 樣式
const stableCount = components.filter((c) => c.status === 'stable').length

const compRow = (c) => `
  <li class="board__item">
    <span class="board__title">${c.id}</span>
    <span class="badge badge--${COMP_STATUS[c.status]}">${c.status}</span>
    <span class="board__meta">${c.variants.length ? c.variants.join(' / ') : '—'}</span>
    <span class="board__meta">用於 ${c.usedBy.length} 頁</span>
  </li>`

document.querySelector('#registry').innerHTML = `
  <section class="board__group">
    <h2>共用元件登記表（${stableCount}/${components.length} stable）</h2>
    <ul>${components.map(compRow).join('')}</ul>
  </section>`
