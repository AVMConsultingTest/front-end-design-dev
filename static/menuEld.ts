import { Menu } from '@/models/common/Menu'

const menuEld:Array<Menu> = [
  {
    icon: 'map-1',
    variant: 'bulk',
    name: 'Operational Map',
    link: '/carrier/dashboard/eld/operational-map',
    submenu: [] as Array<Menu>
  },
  {
    icon: 'clock-1',
    variant: 'bulk',
    name: 'Hours of Service',
    link: '/carrier/dashboard/eld/hours-of-service',
    submenu: [] as Array<Menu>
  },
  {
    icon: 'buliding',
    variant: 'bulk',
    name: 'Entities',
    link: '/carrier/dashboard/eld/entities',
    submenu: [] as Array<Menu>
  },
  {
    icon: 'gas-station',
    variant: 'bulk',
    name: 'IFTA & Fuel',
    link: '/carrier/dashboard/eld/fuel-and-ifta',
    submenu: [] as Array<Menu>
  },
  {
    icon: 'alarm',
    variant: 'bulk',
    name: 'ELD Alerts',
    link: '/carrier/dashboard/eld/eld-alerts',
    submenu: [] as Array<Menu>
  }
]

export default menuEld
