import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { FuelReport } from '~/models/accounting/fuelReport'
import fuelReport from '~/static/DummyData/Accounting/fuelReport'
import ApiService from '~/services/baseService'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    report: {} as FuelReport
  },
  response: {
    report: {} as FuelReport,
    reports: [] as FuelReport[],
    carrierReports: fuelReport as FuelReport[]
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
export interface SetReportRequest {
  report: FuelReport
  step?:number,
  title?:string
}

export const endPoint = 'FuelReportDetails'

export type FuelReportsState = ReturnType<typeof state>

export const getters: GetterTree<FuelReportsState, RootStoreState> = {
  reportRequest: state => (state.request.report),
  report: state => (state.response.report),
  reports: state => (state.response.reports),
  carrierReports: state => (state.response.carrierReports),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<FuelReportsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_REPORT_REQUEST: (state, request:FuelReport) => (state.request.report = { ...state.request.report, ...request }),
  SET_CARRIER_REPORTS: (state, list:FuelReport[]) => (state.response.carrierReports = list),
  SET_REPORT: (state, single:FuelReport) => (state.response.report = single),
  SET_REPORTS: (state, list:FuelReport[]) => (state.response.reports = list),
  REMOVE_REPORT: state => (state.response.report = {} as FuelReport),
  UPDATE_REPORT: (state, single:FuelReport) => {
    const itemIndex = state.response.reports.findIndex((item: FuelReport) => item.id === single.id)
    state.response.reports[itemIndex] = single
    const carrierItemIndex = state.response.carrierReports.findIndex((item: FuelReport) => item.id === single.id)
    state.response.carrierReports[carrierItemIndex] = single
  },
  ADD_REPORT: (state, single:FuelReport) => {
    if (single.id === undefined) {
      single.id = state.response.carrierReports[state.response.carrierReports.length - 1].id + 1
    }
    state.response.carrierReports.push(single)
    console.log(single, state.response.carrierReports)
  },
  SET_ADD_REPORT: (state, request:SetReportRequest) => {
    if (request.report) {
      state.request.report = request.report as FuelReport
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<FuelReportsState, RootStoreState> = {
  fillRequest ({ commit }, request: FuelReport) {
    commit('FILL_REPORT_REQUEST', request)
  },
  setReport ({ commit }, request:SetReportRequest) {
    commit('SET_ADD_REPORT', request)
  },
  async addFuelReports ({ commit }, request:FuelReport) {
    commit('SET_LOADING', true)
    try {
      return await service.add<FuelReport, APIResponse>(endPoint, request).then((response) => {
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
  async getFuelReportsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<FuelReport[]>('fuelReport', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_REPORTS', (response.data as DataResponse<FuelReport[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_REPORTS', fuelReport)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getFuelReport ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<FuelReport[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_REPORT', (response.data as DataResponse<FuelReport[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.report)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getFuelReports ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      console.log('payload', payload)

      return await service.get<FuelReport[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_REPORTS', (response.data as DataResponse<FuelReport[]>).data)
          } else {
            commit('SET_REPORTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<FuelReport[]>).total_pages)
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
  async updateFuelReports ({ commit, getters }, request:FuelReport) {
    commit('SET_LOADING', true)
    try {
      return await service.update<FuelReport, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_REPORT', request)
          commit('SET_REPORTS', getters.reports.map((item: FuelReport) => item.id === request.id ? request : item))
          commit('SET_CARRIER_REPORTS', getters.carrierReports.map((item: FuelReport) => item.id === request.id ? request : item))

          // commit('SET_REPORT', {})
        } else {
          commit('SET_ERROR', response.data.message)
          // commit('UPDATE_REPORT', request)
          // commit('SET_REPORTS', getters.reports.map((item: FuelReport) => item.id === request.id ? request : item))
          // commit('SET_REPORT', {})
        }
      })
    } catch (error) {
      commit('UPDATE_REPORT', request)
      commit('SET_REPORTS', getters.reports.map((item: FuelReport) => item.id === request.id ? request : item))
      // commit('SET_REPORT', {})
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeFuelReports ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_REPORT')
          commit('SET_REPORTS', getters.reports.filter((item: FuelReport) => item.id !== id))
          commit('SET_CARRIER_REPORTS', getters.carrierReports.filter((item: FuelReport) => item.id !== id))
        } else {
          // commit('REMOVE_REPORT', id)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      // commit('REMOVE_REPORT', id)
      commit('SET_ERROR', error)
      commit('SET_REPORTS', getters.reports.filter((item:FuelReport) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
