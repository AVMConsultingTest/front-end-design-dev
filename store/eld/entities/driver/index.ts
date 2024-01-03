import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { DriversDetails } from '~/models/eld/entities/drivers/drivers'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    record: {} as DriversDetails
  },
  response: {
    record: {} as DriversDetails,
    records: [] as DriversDetails[],
    carrierRecords: [] as DriversDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

const endPoint = 'carrier/eld/entities/drivers' // Change here

export type DriverState = ReturnType<typeof state>

export const getters: GetterTree<DriverState, RootStoreState> = {
  recordRequest: state => (state.request),
  record: state => (state.response.record),
  records: state => (state.response.records),
  carrierRecords: state => (state.response.carrierRecords),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<DriverState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECORD_REQUEST: (state, request:DriversDetails) => (state.request.record = { ...state.request.record, ...request }),
  SET_RECORD: (state, single:DriversDetails) => (state.response.record = single),
  SET_RECORDS: (state, list:DriversDetails[]) => (state.response.records = list),
  REMOVE_RECORD: state => (state.response.record = {} as DriversDetails),
  SET_CARRIER_RECORDS: (state, list:DriversDetails[]) => (state.response.carrierRecords = list),
  ADD_RECORD: (state, single:DriversDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierRecords.length < 12) {
        single.id = state.response.carrierRecords[state.response.carrierRecords.length - 1].id + 1
        state.response.carrierRecords.push(single)
      }
    }
  },
  UPDATE_RECORD: (state, single:DriversDetails) => {
    const itemIndex = state.response.records.findIndex((item: DriversDetails) => item.id === single.id)
    state.response.records[itemIndex] = single
    const carrierItemIndex = state.response.carrierRecords.findIndex((item: DriversDetails) => item.id === single.id)
    state.response.carrierRecords[carrierItemIndex] = single
  }

}

export const actions:ActionTree<DriverState, RootStoreState> = {
  fillRequest ({ commit }, request: DriversDetails) {
    commit('FILL_RECORD_REQUEST', request)
  },
  async getRecordsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<DriversDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECORDS', (response.data as DataResponse<DriversDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<DriversDetails[]>).total_pages)
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
