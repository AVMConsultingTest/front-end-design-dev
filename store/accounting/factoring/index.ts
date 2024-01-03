import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { FactoringDetails } from '~/models/accounting/factoringDetails'
import factoringDetails from '~/static/DummyData/Accounting/factoring'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    factoring: {} as FactoringDetails
  },
  response: {
    factoring: {} as FactoringDetails,
    factorings: [] as FactoringDetails[],
    carrierFactoring: factoringDetails as FactoringDetails[]
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

export interface SetFactoringRequest {
  factoring: FactoringDetails
  step?:number,
  title?:string
}

export const endPoint = 'factoring'

export type FactoringDetailsState = ReturnType<typeof state>

export const getters: GetterTree<FactoringDetailsState, RootStoreState> = {
  factoringRequest: state => (state.request.factoring),
  factoring: state => (state.response.factoring),
  factorings: state => (state.response.factorings),
  carrierFactoring: state => (state.response.carrierFactoring),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<FactoringDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_FACTORING_REQUEST: (state, request:FactoringDetails) => (state.request.factoring = { ...state.request.factoring, ...request }),
  SET_CARRIER_FACTORING: (state, list:FactoringDetails[]) => (state.response.carrierFactoring = list),
  SET_FACTORING: (state, single:FactoringDetails) => (state.response.factoring = single),
  SET_FACTORINGS: (state, list:FactoringDetails[]) => (state.response.factorings = list),
  REMOVE_FACTORING: state => (state.response.factoring = {} as FactoringDetails),
  UPDATE_FACTORING: (state, single:FactoringDetails) => {
    // const itemIndex = state.response.factorings.findIndex((item: FactoringDetails) => item.id === single.id)
    // state.response.factorings[itemIndex] = single
    const carrierItemIndex = state.response.carrierFactoring.findIndex((item: FactoringDetails) => item.id === single.id)
    state.response.carrierFactoring[carrierItemIndex] = single
  },
  ADD_FACTORING: (state, single:FactoringDetails) => {
    if (single.id === undefined) {
      single.id = state.response.carrierFactoring[state.response.carrierFactoring.length - 1].id + 1
    }
    state.response.carrierFactoring.push(single)
    console.log(single, state.response.carrierFactoring)
  },
  SET_ADD_FACTORING: (state, request:SetFactoringRequest) => {
    if (request.factoring) {
      state.request.factoring = request.factoring as FactoringDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<FactoringDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: FactoringDetails) {
    commit('FILL_FACTORING_REQUEST', request)
  },
  setFactoring ({ commit }, request:SetFactoringRequest) {
    commit('SET_ADD_FACTORING', request)
  },
  async addFactoring ({ commit }, request:FactoringDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<FactoringDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_FACTORING', request)
        } else {
          commit('ADD_FACTORING', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getFactoringByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<FactoringDetails[]>('factoring', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_FACTORING', (response.data as DataResponse<FactoringDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<FactoringDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_FACTORING', factoringDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getFactoring ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<FactoringDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_FACTORING', (response.data as DataResponse<FactoringDetails>))
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
  async getFactorings ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<FactoringDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_FACTORINGS', (response.data as DataResponse<FactoringDetails[]>).data)
          } else {
            commit('SET_FACTORINGS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<FactoringDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_FACTORINGS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateFactoring ({ commit, getters }, request:FactoringDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<FactoringDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_FACTORING', request)
          commit('SET_FACTORINGS', getters.factorings.map((item: FactoringDetails) => item.id === request.id ? request : item))
          commit('SET_CARRIER_FACTORINGS', getters.carrierFactoring.map((item: FactoringDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_FACTORING', request)
      commit('SET_FACTORINGS', getters.factorings.map((item: FactoringDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeFactoring ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_FACTORING')
          commit('SET_FACTORINGS', getters.factorings.filter((item: FactoringDetails) => item.id !== id))
          commit('SET_CARRIER_FACTORINGS', getters.carrierFactoring.filter((item: FactoringDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_FACTORINGS', getters.factorings.filter((item:FactoringDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
