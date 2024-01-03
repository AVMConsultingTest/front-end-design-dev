import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { PayrollMetricsSummary } from '~/models/accounting/payrollMetricsSummary/PayrollMetricsSummary'
import payrollMetricsSummary from '~/static/DummyData/Accounting/payrollMetricsSummary'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    payrollMetrics: {} as PayrollMetricsSummary
  },
  response: {
    payrollMetric: {} as PayrollMetricsSummary,
    payrollMetrics: [] as PayrollMetricsSummary[],
    carrierPayrollMetrics: payrollMetricsSummary as PayrollMetricsSummary[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/payroll/summary'

export type PayrollMetricsSummaryState = ReturnType<typeof state>

export const getters: GetterTree<PayrollMetricsSummaryState, RootStoreState> = {
  payrollRequest: state => (state.request.payrollMetrics),
  payrollMetric: state => (state.response.payrollMetric),
  payrollMetrics: state => (state.response.payrollMetrics),
  carrierPayrollMetrics: state => (state.response.carrierPayrollMetrics),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<PayrollMetricsSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_PAYROLL_REQUEST: (state, request:PayrollMetricsSummary) => (state.request.payrollMetrics = { ...state.request.payrollMetrics, ...request }),
  SET_CARRIER_PAYROLL_METRIC: (state, list:PayrollMetricsSummary[]) => (state.response.carrierPayrollMetrics = list),
  SET_PAYROLL_METRIC: (state, single:PayrollMetricsSummary) => (state.response.payrollMetric = single),
  SET_PAYROLL_METRICS: (state, list:PayrollMetricsSummary[]) => (state.response.payrollMetrics = list),
  REMOVE_PAYROLL: state => (state.response.payrollMetric = {} as PayrollMetricsSummary)
}

export const actions: ActionTree<PayrollMetricsSummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: PayrollMetricsSummary) {
    commit('FILL_PAYROLL_REQUEST', request)
  },
  async addPayrollMetric ({ commit }, request:PayrollMetricsSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<PayrollMetricsSummary, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYROLL_METRIC', request)
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
  async getPayrollMetricsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<PayrollMetricsSummary>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_PAYROLL_METRIC', (response.data as DataResponse<PayrollMetricsSummary>))
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_PAYROLL_METRIC', payrollMetricsSummary)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getPayrollMetric ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      console.log('id', id)

      return await service.single<PayrollMetricsSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYROLL_METRIC', (response.data as DataResponse<PayrollMetricsSummary[]>).data[0])
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
  async getpayrollMetrics ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<PayrollMetricsSummary[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_PAYROLL_MATRICS', (response.data as DataResponse<PayrollMetricsSummary[]>).data)
          } else {
            commit('SET_PAYROLL_MATRICS', [] as PayrollMetricsSummary[])
          }
          commit('SET_PAGE', (response.data as DataResponse<PayrollMetricsSummary[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_PAYROLL_MATRICS', [] as PayrollMetricsSummary[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updatePayrollMetric ({ commit, getters }, request:PayrollMetricsSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<PayrollMetricsSummary, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYROLL_MATRIC', request)
          commit('SET_PAYROLL_MATRICS', getters.payrollMetricss.map((item: PayrollMetricsSummary) => item.id === request.id ? request : item))
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
  async removePayrollMetric ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_PAYROLL')
          commit('SET_PAYROLL_METRICS', getters.payrollMetricss.filter((item: PayrollMetricsSummary) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING, false') }, 200)
    }
  }
}
