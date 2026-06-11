// 假資料模組範本：每頁建一個同形狀的檔案，鍵名即狀態名（spec §8）。
// default 照 Figma 示意內容；max 固定涵蓋大量資料、超長字串、極端數值。
const row = (i) => ({
  name: `Device-${String(i).padStart(3, '0')}`,
  os: 'Windows 11 Pro 24H2',
  status: i % 7 === 0 ? 'Offline' : 'Online',
})

export const sample = {
  default: Array.from({ length: 8 }, (_, i) => row(i + 1)),
  empty: [],
  loading: null,
  error: { code: 500, message: 'Internal Server Error（模擬）' },
  max: [
    {
      name: `Device-${'超長裝置名稱測試'.repeat(10)}`,
      os: 'Windows 11 Pro 24H2',
      status: 'Online',
    },
    { name: 'Device-000', os: 'Windows 11 Pro 24H2', status: 'Online' },
    ...Array.from({ length: 200 }, (_, i) => row(i + 1)),
  ],
}
