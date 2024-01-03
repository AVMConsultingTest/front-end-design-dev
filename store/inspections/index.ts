import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { APIResponse } from '~/models/common/apiResponse'
import { SelectOption } from '~/components/ts/interfaces'
import { InspectionsDetails } from '~/models/inspections/inspectionsDetails'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    inspection: [] as InspectionsDetails[]
  },
  response: {
    inspection: {} as InspectionsDetails,
    inspections: [] as InspectionsDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/inspections'

export type InspectionsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<InspectionsDetailsState, RootStoreState> = {
  inspectionRequest: state => (state.request.inspection),
  inspection: state => (state.response.inspection),
  inspections: state => (state.response.inspections),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<InspectionsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_INSPECTION_REQUEST: (state, request:InspectionsDetails) => (state.request.inspection = { ...state.request.inspection, ...request }),
  SET_INSPECTION: (state, single:InspectionsDetails) => (state.response.inspection = single),
  SET_INSPECTIONS: (state, list:InspectionsDetails[]) => (state.response.inspections = list),
  REMOVE_INSPECTION: state => (state.response.inspection = {} as InspectionsDetails)
}

export const actions:ActionTree<InspectionsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: InspectionsDetails) {
    commit('FILL_INSPECTION_REQUEST', request)
  },
  async addInspection ({ commit }, request:InspectionsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<InspectionsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('SET_INSPECTION', request)
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
  async getInspection ({ commit }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<InspectionsDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_INSPECTION', (response.data as DataResponse<InspectionsDetails>))
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
  async getInspections ({ commit, dispatch }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<InspectionsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if (((response.data as DataResponse<APIResponse>).data as any).length > 0) {
            commit('SET_INSPECTIONS', (response.data as DataResponse<InspectionsDetails[]>).data)
          } else {
            commit('SET_INSPECTIONS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<InspectionsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
      await dispatch('driver/getAllDrivers', null, { root: true })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_INSPECTIONS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateInspection ({ commit, getters }, request:InspectionsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<InspectionsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_INSPECTION', request)
          commit('SET_INSPECTIONS', getters.inspections.map((item: InspectionsDetails) => item.id === request.id ? request : item))
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
  async removeInspection ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_INSPECTION')
          commit('SET_INSPECTIONS', getters.inspections.filter((item: InspectionsDetails) => item.id !== id))
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
