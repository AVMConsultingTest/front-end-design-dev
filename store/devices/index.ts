import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { DevicesDetails, DeviceUpdateRequest } from '~/models/devices/devicesDetails'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'
import device from '~/static/DummyData/Safety/devices'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    device: {} as DevicesDetails
  },
  response: {
    device: {} as DevicesDetails,
    devices: device as DevicesDetails[],
    carrierDevices: [] as DevicesDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

let index = 3

export const endPoint = 'carrier/devices'

export type DevicesDetailsState = ReturnType<typeof state>

export const getters: GetterTree<DevicesDetailsState, RootStoreState> = {
  deviceRequest: state => (state.request.device),
  device: state => (state.response.device),
  devices: state => (state.response.devices),
  carrierDevices: state => (state.response.carrierDevices),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<DevicesDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_DEVICE_REQUEST: (state, request:DevicesDetails) => (state.request.device = { ...state.request.device, ...request }),
  SET_DEVICE: (state, single:DevicesDetails) => (state.response.device = single),
  SET_CARRIER_DEVICES: (state, list:DevicesDetails[]) => (state.response.carrierDevices = list),
  ADD_DEVICE: (state, single:DevicesDetails) => (state.response.devices.push(single)),
  UPDATE_DEVICE: (state, single:DevicesDetails) => {
    const itemIndex = state.response.devices.findIndex((item: DevicesDetails) => item.id === single.id)
    state.response.devices[itemIndex] = single
  },
  SET_DEVICES: (state, list:DevicesDetails[]) => (state.response.devices = list),
  REMOVE_DEVICE: state => (state.response.device = {} as DevicesDetails)
}

export const actions:ActionTree<DevicesDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: DevicesDetails) {
    commit('FILL_DEVICE_REQUEST', request)
  },
  async addDevice ({ commit }, request:DevicesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<DevicesDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_DEVICE', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_DEVICE', { ...request, id: index++ })
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDevice ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<DevicesDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_DEVICE', (response.data as DataResponse<DevicesDetails>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log(error)
      commit('SET_DEVICE', device.find((item: DevicesDetails) => item.id === id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDevicesByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<DevicesDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_DEVICES', (response.data as DataResponse<DevicesDetails[]>).data)
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
  async getDevices ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<DevicesDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_DEVICES', (response.data as DataResponse<DevicesDetails[]>).data)
          } else {
            commit('SET_DEVICES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<DevicesDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_DEVICES', device)
      // commit('SET_DEVICES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateDevice ({ commit, getters }, request:DeviceUpdateRequest) {
    commit('SET_LOADING', true)
    try {
      console.log(request)
      return await service.update<DeviceUpdateRequest, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_DEVICE', request)
          commit('SET_DEVICES', getters.devices.map((item: DevicesDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_DEVICE', request)
      commit('SET_DEVICES', getters.devices.map((item: DevicesDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeDevice ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_DEVICE')
          commit('SET_DEVICES', getters.devices.filter((item: DevicesDetails) => item.id !== id))
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
