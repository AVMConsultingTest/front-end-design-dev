import { GetterTree, ActionTree, MutationTree } from 'vuex'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { TeamsDetails } from '~/models/CarrierSettings/teamsDetails/teamsDetails'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService('/carrier_settings_api')

export const state = () => ({
  request: {
    team: {} as TeamsDetails
  },
  response: {
    team: {} as TeamsDetails,
    teams: [] as TeamsDetails[],
    carrierTeams: [] as TeamsDetails[]
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

export interface SetTeamRequest {
    team?:null|TeamsDetails,
    step?:number,
    title?:string
}

const endPoint = '/TeamsDetails'

export type TeamState = ReturnType<typeof state>

export const getters: GetterTree<TeamState, RootStoreState> = {
  teamRequest: state => (state.request),
  team: state => (state.response.team),
  teams: state => (state.response.teams),
  carrierTeams: state => (state.response.carrierTeams),
  step: state => (state.addStep),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<TeamState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_TEAM_REQUEST: (state, request:TeamsDetails) => (state.request.team = { ...state.request.team, ...request }),
  SET_TEAM: (state, single:TeamsDetails) => (state.response.team = single),
  SET_TEAMS: (state, list:TeamsDetails[]) => (state.response.teams = list),
  REMOVE_TEAM: state => (state.response.team = {} as TeamsDetails),
  SET_CARRIER_TEAMS: (state, list:TeamsDetails[]) => (state.response.carrierTeams = list),
  ADD_TEAM: (state, single:TeamsDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierTeams.length < 12) {
        single.id = state.response.carrierTeams[state.response.carrierTeams.length - 1].id + 1
        state.response.carrierTeams.push(single)
      }
    }
  },
  UPDATE_TEAM: (state, single:TeamsDetails) => {
    const itemIndex = state.response.teams.findIndex((item: TeamsDetails) => item.id === single.id)
    state.response.teams[itemIndex] = single
    const carrierItemIndex = state.response.carrierTeams.findIndex((item: TeamsDetails) => item.id === single.id)
    state.response.carrierTeams[carrierItemIndex] = single
  },
  SET_ADD_TEAM (state, request:SetTeamRequest) {
    if (request.team) {
      state.request.team = request.team as TeamsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<TeamState, RootStoreState> = {
  fillRequest ({ commit }, request: TeamsDetails) {
    commit('FILL_TEAM_REQUEST', request)
  },
  setTeam ({ commit }, request:SetTeamRequest) {
    commit('SET_ADD_TEAM', request)
  },
  async addTeam ({ commit }, request:TeamsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<TeamsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_TEAM', request)
        } else {
          commit('ADD_TEAM', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateTeam ({ commit, getters }, request:TeamsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<TeamsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_TEAM', request)
          commit('SET_CARRIER_TEAMS', getters.carrierTeams.map((item: TeamsDetails) => item.id === request.id ? request : item))
          commit('SET_TEAMS', getters.teams.map((item: TeamsDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_TEAM', request)
          commit('SET_TEAMS', getters.teams.map((item: TeamsDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_TEAM', request)
      commit('SET_TEAM', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTeam ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<TeamsDetails[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_TEAM', (response.data as DataResponse<TeamsDetails[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.team)
      commit('SET_TEAM', getters.teams.filter((item: TeamsDetails) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTeams ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<TeamsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_TEAMS', (response.data as DataResponse<TeamsDetails[]>).data)
          } else {
            commit('SET_ERROR', [] as TeamsDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<TeamsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_TEAMS', [] as TeamsDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTeamByCarrierId ({ commit, rootState }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<TeamsDetails[]>(endPoint + '/Carriers', rootState.carrierId, payload.page_number, undefined, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_TEAMS', (response.data as DataResponse<TeamsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<TeamsDetails[]>).total_pages)
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
  async removeTeam ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_TEAM')
          commit('SET_TEAMS', getters.teams.filter((item: TeamsDetails) => item.id !== id))
          commit('SET_CARRIER_TEAMS', getters.carrierTeams.filter((item: TeamsDetails) => item.id !== id))
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
