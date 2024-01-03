import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { TrucksDetails } from '~/models/eld/entities/trucks/trucks'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    record: {} as TrucksDetails
  },
  response: {
    record: {} as TrucksDetails,
    records: [] as TrucksDetails[],
    carrierRecords: [] as TrucksDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

const endPoint = 'carrier/eld/entities/trucks'

export type TruckState = ReturnType<typeof state>

export const getters: GetterTree<TruckState, RootStoreState> = {
  recordRequest: state => (state.request),
  record: state => (state.response.record),
  records: state => (state.response.records),
  carrierRecords: state => (state.response.carrierRecords),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<TruckState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECORD_REQUEST: (state, request:TrucksDetails) => (state.request.record = { ...state.request.record, ...request }),
  SET_RECORD: (state, single:TrucksDetails) => (state.response.record = single),
  SET_RECORDS: (state, list:TrucksDetails[]) => (state.response.records = list),
  REMOVE_RECORD: state => (state.response.record = {} as TrucksDetails),
  SET_CARRIER_RECORDS: (state, list:TrucksDetails[]) => (state.response.carrierRecords = list),
  ADD_RECORD: (state, single:TrucksDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierRecords.length < 12) {
        single.id = state.response.carrierRecords[state.response.carrierRecords.length - 1].id + 1
        state.response.carrierRecords.push(single)
      }
    }
  },
  UPDATE_RECORD: (state, single:TrucksDetails) => {
    const itemIndex = state.response.records.findIndex((item: TrucksDetails) => item.id === single.id)
    state.response.records[itemIndex] = single
    const carrierItemIndex = state.response.carrierRecords.findIndex((item: TrucksDetails) => item.id === single.id)
    state.response.carrierRecords[carrierItemIndex] = single
  }

}

export const actions:ActionTree<TruckState, RootStoreState> = {
  fillRequest ({ commit }, request: TrucksDetails) {
    commit('FILL_RECORD_REQUEST', request)
  },
  async getRecordsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<TrucksDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECORDS', (response.data as DataResponse<TrucksDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<TrucksDetails[]>).total_pages)
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
