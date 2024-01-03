import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { VendorsDetails } from '~/models/accounting/vendors/vendorsDetails'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import vendors from '~/static/DummyData/Accounting/vendors'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    vendor: {} as VendorsDetails
  },
  response: {
    vendor: vendors[0] as VendorsDetails,
    vendors: [] as VendorsDetails[],
    carrierVendors: vendors as VendorsDetails[]
  },
  page: 0,
  loading: false,
  error: '',
  addStep: {
    index: 0,
    title: '',
    subTitle: ''
  }
})

export interface SetVendorRequest {
  vendor: VendorsDetails
  step?:number,
  title?:string
}

export const endPoint = 'carrier/vendors'

export type VendorsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<VendorsDetailsState, RootStoreState> = {
  vendorRequest: state => (state.request.vendor),
  vendor: state => (state.response.vendor),
  vendors: state => (state.response.vendors),
  carrierVendors: state => (state.response.carrierVendors),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<VendorsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_VENDOR_REQUEST: (state, request:VendorsDetails) => (state.request.vendor = { ...state.request.vendor, ...request }),
  SET_CARRIER_VENDORS: (state, list:VendorsDetails[]) => (state.response.carrierVendors = list),
  SET_VENDOR: (state, single:VendorsDetails) => (state.response.vendor = single),
  SET_VENDORS: (state, list:VendorsDetails[]) => (state.response.vendors = list),
  REMOVE_VENDOR: state => (state.response.vendor = {} as VendorsDetails),
  UPDATE_VENDOR: (state, single:VendorsDetails) => {
    const itemIndex = state.response.vendors.findIndex((item: VendorsDetails) => item.id === single.id)
    state.response.vendors[itemIndex] = single
    const carrierItemIndex = state.response.carrierVendors.findIndex((item: VendorsDetails) => item.id === single.id)
    state.response.carrierVendors[carrierItemIndex] = single
  },
  ADD_VENDOR: (state, single: VendorsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.carrierVendors[state.response.carrierVendors.length - 1].id + 1
    }
    state.response.carrierVendors.push(single)
    console.log(single, state.response.carrierVendors)
  },
  SET_ADD_VENDOR: (state, request:SetVendorRequest) => {
    if (request.vendor) {
      state.request.vendor = request.vendor as VendorsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<VendorsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: VendorsDetails) {
    commit('FILL_VENDOR_REQUEST', request)
  },
  setVendor ({ commit }, request:SetVendorRequest) {
    commit('SET_ADD_VENDOR', request)
  },
  async addVendor ({ commit }, request:VendorsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<VendorsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_VENDOR', request)
        } else {
          commit('ADD_VENDOR', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getVendorsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<VendorsDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_VENDORS', (response.data as DataResponse<VendorsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<VendorsDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_VENDORS', vendors)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getVendor ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<VendorsDetails>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_VENDOR', (response.data as DataResponse<VendorsDetails>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_VENDOR', vendors[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getVendors ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<VendorsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_VENDORS', (response.data as DataResponse<VendorsDetails[]>).data)
          } else {
            commit('SET_VENDORS', vendors)
          }
          commit('SET_PAGE', (response.data as DataResponse<VendorsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_VENDORS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateVendor ({ commit, getters }, request:VendorsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<VendorsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_VENDOR', request)
          commit('SET_CARRIER_VENDORS', getters.carrierVendors.map((item: VendorsDetails) => item.id === request.id ? request : item))
          commit('SET_VENDORS', getters.vendors.map((item: VendorsDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_VENDOR', request)
          commit('SET_VENDORS', getters.vendors.map((item: VendorsDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_VENDOR', request)
      commit('SET_VENDOR', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeVendor ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_VENDOR')
          commit('SET_VENDORS', getters.vendors.filter((item: VendorsDetails) => item.id !== id))
          commit('SET_CARRIER_VENDORS', getters.carrierVendors.filter((item: VendorsDetails) => item.id !== id))
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
