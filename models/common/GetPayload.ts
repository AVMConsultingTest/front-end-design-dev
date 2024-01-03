export interface GetPayload {
    page_number: number;
    pagingSize: number;
    filterModel?: {
        [key: string]: any;
    };
    sortedHeader?: string,
    id?: number | string;
}
