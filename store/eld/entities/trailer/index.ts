import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { TrailersDetails } from '~/models/eld/entities/trailers/trailers'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    record: {} as TrailersDetails
  },
  response: {
    record: {} as TrailersDetails,
    records: [] as TrailersDetails[],
    carrierRecords: [] as TrailersDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

const endPoint = 'carrier/eld/entities/trailers'

export type TrailerState = ReturnType<typeof state>

export const getters: GetterTree<TrailerState, RootStoreState> = {
  recordRequest: state => (state.request),
  record: state => (state.response.record),
  records: state => (state.response.records),
  carrierRecords: state => (state.response.carrierRecords),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<TrailerState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECORD_REQUEST: (state, request:TrailersDetails) => (state.request.record = { ...state.request.record, ...request }),
  SET_RECORD: (state, single:TrailersDetails) => (state.response.record = single),
  SET_RECORDS: (state, list:TrailersDetails[]) => (state.response.records = list),
  REMOVE_RECORD: state => (state.response.record = {} as TrailersDetails),
  SET_CARRIER_RECORDS: (state, list:TrailersDetails[]) => (state.response.carrierRecords = list),
  ADD_RECORD: (state, single:TrailersDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierRecords.length < 12) {
        single.id = state.response.carrierRecords[state.response.carrierRecords.length - 1].id + 1
        state.response.carrierRecords.push(single)
      }
    }
  },
  UPDATE_RECORD: (state, single:TrailersDetails) => {
    const itemIndex = state.response.records.findIndex((item: TrailersDetails) => item.id === single.id)
    state.response.records[itemIndex] = single
    const carrierItemIndex = state.response.carrierRecords.findIndex((item: TrailersDetails) => item.id === single.id)
    state.response.carrierRecords[carrierItemIndex] = single
  }

}

export const actions:ActionTree<TrailerState, RootStoreState> = {
  fillRequest ({ commit }, request: TrailersDetails) {
    commit('FILL_RECORD_REQUEST', request)
  },
  async getRecordsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<TrailersDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECORDS', (response.data as DataResponse<TrailersDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<TrailersDetails[]>).total_pages)
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
