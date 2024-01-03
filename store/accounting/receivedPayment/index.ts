import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { ReceivedPaymentDetails } from '~/models/accounting/receivesPayment/receivedPaymentDetails'
import receivedPayment from '~/static/DummyData/Accounting/receivedPayment'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    receivedPayment: {} as ReceivedPaymentDetails
  },
  response: {
    receivedPayment: {} as ReceivedPaymentDetails,
    receivedPayments: [] as ReceivedPaymentDetails[],
    carrierReceivedPayments: receivedPayment as ReceivedPaymentDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'ReceivedPaymentDetails'

export type ReceivedPaymentDetailsState = ReturnType<typeof state>

export const getters: GetterTree<ReceivedPaymentDetailsState, RootStoreState> = {
  receivedPaymentRequest: state => (state.request.receivedPayment),
  receivedPayment: state => (state.response.receivedPayment),
  receivedPayments: state => (state.response.receivedPayments),
  carrierReceivedPayments: state => (state.response.carrierReceivedPayments),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ReceivedPaymentDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECEIVED_PAYMENT_REQUEST: (state, request:ReceivedPaymentDetails) => (state.request.receivedPayment = { ...state.request.receivedPayment, ...request }),
  SET_CARRIER_RECEIVED_PAYMENTS: (state, list:ReceivedPaymentDetails[]) => (state.response.carrierReceivedPayments = list),
  SET_RECEIVED_PAYMENT: (state, single:ReceivedPaymentDetails) => (state.response.receivedPayment = single),
  SET_RECEIVED_PAYMENTS: (state, list:ReceivedPaymentDetails[]) => (state.response.receivedPayments = list),
  REMOVE_RECEIVED_PAYMENT: state => (state.response.receivedPayment = {} as ReceivedPaymentDetails)
}

export const actions: ActionTree<ReceivedPaymentDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: ReceivedPaymentDetails) {
    commit('FILL_RECEIVED_PAYMENT_REQUEST', request)
  },
  async addReceivedPayment ({ commit }, request:ReceivedPaymentDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ReceivedPaymentDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_RECEIVED_PAYMENT', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getReceivedPaymentsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ReceivedPaymentDetails[]>('receivedPayment', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECEIVED_PAYMENTS', (response.data as DataResponse<ReceivedPaymentDetails[]>).data)
          } else {
            commit('SET _ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_RECEIVED_PAYMENTS', receivedPayment)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getReceivedPayment ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ReceivedPaymentDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_RECEIVED_PAYMENT', (response.data as DataResponse<ReceivedPaymentDetails[]>).data[0])
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
  async getReceivedPayments ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ReceivedPaymentDetails[]>(endPoint, page_number).then((response) => {
        console.log('received:', response)
        if (response.status === 200) {
          commit('SET_RECEIVED_PAYMENTS', (response.data as DataResponse<ReceivedPaymentDetails[]>).data)
          commit('SET_PAGE', (response.data as DataResponse<ReceivedPaymentDetails[]>).total_pages)
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
  async updateReceivedPayment ({ commit, getters }, request:ReceivedPaymentDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ReceivedPaymentDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_RECEIVED_PAYMENT', request)
          commit('SET_RECEIVED_PAYMENTS', getters.receivedPayment.map((item: ReceivedPaymentDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeReceivedPayment ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_RECEIVED_PAYMENT')
          commit('SET_RECEIVED_PAYMENTS', getters.receivedPayments.filter((item: ReceivedPaymentDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
