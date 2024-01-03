import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { MileageReport } from '~/models/accounting/mileageReport'
import mileageReport from '~/static/DummyData/Accounting/mileageReport'
import ApiService from '~/services/baseService'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    report: {} as MileageReport
  },
  response: {
    report: {} as MileageReport,
    reports: [] as MileageReport[],
    carrierReports: mileageReport as MileageReport[]
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

export interface SetMilageReportRequest {
  report: MileageReport
  step?:number,
  title?:string
}

export const endPoint = 'MileageReportDetails'

export type MileageReportsState = ReturnType<typeof state>

export const getters: GetterTree<MileageReportsState, RootStoreState> = {
  reportRequest: state => (state.request.report),
  report: state => (state.response.report),
  reports: state => (state.response.reports),
  carrierReports: state => (state.response.carrierReports),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<MileageReportsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_REPORT_REQUEST: (state, request:MileageReport) => (state.request.report = { ...state.request.report, ...request }),
  SET_CARRIER_REPORTS: (state, list:MileageReport[]) => (state.response.carrierReports = list),
  SET_REPORT: (state, single:MileageReport) => (state.response.report = single),
  SET_REPORTS: (state, list:MileageReport[]) => (state.response.reports = list),
  REMOVE_REPORT: (state, id:number|string) => (state.response.reports = state.response.reports.filter((item:MileageReport) => item.id !== id)),
  UPDATE_REPORT: (state, single:MileageReport) => {
    const itemIndex = state.response.reports.findIndex((item: MileageReport) => item.id === single.id)
    state.response.reports[itemIndex] = single
    const carrierItemIndex = state.response.carrierReports.findIndex((item: MileageReport) => item.id === single.id)
    state.response.carrierReports[carrierItemIndex] = single
  },
  ADD_REPORT: (state, single:MileageReport) => {
    if (single.id === undefined) {
      single.id = state.response.carrierReports[state.response.carrierReports.length - 1].id + 1
    }
    state.response.carrierReports.push(single)
    console.log(single, state.response.carrierReports)
  },
  SET_ADD_REPORT: (state, request:SetMilageReportRequest) => {
    if (request.report) {
      state.request.report = request.report as MileageReport
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<MileageReportsState, RootStoreState> = {
  fillRequest ({ commit }, request: MileageReport) {
    commit('FILL_REPORT_REQUEST', request)
  },
  setReport ({ commit }, request:SetMilageReportRequest) {
    commit('SET_ADD_REPORT', request)
  },
  async addMileageReports ({ commit }, request:MileageReport) {
    commit('SET_LOADING', true)
    try {
      return await service.add<MileageReport, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_REPORT', request)
        } else {
          commit('ADD_REPORT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getMileageReportByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<MileageReport[]>('milegaReport', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_REPORTS', (response.data as DataResponse<MileageReport[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_REPORTS', mileageReport)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getMileageReport ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<MileageReport[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_REPORT', (response.data as DataResponse<MileageReport[]>).data[0])
        } else {
          commit('SET_REPORT', getters.reports.find((item:MileageReport) => item.id === id))
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.report)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getMileageReports ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      console.log('payload', payload)
      return await service.get<MileageReport[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_REPORTS', (response.data as DataResponse<MileageReport[]>).data)
          } else {
            commit('SET_REPORTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<MileageReport[]>).total_pages)
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
  async updateMileageReports ({ commit, getters }, request:MileageReport) {
    commit('SET_LOADING', true)
    try {
      return await service.update<MileageReport, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_REPORT', request)
          commit('SET_REPORTS', getters.reports.map((item: MileageReport) => item.id === request.id ? request : item))
          commit('SET_CARRIER_REPORTS', getters.carrierReports.map((item: MileageReport) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_REPORT', request)
      commit('SET_REPORTS', getters.reports.map((item: MileageReport) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeMileageReports ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_REPORT', id)
          commit('SET_REPORTS', getters.reports.filter((item: MileageReport) => item.id !== id))
          commit('SET_CARRIER_REPORTS', getters.carrierReports.filter((item: MileageReport) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_REPORTS', getters.reports.filter((item:MileageReport) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
