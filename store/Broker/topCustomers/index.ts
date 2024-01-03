import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { TopCustomersDetails } from '~/models/Broker/topCustomers/topCustomersDetails'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    customer: {} as TopCustomersDetails
  },
  response: {
    customer: {} as TopCustomersDetails,
    customers: [] as TopCustomersDetails[],
    brokerCustomers: [] as TopCustomersDetails[]
  },
  page: 1,
  loading: false,
  error: '',
  addStep: {
    index: 0,
    title: '',
    subTitle: ''
  }

})

export interface SetTopCustomerRequest {
  customer: TopCustomersDetails
  step?:number,
  title?:string
}

export const endPoint = 'TopCustomersDetails'

export type TopCustomersDetailsState = ReturnType<typeof state>

export const getters: GetterTree<TopCustomersDetailsState, RootStoreState> = {
  customerBoardRequest: state => (state.request.customer),
  customer: state => (state.response.customer),
  customers: state => (state.response.customers),
  brokerCustomers: state => (state.response.brokerCustomers),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<TopCustomersDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_CUSTOMER_REQUEST: (state, request:TopCustomersDetails) => (state.request.customer = { ...state.request.customer, ...request }),
  SET_BROKER_CUSTOMERS: (state, list:TopCustomersDetails[]) => (state.response.brokerCustomers = list),
  SET_CUSTOMER: (state, single:TopCustomersDetails) => (state.response.customer = single),
  SET_CUSTOMERS: (state, list:TopCustomersDetails[]) => (state.response.customers = list),
  REMOVE_CUSTOMER: state => (state.response.customer = {} as TopCustomersDetails),
  UPDATE_CUSTOMER: (state, single:TopCustomersDetails) => {
    const itemIndex = state.response.customers.findIndex((item: TopCustomersDetails) => item.id === single.id)
    state.response.customers[itemIndex] = single
    const brokerItemIndex = state.response.brokerCustomers.findIndex((item: TopCustomersDetails) => item.id === single.id)
    state.response.brokerCustomers[brokerItemIndex] = single
  },
  ADD_CUSTOMER: (state, single: TopCustomersDetails) => {
    if (single.id === undefined) {
      single.id = state.response.brokerCustomers[state.response.brokerCustomers.length - 1].id + 1
    }
    state.response.brokerCustomers.push(single)
    console.log(single, state.response.brokerCustomers)
  },
  SET_ADD_CUSTOMER: (state, request:SetTopCustomerRequest) => {
    if (request.customer) {
      state.request.customer = request.customer as TopCustomersDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<TopCustomersDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: TopCustomersDetails) {
    commit('FILL_CUSTOMER_REQUEST', request)
  },
  setCustomer ({ commit }, request:SetTopCustomerRequest) {
    commit('SET_ADD_CUSTOMER', request)
  },
  async addCustomer ({ commit }, request:TopCustomersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<TopCustomersDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_CUSTOMER', request)
        } else {
          commit('ADD_CUSTOMER', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCustomersByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<TopCustomersDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_CUSTOMERS', (response.data as DataResponse<TopCustomersDetails[]>).data)
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
      return await service.single<TopCustomersDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_CUSTOMER', (response.data as DataResponse<TopCustomersDetails[]>).data[0])
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
      return await service.get<TopCustomersDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_CUSTOMERS', (response.data as DataResponse<TopCustomersDetails[]>).data)
          } else {
            commit('SET_CUSTOMERS', [] as TopCustomersDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<TopCustomersDetails[]>).total_pages)
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
  async updateCustomer ({ commit, getters }, request:TopCustomersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<TopCustomersDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_CUSTOMER', request)
          commit('SET_CUSTOMERS', getters.customers.map((item: TopCustomersDetails) => item.id === request.id ? request : item))
          commit('SET_CARRIER_CUSTOMERS', getters.brokerCustomers.map((item: TopCustomersDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_CUSTOMER', request)
      commit('SET_CUSTOMERS', getters.customers.map((item: TopCustomersDetails) => item.id === request.id ? request : item))
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
          commit('SET_CUSTOMERS', getters.customers.filter((item: TopCustomersDetails) => item.id !== id))
          commit('SET_CARRIER_CUSTOMERS', getters.brokerCustomers.filter((item: TopCustomersDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CUSTOMER', getters.customers.filter((item:TopCustomersDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
