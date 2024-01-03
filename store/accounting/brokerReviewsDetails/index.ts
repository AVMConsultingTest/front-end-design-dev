import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { BrokerReviewsDetails } from '~/models/accounting/brokerReviewsDetails'
import brokerReviews from '~/static/DummyData/Accounting/brokerReviews'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    brokerReview: {} as BrokerReviewsDetails
  },
  response: {
    brokerReview: {} as BrokerReviewsDetails,
    brokerReviews: brokerReviews as BrokerReviewsDetails[],
    carrierBrokerReviews: [] as BrokerReviewsDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'BrokerReviewsDetails'

export type BrokerReviewsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<BrokerReviewsDetailsState, RootStoreState> = {
  brokerReviewRequest: state => (state.request.brokerReview),
  brokerReview: state => (state.response.brokerReview),
  brokerReviews: state => (state.response.brokerReviews),
  carrierBrokerReviews: state => (state.response.carrierBrokerReviews),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<BrokerReviewsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_BROKERREVIEW_REQUEST: (state, request:BrokerReviewsDetails) => (state.request.brokerReview = { ...state.request.brokerReview, ...request }),
  SET_CARRIER_BROKERREVIEWS: (state, list:BrokerReviewsDetails[]) => (state.response.carrierBrokerReviews = list),
  SET_BROKERREVIEW: (state, single:BrokerReviewsDetails) => (state.response.brokerReview = single),
  SET_BROKERREVIEWS: (state, list:BrokerReviewsDetails[]) => (state.response.brokerReviews = list),
  REMOVE_BROKERREVIEW: state => (state.response.brokerReview = {} as BrokerReviewsDetails)
}

export const actions: ActionTree<BrokerReviewsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: BrokerReviewsDetails) {
    commit('FILL_BROKERREVIEW_REQUEST', request)
  },
  async getBrokerReviewsById ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      console.log('id', id)

      return await service.single<BrokerReviewsDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_BROKERREVIEWS', (response.data as DataResponse<BrokerReviewsDetails[]>).data)
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
  async getBrokerReviewsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<BrokerReviewsDetails[]>('brokerReviews', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_BROKERREVIEWS', (response.data as DataResponse<BrokerReviewsDetails[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_BROKERREVIEWS', brokerReviews)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
