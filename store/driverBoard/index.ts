import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { DriversDetails } from '~/models/DISPATCH/drivers/driversDetails'
import driversDetails from '~/static/DummyData/Dispatch/driverBoard'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    driver: {} as DriversDetails
  },
  response: {
    driver: {} as DriversDetails,
    drivers: [] as DriversDetails[],
    carrierDriversBoard: driversDetails as DriversDetails[]
  },
  page: 1,
  loading: false,
  error: '',
  addStep: {
    index: 0,
    title: '',
    subTitle: ''
  }
})

export interface SetDriverRequest {
  driver: DriversDetails,
  step?:number,
  title?:string
}

export const endPoint = 'carrier/driver-boards'

export type DriversDetailsState = ReturnType<typeof state>

export const getters: GetterTree<DriversDetailsState, RootStoreState> = {
  driverRequest: state => (state.request.driver),
  driver: state => (state.response.driver),
  drivers: state => (state.response.drivers),
  pageCount: state => (state.page),
  carrierDriversBoard: state => (state.response.carrierDriversBoard)

}

export const mutations: MutationTree<DriversDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_DRIVER: (state, single: DriversDetails) => {
    if (single.id === undefined) {
      single.id = state.response.carrierDriversBoard[state.response.carrierDriversBoard.length - 1].id + 1
    }
    state.response.carrierDriversBoard.push(single)
    console.log(single, state.response.carrierDriversBoard)
  },
  FILL_DRIVER_REQUEST: (state, request:DriversDetails) => (state.request.driver = { ...state.request.driver, ...request }),
  SET_DRIVER: (state, single:DriversDetails) => (state.response.driver = single),
  SET_DRIVERS: (state, list:DriversDetails[]) => (state.response.drivers = list),
  SET_CARRIER_DRIVERS_BOARD: (state, list:DriversDetails[]) => (state.response.carrierDriversBoard = list),
  REMOVE_DRIVER: state => (state.response.driver = {} as DriversDetails),
  UPDATE_DRIVER: (state, single:DriversDetails) => {
    const itemIndex = state.response.drivers.findIndex((item: DriversDetails) => item.id === single.id)
    state.response.drivers[itemIndex] = single
    const carrierItemIndex = state.response.carrierDriversBoard.findIndex((item: DriversDetails) => item.id === single.id)
    state.response.carrierDriversBoard[carrierItemIndex] = single
  },
  SET_ADD_DRIVER (state, request:SetDriverRequest) {
    if (request.driver) {
      state.request.driver = request.driver as DriversDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
  // UPDATE_DRIVER: (state, single:DriversDetails) => {
  //   const itemIndex = state.response.drivers.findIndex((item: DriversDetails) => item.id === single.id)
  //   state.response.drivers[itemIndex] = single
  // },
}

export const actions: ActionTree<DriversDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: DriversDetails) {
    commit('FILL_DRIVER_REQUEST', request)
  },
  setDriver ({ commit }, request:SetDriverRequest) {
    commit('SET_ADD_DRIVER', request)
  },
  async addDriver ({ commit }, request:DriversDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<DriversDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_DRIVER', request)
        } else {
          commit('ADD_DRIVER', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDriver ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<DriversDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_DRIVER', (response.data as DataResponse<DriversDetails[]>).data[0])
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
  async getDrivers ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<DriversDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_DRIVERS', (response.data as DataResponse<DriversDetails[]>).data)
          } else {
            commit('SET_DRIVERS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<DriversDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_DRIVERS', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDriversBoardByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<DriversDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_DRIVERS_BOARD', (response.data as DataResponse<DriversDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<DriversDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_DRIVERS_BOARD', driversDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateDriver ({ commit, getters }, request:DriversDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<DriversDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_DRIVER', request)
          commit('SET_DRIVER', request)
          commit('SET_CARRIER_DRIVERS_BOARD', getters.carrierDriversBoard.map((item: DriversDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_DRIVER', request)
      commit('SET_ERROR', error)
      commit('SET_DRIVERS', getters.drivers.map((item: DriversDetails) => item.id === request.id ? request : item))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeDriver ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_DRIVER')
          commit('SET_DRIVERS', getters.drivers.filter((item: DriversDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_DRIVERS', getters.drivers.filter((item:DriversDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
