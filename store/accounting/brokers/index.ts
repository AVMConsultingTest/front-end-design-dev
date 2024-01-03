import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { BrokersDetails } from '~/models/accounting/brokers/brokersDetails'
import brokersDetails from '~/static/DummyData/Accounting/brokers'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    broker: {} as BrokersDetails
  },
  response: {
    broker: brokersDetails[0] as BrokersDetails,
    brokers: [] as BrokersDetails[],
    carrierBrokers: brokersDetails as BrokersDetails[]
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

export interface SetBrokerRequest {
  broker: BrokersDetails
  step?:number,
  title?:string
}

export const endPoint = 'carrier/brokers'

export type BrokersDetailsState = ReturnType<typeof state>

export const getters: GetterTree<BrokersDetailsState, RootStoreState> = {
  brokerRequest: state => (state.request.broker),
  broker: state => (state.response.broker),
  brokers: state => (state.response.brokers),
  carrierBrokers: state => (state.response.carrierBrokers),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<BrokersDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_BROKER_REQUEST: (state, request:BrokersDetails) => (state.request.broker = { ...state.request.broker, ...request }),
  SET_CARRIER_BROKERS: (state, list:BrokersDetails[]) => (state.response.carrierBrokers = list),
  SET_BROKER: (state, single:BrokersDetails) => (state.response.broker = single),
  SET_BROKERS: (state, list:BrokersDetails[]) => (state.response.brokers = list),
  REMOVE_BROKER: state => (state.response.broker = {} as BrokersDetails),
  UPDATE_BROKER: (state, single:BrokersDetails) => {
    const itemIndex = state.response.brokers.findIndex((item: BrokersDetails) => item.id === single.id)
    state.response.brokers[itemIndex] = single
    const carrierItemIndex = state.response.carrierBrokers.findIndex((item: BrokersDetails) => item.id === single.id)
    state.response.carrierBrokers[carrierItemIndex] = single
  },
  ADD_BROKER: (state, single: BrokersDetails) => {
    if (single.id === undefined) {
      single.id = state.response.carrierBrokers[state.response.carrierBrokers.length - 1].id + 1
    }
    state.response.carrierBrokers.push(single)
    console.log(single, state.response.carrierBrokers)
  },
  SET_ADD_BROKER: (state, request:SetBrokerRequest) => {
    if (request.broker) {
      state.request.broker = request.broker as BrokersDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }

}

export const actions: ActionTree<BrokersDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: BrokersDetails) {
    commit('FILL_BROKER_REQUEST', request)
  },
  setBroker ({ commit }, request:SetBrokerRequest) {
    commit('SET_ADD_BROKER', request)
  },
  async addBroker ({ commit }, request:BrokersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<BrokersDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_BROKER', request)
        } else {
          commit('ADD_BROKER', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getBrokersByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<BrokersDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_BROKERS', (response.data as DataResponse<BrokersDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<BrokersDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_BROKERS', brokersDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getBroker ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<BrokersDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_BROKER', (response.data as DataResponse<BrokersDetails>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_BROKER', brokersDetails[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getBrokers ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<BrokersDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_BROKERS', (response.data as DataResponse<BrokersDetails[]>).data)
          } else {
            commit('SET_BROKERS', [] as BrokersDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<BrokersDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_BROKERS', [] as BrokersDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateBroker ({ commit, getters }, request:BrokersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<BrokersDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_BROKER', request)
          commit('SET_CARRIER_BROKERS', getters.carrierBrokers.map((item: BrokersDetails) => item.id === request.id ? request : item))
          commit('SET_BROKERS', getters.brokers.map((item: BrokersDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_APPLICANT', request)
          commit('SET_CARRIER_BROKERS', getters.carrierBrokers.map((item: BrokersDetails) => item.id === request.id ? request : item))
          commit('SET_BROKERS', getters.brokers.map((item: BrokersDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_BROKER', request)
      commit('SET_CARRIER_BROKERS', getters.carrierBrokers.map((item: BrokersDetails) => item.id === request.id ? request : item))
      commit('SET_BROKERS', getters.brokers.map((item: BrokersDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeBroker ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_BROKER')
          commit('SET_BROKERS', getters.brokers.filter((item: BrokersDetails) => item.id !== id))
          commit('SET_CARRIER_BROKERS', getters.carrierBrokers.filter((item: BrokersDetails) => item.id !== id))
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
