import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { GenerateInvoiceDetail } from '~/models/accounting/generateInvoice/generateInvoiceDetails'
import ApiService from '~/services/baseService'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    generate: {} as GenerateInvoiceDetail
  },
  response: {
    generate: {} as GenerateInvoiceDetail,
    generates: [] as GenerateInvoiceDetail[],
    carrierGenerates: [] as GenerateInvoiceDetail[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'GenerateInvoiceDetails'

export type GenerateInvoiceDetailsState = ReturnType<typeof state>

export const getters: GetterTree<GenerateInvoiceDetailsState, RootStoreState> = {
  generateRequest: state => (state.request.generate),
  generate: state => (state.response.generate),
  generates: state => (state.response.generates),
  carrierGenerates: state => (state.response.carrierGenerates),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<GenerateInvoiceDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  FILL_GENERATE_REQUEST: (state, request:GenerateInvoiceDetail) => (state.request.generate = { ...state.request.generate, ...request }),
  SET_CARRIER_GENERATES: (state, list:GenerateInvoiceDetail[]) => (state.response.carrierGenerates = list),
  SET_GENERATE: (state, single:GenerateInvoiceDetail) => (state.response.generate = single),
  UPDATE_GENERATE: (state, single:GenerateInvoiceDetail) => {
    const itemIndex = state.response.generates.findIndex((item: GenerateInvoiceDetail) => item.id === single.id)
    state.response.generates[itemIndex] = single
    console.log(single, state.response.generates[itemIndex])
  },
  SET_GENERATES: (state, list:GenerateInvoiceDetail[]) => (state.response.generates = list),
  ADD_GENERATE: (state, single:GenerateInvoiceDetail) => {
    if (single.id === undefined) {
      single.id = state.response.generates[state.response.generates.length - 1].id + 1
    }
    state.response.generates.push(single)
  },
  SET_PAGE: (state, page:number) => (state.page = page),
  REMOVE_GENERATE: (state, id:number|string) => (state.response.generates = state.response.generates.filter((item:GenerateInvoiceDetail) => item.id !== id))
}

export const actions:ActionTree<GenerateInvoiceDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: GenerateInvoiceDetail) {
    commit('FILL_GENERATE_REQUEST', request)
  },
  async addGenerateInvoice ({ commit }, request:GenerateInvoiceDetail) {
    commit('SET_LOADING', true)
    try {
      return await service.add<GenerateInvoiceDetail, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_GENERATE', request)
        } else {
          commit('ADD_GENERATE', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_GENERATE', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getGenerateInvoiceByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<GenerateInvoiceDetail[]>('generateInvoice', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_GENERATES', (response.data as DataResponse<GenerateInvoiceDetail[]>).data)
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
  async getGenerateInvoice ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<GenerateInvoiceDetail[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_GENERATE', (response.data as DataResponse<GenerateInvoiceDetail[]>).data[0])
        } else {
          commit('SET_GENERATE', getters.generates.find((item:GenerateInvoiceDetail) => item.id === id))
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.generate)
      commit('SET_GENERATE', getters.generates.filter((item: GenerateInvoiceDetail) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getGenerateInvoices ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      console.log('payload', payload)

      return await service.get<GenerateInvoiceDetail[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_GENERATES', (response.data as DataResponse<GenerateInvoiceDetail[]>).data)
          } else {
            commit('SET_GENERATES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<GenerateInvoiceDetail[]>).total_pages)
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
  async updateGenerateInvoices ({ commit, getters }, request:GenerateInvoiceDetail) {
    commit('SET_LOADING', true)
    try {
      return await service.update<GenerateInvoiceDetail, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_GENERATE', request)
          commit('SET_GENERATES', getters.generates.map((item: GenerateInvoiceDetail) => item.id === request.id ? request : item))
          commit('SET_GENERATE', {})
        } else {
          commit('UPDATE_GENERATE', request)
          commit('SET_GENERATES', getters.generates.map((item: GenerateInvoiceDetail) => item.id === request.id ? request : item))
          commit('SET_GENERATE', {})
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_GENERATE', request)
      commit('SET_GENERATES', getters.generates.map((item: GenerateInvoiceDetail) => item.id === request.id ? request : item))
      commit('SET_GENERATE', {})
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeGenerateInvoices ({ commit }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_GENERATE', id)
        } else {
          commit('REMOVE_GENERATE', id)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('REMOVE_GENERATE', id)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
