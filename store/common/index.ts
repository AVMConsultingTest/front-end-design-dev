import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { SelectOption } from '~/components/ts/interfaces'
import { RootStoreState } from '~/models/store'
import usaStates from '~/static/usaStatesCities.json'

export const state = () => ({
  states: [] as any[],
  cities: [] as SelectOption[],
  companyTypes: [
    { id: 1, text: 'Carrier', selected: false } as SelectOption,
    { id: 2, text: 'Broker', selected: false } as SelectOption
  ] as SelectOption[]
})

export type CommonState = ReturnType<typeof state>

export const getters: GetterTree<CommonState, RootStoreState> = {
  states: (state) => {
    const options = [] as SelectOption[]
    Object.keys(state.states)?.forEach((item: any, index: number) => {
      options.push({
        id: index + 1,
        text: item,
        selected: false,
        img: undefined
      })
    })
    return options
  },
  companyTypes: state => (state.companyTypes),
  cities: state => (state.cities)
}

export const mutations: MutationTree<CommonState> = {
  SET_STATES: (state, json) => (state.states = json),
  SET_CITIES: (state, key) => {
    state.cities = [] as SelectOption[]
    state.states[key]?.forEach((item: any) => {
      state.cities.push({
        id: item,
        text: item,
        selected: false,
        img: undefined
      })
    })
  }
}

export const actions : ActionTree<CommonState, RootStoreState> = {
  getStates ({ commit }) {
    commit('SET_STATES', usaStates)
  },
  getCities ({ commit }, key) {
    commit('SET_CITIES', key)
  }
}
