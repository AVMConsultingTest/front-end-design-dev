import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { ServicesDetails } from '~/models/services/servicesDetails'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'
import services from '~/static/DummyData/Safety/services'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    service: {} as ServicesDetails
  },
  response: {
    service: {} as ServicesDetails,
    services: services as ServicesDetails[],
    carrierServices: [] as ServicesDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

let index = 3

export const endPoint = 'carrier/services'

export type ServicesDetailsState = ReturnType<typeof state>

export const getters: GetterTree<ServicesDetailsState, RootStoreState> = {
  serviceRequest: state => (state.request.service),
  service: state => (state.response.service),
  services: state => (state.response.services),
  carrierServices: state => (state.response.carrierServices),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ServicesDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_SERVICE_REQUEST: (state, request:ServicesDetails) => (state.request.service = { ...state.request.service, ...request }),
  SET_SERVICE: (state, single:ServicesDetails) => (state.response.service = single),
  SET_SERVICES: (state, list:ServicesDetails[]) => (state.response.services = list),
  SET_CARRIER_SERVICES: (state, list:ServicesDetails[]) => (state.response.carrierServices = list),
  REMOVE_SERVICE: (state, id) => {
    state.response.services = state.response.services.filter(w => w.id !== id)
  },
  ADD_SERVICE: (state, single:ServicesDetails) => {
    if (single.id === undefined) {
      single.id = state.response.services[state.response.services.length - 1].id + 1
    }
    state.response.services.push(single)
  },
  UPDATE_SERVICE: (state, single:ServicesDetails) => {
    const itemIndex = state.response.services.findIndex((item: ServicesDetails) => item.id === single.id)
    state.response.services[itemIndex] = single
  }
}

export const actions:ActionTree<ServicesDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: ServicesDetails) {
    commit('FILL_SERVICE_REQUEST', request)
  },
  async addService ({ commit }, request:ServicesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ServicesDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_SERVICE', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_SERVICE', { ...request, id: index++ })
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getService ({ commit }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ServicesDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_SERVICE', (response.data as DataResponse<ServicesDetails>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_SERVICE', services.find((item:ServicesDetails) => item.id === id))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getServicesByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ServicesDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_SERVICES', (response.data as DataResponse<ServicesDetails[]>).data)
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
  async getServices ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ServicesDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_SERVICES', (response.data as DataResponse<ServicesDetails[]>).data)
          } else {
            commit('SET_SERVICES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<ServicesDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_SERVICES', services)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateService ({ commit, getters }, request:ServicesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ServicesDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_SERVICE', request)
          commit('SET_SERVICES', getters.services.map((item: ServicesDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_SERVICE', request)
      commit('SET_SERVICES', getters.services.map((item: ServicesDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeService ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_SERVICE', id)
          commit('SET_SERVICES', getters.services.filter((item: ServicesDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('REMOVE_SERVICE', id)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
