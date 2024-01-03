import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { OperationalTransactionsDetails } from '~/models/accounting/operationalTransactions/operationalTransactionsDetails'
import operationalTransactions from '~/static/DummyData/Accounting/operationalPayments'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    operational: {} as OperationalTransactionsDetails
  },
  response: {
    operational: {} as OperationalTransactionsDetails,
    operationals: [] as OperationalTransactionsDetails[],
    carrierOperationals: operationalTransactions as OperationalTransactionsDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'OperationalTransactionsDetails'

export type OperationalTransactionsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<OperationalTransactionsDetailsState, RootStoreState> = {
  operationalRequest: state => (state.request.operational),
  operational: state => (state.response.operational),
  operationals: state => (state.response.operationals),
  carrierOperationals: state => (state.response.carrierOperationals),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<OperationalTransactionsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_OPERATIONAL: (state, single: OperationalTransactionsDetails) => {
    if (single.id === undefined && state.response.operationals.length < 12) {
      single.id = state.response.operationals[state.response.operationals.length - 1].id + 1
      state.response.operationals.push(single)
    }
    console.log(single, state.response.operationals)
  },
  FILL_OPERATIONAL_REQUEST: (state, request:OperationalTransactionsDetails) => (state.request.operational = { ...state.request.operational, ...request }),
  SET_CARRIER_OPERATIONALS: (state, list:OperationalTransactionsDetails[]) => (state.response.carrierOperationals = list),
  SET_OPERATIONAL: (state, single:OperationalTransactionsDetails) => (state.response.operational = single),
  SET_OPERATIONALS: (state, list:OperationalTransactionsDetails[]) => (state.response.operationals = list),
  REMOVE_OPERATIONAL: state => (state.response.operational = {} as OperationalTransactionsDetails),
  UPDATE_OPERATIONAL: (state, single:OperationalTransactionsDetails) => {
    const itemIndex = state.response.operationals.findIndex((item: OperationalTransactionsDetails) => item.id === single.id)
    state.response.operationals[itemIndex] = single
  }
}

export const actions: ActionTree<OperationalTransactionsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: OperationalTransactionsDetails) {
    commit('FILL_OPERATIONAL_REQUEST', request)
  },
  async addOperational ({ commit }, request:OperationalTransactionsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<OperationalTransactionsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_OPERATIONAL', request)
        } else {
          commit('ADD_OPERATIONAL', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_OPERATIONAL', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getOperationalsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<OperationalTransactionsDetails[]>('operationalPayments', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_OPERATIONALS', (response.data as DataResponse<OperationalTransactionsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<OperationalTransactionsDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_OPERATIONALS', operationalTransactions)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getOperational ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<OperationalTransactionsDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_OPERATIONAL', (response.data as DataResponse<OperationalTransactionsDetails[]>).data[0])
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
  async getOperationals ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<OperationalTransactionsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_OPERATIONALS', (response.data as DataResponse<OperationalTransactionsDetails[]>).data)
          } else {
            commit('SET_OPERATIONALS', [] as OperationalTransactionsDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<OperationalTransactionsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_OPERATIONALS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateOperational ({ commit, getters }, request:OperationalTransactionsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<OperationalTransactionsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_OPERATIONAL', request)
          commit('SET_ASSET', request)
          commit('SET_OPERATIONAL', getters.operationals.map((item: OperationalTransactionsDetails) => item.id === request.id ? request : item))
          commit('SET_CARRIER_OPERATIONALS', getters.carrierOperationals.map((item: OperationalTransactionsDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_OPERATIONAL', request)
      commit('SET_OPERATIONALS', getters.operationals.map((item: OperationalTransactionsDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeOperational ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_OPERATIONAL')
          commit('SET_OPERATIONALS', getters.operationals.filter((item: OperationalTransactionsDetails) => item.id !== id))
          commit('SET_CARRIER_OPERATIONALS', getters.carrierOperationals.filter((item: OperationalTransactionsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_OPERATIONALS', getters.operationals.filter((item:OperationalTransactionsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
