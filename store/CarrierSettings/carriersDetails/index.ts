import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { CarriersDetails } from '~/models/CarrierSettings/carriersDetails/carriersDetails'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService('/carrier_settings_api')

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
  error: '',
  addStep: {
    index: 0,
    title: '',
    subTitle: ''
  }
})

export interface SetCarrierRequest {
    carrier?:null|CarriersDetails,
    step?:number,
    title?:string
}

const endPoint = '/CarriersDetails'

export type CarrierState = ReturnType<typeof state>

export const getters: GetterTree<CarrierState, RootStoreState> = {
  carrierRequest: state => (state.request),
  carrier: state => (state.response.carrier),
  carriers: state => (state.response.carriers),
  carrierCarriers: state => (state.response.carrierCarriers),
  step: state => (state.addStep),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<CarrierState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_CARRIER_REQUEST: (state, request:CarriersDetails) => (state.request.carrier = { ...state.request.carrier, ...request }),
  SET_CARRIER: (state, single:CarriersDetails) => (state.response.carrier = single),
  SET_CARRIERS: (state, list:CarriersDetails[]) => (state.response.carriers = list),
  REMOVE_CARRIER: state => (state.response.carrier = {} as CarriersDetails),
  SET_CARRIER_CARRIERS: (state, list:CarriersDetails[]) => (state.response.carrierCarriers = list),
  ADD_CARRIER: (state, single:CarriersDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierCarriers.length < 12) {
        single.id = state.response.carrierCarriers[state.response.carrierCarriers.length - 1].id + 1
        state.response.carrierCarriers.push(single)
      }
    }
  },
  UPDATE_CARRIER: (state, single:CarriersDetails) => {
    const itemIndex = state.response.carriers.findIndex((item: CarriersDetails) => item.id === single.id)
    state.response.carriers[itemIndex] = single
    const carrierItemIndex = state.response.carrierCarriers.findIndex((item: CarriersDetails) => item.id === single.id)
    state.response.carrierCarriers[carrierItemIndex] = single
  },
  SET_ADD_CARRIER (state, request:SetCarrierRequest) {
    if (request.carrier) {
      state.request.carrier = request.carrier as CarriersDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<CarrierState, RootStoreState> = {
  fillRequest ({ commit }, request: CarriersDetails) {
    commit('FILL_CARRIER_REQUEST', request)
  },
  setCarrier ({ commit }, request:SetCarrierRequest) {
    commit('SET_ADD_CARRIER', request)
  },
  async addCarrier ({ commit }, request:CarriersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<CarriersDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_CARRIER', request)
        } else {
          commit('ADD_CARRIER', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
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
          commit('SET_CARRIER_CARRIERS', getters.carrierCarriers.map((item: CarriersDetails) => item.id === request.id ? request : item))
          commit('SET_CARRIERS', getters.carriers.map((item: CarriersDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_CARRIER', request)
          commit('SET_CARRIERS', getters.carriers.map((item: CarriersDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_CARRIER', request)
      commit('SET_CARRIER', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCarrier ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<CarriersDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_CARRIER', (response.data as DataResponse<CarriersDetails[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.carrier)
      commit('SET_CARRIER', getters.carriers.filter((item: CarriersDetails) => item.id === id)[0])
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
            commit('SET_ERROR', [] as CarriersDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<CarriersDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CARRIERS', [] as CarriersDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCarrierByCarrierId ({ commit, rootState }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<CarriersDetails[]>(endPoint + '/Carriers', rootState.carrierId, payload.page_number, undefined, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_CARRIERS', (response.data as DataResponse<CarriersDetails[]>).data)
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
  async removeCarrier ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_CARRIER')
          commit('SET_CARRIERS', getters.carriers.filter((item: CarriersDetails) => item.id !== id))
          commit('SET_CARRIER_CARRIERS', getters.carrierCarriers.filter((item: CarriersDetails) => item.id !== id))
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
