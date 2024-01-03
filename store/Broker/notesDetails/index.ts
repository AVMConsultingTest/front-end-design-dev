import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { NotesDetails } from '~/models/Broker/notesDetails/notesDetails'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    note: {} as NotesDetails
  },
  response: {
    note: {} as NotesDetails,
    notes: [] as NotesDetails[],
    brokerNotes: [] as NotesDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'NotesDetails'

export type NotesDetailsState = ReturnType<typeof state>

export const getters: GetterTree<NotesDetailsState, RootStoreState> = {
  noteRequest: state => (state.request.note),
  note: state => (state.response.note),
  notes: state => (state.response.notes),
  brokerNotes: state => (state.response.brokerNotes),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<NotesDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_NOTE: (state, single: NotesDetails) => {
    if (single.id === undefined) {
      single.id = state.response.notes[state.response.notes.length - 1].id + 1
    }
    state.response.notes.push(single)
    console.log(single, state.response.notes)
  },
  FILL_NOTE_REQUEST: (state, request:NotesDetails) => (state.request.note = { ...state.request.note, ...request }),
  SET_BROKER_NOTES: (state, list:NotesDetails[]) => (state.response.brokerNotes = list),
  SET_NOTE: (state, single:NotesDetails) => (state.response.note = single),
  SET_NOTES: (state, list:NotesDetails[]) => (state.response.notes = list),
  REMOVE_NOTE: state => (state.response.note = {} as NotesDetails),
  UPDATE_NOTE: (state, single:NotesDetails) => {
    const itemIndex = state.response.notes.findIndex((item: NotesDetails) => item.id === single.id)
    state.response.notes[itemIndex] = single
  }
}

export const actions: ActionTree<NotesDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: NotesDetails) {
    commit('FILL_NOTE_REQUEST', request)
  },
  async addNote ({ commit }, request:NotesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<NotesDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_NOTE', request)
        } else {
          commit('ADD_NOTE', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_NOTE', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getNotesByBrokerId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<NotesDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_BROKER_NOTES', (response.data as DataResponse<NotesDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<NotesDetails[]>).total_pages)
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
  async getNote ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<NotesDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_NOTE', (response.data as DataResponse<NotesDetails[]>).data[0])
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
  async getNotes ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<NotesDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_NOTES', (response.data as DataResponse<NotesDetails[]>).data)
          } else {
            commit('SET_NOTES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<NotesDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_NOTES', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateNote ({ commit, getters }, request:NotesDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<NotesDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_NOTE', request)
          commit('SET_NOTES', getters.notes.map((item: NotesDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_NOTE', request)
      commit('SET_NOTES', getters.notes.map((item: NotesDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeNote ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_NOTE')
          commit('SET_NOTES', getters.notes.filter((item: NotesDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_NOTES', getters.notes.filter((item:NotesDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
