import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { DevicesSummary } from '~/models/devices/devicesSummary'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'
import device from '~/static/DummyData/Safety/devices'
import devicesSummary from '~/static/DummyData/Safety/devicesSummary'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    device: {} as DevicesSummary
  },
  response: {
    device: devicesSummary[0] as DevicesSummary,
    devices: device as DevicesSummary[]
  },
  page: 0,
  loading: false,
  error: ''
})

let index = 3

export const endPoint = 'devicesSummary'

export type DevicesSummaryState = ReturnType<typeof state>

export const getters: GetterTree<DevicesSummaryState, RootStoreState> = {
  deviceRequest: state => (state.request.device),
  device: state => (state.response.device),
  devices: state => (state.response.devices),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<DevicesSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_DEVICE_REQUEST: (state, request:DevicesSummary) => (state.request.device = { ...state.request.device, ...request }),
  SET_DEVICE: (state, single:DevicesSummary) => (state.response.device = single),
  ADD_DEVICE: (state, single:DevicesSummary) => (state.response.devices.push(single)),
  UPDATE_DEVICE: (state, single:DevicesSummary) => {
    const itemIndex = state.response.devices.findIndex((item: DevicesSummary) => item.id === single.id)
    state.response.devices[itemIndex] = single
  },
  SET_DEVICES: (state, list:DevicesSummary[]) => (state.response.devices = list),
  REMOVE_DEVICE: state => (state.response.device = {} as DevicesSummary)
}

export const actions:ActionTree<DevicesSummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: DevicesSummary) {
    commit('FILL_DEVICE_REQUEST', request)
  },
  async addDevice ({ commit }, request:DevicesSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<DevicesSummary, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
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
      return await service.single<DevicesSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_DEVICE', (response.data as DataResponse<DevicesSummary[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_DEVICE', devicesSummary[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSummaryByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<DevicesSummary[]>('devicesSummary', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_SUMMARY', (response.data as DataResponse<DevicesSummary[]>).data[0])
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
      return await service.get<DevicesSummary[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_DEVICES', (response.data as DataResponse<DevicesSummary[]>).data)
          } else {
            commit('SET_DEVICES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<DevicesSummary[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      // commit('SET_DEVICES', device)
      commit('SET_DEVICES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateDevice ({ commit, getters }, request:DevicesSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<DevicesSummary, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_DEVICE', request)
          commit('SET_DEVICES', getters.devices.map((item: DevicesSummary) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_DEVICE', request)
      commit('SET_DEVICES', getters.devices.map((item: DevicesSummary) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeDevice ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_DEVICE')
          commit('SET_DEVICES', getters.devices.filter((item: DevicesSummary) => item.id !== id))
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
