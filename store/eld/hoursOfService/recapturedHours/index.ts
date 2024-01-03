import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { RecapturedHoursDetails } from '~/models/eld/hoursOfService/recapturedHours/recapturedHours'

const service: ApiService = new ApiService('/eld_one_api') // Change here

export const state = () => ({
  request: {
    record: {} as RecapturedHoursDetails
  },
  response: {
    record: {} as RecapturedHoursDetails,
    records: [] as RecapturedHoursDetails[],
    carrierRecords: [] as RecapturedHoursDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

const endPoint = '/RecapturedHoursDetails' // Change here

export type RecapturedHoursState = ReturnType<typeof state>

export const getters: GetterTree<RecapturedHoursState, RootStoreState> = {
  recordRequest: state => (state.request),
  record: state => (state.response.record),
  records: state => (state.response.records),
  carrierRecords: state => (state.response.carrierRecords),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<RecapturedHoursState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECORD_REQUEST: (state, request:RecapturedHoursDetails) => (state.request.record = { ...state.request.record, ...request }),
  SET_RECORD: (state, single:RecapturedHoursDetails) => (state.response.record = single),
  SET_RECORDS: (state, list:RecapturedHoursDetails[]) => (state.response.records = list),
  REMOVE_RECORD: state => (state.response.record = {} as RecapturedHoursDetails),
  SET_CARRIER_RECORDS: (state, list:RecapturedHoursDetails[]) => (state.response.carrierRecords = list),
  ADD_RECORD: (state, single:RecapturedHoursDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierRecords.length < 12) {
        single.id = state.response.carrierRecords[state.response.carrierRecords.length - 1].id + 1
        state.response.carrierRecords.push(single)
      }
    }
  },
  UPDATE_RECORD: (state, single:RecapturedHoursDetails) => {
    const itemIndex = state.response.records.findIndex((item: RecapturedHoursDetails) => item.id === single.id)
    state.response.records[itemIndex] = single
    const carrierItemIndex = state.response.carrierRecords.findIndex((item: RecapturedHoursDetails) => item.id === single.id)
    state.response.carrierRecords[carrierItemIndex] = single
  }

}

export const actions:ActionTree<RecapturedHoursState, RootStoreState> = {
  fillRequest ({ commit }, request: RecapturedHoursDetails) {
    commit('FILL_RECORD_REQUEST', request)
  },
  async getRecordsByCarrierId ({ commit, rootState }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<RecapturedHoursDetails[]>(endPoint + '/Carriers', rootState.carrierId, payload.page_number, undefined, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECORDS', (response.data as DataResponse<RecapturedHoursDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<RecapturedHoursDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
