import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { CarriersDetails } from '~/models/Broker/carriersDetails/carriersDetails'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    carrier: {} as CarriersDetails
  },
  response: {
    carrier: {} as CarriersDetails,
    carriers: [] as CarriersDetails[],
    brokerCarriers: [] as CarriersDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'CarriersDetails'

export type CarriersDetailsState = ReturnType<typeof state>

export const getters: GetterTree<CarriersDetailsState, RootStoreState> = {
  carrierRequest: state => (state.request.carrier),
  carrier: state => (state.response.carrier),
  carriers: state => (state.response.carriers),
  brokerCarriers: state => (state.response.brokerCarriers),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<CarriersDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_CARRIER: (state, single: CarriersDetails) => {
    if (single.id === undefined) {
      single.id = state.response.brokerCarriers[state.response.brokerCarriers.length - 1].id + 1
    }
    state.response.brokerCarriers.push(single)
    console.log(single, state.response.brokerCarriers)
  },
  FILL_CARRIER_REQUEST: (state, request:CarriersDetails) => (state.request.carrier = { ...state.request.carrier, ...request }),
  SET_BROKER_CARRIERS: (state, list:CarriersDetails[]) => (state.response.brokerCarriers = list),
  SET_CARRIER: (state, single:CarriersDetails) => (state.response.carrier = single),
  SET_CARRIERS: (state, list:CarriersDetails[]) => (state.response.carriers = list),
  REMOVE_CARRIER: state => (state.response.carrier = {} as CarriersDetails),
  UPDATE_CARRIER: (state, single:CarriersDetails) => {
    const itemIndex = state.response.carriers.findIndex((item: CarriersDetails) => item.id === single.id)
    state.response.carriers[itemIndex] = single
    const carrierItemIndex = state.response.brokerCarriers.findIndex((item: CarriersDetails) => item.id === single.id)
    state.response.brokerCarriers[carrierItemIndex] = single
  }
}

export const actions: ActionTree<CarriersDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: CarriersDetails) {
    commit('FILL_CARRIER_REQUEST', request)
  },
  async addCarrier ({ commit }, request:CarriersDetails) {
    commit('SET_LOADING', true)
    try {
      request.active_insurance = request.active_insurance === 1
      return await service.add<CarriersDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_CARRIER', request)
        } else {
          commit('ADD_CARRIER', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_CARRIER', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCarriersByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<CarriersDetails[]>('CarriersDetails', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_CARRIERS', (response.data as DataResponse<CarriersDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<CarriersDetails[]>).total_pages)
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
  async getCarrier ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<CarriersDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_CARRIER', (response.data as DataResponse<CarriersDetails[]>).data[0])
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
  async updateCarrier ({ commit, getters }, request:CarriersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<CarriersDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_CARRIER', request)
          commit('SET_CARRIERS', request)
          commit('SET_BROKER_CARRIERS', getters.brokerCarriers.map((item: CarriersDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_CARRIER', request)
      commit('SET_CARRIERS', getters.carriers.map((item: CarriersDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeCarrier ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_CARRIER')
          commit('SET_CARRIERS', getters.carriers.filter((item: CarriersDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CARRIERS', getters.carriers.filter((item:CarriersDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
