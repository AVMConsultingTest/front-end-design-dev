import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { APIResponse } from '~/models/common/apiResponse'
import { RootStoreState } from '~/models/store'
import { Truck } from '~/models/truck/truck'
import { SelectOption } from '~/components/ts/interfaces'
import ApiService from '~/services/baseService'
import truck from '~/static/DummyData/Safety/trucks'
import { driversList } from '~/static/DummyData/Safety/driverSummary'
import { getText } from '~/utils/common'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    truck: {} as Truck
  },
  response: {
    truck: {} as Truck,
    trucks: truck as Truck[],
    carrierTrucks: [] as Truck[],
    allTrucksList: [] as SelectOption[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/trucks'

export type TruckState = ReturnType<typeof state>

export const getters: GetterTree<TruckState, RootStoreState> = {
  truckRequest: state => (state.request.truck),
  truck: state => (state.response.truck),
  trucks: state => (state.response.trucks),
  allTrucks: state => (state.response.allTrucksList),
  carrierTrucks: state => (state.response.carrierTrucks),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<TruckState> = {
  SET_LOADING: (state, loading: boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_TRUCK_REQUEST: (state, request:Truck) => (state.request.truck = { ...state.request.truck, ...request }),
  SET_TRUCK: (state, single:Truck) => (state.response.truck = { ...single, truck_id: single?.id }),
  // ADD_TRUCK: (state, single:Truck) => {
  //   if (single.id === undefined) {
  //     single.id = state.response.trucks[state.response.trucks.length - 1].id + 1
  //   }
  //   state.response.trucks.push(single)
  // },
  UPDATE_TRUCK: (state, single:Truck) => {
    const itemIndex = state.response.trucks.findIndex((item: Truck) => item.id === single.id)
    state.response.trucks[itemIndex] = single
  },
  SET_TRUCKS: (state, list:Truck[]) => {
    state.response.trucks = list.map((item:Truck) => {
      return ({ ...item, truck_id: item?.id, main_driver_name: getText(driversList, Number(item.main_driver_id) || 0), co_driver_name: getText(driversList, Number(item.co_driver_id) || 0) })
    })
  },
  SET_ALL_TRUCKS: (state, list:SelectOption[]) => (state.response.allTrucksList = list),
  SET_CARRIER_TRUCKS: (state, list:Truck[]) => (state.response.carrierTrucks = list),
  REMOVE_TRUCK: state => (state.response.truck = {} as Truck)
}

export const actions: ActionTree<TruckState, RootStoreState> = {
  fillRequest ({ commit }, request: Truck) {
    commit('FILL_TRUCK_REQUEST', request)
  },
  async updateTruck ({ commit, getters }, request:Truck) {
    commit('SET_LOADING', true)
    const truck = { ...request }
    delete truck.carrier_id
    delete truck.truck_id
    delete truck.co_driver_id
    delete truck.main_driver_id
    try {
      await service.update<Truck, APIResponse>(endPoint, truck.id, truck).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_TRUCK', request)
          commit('SET_CARRIER_TRUCKS', getters.carrierTrucks.map((item: Truck) => item.id === request.id ? request : item))
          commit('SET_TRUCKS', getters.trucks.map((item: Truck) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_TRUCK', request)
          commit('SET_CARRIER_TRUCKS', getters.carrierTrucks.map((item: Truck) => item.id === request.id ? request : item))
          commit('SET_TRUCKS', getters.trucks.map((item: Truck) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_TRUCK', request)
      commit('SET_CARRIER_TRUCKS', getters.carrierTrucks.map((item: Truck) => item.id === request.id ? request : item))
      commit('SET_TRUCKS', getters.trucks.map((item: Truck) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async addTruck ({ commit, dispatch }, request:Truck) {
    console.log('addTruck', request)
    commit('SET_LOADING', true)
    try {
      return await service.add<Truck, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 201) {
          dispatch('getTrucks', { page_number: 1 })
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      // commit('ADD_TRUCK', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTruck ({ commit }, id: number | string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<Truck[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_TRUCK', response.data)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_TRUCK', truck.find((item: Truck) => item.id === id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTrucksByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<Truck[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_TRUCKS', (response.data as DataResponse<Truck[]>).data)
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
  async getTrucks ({ commit, dispatch }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      await service.get<Truck[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if (((response.data as DataResponse<APIResponse>).data as any).length > 0) {
            commit('SET_TRUCKS', ((response.data as DataResponse<APIResponse>).data as any))
          } else {
            commit('SET_TRUCKS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<Truck[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
      // hitting the api again to get all the records for dropdown
      await dispatch('driver/getAllDrivers', null, { root: true })
    } catch (error) {
      console.log(error)
      commit('SET_ERROR', error)
      commit('SET_TRUCKS', truck)
    } finally {
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 200)
    }
  },
  async getAllTrucks ({ commit }) {
    try {
      return await service.getList<SelectOption[]>(endPoint).then((response) => {
        if (response.status === 200) {
          commit('SET_ALL_TRUCKS', (response.data as DataResponse<SelectOption[]>).data)
        } else {
          commit('SET_ALL_TRUCKS', [])
        }
      })
    } catch (error) {
      console.log(error)
      commit('SET_ALL_TRUCKS', [])
    }
  },
  async removeTruck ({ commit }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_TRUCK')
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
