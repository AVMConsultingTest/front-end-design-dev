import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { APIResponse } from '~/models/common/apiResponse'
import { InspectionReportDetails } from '~/models/inspectionReport/inspectionReportDetails'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'
import inspectionDummy from '~/static/DummyData/Safety/inspectionReportDetails'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    report: {} as InspectionReportDetails
  },
  response: {
    report: {} as InspectionReportDetails,
    reports: inspectionDummy as InspectionReportDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/inspections'

export type InspectionReportDetailsState = ReturnType<typeof state>

export const getters: GetterTree<InspectionReportDetailsState, RootStoreState> = {
  reportRequest: state => (state.request.report),
  inspection: state => (state.response.report),
  inspections: state => (state.response.reports),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<InspectionReportDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_REPORT_REQUEST: (state, request:InspectionReportDetails) => (state.request.report = { ...state.request.report, ...request }),
  SET_REPORT: (state, single:InspectionReportDetails) => (state.response.report = single),
  SET_REPORTS: (state, list:InspectionReportDetails[]) => (state.response.reports = list),
  UPDATE_REPORT: (state, single:InspectionReportDetails) => {
    const itemIndex = state.response.reports.findIndex((item: InspectionReportDetails) => item.id === single.id)
    state.response.reports[itemIndex] = single
    console.log(single, state.response)
  },
  ADD_REPORT: (state, single:InspectionReportDetails) => (state.response.reports.push(single)),
  REMOVE_REPORT: state => (state.response.report = {} as InspectionReportDetails)
}

export const actions:ActionTree<InspectionReportDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: InspectionReportDetails) {
    commit('FILL_REPORT_REQUEST', request)
  },
  async addReport ({ commit }, request:InspectionReportDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<InspectionReportDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_REPORT', request)
        } else {
          commit('ADD_REPORT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_REPORT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getReport ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<InspectionReportDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_REPORT', (response.data as DataResponse<InspectionReportDetails>))
        } else {
          commit('SET_REPORT', getters.inspections.filter((item:InspectionReportDetails) => item.id === id)[0])
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_REPORT', error)
      commit('SET_REPORT', getters.inspections.filter((item: InspectionReportDetails) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getReports ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<InspectionReportDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_REPORTS', (response.data as DataResponse<InspectionReportDetails[]>).data)
          } else {
            commit('SET_REPORTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<InspectionReportDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_REPORTS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateReport ({ commit, getters }, request:InspectionReportDetails) {
    commit('SET_LOADING', request)
    try {
      return await service.update<InspectionReportDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_REPORT', request)
          commit('SET_REPORTS', getters.inspections.map((item: InspectionReportDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_REPORT', request)
          commit('SET_REPORTS', getters.inspections.map((item: InspectionReportDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_REPORT', request)
      commit('SET_REPORT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeReport ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_REPORT')
          commit('SET_REPORTS', getters.inspections.filter((item: InspectionReportDetails) => item.id !== id))
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
