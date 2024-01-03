import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { LoadHistoryDetails } from '~/models/Broker/loadHistory/loadHistoryDetails'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    load: {} as LoadHistoryDetails
  },
  response: {
    load: {} as LoadHistoryDetails,
    loads: [] as LoadHistoryDetails[],
    brokerLoads: [] as LoadHistoryDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'LoadHistoryDetails'

export type LoadHistoryDetailsState = ReturnType<typeof state>

export const getters: GetterTree<LoadHistoryDetailsState, RootStoreState> = {
  loadBoardRequest: state => (state.request.load),
  load: state => (state.response.load),
  loads: state => (state.response.loads),
  brokerLoads: state => (state.response.brokerLoads),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<LoadHistoryDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_LOAD: (state, single: LoadHistoryDetails) => {
    if (single.id === undefined && state.response.loads.length < 12) {
      single.id = state.response.loads[state.response.loads.length - 1].id + 1
      state.response.loads.push(single)
    }
    console.log(single, state.response.loads)
  },
  FILL_LOAD_REQUEST: (state, request:LoadHistoryDetails) => (state.request.load = { ...state.request.load, ...request }),
  SET_BROKER_LOADS: (state, list:LoadHistoryDetails[]) => (state.response.brokerLoads = list),
  SET_LOAD: (state, single:LoadHistoryDetails) => (state.response.load = single),
  SET_LOADS: (state, list:LoadHistoryDetails[]) => (state.response.loads = list),
  REMOVE_LOAD: state => (state.response.load = {} as LoadHistoryDetails),
  UPDATE_LOAD: (state, single:LoadHistoryDetails) => {
    const itemIndex = state.response.loads.findIndex((item: LoadHistoryDetails) => item.id === single.id)
    state.response.loads[itemIndex] = single
  }
}

export const actions: ActionTree<LoadHistoryDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: LoadHistoryDetails) {
    commit('FILL_LOAD_REQUEST', request)
  },
  async addLoad ({ commit }, request:LoadHistoryDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<LoadHistoryDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_LOAD', request)
        } else {
          commit('ADD_LOAD', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_LOAD', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getLoadsByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<LoadHistoryDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_LOADS', (response.data as DataResponse<LoadHistoryDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<LoadHistoryDetails[]>).total_pages)
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
  async getLoad ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<LoadHistoryDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_LOAD', (response.data as DataResponse<LoadHistoryDetails[]>).data[0])
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
  async getLoads ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<LoadHistoryDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_LOADS', (response.data as DataResponse<LoadHistoryDetails[]>).data)
          } else {
            commit('SET_LOADS', [] as LoadHistoryDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<LoadHistoryDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_LOADS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateLoad ({ commit, getters }, request:LoadHistoryDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<LoadHistoryDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_LOAD', request)
          commit('SET_LOAD', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_LOAD', request)
      commit('SET_LOADS', getters.loads.map((item: LoadHistoryDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeLoad ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_LOAD')
          commit('SET_LOADS', getters.contracts.filter((item: LoadHistoryDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_LOAD', getters.loads.filter((item:LoadHistoryDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
