import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { LocationsDetails } from '~/models/DISPATCH/locations/locationsDetails'
import locationsDetails from '~/static/DummyData/Dispatch/locations'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    location: {} as LocationsDetails
  },
  response: {
    location: {} as LocationsDetails,
    locations: [] as LocationsDetails[],
    carrierLocations: locationsDetails as LocationsDetails[]

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

export interface SetLocationRequest {
  location: LocationsDetails
  step?:number,
  title?:string
}

export const endPoint = 'carrier/locations'

export type LocationsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<LocationsDetailsState, RootStoreState> = {
  locationRequest: state => (state.request.location),
  location: state => (state.response.location),
  locations: state => (state.response.locations),
  pageCount: state => (state.page),
  carrierLocations: state => (state.response.carrierLocations)
}

export const mutations: MutationTree<LocationsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_LOCATION_REQUEST: (state, request:LocationsDetails) => (state.request.location = { ...state.request.location, ...request }),
  SET_CARRIER_LOCATIONS: (state, list:LocationsDetails[]) => (state.response.carrierLocations = list),
  SET_LOCATION: (state, single:LocationsDetails) => (state.response.location = single),
  SET_LOCATIONS: (state, list:LocationsDetails[]) => (state.response.locations = list),
  REMOVE_LOCATION: state => (state.response.location = {} as LocationsDetails),
  UPDATE_LOCATION: (state, single:LocationsDetails) => {
    const itemIndex = state.response.locations.findIndex((item: LocationsDetails) => item.id === single.id)
    state.response.locations[itemIndex] = single
    const carrierItemIndex = state.response.carrierLocations.findIndex((item: LocationsDetails) => item.id === single.id)
    state.response.carrierLocations[carrierItemIndex] = single
  },
  ADD_LOCATION: (state, single:LocationsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.carrierLocations[state.response.carrierLocations.length - 1].id + 1
    }
    state.response.carrierLocations.push(single)
    console.log(single, state.response.carrierLocations)
  },
  SET_ADD_LOCATION (state, request:SetLocationRequest) {
    if (request.location) {
      state.request.location = request.location as LocationsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<LocationsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: LocationsDetails) {
    commit('FILL_LOCATION_REQUEST', request)
  },
  setLocation ({ commit }, request:SetLocationRequest) {
    commit('SET_ADD_LOCATION', request)
  },
  async addLocation ({ commit }, request:LocationsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<LocationsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_LOCATION', request)
        } else {
          commit('ADD_LOCATION', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getLocation ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<LocationsDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_LOCATION', (response.data as DataResponse<LocationsDetails[]>).data[0])
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
  async getLocations ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<LocationsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_LOCATIONS', (response.data as DataResponse<LocationsDetails[]>).data)
          } else {
            commit('SET_LOCATIONS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<LocationsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_LOCATIONS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getLocationsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<LocationsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_LOCATIONS', (response.data as DataResponse<LocationsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<LocationsDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_LOCATIONS', locationsDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateLocation ({ commit, getters }, request:LocationsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<LocationsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_LOCATION', request)
          commit('SET_LOCATIONS', getters.locations.map((item: LocationsDetails) => item.id === request.id ? request : item))
          commit('SET_CARRIER_LOCATIONS', getters.carrierLocations.map((item: LocationsDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_LOCATION', request)
      commit('SET_LOCATIONS', getters.locations.map((item: LocationsDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeLocation ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_LOCATION')
          commit('SET_LOCATIONS', getters.locations.filter((item: LocationsDetails) => item.id !== id))
          commit('SET_CARRIER_LOCATIONS', getters.carrierLocations.filter((item: LocationsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_LOCATIONS', getters.locations.filter((item:LocationsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
