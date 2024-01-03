import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { LoadBoardDetails } from '~/models/Marketplace/LoadBoardDetails/LoadBoardDetails'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    load: {} as LoadBoardDetails
  },
  response: {
    load: {} as LoadBoardDetails,
    loads: [] as LoadBoardDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/loads'

export type LoadBoardDetailsState = ReturnType<typeof state>

export const getters: GetterTree<LoadBoardDetailsState, RootStoreState> = {
  loadBoardRequest: state => (state.request.load),
  load: state => (state.response.load),
  loads: state => (state.response.loads),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<LoadBoardDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_LOAD: (state, single: LoadBoardDetails) => {
    if (single.id === undefined && state.response.loads.length < 12) {
      single.id = state.response.loads[state.response.loads.length - 1].id + 1
      state.response.loads.push(single)
    }
    console.log(single, state.response.loads)
  },
  FILL_LOAD_REQUEST: (state, request:LoadBoardDetails) => (state.request.load = { ...state.request.load, ...request }),
  SET_LOAD: (state, single:LoadBoardDetails) => (state.response.load = single),
  SET_LOADS: (state, list:LoadBoardDetails[]) => (state.response.loads = list),
  REMOVE_LOAD: state => (state.response.load = {} as LoadBoardDetails),
  UPDATE_LOAD: (state, single:LoadBoardDetails) => {
    const itemIndex = state.response.loads.findIndex((item: LoadBoardDetails) => item.id === single.id)
    state.response.loads[itemIndex] = single
  }
}

export const actions: ActionTree<LoadBoardDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: LoadBoardDetails) {
    commit('FILL_LOAD_REQUEST', request)
  },
  async getLoads ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<LoadBoardDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_LOADS', (response.data as DataResponse<LoadBoardDetails[]>).data)
          } else {
            commit('SET_LOADS', [] as LoadBoardDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<LoadBoardDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_LOADS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
