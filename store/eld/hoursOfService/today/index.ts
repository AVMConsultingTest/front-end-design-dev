import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { TodayDetails } from '~/models/eld/hoursOfService/today/today'

const service: ApiService = new ApiService('/eld_one_api') // Change here

export const state = () => ({
  request: {
    record: {} as TodayDetails
  },
  response: {
    record: {} as TodayDetails,
    records: [] as TodayDetails[],
    carrierRecords: [] as TodayDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

const endPoint = '/HosDetails' // Change here

export type TodayState = ReturnType<typeof state>

export const getters: GetterTree<TodayState, RootStoreState> = {
  recordRequest: state => (state.request),
  record: state => (state.response.record),
  records: state => (state.response.records),
  carrierRecords: state => (state.response.carrierRecords),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<TodayState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECORD_REQUEST: (state, request:TodayDetails) => (state.request.record = { ...state.request.record, ...request }),
  SET_RECORD: (state, single:TodayDetails) => (state.response.record = single),
  SET_RECORDS: (state, list:TodayDetails[]) => (state.response.records = list),
  REMOVE_RECORD: state => (state.response.record = {} as TodayDetails),
  SET_CARRIER_RECORDS: (state, list:TodayDetails[]) => (state.response.carrierRecords = list),
  ADD_RECORD: (state, single:TodayDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierRecords.length < 12) {
        single.id = state.response.carrierRecords[state.response.carrierRecords.length - 1].id + 1
        state.response.carrierRecords.push(single)
      }
    }
  },
  UPDATE_RECORD: (state, single:TodayDetails) => {
    const itemIndex = state.response.records.findIndex((item: TodayDetails) => item.id === single.id)
    state.response.records[itemIndex] = single
    const carrierItemIndex = state.response.carrierRecords.findIndex((item: TodayDetails) => item.id === single.id)
    state.response.carrierRecords[carrierItemIndex] = single
  }

}

export const actions:ActionTree<TodayState, RootStoreState> = {
  fillRequest ({ commit }, request: TodayDetails) {
    commit('FILL_RECORD_REQUEST', request)
  },
  async getRecordsByCarrierId ({ commit, rootState }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<TodayDetails[]>(endPoint + '/Carriers', rootState.carrierId, payload.page_number, undefined, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECORDS', (response.data as DataResponse<TodayDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<TodayDetails[]>).total_pages)
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
  async getRecords ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<TodayDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_RECORDS', (response.data as DataResponse<TodayDetails[]>).data)
          } else {
            commit('SET_ERROR', [] as TodayDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<TodayDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_RECORDS', [] as TodayDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
