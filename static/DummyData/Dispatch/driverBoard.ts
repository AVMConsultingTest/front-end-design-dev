import { DriversDetails } from '~/models/DISPATCH/drivers/driversDetails'

const driversDetails:Array<DriversDetails> = [
  {
    id: 1,
    carrier_id: 3,
    driver_id: 3,
    driver_last_name: 'Simmons',
    updated_date: '03-10-2023',
    driver_first_name: 'Brooklyn',
    notes: 'At shop',
    driver_type: 'Company Driver',
    acceptance: 65,
    driver_avatar: 1,
    hire_date: '07-07-2023',
    driver_phone_number: '555-555-1214',
    driver_dob: '10-12-1981',
    driver_email_address: 'buckberrytm@gmail.com',
    on_time: 70,
    driver_live_location: 'California',
    driver_score: 82,
    payment_rate: 1450,
    status: 'Terminated'
  },
  {
    id: 2,
    carrier_id: 3,
    driver_id: 2,
    driver_last_name: 'Pena',
    updated_date: '03-10-2023',
    driver_first_name: 'Eleanor',
    notes: 'West Coasts trips only',
    driver_type: 'Lease Driver',
    acceptance: 70,
    driver_avatar: 1,
    hire_date: '07-07-2023',
    driver_phone_number: '555-555-1214',
    driver_dob: '10-12-1981',
    driver_email_address: 'hrrisn@gamil.com',
    on_time: 80,
    driver_live_location: 'California',
    driver_score: 90,
    payment_rate: 1680,
    status: 'Active'
  }
]

export default driversDetails
