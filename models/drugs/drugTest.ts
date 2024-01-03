export interface DrugTest {
    // old models name
    driver_name: string;
    carrier_id?: number;
    updated_date?: Date;
    // new models name
    id: number
    type: string
    status: string
    date: string
    result: string
    driver_id: number|string

    [x: string]: any;
}
