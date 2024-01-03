import { PermitsDetails } from '~/models/permits/permitsDetails'

const permit:Array<PermitsDetails> = [
  {
    id: 1,
    truck_id: 1,
    type: 'IFTA',
    number: '2456566',
    duration: '3 Years',
    start_date: '05/05/2023',
    end_date: '05/05/2025',
    purchased_date: '05/05/2022',
    delivery_status: 'Completed',
    vendor_url: 'SomeVendorUrl',
    installed: 'Yes',
    notes: 'Some notes',
    cost: '222'
  },
  {
    id: 2,
    truck_id: 2,
    type: 'IFTA',
    number: '1236566',
    duration: 'Annual',
    start_date: '25/05/2023',
    end_date: '15/05/2025',
    purchased_date: '31/05/2022',
    delivery_status: 'Pending',
    vendor_url: 'SomeVendorUrl',
    installed: 'No',
    notes: 'Some notes',
    cost: '1111'
  }
]

export default permit
