import { DrugTest } from '~/models/drugs/drugTest'

const drugTest:Array<DrugTest> = [
  {
    id: 1,
    driver_id: '108',
    driver_name: 'John Hawking',
    type: 'Resonable Suspicion',
    status: 'Pending',
    result: 'Positive',
    date: '18/02/2022'
  },
  {
    id: 2,
    driver_id: '110',
    driver_name: 'Bill Sanders',
    type: 'Resonable Suspicion',
    status: 'Completed',
    result: 'Diluted',
    date: '18/02/2022'
  }
]
export default drugTest
