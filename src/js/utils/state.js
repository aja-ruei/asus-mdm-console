// 頁面狀態機制（spec §8）：?state= 強制指定，無參數即 default
export const STATES = ['default', 'loading', 'empty', 'error', 'max']

export function getState() {
  const s = new URLSearchParams(location.search).get('state')
  return STATES.includes(s) ? s : 'default'
}
