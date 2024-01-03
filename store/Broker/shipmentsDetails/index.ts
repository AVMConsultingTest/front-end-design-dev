import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { ShipmentsDetails } from '~/models/Broker/shipmentsDetails/shipmentsDetails'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    shipment: {} as ShipmentsDetails
  },
  response: {
    shipment: {} as ShipmentsDetails,
    shipments: [] as ShipmentsDetails[],
    brokerShipments: [] as ShipmentsDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'ShipmentsDetails'

export type ShipmentsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<ShipmentsDetailsState, RootStoreState> = {
  shipmentRequest: state => (state.request.shipment),
  shipment: state => (state.response.shipment),
  shipments: state => (state.response.shipments),
  brokerShipments: state => (state.response.brokerShipments),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ShipmentsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_SHIPMENT: (state, single: ShipmentsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.brokerShipments[state.response.brokerShipments.length - 1].id + 1
    }
    state.response.brokerShipments.push(single)
    console.log(single, state.response.brokerShipments)
  },
  FILL_SHIPMENT_REQUEST: (state, request:ShipmentsDetails) => (state.request.shipment = { ...state.request.shipment, ...request }),
  SET_BROKER_SHIPMENTS: (state, list:ShipmentsDetails[]) => (state.response.brokerShipments = list),
  SET_SHIPMENT: (state, single:ShipmentsDetails) => (state.response.shipment = single),
  SET_SHIPMENTS: (state, list:ShipmentsDetails[]) => (state.response.shipments = list),
  REMOVE_SHIPMENT: state => (state.response.shipment = {} as ShipmentsDetails),
  UPDATE_SHIPMENT: (state, single:ShipmentsDetails) => {
    const itemIndex = state.response.shipments.findIndex((item: ShipmentsDetails) => item.id === single.id)
    state.response.shipments[itemIndex] = single
    const carrierItemIndex = state.response.brokerShipments.findIndex((item: ShipmentsDetails) => item.id === single.id)
    state.response.brokerShipments[carrierItemIndex] = single
  }
}

export const actions: ActionTree<ShipmentsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: ShipmentsDetails) {
    commit('FILL_SHIPMENT_REQUEST', request)
  },
  async addShipment ({ commit }, request:ShipmentsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ShipmentsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_SHIPMENT', request)
        } else {
          commit('ADD_SHIPMENT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_SHIPMENT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getShipmentsByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ShipmentsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_SHIPMENTS', (response.data as DataResponse<ShipmentsDetails[]>).data)
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
  async getShipment ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ShipmentsDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_SHIPMENT', (response.data as DataResponse<ShipmentsDetails[]>).data[0])
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
  async getShipments ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ShipmentsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_SHIPMENTS', (response.data as DataResponse<ShipmentsDetails[]>).data)
          } else {
            commit('SET_SHIPMENTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<ShipmentsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_SHIPMENTS', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateShipment ({ commit, getters }, request:ShipmentsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ShipmentsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_SHIPMENT', request)
          commit('SET_SHIPMENT', getters.shipments.map((item: ShipmentsDetails) => item.id === request.id ? request : item))
          commit('SET_BROKER_SHIPMENTS', getters.brokerShipments.map((item: ShipmentsDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_SHIPMENT', request)
      commit('SET_SHIPMENTS', getters.shipments.map((item: ShipmentsDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeShipment ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_SHIPMENT')
          commit('SET_SHIPMENTS', getters.shipments.filter((item: ShipmentsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_SHIPMENTS', getters.shipments.filter((item:ShipmentsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
