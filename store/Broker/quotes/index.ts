import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { QuotesDetails } from '~/models/Broker/Quotes/QuotesDetails'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    quote: {} as QuotesDetails
  },
  response: {
    quote: {} as QuotesDetails,
    quotes: [] as QuotesDetails[],
    brokerQuotes: [] as QuotesDetails[]
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

export interface SetQuoteRequest {
  quote: QuotesDetails
  step?:number,
  title?:string
}

export const endPoint = 'broker/quotes'

export type QuotesDetailsState = ReturnType<typeof state>

export const getters: GetterTree<QuotesDetailsState, RootStoreState> = {
  quoteRequest: state => (state.request.quote),
  quote: state => (state.response.quote),
  quotes: state => (state.response.quotes),
  brokerQuotes: state => (state.response.brokerQuotes),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<QuotesDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_QUOTE: (state, single: QuotesDetails) => {
    if (single.id === undefined) {
      single.id = state.response.brokerQuotes[state.response.brokerQuotes.length - 1].id + 1
    }
    state.response.brokerQuotes.push(single)
    console.log(single, state.response.brokerQuotes)
  },
  FILL_QUOTE_REQUEST: (state, request:QuotesDetails) => (state.request.quote = { ...state.request.quote, ...request }),
  SET_BROKER_QUOTES: (state, list:QuotesDetails[]) => (state.response.brokerQuotes = list),
  SET_QUOTE: (state, single:QuotesDetails) => (state.response.quote = single),
  SET_QUOTES: (state, list:QuotesDetails[]) => (state.response.quotes = list),
  REMOVE_QUOTE: state => (state.response.quote = {} as QuotesDetails),
  UPDATE_QUOTE: (state, single:QuotesDetails) => {
    const itemIndex = state.response.quotes.findIndex((item: QuotesDetails) => item.id === single.id)
    state.response.quotes[itemIndex] = single
    const carrierItemIndex = state.response.brokerQuotes.findIndex((item: QuotesDetails) => item.id === single.id)
    state.response.brokerQuotes[carrierItemIndex] = single
  },
  SET_ADD_QUOTE: (state, request:SetQuoteRequest) => {
    if (request.quote) {
      state.request.quote = request.quote as QuotesDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<QuotesDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: QuotesDetails) {
    commit('FILL_QUOTE_REQUEST', request)
  },
  setQuote ({ commit }, request:SetQuoteRequest) {
    commit('SET_ADD_QUOTE', request)
  },
  async addQuote ({ commit }, request:QuotesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<QuotesDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_QUOTE', request)
        } else {
          commit('ADD_QUOTE', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getQuotesByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<QuotesDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_QUOTES', (response.data as DataResponse<QuotesDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<QuotesDetails[]>).total_pages)
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
  async getQuote ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<QuotesDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_QUOTE', (response.data as DataResponse<QuotesDetails[]>).data[0])
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
  async getQuotes ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<QuotesDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_QUOTES', (response.data as DataResponse<QuotesDetails[]>).data)
          } else {
            commit('SET_QUOTES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<QuotesDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_QUOTES', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateQuote ({ commit, getters }, request:QuotesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<QuotesDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_QUOTE', request)
          commit('SET_QUOTES', request)
          commit('SET_BROKER_QUOTES', getters.brokerQuotes.map((item: QuotesDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_QUOTE', request)
      commit('SET_QUOTES', getters.quotes.map((item: QuotesDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeQuote ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_QUOTE')
          commit('SET_QUOTES', getters.quotes.filter((item: QuotesDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_QUOTES', getters.quotes.filter((item:QuotesDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
