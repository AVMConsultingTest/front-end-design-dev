import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { CarrierMetrics } from '~/models/safetyMetrics/carrierMetrics'
import { SafetyMetricsSummary } from '~/models/safetyMetrics/safetyMetricsSummary'
import safetyMetrics from '~/static/DummyData/Safety/safetyMetrics'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()
const serviceTwo: ApiService = new ApiService()

export const state = () => ({
  response: {
    summary: safetyMetrics[0] as SafetyMetricsSummary,
    summaries: [] as SafetyMetricsSummary[],
    carrierSummary: {} as CarrierMetrics
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'SafetyMetricsSummary'

export type SafetyMetricsSummaryState = ReturnType<typeof state>

export const getters: GetterTree<SafetyMetricsSummaryState, RootStoreState> = {
  summary: state => (state.response.summary),
  summaries: state => (state.response.summaries),
  carrierSummary: state => (state.response.carrierSummary),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<SafetyMetricsSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  SET_SUMMARY: (state, single:SafetyMetricsSummary) => (state.response.summary = single),
  SET_SUMMARIES: (state, list:SafetyMetricsSummary[]) => (state.response.summaries = list),
  REMOVE_SUMMARY: state => (state.response.summary = {} as SafetyMetricsSummary),
  SET_CARRIER_SUMMARY: (state, single:CarrierMetrics) => (state.response.carrierSummary = single)
}

export const actions:ActionTree<SafetyMetricsSummaryState, RootStoreState> = {
  async addSummary ({ commit }, request:SafetyMetricsSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<SafetyMetricsSummary, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', request)
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
  async getSummary ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<SafetyMetricsSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', (response.data as DataResponse<SafetyMetricsSummary[]>).data[0])
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
  async getSummaryByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<SafetyMetricsSummary[]>('safetyMetrics', 1, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_SUMMARY', (response.data as DataResponse<SafetyMetricsSummary[]>).data[0])
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_SUMMARY', safetyMetrics[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSummaries ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<SafetyMetricsSummary[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_SUMMARIES', (response.data as DataResponse<SafetyMetricsSummary[]>).data)
          } else {
            commit('SET_SUMMARIES', [] as SafetyMetricsSummary[])
          }
          commit('SET_PAGE', (response.data as DataResponse<SafetyMetricsSummary[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_SUMMARIES', [] as SafetyMetricsSummary[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateSummary ({ commit }, request:SafetyMetricsSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<SafetyMetricsSummary, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', request)
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
  async removeSummary ({ commit }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_SUMMARY')
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
  async getCarrierMetrics ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.get<CarrierMetrics[]>('', payload.page_number, true, 'carrier=1', payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_CARRIER_METRICS', (response.data as DataResponse<CarrierMetrics[]>).body[0])
          } else {
            commit('SET_CARRIER_METRICS', {} as CarrierMetrics)
          }
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CARRIER_METRICS', {} as CarrierMetrics)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
