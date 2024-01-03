import { Menu } from '@/models/common/Menu'

const menu:Array<Menu> = [
  {
    icon: 'category',
    variant: 'bulk',
    name: 'Dashboard',
    link: '/carrier/dashboard',
    submenu: [] as Array<Menu>
  },
  {
    icon: 'map-1',
    variant: 'bulk',
    name: 'Operational Map',
    link: '/carrier/dashboard/operational-map',
    submenu: [] as Array<Menu>
  },
  {
    icon: 'wallet',
    variant: 'bulk',
    name: 'ELD',
    link: '/carrier/dashboard/eld/hours-of-service',
    submenu: [
      {
        icon: 'map-1',
        variant: 'bulk',
        name: 'Map',
        link: '/carrier/dashboard/eld/operational-map',
        submenu: [] as Array<Menu>
      },
      {
        icon: 'clock-1',
        variant: 'bulk',
        name: 'Hours of Service',
        link: '/carrier/dashboard/eld/hours-of-service'
      },
      {
        icon: 'buliding',
        variant: 'bulk',
        name: 'Entities',
        link: '/carrier/dashboard/eld/entities'
      },
      {
        icon: 'gas-station',
        variant: 'bulk',
        name: 'IFTA & Fuel',
        link: '/carrier/dashboard/eld/fuel-and-ifta'
      },
      {
        icon: 'alarm',
        variant: 'bulk',
        name: 'ELD Alerts',
        link: '/carrier/dashboard/eld/eld-alerts'
      }
    ] as Array<Menu>
  },
  {
    icon: 'd-cube-scan',
    variant: 'bulk',
    name: 'Safety Management',
    link: '/carrier/dashboard',
    submenu: [
      {
        icon: 'status-up',
        variant: 'bulk',
        name: 'Carrier Management',
        link: '/carrier/dashboard/safety-management/carrier-management'
      },
      {
        icon: 'personalcard',
        variant: 'bulk',
        name: 'Driver Management',
        link: '/carrier/dashboard/safety-management/driver-management'
      },
      {
        icon: 'presention-chart',
        variant: 'bulk',
        name: 'Fleet Management',
        link: '/carrier/dashboard/safety-management/fleet-management'
      }
    ] as Array<Menu>
  },
  {
    icon: 'wallet',
    variant: 'bulk',
    name: 'Accounting',
    link: '/carrier/dashboard/accounting',
    submenu: [
      {
        icon: 'money-recive',
        variant: 'bulk',
        name: 'Receivables',
        link: '/carrier/dashboard/accounting/receivables'
      },
      {
        icon: 'money-tick',
        variant: 'bulk',
        name: 'Payables',
        link: '/carrier/dashboard/accounting/payables'
      },
      {
        icon: 'receipt-item',
        variant: 'bulk',
        name: 'Payroll',
        link: '/carrier/dashboard/accounting/payroll'
      },
      {
        icon: 'user-square',
        variant: 'bulk',
        name: 'Brokers',
        link: '/carrier/dashboard/accounting/receivables/brokers'
      },
      {
        icon: 'money-recive',
        variant: 'bulk',
        name: 'Vendors',
        link: '/carrier/dashboard/accounting/payables/vendors'
      }

    ] as Array<Menu>
  },
  {
    icon: 'tag-right',
    variant: 'bulk',
    name: 'Dispatch',
    link: '/carrier/dashboard/dispatch',
    submenu: [
      {
        icon: 'user-octagon',
        variant: 'bulk',
        name: 'Driver Board',
        link: '/carrier/dashboard/dispatch/driver-board'
      },

      {
        icon: 'box',
        variant: 'bulk',
        name: 'Loads',
        link: '/carrier/dashboard/dispatch/loads'
      },
      {
        icon: 'location',
        variant: 'bulk',
        name: 'Locations',
        link: '/carrier/dashboard/dispatch/locations'
      },
      {
        icon: 'keyboard-open',
        variant: 'bulk',
        name: 'Gross Board',
        link: '/carrier/dashboard/dispatch/gross-board'
      },
      {
        icon: 'shuffle',
        variant: 'bulk',
        name: 'Market Place',
        link: '/carrier/dashboard/dispatch/marketplace'
      }
    ] as Array<Menu>
  }
]

export default menu
