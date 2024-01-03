import { DevicesDetails } from '~/models/devices/devicesDetails'

const device:Array<DevicesDetails> = [
  {
    id: 1,
    truck_id: '1',
    device_type: 'IPASS',
    device_id: '4234234',
    vendor: 'Samsara',
    in_service_date: '15-05-2023',
    out_of_service_date: '20-08-2024',
    returned_device_date: '30-08-2025',
    notes: 'some notes',
    carrier_id: 1,
    service_start_date: '20-08-2022',
    service_end_date: '26-08-2022',
    device_return_date: '08-10-2023',
    activation_number: '53268',
    device_name: 'Some device name',
    imei_number: '59632896',
    updated_date: '20-02-2023'

  },
  {
    id: 2,
    truck_id: '2',
    device_type: 'BestPass',
    device_id: '4234234',
    vendor: 'Samsara',
    service_start_date: '10-06-2022',
    service_end_date: '26-07-2022',
    in_service_date: '25-05-2023',
    device_return_date: '06-09-2023',
    out_of_service_date: '20-08-2024',
    returned_device_date: '30-08-2025',
    notes: 'some notes',
    carrier_id: 1,
    activation_number: '53268',
    device_name: 'Some device name',
    imei_number: '59632896',
    updated_date: '20-02-2023'

  }
]

export default device
