import { MileageReport } from '~/models/accounting/mileageReport'

const mileageReport:Array<MileageReport> = [
  {
    id: 1,
    truck_id: 2,
    driver_id: 3,
    comments: 'Test',
    documents: {},
    mileage_end_date: '10-02-2023',
    deadhead: 205,
    driver_designation: 'Design',
    mileage_start_date: '02-02-2023',
    carrier_id: 3,
    driver_name: 'Steve',
    report_start_date: '04-03-2023',
    report_end_date: '09-03-2023',
    updated_date: '02-02-2023',
    mileage: 104,
    driver_type: 'Company Driver'
  },
  {
    id: 2,
    truck_id: 3,
    driver_id: 4,
    comments: 'Test',
    documents: {},
    mileage_end_date: '02-03-2023',
    deadhead: 321,
    driver_designation: 'Design',
    mileage_start_date: '11-03-2023',
    carrier_id: 3,
    driver_name: 'Jonathan',
    report_start_date: '09-06-2023',
    report_end_date: '12-06-2023',
    updated_date: '02-02-2023',
    mileage: 154,
    driver_type: 'Lease Driver'
  }
]

export default mileageReport
