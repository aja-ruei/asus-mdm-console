// 切版進度看板資料（spec §9）。status: todo | wip | done
const item = (title, priority, path = null, status = 'todo') => ({ title, priority, path, status })

export const groups = [
  {
    title: '內部',
    sections: [
      { name: '切版模式範例', items: [item('Pattern Sample', '—', '/pages/sample.html', 'done')] },
    ],
  },
  {
    title: 'Home / Dashboard',
    sections: [
      {
        name: 'Dashboard Overview（單頁、16 widgets）',
        items: [
          item('Total Devices', 'P1'),
          item('Device Connectivity', 'P1'),
          item('Current Issue Summary', 'P1'),
          item('System Update', 'P1'),
          item('Overall Health Score', 'P1'),
          item('Current Alerts and Events', 'P1'),
          item('Lenovo Support Tickets', 'P1'),
          item('Warranty Information', 'P1'),
          item('Hardware Assets', 'P1'),
          item('Crash Heatmap', 'P1'),
          item('Device Type', 'P1'),
          item('Windows Device Managers Error', 'P1'),
          item('Device By Operating System', 'P1'),
          item('License Type', 'P1'),
          item('Apps', 'P1'),
          item('Deployments', 'P1'),
        ],
      },
    ],
  },
  {
    title: 'Alerts & Monitoring',
    sections: [
      {
        name: 'Alerts',
        items: [
          item('Low Battery', 'P1'),
          item('Storage', 'P1'),
          item('BSOD Crashes', 'P1'),
          item('App Performance', 'P1'),
        ],
      },
      {
        name: 'Monitoring',
        items: [
          item('Patch Deployment Status', 'P1'),
          item('System Update Status', 'P1'),
          item('OTA Deployment Status', 'P1'),
          item('Power Management Status', 'P2'),
          item('ThinkBIOS Status', 'P1'),
          item('Diagnostic Report', 'P1'),
          item('Available Updates', 'P1'),
        ],
      },
    ],
  },
  {
    title: 'Devices',
    sections: [
      {
        name: 'Device Management',
        items: [
          item('Devices', 'P1'),
          item('Devices › Device Detail', 'P1'),
          item('Devices › Diagnostic', 'P1'),
          item('Accessories Inventory', 'P2'),
          item('Device Groups', 'P1'),
          item('Hardware Asset Management', 'P1'),
          item('Power Management', 'P1'),
          item('System Inventory Management', 'P1'),
          item('Warranty Information', 'P1'),
        ],
      },
    ],
  },
  {
    title: 'Deployment',
    sections: [
      {
        name: 'Execution',
        items: [
          item('Apps', 'P1'),
          item('Patch', 'P1'),
          item('System Update', 'P1'),
          item('Define Ring Sets', 'P1'),
        ],
      },
      {
        name: 'Control Rules',
        items: [
          item('Feature Settings', 'P1'),
          item('Feature Settings › Manage Accessories', 'P2'),
          item('Feature Settings › Feature Controls', 'P2'),
          item('Feature Settings › Android Apps Settings Management', 'P2'),
          item('Feature Settings › Auto Install Of Intel vPro® Agent', '?'),
          item('Feature Settings › Automatic Device Cleanup', 'P1'),
          item('Feature Settings › UDC Logging', 'P1'),
          item('ThinkCentre Customization', 'P1'),
          item('ThinkBIOS Management', 'P1'),
        ],
      },
    ],
  },
  {
    title: 'Reports',
    sections: [
      {
        name: 'Operational Reports',
        items: [
          item('Energy Savings', 'P1'),
          item('Software Inventory Change Log', 'P1'),
          item('Hardware Asset Changes', 'P1'),
          item('Decommissioned Devices', 'P1'),
          item('Battery Health', 'P1'),
          item('Storage Drives', 'P1'),
        ],
      },
      {
        name: 'Diagnostic Reports',
        items: [
          item('Audit Log', 'P1'),
          item('Software Inventory Audit', 'P1'),
          item('Utilization Summary Report', 'P2'),
        ],
      },
    ],
  },
  {
    title: 'Support',
    sections: [
      {
        name: 'Support Tickets',
        items: [
          item('Ticket list', 'P1'),
          item('Online Repair', 'P1'),
          item('ASUS Console Customer Service', 'P1'),
          item('Warranty Status Inquiry', 'P1'),
          item('Warranty Update', 'P1'),
          item('Auto-Ticketing', 'P2'),
        ],
      },
    ],
  },
  {
    title: 'Settings',
    sections: [
      {
        name: 'Accounts & Permissions',
        items: [item('Organization Account', 'P1'), item('Users', 'P1'), item('User Groups', 'P1')],
      },
      {
        name: 'Integrations',
        items: [
          item('API Credentials', 'P1'),
          item('Email Notifications', 'P1'),
          item('Manage Connector', 'P1'),
          item('Manage Connector › Intune', 'P1'),
          item('Manage Connector › ServiceNow Incident Rules', '?'),
          item('Manage Connector › Google Cloud Platform', '?'),
        ],
      },
      {
        name: 'Preferences',
        items: [item('Dashboard Customization', 'P2'), item('Orders', 'P2')],
      },
    ],
  },
  {
    title: 'Global Header / Utilities',
    sections: [
      {
        name: 'Header & Personal',
        items: [
          item('Help Center', 'P1'),
          item('Recently Visited', 'P1'),
          item('My Profile', 'P1'),
          item('Preferences', 'P1'),
          item('Notifications', 'P1'),
        ],
      },
    ],
  },
]
