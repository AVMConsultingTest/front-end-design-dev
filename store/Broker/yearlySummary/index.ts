import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import ApiService from '~/services/baseService'
import { YearlySummary } from '~/models/Broker/yearlySummary/yearlySummary'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    yearlySummary: {} as YearlySummary
  },
  response: {
    yearlySummary: {} as YearlySummary,
    yearlySummaries: [] as YearlySummary[],
    brokerYearlySummary: [] as YearlySummary[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'YearlySummary'

export type YearlySummaryState = ReturnType<typeof state>

export const getters: GetterTree<YearlySummaryState, RootStoreState> = {
  yearlySummaryRequest: state => (state.request.yearlySummary),
  yearlySummary: state => (state.response.yearlySummary),
  yearlySummaries: state => (state.response.yearlySummaries),
  brokerYearlySummary: state => (state.response.brokerYearlySummary),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<YearlySummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_YEARLYSUMMARY_REQUEST: (state, request:YearlySummary) => (state.request.yearlySummary = { ...state.request.yearlySummary, ...request }),
  SET_BROKER_YEARLY_SUMMARY: (state, list:YearlySummary[]) => (state.response.brokerYearlySummary = list),
  SET_YEARLYSUMMARY: (state, single:YearlySummary) => (state.response.yearlySummary = single),
  SET_YEARLYSUMMARIES: (state, list:YearlySummary[]) => (state.response.yearlySummaries = list),
  REMOVE_YEARLYSUMMARY: state => (state.response.yearlySummary = {} as YearlySummary)
}

export const actions: ActionTree<YearlySummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: YearlySummary) {
    commit('FILL_YEARLYSUMMARY_REQUEST', request)
  },
  async getYearlySummary ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<YearlySummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_YEARLYSUMMARY', (response.data as DataResponse<YearlySummary[]>).data[0])
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
  async getYearlySummaryByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<YearlySummary[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            console.log('sum res:', response)

            commit('SET_BROKER_YEARLY_SUMMARY', (response.data as DataResponse<YearlySummary[]>).data)
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
