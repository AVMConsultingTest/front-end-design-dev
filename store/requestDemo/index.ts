import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { APIResponse } from '~/models/common/apiResponse'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'
import { RequestDemo } from '~/models/requestDemo/requestDemo'

const service: ApiService = new ApiService('/request_demo_api')

export const state = () => ({
  request: {
    demo: {} as RequestDemo
  },
  response: {
    demo: {} as RequestDemo,
    demos: [] as RequestDemo[],
    carrierDemos: [] as RequestDemo[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'DemoDetails'

export type DemoState = ReturnType<typeof state>

export const getters: GetterTree<DemoState, RootStoreState> = {
  demoRequest: state => (state.request.demo),
  demo: state => (state.response.demo),
  demos: state => (state.response.demos),
  carrierDemos: state => (state.response.carrierDemos),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<DemoState> = {
  SET_LOADING: (state, loading: boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_DEMO_REQUEST: (state, request:RequestDemo) => (state.request.demo = { ...state.request.demo, ...request }),
  SET_DEMO: (state, single:RequestDemo) => (state.response.demo = single),
  ADD_DEMO: (state, single:RequestDemo) => {
    if (single.id === undefined) {
      single.id = state.response.demos[state.response.demos.length - 1].id + 1
    }
    state.response.demos.push(single)
  },
  UPDATE_DEMO: (state, single:RequestDemo) => {
    const itemIndex = state.response.demos.findIndex((item: RequestDemo) => item.id === single.id)
    state.response.demos[itemIndex] = single
  },
  SET_DEMOS: (state, list:RequestDemo[]) => (state.response.demos = list),
  SET_CARRIER_DEMOS: (state, list:RequestDemo[]) => (state.response.carrierDemos = list),
  REMOVE_DEMO: state => (state.response.demo = {} as RequestDemo)
}

export const actions: ActionTree<DemoState, RootStoreState> = {
  fillRequest ({ commit }, request: RequestDemo) {
    commit('FILL_DEMO_REQUEST', request)
  },
  async addDemo ({ commit }, request:RequestDemo) {
    commit('SET_LOADING', true)
    try {
      return await service.add<RequestDemo, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_DEMO', request)
        } else {
          commit('ADD_DEMO', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_DEMO', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
