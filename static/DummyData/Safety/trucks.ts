import { Truck } from '~/models/truck/truck'

const truck:Array<Truck> = [
  {
    id: 1,
    truck_id: 1,
    unit_number: '6',
    plate: 'ABC-1234',
    vin_number: '456VNL860',
    registration_renewal_date: '05/05/2023',
    annual_inspection_date: '05/05/2023',
    preventive_maintenance_date: '05/05/2023',
    in_service_date: '05/05/2023',
    out_of_service_date: '05/05/2023',
    acquisition_type: 'Lease',
    asset_owner: 'Ryder',
    model_year: '2020',
    model: 'VNL-125',
    carrier_id: 3,
    notes: '',
    brand: 'Volvo',
    co_driver_id: 'Will Smith',
    color: 'Black',
    main_driver_id: 'Chris Toudoulou',
    status: 'In Service',
    updated_date: '14/04/2023',
  },
  {
    id: 2,
    truck_id: 2,
    unit_number: '4',
    plate: 'XYZ-1234',
    vin_number: '123VNL860',
    registration_renewal_date: '08/05/2023',
    annual_inspection_date: '10/05/2023',
    preventive_maintenance_date: '15/05/2023',
    in_service_date: '18/05/2023',
    out_of_service_date: '20/05/2023',
    acquisition_type: 'Lease',
    asset_owner: 'Mathew',
    model_year: '2022',
    model: 'BLC-325',
    carrier_id: 3,
    notes: '',
    brand: 'Mercedes',
    co_driver_id: 'Paul George',
    color: 'Red',
    main_driver_id: 'Kawhai Leonard',
    status: 'Parked',
    updated_date: '18/04/2023'
  }
]

export default truck
