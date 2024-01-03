import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DocumentsDetails } from '~/models/accounting/documents/documentsDetails'
import documentsDetails from '~/static/DummyData/Accounting/documentsDetails'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    document: {} as DocumentsDetails
  },
  response: {
    document: {} as DocumentsDetails,
    documents: [] as DocumentsDetails[],
    carrierDocuments: documentsDetails as DocumentsDetails[]
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

export interface SetDocumentsRequest {
    document?:null|DocumentsDetails,
    step?:number,
    title?:string
}

const endPoint = 'DocumentsDetails'

export type DocumentsState = ReturnType<typeof state>

export const getters: GetterTree<DocumentsState, RootStoreState> = {
  documentRequest: state => (state.request),
  document: state => (state.response.document),
  documents: state => (state.response.documents),
  carrierDocuments: state => (state.response.carrierDocuments),
  step: state => (state.addStep),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<DocumentsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_DOCUMENT_REQUEST: (state, request:DocumentsDetails) => (state.request.document = { ...state.request.document, ...request }),
  SET_DOCUMENT: (state, single:DocumentsDetails) => (state.response.document = single),
  SET_DOCUMENTS: (state, list:DocumentsDetails[]) => (state.response.documents = list),
  REMOVE_DOCUMENT: state => (state.response.document = {} as DocumentsDetails),
  SET_CARRIER_DOCUMENTS: (state, list:DocumentsDetails[]) => (state.response.carrierDocuments = list),
  ADD_DOCUMENT: (state, single:DocumentsDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierDocuments.length < 12) {
        single.id = state.response.carrierDocuments[state.response.carrierDocuments.length - 1].id + 1
        state.response.carrierDocuments.push(single)
      }
    }
  },
  UPDATE_DOCUMENT: (state, single:DocumentsDetails) => {
    const itemIndex = state.response.documents.findIndex((item: DocumentsDetails) => item.id === single.id)
    state.response.documents[itemIndex] = single
    const carrierItemIndex = state.response.carrierDocuments.findIndex((item: DocumentsDetails) => item.id === single.id)
    state.response.carrierDocuments[carrierItemIndex] = single
  },
  SET_ADD_DOCUMENT (state, request:SetDocumentsRequest) {
    if (request.document) {
      state.request.document = request.document as DocumentsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<DocumentsState, RootStoreState> = {
  fillRequest ({ commit }, request: DocumentsDetails) {
    commit('FILL_DOCUMENT_REQUEST', request)
  },
  setDocument ({ commit }, request:SetDocumentsRequest) {
    commit('SET_ADD_DOCUMENT', request)
  },
  async addDocument ({ commit }, request:DocumentsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<DocumentsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_DOCUMENT', request)
        } else {
          commit('ADD_DOCUMENT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateDocument ({ commit, getters }, request:DocumentsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<DocumentsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_DOCUMENT', request)
          commit('SET_CARRIER_DOCUMENTS', getters.carrierDocuments.map((item: DocumentsDetails) => item.id === request.id ? request : item))
          commit('SET_DOCUMENTS', getters.documents.map((item: DocumentsDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_DOCUMENT', request)
          commit('SET_DOCUMENTS', getters.documents.map((item: DocumentsDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_DOCUMENT', request)
      commit('SET_DOCUMENT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDocument ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<DocumentsDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_DOCUMENT', (response.data as DataResponse<DocumentsDetails[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.document)
      commit('SET_DOCUMENT', getters.documents.filter((item: DocumentsDetails) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDocuments ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<DocumentsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_DOCUMENTS', (response.data as DataResponse<DocumentsDetails[]>).data)
          } else {
            commit('SET_ERROR', [] as DocumentsDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<DocumentsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_DOCUMENTS', [] as DocumentsDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDocumentByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<DocumentsDetails[]>('documentDetails', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_DOCUMENTS', (response.data as DataResponse<DocumentsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<DocumentsDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_DOCUMENTS', documentsDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeDocument ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_DOCUMENT')
          commit('SET_DOCUMENTS', getters.documents.filter((item: DocumentsDetails) => item.id !== id))
          commit('SET_CARRIER_DOCUMENTS', getters.carrierDocuments.filter((item: DocumentsDetails) => item.id !== id))
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
