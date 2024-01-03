import { IncidentRegistryDetails } from '~/models/incidentRegistry/incidentRegistryDetails'
const incidentRegistry: Array<IncidentRegistryDetails> = [
  {
    id: 1,
    incident_id: '1',
    unit_number: '1234',
    event_type: 'Blocked Camera',
    incident_date: '22/12/2022',
    training_required: 'Yes',
    training_completed: 'No',
    driver_name: 'George Brown'

  } as IncidentRegistryDetails,
  {
    id: 2,
    incident_id: '2',
    unit_number: '1234',
    event_type: 'Speeding',
    incident_date: '8/11/2022',
    training_required: 'No',
    training_completed: 'No',
    driver_name: 'Brooklyn Simmons'

  } as IncidentRegistryDetails
]
export default incidentRegistry
