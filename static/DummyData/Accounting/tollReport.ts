import { TollReport } from '~/models/accounting/tollReport'

const tollReport:Array<TollReport> = [
  {
    id: 1,
    carrier_id: 3,
    driver_name: 'Lowell',
    driver_id: 4,
    driver_type: 'Company Driver',
    report_start_date: '04-04-2023',
    total_charges: 1458,
    comments: 'Test',
    report_end_date: '11-04-2023',
    updated_date: '02-02-2023',
    unit_id: 'A49',
    prepass_id: 'B7454'
  },
  {
    id: 2,
    carrier_id: 3,
    driver_name: 'Drank',
    driver_id: 4,
    driver_type: 'Lease Driver',
    report_start_date: '05-04-2023',
    total_charges: 2410,
    comments: 'Test',
    report_end_date: '12-04-2023',
    updated_date: '02-02-2023',
    unit_id: 'A50',
    prepass_id: 'B7455'
  }
]

export default tollReport
