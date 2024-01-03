import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { TransactionsDetails } from '~/models/CarrierSettings/transactionsDetails/transactionsDetails'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService('/carrier_settings_api')

export const state = () => ({
  request: {
    transaction: {} as TransactionsDetails
  },
  response: {
    transaction: {} as TransactionsDetails,
    transactions: [] as TransactionsDetails[],
    carrierTransactions: [] as TransactionsDetails[]
  },
  page: 0,
  loading: false,
  error: '',
  addStep: {
    index: 0,
    title: '',
    subTitle: ''
  }
})

export interface SetTransactionsRequest {
    transaction?:null|TransactionsDetails,
    step?:number,
    title?:string
}

const endPoint = '/TransactionsDetails'

export type TransactionsState = ReturnType<typeof state>

export const getters: GetterTree<TransactionsState, RootStoreState> = {
  transactionRequest: state => (state.request),
  transaction: state => (state.response.transaction),
  transactions: state => (state.response.transactions),
  carrierTransactions: state => (state.response.carrierTransactions),
  step: state => (state.addStep),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<TransactionsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_TRANSACTION_REQUEST: (state, request:TransactionsDetails) => (state.request.transaction = { ...state.request.transaction, ...request }),
  SET_TRANSACTION: (state, single:TransactionsDetails) => (state.response.transaction = single),
  SET_TRANSACTIONS: (state, list:TransactionsDetails[]) => (state.response.transactions = list),
  REMOVE_TRANSACTION: state => (state.response.transaction = {} as TransactionsDetails),
  SET_CARRIER_TRANSACTIONS: (state, list:TransactionsDetails[]) => (state.response.carrierTransactions = list),
  ADD_TRANSACTION: (state, single:TransactionsDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierTransactions.length < 12) {
        single.id = state.response.carrierTransactions[state.response.carrierTransactions.length - 1].id + 1
        state.response.carrierTransactions.push(single)
      }
    }
  },
  UPDATE_TRANSACTION: (state, single:TransactionsDetails) => {
    const itemIndex = state.response.transactions.findIndex((item: TransactionsDetails) => item.id === single.id)
    state.response.transactions[itemIndex] = single
    const carrierItemIndex = state.response.carrierTransactions.findIndex((item: TransactionsDetails) => item.id === single.id)
    state.response.carrierTransactions[carrierItemIndex] = single
  },
  SET_ADD_TRANSACTION (state, request:SetTransactionsRequest) {
    if (request.transaction) {
      state.request.transaction = request.transaction as TransactionsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<TransactionsState, RootStoreState> = {
  fillRequest ({ commit }, request: TransactionsDetails) {
    commit('FILL_TRANSACTION_REQUEST', request)
  },
  setTransaction ({ commit }, request:SetTransactionsRequest) {
    commit('SET_ADD_TRANSACTION', request)
  },
  async addTransaction ({ commit }, request:TransactionsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<TransactionsDetails, APIResponse>(endPoint, request).then((response) => {
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
  async updateTransaction ({ commit, getters }, request:TransactionsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<TransactionsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_TRANSACTION', request)
          commit('SET_CARRIER_TRANSACTIONS', getters.carrierTransactions.map((item: TransactionsDetails) => item.id === request.id ? request : item))
          commit('SET_TRANSACTIONS', getters.transactions.map((item: TransactionsDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_TRANSACTION', request)
          commit('SET_TRANSACTIONS', getters.transactions.map((item: TransactionsDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_TRANSACTION', request)
      commit('SET_TRANSACTION', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTransaction ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<TransactionsDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_TRANSACTION', (response.data as DataResponse<TransactionsDetails[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.transaction)
      commit('SET_TRANSACTION', getters.transactions.filter((item: TransactionsDetails) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTransactions ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<TransactionsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_TRANSACTIONS', (response.data as DataResponse<TransactionsDetails[]>).data)
          } else {
            commit('SET_ERROR', [] as TransactionsDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<TransactionsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_TRANSACTIONS', [] as TransactionsDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTransactionByCarrierId ({ commit, rootState }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<TransactionsDetails[]>(endPoint + '/Carriers', rootState.carrierId, payload.page_number, undefined, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_TRANSACTIONS', (response.data as DataResponse<TransactionsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<TransactionsDetails[]>).total_pages)
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
  async removeTransaction ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_TRANSACTION')
          commit('SET_TRANSACTIONS', getters.transactions.filter((item: TransactionsDetails) => item.id !== id))
          commit('SET_CARRIER_TRANSACTIONS', getters.carrierTransactions.filter((item: TransactionsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
