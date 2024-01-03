import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { APIResponse } from '~/models/common/apiResponse'
import { DrugTest } from '~/models/drugs/drugTest'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'
import drugTest from '~/static/DummyData/Safety/drugTest'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    drugtest: {} as DrugTest
  },
  response: {
    drugtest: {} as DrugTest,
    drugtests: drugTest as DrugTest[],
    carrierDrugTests: [] as DrugTest[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/drug-tests'

export type DrugTestState = ReturnType<typeof state>

export const getters: GetterTree<DrugTestState, RootStoreState> = {
  drugTestRequest: state => (state.request.drugtest),
  drugTest: state => (state.response.drugtest),
  drugTests: state => (state.response.drugtests),
  carrierDrugTests: state => (state.response.carrierDrugTests),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<DrugTestState> = {
  SET_LOADING: (state, loading: boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  SET_DRUGTEST: (state, single:DrugTest) => (state.response.drugtest = single),
  // ADD_DRUGTEST: (state, single:DrugTest) => { state.response.drugtests.push(single) },
  ADD_DRUGTEST: (state, single:DrugTest) => {
    if (single.id === undefined) {
      if (state.response.carrierDrugTests.length < 12) {
        single.id = state.response.carrierDrugTests[state.response.carrierDrugTests.length - 1].id + 1
        state.response.carrierDrugTests.push(single)
      }
    }
  },
  UPDATE_DRUGTEST: (state, single:DrugTest) => {
    const itemIndex = state.response.drugtests.findIndex((item: DrugTest) => item.id === single.id)
    state.response.drugtests[itemIndex] = single
    const carrierItemIndex = state.response.carrierDrugTests.findIndex((item: DrugTest) => item.id === single.id)
    state.response.carrierDrugTests[carrierItemIndex] = single
  },
  SET_DRUGTESTS: (state, list:DrugTest[]) => (state.response.drugtests = list),
  SET_CARRIER_DRUGTESTS: (state, list:DrugTest[]) => (state.response.carrierDrugTests = list),
  REMOVE_DRUGTEST: state => (state.response.drugtest = {} as DrugTest)
}

export const actions: ActionTree<DrugTestState, RootStoreState> = {
  fillRequest ({ commit }, request: DrugTest) {
    commit('FILL_DRUGTEST_REQUEST', request)
  },
  async updateDrugTest ({ commit, getters }, request:DrugTest) {
    commit('SET_LOADING', true)
    try {
      return await service.update<DrugTest, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_DRUGTEST', request)
          commit('SET_CARRIER_DRUGTESTS', getters.carrierDrugTests.map((item: DrugTest) => item.id === request.id ? request : item))
          commit('SET_DRUGTESTS', getters.drugTests.map((item: DrugTest) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_DRUGTEST', request)
          commit('SET_DRUGTESTS', getters.drugTests.map((item: DrugTest) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_DRUGTEST', request)
      commit('SET_DRUGTEST', request)

      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async addDrugTest ({ commit }, request:DrugTest) {
    commit('SET_LOADING', true)
    try {
      return await service.add<DrugTest, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_DRUGTEST', request)
        } else {
          commit('ADD_DRUGTEST', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDrugTest ({ commit }, id: number | string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<DrugTest>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_DRUGTEST', (response.data as DataResponse<DrugTest>))
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
  async getDrugTestsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<DrugTest[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_DRUGTESTS', (response.data as DataResponse<DrugTest[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_DRUGTESTS', drugTest)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getDrugTests ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<DrugTest[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_DRUGTESTS', (response.data as DataResponse<DrugTest[]>).data)
          } else {
            commit('SET_DRUGTESTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<DrugTest[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
        return response
      })
    } catch (error) {
      console.log('drugs :' + error)
      commit('SET_DRUGTESTS', [])
      commit('SET_ERROR', error)
      // commit('SET_DRUGTESTS', drugTest)
    } finally {
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 200)
    }
  },
  async removeDrugTest ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_DRUGTEST')
          commit('REMOVE_DRUGTEST', getters.drugTests.filter((item: DrugTest) => item.id !== id))
          commit('SET_CARRIER_DRUGTESTS', getters.carrierDrugTests.filter((item: DrugTest) => item.id !== id))
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
