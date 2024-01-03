export interface VehiclesSummary {
    id: number;
    carrier_id: number;
    in_shop_trailers: number
    available_trailers: number
    active_trailers: number
    inspections: number
    service_reminders: number
    available_trucks: number
    trailers_service_tickets: number
    in_shop_trucks: number
    active_trucks: number
    service_reminders_overdue: number
    dispatched_trailers: number
    updated_date: string
    inspections_overdue: number
    dispatched_trucks: number
    trucks_service_tickets: number
    [x: string]:any;

}
