import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { APIResponse } from '~/models/common/apiResponse'
import { ViolationsDetails } from '~/models/violationsDetails/violationsDetails'
import violationsDetails from '~/static/DummyData/Safety/violationsDetails'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'
import { GetPayload } from '~/models/common/GetPayload'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    violation: {} as ViolationsDetails
  },
  response: {
    violation: {} as ViolationsDetails,
    violations: [] as ViolationsDetails[],
    carrierViolations: violationsDetails as ViolationsDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'ViolationsDetails'

export type ViolationsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<ViolationsDetailsState, RootStoreState> = {
  violationRequest: state => (state.request.violation),
  violation: state => (state.response.violation),
  violations: state => (state.response.violations),
  carrierViolations: state => (state.response.carrierViolations),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ViolationsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_VIOLATION: (state, single: ViolationsDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierViolations.length < 12) {
        single.id = state.response.carrierViolations[state.response.carrierViolations.length - 1].id + 1
        state.response.carrierViolations.push(single)
      }
    }
  },
  FILL_VIOLATION_REQUEST: (state, request:ViolationsDetails) => (state.request.violation = { ...state.request.violation, ...request }),
  SET_VIOLATION: (state, single:ViolationsDetails) => (state.response.violation = single),
  SET_VIOLATIONS: (state, list:ViolationsDetails[]) => (state.response.violations = list),
  SET_CARRIER_VIOLATIONS: (state, list:ViolationsDetails[]) => (state.response.carrierViolations = list),
  REMOVE_VIOLATION: state => (state.response.violation = {} as ViolationsDetails),
  UPDATE_VIOLATION: (state, single:ViolationsDetails) => {
    const itemIndex = state.response.violations.findIndex((item: ViolationsDetails) => item.id === single.id)
    state.response.violations[itemIndex] = single
    const carrierItemIndex = state.response.carrierViolations.findIndex((item: ViolationsDetails) => item.id === single.id)
    state.response.carrierViolations[carrierItemIndex] = single
  }
}

export const actions: ActionTree<ViolationsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: ViolationsDetails) {
    commit('FILL_VIOLATION_REQUEST', request)
  },
  async updateViolation ({ commit, getters }, request:ViolationsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ViolationsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_VIOLATION', request)
          commit('SET_CARRIER_VIOLATIONS', getters.carrierViolations.map((item: ViolationsDetails) => item.id === request.id ? request : item))
          commit('SET_VIOLATIONS', getters.carrierViolations.map((item: ViolationsDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_VIOLATION', request)
          commit('SET_CARRIER_VIOLATIONS', getters.carrierViolations.map((item: ViolationsDetails) => item.id === request.id ? request : item))
          commit('SET_VIOLATIONS', getters.carrierViolations.map((item: ViolationsDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_VIOLATION', request)
      commit('SET_VIOLATION', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async addViolation ({ commit }, request:ViolationsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ViolationsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_VIOLATION', request)
        } else {
          commit('ADD_VIOLATION', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_VIOLATION', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getViolation ({ commit }, id: number | string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ViolationsDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_VIOLATION', (response.data as DataResponse<ViolationsDetails[]>).data[0])
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
  async getViolationsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ViolationsDetails[]>('violations', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_VIOLATIONS', (response.data as DataResponse<ViolationsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<ViolationsDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_VIOLATIONS', violationsDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getViolations ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ViolationsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          commit('SET_VIOLATIONS', (response.data as DataResponse<ViolationsDetails[]>).data)
          commit('SET_PAGE', (response.data as DataResponse<ViolationsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
        return response
      })
    } catch (error) {
      console.log(error)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 200)
    }
  },
  async removeViolation ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_VIOLATION')
          commit('SET_VIOLATIONS', getters.violations.filter((item: ViolationsDetails) => item.id !== id))
          commit('SET_CARRIER_VIOLATIONS', getters.carrierViolations.filter((item: ViolationsDetails) => item.id !== id))
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
