import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { PayablePaymentSummary } from '~/models/accounting/payablePaymentSummary/payablePaymentSummary'
import payablePaymentSummary from '~/static/DummyData/Accounting/payablePaymentSummary'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    payablePayment: {} as PayablePaymentSummary
  },
  response: {
    payablePayment: {} as PayablePaymentSummary,
    payablePayments: [] as PayablePaymentSummary[],
    carrierPayablePayments: payablePaymentSummary as PayablePaymentSummary[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/payables/payments-summary'

export type PayablePaymentSummaryState = ReturnType<typeof state>

export const getters: GetterTree<PayablePaymentSummaryState, RootStoreState> = {
  payableRequest: state => (state.request.payablePayment),
  payablePayment: state => (state.response.payablePayment),
  payablePayments: state => (state.response.payablePayments),
  carrierPayablePayments: state => (state.response.carrierPayablePayments),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<PayablePaymentSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_PAYABLE_REQUEST: (state, request:PayablePaymentSummary) => (state.request.payablePayment = { ...state.request.payablePayment, ...request }),
  SET_CARRIER_PAYABLE_PAYMENT: (state, list:PayablePaymentSummary[]) => (state.response.carrierPayablePayments = list),
  SET_PAYABLE_PAYMENT: (state, single:PayablePaymentSummary) => (state.response.payablePayment = single),
  SET_PAYABLE_PAYMENTS: (state, list:PayablePaymentSummary[]) => (state.response.payablePayments = list),
  REMOVE_PAYABLE: state => (state.response.payablePayment = {} as PayablePaymentSummary)
}

export const actions: ActionTree<PayablePaymentSummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: PayablePaymentSummary) {
    commit('FILL_PAYABLE_REQUEST', request)
  },
  async addPayablePayment ({ commit }, request:PayablePaymentSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<PayablePaymentSummary, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYABLE_PAYMENT', request)
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
  async getPayablePaymentsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<PayablePaymentSummary>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_PAYABLE_PAYMENT', (response.data as DataResponse<PayablePaymentSummary>))
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_PAYABLE_PAYMENT', payablePaymentSummary)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getPayablePayment ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      console.log('id', id)

      return await service.single<PayablePaymentSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYABLE_PAYMENT', (response.data as DataResponse<PayablePaymentSummary[]>).data[0])
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
  async getPayablePayments ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<PayablePaymentSummary[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_PAYABLE_PAYMENTS', (response.data as DataResponse<PayablePaymentSummary[]>).data)
          } else {
            commit('SET_PAYABLE_PAYMENTS', [] as PayablePaymentSummary[])
          }
          commit('SET_PAGE', (response.data as DataResponse<PayablePaymentSummary[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_PAYABLE_PAYMENTS', [] as PayablePaymentSummary[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updatePayablePayment ({ commit, getters }, request:PayablePaymentSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<PayablePaymentSummary, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYABLE_PAYMENT', request)
          commit('SET_PAYABLE_PAYMENTS', getters.payablePayments.map((item: PayablePaymentSummary) => item.id === request.id ? request : item))
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
  async removePayablePayment ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_PAYABLE')
          commit('SET_PAYABLE_PAYMENTS', getters.payablePayments.filter((item: PayablePaymentSummary) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING, false') }, 200)
    }
  }
}
