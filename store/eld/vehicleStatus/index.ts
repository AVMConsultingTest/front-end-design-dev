import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { VehiclesStatusDetails } from '~/models/eld/vehiclesStatus/vehiclesStatusDetails'

const service: ApiService = new ApiService('/eld_one_api') // Change here

export const state = () => ({
  request: {
    record: {} as VehiclesStatusDetails
  },
  response: {
    record: {} as VehiclesStatusDetails,
    records: [] as VehiclesStatusDetails[],
    carrierRecords: [] as VehiclesStatusDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

const endPoint = '/VehiclesStatusDetails' // Change here

export type VehicleStatusState = ReturnType<typeof state>

export const getters: GetterTree<VehicleStatusState, RootStoreState> = {
  recordRequest: state => (state.request),
  record: state => (state.response.record),
  records: state => (state.response.records),
  carrierRecords: state => (state.response.carrierRecords),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<VehicleStatusState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECORD_REQUEST: (state, request:VehiclesStatusDetails) => (state.request.record = { ...state.request.record, ...request }),
  SET_RECORD: (state, single:VehiclesStatusDetails) => (state.response.record = single),
  SET_RECORDS: (state, list:VehiclesStatusDetails[]) => (state.response.records = list),
  REMOVE_RECORD: state => (state.response.record = {} as VehiclesStatusDetails),
  SET_CARRIER_RECORDS: (state, list:VehiclesStatusDetails[]) => (state.response.carrierRecords = list),
  ADD_RECORD: (state, single:VehiclesStatusDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierRecords.length < 12) {
        single.id = state.response.carrierRecords[state.response.carrierRecords.length - 1].id + 1
        state.response.carrierRecords.push(single)
      }
    }
  },
  UPDATE_RECORD: (state, single:VehiclesStatusDetails) => {
    const itemIndex = state.response.records.findIndex((item: VehiclesStatusDetails) => item.id === single.id)
    state.response.records[itemIndex] = single
    const carrierItemIndex = state.response.carrierRecords.findIndex((item: VehiclesStatusDetails) => item.id === single.id)
    state.response.carrierRecords[carrierItemIndex] = single
  }

}

export const actions:ActionTree<VehicleStatusState, RootStoreState> = {
  fillRequest ({ commit }, request: VehiclesStatusDetails) {
    commit('FILL_RECORD_REQUEST', request)
  },
  async getRecordsByCarrierId ({ commit, rootState }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<VehiclesStatusDetails[]>(endPoint + '/Carriers', rootState.carrierId, payload.page_number, 100, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECORDS', (response.data as DataResponse<VehiclesStatusDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<VehiclesStatusDetails[]>).total_pages)
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
