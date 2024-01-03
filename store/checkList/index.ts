import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { CheckList } from '~/models/checkList'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    checkList: {} as CheckList
  },
  response: {
    checkList: {} as CheckList,
    checkLists: [] as CheckList[],
    carrierCheckLists: [] as CheckList[]
  },
  page: 0,
  loading: false,
  error: ''
})

let index = 3

export const endPoint = 'checkList'

export type CheckListsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<CheckListsDetailsState, RootStoreState> = {
  checkListRequest: state => (state.request.checkList),
  checkList: state => (state.response.checkList),
  checkLists: state => (state.response.checkLists),
  carrierCheckLists: state => (state.response.carrierCheckLists),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<CheckListsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_CHECKLIST_REQUEST: (state, request:CheckList) => (state.request.checkList = { ...state.request.checkList, ...request }),
  SET_CHECKLIST: (state, single:CheckList) => (state.response.checkList = single),
  SET_CARRIER_CHECKLISTS: (state, list:CheckList[]) => (state.response.carrierCheckLists = list),
  ADD_CHECKLIST: (state, single:CheckList) => (state.response.checkLists.push(single)),
  UPDATE_CHECKLIST: (state, single:CheckList) => {
    const itemIndex = state.response.checkLists.findIndex((item: CheckList) => item.id === single.id)
    state.response.checkLists[itemIndex] = single
  },
  SET_CHECKLISTS: (state, list:CheckList[]) => (state.response.checkLists = list),
  REMOVE_CHECKLIST: state => (state.response.checkList = {} as CheckList)
}

export const actions:ActionTree<CheckListsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: CheckList) {
    commit('FILL_CHECKLIST_REQUEST', request)
  },
  async addCheckList ({ commit }, request:CheckList) {
    commit('SET_LOADING', true)
    try {
      return await service.add<CheckList, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_CHECKLIST', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_CHECKLIST', { ...request, id: index++ })
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getCheckList ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<CheckList[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_CHECKLIST', (response.data as DataResponse<CheckList[]>).data[0])
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
  async getCheckListsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<CheckList[]>('checklist', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_CHECKLISTS', (response.data as DataResponse<CheckList[]>).data)
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
  async getCheckLists ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<CheckList[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_CHECKLISTS', (response.data as DataResponse<CheckList[]>).data)
          } else {
            commit('SET_CHECKLISTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<CheckList[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_CHECKLISTS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateCheckList ({ commit, getters }, request:CheckList) {
    commit('SET_LOADING', true)
    try {
      return await service.update<CheckList, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_CHECKLIST', request)
          commit('SET_CHECKLISTS', getters.checkLists.map((item: CheckList) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_CHECKLIST', request)
      commit('SET_CHECKLISTS', getters.checkLists.map((item: CheckList) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeCheckList ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_CHECKLIST')
          commit('SET_CHECKLISTS', getters.checkLists.filter((item: CheckList) => item.id !== id))
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
