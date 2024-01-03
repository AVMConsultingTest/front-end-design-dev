import { Training } from '~/models/training/training'

const training:Array<Training> = [
  {
    id: 1,
    type: 'Driver',
    driver_id: 'Driver 1',
    training_type: 'Road',
    description: 'Pre driving test',
    cadence: 'One-time',
    completion_date: '08/10/2022',
    document_id: '102',
    status: 'Pending'
  },
  {
    id: 2,
    type: 'Driver',
    driver_id: 'Driver 1',
    training_type: 'Road',
    description: 'Post driving test',
    cadence: 'One-time',
    completion_date: '08/10/2022',
    document_id: '106',
    status: 'Pending'
  },
  {
    id: 3,
    type: 'Driver',
    driver_id: 'Driver 1',
    training_type: 'Classroom',
    description: 'HOS',
    cadence: 'Annual',
    completion_date: '08/14/2022',
    document_id: '108',
    status: 'Pending'
  },
  {
    id: 4,
    type: 'Driver',
    driver_id: 'Driver 1',
    training_type: 'Classroom',
    description: 'Onboarding',
    cadence: 'One-time',
    completion_date: '08/14/2022',
    document_id: '110',
    status: 'Completed'
  },
  {
    id: 5,
    type: 'Dispatcher',
    driver_id: 'Dispatcher 1',
    training_type: 'Classroom',
    description: 'Onboarding',
    cadence: 'One-time',
    completion_date: '08/14/2022',
    document_id: '112',
    status: 'Completed'
  }
]

export default training
