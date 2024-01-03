import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { BreakdownBrokerPaymentsDetail } from '~/models/accounting/breakdownBrokerPayments/breakdownBrokerPaymentsDetails'
import breakdownBrokerPaymentsDetail from '~/static/DummyData/Accounting/breakdownBrokerPending'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    breakdownBroker: {} as BreakdownBrokerPaymentsDetail
  },
  response: {
    breakdownBroker: {} as BreakdownBrokerPaymentsDetail,
    breakdownBrokers: [] as BreakdownBrokerPaymentsDetail[],
    carrierBreakdown: breakdownBrokerPaymentsDetail as BreakdownBrokerPaymentsDetail[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'BreakdownBrokerPendingPaymentsDetails'

export type BreakdownBrokerPaymentsDetailState = ReturnType<typeof state>

export const getters: GetterTree<BreakdownBrokerPaymentsDetailState, RootStoreState> = {
  breakdownBrokerRequest: state => (state.request.breakdownBroker),
  breakdownBroker: state => (state.response.breakdownBroker),
  breakdownBrokers: state => (state.response.breakdownBrokers),
  carrierBreakdown: state => (state.response.carrierBreakdown),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<BreakdownBrokerPaymentsDetailState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_BREAKDOWN_BROKER_REQUEST: (state, request:BreakdownBrokerPaymentsDetail) => (state.request.breakdownBroker = { ...state.request.breakdownBroker, ...request }),
  SET_CARRIER_BREAKDOWN: (state, list:BreakdownBrokerPaymentsDetail[]) => (state.response.carrierBreakdown = list),
  SET_BREAKDOWN_BROKER: (state, single:BreakdownBrokerPaymentsDetail) => (state.response.breakdownBroker = single),
  SET_BREAKDOWN_BROKERS: (state, list:BreakdownBrokerPaymentsDetail[]) => (state.response.breakdownBrokers = list),
  REMOVE_BREAKDOWN_BROKER: state => (state.response.breakdownBroker = {} as BreakdownBrokerPaymentsDetail)
}

export const actions: ActionTree<BreakdownBrokerPaymentsDetailState, RootStoreState> = {
  fillRequest ({ commit }, request: BreakdownBrokerPaymentsDetail) {
    commit('FILL_BREAKDOWN_BROKER_REQUEST', request)
  },
  async addBreakdownBroker ({ commit }, request:BreakdownBrokerPaymentsDetail) {
    commit('SET_LOADING', true)
    try {
      return await service.add<BreakdownBrokerPaymentsDetail, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_BREAKDOWN_BROKER', request)
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
  async getBreakdownBrokerByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<BreakdownBrokerPaymentsDetail[]>('breakDownBroker', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_BREAKDOWN', (response.data as DataResponse<BreakdownBrokerPaymentsDetail[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_BREAKDOWN', breakdownBrokerPaymentsDetail)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getBreakdownBroker ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<BreakdownBrokerPaymentsDetail[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_BREAKDOWN_BROKER', (response.data as DataResponse<BreakdownBrokerPaymentsDetail[]>).data[0])
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
  async getBreakdownBrokers ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await service.get<BreakdownBrokerPaymentsDetail[]>(endPoint, page_number).then((response) => {
        console.log('breakdown:', response)
        if (response.status === 200) {
          commit('SET_BREAKDOWN_BROKERS', (response.data as DataResponse<BreakdownBrokerPaymentsDetail[]>).data)
          commit('SET_PAGE', (response.data as DataResponse<BreakdownBrokerPaymentsDetail[]>).total_pages)
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
  async updateBreakdownBroker ({ commit, getters }, request:BreakdownBrokerPaymentsDetail) {
    commit('SET_LOADING', true)
    try {
      return await service.update<BreakdownBrokerPaymentsDetail, APIResponse>(endPoint, request.id ?? 0, request).then((response) => {
        if (response.status === 200) {
          commit('SET_BREAKDOWN_BROKER', request)
          commit('SET_BREAKDOWN_BROKERS', getters.breakdownBroker.map((item: BreakdownBrokerPaymentsDetail) => item.id === request.id ? request : item))
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
  async removeBreakdownBroker ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_BREAKDOWN_BROKER')
          commit('SET_BREAKDOWN_BROKERS', getters.breakdownBrokers.filter((item: BreakdownBrokerPaymentsDetail) => item.id !== id))
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
