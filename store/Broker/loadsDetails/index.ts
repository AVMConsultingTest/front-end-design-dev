import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { LoadsDetails } from '~/models/Broker/loadsDetails/loadsDetails'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    load: {} as LoadsDetails
  },
  response: {
    load: {} as LoadsDetails,
    loads: [] as LoadsDetails[],
    brokerLoads: [] as LoadsDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'LoadsDetails'

export type LoadsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<LoadsDetailsState, RootStoreState> = {
  loadRequest: state => (state.request.load),
  load: state => (state.response.load),
  loads: state => (state.response.loads),
  brokerLoads: state => (state.response.brokerLoads),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<LoadsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_LOAD: (state, single: LoadsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.brokerLoads[state.response.brokerLoads.length - 1].id + 1
    }
    state.response.brokerLoads.push(single)
    console.log(single, state.response.brokerLoads)
  },
  FILL_LOAD_REQUEST: (state, request:LoadsDetails) => (state.request.load = { ...state.request.load, ...request }),
  SET_BROKER_LOADS: (state, list:LoadsDetails[]) => (state.response.brokerLoads = list),
  SET_LOAD: (state, single:LoadsDetails) => (state.response.load = single),
  SET_LOADS: (state, list:LoadsDetails[]) => (state.response.loads = list),
  REMOVE_LOAD: state => (state.response.load = {} as LoadsDetails),
  UPDATE_LOAD: (state, single:LoadsDetails) => {
    const itemIndex = state.response.loads.findIndex((item: LoadsDetails) => item.id === single.id)
    state.response.loads[itemIndex] = single
  }
}

export const actions: ActionTree<LoadsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: LoadsDetails) {
    commit('FILL_LOAD_REQUEST', request)
  },
  async addLoad ({ commit }, request:LoadsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<LoadsDetails, APIResponse>(endPoint, request).then((response) => {
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
        .get<LoadsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_LOADS', (response.data as DataResponse<LoadsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<LoadsDetails[]>).total_pages)
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
      return await service.single<LoadsDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_LOAD', (response.data as DataResponse<LoadsDetails[]>).data[0])
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
      return await service.get<LoadsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_LOADS', (response.data as DataResponse<LoadsDetails[]>).data)
          } else {
            commit('SET_LOADS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<LoadsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_LOADS', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateLoad ({ commit, getters }, request:LoadsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<LoadsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_LOAD', request)
          commit('SET_LOADS', getters.loads.map((item: LoadsDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_LOAD', request)
      commit('SET_LOADS', getters.loads.map((item: LoadsDetails) => item.id === request.id ? request : item))
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
          commit('SET_LOADS', getters.loads.filter((item: LoadsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_LOADS', getters.loads.filter((item:LoadsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
