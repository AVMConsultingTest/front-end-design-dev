import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { AssetsDetails } from '~/models/accounting/assets/assetsDetails'
import assetsDetails from '~/static/DummyData/Accounting/assetsDetails'
import ApiService from '~/services/baseService'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    asset: {} as AssetsDetails
  },
  response: {
    asset: {} as AssetsDetails,
    assets: [] as AssetsDetails[],
    carrierAssets: assetsDetails as AssetsDetails[],
    carrierSummary: {} as AssetsDetails
  },
  page: 1,
  loading: false,
  error: '',
  addStep: {
    index: 0,
    title: '',
    subTitle: ''
  }
})

export interface SetAssetRequest {
  asset: AssetsDetails
  step?:number,
  title?:string
}

export const endPoint = 'AssetsDetails'

export type AssetsDetailsState = ReturnType<typeof state>

export const getters: GetterTree<AssetsDetailsState, RootStoreState> = {
  assetRequest: state => (state.request.asset),
  asset: state => (state.response.asset),
  assets: state => (state.response.assets),
  carrierAssets: state => (state.response.carrierAssets),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<AssetsDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_ASSET_REQUEST: (state, request:AssetsDetails) => (state.request.asset = { ...state.request.asset, ...request }),
  SET_CARRIER_ASSETS: (state, list:AssetsDetails[]) => (state.response.carrierAssets = list),
  SET_ASSET: (state, single:AssetsDetails) => (state.response.asset = single),
  SET_ASSETS: (state, list:AssetsDetails[]) => (state.response.assets = list),
  REMOVE_ASSET: state => (state.response.asset = {} as AssetsDetails),
  UPDATE_ASSET: (state, single:AssetsDetails) => {
    const itemIndex = state.response.assets.findIndex((item: AssetsDetails) => item.id === single.id)
    state.response.assets[itemIndex] = single
    const carrierItemIndex = state.response.carrierAssets.findIndex((item: AssetsDetails) => item.id === single.id)
    state.response.carrierAssets[carrierItemIndex] = single
  },
  ADD_ASSET: (state, single: AssetsDetails) => {
    if (single.id === undefined) {
      single.id = state.response.carrierAssets[state.response.carrierAssets.length - 1].id + 1
    }
    state.response.carrierAssets.push(single)
    console.log(single, state.response.carrierAssets)
  },
  SET_ADD_ASSET: (state, request:SetAssetRequest) => {
    if (request.asset) {
      state.request.asset = request.asset as AssetsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions: ActionTree<AssetsDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: AssetsDetails) {
    commit('FILL_ASSET_REQUEST', request)
  },
  setAsset ({ commit }, request:SetAssetRequest) {
    commit('SET_ADD_ASSET', request)
  },
  async addAsset ({ commit }, request:AssetsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<AssetsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_ASSET', request)
        } else {
          commit('ADD_ASSET', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getAssetsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<AssetsDetails[]>('assets', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_ASSETS', (response.data as DataResponse<AssetsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<AssetsDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_ASSETS', assetsDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getAsset ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<AssetsDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_ASSET', (response.data as DataResponse<AssetsDetails[]>).data[0])
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
  async getAssets ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<AssetsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_ASSETS', (response.data as DataResponse<AssetsDetails[]>).data)
          } else {
            commit('SET_ASSETS', [] as AssetsDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<AssetsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_ASSETS', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateAsset ({ commit, getters }, request:AssetsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<AssetsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_ASSET', request)
          commit('SET_ASSETS', getters.assets.map((item: AssetsDetails) => item.id === request.id ? request : item))
          commit('SET_CARRIER_ASSETS', getters.carrierAssets.map((item: AssetsDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_ASSET', request)
      commit('SET_ASSETS', getters.assets.map((item: AssetsDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeAsset ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_ASSET')
          commit('SET_ASSETS', getters.assets.filter((item: AssetsDetails) => item.id !== id))
          commit('SET_CARRIER_ASSETS', getters.carrierAssets.filter((item: AssetsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_ASSETS', getters.assets.filter((item:AssetsDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
