import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Driver, DriverSummary } from '../../models/driver'
import { RootStoreState } from '../../models/store'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { SelectOption } from '~/components/ts/interfaces'
import { GetPayload } from '~/models/common/GetPayload'
// import driverSummary, { driversList } from '~/static/DummyData/Safety/driverSummary'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    driver: {} as Driver
  },
  response: {
    driver: {} as Driver,
    drivers: [] as Driver[],
    carrierDrivers: [] as Driver[],
    carrierSummary: {} as DriverSummary,
    summary: {} as DriverSummary,
    summaries: [] as DriverSummary[],
    allDriversList: [] as SelectOption[]
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

export interface SetDriverRequest {
  driver?:null|Driver,
  step?:number,
  title?:string
}

const endPoint = 'carrier/drivers'
const endPointTwo = 'carrier/drivers/summary'

export type DriverState = ReturnType<typeof state>

export const getters: GetterTree<DriverState, RootStoreState> = {
  driverRequest: state => (state.request.driver),
  driver: state => (state.response.driver),
  drivers: state => (state.response.drivers),
  allDrivers: state => (state.response.allDriversList),
  carrierDrivers: state => (state.response.carrierDrivers),
  carrierSummary: state => (state.response.carrierSummary),
  summary: state => (state.response.summary),
  summaries: state => (state.response.summaries),
  step: state => (state.addStep),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<DriverState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_DRIVER_REQUEST: (state, request:Driver) => (state.request.driver = { ...state.request.driver, ...request }),
  SET_DRIVER: (state, single:Driver) => (state.response.driver = single),
  SET_DRIVERS: (state, list:Driver[]) => (state.response.drivers = list),
  SET_ALL_DRIVERS: (state, list:SelectOption[]) => (state.response.allDriversList = list),
  SET_CARRIER_DRIVERS: (state, list:Driver[]) => (state.response.carrierDrivers = list),
  SET_CARRIER_SUMMARY: (state, single:DriverSummary) => (state.response.carrierSummary = single),
  REMOVE_DRIVER: state => (state.response.driver = {} as Driver),
  SET_SUMMARY: (state, single:DriverSummary) => (state.response.summary = single),
  SET_SUMMARIES: (state, list:DriverSummary[]) => (state.response.summaries = list),
  REMOVE_SUMMARY: state => (state.response.summary = {} as DriverSummary),
  ADD_DRIVER: (state, single:Driver) => {
    if (single.id === undefined) {
      if (state.response.carrierDrivers.length < 12) {
        single.id = state.response.carrierDrivers[state.response.carrierDrivers.length - 1].id + 1
        console.log(single, state.response.carrierDrivers)
        state.response.carrierDrivers.push(single)
      }
    }
  },
  UPDATE_DRIVER: (state, single:Driver) => {
    const itemIndex = state.response.drivers.findIndex((item: Driver) => item.id === single.id)
    state.response.drivers[itemIndex] = single
    const carrierItemIndex = state.response.carrierDrivers.findIndex((item: Driver) => item.id === single.id)
    state.response.carrierDrivers[carrierItemIndex] = single
  },
  SET_ADD_DRIVER (state, request:SetDriverRequest) {
    if (request.driver) {
      state.request.driver = request.driver as Driver
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<DriverState, RootStoreState> = {
  fillRequest ({ commit }, request: Driver) {
    commit('FILL_DRIVER_REQUEST', request)
  },
  setDriver ({ commit }, request:SetDriverRequest) {
    commit('SET_ADD_DRIVER', request)
  },
  async addDriver ({ commit, dispatch }, request:Driver) {
    commit('SET_LOADING', true)
    try {
      return await service.add<Driver, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_DRIVER', request)
          dispatch('getDrivers', { page_number: 1 })
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
      return await service.single<Driver>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_DRIVER', (response.data as DataResponse<Driver>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      // commit('SET_DRIVER', driversList[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDriversByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<Driver[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_DRIVERS', (response.data as DataResponse<Driver[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<Driver[]>).total_pages)
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
  async getDrivers ({ commit, dispatch }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      console.log('payload', payload)

      return await service.get<Driver[]>('drivers', payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if (((response.data as DataResponse<APIResponse>).data as any).length > 0) {
            commit('SET_TRUCKS', ((response.data as DataResponse<APIResponse>).data as any))
          } else {
            commit('SET_DRIVERS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<Driver[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
      // hitting the api again to get all the records for dropdown
      await dispatch('driver/getAllDrivers', null, { root: true })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_DRIVERS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getAllDrivers ({ commit }) {
    try {
      return await service.getList<SelectOption[]>(endPoint).then((response) => {
        if (response.status === 200) {
          commit('SET_ALL_DRIVERS', (response.data as DataResponse<SelectOption[]>).data)
        } else {
          commit('SET_ALL_DRIVERS', [])
        }
      })
    } catch (error) {
      console.log(error)
      commit('SET_ALL_DRIVERS', [])
    }
  },
  async updateDriver ({ commit, getters }, request:Driver) {
    commit('SET_LOADING', true)
    console.log('req', request)

    try {
      return await service.update<Driver, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_DRIVER', request)
          commit('SET_DRIVER', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_DRIVER', request)
      commit('SET_DRIVERS', getters.drivers.map((item: Driver) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeDriver ({ commit, getters }, id: string|number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_DRIVER')
          commit('SET_DRIVERS', getters.drivers.filter((item: Driver) => item.id !== id))
          commit('SET_CARRIER_DRIVERS', getters.carrierDrivers.filter((item: Driver) => item.id !== id))
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
  async addSummary ({ commit }, request:DriverSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<DriverSummary, APIResponse>(endPointTwo, request).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', request)
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
  async getSummary ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<DriverSummary[]>(endPointTwo, id).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', (response.data as DataResponse<DriverSummary[]>).data[0])
          console.log(response.data)
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
  async getSummaryByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<DriverSummary[]>(endPointTwo, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          console.log('response', response)

          if (response.status === 200) {
            commit('SET_CARRIER_SUMMARY', (response.data as DataResponse<DriverSummary[]>))
            console.log('driver', response.data as DataResponse<DriverSummary[]>)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      // commit('SET_CARRIER_SUMMARY', driverSummary[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSummaries ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<DriverSummary[]>(endPointTwo, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_SUMMARIES', (response.data as DataResponse<DriverSummary[]>).data)
          } else {
            commit('SET_SUMMARIES', [])
          }
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_SUMMARIES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateSummary ({ commit }, request:DriverSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<DriverSummary, APIResponse>(endPointTwo, 0, request).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', request)
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
  async removeSummary ({ commit }, id: string|number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPointTwo, id).then((response : any) => {
        if (response.status === 200) {
          commit('REMOVE_SUMMARY')
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
