import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { AssetTransactionsDetail } from '~/models/accounting/assetTransactions/assetTransactionsDetails'
import assetTransactions from '~/static/DummyData/Accounting/assetTransactions'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    transaction: {} as AssetTransactionsDetail
  },
  response: {
    transaction: {} as AssetTransactionsDetail,
    transactions: [] as AssetTransactionsDetail[],
    carrierTransactions: assetTransactions as AssetTransactionsDetail[]
  },
  page: 1,
  loading: false,
  error: '',
  addStep: {
    index: 0,
    title: '',
    subTitle: ''
  }
})

export interface SetTransactioNRequest {
  transaction: AssetTransactionsDetail
  step?:number,
  title?:string
}

export const endPoint = 'AssetTransactionsDetails'

export type AssetTransactionsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<AssetTransactionsDetailsState, RootStoreState> = {
  transactionRequest: state => (state.request.transaction),
  transaction: state => (state.response.transaction),
  transactions: state => (state.response.transactions),
  carrierTransactions: state => (state.response.carrierTransactions),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<AssetTransactionsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_TRANSACTION_REQUEST: (state, request:AssetTransactionsDetail) => (state.request.transaction = { ...state.request.transaction, ...request }),
  SET_CARRIER_TRANSACTIONS: (state, list:AssetTransactionsDetail[]) => (state.response.carrierTransactions = list),
  SET_TRANSACTION: (state, single:AssetTransactionsDetail) => (state.response.transaction = single),
  SET_TRANSACTIONS: (state, list:AssetTransactionsDetail[]) => (state.response.transactions = list),
  REMOVE_TRANSACTION: state => (state.response.transaction = {} as AssetTransactionsDetail),
  UPDATE_TRANSACTION: (state, single:AssetTransactionsDetail) => {
    const itemIndex = state.response.transactions.findIndex((item: AssetTransactionsDetail) => item.id === single.id)
    state.response.transactions[itemIndex] = single
    const carrierItemIndex = state.response.carrierTransactions.findIndex((item: AssetTransactionsDetail) => item.id === single.id)
    state.response.carrierTransactions[carrierItemIndex] = single
  },
  ADD_TRANSACTION: (state, single: AssetTransactionsDetail) => {
    if (single.id === undefined) {
      single.id = state.response.carrierTransactions[state.response.carrierTransactions.length - 1].id + 1
    }
    state.response.carrierTransactions.push(single)
    console.log(single, state.response.carrierTransactions)
  },
  SET_ADD_VENDOR: (state, request:SetTransactioNRequest) => {
    if (request.transaction) {
      state.request.transaction = request.transaction as AssetTransactionsDetail
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<AssetTransactionsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: AssetTransactionsDetail) {
    commit('FILL_TRANSACTION_REQUEST', request)
  },
  setTransaction ({ commit }, request:AssetTransactionsDetail) {
    commit('SET_ADD_TRANSACTION', request)
  },
  async addTransaction ({ commit }, request:AssetTransactionsDetail) {
    commit('SET_LOADING', true)
    try {
      return await service.add<AssetTransactionsDetail, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_TRANSACTION', request)
        } else {
          commit('ADD_TRANSACTION', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTransactionsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<AssetTransactionsDetail[]>('assetTransactions', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_TRANSACTIONS', (response.data as DataResponse<AssetTransactionsDetail[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<AssetTransactionsDetail[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_TRANSACTIONS', assetTransactions)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTransaction ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<AssetTransactionsDetail[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_TRANSACTION', (response.data as DataResponse<AssetTransactionsDetail[]>).data[0])
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
  async getTransactions ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<AssetTransactionsDetail[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_TRANSACTIONS', (response.data as DataResponse<AssetTransactionsDetail[]>).data)
          } else {
            commit('SET_TRANSACTIONS', [] as AssetTransactionsDetail[])
          }
          commit('SET_PAGE', (response.data as DataResponse<AssetTransactionsDetail[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_TRANSACTIONS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateTransaction ({ commit, getters }, request:AssetTransactionsDetail) {
    commit('SET_LOADING', true)
    try {
      return await service.update<AssetTransactionsDetail, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_TRANSACTION', request)
          commit('SET_TRANSACTIONS', getters.transactions.map((item: AssetTransactionsDetail) => item.id === request.id ? request : item))
          commit('SET_CARRIER_TRANSACTIONS', getters.carrierTransactions.map((item: AssetTransactionsDetail) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_TRANSACTION', request)
      commit('SET_TRANSACTIONS', getters.transactions.map((item: AssetTransactionsDetail) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeTransaction ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_TRANSACTION')
          commit('SET_TRANSACTIONS', getters.transactions.filter((item: AssetTransactionsDetail) => item.id !== id))
          commit('SET_CARRIER_TRANSACTIONS', getters.carrierTransactions.filter((item: AssetTransactionsDetail) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_TRANSACTIONS', getters.transactions.filter((item:AssetTransactionsDetail) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
