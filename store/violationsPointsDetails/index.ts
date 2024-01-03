import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { APIResponse } from '~/models/common/apiResponse'
import { ViolationsPointsDetails } from '~/models/violationsPointsDetails'
import violationsPoint from '~/static/DummyData/Safety/violationsPointsDetails'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'
import { GetPayload } from '~/models/common/GetPayload'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    violation: {} as ViolationsPointsDetails
  },
  response: {
    violation: {} as ViolationsPointsDetails,
    violations: [] as ViolationsPointsDetails[],
    carrierViolations: violationsPoint as ViolationsPointsDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'ViolationsPointsDetails'

export type ViolationsPointsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<ViolationsPointsDetailsState, RootStoreState> = {
  violationRequest: state => (state.request.violation),
  violation: state => (state.response.violation),
  violations: state => (state.response.violations),
  carrierViolations: state => (state.response.carrierViolations),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ViolationsPointsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_VIOLATION: (state, single: ViolationsPointsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.violations[state.response.violations.length - 1].id + 1
    }
    state.response.violations.push(single)
    console.log(single, state.response.violations)
  },
  FILL_VIOLATION_REQUEST: (state, request:ViolationsPointsDetails) => (state.request.violation = { ...state.request.violation, ...request }),
  SET_VIOLATION: (state, single:ViolationsPointsDetails) => (state.response.violation = single),
  SET_VIOLATIONS: (state, list:ViolationsPointsDetails[]) => (state.response.violations = list),
  SET_CARRIER_VIOLATIONS: (state, list:ViolationsPointsDetails[]) => (state.response.carrierViolations = list),
  REMOVE_VIOLATION: state => (state.response.violation = {} as ViolationsPointsDetails),
  UPDATE_VIOLATION: (state, single:ViolationsPointsDetails) => {
    const itemIndex = state.response.violations.findIndex((item: ViolationsPointsDetails) => item.id === single.id)
    state.response.violations[itemIndex] = single
  }
}

export const actions: ActionTree<ViolationsPointsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: ViolationsPointsDetails) {
    commit('FILL_VIOLATION_REQUEST', request)
  },
  async updateViolation ({ commit }, request:ViolationsPointsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ViolationsPointsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_VIOLATION', request)
        } else {
          commit('UPDATE_VIOLATION', request)
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
  async addViolation ({ commit }, request:ViolationsPointsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ViolationsPointsDetails, APIResponse>(endPoint, request).then((response) => {
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
      return await service.single<ViolationsPointsDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_VIOLATION', (response.data as DataResponse<ViolationsPointsDetails[]>).data[0])
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
        .get<ViolationsPointsDetails[]>('violations', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_VIOLATIONS', (response.data as DataResponse<ViolationsPointsDetails[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_VIOLATIONS', violationsPoint)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getViolations ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ViolationsPointsDetails[]>(endPoint, page_number).then((response) => {
        if (response.status === 200) {
          commit('SET_VIOLATIONS', (response.data as DataResponse<ViolationsPointsDetails[]>).data)
          commit('SET_PAGE', (response.data as DataResponse<ViolationsPointsDetails[]>).total_pages)
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
  async removeViolation ({ commit }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_VIOLATION')
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
