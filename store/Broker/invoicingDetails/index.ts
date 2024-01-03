import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { InvoicingDetails } from '~/models/Broker/invoicingDetails/invoicingDetails'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    invoice: {} as InvoicingDetails
  },
  response: {
    invoice: {} as InvoicingDetails,
    invoices: [] as InvoicingDetails[],
    brokerInvoices: [] as InvoicingDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'InvoicingDetails'

export type InvoicingDetailsState = ReturnType<typeof state>

export const getters: GetterTree<InvoicingDetailsState, RootStoreState> = {
  invoiceRequest: state => (state.request.invoice),
  invoice: state => (state.response.invoice),
  invoices: state => (state.response.invoices),
  brokerInvoices: state => (state.response.brokerInvoices),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<InvoicingDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_INVOICE: (state, single: InvoicingDetails) => {
    if (single.id === undefined) {
      single.id = state.response.brokerInvoices[state.response.brokerInvoices.length - 1].id + 1
    }
    state.response.brokerInvoices.push(single)
    console.log(single, state.response.brokerInvoices)
  },
  FILL_INVOICE_REQUEST: (state, request:InvoicingDetails) => (state.request.invoice = { ...state.request.invoice, ...request }),
  SET_BROKER_INVOICES: (state, list:InvoicingDetails[]) => (state.response.brokerInvoices = list),
  SET_INVOICE: (state, single:InvoicingDetails) => (state.response.invoice = single),
  SET_INVOICES: (state, list:InvoicingDetails[]) => (state.response.invoices = list),
  REMOVE_INVOICE: state => (state.response.invoice = {} as InvoicingDetails),
  UPDATE_INVOICE: (state, single:InvoicingDetails) => {
    const itemIndex = state.response.invoices.findIndex((item: InvoicingDetails) => item.id === single.id)
    state.response.invoices[itemIndex] = single
  }
}

export const actions: ActionTree<InvoicingDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: InvoicingDetails) {
    commit('FILL_INVOICE_REQUEST', request)
  },
  async addInvoice ({ commit }, request:InvoicingDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<InvoicingDetails, APIResponse>(endPoint, request).then((response) => {
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
  async getInvoicesByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<InvoicingDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_INVOICES', (response.data as DataResponse<InvoicingDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<InvoicingDetails[]>).total_pages)
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
      return await service.single<InvoicingDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_INVOICE', (response.data as DataResponse<InvoicingDetails[]>).data[0])
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
      return await service.get<InvoicingDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_INVOICES', (response.data as DataResponse<InvoicingDetails[]>).data)
          } else {
            commit('SET_INVOICES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<InvoicingDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_INVOICES', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateInvoice ({ commit, getters }, request:InvoicingDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<InvoicingDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_INVOICE', request)
          commit('SET_INVOICE', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_INVOICE', request)
      commit('SET_INVOICES', getters.invoices.map((item: InvoicingDetails) => item.id === request.id ? request : item))
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
          commit('SET_INVOICES', getters.invoices.filter((item: InvoicingDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_INVOICES', getters.invoices.filter((item:InvoicingDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
