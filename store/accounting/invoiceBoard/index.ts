import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { InvoiceBoardDetails } from '~/models/accounting/invoiceBoard/invoiceBoardDetails'
import invoiceBoardDetails from '~/static/DummyData/Accounting/invoiceBoard'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    invoiceBoard: {} as InvoiceBoardDetails
  },
  response: {
    invoiceBoard: {} as InvoiceBoardDetails,
    invoiceBoards: [] as InvoiceBoardDetails[],
    carrierInvoiceBoards: invoiceBoardDetails as InvoiceBoardDetails[]
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

export interface SetInvoiceBoardRequest {
  invoiceBoard?:null|InvoiceBoardDetails,
  step?:number,
  title?:string
}

export const endPoint = 'InvoiceBoardDetails'

export type InvoiceBoardDetailsState = ReturnType<typeof state>

export const getters: GetterTree<InvoiceBoardDetailsState, RootStoreState> = {
  invoiceBoardRequest: state => (state.request.invoiceBoard),
  invoiceBoard: state => (state.response.invoiceBoard),
  invoiceBoards: state => (state.response.invoiceBoards),
  carrierInvoiceBoards: state => (state.response.carrierInvoiceBoards),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<InvoiceBoardDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_INVOICE_BOARD_REQUEST: (state, request:InvoiceBoardDetails) => (state.request.invoiceBoard = { ...state.request.invoiceBoard, ...request }),
  SET_CARRIER_INVOICE_BOARDS: (state, list:InvoiceBoardDetails[]) => (state.response.carrierInvoiceBoards = list),
  SET_INVOICE_BOARD: (state, single:InvoiceBoardDetails) => (state.response.invoiceBoard = single),
  SET_INVOICE_BOARDS: (state, list:InvoiceBoardDetails[]) => (state.response.invoiceBoards = list),
  REMOVE_INVOICE_BOARD: state => (state.response.invoiceBoard = {} as InvoiceBoardDetails),
  UPDATE_INVOICE_BOARD: (state, single:InvoiceBoardDetails) => {
    const itemIndex = state.response.invoiceBoards.findIndex((item: InvoiceBoardDetails) => item.id === single.id)
    state.response.invoiceBoards[itemIndex] = single
    const carrierItemIndex = state.response.carrierInvoiceBoards.findIndex((item: InvoiceBoardDetails) => item.id === single.id)
    state.response.carrierInvoiceBoards[carrierItemIndex] = single
  },
  ADD_INVOICE_BOARD: (state, single: InvoiceBoardDetails) => {
    if (single.id === undefined && state.response.invoiceBoards.length < 12) {
      single.id = state.response.invoiceBoards[state.response.invoiceBoards.length - 1].id + 1
      state.response.invoiceBoards.push(single)
    }
    console.log(single, state.response.invoiceBoards)
  },
  SET_ADD_INVOICE_BOARD: (state, request:SetInvoiceBoardRequest) => {
    if (request.invoiceBoard) {
      state.request.invoiceBoard = request.invoiceBoard as InvoiceBoardDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<InvoiceBoardDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: InvoiceBoardDetails) {
    commit('FILL_INVOICE_BOARD_REQUEST', request)
  },
  setInvoiceBoard ({ commit }, request:SetInvoiceBoardRequest) {
    commit('SET_ADD_INVOICE_BOARD', request)
  },
  async addInvoiceBoard ({ commit }, request:InvoiceBoardDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<InvoiceBoardDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_INVOICE_BOARD', request)
        } else {
          commit('ADD_INVOICE_BOARD', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getInvoiceBoard ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<InvoiceBoardDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_INVOICE_BOARD', (response.data as DataResponse<InvoiceBoardDetails[]>).data[0])
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
  async getInvoiceBoards ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<InvoiceBoardDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_INVOICE_BOARDS', (response.data as DataResponse<InvoiceBoardDetails[]>).data)
          } else {
            commit('SET_INVOICE_BOARDS', [] as InvoiceBoardDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<InvoiceBoardDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_INVOICE_BOARDS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getInvoiceBoardByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<InvoiceBoardDetails[]>('invoiceBoard', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_INVOICE_BOARDS', (response.data as DataResponse<InvoiceBoardDetails[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_INVOICE_BOARDS', invoiceBoardDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateInvoiceBoard ({ commit, getters }, request:InvoiceBoardDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<InvoiceBoardDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_INVOICE_BOARD', request)
          commit('SET_INVOICE_BOARDS', getters.invoiceBoards.map((item: InvoiceBoardDetails) => item.id === request.id ? request : item))
          commit('SET_CARRIER_INVOICE_BOARDS', getters.carrierInvoiceBoards.map((item: InvoiceBoardDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_INVOICE_BOARD', request)
      commit('SET_INVOICE_BOARDS', getters.invoiceBoards.map((item: InvoiceBoardDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeInvoiceBoard ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_INVOICE_BOARD')
          commit('SET_INVOICE_BOARDS', getters.invoiceBoards.filter((item: InvoiceBoardDetails) => item.id !== id))
          commit('SET_CARRIER_INVOICE_BOARDS', getters.carrierLocations.filter((item: InvoiceBoardDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_INVOICE_BOARD', getters.invoiceBoards.filter((item:InvoiceBoardDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
