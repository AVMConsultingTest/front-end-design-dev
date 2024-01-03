import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { UsersDetails } from '~/models/CarrierSettings/usersDetails/usersDetails'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService('/carrier_settings_api')

export const state = () => ({
  request: {
    user: {} as UsersDetails
  },
  response: {
    user: {} as UsersDetails,
    users: [] as UsersDetails[],
    carrierUsers: [] as UsersDetails[]
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

export interface SetUserRequest {
    user?:null|UsersDetails,
    step?:number,
    title?:string
}

const endPoint = '/UsersDetails'

export type UserState = ReturnType<typeof state>

export const getters: GetterTree<UserState, RootStoreState> = {
  userRequest: state => (state.request),
  user: state => (state.response.user),
  users: state => (state.response.users),
  carrierUsers: state => (state.response.carrierUsers),
  step: state => (state.addStep),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<UserState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_USER_REQUEST: (state, request:UsersDetails) => (state.request.user = { ...state.request.user, ...request }),
  SET_USER: (state, single:UsersDetails) => (state.response.user = single),
  SET_USERS: (state, list:UsersDetails[]) => (state.response.users = list),
  REMOVE_USER: state => (state.response.user = {} as UsersDetails),
  SET_CARRIER_USERS: (state, list:UsersDetails[]) => (state.response.carrierUsers = list),
  ADD_USER: (state, single:UsersDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierUsers.length < 12) {
        single.id = state.response.carrierUsers[state.response.carrierUsers.length - 1].id + 1
        state.response.carrierUsers.push(single)
      }
    }
  },
  UPDATE_USER: (state, single:UsersDetails) => {
    const itemIndex = state.response.users.findIndex((item: UsersDetails) => item.id === single.id)
    state.response.users[itemIndex] = single
    const carrierItemIndex = state.response.carrierUsers.findIndex((item: UsersDetails) => item.id === single.id)
    state.response.carrierUsers[carrierItemIndex] = single
  },
  SET_ADD_USER (state, request:SetUserRequest) {
    if (request.user) {
      state.request.user = request.user as UsersDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<UserState, RootStoreState> = {
  fillRequest ({ commit }, request: UsersDetails) {
    commit('FILL_USER_REQUEST', request)
  },
  setUser ({ commit }, request:SetUserRequest) {
    commit('SET_ADD_USER', request)
  },
  async addUser ({ commit }, request:UsersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<UsersDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_USER', request)
        } else {
          commit('ADD_USER', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateUser ({ commit, getters }, request:UsersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<UsersDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_USER', request)
          commit('SET_CARRIER_USERS', getters.carrierUsers.map((item: UsersDetails) => item.id === request.id ? request : item))
          commit('SET_USERS', getters.users.map((item: UsersDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_USERS', request)
          commit('SET_USERS', getters.users.map((item: UsersDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_USER', request)
      commit('SET_USER', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getUser ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<UsersDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_USER', (response.data as DataResponse<UsersDetails[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.user)
      commit('SET_USER', getters.users.filter((item: UsersDetails) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getUsers ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<UsersDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_USERS', (response.data as DataResponse<UsersDetails[]>).data)
          } else {
            commit('SET_ERROR', [] as UsersDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<UsersDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_USERS', [] as UsersDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getUserByCarrierId ({ commit, rootState }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<UsersDetails[]>(endPoint + '/Carriers', rootState.carrierId, payload.page_number, undefined, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_USERS', (response.data as DataResponse<UsersDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<UsersDetails[]>).total_pages)
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
  async removeUser ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_USER')
          commit('SET_USERS', getters.users.filter((item: UsersDetails) => item.id !== id))
          commit('SET_CARRIER_USERS', getters.carrierUsers.filter((item: UsersDetails) => item.id !== id))
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
