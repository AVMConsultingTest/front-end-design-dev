import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { ContactsDetails } from '~/models/Broker/contactsDetails/contactsDetails'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    contact: {} as ContactsDetails
  },
  response: {
    contact: {} as ContactsDetails,
    contacts: [] as ContactsDetails[],
    brokerContacts: [] as ContactsDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'ContactsDetails'

export type ContactsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<ContactsDetailsState, RootStoreState> = {
  contactBoardRequest: state => (state.request.contact),
  contact: state => (state.response.contact),
  contacts: state => (state.response.contacts),
  brokerContacts: state => (state.response.brokerContacts),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ContactsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  SET_CARRIER_CONTACT: (state, list:ContactsDetails[]) => (state.response.brokerContacts = list),
  ADD_CONTACT: (state, single: ContactsDetails) => {
    if (single.id === undefined && state.response.brokerContacts.length < 12) {
      single.id = state.response.brokerContacts[state.response.brokerContacts.length - 1].id + 1
      single.is_verified_contact = single.is_verified_contact === true ? 1 : 0
      state.response.brokerContacts.push(single)
    }
    console.log(single, state.response.brokerContacts)
  },
  FILL_CONTACT_REQUEST: (state, request:ContactsDetails) => (state.request.contact = { ...state.request.contact, ...request }),
  SET_CONTACT: (state, single:ContactsDetails) => (state.response.contact = single),
  SET_CONTACTS: (state, list:ContactsDetails[]) => (state.response.contacts = list),
  REMOVE_CONTACT: state => (state.response.contact = {} as ContactsDetails),
  UPDATE_CONTACT: (state, single:ContactsDetails) => {
    const itemIndex = state.response.contacts.findIndex((item: ContactsDetails) => item.id === single.id)
    state.response.contacts[itemIndex] = single
  }
}

export const actions: ActionTree<ContactsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: ContactsDetails) {
    commit('FILL_CONTACT_REQUEST', request)
  },
  async addContact ({ commit }, request:ContactsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ContactsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_CONTACT', request)
        } else {
          commit('ADD_CONTACT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_CONTACT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getContactByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ContactsDetails[]>('ContactsDetails', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_CONTACT', (response.data as DataResponse<ContactsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<ContactsDetails[]>).total_pages)
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
  async getContact ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ContactsDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_CONTACT', (response.data as DataResponse<ContactsDetails[]>).data[0])
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
  async getContacts ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ContactsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_CONTACTS', (response.data as DataResponse<ContactsDetails[]>).data)
          } else {
            commit('SET_CONTACTS', [] as ContactsDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<ContactsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CONTACTS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateContact ({ commit, getters }, request:ContactsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ContactsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_CONTACT', request)
          commit('SET_CONTACT', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_CONTACT', request)
      commit('SET_CONTACTS', getters.contacts.map((item: ContactsDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeContact ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_CONTACT')
          commit('SET_CONTACTS', getters.contacts.filter((item: ContactsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CONTACT', getters.contacts.filter((item:ContactsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
