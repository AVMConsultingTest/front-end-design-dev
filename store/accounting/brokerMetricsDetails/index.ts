import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { BrokerMetricsDetails } from '~/models/accounting/brokerMetricsDetails'
import brokerMetricsDetails from '~/static/DummyData/Accounting/brokerMetrics'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    brokerMetric: {} as BrokerMetricsDetails
  },
  response: {
    brokerMetric: brokerMetricsDetails[0] as BrokerMetricsDetails,
    brokerMetrics: [] as BrokerMetricsDetails[],
    carrierBrokerMetrics: [] as BrokerMetricsDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'BrokerMetricsDetails'

export type BrokerMetricsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<BrokerMetricsDetailsState, RootStoreState> = {
  brokerMetricRequest: state => (state.request.brokerMetric),
  brokerMetric: state => (state.response.brokerMetric),
  brokerMetrics: state => (state.response.brokerMetrics),
  carrierBrokerMetrics: state => (state.response.carrierBrokerMetrics),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<BrokerMetricsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_BROKERMETRIC_REQUEST: (state, request:BrokerMetricsDetails) => (state.request.brokerMetric = { ...state.request.brokerMetric, ...request }),
  SET_CARRIER_BROKERMETRICS: (state, list:BrokerMetricsDetails[]) => (state.response.carrierBrokerMetrics = list),
  SET_BROKERMETRIC: (state, single:BrokerMetricsDetails) => (state.response.brokerMetric = single),
  SET_BROKERMETRICS: (state, list:BrokerMetricsDetails[]) => (state.response.brokerMetrics = list),
  REMOVE_BROKERMETRIC: state => (state.response.brokerMetric = {} as BrokerMetricsDetails)
}

export const actions: ActionTree<BrokerMetricsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: BrokerMetricsDetails) {
    commit('FILL_BROKERMETRIC_REQUEST', request)
  },
  async getBrokerMetric ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      console.log('id', id)

      return await service.single<BrokerMetricsDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_BROKERMETRIC', (response.data as DataResponse<BrokerMetricsDetails[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_BROKERMETRIC', brokerMetricsDetails[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getBrokerMetricsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<BrokerMetricsDetails[]>('brokerMetrics', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_BROKERMETRICS', (response.data as DataResponse<BrokerMetricsDetails[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
