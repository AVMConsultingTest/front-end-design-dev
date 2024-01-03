import { GetterTree, ActionTree, MutationTree } from 'vuex'
// import { DataResponse } from '~/models/common/DataResponse'
import ApiService from '~/services/baseService'
import { APIResponse } from '~/models/common/apiResponse'
import { AlertsDetails, AlertsSummary } from '~/models/alerts'
import alertsSummary from '~/static/DummyData/Safety/alertsSummary'
import alertsDetails from '~/static/DummyData/Safety/alertsDetails'
import { DataResponse } from '~/models/common/DataResponse'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    alert: {} as AlertsDetails
  },
  response: {
    alert: {} as AlertsDetails,
    alerts: [] as AlertsDetails[],
    summary: {} as AlertsSummary,
    carrierAlerts: alertsDetails as AlertsDetails[],
    carrierSummary: alertsSummary[0] as AlertsSummary
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

export interface SetAlertRequest {
    alert?:null|AlertsDetails,
    step?:number,
    title?:string
}

const endPoint = 'carrier/alerts'
const endPointTwo = 'AlertsSummary'

export type AlertState = ReturnType<typeof state>

export const getters: GetterTree<AlertState, RootStoreState> = {
  alertRequest: state => (state.request),
  alert: state => (state.response.alert),
  alerts: state => (state.response.alerts),
  summary: state => (state.response.summary),
  carrierAlerts: state => (state.response.carrierAlerts),
  carrierSummary: state => (state.response.carrierSummary),
  step: state => (state.addStep),
  pageCount: state => (state.page)
}

export const mutations : MutationTree<AlertState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_ALERT_REQUEST: (state, request:AlertsDetails) => (state.request.alert = { ...state.request.alert, ...request }),
  SET_ALERT: (state, single:AlertsDetails) => (state.response.alert = single),
  SET_ALERTS: (state, list:AlertsDetails[]) => (state.response.alerts = list),
  REMOVE_ALERT: state => (state.response.alert = {} as AlertsDetails),
  SET_CARRIER_ALERTS: (state, list:AlertsDetails[]) => (state.response.carrierAlerts = list),
  SET_CARRIER_SUMMARY: (state, single:AlertsSummary) => (state.response.carrierSummary = single),
  SET_SUMMARY: (state, single:AlertsSummary) => (state.response.summary = single),
  REMOVE_SUMMARY: state => (state.response.summary = {} as AlertsSummary),
  ADD_ALERT: (state, single:AlertsDetails) => {
    if (single.id === undefined) {
      if (state.response.carrierAlerts.length < 12) {
        single.id = state.response.carrierAlerts[state.response.carrierAlerts.length - 1].id + 1
        state.response.carrierAlerts.push(single)
      }
    }
  },
  UPDATE_ALERT: (state, single:AlertsDetails) => {
    const itemIndex = state.response.alerts.findIndex((item: AlertsDetails) => item.id === single.id)
    state.response.alerts[itemIndex] = single
    const carrierItemIndex = state.response.carrierAlerts.findIndex((item: AlertsDetails) => item.id === single.id)
    state.response.carrierAlerts[carrierItemIndex] = single
  },
  SET_ADD_ALERT (state, request:SetAlertRequest) {
    if (request.alert) {
      state.request.alert = request.alert as AlertsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  }
}

export const actions:ActionTree<AlertState, RootStoreState> = {
  fillRequest ({ commit }, request: AlertsDetails) {
    commit('FILL_ALERT_REQUEST', request)
  },
  setAlert ({ commit }, request:SetAlertRequest) {
    commit('SET_ADD_ALERT', request)
  },
  async addAlert ({ commit }, request:AlertsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<AlertsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200 || response.status === 201) {
          commit('ADD_ALERT', request)
        } else {
          commit('ADD_ALERT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateAlert ({ commit, getters }, request:AlertsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.update<AlertsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_ALERT', request)
          commit('SET_CARRIER_ALERTS', getters.carrierAlerts.map((item: AlertsDetails) => item.id === request.id ? request : item))
          commit('SET_ALERTS', getters.alerts.map((item: AlertsDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_ALERT', request)
          commit('SET_ALERTS', getters.alerts.map((item: AlertsDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_ALERT', request)
      commit('SET_ALERT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getAlert ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<AlertsDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_ALERT', (response.data as DataResponse<AlertsDetails>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log('getter:', getters.alert)
      commit('SET_ALERT', getters.alerts.filter((item: AlertsDetails) => item.id === id)[0])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getAlertsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<AlertsDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_ALERTS', (response.data as DataResponse<AlertsDetails[]>).data)
            commit('SET_PAGE', (response.data as DataResponse<AlertsDetails[]>).total_pages)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_ALERTS', alertsDetails)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getAlerts ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<AlertsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_ALERTS', (response.data as DataResponse<AlertsDetails[]>).data)
          } else {
            commit('SET_ERROR', [] as AlertsDetails[])
          }
          commit('SET_PAGE', (response.data as DataResponse<AlertsDetails[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_ALERTS', [] as AlertsDetails[])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeAlert ({ commit, getters }, id: string | number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_ALERT')
          commit('SET_ALERTS', getters.alerts.filter((item: AlertsDetails) => item.id !== id))
          commit('SET_CARRIER_ALERTS', getters.carrierAlerts.filter((item: AlertsDetails) => item.id !== id))
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSummaryByCarrierId ({ commit, rootState }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .multiple<AlertsSummary[]>(endPointTwo + '/Carriers', rootState.carrierId, payload.page_number, 100, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_SUMMARY', (response.data as DataResponse<AlertsSummary[]>).data[0])
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
  async getSummary ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<AlertsSummary[]>(endPointTwo, id).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', (response.data as DataResponse<AlertsDetails[]>).data[0])
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
