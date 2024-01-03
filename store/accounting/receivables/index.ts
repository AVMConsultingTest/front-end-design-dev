import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { ReceivablesSummary } from '~/models/accounting/receivables/receivablesSummary'
import receivablesSummary from '~/static/DummyData/Accounting/receivablesSummary'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    receivable: {} as ReceivablesSummary
  },
  response: {
    receivable: {} as ReceivablesSummary,
    receivables: [] as ReceivablesSummary[],
    carrierReceivables: receivablesSummary as ReceivablesSummary[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'ReceivablesSummary'

export type ReceivablesSummaryState = ReturnType<typeof state>

export const getters: GetterTree<ReceivablesSummaryState, RootStoreState> = {
  receivableRequest: state => (state.request.receivable),
  receivable: state => (state.response.receivable),
  receivables: state => (state.response.receivables),
  carrierReceivables: state => (state.response.carrierReceivables),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ReceivablesSummaryState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECEIVABLE_REQUEST: (state, request:ReceivablesSummary) => (state.request.receivable = { ...state.request.receivable, ...request }),
  SET_CARRIER_RECEIVABLES: (state, list:ReceivablesSummary[]) => (state.response.carrierReceivables = list),
  SET_RECEIVABLE: (state, single:ReceivablesSummary) => (state.response.receivable = single),
  SET_RECEIVABLES: (state, list:ReceivablesSummary[]) => (state.response.receivables = list),
  REMOVE_RECEIVABLE: state => (state.response.receivable = {} as ReceivablesSummary)
}

export const actions: ActionTree<ReceivablesSummaryState, RootStoreState> = {
  fillRequest ({ commit }, request: ReceivablesSummary) {
    commit('FILL_RECEIVABLE_REQUEST', request)
  },
  async addReceivable ({ commit }, request:ReceivablesSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ReceivablesSummary, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_RECEIVABLE', request)
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
  async getReceivablesByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ReceivablesSummary[]>('receivables', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECEIVABLES', (response.data as DataResponse<ReceivablesSummary[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_RECEIVABLES', receivablesSummary)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getReceivable ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      console.log('id', id)

      return await service.single<ReceivablesSummary[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_RECEIVABLE', (response.data as DataResponse<ReceivablesSummary[]>).data[0])
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
  async getReceivables ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ReceivablesSummary[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_RECEIVABLES', (response.data as DataResponse<ReceivablesSummary[]>).data)
          } else {
            commit('SET_RECEIVABLES', [] as ReceivablesSummary[])
          }
          commit('SET_PAGE', (response.data as DataResponse<ReceivablesSummary[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_RECEIVABLES', [] as ReceivablesSummary[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateReceivable ({ commit, getters }, request:ReceivablesSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ReceivablesSummary, APIResponse>(endPoint, request.id ?? 0, request).then((response) => {
        if (response.status === 200) {
          commit('SET_RECEIVABLE', request)
          commit('SET_RECEIVABLES', getters.receivables.map((item: ReceivablesSummary) => item.id === request.id ? request : item))
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
  async removeReceivable ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_RECEIVABLE')
          commit('SET_RECEIVABLES', getters.receivables.filter((item: ReceivablesSummary) => item.id !== id))
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
