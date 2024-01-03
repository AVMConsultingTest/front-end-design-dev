export interface DispatchSummary {
    id?: number;
    total_drivers_prev_month?: number;
    inservice_trailers?: number;
    total_trucks_prev_month?: number;
    delayed_loads?: number;
    total_trucks_change_per?: number;
    enroute_trucks?: number;
    total_drivers_change_per?: number;
    carrier_id?: number;
    total_loads_prev_month?: number;
    offduty_drivers?: number;
    enroute_trailers?: number;
    unassigned_loads?: number;
    underperforming_drivers?: number;
    upcoming_loads?: number;
    ready_trucks?: number;
    inservice_trucks?: number;
    placeholder_trailers?: number;
    total_trailers_prev_month?: number;
    bestperforming_drivers?: number;
    total_trucks_curr_month?: number;
    total_drivers_curr_month?: number;
    placeholder_trucks?: number;
    total_trailers_curr_month?: number;
    active_drivers?: number;
    intransit_loads?: number;
    ready_trailers?: number;
    updated_date?: Date|string;
    total_loads_change_per?: number;
    total_trailers_change_per?: number;
    total_loads_curr_month?: number;

  total_loads?: number;
  total_drivers?: number;
  reserved_loads?: number;
  total_trucks?: number;
  interminal_trucks?: number;
  interminal_trailers?: number;
  total_trailers?: number;
  completed_loads?: number;
    [key: string]: any
}
