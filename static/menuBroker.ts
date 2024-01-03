import { Menu } from '@/models/common/Menu'

const menuBroker:Array<Menu> = [
  {
    icon: 'home-2',
    variant: 'bulk',
    name: 'Home',
    link: '/broker/dashboard/',
    submenu: [] as Array<Menu>
  },
  {
    icon: 'map-1',
    variant: 'bulk',
    name: 'Operational Map',
    link: '/broker/dashboard/operational-map',
    submenu: [] as Array<Menu>
  },
  {
    icon: 'paperclip-2',
    variant: 'bulk',
    name: 'Quotes',
    link: '/broker/dashboard/quotes',
    submenu: [
    ] as Array<Menu>
  },
  {
    icon: 'note-2',
    variant: 'bulk',
    name: 'Shipments',
    link: '/broker/dashboard/shipments',
    submenu: [
      {
        icon: 'bookmark-2',
        variant: 'bulk',
        name: 'Open Loads',
        link: '/broker/dashboard/publish-loads'
      },
      {
        icon: 'convert-3d-cube',
        variant: 'bulk',
        name: 'Loads in Transit',
        link: '/broker/dashboard/loads-in-transit'
      }
    ] as Array<Menu>
  },
  {
    icon: 'profile-2user',
    variant: 'bulk',
    name: 'Customers',
    link: '/broker/dashboard/listening-profile',
    submenu: [

    ] as Array<Menu>
  },
  {
    icon: 'truck',
    variant: 'bulk',
    name: 'Carriers',
    link: '/broker/dashboard/listening-profile-carriers',
    submenu: [

    ]as Array<Menu>
  },
  {
    icon: 'medal',
    variant: 'bulk',
    name: 'Company Profile',
    link: '/broker/dashboard/company-profile',
    submenu: [

    ]as Array<Menu>
  },
  {
    icon: 'receipt-item',
    variant: 'bulk',
    name: 'Invoicing',
    link: '/broker/dashboard/invoicing',
    submenu: [

    ]as Array<Menu>
  },
  {
    icon: 'shuffle',
    variant: 'bulk',
    name: 'Marketplace',
    link: '/broker/dashboard/marketplace',
    submenu: [

    ]as Array<Menu>
  },
  {
    icon: 'user-edit',
    variant: 'bulk',
    name: 'User Settings',
    link: '/broker/dashboard/settings',
    submenu: [

    ]as Array<Menu>
  }

]

export default menuBroker
