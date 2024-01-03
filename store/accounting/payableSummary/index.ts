import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { PayableSummary } from '~/models/accounting/payableSummary/payableSummary'
import payableSummary from '~/static/DummyData/Accounting/payableSummary'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    payable: {} as PayableSummary
  },
  response: {
    payable: {} as PayableSummary,
    payables: [] as PayableSummary[],
    carrierPayables: payableSummary as PayableSummary[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/payables/summary'

export type PayableSummaryState = ReturnType<typeof state>

export const getters: GetterTree<PayableSummaryState, RootStoreState> = {
  payableRequest: state => (state.request.payable),
  payable: state => (state.response.payable),
  payables: state => (state.response.payables),
  carrierPayables: state => (state.response.carrierPayables),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<PayableSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_PAYABLE_REQUEST: (state, request:PayableSummary) => (state.request.payable = { ...state.request.payable, ...request }),
  SET_CARRIER_PAYABLES: (state, list:PayableSummary[]) => (state.response.carrierPayables = list),
  SET_PAYABLE: (state, single:PayableSummary) => (state.response.payable = single),
  SET_PAYABLES: (state, list:PayableSummary[]) => (state.response.payables = list),
  REMOVE_PAYABLE: state => (state.response.payable = {} as PayableSummary)
}

export const actions: ActionTree<PayableSummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: PayableSummary) {
    commit('FILL_PAYABLE_REQUEST', request)
  },
  async addPayable ({ commit }, request:PayableSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<PayableSummary, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYABLE', request)
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
  async getPayablesByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<PayableSummary>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_PAYABLES', (response.data as DataResponse<PayableSummary>))
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_PAYABLES', payableSummary)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getPayable ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      console.log('id', id)

      return await service.single<PayableSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYABLE', (response.data as DataResponse<PayableSummary[]>).data[0])
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
  async getPayables ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<PayableSummary[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_PAYABLES', (response.data as DataResponse<PayableSummary[]>).data)
          } else {
            commit('SET_PAYABLES', [] as PayableSummary[])
          }
          commit('SET_PAGE', (response.data as DataResponse<PayableSummary[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_PAYABLES', [] as PayableSummary[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updatePayable ({ commit, getters }, request:PayableSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<PayableSummary, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYABLE', request)
          commit('SET_PAYABLES', getters.payables.map((item: PayableSummary) => item.id === request.id ? request : item))
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
  async removePayable ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_PAYABLE')
          commit('SET_PAYABLES', getters.payables.filter((item: PayableSummary) => item.id !== id))
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
