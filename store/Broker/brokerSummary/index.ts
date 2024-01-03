import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { BrokerSummary } from '~/models/Broker/brokerSummary/brokerSummary'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    broker: {} as BrokerSummary
  },
  response: {
    broker: {} as BrokerSummary,
    brokers: [] as BrokerSummary[],
    brokerBrokerSummary: {} as BrokerSummary
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'BrokersSummary'

export type BrokerSummaryState = ReturnType<typeof state>

export const getters: GetterTree<BrokerSummaryState, RootStoreState> = {
  brokerRequest: state => (state.request.broker),
  broker: state => (state.response.broker),
  brokers: state => (state.response.brokers),
  brokerBrokerSummary: state => (state.response.brokerBrokerSummary),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<BrokerSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_BROKER_REQUEST: (state, request:BrokerSummary) => (state.request.broker = { ...state.request.broker, ...request }),
  SET_BROKER_BROKER_SUMMARY: (state, single:BrokerSummary) => (state.response.brokerBrokerSummary = single),
  SET_BROKER: (state, single:BrokerSummary) => (state.response.broker = single),
  SET_BROKERS: (state, list:BrokerSummary[]) => (state.response.brokers = list),
  REMOVE_BROKER: state => (state.response.broker = {} as BrokerSummary)
}

export const actions: ActionTree<BrokerSummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: BrokerSummary) {
    commit('FILL_BROKER_REQUEST', request)
  },
  async getBrokerSummary ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<BrokerSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_BROKER', (response.data as DataResponse<BrokerSummary[]>).data[0])
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
  async getBrokerSummaryByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<BrokerSummary[]>('BrokersSummary', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_BROKER_SUMMARY', (response.data as DataResponse<BrokerSummary[]>).data[0])
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
