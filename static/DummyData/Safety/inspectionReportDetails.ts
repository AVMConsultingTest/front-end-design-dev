import { InspectionReportDetails } from '~/models/inspectionReport/inspectionReportDetails'
const InspectionReportDetails: Array<InspectionReportDetails> = [
  {
    id: 1,
    driver_id: 33,
    category: 'Vehicle Maintenance',
    date: '6/17/2022',
    state: 'TX',
    report_number: '6BVI0XHX2X',
    upload_document: 'vehicle.pdf',
    inspection_level: 2,
    driver_name: 'Lamine Sane',
    dot_asset_id: 'Unit 1',
    violation_group: 'Lighting',
    description: 'Inoperative turn signal',
    violations_count: 3,
    sequence: 1,
    out_of_service: 'No',
    violation_severity: 6,
    oos_violation_severity: 0,
    total_violation_severity: 6,
    time_weight: 3,
    total_points: 18

  },
  {
    id: 2,
    driver_id: 34,
    category: 'Vehicle Maintenance',
    date: '6/17/2023',
    state: 'TX',
    report_number: '6BY84HX23',
    upload_document: 'broker.pdf',
    inspection_level: 2,
    driver_name: 'John Smith',
    dot_asset_id: 'Unit 1',
    violation_group: 'Lighting',
    description: 'Tire-ply or belt material exposed',
    violations_count: 3,
    sequence: 1,
    out_of_service: 'No',
    violation_severity: 6,
    oos_violation_severity: 0,
    total_violation_severity: 6,
    time_weight: 3,
    total_points: 18

  }
]
export default InspectionReportDetails
