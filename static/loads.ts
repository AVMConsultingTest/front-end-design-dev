const loads:Array<Object> = [
  {
    id: 1,
    load_status: 'Assigned',
    status: 'On-route',
    broker_id: 'BL - 09362',
    truck_id: 'TRC-1254662',
    trailer_id: 'TRL-56845',
    load_origin: 'Roanoke, TX',
    load_destination: 'Roanoke, TX',
    main_driver_name: 'Micheal Robenson ',
    co_driver_name: 'Andrew Holmen',
    equipment_type: '53’ Trailer',
    load_rate_per_mile: 4.50,
    equipment_weight: '45k LBS',
    mileRate: 4.50,
    load_miles: 425.5,
    load_revenue: 4500.12,
    broker_contact_name: 'Courtney Henryq',
    currentStop: 3,
    load_duration: '1d 10h 15m',
    //
    // customerLoadId: 'CL09621',
    // shipper_name: 'BWS',
    // origin: 'Roanoke, TX',
    // destination: 'Phoenix, AZ',
    // pickup_time: 'Timestamp',
    // delivery_time: 'Timestamp',
    // revenue: '$800',
    // cost: '$500',
    // acceptedDate: '09/07/2022',
    // equipmentType: '26’ Trailer',
    // carrierName: 'Bill Sanders',
    // shipment_status: 'Open',
    drivers: [
      {
        id: 123,
        name: 'Jenny Wilson',
        type: 'Main Driver',
        driver_dob: 'Jan 1, 1970',
        driver_type: 'Main Driver',
        driver_contact_phone_number: '(229) 555-0109',
        driver_email_address: 'sara.cruz@example.com',
        payment_rates: '1200,98',
        driver_state: 'Califronia',
        fscPercentage: 95
      },
      {
        id: 124,
        name: 'Guy Hawkins',
        type: 'Co- Driver',
        driver_dob: 'Jan 1, 1970',
        driver_type: 'Co- Driver',
        driver_contact_phone_number: '(229) 555-0109',
        driver_email_address: 'sara.cruz@example.com',
        payment_rates: '1200,98',
        driver_state: 'Califronia',
        fscPercentage: 72
      }
    ],
    stops: [
      {
        id: 10,
        value: 'Roanoke, TX',
        code: 'CLT5',
        driver: 'Jenny Wilsons',
        address: '7644 Undergrove Street Denver, Co 80249',
        status: 'Preloaded',
        arrival_date: '10/05 10:15 CDT',
        scheduled_arrival_date: '10/05 10:15 CDT',
        departure_date: '10/05 10:15 CDT',
        scheduled_departure_date: '10/05 10:15 CDT',
        load_status: 'New Load',
        pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: [
          {
            name: 'test'
          },
          {
            name: 'test'
          },
          {
            name: 'test'
          }
        ]
      },
      {
        id: 11,
        value: 'Roanoke, TX',
        code: 'BHM1',
        driver: 'Oliver Jake',
        address: '7644 Undergrove Street Denver, Co 80249',
        status: 'Drop',
        arrival_date: '10/05 10:15 CDT',
        scheduled_arrival_date: '10/05 10:15 CDT',
        departure_date: '10/05 10:15 CDT',
        scheduled_departure_date: '10/05 10:15 CDT',
        load_status: 'New Load',
        pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: [
          {
            name: 'test'
          },
          {
            name: 'test'
          },
          {
            name: 'test'
          }
        ]
      },
      {
        id: 12,
        value: 'Roanoke, TX',
        code: 'AGS5',
        driver: 'Jack Connor',
        address: '7644 Undergrove Street Denver, Co 80249',
        status: 'Drop',
        arrival_date: '10/05 10:15 CDT',
        scheduled_arrival_date: '10/05 10:15 CDT',
        departure_date: '10/05 10:15 CDT',
        scheduled_departure_date: '10/05 10:15 CDT',
        load_status: 'New Load',
        pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: []
      },
      {
        id: 13,
        value: 'Roanoke, TX',
        code: 'HKL1',
        driver: 'Harry Callum',
        address: '7644 Undergrove Street Denver, Co 80249',
        status: 'Drop',
        arrival_date: '10/05 10:15 CDT',
        scheduled_arrival_date: '10/05 10:15 CDT',
        departure_date: '10/05 10:15 CDT',
        scheduled_departure_date: '10/05 10:15 CDT',
        load_status: 'New Load',
        pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: []
      },
      {
        id: 14,
        value: 'Oxnard, CA',
        code: 'MYK3',
        driver: 'Jacob Kyle',
        address: '7644 Undergrove Street Denver, Co 80249',
        status: 'Drop',
        arrival_date: '10/05 10:15 CDT',
        scheduled_arrival_date: '10/05 10:15 CDT',
        departure_date: '10/05 10:15 CDT',
        scheduled_departure_date: '10/05 10:15 CDT',
        load_status: 'New Load',
        pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: []
      }
    ]
  },
  {
    id: 2,
    load_status: 'In-transit',
    status: 'Waiting',
    broker_id: 'RS - 09-23356',
    weight: '45k LBS',
    truck_id: 'TRC-98542727',
    trailer_id: 'TRL-654871',
    load_origin: 'Oxnard, TX',
    load_destination: 'Oxnard, TX',
    main_driver_name: 'Jenny Wilson ',
    co_driver_name: 'Guy Hawkins',
    equipment_type: '56’ Truck',
    equipment_weight: '80k LBS',
    documents: [],
    load_rate_per_mile: 6.50,
    mileRate: 4.80,
    load_miles: 225.5,
    load_revenue: 3500.10,
    currentStop: 4,
    load_duration: '1d 10h 15m',
    broker_contact_name: 'System Solution',
    drivers: [
      {
        id: 123,
        name: 'John Smith',
        type: 'Main Driver'
      },
      {
        id: 124,
        name: 'Guy Hawkins',
        type: 'Co- Driver'
      }
    ],
    stops: [
      {
        id: 10,
        value: 'Roanoke, TX',
        code: 'CLT5',
        driver: 'Jenny Wilsons',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: [
          {
            name: 'test'
          },
          {
            name: 'test'
          },
          {
            name: 'test'
          }
        ]
      },
      {
        id: 11,
        value: 'Roanoke, TX',
        code: 'BHM1',
        driver: 'Oliver Jake',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: [
          {
            name: 'test'
          },
          {
            name: 'test'
          },
          {
            name: 'test'
          }
        ]
      },
      {
        id: 12,
        value: 'Roanoke, TX',
        code: 'AGS5',
        driver: 'Jack Connor',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: [
          {
            name: 'test'
          },
          {
            name: 'test'
          },
          {
            name: 'test'
          }
        ]
      },
      {
        id: 13,
        value: 'Roanoke, TX',
        code: 'HKL1',
        driver: 'Harry Callum',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: []
      },
      {
        id: 14,
        value: 'Oxnard, CA',
        code: 'MYK3',
        driver: 'Jacob Kyle',
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#',
        documents: []
      }
    ]
  }

]

export default loads
