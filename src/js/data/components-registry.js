// 共用元件登記表 — build-vs-reuse 的單一事實來源（slicing-workflow-design.md §②）
// status: 'draft'（用過、未定稿）| 'stable'（≥2 頁複用且未再需結構性改動，來源為設計稿真正共用元件）
// 升 stable 後預設「照用不改」；要改走 integrator 並回歸 usedBy 清單裡的頁。
export const components = [
  {
    id: 'button',
    scss: 'src/scss/components/_button.scss',
    status: 'draft',
    figmaSource: 'Device Groups — 工具列按鈕',
    variants: ['primary', 'icon'],
    usedBy: ['device-groups'],
  },
  {
    id: 'badge',
    scss: 'src/scss/components/_badge.scss',
    status: 'draft',
    figmaSource: '進度看板徽章 / 通用狀態標籤',
    variants: ['p1', 'p2', 'tbd', 'todo', 'wip', 'done'],
    usedBy: ['board'],
  },
  {
    id: 'folder-chip',
    scss: 'src/scss/components/_folder-chip.scss',
    status: 'draft',
    figmaSource: 'Device Groups — 群組名稱標籤',
    variants: [],
    usedBy: ['device-groups'],
  },
  {
    id: 'pagination',
    scss: 'src/scss/components/_pagination.scss',
    status: 'draft',
    figmaSource: 'Device Groups — 表格分頁',
    variants: [],
    usedBy: ['device-groups'],
  },
  {
    id: 'toolbar',
    scss: 'src/scss/components/_toolbar.scss',
    status: 'draft',
    figmaSource: 'Device Groups — 列表工具列',
    variants: [],
    usedBy: ['device-groups'],
  },
  {
    id: 'data-table',
    scss: 'src/scss/components/_data-table.scss',
    status: 'stable',
    figmaSource: '列表頁通用資料表',
    variants: [],
    usedBy: ['sample', 'device-groups'],
  },
]
