import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { BrokersDetails } from '~/models/DISPATCH/brokers/brokersDetails'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    broker: {} as BrokersDetails
  },
  response: {
    broker: {} as BrokersDetails,
    brokers: [] as BrokersDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'BrokersDetails'

export type BrokersDetailsState = ReturnType<typeof state>

export const getters: GetterTree<BrokersDetailsState, RootStoreState> = {
  brokerRequest: state => (state.request.broker),
  broker: state => (state.request.broker),
  brokers: state => (state.response.brokers),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<BrokersDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_BROKER_REQUEST: (state, request:BrokersDetails) => (state.request.broker = { ...state.request.broker, ...request }),
  SET_BROKER: (state, single:BrokersDetails) => (state.response.broker = single),
  SET_BROKERS: (state, list:BrokersDetails[]) => (state.response.brokers = list),
  REMOVE_BROKER: state => (state.response.broker = {} as BrokersDetails)
}

export const actions: ActionTree<BrokersDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: BrokersDetails) {
    commit('FILL_BROKER_REQUEST', request)
  },
  async addBroker ({ commit }, request:BrokersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<BrokersDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_BROKER', request)
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
  async getBroker ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<BrokersDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_BROKER', (response.data as DataResponse<BrokersDetails[]>).data[0])
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
  async getBrokers ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<BrokersDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_BROKERS', (response.data as DataResponse<BrokersDetails[]>).data)
          } else {
            commit('SET_BROKERS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<BrokersDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_BROKERS', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateBroker ({ commit, getters }, request:BrokersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<BrokersDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_BROKER', request)
          commit('SET_BROKERS', getters.brokers.map((item: BrokersDetails) => item.id === request.id ? request : item))
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
  async removeBroker ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_BROKER')
          commit('SET_BROKERS', getters.brokers.filter((item: BrokersDetails) => item.id !== id))
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
