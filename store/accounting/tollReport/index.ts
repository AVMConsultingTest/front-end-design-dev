import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { TollReport } from '~/models/accounting/tollReport'
import tollReport from '~/static/DummyData/Accounting/tollReport'
import ApiService from '~/services/baseService'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    report: {} as TollReport
  },
  response: {
    report: {} as TollReport,
    reports: [] as TollReport[],
    carrierTollReports: tollReport as TollReport[]
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
  report: TollReport
  step?:number,
  title?:string
}

export const endPoint = 'TollReportDetails'

export type TollReportsState = ReturnType<typeof state>

export const getters: GetterTree<TollReportsState, RootStoreState> = {
  reportRequest: state => (state.request.report),
  report: state => (state.response.report),
  reports: state => (state.response.reports),
  carrierTollReports: state => (state.response.carrierTollReports),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<TollReportsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_REPORT_REQUEST: (state, request:TollReport) => (state.request.report = { ...state.request.report, ...request }),
  SET_CARRIER_REPORT: (state, list:TollReport[]) => (state.response.carrierTollReports = list),
  SET_REPORT: (state, single:TollReport) => (state.response.report = single),
  SET_REPORTS: (state, list:TollReport[]) => (state.response.reports = list),
  REMOVE_REPORT: (state, id:number|string) => (state.response.reports = state.response.reports.filter((item:TollReport) => item.id !== id)),
  UPDATE_REPORT: (state, single:TollReport) => {
    const itemIndex = state.response.reports.findIndex((item: TollReport) => item.id === single.id)
    state.response.reports[itemIndex] = single
    const carrierItemIndex = state.response.carrierTollReports.findIndex((item: TollReport) => item.id === single.id)
    state.response.carrierTollReports[carrierItemIndex] = single
  },
  ADD_REPORT: (state, single: TollReport) => {
    if (single.id === undefined) {
      single.id = state.response.carrierTollReports[state.response.carrierTollReports.length - 1].id + 1
    }
    state.response.carrierTollReports.push(single)
    console.log(single, state.response.carrierTollReports)
  },
  SET_ADD_REPORT: (state, request:SetReportRequest) => {
    if (request.report) {
      state.request.report = request.report as TollReport
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<TollReportsState, RootStoreState> = {
  fillRequest ({ commit }, request: TollReport) {
    commit('FILL_REPORT_REQUEST', request)
  },
  setReport ({ commit }, request:SetReportRequest) {
    commit('SET_ADD_REPORT', request)
  },
  async addTollReports ({ commit }, request:TollReport) {
    commit('SET_LOADING', true)
    try {
      return await service.add<TollReport, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
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
  async getTollReportsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<TollReport[]>('tallReport', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_REPORT', (response.data as DataResponse<TollReport[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_REPORT', tollReport)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTollReport ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<TollReport[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_REPORT', (response.data as DataResponse<TollReport[]>).data[0])
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
  async getTollReports ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      console.log('payload', payload)

      return await service.get<TollReport[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_REPORTS', (response.data as DataResponse<TollReport[]>).data)
          } else {
            commit('SET_REPORTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<TollReport[]>).total_pages)
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
  async updateTollReports ({ commit, getters }, request:TollReport) {
    commit('SET_LOADING', true)
    try {
      return await service.update<TollReport, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_REPORT', request)
          commit('SET_REPORTS', getters.reports.map((item: TollReport) => item.id === request.id ? request : item))
          commit('SET_CARRIER_REPORTS', getters.carrierTollReports.map((item: TollReport) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_REPORT', request)
      commit('SET_REPORTS', getters.reports.map((item: TollReport) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeTollReports ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_REPORT')
          commit('REMOVE_REPORTS', getters.reports.filter((item: TollReport) => item.id !== id))
          commit('SET_CARRIER_REPORTS', getters.carrierTollReports.filter((item: TollReport) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_REPORTS', getters.reports.filter((item:TollReport) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
