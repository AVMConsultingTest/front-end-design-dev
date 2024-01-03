import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { DispatchSummary } from '~/models/DISPATCH/dispatch/dispatchSummary'
import dispatchSummary from '~/static/DummyData/Dispatch/dispatchSummary'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    dispatch: {} as DispatchSummary
  },
  response: {
    dispatch: {} as DispatchSummary,
    dispatches: [] as DispatchSummary[],
    carrierDispatch: [] as DispatchSummary,
    carrierDispatchSummary: dispatchSummary[0] as DispatchSummary
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = '/DispatchSummary'

export type DispatchSummaryState = ReturnType<typeof state>

export const getters: GetterTree<DispatchSummaryState, RootStoreState> = {
  dispatchRequest: state => (state.request.dispatch),
  dispatch: state => (state.response.dispatch),
  dispatches: state => (state.response.dispatches),
  carrierDispatch: state => (state.response.carrierDispatch),
  carrierDispatchSummary: state => (state.response.carrierDispatchSummary),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<DispatchSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_DISPATCH_REQUEST: (state, request:DispatchSummary) => (state.request.dispatch = { ...state.request.dispatch, ...request }),
  SET_DISPATCH: (state, single:DispatchSummary) => (state.response.dispatch = single),
  SET_DISPATCHES: (state, list:DispatchSummary[]) => (state.response.dispatches = list),
  SET_CARRIER_DISPATCHES: (state, list:DispatchSummary[]) => (state.response.carrierDispatch = list),
  SET_CARRIER_DISPATCH_SUMMARY: (state, single:DispatchSummary) => (state.response.carrierDispatchSummary = single),
  REMOVE_DISPATCH: state => (state.response.dispatch = {} as DispatchSummary)
}

export const actions: ActionTree<DispatchSummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: DispatchSummary) {
    commit('FILL_DISPATCH_REQUEST', request)
  },
  async addDispatch ({ commit }, request:DispatchSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<DispatchSummary, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_DISPATCH', request)
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
  async getDispatchByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<DispatchSummary[]>(endPoint + '/Carriers', (payload.id as number), payload.page_number, 100, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_DISPATCHES', (response.data as DataResponse<DispatchSummary[]>).data)
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
  async getDispatchSummaryByCarrierId ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<DispatchSummary[]>(endPoint + '/Carriers', id).then((response) => {
        if (response.status === 200) {
          commit('SET_CARRIER_DISPATCH_SUMMARY', (response.data as DataResponse<DispatchSummary[]>).data[0])
          console.log(response.data)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_CARRIER_DISPATCH_SUMMARY', dispatchSummary[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDispatch ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<DispatchSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_DISPATCH', (response.data as DataResponse<DispatchSummary[]>).data[0])
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
  async getDispatches ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<DispatchSummary[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_DISPATCHES', (response.data as DataResponse<DispatchSummary[]>).data)
          } else {
            commit('SET_DISPATCHES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<DispatchSummary[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_DISPATCHES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateDispatch ({ commit, getters }, request:DispatchSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<DispatchSummary, APIResponse>(endPoint, request.id ?? 0, request).then((response) => {
        if (response.status === 200) {
          commit('SET_DISPATCH', request)
          commit('SET_DISPATCHES', getters.dispatches.map((item: DispatchSummary) => item.id === request.id ? request : item))
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
  async removeDispatch ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_DISPATCH')
          commit('SET_DISPATCHES', getters.dispatches.filter((item: DispatchSummary) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING, false') }, 200)
    }
  }
}
