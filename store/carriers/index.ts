import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { CarriersDetails } from '~/models/carriers/carriersDetails'
import ApiService from '~/services/baseService'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    carrier: {} as CarriersDetails
  },
  response: {
    carrier: {} as CarriersDetails,
    carriers: [] as CarriersDetails[],
    carrierCarriers: [] as CarriersDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'companies/onboarding'

export type CarriersDetailsState = ReturnType<typeof state>

export const getters: GetterTree<CarriersDetailsState, RootStoreState> = {
  carrierRequest: state => (state.request.carrier),
  carrier: state => (state.response.carrier),
  carriers: state => (state.response.carriers),
  carrierCarriers: state => (state.response.carrierCarriers),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<CarriersDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_CARRIER_REQUEST: (state, request:CarriersDetails) => (state.request.carrier = { ...state.request.carrier, ...request }),
  SET_CARRIER: (state, single:CarriersDetails) => (state.response.carrier = single),
  SET_CARRIERS: (state, list:CarriersDetails[]) => (state.response.carriers = list),
  SET_CARRIER_CARRIERS: (state, list:CarriersDetails[]) => (state.response.carrierCarriers = list),
  REMOVE_CARRIER: state => (state.response.carrier = {} as CarriersDetails)
}

export const actions:ActionTree<CarriersDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: CarriersDetails) {
    commit('FILL_CARRIER_REQUEST', request)
  },
  async addCarrier ({ commit }, request:CarriersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<CarriersDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_CARRIER', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
        console.log(response)

        return response
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCarrier ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<CarriersDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          console.log('data:', (response.data as DataResponse<CarriersDetails[]>).data[0])
          commit('SET_CARRIER', response.data)
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
  async getCarriersByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<CarriersDetails[]>('carriers', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_CARRIERS', (response.data as DataResponse<CarriersDetails[]>).data)
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
  async getCarriers ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<CarriersDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_CARRIERS', (response.data as DataResponse<CarriersDetails[]>).data)
          } else {
            commit('SET_CARRIERS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<CarriersDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_CARRIERS', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateCarrier ({ commit }, request:CarriersDetails) {
    commit('SET_CARRIERS_DETAILS', true)
    try {
      return await service.update<CarriersDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_CARRIER', request)
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
  async removeCarrier ({ commit }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_CARRIER')
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
