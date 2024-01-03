import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { DocumentsDetails } from '~/models/Broker/documentsDetails/documentsDetails'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    document: {} as DocumentsDetails
  },
  response: {
    document: {} as DocumentsDetails,
    documents: [] as DocumentsDetails[],
    brokerDocuments: [] as DocumentsDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'DocumentsDetails'

export type DocumentsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<DocumentsDetailsState, RootStoreState> = {
  documentRequest: state => (state.request.document),
  document: state => (state.response.document),
  documents: state => (state.response.documents),
  brokerDocuments: state => (state.response.brokerDocuments),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<DocumentsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_DOCUMENT: (state, single: DocumentsDetails) => {
    if (single.id === undefined && state.response.brokerDocuments.length < 12) {
      single.id = state.response.brokerDocuments[state.response.brokerDocuments.length - 1].id + 1
      state.response.brokerDocuments.push(single)
    }
    console.log(single, state.response.documents)
  },
  FILL_DOCUMENT_REQUEST: (state, request:DocumentsDetails) => (state.request.document = { ...state.request.document, ...request }),
  SET_BROKER_DOCUMENTS: (state, list:DocumentsDetails[]) => (state.response.brokerDocuments = list),
  SET_DOCUMENT: (state, single:DocumentsDetails) => (state.response.document = single),
  SET_DOCUMENTS: (state, list:DocumentsDetails[]) => (state.response.documents = list),
  REMOVE_DOCUMENT: state => (state.response.document = {} as DocumentsDetails),
  UPDATE_DOCUMENT: (state, single:DocumentsDetails) => {
    const itemIndex = state.response.documents.findIndex((item: DocumentsDetails) => item.id === single.id)
    state.response.documents[itemIndex] = single
  }
}

export const actions: ActionTree<DocumentsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: DocumentsDetails) {
    commit('FILL_DOCUMENT_REQUEST', request)
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
      commit('ADD_DOCUMENT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDocumentsByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<DocumentsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_DOCUMENTS', (response.data as DataResponse<DocumentsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<DocumentsDetails[]>).total_pages)
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
  async getDocument ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<DocumentsDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_DOCUMENT', (response.data as DataResponse<DocumentsDetails[]>).data[0])
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
  async getDocuments ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<DocumentsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_DOCUMENTS', (response.data as DataResponse<DocumentsDetails[]>).data)
          } else {
            commit('SET_DOCUMENTS', [] as DocumentsDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<DocumentsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_DOCUMENTS', [])
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
          commit('SET_DOCUMENT', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_DOCUMENT', request)
      commit('SET_DOCUMENTS', getters.documents.map((item: DocumentsDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeDocument ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_DOCUMENT')
          commit('SET_DOCUMENTS', getters.documents.filter((item: DocumentsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_DOCUMENT', getters.documents.filter((item:DocumentsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
