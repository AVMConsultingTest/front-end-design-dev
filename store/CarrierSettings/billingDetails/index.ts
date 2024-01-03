import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { BillingDetails } from '~/models/CarrierSettings/billingDetails/billingDetails'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService('/carrier_settings_api')

export const state = () => ({
  request: {
    billing: {} as BillingDetails
  },
  response: {
    billing: {} as BillingDetails,
    billings: [] as BillingDetails[],
    carrierBillings: [] as BillingDetails[]
  },
  page: 0,
  loading: false,
  error: '',
  addStep: {
    index: 0,
    title: '',
    subTitle: ''
  }
})

export interface SetBillingRequest {
    billing?:null|BillingDetails,
    step?:number,
    title?:string
}

const endPoint = '/BillingDetails'

export type BillingState = ReturnType<typeof state>

export const getters: GetterTree<BillingState, RootStoreState> = {
  billingRequest: state => (state.request),
  billing: state => (state.response.billing),
  billings: state => (state.response.billings),
  carrierBillings: state => (state.response.carrierBillings),
  step: state => (state.addStep),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<BillingState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_BILLING_REQUEST: (state, request:BillingDetails) => (state.request.billing = { ...state.request.billing, ...request }),
  SET_BILLING: (state, single:BillingDetails) => (state.response.billing = single),
  SET_BILLINGS: (state, list:BillingDetails[]) => (state.response.billings = list),
  REMOVE_BILLING: state => (state.response.billing = {} as BillingDetails),
  SET_CARRIER_BILLINGS: (state, list:BillingDetails[]) => (state.response.carrierBillings = list),
  ADD_BILLING: (state, single:BillingDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierBillings.length < 12) {
        single.id = state.response.carrierBillings[state.response.carrierBillings.length - 1].id + 1
        state.response.carrierBillings.push(single)
      }
    }
  },
  UPDATE_BILLING: (state, single:BillingDetails) => {
    const itemIndex = state.response.billings.findIndex((item: BillingDetails) => item.id === single.id)
    state.response.billings[itemIndex] = single
    const carrierItemIndex = state.response.carrierBillings.findIndex((item: BillingDetails) => item.id === single.id)
    state.response.carrierBillings[carrierItemIndex] = single
  },
  SET_ADD_BILLING (state, request:SetBillingRequest) {
    if (request.billing) {
      state.request.billing = request.billing as BillingDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<BillingState, RootStoreState> = {
  fillRequest ({ commit }, request: BillingDetails) {
    commit('FILL_BILLING_REQUEST', request)
  },
  setBilling ({ commit }, request:SetBillingRequest) {
    commit('SET_ADD_BILLING', request)
  },
  async addBilling ({ commit }, request:BillingDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<BillingDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_BILLING', request)
        } else {
          commit('ADD_BILLING', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateBilling ({ commit, getters }, request:BillingDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<BillingDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_BILLING', request)
          commit('SET_CARRIER_BILLINGS', getters.carrierBillings.map((item: BillingDetails) => item.id === request.id ? request : item))
          commit('SET_BILLINGS', getters.billings.map((item: BillingDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_BILLING', request)
          commit('SET_BILLINGS', getters.billings.map((item: BillingDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_BILLING', request)
      commit('SET_BILLING', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getBilling ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<BillingDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_BILLING', (response.data as DataResponse<BillingDetails[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.billing)
      commit('SET_BILLING', getters.billings.filter((item: BillingDetails) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getBillings ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<BillingDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_BILLINGS', (response.data as DataResponse<BillingDetails[]>).data)
          } else {
            commit('SET_ERROR', [] as BillingDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<BillingDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_BILLINGS', [] as BillingDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getBillingByCarrierId ({ commit, rootState }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<BillingDetails[]>(endPoint + '/Carriers', rootState.carrierId, payload.page_number, undefined, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_BILLINGS', (response.data as DataResponse<BillingDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<BillingDetails[]>).total_pages)
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
  async removeBilling ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_BILLING')
          commit('SET_BILLINGS', getters.billings.filter((item: BillingDetails) => item.id !== id))
          commit('SET_CARRIER_BILLINGS', getters.carrierBillings.filter((item: BillingDetails) => item.id !== id))
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
