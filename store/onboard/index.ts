import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { CarriersDetails } from '~/models/carriers/carriersDetails'
import { APIResponse } from '~/models/common/apiResponse'
import { RootStoreState } from '~/models/store'
import ApiService from '~/services/baseService'

const service: ApiService = new ApiService()

export const state = () => ({
  currentStep: 1,
  totalSteps: 5,
  request: {
    carrier: {} as CarriersDetails
  },
  response: {
    carrier: [] as CarriersDetails[]
  },
  error: '',
  loading: false
})

export const endPoint = 'companies/onboarding'

export type OnboardState = ReturnType<typeof state>

export const getters: GetterTree<OnboardState, RootStoreState> = {
  currentStep: state => state.currentStep,
  totalSteps: state => state.totalSteps,
  percent: state => ((state.currentStep / state.totalSteps) * 100),
  carrier: state => (state.response.carrier),
  carrierRequest: state => (state.request.carrier)
}

export const mutations: MutationTree<OnboardState> = {
  SET_CARRIER: (state, carrier: CarriersDetails) => (state.request.carrier = carrier),
  SET_STEP: (state, step:number) => (state.currentStep = step),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_LOADING: (state, loading:boolean) => (state.loading = loading)
}

export const actions: ActionTree<OnboardState, RootStoreState> = {
  setCarrier ({ commit }, request: CarriersDetails) {
    commit('SET_CARRIER', request)
  },
  setStep ({ commit }, request:number) {
    commit('SET_STEP', request)
  },
  async createCarrier ({ commit, dispatch }, request:CarriersDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<CarriersDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch('setCarrier', request)
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
