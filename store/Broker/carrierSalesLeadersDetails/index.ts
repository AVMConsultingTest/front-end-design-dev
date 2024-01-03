import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { CarrierSalesLeaders } from '~/models/Broker/carrierSalesLeaders/carrierSalesLeaders'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    salesLeader: {} as CarrierSalesLeaders
  },
  response: {
    salesLeader: {} as CarrierSalesLeaders,
    salesLeaders: [] as CarrierSalesLeaders[],
    brokerSalesLeaders: [] as CarrierSalesLeaders[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'CarrierSalesLeadersDetails'

export type CarrierSalesLeadersState = ReturnType<typeof state>

export const getters: GetterTree<CarrierSalesLeadersState, RootStoreState> = {
  salesLeaderBoardRequest: state => (state.request.salesLeader),
  salesLeader: state => (state.response.salesLeader),
  salesLeaders: state => (state.response.salesLeaders),
  brokerSalesLeaders: state => (state.response.brokerSalesLeaders),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<CarrierSalesLeadersState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_SALESLEADER: (state, single: CarrierSalesLeaders) => {
    if (single.id === undefined && state.response.salesLeaders.length < 12) {
      single.id = state.response.salesLeaders[state.response.salesLeaders.length - 1].id + 1
      state.response.salesLeaders.push(single)
    }
    console.log(single, state.response.salesLeaders)
  },
  FILL_SALESLEADER_REQUEST: (state, request:CarrierSalesLeaders) => (state.request.salesLeader = { ...state.request.salesLeader, ...request }),
  SET_BROKER_SALESLEADER: (state, list:CarrierSalesLeaders[]) => (state.response.brokerSalesLeaders = list),
  SET_SALESLEADER: (state, single:CarrierSalesLeaders) => (state.response.salesLeader = single),
  SET_SALESLEADERS: (state, list:CarrierSalesLeaders[]) => (state.response.salesLeaders = list),
  REMOVE_SALESLEADER: state => (state.response.salesLeader = {} as CarrierSalesLeaders),
  UPDATE_SALESLEADER: (state, single:CarrierSalesLeaders) => {
    const itemIndex = state.response.salesLeaders.findIndex((item: CarrierSalesLeaders) => item.id === single.id)
    state.response.salesLeaders[itemIndex] = single
  }
}

export const actions: ActionTree<CarrierSalesLeadersState, RootStoreState> = {
  fillRequest ({ commit }, request: CarrierSalesLeaders) {
    commit('FILL_SALESLEADER_REQUEST', request)
  },
  async getSalesLeaders ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<CarrierSalesLeaders[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_SALESLEADERS', (response.data as DataResponse<CarrierSalesLeaders[]>).data)
          } else {
            commit('SET_SALESLEADERS', [] as CarrierSalesLeaders[])
          }
          commit('SET_PAGE', (response.data as DataResponse<CarrierSalesLeaders[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_SALESLEADERS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSalesLeaderByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<CarrierSalesLeaders[]>('CarrierSalesLeadersDetails', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_SALESLEADER', (response.data as DataResponse<CarrierSalesLeaders[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<CarrierSalesLeaders[]>).total_pages)
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
