import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { ContactsDetails } from '~/models/accounting/contacts/contactsDetails'
import contactsDetails from '~/static/DummyData/Accounting/contactsDetails'
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
    carrierContacts: contactsDetails as ContactsDetails[]
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

export interface SetContactRequest {
  contact: ContactsDetails
  step?:number,
  title?:string
}

export const endPoint = 'ContactsDetails'

export type ContactsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<ContactsDetailsState, RootStoreState> = {
  contactRequest: state => (state.request.contact),
  contact: state => (state.response.contact),
  contacts: state => (state.response.contacts),
  carrierContacts: state => (state.response.carrierContacts),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<ContactsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_CONTACT_REQUEST: (state, request:ContactsDetails) => (state.request.contact = { ...state.request.contact, ...request }),
  SET_CARRIER_CONTACTS: (state, list:ContactsDetails[]) => (state.response.carrierContacts = list),
  SET_CONTACT: (state, single:ContactsDetails) => (state.response.contact = single),
  SET_CONTACTS: (state, list:ContactsDetails[]) => (state.response.contacts = list),
  REMOVE_CONTACT: state => (state.response.contact = {} as ContactsDetails),
  UPDATE_CONTACT: (state, single:ContactsDetails) => {
    const itemIndex = state.response.contacts.findIndex((item: ContactsDetails) => item.id === single.id)
    state.response.contacts[itemIndex] = single
    const carrierItemIndex = state.response.carrierContacts.findIndex((item: ContactsDetails) => item.id === single.id)
    state.response.carrierContacts[carrierItemIndex] = single
  },
  ADD_CONTACT: (state, single: ContactsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.carrierContacts[state.response.carrierContacts.length - 1].id + 1
    }
    state.response.carrierContacts.push(single)
    console.log(single, state.response.carrierContacts)
  },
  SET_ADD_CONTACT: (state, request:SetContactRequest) => {
    if (request.contact) {
      state.request.contact = request.contact as ContactsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<ContactsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: ContactsDetails) {
    commit('FILL_CONTACT_REQUEST', request)
  },
  setContact ({ commit }, request: ContactsDetails) {
    commit('SET_ADD_CONTACT', request)
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
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getContactsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ContactsDetails[]>('contactDetails', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_CONTACTS', (response.data as DataResponse<ContactsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<ContactsDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_CONTACTS', contactsDetails)
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
          commit('SET_CONTACT', getters.contacts.map((item: ContactsDetails) => item.id === request.id ? request : item))
          commit('SET_CONTACT', request)
          commit('SET_CARRIER_CONTACTS', getters.carrierContacts.map((item: ContactsDetails) => item.id === request.id ? request : item))
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
          commit('SET_CARRIER_CONTACTS', getters.carrierContacts.filter((item: ContactsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CONTACTS', getters.contacts.filter((item:ContactsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
