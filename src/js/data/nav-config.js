// 側邊欄導覽結構（sitemap 八大區塊；Global Header / Utilities 不在側欄）。
// path: null = 該入口頁尚未切版，側欄顯示為不可點。新增頁面改這裡即可。
export const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: 'icon_dashboard.svg', path: null },
  { id: 'alerts', label: 'Alerts & Monitoring', icon: 'icon_notification.svg', path: null },
  { id: 'devices', label: 'Devices', icon: 'icon_devices.svg', path: null },
  { id: 'deployment', label: 'Deployment', icon: 'icon_deployment.svg', path: null },
  { id: 'reports', label: 'Reports', icon: 'icon_reports.svg', path: null },
  { id: 'support', label: 'Support', icon: 'icon_repair.svg', path: null },
]

export const navFooter = [
  { id: 'settings', label: 'Settings', icon: 'icon_settings.svg', path: null },
]
