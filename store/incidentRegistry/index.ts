import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { IncidentRegistryDetails } from '~/models/incidentRegistry/incidentRegistryDetails'
import { DataResponse } from '~/models/common/DataResponse'
import { SelectOption } from '~/components/ts/interfaces'
import ApiService from '~/services/baseService'
import incidentDummy from '~/static/DummyData/Safety/incidentRegistry'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import incidentRegistry from '~/static/DummyData/Safety/incidentRegistry'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    incident: {} as IncidentRegistryDetails
  },
  response: {
    incident: {} as IncidentRegistryDetails,
    incidents: incidentDummy as IncidentRegistryDetails[],
    carrierIncidents: [] as IncidentRegistryDetails[],
    allDriversList: [] as SelectOption[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/incidents'

export type IncidentRegistryDetailsState = ReturnType<typeof state>

export const getters: GetterTree<IncidentRegistryDetailsState, RootStoreState> = {
  incidentRequest: state => (state.request.incident),
  incident: state => (state.response.incident),
  incidents: state => (state.response.incidents),
  carrierIncidents: state => (state.response.carrierIncidents),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<IncidentRegistryDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  FILL_INCIDENT_REQUEST: (state, request:IncidentRegistryDetails) => (state.request.incident = { ...state.request.incident, ...request }),
  SET_INCIDENT: (state, single:IncidentRegistryDetails) => (state.response.incident = single),
  UPDATE_INCIDENT: (state, single:IncidentRegistryDetails) => {
    const itemIndex = state.response.incidents.findIndex((item: IncidentRegistryDetails) => item.id === single.id)
    state.response.incidents[itemIndex] = single
    const carrierItemIndex = state.response.carrierIncidents.findIndex((item: IncidentRegistryDetails) => item.id === single.id)
    state.response.carrierIncidents[carrierItemIndex] = single
  },
  SET_INCIDENTS: (state, list:IncidentRegistryDetails[]) => (state.response.incidents = list),
  SET_CARRIER_INCIDENTS: (state, list:IncidentRegistryDetails[]) => (state.response.carrierIncidents = list),

  ADD_INCIDENT: (state, single:IncidentRegistryDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierIncidents.length < 12) {
        single.id = state.response.carrierIncidents[state.response.carrierIncidents.length - 1].id + 1
        state.response.carrierIncidents.push(single)
      }
    }
  },
  SET_PAGE: (state, page:number) => (state.page = page),
  REMOVE_INCIDENT: state => (state.response.incident = {} as IncidentRegistryDetails),
  SET_ALL_DRIVERS: (state, list:SelectOption[]) => (state.response.allDriversList = list)
}

export const actions:ActionTree<IncidentRegistryDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: IncidentRegistryDetails) {
    commit('FILL_INCIDENT_REQUEST', request)
  },
  async addIncident ({ commit }, request:IncidentRegistryDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<IncidentRegistryDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_INCIDENT', request)
        } else {
          commit('ADD_INCIDENT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_INCIDENT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getIncident ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<IncidentRegistryDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_INCIDENT', (response.data as DataResponse<IncidentRegistryDetails>))
        } else {
          commit('SET_INCIDENT', getters.incidents.find((item:IncidentRegistryDetails) => item.id === id))
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.incidents)
      commit('SET_INCIDENT', getters.incidents.filter((item: IncidentRegistryDetails) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getIncidentsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<IncidentRegistryDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_INCIDENTS', (response.data as DataResponse<IncidentRegistryDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<IncidentRegistryDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_INCIDENTS', incidentDummy)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getIncidents ({ commit, dispatch }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      await service.get<IncidentRegistryDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if (((response.data as DataResponse<APIResponse>).data as any).length > 0) {
            commit('SET_INCIDENTS', ((response.data as DataResponse<APIResponse>).data as any))
          } else {
            commit('SET_INCIDENTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<IncidentRegistryDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
      await dispatch('driver/getAllDrivers', null, { root: true })
    } catch (error) {
      commit('SET_INCIDENTS', [...incidentRegistry])
      commit('SET_ERROR', error)
      // commit('SET_INCIDENTS', [])
    } finally {
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 200)
    }
  },
  async updateIncident ({ commit, getters }, request:IncidentRegistryDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<IncidentRegistryDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_INCIDENT', request)
          commit('SET_CARRIER_INCIDENTS', getters.carrierIncidents.map((item: IncidentRegistryDetails) => item.id === request.id ? request : item))
          commit('SET_INCIDENTS', getters.incidents.map((item: IncidentRegistryDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_INCIDENT', request)
          commit('SET_CARRIER_INCIDENTS', getters.carrierIncidents.map((item: IncidentRegistryDetails) => item.id === request.id ? request : item))
          commit('SET_INCIDENTS', getters.incidents.map((item: IncidentRegistryDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_INCIDENT', request)
      commit('SET_CARRIER_INCIDENTS', getters.carrierIncidents.map((item: IncidentRegistryDetails) => item.id === request.id ? request : item))
      commit('SET_INCIDENTS', getters.incidents.map((item: IncidentRegistryDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeIncident ({ commit, getters }, id: string|number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_INCIDENT', id)
          commit('SET_INCIDENTS', getters.incidents.filter((item:IncidentRegistryDetails) => item.id !== id))
          commit('SET_CARRIER_INCIDENTS', getters.carrierIncidents.filter((item: IncidentRegistryDetails) => item.id !== id))
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
  }
}
