export interface DataResponse<TResponse> {
    page_size: number,
    page_number: number,
    total_pages: number,
    data: TResponse
    body: TResponse
}
