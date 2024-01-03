import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { ContractRatesDetails } from '~/models/Broker/contractRates/contractRatesDetails'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    contract: {} as ContractRatesDetails
  },
  response: {
    contract: {} as ContractRatesDetails,
    contracts: [] as ContractRatesDetails[],
    brokerContracts: [] as ContractRatesDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'ContractRatesDetails'

export type ContractRatesDetailsState = ReturnType<typeof state>

export const getters: GetterTree<ContractRatesDetailsState, RootStoreState> = {
  contractBoardRequest: state => (state.request.contract),
  contract: state => (state.response.contract),
  contracts: state => (state.response.contracts),
  brokerContracts: state => (state.response.brokerContracts),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ContractRatesDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_CONTRACT: (state, single: ContractRatesDetails) => {
    if (single.id === undefined && state.response.brokerContracts.length < 12) {
      single.id = state.response.brokerContracts[state.response.brokerContracts.length - 1].id + 1
      state.response.brokerContracts.push(single)
    }
    console.log(single, state.response.brokerContracts)
  },
  FILL_CONTRACT_REQUEST: (state, request:ContractRatesDetails) => (state.request.contract = { ...state.request.contract, ...request }),
  SET_BROKER_CONTRACTS: (state, list:ContractRatesDetails[]) => (state.response.brokerContracts = list),
  SET_CONTRACT: (state, single:ContractRatesDetails) => (state.response.contract = single),
  SET_CONTRACTS: (state, list:ContractRatesDetails[]) => (state.response.contracts = list),
  REMOVE_CONTRACT: state => (state.response.contract = {} as ContractRatesDetails),
  UPDATE_CONTRACT: (state, single:ContractRatesDetails) => {
    const itemIndex = state.response.contracts.findIndex((item: ContractRatesDetails) => item.id === single.id)
    state.response.contracts[itemIndex] = single
  }
}

export const actions: ActionTree<ContractRatesDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: ContractRatesDetails) {
    commit('FILL_CONTRACT_REQUEST', request)
  },
  async addContract ({ commit }, request:ContractRatesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ContractRatesDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_CONTRACT', request)
        } else {
          commit('ADD_CONTRACT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_CONTRACT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getContractByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ContractRatesDetails[]>('ContractRatesDetails', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_CONTRACTS', (response.data as DataResponse<ContractRatesDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<ContractRatesDetails[]>).total_pages)
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
  async getContract ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ContractRatesDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_CONTRACT', (response.data as DataResponse<ContractRatesDetails[]>).data[0])
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
  async getContracts ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ContractRatesDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_CONTRACTS', (response.data as DataResponse<ContractRatesDetails[]>).data)
          } else {
            commit('SET_CONTRACTS', [] as ContractRatesDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<ContractRatesDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CONTRACTS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateContract ({ commit, getters }, request:ContractRatesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ContractRatesDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_CONTRACT', request)
          commit('SET_CONTRACT', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_CONTRACT', request)
      commit('SET_CONTRACTS', getters.contracts.map((item: ContractRatesDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeContract ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_CONTRACT')
          commit('SET_CONTRACTS', getters.contracts.filter((item: ContractRatesDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CONTRACT', getters.contracts.filter((item:ContractRatesDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
