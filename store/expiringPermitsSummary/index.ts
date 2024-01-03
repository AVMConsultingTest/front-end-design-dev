import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { ExpiringPermitsSummary } from '~/models/expiringPermitsSummary'
import expiringPermitsSummary from '~/static/DummyData/Safety/expiringPermitsSummary'
import ApiService from '~/services/baseService'
const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    expiringPermitSummary: {
      ny: 1,
    } as ExpiringPermitsSummary
  },
  response: {
    carrierSummary: {} as ExpiringPermitsSummary,
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/permits/expiring-summary'

export type ExpiringPermitsSummaryState = ReturnType<typeof state>

export const getters: GetterTree<ExpiringPermitsSummaryState, RootStoreState> = {
  carrierSummary: state => (state.response.carrierSummary),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ExpiringPermitsSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_EXPIRING_PERMITS_REQUEST: (state, request:ExpiringPermitsSummary) => (state.request.expiringPermitSummary = { ...state.request.expiringPermitSummary, ...request }),
  SET_CARRIER_SUMMARY: (state, single:ExpiringPermitsSummary) => (state.response.carrierSummary = single)
}

export const actions:ActionTree<ExpiringPermitsSummaryState, RootStoreState> = {
  async getSummaryByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .single<ExpiringPermitsSummary[]>(endPoint, "")
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_SUMMARY', (response.data as DataResponse<ExpiringPermitsSummary[]>))
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
