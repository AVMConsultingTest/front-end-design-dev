export interface Training {
    // old models name
    id: number;
    driver_id: number|string;
    training_type: string;
    cadence: string;
    completion_date: Date|string;
    document_id: number|string;
    carrier_id?: number;
    updated_date?: Date;

    // new models name
    type: string
    description: string
    status: string
    [x: string]: any;
}
