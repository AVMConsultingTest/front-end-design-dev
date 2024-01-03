import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { VendorPaymentsDetails } from '~/models/accounting/vendorPayments/vendorPaymentsDetails'
import vendorPaymentsDetails from '~/static/DummyData/Accounting/vendorPayments'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService('')

export const state = () => ({
  request: {
    vendorPayment: {} as VendorPaymentsDetails
  },
  response: {
    vendorPayment: {} as VendorPaymentsDetails,
    vendorPayments: [] as VendorPaymentsDetails[],
    carrierVendorPayments: vendorPaymentsDetails as VendorPaymentsDetails[]
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

export interface SetVendorPaymentRequest {
  vendorPayment: VendorPaymentsDetails
  step?:number,
  title?:string
}

export const endPoint = 'ScheduledPaymentsDetails'

export type VendorPaymentsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<VendorPaymentsDetailsState, RootStoreState> = {
  vendorPaymentRequest: state => (state.request.vendorPayment),
  vendorPayment: state => (state.response.vendorPayment),
  vendorPayments: state => (state.response.vendorPayments),
  carrierVendorPayments: state => (state.response.carrierVendorPayments),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<VendorPaymentsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_PAYMENT_REQUEST: (state, request:VendorPaymentsDetails) => (state.request.vendorPayment = { ...state.request.vendorPayment, ...request }),
  SET_CARRIER_PAYMENTS: (state, list:VendorPaymentsDetails[]) => (state.response.carrierVendorPayments = list),
  SET_PAYMENT: (state, single:VendorPaymentsDetails) => (state.response.vendorPayment = single),
  SET_PAYMENTS: (state, list:VendorPaymentsDetails[]) => (state.response.vendorPayments = list),
  REMOVE_PAYMENT: state => (state.response.vendorPayment = {} as VendorPaymentsDetails),
  UPDATE_PAYMENT: (state, single:VendorPaymentsDetails) => {
    const carrierItemIndex = state.response.carrierVendorPayments.findIndex((item: VendorPaymentsDetails) => item.id === single.id)
    state.response.carrierVendorPayments[carrierItemIndex] = single
  },
  ADD_PAYMENT: (state, single: VendorPaymentsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.carrierVendorPayments[state.response.carrierVendorPayments.length - 1].id + 1
    }
    state.response.carrierVendorPayments.push(single)
    console.log(single, state.response.carrierVendorPayments)
  },
  SET_ADD_PAYMENT: (state, request:SetVendorPaymentRequest) => {
    if (request.vendorPayment) {
      state.request.vendorPayment = request.vendorPayment as VendorPaymentsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<VendorPaymentsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: VendorPaymentsDetails) {
    commit('FILL_PAYMENT_REQUEST', request)
  },
  setVendorPayment ({ commit }, request:SetVendorPaymentRequest) {
    commit('SET_ADD_PAYMENT', request)
  },
  async addVendorPayment ({ commit }, request:VendorPaymentsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<VendorPaymentsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_PAYMENT', request)
        } else {
          commit('ADD_PAYMENT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getVendorPaymentByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<VendorPaymentsDetails[]>('vendorPayments', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_PAYMENTS', (response.data as DataResponse<VendorPaymentsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<VendorPaymentsDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_PAYMENTS', vendorPaymentsDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getVendorPayment ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<VendorPaymentsDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_PAYMENT', (response.data as DataResponse<VendorPaymentsDetails[]>).data[0])
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
  async getVendorPayments ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<VendorPaymentsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_PAYMENTS', (response.data as DataResponse<VendorPaymentsDetails[]>).data)
          } else {
            commit('SET_PAYMENTS', [] as VendorPaymentsDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<VendorPaymentsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_PAYMENTS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateVendorPayment ({ commit, getters }, request:VendorPaymentsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<VendorPaymentsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_PAYMENT', request)
          commit('SET_PAYMENTS', getters.vendors.map((item: VendorPaymentsDetails) => item.id === request.id ? request : item))
          commit('SET_CARRIER_PAYMENTS', getters.carrierVendorPayments.map((item: VendorPaymentsDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_PAYMENT', request)
          commit('SET_PAYMENTS', getters.vendors.map((item: VendorPaymentsDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_PAYMENT', request)
      commit('SET_PAYMENT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeVendorPayment ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_PAYMENT')
          commit('SET_PAYMENTS', getters.vendorPayments.filter((item: VendorPaymentsDetails) => item.id !== id))
          commit('SET_CARRIER_PAYMENTS', getters.carrierVendorPayments.filter((item: VendorPaymentsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_PAYMENTS', getters.vendorPayments.filter((item:VendorPaymentsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
