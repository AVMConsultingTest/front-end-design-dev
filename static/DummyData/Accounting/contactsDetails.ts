import { ContactsDetails } from '~/models/accounting/contacts/contactsDetails'

const contactsDetails:Array<ContactsDetails> = [
  {
    id: 1,
    carrier_id: 3,
    business_hours: '09:00 - 18:00',
    contact_name: 'Frick Richard',
    contact_hierarchy: 10,
    comments: 'Test cases are the basic units over which the complete testing process is executed',
    vendor_id: 4,
    phone_number: '(512) 984-1614',
    contact_status: 'Active',
    updated_date: '02-04-2023',
    department: 'Floor',
    email: 'richardfrick@gmail.com'
  },
  {
    id: 2,
    carrier_id: 3,
    business_hours: '09:00 - 18:00',
    contact_name: 'Frick Richard',
    contact_hierarchy: 12,
    comments: 'Test cases are the basic units over which the complete testing process is executed',
    vendor_id: 4,
    phone_number: '(512) 984-1614',
    contact_status: 'Active',
    updated_date: '02-04-2023',
    department: 'Floor',
    email: 'richardfrick@gmail.com'
  }
]

export default contactsDetails
