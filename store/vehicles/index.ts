import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { DataResponse } from '~/models/common/DataResponse'
import { APIResponse } from '~/models/common/apiResponse'
import { VehiclesMaintenance } from '~/models/vehiclesMaintenance/vehiclesMaintenance'
import { Vehicles, VehiclesSummary } from '~/models/vehicles'
import ApiService from '~/services/baseService'
import vehicle from '~/static/DummyData/Safety/vehicleSummarys'
import { GetPayload } from '~/models/common/GetPayload'
import { RootStoreState } from '~/models/store'

const service: ApiService = new ApiService()
const serviceTwo: ApiService = new ApiService()

export const state = () => ({
  request: {
    vehicle: {} as Vehicles,
    vehicleMaintenance: {} as VehiclesMaintenance
  },
  response: {
    vehicle: {} as Vehicles,
    vehicles: [] as Vehicles[],
    summary: {} as VehiclesSummary,
    carrierVehicles: [] as Vehicles[],
    carrierSummary: vehicle[0] as VehiclesSummary,
    summaries: vehicle as VehiclesSummary[],
    vehicleMaintenance: {} as VehiclesMaintenance,
    vehicleMaintenances: [] as VehiclesMaintenance[],
    unsafeDrivings: [] as VehiclesMaintenance[],
    driverFitnesses: [] as VehiclesMaintenance[],
    hosCompliances: [] as VehiclesMaintenance[],
    substances: [] as VehiclesMaintenance[],
    hms: [] as VehiclesMaintenance[]
  },
  page: 0,
  maintenancePage: 0,

  unsafeDrivingPage: 0,
  driverFitnessPage: 0,
  hosCompliancePage: 0,
  substancePage: 0,
  hmPage: 0,
  loading: false,
  error: ''
})

const endPoint = 'VehiclesDetails'
const endPointTwo = 'VehiclesSummary'
const endPointThree = 'VehicleMaintenanceDetails'

export type VehiclesState = ReturnType<typeof state>

export const getters: GetterTree<VehiclesState, RootStoreState> = {
  vehicleRequest: state => (state.request.vehicle),
  vehicle: state => (state.response.vehicle),
  vehicles: state => (state.response.vehicles),
  summary: state => (state.response.summary),
  carrierVehicles: state => (state.response.carrierVehicles),
  carrierSummary: state => (state.response.carrierSummary),
  summaries: state => (state.response.summaries),
  vehicleMaintenanceRequest: state => (state.request.vehicleMaintenance),
  vehicleMaintenance: state => (state.response.vehicleMaintenance),
  vehicleMaintenances: state => (state.response.vehicleMaintenances),

  unsafeDrivings: state => (state.response.unsafeDrivings),
  driverFitnesses: state => (state.response.driverFitnesses),
  hosCompliances: state => (state.response.hosCompliances),
  substances: state => (state.response.substances),
  hms: state => (state.response.hms),

  pageCount: state => (state.page),
  maintenancePageCount: state => (state.maintenancePage),

  unsafeDrivingPageCount: state => (state.unsafeDrivingPage),
  driverFitnessPageCount: state => (state.driverFitnessPage),
  hosCompliancePageCount: state => (state.hosCompliancePage),
  substancePageCount: state => (state.substancePage),
  hmPageCount: state => (state.hmPage)
}

export const mutations: MutationTree<VehiclesState> = {
  SET_LOADING: (state, loading:boolean) => (state.loading = loading),
  SET_ERROR: (state, err:string) => (state.error = err),
  SET_PAGE: (state, page:number) => (state.page = page),
  SET_MAINTENANCE_PAGE: (state, page:number) => (state.maintenancePage = page),

  SET_UNSAFE_PAGE: (state, page:number) => (state.unsafeDrivingPage = page),
  SET_FITNESS_PAGE: (state, page:number) => (state.driverFitnessPage = page),
  SET_HOS_COMPLIANCE_PAGE: (state, page:number) => (state.hosCompliancePage = page),
  SET_SUBSTANCE_PAGE: (state, page:number) => (state.substancePage = page),
  SET_HM_PAGE: (state, page:number) => (state.hosCompliancePage = page),

  FILL_VEHICLE_REQUEST: (state, request:Vehicles) => (state.request.vehicle = { ...state.request.vehicle, ...request }),
  SET_VEHICLE: (state, single:Vehicles) => (state.response.vehicle = single),
  SET_VEHICLES: (state, list:Vehicles[]) => (state.response.vehicles = list),
  REMOVE_VEHICLE: state => (state.response.vehicle = {} as Vehicles),
  SET_CARRIER_VEHICLES: (state, list:Vehicles[]) => (state.response.carrierVehicles = list),
  SET_CARRIER_SUMMARY: (state, single:VehiclesSummary) => (state.response.carrierSummary = single),
  SET_SUMMARY: (state, single:VehiclesSummary) => (state.response.summary = single),
  SET_SUMMARIES: (state, list:VehiclesSummary[]) => (state.response.summaries = list),
  REMOVE_SUMMARY: state => (state.response.summary = {} as VehiclesSummary),
  FILL_MAINTENANCE_REQUEST: (state, request:VehiclesMaintenance) => (state.request.vehicleMaintenance = { ...state.request.vehicleMaintenance, ...request }),
  SET_MAINTENANCE: (state, single:VehiclesMaintenance) => (state.response.vehicleMaintenance = single),
  SET_MAINTENANCES: (state, list:VehiclesMaintenance[]) => (state.response.vehicleMaintenances = list),

  SET_UNSAFES: (state, list:VehiclesMaintenance[]) => (state.response.unsafeDrivings = list),
  SET_FITNESSES: (state, list:VehiclesMaintenance[]) => (state.response.driverFitnesses = list),
  SET_HOSCOMPLIANCES: (state, list:VehiclesMaintenance[]) => (state.response.hosCompliances = list),
  SET_SUBSTANCES: (state, list:VehiclesMaintenance[]) => (state.response.substances = list),
  SET_HMS: (state, list:VehiclesMaintenance[]) => (state.response.hms = list),

  REMOVE_MAINTENANCE: state => (state.response.vehicleMaintenance = {} as VehiclesMaintenance)
}

export const actions:ActionTree<VehiclesState, RootStoreState> = {
  fillRequest ({ commit }, request: Vehicles) {
    commit('FILL_VEHICLE_REQUEST', request)
  },
  fillMaintanenceRequest ({ commit }, request: VehiclesMaintenance) {
    commit('FILL_MAINTENANCE_REQUEST', request)
  },
  async addVehicle ({ commit }, request:Vehicles) {
    commit('SET_LOADING', true)
    try {
      return await service.add<Vehicles, APIResponse>(endPoint, request).then((response) => {
        if (response.status === 200) {
          commit('SET_VEHICLE', request)
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
  async getVehicle ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<Vehicles[]>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('SET_VEHICLE', (response.data as DataResponse<Vehicles[]>).data[0])
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
  async getVehiclesByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<Vehicles[]>('vehicles', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_VEHICLES', (response.data as DataResponse<Vehicles[]>).data)
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
  async getVehicles ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<Vehicles[]>(endPoint, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_VEHICLES', (response.data as DataResponse<Vehicles[]>).data)
          } else {
            commit('SET_VEHCILES', [])
          }
          commit('SET_PAGE', (response.data as DataResponse<Vehicles[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_VEHICLES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateVehicle ({ commit }, request:Vehicles) {
    commit('SET_LOADING', true)
    try {
      return await service.update<Vehicles, APIResponse>(endPoint, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_VEHICLE', request)
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
  async removeVehicle ({ commit }, id: number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.delete<APIResponse>(endPoint, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_VEHICLE')
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
  async addSummary ({ commit }, request:VehiclesSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.add<VehiclesSummary, APIResponse>(endPointTwo, request).then((response) => {
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
  async getSummaryByCarrierId ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service
        .get<VehiclesSummary[]>('summary', payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader)
        .then((response) => {
          if (response.status === 200) {
            commit('SET_CARRIER_SUMMARY', (response.data as DataResponse<VehiclesSummary[]>).data[0])
          } else {
            commit('SET_ERROR', (response.data as APIResponse).message)
          }
        })
    } catch (error) {
      commit('SET_CARRIER_SUMMARY', vehicle[0])
      commit('SET_ERROR', error)
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSummary ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await service.single<VehiclesSummary[]>(endPointTwo, id).then((response) => {
        if (response.status === 200) {
          commit('SET_SUMMARY', (response.data as DataResponse<VehiclesSummary[]>).data[0])
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_SUMMARY', vehicle.find((item: VehiclesSummary) => item.id === id))
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async getSummaries ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await service.get<VehiclesSummary[]>(endPointTwo, payload.page_number, undefined, undefined, payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_SUMMARIES', (response.data as DataResponse<VehiclesSummary[]>).data)
          } else {
            commit('SET_SUMMARIES', [])
          }
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_SUMMARIES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateVehiclesSummary ({ commit }, request:VehiclesSummary) {
    commit('SET_LOADING', true)
    try {
      return await service.update<VehiclesSummary, APIResponse>(endPointTwo, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_VEHICLES_SUMMARY', request)
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
  async removeSummary ({ commit }, id: string|number) {
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
  },
  async addMaintenance ({ commit }, request:VehiclesMaintenance) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.add<VehiclesMaintenance, APIResponse>(endPointThree, request).then((response) => {
        if (response.status === 200) {
          commit('SET_MAINTENANCE', request)
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
  async getMaintenance ({ commit }, id:number|string) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.single<VehiclesMaintenance[]>(endPointThree, id).then((response) => {
        if (response.status === 200) {
          commit('SET_MAINTENANCE', (response.data as DataResponse<VehiclesMaintenance[]>).data[0])
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
  async getMaintenances ({ commit }, payload: GetPayload) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.get<VehiclesMaintenance[]>('', payload.page_number, true, 'category=vehicle', payload.filterModel, payload.sortedHeader).then((response) => {
        if (response.status === 200) {
          if ((response.data as DataResponse<APIResponse>).data.message === undefined) {
            commit('SET_MAINTENANCES', (response.data as DataResponse<VehiclesMaintenance[]>).body)
          } else {
            commit('SET_MAINTENANCES', [])
          }
          commit('SET_MAINTENANCE_PAGE', (response.data as DataResponse<VehiclesMaintenance[]>).total_pages)
        } else {
          commit('SET_ERROR', (response.data as APIResponse).message)
        }
      })
    } catch (error) {
      commit('SET_ERROR', error)
      commit('SET_MAINTENANCES', [])
    } finally {
      setTimeout(() => { commit('SET_LOADING', false) }, 200)
    }
  },
  async updateMaintenance ({ commit }, request:VehiclesMaintenance) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.update<VehiclesMaintenance, APIResponse>(endPointThree, request.id, request).then((response) => {
        if (response.status === 200) {
          commit('SET_MAINTENANCE', request)
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
  async removeMaintenance ({ commit }, id: string|number) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.delete<APIResponse>(endPointThree, id).then((response) => {
        if (response.status === 200) {
          commit('REMOVE_MAINTENANCE')
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
  async getUnsafes ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.get<VehiclesMaintenance[]>('', page_number, true, 'category=unsafe').then((response) => {
        if (response.status === 200) {
          commit('SET_UNSAFES', (response.data as DataResponse<VehiclesMaintenance[]>).body)
          commit('SET_UNSAFE_PAGE', (response.data as DataResponse<VehiclesMaintenance[]>).total_pages)
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
  async getDriverFitnesses ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.get<VehiclesMaintenance[]>('', page_number, true, 'category=fitness').then((response) => {
        if (response.status === 200) {
          commit('SET_FITNESSES', (response.data as DataResponse<VehiclesMaintenance[]>).body)
          commit('SET_FITNESS_PAGE', (response.data as DataResponse<VehiclesMaintenance[]>).total_pages)
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
  async getCompliances ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.get<VehiclesMaintenance[]>('', page_number, true, 'category=hos').then((response) => {
        if (response.status === 200) {
          commit('SET_HOSCOMPLIANCES', (response.data as DataResponse<VehiclesMaintenance[]>).body)
          commit('SET_HOS_COMPLIANCE_PAGE', (response.data as DataResponse<VehiclesMaintenance[]>).total_pages)
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
  async getSubstances ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.get<VehiclesMaintenance[]>('', page_number, true, 'category=substance').then((response) => {
        if (response.status === 200) {
          commit('SET_SUBSTANCES', (response.data as DataResponse<VehiclesMaintenance[]>).body)
          commit('SET_SUBSTANCE_PAGE', (response.data as DataResponse<VehiclesMaintenance[]>).total_pages)
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
  async getHms ({ commit }, page_number: number) {
    commit('SET_LOADING', true)
    try {
      return await serviceTwo.get<VehiclesMaintenance[]>('', page_number, true, 'category=hm').then((response) => {
        if (response.status === 200) {
          commit('SET_HMS', (response.data as DataResponse<VehiclesMaintenance[]>).body)
          commit('SET_HM_PAGE', (response.data as DataResponse<VehiclesMaintenance[]>).total_pages)
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
