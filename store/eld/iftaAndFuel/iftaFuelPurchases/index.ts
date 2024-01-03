import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'
import { IftaFuelPurchasesDetails } from '~/models/eld/iftaAndFuel/iftaFuelPurchases/iftaFuelPurchases'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    record: {} as IftaFuelPurchasesDetails
  },
  response: {
    record: {} as IftaFuelPurchasesDetails,
    records: [] as IftaFuelPurchasesDetails[],
    carrierRecords: [] as IftaFuelPurchasesDetails[]
  },
  page: 0,
  loading: false,
  error: ''
})

const endPoint = 'carrier/eld/ifta/fuel-purchases'

export type IftaFuelPurchasesState = ReturnType<typeof state>

export const getters: GetterTree<IftaFuelPurchasesState, RootStoreState> = {
  recordRequest: state => (state.request),
  record: state => (state.response.record),
  records: state => (state.response.records),
  carrierRecords: state => (state.response.carrierRecords),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<IftaFuelPurchasesState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_RECORD_REQUEST: (state, request:IftaFuelPurchasesDetails) => (state.request.record = { ...state.request.record, ...request }),
  SET_RECORD: (state, single:IftaFuelPurchasesDetails) => (state.response.record = single),
  SET_RECORDS: (state, list:IftaFuelPurchasesDetails[]) => (state.response.records = list),
  REMOVE_RECORD: state => (state.response.record = {} as IftaFuelPurchasesDetails),
  SET_CARRIER_RECORDS: (state, list:IftaFuelPurchasesDetails[]) => (state.response.carrierRecords = list),
  ADD_RECORD: (state, single:IftaFuelPurchasesDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierRecords.length < 12) {
        single.id = state.response.carrierRecords[state.response.carrierRecords.length - 1].id + 1
        state.response.carrierRecords.push(single)
      }
    }
  },
  UPDATE_RECORD: (state, single:IftaFuelPurchasesDetails) => {
    const itemIndex = state.response.records.findIndex((item: IftaFuelPurchasesDetails) => item.id === single.id)
    state.response.records[itemIndex] = single
    const carrierItemIndex = state.response.carrierRecords.findIndex((item: IftaFuelPurchasesDetails) => item.id === single.id)
    state.response.carrierRecords[carrierItemIndex] = single
  }

}

export const actions:ActionTree<IftaFuelPurchasesState, RootStoreState> = {
  fillRequest ({ commit }, request: IftaFuelPurchasesDetails) {
    commit('FILL_RECORD_REQUEST', request)
  },
  async getRecordsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<IftaFuelPurchasesDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_RECORDS', (response.data as DataResponse<IftaFuelPurchasesDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<IftaFuelPurchasesDetails[]>).total_pages)
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
