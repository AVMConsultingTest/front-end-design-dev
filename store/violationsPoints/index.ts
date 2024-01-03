import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { APIResponse } from '~/models/common/apiResponse'
import { RootStoreState } from '~/models/store'
import { ViolationsPointsSummary } from '~/models/violationsPoints'
import { ViolationsPoints } from '~/models/violationsPoints/violationsPoints'
import ApiService from '~/services/baseService'
import violationsSummary from '~/static/DummyData/Safety/violationsPointsSummary'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    violationPoint: {} as ViolationsPoints
  },
  response: {
    violationPoint: {} as ViolationsPoints,
    violationPoints: [] as ViolationsPoints[],
    violationsPointsSummary: {} as ViolationsPointsSummary,
    carrierSummary: violationsSummary[0] as ViolationsPointsSummary
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'ViolationsPointsSummary'

export type ViolationsState = ReturnType<typeof state>

export const getters: GetterTree<ViolationsState, RootStoreState> = {
  violationPointRequest: state => (state.request.violationPoint),
  violationPoint: state => (state.response.violationPoint),
  violationPoints: state => (state.response.violationPoints),
  violationsPointsSummary: state => (state.response.violationsPointsSummary),
  carrierSummary: state => (state.response.carrierSummary),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ViolationsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_VIOLATIONS_REQUEST: (state, request:ViolationsPoints) => (state.request.violationPoint = { ...state.request.violationPoint, ...request }),
  SET_VIOLATION: (state, single:ViolationsPoints) => (state.response.violationPoint = single),
  SET_VIOLATIONS: (state, list:ViolationsPoints[]) => (state.response.violationPoints = list),
  REMOVE_VIOLATIONS: state => (state.response.violationPoint = {} as ViolationsPoints),
  SET_VIOLATIONS_POINTS_SUMMARY: (state, single:ViolationsPointsSummary) => (state.response.violationsPointsSummary = single),
  SET_CARRIER_SUMMARY: (state, single:ViolationsPointsSummary) => (state.response.carrierSummary = single)
}

export const actions:ActionTree<ViolationsState, RootStoreState> = {
  fillRequest ({ commit }, request: ViolationsPoints) {
    commit('FILL_VIOLATIONS_REQUEST', request)
  },
  async getSummary ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ViolationsPointsSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_VIOLATIONS_POINTS_SUMMARY', (response.data as DataResponse<ViolationsPointsSummary[]>).data[0])
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
        .get<ViolationsPointsSummary[]>('violations', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_SUMMARY', (response.data as DataResponse<ViolationsPointsSummary[]>).data[0])
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_SUMMARY', violationsSummary[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async addViolationPoint ({ commit }, request:ViolationsPoints) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ViolationsPoints, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_VIOLATION', request)
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
  async getViolationPoint ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ViolationsPoints[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_VIOLATION', (response.data as DataResponse<ViolationsPoints[]>).data[0])
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
  async getViolationPoints ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ViolationsPoints[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_VIOLATIONS', (response.data as DataResponse<ViolationsPoints[]>).data)
          } else {
            commit('SET_VIOLATIONS', [] as ViolationsPoints[])
          }
          commit('SET_PAGE', (response.data as DataResponse<ViolationsPoints[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_VIOLATIONS', [] as ViolationsPoints[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateViolationPoint ({ commit }, request:ViolationsPoints) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ViolationsPoints, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_VIOLATION', request)
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
  async removeViolationPoint ({ commit }, id: number|string) {
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
