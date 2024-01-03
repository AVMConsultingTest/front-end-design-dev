import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { EldAlertsDetails } from '~/models/eld/eldAlerts/eldAlerts'

const service: ApiService = new ApiService() // Change here

export const state = () => ({
  request: {
    record: {} as EldAlertsDetails
  },
  response: {
    record: {} as EldAlertsDetails,
    records: [] as EldAlertsDetails[],
    carrierRecords: [] as EldAlertsDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

const endPoint = 'carrier/eld/alerts'

export type EldAlertsState = ReturnType<typeof state>

export const getters: GetterTree<EldAlertsState, RootStoreState> = {
  recordRequest: state => (state.request),
  record: state => (state.response.record),
  records: state => (state.response.records),
  carrierRecords: state => (state.response.carrierRecords),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<EldAlertsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECORD_REQUEST: (state, request:EldAlertsDetails) => (state.request.record = { ...state.request.record, ...request }),
  SET_RECORD: (state, single:EldAlertsDetails) => (state.response.record = single),
  SET_RECORDS: (state, list:EldAlertsDetails[]) => (state.response.records = list),
  REMOVE_RECORD: state => (state.response.record = {} as EldAlertsDetails),
  SET_CARRIER_RECORDS: (state, list:EldAlertsDetails[]) => (state.response.carrierRecords = list),
  ADD_RECORD: (state, single:EldAlertsDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierRecords.length < 12) {
        single.id = state.response.carrierRecords[state.response.carrierRecords.length - 1].id + 1
        state.response.carrierRecords.push(single)
      }
    }
  },
  UPDATE_RECORD: (state, single:EldAlertsDetails) => {
    const itemIndex = state.response.records.findIndex((item: EldAlertsDetails) => item.id === single.id)
    state.response.records[itemIndex] = single
    const carrierItemIndex = state.response.carrierRecords.findIndex((item: EldAlertsDetails) => item.id === single.id)
    state.response.carrierRecords[carrierItemIndex] = single
  }

}

export const actions:ActionTree<EldAlertsState, RootStoreState> = {
  fillRequest ({ commit }, request: EldAlertsDetails) {
    commit('FILL_RECORD_REQUEST', request)
  },
  async getRecordsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<EldAlertsDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECORDS', (response.data as DataResponse<EldAlertsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<EldAlertsDetails[]>).total_pages)
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
