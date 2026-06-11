// 裝置群組假資料（spec §8）。鍵名即狀態名；內容依 Figma 示意整理。
// row：{ name 群組名稱, count 裝置數量, created 建立日期, modified 修改日期 }
const row = (name, count, created, modified) => ({ name, count, created, modified })

export const deviceGroups = {
  default: [
    row('Taipei_財務部', 4, '2026/02/17 08:42 PM', '2026/05/20 07:35 PM'),
    row('財務部', 3, '2026/02/17 08:42 PM', '2026/05/20 07:35 PM'),
    row('業務部', 3, '2026/02/17 08:42 PM', '2026/05/20 07:35 PM'),
    row('人事部', 3, '2026/02/17 08:42 PM', '2026/05/20 07:35 PM'),
    row('研發部', 8, '2026/02/18 10:05 AM', '2026/05/21 09:12 AM'),
    row('IT 部', 12, '2026/02/18 10:05 AM', '2026/05/21 09:12 AM'),
  ],
  empty: [],
  loading: null,
  error: { code: 500, message: '無法載入裝置群組（模擬）' },
  max: [
    row(`${'超長群組名稱測試_海外分公司_'.repeat(8)}結尾`, 99999, '2026/01/01 12:00 AM', '2026/06/11 11:59 PM'),
    row('空群組', 0, '2026/02/17 08:42 PM', '2026/02/17 08:42 PM'),
    ...Array.from({ length: 200 }, (_, i) =>
      row(`群組-${String(i + 1).padStart(3, '0')}`, (i * 7) % 250, '2026/02/17 08:42 PM', '2026/05/20 07:35 PM'),
    ),
  ],
}
