import { LocationsDetails } from '~/models/DISPATCH/locations/locationsDetails'

const locationsDetails:Array<LocationsDetails> = [
  {
    id: 1,
    name: 'Fed Ex Central Napperville IL',
    address_line1: '711 Washington St.',
    address_line2: 'Manchester, Kentucky 39495',
    city: 'Napervillie',
    state: 'IL',
    zip_code: '21632',
    status: 'Active'
  },
  {
    id: 2,
 
    name: 'UPS Facility #35',
    address_line1: '814 N 3rd St.',
    address_line2: 'Manchester, Kentucky 39495',
    city: 'Compton',
    state: 'CA',
    zip_code: '12532',
    status: 'Inactive'
  }
]

export default locationsDetails
