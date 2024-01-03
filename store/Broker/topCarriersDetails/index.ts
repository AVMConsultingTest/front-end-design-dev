import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { TopCarriersDetails } from '~/models/Broker/topCarriers/topCarriers'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    carrier: {} as TopCarriersDetails
  },
  response: {
    carrier: {} as TopCarriersDetails,
    carriers: [] as TopCarriersDetails[],
    brokerCarriers: [] as TopCarriersDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'TopCarriersDetails'

export type TopCarriersState = ReturnType<typeof state>

export const getters: GetterTree<TopCarriersState, RootStoreState> = {
  carrierBoardRequest: state => (state.request.carrier),
  carrier: state => (state.response.carrier),
  carriers: state => (state.response.carriers),
  brokerCarriers: state => (state.response.brokerCarriers),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<TopCarriersState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_CARRIER: (state, single: TopCarriersDetails) => {
    if (single.id === undefined && state.response.carriers.length < 12) {
      single.id = state.response.carriers[state.response.carriers.length - 1].id + 1
      state.response.carriers.push(single)
    }
    console.log(single, state.response.carriers)
  },
  FILL_CARRIER_REQUEST: (state, request:TopCarriersDetails) => (state.request.carrier = { ...state.request.carrier, ...request }),
  SET_BROKER_CARRIERS: (state, list:TopCarriersDetails[]) => (state.response.brokerCarriers = list),
  SET_CARRIER: (state, single:TopCarriersDetails) => (state.response.carrier = single),
  SET_CARRIERS: (state, list:TopCarriersDetails[]) => (state.response.carriers = list),
  REMOVE_CARRIER: state => (state.response.carrier = {} as TopCarriersDetails),
  UPDATE_CARRIER: (state, single:TopCarriersDetails) => {
    const itemIndex = state.response.carriers.findIndex((item: TopCarriersDetails) => item.id === single.id)
    state.response.carriers[itemIndex] = single
  }
}

export const actions: ActionTree<TopCarriersState, RootStoreState> = {
  async getCarriers ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<TopCarriersDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_CARRIERS', (response.data as DataResponse<TopCarriersDetails[]>).data)
          } else {
            commit('SET_CARRIERS', [] as TopCarriersDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<TopCarriersDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CARRIERS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCarriersByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<TopCarriersDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_CARRIERS', (response.data as DataResponse<TopCarriersDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<TopCarriersDetails[]>).total_pages)
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
