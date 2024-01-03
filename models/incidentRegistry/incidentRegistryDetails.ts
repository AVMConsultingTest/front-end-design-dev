
export interface IncidentRegistryDetails {
    // old models name
    driver_name: string;
    incident_id:string;
    incident_date: Date|string;
    most_recent_date: Date|string;
    incident_description: string;
    most_recent_incident: string;
    location_of_incident: string;
    updated_date: Date|string;
    vehicle_id: number;
    incident_score: number;
    ticketed:string;
    towed:string;
    state:string;
    at_fault:string;
    // new models name
    id: number
    unit_number: string
    event_type: string
    date: string
    training_required: string
    training_completed: string
    driver_id: number
    truck_id: number
}
