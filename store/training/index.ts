import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { APIResponse } from '~/models/common/apiResponse'
import { RootStoreState } from '~/models/store'
import { Training } from '~/models/training/training'
import ApiService from '~/services/baseService'
import training from '~/static/DummyData/Safety/training'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    training: {} as Training
  },
  response: {
    training: {} as Training,
    trainings: training as Training[],
    carrierTrainings: [] as Training[]
  },
  page: 0,
  loading: false,
  error: ''
})

export const endPoint = 'carrier/trainings'

export type TrainingState = ReturnType<typeof state>

export const getters: GetterTree<TrainingState, RootStoreState> = {
  trainingRequest: state => (state.request.training),
  training: state => (state.response.training),
  trainings: state => (state.response.trainings),
  carrierTrainings: state => (state.response.carrierTrainings),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<TrainingState> = {
  SET_LOADING: (state, loading: boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  SET_TRAINING: (state, single:Training) => (state.response.training = single),
  ADD_TRAINING: (state, single:Training) => {
    if (single.id === undefined) {
      if (state.response.carrierTrainings.length < 12) {
        single.id = state.response.carrierTrainings[state.response.carrierTrainings.length - 1].id + 1
        state.response.carrierTrainings.push(single)
      }
    }
  },
  UPDATE_TRAINING: (state, single:Training) => {
    const itemIndex = state.response.trainings.findIndex((item: Training) => item.id === single.id)
    state.response.trainings[itemIndex] = single
    const carrierItemIndex = state.response.carrierTrainings.findIndex((item: Training) => item.id === single.id)
    state.response.carrierTrainings[carrierItemIndex] = single
  },
  SET_TRAININGS: (state, list:Training[]) => (state.response.trainings = list),
  SET_CARRIER_TRAININGS: (state, list:Training[]) => (state.response.carrierTrainings = list),
  REMOVE_TRAINING: state => (state.response.training = {} as Training)
}

export const actions: ActionTree<TrainingState, RootStoreState> = {
  fillRequest ({ commit }, request: Training) {
    commit('FILL_TRAINING_REQUEST', request)
  },
  async updateTraining ({ commit, getters }, request:Training) {
    commit('SET_LOADING', true)
    try {
      return await service.update<Training, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_TRAINING', request)
          commit('SET_CARRIER_TRAININGS', getters.carrierTrainings.map((item: Training) => item.id === request.id ? request : item))
          commit('SET_TRAININGS', getters.trainings.map((item: Training) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_TRAINING', request)
          commit('SET_TRAININGS', getters.trainings.map((item: Training) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_TRAINING', request)
      commit('SET_TRAINING', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async addTraining ({ commit }, request:Training) {
    commit('SET_LOADING', true)
    try {
      return await service.add<Training, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_TRAINING', request)
        } else {
          commit('ADD_TRAINING', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_TRAINING', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTraining ({ commit }, id: number | string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<Training>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_TRAINING', (response.data as DataResponse<Training>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_TRAINING', training.find((item: Training) => item.id === id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTrainingsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<Training[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_TRAININGS', (response.data as DataResponse<Training[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_TRAININGS', training)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTrainings ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<Training[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_TRAININGS', (response.data as DataResponse<Training[]>).data)
          } else {
            commit('SET_TRAININGS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<Training[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
        return response
      })
    } catch (error) {
      console.log(error)
      commit('SET_ERROR', error)
      // commit('SET_TRAININGS', training)
      commit('SET_TRAININGS', [])
    } finally {
      setTimeout(() => {
        commit('SET_LOADING', false)
      }, 200)
    }
  },
  async removeTraining ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_TRAINING')
          commit('SET_TRAININGS', getters.trainings.filter((item: Training) => item.id !== id))
          commit('SET_CARRIER_TRAININGS', getters.carrierTrainings.filter((item: Training) => item.id !== id))
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
