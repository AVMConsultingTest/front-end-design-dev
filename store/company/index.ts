import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Company } from '../../models/company'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService('')

export const state = () => ({
  companies: [] as Company[],
  company: {} as Company,
  loading: false,
  error: ''
})

export type CompanyState = ReturnType<typeof state>

export const getters: GetterTree<CompanyState, RootStoreState> = {
  companies: state => (state.companies),
  company: state => (state.company),
  companyCount: state => (state.companies.length)
}

export const mutations : MutationTree<CompanyState> = {
  SET_LIST: (state, list:Company[]) => (state.companies = list),
  SET_SINGLE: (state, single:Company) => (state.company = single),
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  PUSH_COMPANY: (state, company:Company) => (state.companies.push(company)),
  REMOVE_COMPANY: state => (state.company = {} as Company),
  SET_ERROR: (state, err:string) => (state.error = err)
}

export const actions: ActionTree<CompanyState, RootStoreState> = {
  async list ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await service.get<Company[]>('company/all/', page_number).then((response) => {
        if (response.status === 200) {
          commit('SET_LIST', response.data)
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async get ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<Company>('company/', id).then((response) => {
        if (response.status === 200) {
          commit('SET_SINGLE', response.data)
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async create ({ commit }, request:Company) {
    commit('SET_LOADING', true)
    try {
      return await service.add<Company, APIResponse>('company/register', request).then((response) => {
        if (response.status === 200) {
          commit('PUSH_COMPANY', request)
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async update ({ commit }, request:Company) {
    commit('SET_LOADING', true)
    try {
      return await service.update<Company, APIResponse>('company/register/update', request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_SINGLE', request)
        } else {
          commit('SET_ERROR', response.statusText)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async remove ({ commit }, id:string|number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<Company>('company/register/remove', id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_COMPANY')
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
