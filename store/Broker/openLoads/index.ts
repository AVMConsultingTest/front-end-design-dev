import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { OpenLoadsDetails } from '~/models/Broker/openLoads/openLoadsDetails'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    openLoad: {} as OpenLoadsDetails
  },
  response: {
    openLoad: {} as OpenLoadsDetails,
    openLoads: [] as OpenLoadsDetails[],
    brokerOpenLoads: [] as OpenLoadsDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'OpenLoadsDetails'

export type OpenLoadsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<OpenLoadsDetailsState, RootStoreState> = {
  openLoadRequest: state => (state.request.openLoad),
  openLoad: state => (state.response.openLoad),
  openLoads: state => (state.response.openLoads),
  brokerOpenLoads: state => (state.response.brokerOpenLoads),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<OpenLoadsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_OPEN_LOAD: (state, single: OpenLoadsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.openLoads[state.response.openLoads.length - 1].id + 1
    }
    state.response.openLoads.push(single)
    console.log(single, state.response.openLoads)
  },
  FILL_OPEN_LOAD_REQUEST: (state, request:OpenLoadsDetails) => (state.request.openLoad = { ...state.request.openLoad, ...request }),
  SET_BROKER_OPEN_LOADS: (state, list:OpenLoadsDetails[]) => (state.response.brokerOpenLoads = list),
  SET_OPEN_LOAD: (state, single:OpenLoadsDetails) => (state.response.openLoad = single),
  SET_OPEN_LOADS: (state, list:OpenLoadsDetails[]) => (state.response.openLoads = list),
  REMOVE_OPEN_LOAD: state => (state.response.openLoad = {} as OpenLoadsDetails),
  UPDATE_OPEN_LOAD: (state, single:OpenLoadsDetails) => {
    const itemIndex = state.response.openLoads.findIndex((item: OpenLoadsDetails) => item.id === single.id)
    state.response.openLoads[itemIndex] = single
  }
}

export const actions: ActionTree<OpenLoadsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: OpenLoadsDetails) {
    commit('FILL_OPEN_LOAD_REQUEST', request)
  },
  async addOpenLoad ({ commit }, request:OpenLoadsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<OpenLoadsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_OPEN_LOAD', request)
        } else {
          commit('ADD_OPEN_LOAD', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_OPEN_LOAD', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getOpenLoadsByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<OpenLoadsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_OPEN_LOADS', (response.data as DataResponse<OpenLoadsDetails[]>).data)
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
  async getOpenLoad ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<OpenLoadsDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_OPEN_LOAD', (response.data as DataResponse<OpenLoadsDetails[]>).data[0])
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
  async getOpenLoads ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<OpenLoadsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_OPEN_LOADS', (response.data as DataResponse<OpenLoadsDetails[]>).data)
          } else {
            commit('SET_OPEN_LOADS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<OpenLoadsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_OPEN_LOADS', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateOpenLoad ({ commit, getters }, request:OpenLoadsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<OpenLoadsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_OPEN_LOAD', request)
          commit('SET_OPEN_LOADS', getters.openLoads.map((item: OpenLoadsDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_OPEN_LOAD', request)
      commit('SET_OPEN_LOADS', getters.openLoads.map((item: OpenLoadsDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeOpenLoad ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_OPEN_LOAD')
          commit('SET_OPEN_LOADS', getters.openLoads.filter((item: OpenLoadsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_OPEN_LOADS', getters.openLoads.filter((item:OpenLoadsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
