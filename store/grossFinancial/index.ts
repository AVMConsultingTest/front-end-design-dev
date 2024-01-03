import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { GrossFinancialSummary } from '~/models/DISPATCH/grossFinancial/grossFinancialSummary'
import grossFinancialSummary from '~/static/DummyData/Dispatch/grossFinancialSummary'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    grossFinancial: {} as GrossFinancialSummary
  },
  response: {
    grossFinancial: {} as GrossFinancialSummary,
    grossFinances: [] as GrossFinancialSummary[],
    carrierGrossFinancialSummary: grossFinancialSummary as GrossFinancialSummary[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'GrossFinancialSummary'

export type GrossFinancialSummaryState = ReturnType<typeof state>

export const getters: GetterTree<GrossFinancialSummaryState, RootStoreState> = {
  grossFinancialRequest: state => (state.request.grossFinancial),
  grossFinancial: state => (state.response.grossFinancial),
  grossFinances: state => (state.response.grossFinances),
  pageCount: state => (state.page),
  carrierGrossFinancialSummary: state => (state.response.carrierGrossFinancialSummary)

}

export const mutations: MutationTree<GrossFinancialSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_GROSSFINANCIAL_REQUEST: (state, request:GrossFinancialSummary) => (state.request.grossFinancial = { ...state.request.grossFinancial, ...request }),
  SET_GROSS_FINANCIAL: (state, single:GrossFinancialSummary) => (state.response.grossFinancial = single),
  SET_GROSS_FINANCES: (state, list:GrossFinancialSummary[]) => (state.response.grossFinances = list),
  REMOVE_GROSS_FINANCIAL: state => (state.response.grossFinancial = {} as GrossFinancialSummary),
  SET_CARRIER_GROSS_FINANCIAL_SUMMARY: (state, list:GrossFinancialSummary[]) => (state.response.carrierGrossFinancialSummary = list)

}

export const actions: ActionTree<GrossFinancialSummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: GrossFinancialSummary) {
    commit('FILL_GROSSFINANCIAL_REQUEST', request)
  },
  async addGrossFinancial ({ commit }, request:GrossFinancialSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<GrossFinancialSummary, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_GROSS_FINANCIAL', request)
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
  async getGrossFinancialSummaryByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<GrossFinancialSummary[]>('grossFinancialSsummary', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_GROSS_FINANCIAL_SUMMARY', (response.data as DataResponse<GrossFinancialSummary[]>).data)
          } else {
            commit('SET _ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_GROSS_FINANCIAL_SUMMARY', grossFinancialSummary)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getGrossFinancial ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<GrossFinancialSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_GROSS_FINANCIAL', (response.data as DataResponse<GrossFinancialSummary[]>).data[0])
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
  async getGrossFinances ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<GrossFinancialSummary[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        console.log('gross:', response)
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_GROSS_FINANCES', (response.data as DataResponse<GrossFinancialSummary[]>).data)
          } else {
            commit('SET_GROSS_FINANCES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<GrossFinancialSummary[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_GROSS_FINANCES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateGrossFinancial ({ commit, getters }, request:GrossFinancialSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<GrossFinancialSummary, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_GROSS_FINANCIAL', request)
          commit('SET_GROSS_FINANCES', getters.grossFinances.map((item: GrossFinancialSummary) => item.id === request.id ? request : item))
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
  async removeGrossFinancial ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_GROSS_FINANCIAL')
          commit('SET_GROSS_FINANCES', getters.grossFinances.filter((item: GrossFinancialSummary) => item.id !== id))
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
