import { Accidents } from '~/models/accidents/accidents'

const accident: Array<Accidents> = [
  {
    id: 2,
    carrier_id: 1,
    driver_id: 1,
    truck_id: 1,
    report_date: "2023-08-07T00:00:00.000Z",
    report_number: "string",
    report_state: "string",
    fatal: "Yes",
    injury: "Yes",
    tow: "Yes",
    haz_mat: "Yes",
    notes: "HELLO",
    driver_name: "Jonny Doe",
    driver_license_number: "123456789",
    driver_license_state: "CA",
    truck_plate_number: "123456789",
    truck_plate_state: "CA"
  },
  {
    id: 1,
    carrier_id: 1,
    driver_id: 1,
    truck_id: 1,
    report_date: "2023-08-07T00:00:00.000Z",
    report_number: "string",
    report_state: "string",
    fatal: "Yes",
    injury: "Yes",
    tow: "Yes",
    haz_mat: "Yes",
    notes: "HELLO",
    driver_name: "Jonny Doe",
    driver_license_number: "123456789",
    driver_license_state: "CA",
    truck_plate_number: "123456789",
    truck_plate_state: "CA"
  },
]
export default accident
