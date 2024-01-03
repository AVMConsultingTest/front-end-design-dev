import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { PayrollFinancialSummary } from '~/models/accounting/payrollFinancialSummary/payrollFinancialSummary'
import payrollFinancialSummary from '~/static/DummyData/Accounting/payrollFinancialSummary'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    payrollFinancialMetric: {} as PayrollFinancialSummary
  },
  response: {
    payrollFinancialMetric: {} as PayrollFinancialSummary,
    payrollFinancialMetrics: [] as PayrollFinancialSummary[],
    carrierPayrollFinancialMetrics: payrollFinancialSummary as PayrollFinancialSummary[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'payroll/summary'

export type PayrollFinancialSummaryState = ReturnType<typeof state>

export const getters: GetterTree<PayrollFinancialSummaryState, RootStoreState> = {
  payrollFinancialMetricRequest: state => (state.request.payrollFinancialMetric),
  payrollFinancialMetric: state => (state.response.payrollFinancialMetric),
  payrollFinancialMetrics: state => (state.response.payrollFinancialMetrics),
  carrierPayrollFinancialMetrics: state => (state.response.carrierPayrollFinancialMetrics),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<PayrollFinancialSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_PAYROLL_METRIC_REQUEST: (state, request:PayrollFinancialSummary) => (state.request.payrollFinancialMetric = { ...state.request.payrollFinancialMetric, ...request }),
  SET_CARRIER_PAYROLL_METRICS: (state, list:PayrollFinancialSummary[]) => (state.response.carrierPayrollFinancialMetrics = list),
  SET_PAYROLL_METRIC: (state, single:PayrollFinancialSummary) => (state.response.payrollFinancialMetric = single),
  SET_PAYROLL_METRICS: (state, list:PayrollFinancialSummary[]) => (state.response.payrollFinancialMetrics = list),
  REMOVE_PAYROLL_METRIC: state => (state.response.payrollFinancialMetric = {} as PayrollFinancialSummary)
}

export const actions: ActionTree<PayrollFinancialSummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: PayrollFinancialSummary) {
    commit('FILL_PAYROLL_METRIC_REQUEST', request)
  },
  async getFinancialMetric ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      console.log('id', id)
      return await service.single<PayrollFinancialSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_PAYROLL_METRIC', (response.data as DataResponse<PayrollFinancialSummary[]>).data[0])
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
  async getFinancialMetricByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<PayrollFinancialSummary>('payroll/summary', payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_PAYROLL_METRICS', (response.data as DataResponse<PayrollFinancialSummary>))
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_PAYROLL_METRICS', payrollFinancialSummary)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
