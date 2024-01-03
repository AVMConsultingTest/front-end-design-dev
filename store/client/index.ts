import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Client } from '../../models/client'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService('/client_api')

export const state = () => ({
  clients: [] as Client[],
  client: {} as Client,
  loading: false,
  error: ''
})

export type ClientState = ReturnType<typeof state>

export const getters: GetterTree<ClientState, RootStoreState> = {
  clients: state => state.clients,
  client: state => state.client,
  clientCount: state => (state.clients.length)
}

export const mutations: MutationTree<ClientState> = {
  SET_LIST: (state, list:Client[]) => (state.clients = list),
  SET_SINGLE: (state, single:Client) => (state.client = single),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  PUSH_CLIENT: (state, client:Client) => (state.clients.push(client)),
  REMOVE_CLIENT: state => (state.client = {} as Client)
}

export const actions: ActionTree<ClientState, RootStoreState> = {
  async list ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await service.get<Client[]>('client/all/', page_number).then((response) => {
        if (response.status === 200) {
          commit('SET_LIST', response.data)
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200) // for test
    }
  },
  async get ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<Client>('client/', id).then((response) => {
        if (response.status === 200) {
          commit('SET_SINGLE', response.data)
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200) // for test
    }
  },
  async create ({ commit }, request:Client) {
    commit('SET_LOADING', true)
    try {
      return await service.add<Client, APIResponse>('client/register', request).then((response) => {
        if (response.status === 200) {
          commit('PUSH_CLIENT', request)
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async update ({ commit }, request:Client) {
    commit('SET_LOADING', true)
    try {
      return await service.update<Client, APIResponse>('client/register/update', request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_SINGLE', request)
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async remove ({ commit }, id:string|number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<Client>('client/remove', id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_CLIENT')
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200) // for test
    }
  }
}
