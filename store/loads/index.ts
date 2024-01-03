import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { LoadDetails } from '~/models/DISPATCH/load/loadDetails'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'
import loads from '~/static/loads'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    load: {} as LoadDetails
  },
  response: {
    load: {} as LoadDetails,
    loads: loads as LoadDetails[],
    carrierLoads: [] as LoadDetails[]

  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/loads'

export type LoadDetailsState = ReturnType<typeof state>

export const getters: GetterTree<LoadDetailsState, RootStoreState> = {
  loadRequest: state => (state.request.load),
  load: state => (state.response.load),
  loads: state => (state.response.loads),
  pageCount: state => (state.page),
  carrierLoads: state => (state.response.carrierLoads)

}

export const mutations: MutationTree<LoadDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_LOAD_REQUEST: (state, request:LoadDetails) => (state.request.load = { ...state.request.load, ...request }),
  SET_LOAD: (state, single:LoadDetails) => (state.response.load = single),
  SET_LOADS: (state, list:LoadDetails[]) => (state.response.loads = list),
  REMOVE_LOAD: state => (state.response.load = {} as LoadDetails),
  SET_CARRIER_LOADS: (state, list:LoadDetails[]) => (state.response.carrierLoads = list),
  ADD_LOAD: (state, single:LoadDetails) => {
    if (single.id === undefined) {
      single.id = state.response.loads[state.response.loads.length - 1].id + 1
    }
    state.response.loads.push(single)
  },
  UPDATE_LOAD: (state, single:LoadDetails) => {
    const itemIndex = state.response.loads.findIndex((item: LoadDetails) => item.id === single.id)
    state.response.loads[itemIndex] = single
  }
}

export const actions:ActionTree<LoadDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: LoadDetails) {
    commit('FILL_LOAD_REQUEST', request)
  },
  async addLoad ({ commit }, request:LoadDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<LoadDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_LOAD', request)
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
  async getLoad ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<LoadDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_LOAD', (response.data as DataResponse<LoadDetails>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('store:', getters.loads.find((item: LoadDetails) => item.id === id))
      commit('SET_LOAD', getters.loads.find((item: LoadDetails) => item.id === id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getLoads ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<LoadDetails>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_LOADS', (response.data as DataResponse<LoadDetails>))
          } else {
            commit('SET_LOADS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<LoadDetails>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
          commit('SET_LOADS', loads)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_LOADS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getLoadsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<LoadDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_LOADS', (response.data as DataResponse<LoadDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<LoadDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_LOADS', loads)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateLoad ({ commit, getters }, request:LoadDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<LoadDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_LOAD', request)
          commit('SET_LOADS', getters.loads.map((item: LoadDetails) => item.id === request.id ? request : item))
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
  async removeLoad ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_LOAD')
          commit('SET_LOADS', getters.loads.filter((item: LoadDetails) => item.id !== id))
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
