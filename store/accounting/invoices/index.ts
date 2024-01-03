import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { InvoicesDetails } from '~/models/accounting/invoices/invoicesDetails'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    invoice: {} as InvoicesDetails
  },
  response: {
    invoice: {} as InvoicesDetails,
    invoices: [] as InvoicesDetails[],
    carrierInvoices: [] as InvoicesDetails[]
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

export interface SetInvoiceRequest {
  invoice: InvoicesDetails
  step?:number,
  title?:string
}

export const endPoint = 'InvoicesDetails'

export type InvoicesDetailsState = ReturnType<typeof state>

export const getters: GetterTree<InvoicesDetailsState, RootStoreState> = {
  invoiceRequest: state => (state.request.invoice),
  invoice: state => (state.response.invoice),
  invoices: state => (state.response.invoices),
  carrierInvoices: state => (state.response.carrierInvoices),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<InvoicesDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_INVOICE_REQUEST: (state, request:InvoicesDetails) => (state.request.invoice = { ...state.request.invoice, ...request }),
  SET_CARRIER_INVOICES: (state, list:InvoicesDetails[]) => (state.response.carrierInvoices = list),
  SET_INVOICE: (state, single:InvoicesDetails) => (state.response.invoice = single),
  SET_INVOICES: (state, list:InvoicesDetails[]) => (state.response.invoices = list),
  REMOVE_INVOICE: state => (state.response.invoice = {} as InvoicesDetails),
  UPDATE_INVOICE: (state, single:InvoicesDetails) => {
    const itemIndex = state.response.invoices.findIndex((item: InvoicesDetails) => item.id === single.id)
    state.response.invoices[itemIndex] = single
    const carrierItemIndex = state.response.carrierInvoices.findIndex((item: InvoicesDetails) => item.id === single.id)
    state.response.carrierInvoices[carrierItemIndex] = single
  },
  ADD_INVOICE: (state, single: InvoicesDetails) => {
    if (single.id === undefined) {
      single.id = state.response.carrierInvoices[state.response.carrierInvoices.length - 1].id + 1
    }
    state.response.carrierInvoices.push(single)
    console.log(single, state.response.carrierInvoices)
  },
  SET_ADD_INVOICE: (state, request:SetInvoiceRequest) => {
    if (request.invoice) {
      state.request.invoice = request.invoice as InvoicesDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<InvoicesDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: InvoicesDetails) {
    commit('FILL_INVOICE_REQUEST', request)
  },
  setInvoice ({ commit }, request:InvoicesDetails) {
    commit('SET_ADD_INVOICE', request)
  },
  async addInvoice ({ commit }, request:InvoicesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<InvoicesDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_INVOICE', request)
        } else {
          commit('ADD_INVOICE', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getInvoiceByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<InvoicesDetails[]>('invoices', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_INVOICES', (response.data as DataResponse<InvoicesDetails[]>).data)
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
  async getInvoice ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<InvoicesDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_INVOICE', (response.data as DataResponse<InvoicesDetails[]>).data[0])
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
  async getInvoices ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<InvoicesDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_INVOICES', (response.data as DataResponse<InvoicesDetails[]>).data)
          } else {
            commit('SET_INVOICES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<InvoicesDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_INVOICES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateInvoice ({ commit, getters }, request:InvoicesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<InvoicesDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_INVOICE', request)
          commit('SET_INVOICES', getters.invoices.map((item: InvoicesDetails) => item.id === request.id ? request : item))
          commit('SET_CARRIER_INVOICES', getters.carrierInvoices.map((item: InvoicesDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_INVOICE', request)
      commit('SET_INVOICES', getters.invoices.map((item: InvoicesDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeInvoice ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_INVOICE')
          commit('SET_INVOICES', getters.invoices.filter((item: InvoicesDetails) => item.id !== id))
          commit('SET_CARRIER_INVOICES', getters.carrierInvoices.filter((item: InvoicesDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_INVOICES', getters.invoices.filter((item:InvoicesDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
