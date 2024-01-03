import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { GrossBoardDetails } from '~/models/DISPATCH/grossBoard/grossBoardDetails'
import grossBoard from '~/static/DummyData/Dispatch/grossBoard'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    gross: {} as GrossBoardDetails
  },
  response: {
    gross: {} as GrossBoardDetails,
    grosses: [] as GrossBoardDetails[],
    carrierGrosses: grossBoard as GrossBoardDetails[]

  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'GrossBoardDetails'

export type GrossBoardDetailsState = ReturnType<typeof state>

export const getters: GetterTree<GrossBoardDetailsState, RootStoreState> = {
  grossRequest: state => (state.request.gross),
  gross: state => (state.request.gross),
  grosses: state => (state.response.grosses),
  pageCount: state => (state.page),
  carrierGrosses: state => (state.response.carrierGrosses)

}

export const mutations: MutationTree<GrossBoardDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_GROSS_REQUEST: (state, request:GrossBoardDetails) => (state.request.gross = { ...state.request.gross, ...request }),
  SET_CARRIER_GROSSES: (state, list:GrossBoardDetails[]) => (state.response.carrierGrosses = list),
  SET_GROSS: (state, single:GrossBoardDetails) => (state.response.gross = single),
  SET_GROSSES: (state, list:GrossBoardDetails[]) => (state.response.grosses = list),
  REMOVE_GROSS: state => (state.response.gross = {} as GrossBoardDetails)
}

export const actions: ActionTree<GrossBoardDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: GrossBoardDetails) {
    commit('FILL_GROSS_REQUEST', request)
  },
  async getGrosses ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<GrossBoardDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_GROSSES', (response.data as DataResponse<GrossBoardDetails[]>).data)
          } else {
            commit('SET_GROSSES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<GrossBoardDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_GROSSES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getGrossesByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<GrossBoardDetails[]>('grossBoard', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_GROSSES', (response.data as DataResponse<GrossBoardDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<GrossBoardDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_GROSSES', grossBoard)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
