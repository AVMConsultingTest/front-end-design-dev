import { AxiosResponse } from 'axios'
// import moment from 'moment'
import { DataResponse } from '~/models/common/DataResponse'
import { APIResponse } from '~/models/common/apiResponse'
import { $axios } from '~/utils/api'

export default class ApiService {
  private baseUrl = process.env.BASE_URL
  private page_size = 12

  constructor (base?:String) {
    this.baseUrl = process.env.BASE_URL
    console.log(base)
  }

  get<TResponse> (url:string, page_number: number, withSnake = false, query = '', filters?: { [x: string]: any } | null, sort?: string): Promise<AxiosResponse<DataResponse<TResponse | APIResponse> | APIResponse>> {
    let pageNumberQuery = 'page_number'
    let pageSizeQuery = 'page_size'
    if (withSnake) {
      pageNumberQuery = 'page_number'
      pageSizeQuery = 'page_size'
    }
    let filterQuery = ''
    let sortQuery = ''
    console.log('filters:', filters)
    if (filters && Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        if (filters[key].length > 0) {
          filterQuery += `filtered_${key}=${filters[key]}&`
        }
      })
    }
    if (sort && sort.length > 0) {
      const splittedSort = sort.split('+')
      if (splittedSort[1] === 'asc') {
        sortQuery = `sorted_${splittedSort[0]}=ASC`
      } else {
        sortQuery = `sorted_${splittedSort[0]}=DESC`
      }
    }
    return $axios.get<TResponse, AxiosResponse<DataResponse<TResponse | APIResponse> | APIResponse>>(`${this.baseUrl}/${url.length > 0 ? url : ''}?${query.length > 0 ? query + '&' : ''}${pageSizeQuery}=${this.page_size}&${pageNumberQuery}=${page_number ?? 1}${filterQuery.length > 0 ? '&' + filterQuery : ''}${sortQuery.length > 0 ? '&' + sortQuery : ''}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  // getNew<TResponse> (url:string, pageNumber: number, withSnake = false, query = '', filters?: { [x: string]: any } | null, sort?: string): Promise<AxiosResponse<DataResponse<TResponse | APIResponse> | APIResponse>> {
  //   let pageNumberQuery = 'pageNumber'
  //   let pageSizeQuery = 'pageSize'
  //   if (withSnake) {
  //     pageNumberQuery = 'page_number'
  //     pageSizeQuery = 'page_size'
  //   }
  //   let filterQuery = ''
  //   let sortQuery = ''
  //   console.log('filters:', filters)
  //   if (filters && Object.keys(filters).length > 0) {
  //     Object.keys(filters).forEach((key) => {
  //       if (filters[key].length > 0) {
  //         filterQuery += `filtered_${key}=${filters[key]}&`
  //       }
  //     })
  //   }
  //   if (sort && sort.length > 0) {
  //     const splittedSort = sort.split('+')
  //     if (splittedSort[1] === 'asc') {
  //       sortQuery = `sort=${splittedSort[0]}&sortOrder=asc`
  //     } else {
  //       sortQuery = `sort=${splittedSort[0]}&sortOrder=desc`
  //     }
  //   }
  //   return $axios.get<TResponse, AxiosResponse<DataResponse<TResponse | APIResponse> | APIResponse>>(`${this.baseUrl}/${url.length > 0 ? url : ''}?${query.length > 0 ? query + '&' : ''}${pageSizeQuery}=${this.pageSize}&${pageNumberQuery}=${pageNumber ?? 1}${filterQuery.length > 0 ? '&' + filterQuery : ''}${sortQuery.length > 0 ? '&' + sortQuery : ''}`)
  // }

  single<TResponse> (url:string, id:number|string): Promise<AxiosResponse<DataResponse<TResponse> | APIResponse>> {
    return $axios.get<TResponse, AxiosResponse<DataResponse<TResponse> | APIResponse>>(`${this.baseUrl}/${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  getList<TResponse> (url:string): Promise<AxiosResponse<DataResponse<TResponse> | APIResponse>> {
    return $axios.get<TResponse, AxiosResponse<DataResponse<TResponse> | APIResponse>>(`${this.baseUrl}/${url}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  multiple<TResponse> (url:string, id:number|string, page_number: number, pagingSize = 12, withSnake = false, query = '', filters?: { [x: string]: any } | null, sort?: string): Promise<AxiosResponse<DataResponse<TResponse | APIResponse> | APIResponse>> {
    let pageNumberQuery = 'page_number'
    let pageSizeQuery = 'page_size'
    if (withSnake) {
      pageNumberQuery = 'page_number'
      pageSizeQuery = 'page_size'
    }
    let filterQuery = ''
    let sortQuery = ''
    console.log('filters:', filters)
    if (filters && Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        if (filters[key].length > 0) {
          filterQuery += `filtered_${key}=${filters[key]}&`
        }
      })
    }
    if (sort && sort.length > 0) {
      const splittedSort = sort.split('+')
      if (splittedSort[1] === 'asc') {
        sortQuery = `sorted_${splittedSort[0]}=ASC`
      } else {
        sortQuery = `sorted_${splittedSort[0]}=DESC`
      }
    }
    return $axios.get<TResponse, AxiosResponse<DataResponse<TResponse | APIResponse> | APIResponse>>(`${this.baseUrl}/${url.length > 0 ? url : ''}/${id}?${query.length > 0 ? query + '&' : ''}${pageSizeQuery}=${pagingSize}&${pageNumberQuery}=${page_number ?? 1}${filterQuery.length > 0 ? '&' + filterQuery : ''}${sortQuery.length > 0 ? '&' + sortQuery : ''}`)
  }

  add<TRequest, TResponse> (url:string, request: TRequest): Promise<AxiosResponse<TResponse>> {
    console.log('JSON Request:', JSON.stringify({
      ...request
    }))
    return $axios.post<TResponse, AxiosResponse<TResponse>>(`${this.baseUrl}/${url}`, {
      ...request
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  // update<TRequest, TResponse> (url:string, id:number|string, request: TRequest): Promise<AxiosResponse<TResponse>> {
  //   console.log('JSON Request:', JSON.stringify({
  //     ...request
  //   }))
  //   return $axios.put<TResponse, AxiosResponse<TResponse>>(`${this.baseUrl}/${url}/${id}`, {
  //     ...request
  //   })
  // }
  update<TRequest extends { id?: any }, TResponse> (url:string, id:number|string, request: TRequest): Promise<AxiosResponse<TResponse>> {
    console.log(id)
    // ID'yi kaldırmadan önce request'i kopyala
    const requestBody = { ...request }
    // ID bilgisini request body'sinden sil
    delete requestBody.id
    console.log('JSON Request:', JSON.stringify(requestBody))
    return $axios.put<TResponse, AxiosResponse<TResponse>>(`${this.baseUrl}/${url}/${id}`, requestBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  delete<TResponse> (url:string, id:number|string): Promise<AxiosResponse<TResponse>> {
    return $axios.delete<TResponse, AxiosResponse<TResponse>>(`${this.baseUrl}/${url}/${id}`, {
      data: { id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  // send<TRequest, TResponse> (request: TRequest, file:any): Promise<AxiosResponse<TResponse>> {
  //   request["document_upload_date"] = "";
  //   var params = qs.stringify(request);
  //   return $axios.post<TResponse, AxiosResponse<TResponse>>('https://98fgtpjwt7.execute-api.us-east-1.amazonaws.com/v1?' + params, {
  //     file
  //   }, headers: {
  //     "Content-Type": "multipart/form-data",
  //   )
  // }
}
