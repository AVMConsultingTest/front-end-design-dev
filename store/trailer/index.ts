import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { Trailer } from '~/models/trailer/trailer'
import ApiService from '~/services/baseService'
import trailer from '~/static/DummyData/Safety/trailers'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    trailer: {} as Trailer
  },
  response: {
    trailer: {} as Trailer,
    trailers: trailer as Trailer[],
    carrierTrailers: [] as Trailer[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/trailers'

export type TrailerState = ReturnType<typeof state>

export const getters: GetterTree<TrailerState, RootStoreState> = {
  trailerRequest: state => (state.request.trailer),
  trailer: state => (state.response.trailer),
  trailers: state => (state.response.trailers),
  carrierTrailers: state => (state.response.carrierTrailers),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<TrailerState> = {
  SET_LOADING: (state, loading: boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_TRAILER_REQUEST: (state, model:Trailer) => (state.request.trailer = { ...state.request.trailer, ...model }),
  SET_TRAILER: (state, single:Trailer) => (state.response.trailer = { ...single, trailer_id: single?.id }),
  SET_TRAILERS: (state, list:Trailer[]) => (state.response.trailers = list.map((item:Trailer) => ({ ...item, trailer_id: item?.id }))),
  SET_CARRIER_TRAILERS: (state, list:Trailer[]) => (state.response.carrierTrailers = list),
  REMOVE_TRAILER: state => (state.response.trailer = {} as Trailer),
  // ADD_TRAILER: (state, single:Trailer) => {
  //   console.log('add trailer', single, state.response.trailers)
  //   if (single.id === undefined) {
  //     single.id = state.response.trailers[state.response.trailers.length - 1].id + 1
  //   }
  //   console.log('add trailer > update id', trailer)
  //   // state.response.trailers.push(trailer as Trailer)
  //   // console.log('updated state', state.response.trailers)
  // },
  UPDATE_TRAILER: (state, single:Trailer) => {
    const itemIndex = state.response.trailers.findIndex((item: Trailer) => item.id === single.id)
    state.response.trailers[itemIndex] = single
  }
}

export const actions: ActionTree<TrailerState, RootStoreState> = {
  fillRequest ({ commit }, request: Trailer) {
    commit('FILL_TRAILER_REQUEST', request)
  },
  async updateTrailer ({ commit, dispatch }, request:Trailer) {
    const trailer = { ...request }
    delete trailer.carrier_id
    delete trailer.truck_id
    delete trailer.trailer_id
    commit('SET_LOADING', true)
    try {
      await service.update<Trailer, APIResponse>(endPoint, trailer.id, trailer).then((response) => {
        if (response.status === 200) {
          dispatch('getTrailer', trailer.id)
        } else {
          commit('UPDATE_TRAILER', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_TRAILER', request)
      commit('SET_TRAILER', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async addTrailer ({ commit, dispatch }, request:Trailer) {
    commit('SET_LOADING', true)
    try {
      return await service.add<Trailer, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 201) {
          // commit('ADD_TRAILER', {
          //   ...request,
          //   trailer_id: (response.data as any).trailerId,
          //   carrier_id: rootGetters.carrierId
          // })
          dispatch('getTrailers', { page_number: 1 })
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      // commit('ADD_TRAILER', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTrailer ({ commit }, id: number | string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<Trailer[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_TRAILER', response.data)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_TRAILER', trailer.find((item: Trailer) => item.id === id))
    } finally {
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 200)
    }
  },
  async getTrailersByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<Trailer[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_TRAILERS', (response.data as DataResponse<Trailer[]>).data)
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
  async getTrailers ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      await service.get<Trailer[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if (((response.data as DataResponse<APIResponse>).data as any).length > 0) {
            commit('SET_TRAILERS', ((response.data as DataResponse<APIResponse>).data as any))
          } else {
            commit('SET_TRAILERS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<Trailer[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
      // // hitting the api again to get all the records for dropdown
      // await dispatch('truck/getAllTrucks', null, { root: true })
    } catch (error) {
      commit('SET_TRAILERS', [...trailer])
      commit('SET_ERROR', error)
      // commit('SET_TRAILERS', [])
    } finally {
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 200)
    }
  },
  async removeTrailer ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_TRAILER')
          commit('SET_TRAILERS', getters.trailers.filter((item: Trailer) => item.id !== id))
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
