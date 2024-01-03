import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { Accidents } from '~/models/accidents/accidents'
import ApiService from '~/services/baseService'
import { DataResponse } from '~/models/common/DataResponse'
// import accidentDummy from '~/static/DummyData/Safety/accidents'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    accident: {} as Accidents
  },
  response: {
    accident: {} as Accidents,
    accidents: [] as Accidents[],
    carrierAccidents: [] as Accidents[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/accidents'

export type AccidentsState = ReturnType<typeof state>

export const getters: GetterTree<AccidentsState, RootStoreState> = {
  accidentRequest: state => (state.request.accident),
  accident: state => (state.response.accident),
  accidents: state => (state.response.accidents),
  carrierAccidents: state => (state.response.carrierAccidents),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<AccidentsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  FILL_ACCIDENT_REQUEST: (state, request:Accidents) => (state.request.accident = { ...state.request.accident, ...request }),
  SET_ACCIDENT: (state, single:Accidents) => (state.response.accident = single),
  UPDATE_ACCIDENT: (state, single:Accidents) => {
    const itemIndex = state.response.accidents.findIndex((item: Accidents) => item.id === single.id)
    state.response.accidents[itemIndex] = single
    const carrierItemIndex = state.response.carrierAccidents.findIndex((item: Accidents) => item.id === single.id)
    state.response.carrierAccidents[carrierItemIndex] = single
  },
  SET_ACCIDENTS: (state, list:Accidents[]) => (state.response.accidents = list),
  SET_CARRIER_ACCIDENTS: (state, list:Accidents[]) => (state.response.carrierAccidents = list),
  ADD_ACCIDENT: (state, single:Accidents) => {
    if (single.id === undefined) {
      if (state.response.carrierAccidents.length < 12) {
        single.id = state.response.carrierAccidents[state.response.carrierAccidents.length - 1].id + 1
        state.response.carrierAccidents.push(single)
      }
    }
  },
  SET_PAGE: (state, page:number) => (state.page = page),
  REMOVE_ACCIDENT: state => (state.response.accident = {} as Accidents)

}

export const actions:ActionTree<AccidentsState, RootStoreState> = {
  fillRequest ({ commit }, request: Accidents) {
    commit('FILL_ACCIDENT_REQUEST', request)
  },
  async addAccidents ({ commit }, request:Accidents) {
    commit('SET_LOADING', true)
    try {
      return await service.add<Accidents, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_ACCIDENT', request)
        } else {
          commit('ADD_ACCIDENT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_ACCIDENT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getAccident ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<Accidents>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_ACCIDENT', (response.data as DataResponse<Accidents>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ACCIDENT')
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getAccidentsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<Accidents[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_ACCIDENTS', (response.data as DataResponse<Accidents[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<Accidents[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_ACCIDENTS')
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getAccidents ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      console.log('payload', payload)
      return await service.get<Accidents[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_ACCIDENTS', (response.data as DataResponse<Accidents[]>).data)
          } else {
            commit('SET_ACCIDENTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<Accidents[]>).total_pages)
        } else {
          commit('SET_ACCIDENTS')
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ACCIDENTS')
      // commit('SET_ACCIDENT', getters.accidents.filter((item: Accidents) => item.id === id)[0])

      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateAccidents ({ commit, getters }, request:Accidents) {
    commit('SET_LOADING', true)
    try {
      return await service.update<Accidents, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_ACCIDENT', request)
          commit('SET_CARRIER_ACCIDENTS', getters.carrierAccidents.map((item: Accidents) => item.id === request.id ? request : item))
          commit('SET_ACCIDENTS', getters.accidents.map((item: Accidents) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_ACCIDENT', request)
          commit('SET_CARRIER_ACCIDENTS', getters.carrierAccidents.map((item: Accidents) => item.id === request.id ? request : item))
          commit('SET_ACCIDENTS', getters.accidents.map((item: Accidents) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_ACCIDENT', request)
      commit('SET_CARRIER_ACCIDENTS', getters.carrierAccidents.map((item: Accidents) => item.id === request.id ? request : item))
      commit('SET_ACCIDENTS', getters.accidents.map((item: Accidents) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeAccidents ({ commit, getters }, id: string|number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_ACCIDENT', id)
          commit('SET_ACCIDENTS', getters.accidents.filter((item: Accidents) => item.id !== id))
          commit('SET_CARRIER_ACCIDENTS', getters.carrierAccidents.filter((item: Accidents) => item.id !== id))
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
