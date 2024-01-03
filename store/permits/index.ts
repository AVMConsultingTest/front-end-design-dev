import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { PermitsDetails } from '~/models/permits/permitsDetails'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'
import permit from '~/static/DummyData/Safety/permits'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    permit: {} as PermitsDetails
  },
  response: {
    permit: {} as PermitsDetails,
    permits: permit as PermitsDetails[],
    carrierPermits: [] as PermitsDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

let index = 3

export const endPoint = 'carrier/permits'

export type PermitsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<PermitsDetailsState, RootStoreState> = {
  permitRequest: state => (state.request.permit),
  permit: state => (state.response.permit),
  permits: state => (state.response.permits),
  carrierPermits: state => (state.response.carrierPermits),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<PermitsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_PERMIT_REQUEST: (state, request:PermitsDetails) => (state.request.permit = { ...state.request.permit, ...request }),
  SET_PERMIT: (state, single:PermitsDetails) => (state.response.permit = single),
  SET_PERMITS: (state, list:PermitsDetails[]) => (state.response.permits = list),
  SET_CARRIER_PERMITS: (state, list:PermitsDetails[]) => (state.response.carrierPermits = list),
  REMOVE_PERMIT: state => (state.response.permit = {} as PermitsDetails),
  ADD_PERMIT: (state, single:PermitsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.permits[state.response.permits.length - 1].id + 1
    }
    state.response.permits.push(single)
  },
  UPDATE_PERMIT: (state, single:PermitsDetails) => {
    const itemIndex = state.response.permits.findIndex((item: PermitsDetails) => item.id === single.id)
    state.response.permits[itemIndex] = single
    const carrierItemIndex = state.response.carrierPermits.findIndex((item: PermitsDetails) => item.id === single.id)
    state.response.carrierPermits[carrierItemIndex] = single
  }
}

export const actions:ActionTree<PermitsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: PermitsDetails) {
    commit('FILL_PERMIT_REQUEST', request)
  },
  async addPermit ({ commit }, request:PermitsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<PermitsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_PERMIT', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_PERMIT', { ...request, id: index++ })
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getPermit ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<PermitsDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_PERMIT', (response.data as DataResponse<PermitsDetails>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_PERMIT', permit.find((item: PermitsDetails) => item.id === id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getPermitsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<PermitsDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_PERMITS', (response.data as DataResponse<PermitsDetails[]>).data)
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
  async getPermits ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<PermitsDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_PERMITS', (response.data as DataResponse<PermitsDetails[]>).data)
          } else {
            commit('SET_PERMITS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<PermitsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_PERMITS', permit)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updatePermit ({ commit, getters }, request:PermitsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<PermitsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_PERMIT', request)
          commit('SET_CARRIER_PERMITS', getters.carrierPermits.map((item: PermitsDetails) => item.id === request.id ? request : item))
          commit('SET_PERMITS', getters.permits.map((item: PermitsDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_PERMIT', request)
          commit('SET_CARRIER_PERMITS', getters.carrierPermits.map((item: PermitsDetails) => item.id === request.id ? request : item))
          commit('SET_PERMITS', getters.permits.map((item: PermitsDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_PERMIT', request)
      commit('SET_CARRIER_PERMITS', getters.carrierPermits.map((item: PermitsDetails) => item.id === request.id ? request : item))
      commit('SET_PERMITS', getters.permits.map((item: PermitsDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removePermit ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_PERMIT')
          commit('SET_PERMITS', getters.permits.filter((item: PermitsDetails) => item.id !== id))
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
