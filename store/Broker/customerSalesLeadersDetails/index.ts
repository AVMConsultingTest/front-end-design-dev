import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { CustomerSalesLeaders } from '~/models/Broker/customerSalesLeaders/customerSalesLeaders'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    customer: {} as CustomerSalesLeaders
  },
  response: {
    customer: {} as CustomerSalesLeaders,
    customers: [] as CustomerSalesLeaders[],
    brokerCustomers: [] as CustomerSalesLeaders[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'CustomerSalesLeadersDetails'

export type CustomerSalesLeadersState = ReturnType<typeof state>

export const getters: GetterTree<CustomerSalesLeadersState, RootStoreState> = {
  customerBoardRequest: state => (state.request.customer),
  customer: state => (state.response.customer),
  customers: state => (state.response.customers),
  brokerCustomers: state => (state.response.brokerCustomers),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<CustomerSalesLeadersState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_CUSTOMER: (state, single: CustomerSalesLeaders) => {
    if (single.id === undefined && state.response.customers.length < 12) {
      single.id = state.response.customers[state.response.customers.length - 1].id + 1
      state.response.customers.push(single)
    }
    console.log(single, state.response.customers)
  },
  FILL_CUSTOMER_REQUEST: (state, request:CustomerSalesLeaders) => (state.request.customer = { ...state.request.customer, ...request }),
  SET_BROKER_CUSTOMERS: (state, list:CustomerSalesLeaders[]) => (state.response.brokerCustomers = list),
  SET_CUSTOMER: (state, single:CustomerSalesLeaders) => (state.response.customer = single),
  SET_CUSTOMERS: (state, list:CustomerSalesLeaders[]) => (state.response.customers = list),
  REMOVE_CUSTOMER: state => (state.response.customer = {} as CustomerSalesLeaders),
  UPDATE_CUSTOMER: (state, single:CustomerSalesLeaders) => {
    const itemIndex = state.response.customers.findIndex((item: CustomerSalesLeaders) => item.id === single.id)
    state.response.customers[itemIndex] = single
  }
}

export const actions: ActionTree<CustomerSalesLeadersState, RootStoreState> = {
  fillRequest ({ commit }, request: CustomerSalesLeaders) {
    commit('FILL_CUSTOMER_REQUEST', request)
  },
  async addCustomer ({ commit }, request:CustomerSalesLeaders) {
    commit('SET_LOADING', true)
    try {
      return await service.add<CustomerSalesLeaders, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_CUSTOMER', request)
        } else {
          commit('ADD_CUSTOMER', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_CUSTOMER', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCustomerByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<CustomerSalesLeaders[]>('CustomerSalesLeadersDetails', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_CUSTOMERS', (response.data as DataResponse<CustomerSalesLeaders[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCustomer ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<CustomerSalesLeaders[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_CUSTOMER', (response.data as DataResponse<CustomerSalesLeaders[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCustomers ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<CustomerSalesLeaders[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_CUSTOMERS', (response.data as DataResponse<CustomerSalesLeaders[]>).data)
          } else {
            commit('SET_CUSTOMERS', [] as CustomerSalesLeaders[])
          }
          commit('SET_PAGE', (response.data as DataResponse<CustomerSalesLeaders[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CUSTOMERS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateCustomer ({ commit, getters }, request:CustomerSalesLeaders) {
    commit('SET_LOADING', true)
    try {
      return await service.update<CustomerSalesLeaders, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_CUSTOMER', request)
          commit('SET_CUSTOMER', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_CUSTOMER', request)
      commit('SET_CUSTOMERS', getters.customers.map((item: CustomerSalesLeaders) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeCustomer ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_CUSTOMER')
          commit('SET_CUSTOMERS', getters.customers.filter((item: CustomerSalesLeaders) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CUSTOMER', getters.customers.filter((item:CustomerSalesLeaders) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
