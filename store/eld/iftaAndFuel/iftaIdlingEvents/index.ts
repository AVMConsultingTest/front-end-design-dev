import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { IftaIdlingEventsDetails } from '~/models/eld/iftaAndFuel/iftaIdlingEvents/iftaIdlingEvents'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    record: {} as IftaIdlingEventsDetails
  },
  response: {
    record: {} as IftaIdlingEventsDetails,
    records: [] as IftaIdlingEventsDetails[],
    carrierRecords: [] as IftaIdlingEventsDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

const endPoint = 'carrier/eld/ifta/idling-events'

export type IftaIdlingEventsState = ReturnType<typeof state>

export const getters: GetterTree<IftaIdlingEventsState, RootStoreState> = {
  recordRequest: state => (state.request),
  record: state => (state.response.record),
  records: state => (state.response.records),
  carrierRecords: state => (state.response.carrierRecords),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<IftaIdlingEventsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECORD_REQUEST: (state, request:IftaIdlingEventsDetails) => (state.request.record = { ...state.request.record, ...request }),
  SET_RECORD: (state, single:IftaIdlingEventsDetails) => (state.response.record = single),
  SET_RECORDS: (state, list:IftaIdlingEventsDetails[]) => (state.response.records = list),
  REMOVE_RECORD: state => (state.response.record = {} as IftaIdlingEventsDetails),
  SET_CARRIER_RECORDS: (state, list:IftaIdlingEventsDetails[]) => (state.response.carrierRecords = list),
  ADD_RECORD: (state, single:IftaIdlingEventsDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierRecords.length < 12) {
        single.id = state.response.carrierRecords[state.response.carrierRecords.length - 1].id + 1
        state.response.carrierRecords.push(single)
      }
    }
  },
  UPDATE_RECORD: (state, single:IftaIdlingEventsDetails) => {
    const itemIndex = state.response.records.findIndex((item: IftaIdlingEventsDetails) => item.id === single.id)
    state.response.records[itemIndex] = single
    const carrierItemIndex = state.response.carrierRecords.findIndex((item: IftaIdlingEventsDetails) => item.id === single.id)
    state.response.carrierRecords[carrierItemIndex] = single
  }

}

export const actions:ActionTree<IftaIdlingEventsState, RootStoreState> = {
  fillRequest ({ commit }, request: IftaIdlingEventsDetails) {
    commit('FILL_RECORD_REQUEST', request)
  },
  async getRecordsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<IftaIdlingEventsDetails[]>(endPoint,  payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECORDS', (response.data as DataResponse<IftaIdlingEventsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<IftaIdlingEventsDetails[]>).total_pages)
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
