import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { DataResponse } from '~/models/common/DataResponse'
import { TaskDetails } from '~/models/accounting/taskDetails/taskDetails'
import { GetPayload } from '~/models/common/GetPayload'
import ApiService from '~/services/baseService'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    task: {} as TaskDetails
  },
  response: {
    task: {} as TaskDetails,
    tasks: [] as TaskDetails[],
    carrierTasks: [] as TaskDetails[]
  },
  page: 1,
  loading: false,
  error: ''
})

export const endPoint = 'TasksDetails'

export type TaskDetailsState = ReturnType<typeof state>

export const getters: GetterTree<TaskDetailsState, RootStoreState> = {
  taskRequest: state => (state.request.task),
  task: state => (state.response.task),
  tasks: state => (state.response.tasks),
  carrierTasks: state => (state.response.carrierTasks),
  pageCount: state => (state.page)
}

export const mutations: MutationTree<TaskDetailsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  ADD_TASK: (state, single: TaskDetails) => {
    if (single.id === undefined && state.response.tasks.length < 12) {
      single.id = state.response.tasks[state.response.tasks.length - 1].id + 1
      state.response.tasks.push(single)
    }
    console.log(single, state.response.tasks)
  },
  FILL_TASK_REQUEST: (state, request:TaskDetails) => (state.request.task = { ...state.request.task, ...request }),
  SET_CARRIER_TASKS: (state, list:TaskDetails[]) => (state.response.carrierTasks = list),
  SET_TASK: (state, single:TaskDetails) => (state.response.task = single),
  SET_TASKS: (state, list:TaskDetails[]) => (state.response.tasks = list),
  REMOVE_TASK: state => (state.response.task = {} as TaskDetails),
  UPDATE_TASK: (state, single:TaskDetails) => {
    const itemIndex = state.response.tasks.findIndex((item: TaskDetails) => item.id === single.id)
    state.response.tasks[itemIndex] = single
  }
}

export const actions: ActionTree<TaskDetailsState, RootStoreState> = {
  fillRequest ({ commit }, request: TaskDetails) {
    commit('FILL_TASK_REQUEST', request)
  },
  async addTask ({ commit }, request:TaskDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<TaskDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_TASK', request)
        } else {
          commit('ADD_TASK', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_TASK', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getTasksByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<TaskDetails[]>('taskDetails', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_TASKS', (response.data as DataResponse<TaskDetails[]>).data)
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
  async getTask ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<TaskDetails[]>(endPoint, id).then((response:any) => {
        if (response.status === 200) {
          commit('SET_TASK', (response.data as DataResponse<TaskDetails[]>).data[0])
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
  async getTasks ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<TaskDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_TASKS', (response.data as DataResponse<TaskDetails[]>).data)
          } else {
            commit('SET_TASKS', [] as TaskDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<TaskDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_TASKS', [] as TaskDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateTask ({ commit, getters }, request:TaskDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<TaskDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_TASK', request)
          commit('SET_TASKS', getters.tasks.map((item: TaskDetails) => item.id === request.id ? request : item))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_TASK', request)
      commit('SET_TASKS', getters.tasks.map((item: TaskDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeTask ({ commit, getters }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_TASK')
          commit('SET_TASKS', getters.tasks.filter((item: TaskDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_TASKS', getters.tasks.filter((item:TaskDetails) => item.id !== id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  }
}
