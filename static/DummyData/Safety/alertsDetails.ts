import { AlertsDetails } from '~/models/alerts/alertsDetails'

const alertsDetails:Array<AlertsDetails> = [
  {
    id: 1,
    carrier_id: 3,
    driver_name: 'John Doe',
    alert_status: 'Active',
    alert_description: 'Not',
    date_of_alert: '10-12-2023',
    updated_date: '02-02-2023',
    document_id: 6,
    license_status: 12
  },
  {
    id: 2,
    carrier_id: 3,
    driver_name: 'John Doe',
    alert_status: 'Set',
    alert_description: 'Not',
    date_of_alert: '12-06-2023',
    updated_date: '02-02-2023',
    document_id: 6,
    license_status: 4
  }
]

export default alertsDetails
