import { GetterTree, ActionTree, MutationTree } from 'vuex'
// import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { Stop } from '~/models/stops'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    stop: {} as Stop
  },
  response: {
    stop: {} as Stop,
    stops: [] as Stop[],
    carrierStops: [] as Stop[]
  },
  page: 0,
  loading: false,
  error: '',
  addStep: {
    index: 0,
    title: '',
    subTitle: ''
  }
})

export interface SetStopRequest {
    stop?:null|Stop,
    step?:number,
    title?:string
}

const endPoint = 'StopsDetails'

export type StopState = ReturnType<typeof state>

export const getters: GetterTree<StopState, RootStoreState> = {
  stopRequest: state => (state.request),
  stop: state => (state.response.stop),
  stops: state => (state.response.stops),
  carrierStops: state => (state.response.carrierStops),
  step: state => (state.addStep),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<StopState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_STOP_REQUEST: (state, request:Stop) => (state.request.stop = { ...state.request.stop, ...request }),
  SET_STOP: (state, single:Stop) => (state.response.stop = single),
  SET_STOPS: (state, list:Stop[]) => (state.response.stops = list),
  REMOVE_STOP: state => (state.response.stop = {} as Stop),
  SET_CARRIER_STOPS: (state, list:Stop[]) => (state.response.carrierStops = list),
  ADD_STOP: (state, single:Stop) => {
    if (single.id === undefined) {
      if (state.response.carrierStops.length < 12) {
        single.id = state.response.carrierStops[state.response.carrierStops.length - 1].id + 1
        state.response.carrierStops.push(single)
      }
    }
  },
  UPDATE_STOP: (state, single:Stop) => {
    const itemIndex = state.response.stops.findIndex((item: Stop) => item.id === single.id)
    state.response.stops[itemIndex] = single
    const carrierItemIndex = state.response.carrierStops.findIndex((item: Stop) => item.id === single.id)
    state.response.carrierStops[carrierItemIndex] = single
  },
  SET_ADD_STOP (state, request:SetStopRequest) {
    if (request.stop) {
      state.request.stop = request.stop as Stop
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<StopState, RootStoreState> = {
  fillRequest ({ commit }, request: Stop) {
    commit('FILL_STOP_REQUEST', request)
  },
  setStop ({ commit }, request:SetStopRequest) {
    commit('SET_ADD_STOP', request)
  },
  async addStop ({ commit }, request:Stop) {
    commit('SET_LOADING', true)
    console.log('stop request', request)
    try {
      return await service.add<Stop, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_STOP', request)
        } else {
          commit('ADD_STOP', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateStop ({ commit, getters }, request:Stop) {
    commit('SET_LOADING', true)
    try {
      return await service.update<Stop, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_STOP', request)
          commit('SET_CARRIER_STOPS', getters.carrierStops.map((item: Stop) => item.id === request.id ? request : item))
          commit('SET_STOPS', getters.stops.map((item: Stop) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_STOP', request)
          commit('SET_STOPS', getters.stops.map((item: Stop) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_STOP', request)
      commit('SET_STOP', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200) // for test
    }
  },
  async getStop ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<Stop[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_STOP', (response.data as DataResponse<Stop[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.stop)
      commit('SET_STOP', getters.stops.filter((item: Stop) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getStopsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<Stop[]>('stops', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_STOPS', (response.data as DataResponse<Stop[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<Stop[]>).total_pages)
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
  async getStops ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<Stop[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_STOPS', (response.data as DataResponse<Stop[]>).data)
          } else {
            commit('SET_ERROR', [] as Stop[])
          }
          commit('SET_PAGE', (response.data as DataResponse<Stop[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_STOPS', [] as Stop[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeStop ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_STOP')
          commit('SET_STOPS', getters.stops.filter((item: Stop) => item.id !== id))
          commit('SET_CARRIER_STOPS', getters.carrierStops.filter((item: Stop) => item.id !== id))
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
