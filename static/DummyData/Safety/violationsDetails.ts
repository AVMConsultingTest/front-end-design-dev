import { ViolationsDetails } from '~/models/violationsDetails/violationsDetails'

const violationsDetails:Array<ViolationsDetails> = [
  {
    id: 1,
    driver_id: 2,
    violation_report_number: 'A245201',
    violation_state: 'Virginia',
    violation_count: 15,
    violation_category: '',
    inspection_level: 16,
    out_of_service: 'Test',
    total_points: 26,
    document_id: 14,
    total_violation_severity: 10,
    violation_severity: 12,
    violation_group: 'G1420',
    carrier_id: 3,
    driver_name: 'John Williamson',
    time_weight: 10,
    violation_date: '02-04-2023',
    violation_sequence: 6,
    oos_violation_severity: 7,
    violation_description: 'Desc',
    updated_date: '10-04-2023',
    vehicle_id: 10
  },
  {
    id: 2,
    driver_id: 2,
    violation_report_number: 'B245246',
    violation_state: 'Hawaii',
    violation_count: 25,
    violation_category: '',
    inspection_level: 16,
    out_of_service: 'Test',
    total_points: 46,
    document_id: 24,
    total_violation_severity: 20,
    violation_severity: 12,
    violation_group: 'G1420',
    carrier_id: 3,
    driver_name: 'Cameron Meta',
    time_weight: 10,
    violation_date: '02-04-2023',
    violation_sequence: 10,
    oos_violation_severity: 14,
    violation_description: 'Desc',
    updated_date: '10-04-2023',
    vehicle_id: 10
  }
]

export default violationsDetails
