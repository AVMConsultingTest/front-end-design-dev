import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { APIResponse } from '~/models/common/apiResponse'
import { ApplicantsDetails, ApplicantsSummary } from '~/models/applicants'
import ApiService from '~/services/baseService'
import { DataResponse } from '~/models/common/DataResponse'
import { applicantsSummary, applicantsList } from '~/static/DummyData/Safety/applicants'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()

export const state = () => ({
  request: {
    applicant: {} as ApplicantsDetails
  },
  response: {
    applicant: {} as ApplicantsDetails,
    summary: {} as ApplicantsSummary,
    applicants: applicantsList as ApplicantsDetails[],
    carrierApplicants: [] as ApplicantsDetails[],
    carrierSummary: {} as ApplicantsSummary,
    summaries: [] as ApplicantsSummary[]
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

export interface SetApplicantRequest {
  applicant?:null,
  step?:number,
  title?:string
}

export const endPoint = 'carrier/applicants'
export const endPointTwo = 'carrier/applicants/summary'

export type ApplicantsState = ReturnType<typeof state>

export const getters: GetterTree<ApplicantsState, RootStoreState> = {
  applicantRequest: state => (state.request.applicant),
  applicant: state => (state.response.applicant),
  applicants: state => (state.response.applicants),
  carrierApplicants: state => (state.response.carrierApplicants),
  carrierSummary: state => (state.response.carrierSummary),
  summary: state => (state.response.summary),
  summaries: state => (state.response.summaries),
  pageCount: state => (state.page),
  step: state => (state.addStep)
}

export const mutations: MutationTree<ApplicantsState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  FILL_APPLICANT_REQUEST: (state, request:ApplicantsDetails) => (state.request.applicant = { ...state.request.applicant, ...request }),
  SET_APPLICANT: (state, single:ApplicantsDetails) => (state.response.applicant = single),
  SET_APPLICANTS: (state, list:ApplicantsDetails[]) => (state.response.applicants = list),
  SET_CARRIER_APPLICANTS: (state, list:ApplicantsDetails[]) => (state.response.carrierApplicants = list),
  SET_CARRIER_SUMMARY: (state, single:ApplicantsSummary) => (state.response.carrierSummary = single),
  SET_SUMMARY: (state, single:ApplicantsSummary) => (state.response.summary = single),
  ADD_SUMMARY: (state, single:ApplicantsSummary) => (state.response.summaries.push(single)),
  SET_SUMMARIES: (state, list:ApplicantsSummary[]) => (state.response.summaries = list),
  REMOVE_SUMMARY: state => (state.response.summary = {} as ApplicantsSummary),
  ADD_APPLICANT: (state, single:ApplicantsDetails) => {
    if (single.id === undefined && state.response.carrierApplicants.length < 12) {
      single.id = state.response.carrierApplicants[state.response.carrierApplicants.length - 1].id + 1
      state.response.carrierApplicants.push(single)
    }
  },
  UPDATE_APPLICANT: (state, single:ApplicantsDetails) => {
    const itemIndex = state.response.applicants.findIndex((item: ApplicantsDetails) => item.id === single.id)
    console.log('single:', single)
    state.response.applicants[itemIndex] = single
  },
  SET_ADD_APPLICANTS (state, request:SetApplicantRequest) {
    if (request.applicant) {
      state.request.applicant = request.applicant as ApplicantsDetails
    }
    state.addStep.index = request.step ?? 0
    state.addStep.title = request.title ?? ''
  },
  REMOVE_APPLICANT: state => (state.response.applicant = {} as ApplicantsDetails)
}

export const actions:ActionTree<ApplicantsState, RootStoreState> = {
  fillRequest ({ commit }, request: ApplicantsDetails) {
    commit('FILL_APPLICANT_REQUEST', request)
  },
  setApplicant ({ commit }, request:SetApplicantRequest) {
    commit('SET_ADD_APPLICANT', request)
  },
  async addApplicant ({ commit }, request:ApplicantsDetails) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ApplicantsDetails, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_APPLICANT', request)
        } else {
          commit('ADD_APPLICANT', request)
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_APPLICANT', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getApplicant ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ApplicantsDetails>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_APPLICANT', (response.data as DataResponse<ApplicantsDetails>))
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      console.log(error)

      commit('SET_APPLICANT', getters.applicants.find((item:ApplicantsDetails) => item.id === id))
      console.log('getter:', getters.applicants)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getApplicantsByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ApplicantsDetails[]>(endPoint, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_APPLICANTS', (response.data as DataResponse<ApplicantsDetails[]>).data)
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_APPLICANTS', applicantsList)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getApplicants ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ApplicantsDetails[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_APPLICANTS', (response.data as DataResponse<ApplicantsDetails[]>).data)
          } else {
            commit('SET_APPLICANTS', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<ApplicantsDetails[]>).total_pages)
        } else {
          commit('SET_APPLICANTS', applicantsList)
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_APPLICANTS', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateApplicant ({ commit, getters }, request:ApplicantsDetails) {
    commit('SET_LOADING', true)
    try {
      console.log(request)
      return await service.update<ApplicantsDetails, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('UPDATE_APPLICANT', request)
          commit('SET_CARRIER_APPLICANTS', getters.carrierApplicants.map((item: ApplicantsDetails) => item.id === request.id ? request : item))
          commit('SET_APPLICANTS', getters.applicants.map((item: ApplicantsDetails) => item.id === request.id ? request : item))
        } else {
          commit('UPDATE_APPLICANT', request)
          commit('SET_CARRIER_APPLICANTS', getters.carrierApplicants.map((item: ApplicantsDetails) => item.id === request.id ? request : item))
          commit('SET_APPLICANTS', getters.applicants.map((item: ApplicantsDetails) => item.id === request.id ? request : item))
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('UPDATE_APPLICANT', request)
      commit('SET_CARRIER_APPLICANTS', getters.carrierApplicants.map((item: ApplicantsDetails) => item.id === request.id ? request : item))
      commit('SET_APPLICANTS', getters.applicants.map((item: ApplicantsDetails) => item.id === request.id ? request : item))
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async removeApplicant ({ commit, getters }, id:string|number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('REMOVE_APPLICANT', id)
          commit('SET_APPLICANTS', getters.applicants.filter((item:ApplicantsDetails) => item.id !== id))
          commit('SET_CARRIER_APPLICANTS', getters.carrierApplicants.filter((item: ApplicantsDetails) => item.id !== id))
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
  async addSummary ({ commit }, request:ApplicantsSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<ApplicantsSummary, APIResponse>(endPointTwo, request).then((response) => {
        if (response.status === 200) {
          commit('ADD_SUMMARY', request)
        } else {
          commit('SET_ERROR', response.data.message)
        }
      })
    } catch (error) {
      commit('ADD_SUMMARY', request)
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSummary ({ commit, getters }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<ApplicantsSummary[]>(endPointTwo, id).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', (response.data as DataResponse<ApplicantsSummary[]>).data[0])
        } else {
          commit('SET_APPLICANT', getters.summaries.find((item:ApplicantsSummary) => item.id === id))
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSummaryByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<ApplicantsSummary>(endPointTwo, payload.page_number, true, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          console.log('summary data:', response)
          if (response.status === 200) {
            commit('SET_CARRIER_SUMMARY', (response.data as DataResponse<ApplicantsSummary>))
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_SUMMARY', applicantsSummary[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSummaries ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<ApplicantsSummary[]>(endPointTwo, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_SUMMARIES', (response.data as DataResponse<ApplicantsSummary[]>).data)
          } else {
            commit('SET_SUMMARIES', [])
          }
        } else {
          commit('SET_SUMMARIES', applicantsSummary)
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_SUMMARIES', [])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateSummary ({ commit }, request:ApplicantsSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<ApplicantsSummary, APIResponse>(endPointTwo, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', request)
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
  async removeApplicantsSummary ({ commit }, id:string|number) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPointTwo, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_SUMMARY')
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
