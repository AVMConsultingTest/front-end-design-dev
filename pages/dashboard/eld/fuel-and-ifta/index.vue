<template>
  <div class="w-full">
    <PageHeader title="Fuel & IFTA" />
    <div class="row">
      <div class="mb-5">
        <div class="row mx-0">
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="drivers"
              :active="(selectedTab === 0)"
              title="Drivers"
              color="green"
              @click="select(0)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="vehicles"
              :active="(selectedTab === 1)"
              title="Vehicles"
              color="green"
              @click="select(1)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="iftaSummary"
              :active="(selectedTab === 2)"
              title="IFTA Summary"
              color="green"
              @click="select(2)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="tripReports"
              :active="(selectedTab === 3)"
              title="Trip Reports"
              color="green"
              @click="select(3)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="fuelPurchases"
              :active="(selectedTab === 4)"
              title="Fuel Purchases"
              color="green"
              @click="select(4)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              id="idlingEvents"
              :active="(selectedTab === 5)"
              title="Idling Events"
              color="green"
              @click="select(5)"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <Table
          :id="tableKey"
          :key="tableKey"
          :title="getTitle"
          :headers="getHeader"
          :data="getTableData"
          :selected-tab="selectedTab"
          :search-enabled="false"
          :filtering-model="vfilter"
          :request-function="getRequest"
          :page-count="getPageCount"
          class="mb-10"
        >
          <template #custom-filter>
            <div class="flex flex-wrap p-6">
              <div
                v-for="(filter, index) in filterModels"
                v-if="filter.tabShown === selectedTab"
                :key="index"
                :class="`col-${filter.colSpan} px-1 mb-2`"
              >
                <Input
                  v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                  v-model="vfilter[filter.modelName]"
                  :name="filter.modelName"
                  :type="filter.inputType === 'input' ? 'text' : 'date'"
                  :placeholder="filter.filterName"
                />
                <m-select
                  v-else
                  v-model="vfilter[filter.modelName]"
                  :options="filter.options"
                  :name="filter.filterName"
                  :horizontal="filter.multiple !== undefined && filter.multiple"
                  :placeholder="filter.filterName"
                  :bind-text="true"
                  :is-nullable="true"
                />
              </div>
            </div>
          </template>
          <template #item-current_location="{ item } ">
        <div class="flex items-center">
          <div class="col-auto">
            <span class="block text-c-1 font-semibold whitespace-nowrap">
              {{ item.current_location_lat + "," }}
            </span>
            <span class="block text-c-1 text-tuna">
              {{ item.current_location_long }}
            </span>
          </div>
        </div>
      </template>
          <template #item-driver_name="{ data, index } ">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ data[index].driver_name }}
                </span>
                <span class="block text-c-1 text-gray-400">
                  {{ data[index].driver_ssn }}
                </span>
              </div>
            </div>
          </template>
          <template #item-vehicle="{ data, index } ">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ data[index].vehicle_id }}
                </span>
                <span class="block text-c-1 text-gray-400">
                  {{ data[index].vehicle_name }}
                </span>
                <span class="block text-c-2 text-gray-400">
                  {{ data[index].vehicle_type }}
                </span>
              </div>
            </div>
          </template>
          <!-- <template #item-driving="{ data, index } ">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ data[index].driving_gal }}
                </span>
                <span class="block text-c-1 text-gray-400">
                  {{ data[index].driving_hours }}
                </span>
              </div>
            </div>
          </template> -->
          <!-- <template #item-idling="{ data, index } ">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ data[index].idling_gal }}
                </span>
                <span class="block text-c-1 text-gray-400">
                  {{ data[index].idling_hours }}
                </span>
              </div>
            </div>
          </template> -->
          <template #item-utilization="{ data, index } ">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-b-4 whitespace-nowrap">
                  {{ data[index].utilization + '%' }}
                </span>
              </div>
            </div>
          </template>
          <template #item-fuel_cost="{ data, index } ">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ '$' + data[index].fuel_cost }}
                </span>
              </div>
            </div>
          </template>
          <template #item-source="{ data, index } ">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ data[index].source }}
                </span>
                <span class="block text-c-1 text-gray-400">
                  {{ data[index].source_caption }}
                </span>
              </div>
            </div>
          </template>
          <template #item-total_idling="{ data, index } ">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-c-1 font-semibold whitespace-nowrap">
                  {{ data[index].total_idling_hours }}
                </span>
                <span class="block text-c-1 text-gray-400">
                  {{ data[index].total_idling_gal }}
                </span>
              </div>
            </div>
          </template>
          <template #item-actions="{ item } ">
            <div class="flex items-center">
              <div class="col-auto">
                <span class="block text-c-1 text-dark-blue font-semibold whitespace-nowrap">
                  View Location History
                </span>
              </div>
            </div>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SizeTypeEnum, ActionTypeEnum, ButtonTypeEnum } from '~/components/ts/enums'
import { IftaDriversDetails } from '~/models/eld/iftaAndFuel/iftaDrivers/iftaDrivers'
import { IftaFuelPurchasesDetails } from '~/models/eld/iftaAndFuel/iftaFuelPurchases/iftaFuelPurchases'
import { IftaIdlingEventsDetails } from '~/models/eld/iftaAndFuel/iftaIdlingEvents/iftaIdlingEvents'
import { IftaSummaryDetails } from '~/models/eld/iftaAndFuel/iftaSummary/iftaSummary'
import { IftaTripReportsDetails } from '~/models/eld/iftaAndFuel/iftaTripReports/iftaTripReports'
import { IftaVehiclesDetails } from '~/models/eld/iftaAndFuel/iftaVehicles/iftaVehicles'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      tableKey: 0,
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      selectedTab: 0,
      driverHeaders: {
        driver_id: {
          label: 'ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver',
          searchable: true,
          sortable: true
        },
        avg_mpg: {
          label: 'AVG. Mpg',
          searchable: true,
          sortable: true
        },
        moving_mpg: {
          label: 'Moving MPG',
          searchable: true,
          sortable: true
        },
        total_distance: {
          label: 'Total Dist. (Ml)',
          searchable: true,
          sortable: true
        },
        utilization: {
          label: 'Utilization',
          searchable: true,
          sortable: true
        },
        driving: {
          label: 'Driving',
          searchable: true,
          sortable: true
        },
        idling: {
          label: 'Idling',
          searchable: true,
          sortable: true
        },
        fuel_cost: {
          label: 'Fuel Cost',
          searchable: true,
          sortable: true
        },
        est_empty_miles: {
          label: 'Est. Empty Miles',
          searchable: true,
          sortable: true
        }
      },
      driverData: [
        {
          driver_name: 'Bill Sanders',
          caption: '612222222598',
          avg_mpg: '9.3',
          moving_mpg: '10.2',
          total_distance: '1,023.4',
          utilization: '68%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$468.48',
          est_empty_miles: '616'
        },
        {
          driver_name: 'Bill Sanders',
          caption: '612222222598',
          avg_mpg: '9.3',
          moving_mpg: '10.2',
          total_distance: '1,023.4',
          utilization: '68%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$468.48',
          est_empty_miles: '616'
        },
        {
          driver_name: 'Bill Sanders',
          caption: '612222222598',
          avg_mpg: '9.3',
          moving_mpg: '10.2',
          total_distance: '1,023.4',
          utilization: '68%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$468.48',
          est_empty_miles: '616'
        },
        {
          driver_name: 'Bill Sanders',
          caption: '612222222598',
          avg_mpg: '9.3',
          moving_mpg: '10.2',
          total_distance: '1,023.4',
          utilization: '68%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$468.48',
          est_empty_miles: '616'
        },
        {
          driver_name: 'Bill Sanders',
          caption: '612222222598',
          avg_mpg: '9.3',
          moving_mpg: '10.2',
          total_distance: '1,023.4',
          utilization: '68%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$468.48',
          est_empty_miles: '616'
        },
        {
          driver_name: 'Bill Sanders',
          caption: '612222222598',
          avg_mpg: '9.3',
          moving_mpg: '10.2',
          total_distance: '1,023.4',
          utilization: '68%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$468.48',
          est_empty_miles: '616'
        }
      ],
      vehicleHeaders: {
        vehicle: {
          label: 'ID',
          searchable: true,
          sortable: true
        },
        vehicle_model: {
          label: 'Vehicle Model',
          searchable: true,
          sortable: true
        },
        vehicle_unit_number: {
          label: 'Vehicle Unit Number',
          searchable: true,
          sortable: true
        },
        avg_mpg: {
          label: 'AVG. Mpg',
          searchable: true,
          sortable: true
        },
        moving_mpg: {
          label: 'Moving MPG',
          searchable: true,
          sortable: true
        },
        total_distance: {
          label: 'Total Dist. (Ml)',
          searchable: true,
          sortable: true
        },
        utilization: {
          label: 'Utilization',
          searchable: true,
          sortable: true
        },
        
        driving: {
          label: 'Driving',
          searchable: true,
          sortable: true
        },
        idling: {
          label: 'Idling',
          searchable: true,
          sortable: true
        },
        fuel_cost: {
          label: 'Fuel Cost',
          searchable: true,
          sortable: true
        },
        odometer: {
          label: 'Odometer (Ml)',
          searchable: true,
          sortable: true
        },
        fuel_type: {
          label: 'Fuel Type',
          searchable: true,
          sortable: true
        }
      },
      vehicleData: [
        {
          vehicle: '2019 FREIGHTLINER NEW',
          avg_mpg: '9.3',
          moving_mpg: '8.2',
          total_distance: '1,023.4',
          utilization: '75%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$9.8K',
          est_empty_miles: '869,726',
          fuel_type: 'Diesel'
        },
        {
          vehicle: '2019 FREIGHTLINER NEW',
          avg_mpg: '9.3',
          moving_mpg: '8.2',
          total_distance: '1,023.4',
          utilization: '75%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$9.8K',
          est_empty_miles: '869,726',
          fuel_type: 'Diesel'
        },
        {
          vehicle: '2019 FREIGHTLINER NEW',
          avg_mpg: '9.3',
          moving_mpg: '8.2',
          total_distance: '1,023.4',
          utilization: '75%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$9.8K',
          est_empty_miles: '869,726',
          fuel_type: 'Diesel'
        },
        {
          vehicle: '2019 FREIGHTLINER NEW',
          avg_mpg: '9.3',
          moving_mpg: '8.2',
          total_distance: '1,023.4',
          utilization: '75%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$9.8K',
          est_empty_miles: '869,726',
          fuel_type: 'Diesel'
        },
        {
          vehicle: '2019 FREIGHTLINER NEW',
          avg_mpg: '9.3',
          moving_mpg: '8.2',
          total_distance: '1,023.4',
          utilization: '75%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$9.8K',
          est_empty_miles: '869,726',
          fuel_type: 'Diesel'
        },
        {
          vehicle: '2019 FREIGHTLINER NEW',
          avg_mpg: '9.3',
          moving_mpg: '8.2',
          total_distance: '1,023.4',
          utilization: '75%',
          driving: '100.3 gal',
          driving_hours: '22h 18m',
          idling: '9.5 gal',
          idling_hours: '10h 33m',
          fuel_cost: '$9.8K',
          est_empty_miles: '869,726',
          fuel_type: 'Diesel'
        }
      ],
      iftaSummaryHeaders: {
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        jurisdiction: {
          label: 'Jurisdiction',
          searchable: true,
          sortable: true
        },
        vehicle_id: {
          label: 'Vehicle ID',
          searchable: true,
          sortable: true
        },
        vehicle_unit_number: {
          label: 'Vehicle Unit Number',
          searchable: true,
          sortable: true
        },
        vehicle_model: {
          label: 'Vehicle Model',
          searchable: true,
          sortable: true
        },
        distance: {
          label: 'Distance',
          searchable: true,
          sortable: true
        },
        fuel: {
          label: 'Fuel',
          searchable: true,
          sortable: true
        }
      },
      iftaSummaryData: [
        {
          jurisdiction: 'Alabama',
          distance: '18,065.4 mi',
          fuel: '13.215.69 gal'
        },
        {
          jurisdiction: 'Alabama',
          distance: '18,065.4 mi',
          fuel: '13.215.69 gal'
        },
        {
          jurisdiction: 'Alabama',
          distance: '18,065.4 mi',
          fuel: '13.215.69 gal'
        },
        {
          jurisdiction: 'Alabama',
          distance: '18,065.4 mi',
          fuel: '13.215.69 gal'
        },
        {
          jurisdiction: 'Alabama',
          distance: '18,065.4 mi',
          fuel: '13.215.69 gal'
        },
        {
          jurisdiction: 'Alabama',
          distance: '18,065.4 mi',
          fuel: '13.215.69 gal'
        }
      ],
      tripReportsHeaders: {
        trip_date: {
          label: 'Date',
          searchable: true,
          sortable: true
        },
        jurisdiction: {
          label: 'Jurisdiction',
          searchable: true,
          sortable: true
        },
        vehicle: {
          label: 'Vehicle',
          searchable: true,
          sortable: true
        },
        distance: {
          label: 'Distance (ml)',
          searchable: true,
          sortable: true
        },
        odo_start: {
          label: 'Odo Start (Ml)',
          searchable: true,
          sortable: true
        },
        odo_end: {
          label: 'Odo End (Ml)',
          searchable: true,
          sortable: true
        },
        actions: {
          label: 'Actions',
          searchable: true,
          sortable: true
        }
      },
      tripReportsData: [
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Maryland',
          vehicle: '92251',
          distance: '57.4',
          odo_start: '115,691',
          odo_end: '473,951',
          actions: 'View Location History'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Maryland',
          vehicle: '92251',
          distance: '57.4',
          odo_start: '115,691',
          odo_end: '473,951',
          actions: 'View Location History'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Maryland',
          vehicle: '92251',
          distance: '57.4',
          odo_start: '115,691',
          odo_end: '473,951',
          actions: 'View Location History'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Maryland',
          vehicle: '92251',
          distance: '57.4',
          odo_start: '115,691',
          odo_end: '473,951',
          actions: 'View Location History'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Maryland',
          vehicle: '92251',
          distance: '57.4',
          odo_start: '115,691',
          odo_end: '473,951',
          actions: 'View Location History'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Maryland',
          vehicle: '92251',
          distance: '57.4',
          odo_start: '115,691',
          odo_end: '473,951',
          actions: 'View Location History'
        }
      ],
      fuelHeaders: {
        trip_date: {
          label: 'Date',
          searchable: true,
          sortable: true
        },
        jurisdiction: {
          label: 'Jurisdiction',
          searchable: true,
          sortable: true
        },
        vehicle: {
          label: 'Vehicle',
          searchable: true,
          sortable: true
        },
        vehicle_unit_number: {
          label: 'Vehicle Unit Number',
          searchable: true,
          sortable: true
        },
        vehicle_model: {
          label: 'Vehicle Model',
          searchable: true,
          sortable: true
        },
        fuel_type: {
          label: 'Fuel Type',
          searchable: true,
          sortable: true
        },
        volume: {
          label: 'Volume',
          searchable: true,
          sortable: true
        },
        cost: {
          label: 'Cost',
          searchable: true,
          sortable: true
        },
        vendor: {
          label: 'Vendor',
          searchable: true,
          sortable: true
        },
        source: {
          label: 'Source',
          searchable: true,
          sortable: true
        }
      },
      fuelData: [
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Virginia',
          vehicle: '5800',
          fuel_type: 'Diesel',
          fuel_volume: '115.69 gal',
          fuel_cost: '473,95 USD',
          vendor_name: 'Pilot',
          source: 'Manuel Input',
          source_caption: 'Fleet Manager'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Virginia',
          vehicle: '5800',
          fuel_type: 'Diesel',
          fuel_volume: '115.69 gal',
          fuel_cost: '473,95 USD',
          vendor_name: 'Pilot',
          source: 'Manuel Input',
          source_caption: 'Fleet Manager'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Virginia',
          vehicle: '5800',
          fuel_type: 'Diesel',
          fuel_volume: '115.69 gal',
          fuel_cost: '473,95 USD',
          vendor_name: 'Pilot',
          source: 'Manuel Input',
          source_caption: 'Fleet Manager'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Virginia',
          vehicle: '5800',
          fuel_type: 'Diesel',
          fuel_volume: '115.69 gal',
          fuel_cost: '473,95 USD',
          vendor_name: 'Pilot',
          source: 'Manuel Input',
          source_caption: 'Fleet Manager'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Virginia',
          vehicle: '5800',
          fuel_type: 'Diesel',
          fuel_volume: '115.69 gal',
          fuel_cost: '473,95 USD',
          vendor_name: 'Pilot',
          source: 'Manuel Input',
          source_caption: 'Fleet Manager'
        },
        {
          trip_date: 'Feb 16, 9:05 AM',
          jurisdiction: 'Virginia',
          vehicle: '5800',
          fuel_type: 'Diesel',
          fuel_volume: '115.69 gal',
          fuel_cost: '473,95 USD',
          vendor_name: 'Pilot',
          source: 'Manuel Input',
          source_caption: 'Fleet Manager'
        }
      ],
      idlingEventsHeaders: {
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        vehicle_id: {
          label: 'Vehicle ID',
          searchable: true,
          sortable: true
        },
        vehicle_unit_number: {
          label: 'Vehicle Unit Number',
          searchable: true,
          sortable: true
        },
        vehicle_model: {
          label: 'Vehicle Model',
          searchable: true,
          sortable: true
        },
        current_location: {
          label: 'Current Location',
          searchable: true,
          sortable: true
        },
        total: {
          label: 'Total Idling',
          searchable: true,
          sortable: true
        }
      },
      idlingEventsData: [
        {
          start_time: 'Feb 16, 9:05 AM',
          driver_name: 'Bill Sanders',
          vehicle: '214',
          location: '4517 Washington Ave. Manchester, Kentucky 39495',
          total_idling: '2m 45s',
          total_idling_gal: '0.04 gal'
        },
        {
          start_time: 'Feb 16, 9:05 AM',
          driver_name: 'Unidentified',
          vehicle: '14113',
          location: '4517 Washington Ave. Manchester, Kentucky 39495',
          total_idling: '2m 45s',
          total_idling_gal: '0.04 gal'
        },
        {
          start_time: 'Feb 16, 9:05 AM',
          driver_name: 'Bill Sanders',
          vehicle: '214',
          location: '4517 Washington Ave. Manchester, Kentucky 39495',
          total_idling: '2m 45s',
          total_idling_gal: '0.04 gal'
        },
        {
          start_time: 'Feb 16, 9:05 AM',
          driver_name: 'Unidentified',
          vehicle: '210',
          location: '4517 Washington Ave. Manchester, Kentucky 39495',
          total_idling: '2m 45s',
          total_idling_gal: '0.04 gal'
        },
        {
          start_time: 'Feb 16, 9:05 AM',
          driver_name: 'Bill Sanders',
          vehicle: '214',
          location: '4517 Washington Ave. Manchester, Kentucky 39495',
          total_idling: '2m 45s',
          total_idling_gal: '0.04 gal'
        },
        {
          start_time: 'Feb 16, 9:05 AM',
          driver_name: 'Bill Sanders',
          vehicle: '214',
          location: '4517 Washington Ave. Manchester, Kentucky 39495',
          total_idling: '2m 45s',
          total_idling_gal: '0.04 gal'
        }
      ],
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        // {
        //   modelName: 'vehicle_types',
        //   filterName: 'Vehicle Types',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 0,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        // {
        //   modelName: 'dates',
        //   filterName: 'Dates',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 0,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'driver_id',
          filterName: 'Driver ID',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'driver_name',
          filterName: 'Driver Name',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        // {
        //   modelName: 'vehicle_id',
        //   filterName: 'Vehicle ID',
        //   inputType: 'input',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 0,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'total_distance',
          filterName: 'Distance',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'vehicle_type',
          filterName: 'Vehicle Types',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Sleepercab' }
          ]
        },
        // {
        //   modelName: 'dates',
        //   filterName: 'Dates',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 1,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        // {
        //   modelName: 'driver_id',
        //   filterName: 'Driver ID',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 1,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        // {
        //   modelName: 'driver_name',
        //   filterName: 'Driver Name',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 1,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'vehicle_id',
          filterName: 'Vehicle ID',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'total_distance',
          filterName: 'Distance',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        // {
        //   modelName: 'dates',
        //   filterName: 'Dates',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 2,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'jurisdiction',
          filterName: 'Jurisdiction',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        // {
        //   modelName: 'fuel_type',
        //   filterName: 'Fuel Type',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 2,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'vehicle_id',
          filterName: 'Vehicle ID',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'driver_id',
          filterName: 'Driver ID',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        // {
        //   modelName: 'dates',
        //   filterName: 'Dates',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 3,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'jurisdiction',
          filterName: 'Jurisdiction',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 3,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        // {
        //   modelName: 'fuel_type',
        //   filterName: 'Fuel Type',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 3,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'vehicle_id',
          filterName: 'Vehicle ID',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 3,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'driver_id',
          filterName: 'Driver ID',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 3,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        // {
        //   modelName: 'date',
        //   filterName: 'Date',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 4,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'jurisdiction',
          filterName: 'Jurisdiction',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 4,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'vehicle_id',
          filterName: 'Vehicle',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 4,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'fuel_type',
          filterName: 'Fuel Type',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 4,
          options: [
            { id: 1, text: 'Diesel' }
          ]
        },
        {
          modelName: 'source',
          filterName: 'Source Type',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 4,
          options: [
            { id: 1, text: 'Manuel Input' }
          ]
        },
        // {
        //   modelName: 'show_ifta_vehicles_only',
        //   filterName: 'Show IFTA vehicles only',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 4,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        // {
        //   modelName: 'flagged_puchases_only',
        //   filterName: 'Flagged purchases only',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 4,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        // {
        //   modelName: 'dates',
        //   filterName: 'Dates',
        //   inputType: 'select',
        //   colSpan: 3,
        //   multiple: true,
        //   tabShown: 5,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'driver_id',
          filterName: 'Driver ID',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 5,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'vehicle_id',
          filterName: 'Vehicle ID',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 5,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        }
      ]
    }
  },
  computed: {
    // Ifta Driver
    iftaDriverRecords (): IftaDriversDetails {
      return (this.$store.getters['eld/iftaAndFuel/iftaDriver/carrierRecords'])
    },
    iftaDriverRecordsPageCount () {
      return (this.$store.getters['eld/iftaAndFuel/iftaDriver/pageCount'])
    },

    // Ifta Vehicle
    iftaVehicleRecords (): IftaVehiclesDetails {
      return (this.$store.getters['eld/iftaAndFuel/iftaVehicle/carrierRecords'])
    },
    iftaVehicleRecordsPageCount () {
      return (this.$store.getters['eld/iftaAndFuel/iftaVehicle/pageCount'])
    },

    // Ifta Summary
    iftaSummaryRecords (): IftaSummaryDetails {
      return (this.$store.getters['eld/iftaAndFuel/iftaSummary/carrierRecords'])
    },
    iftaSummaryRecordsPageCount () {
      return (this.$store.getters['eld/iftaAndFuel/iftaSummary/pageCount'])
    },

    // Ifta Trip Reports
    iftaTripReportsRecords (): IftaTripReportsDetails {
      return (this.$store.getters['eld/iftaAndFuel/iftaTripReports/carrierRecords'])
    },
    iftaTripReportsRecordsPageCount () {
      return (this.$store.getters['eld/iftaAndFuel/iftaTripReports/pageCount'])
    },

    // Ifta Fuel Purchases
    iftaFuelPurchasesRecords (): IftaFuelPurchasesDetails {
      return (this.$store.getters['eld/iftaAndFuel/iftaFuelPurchases/carrierRecords'])
    },
    iftaFuelPurchasesRecordsPageCount () {
      return (this.$store.getters['eld/iftaAndFuel/iftaFuelPurchases/pageCount'])
    },

    // Ifta Idling Events
    iftaIdlingEventsRecords (): IftaIdlingEventsDetails {
      return (this.$store.getters['eld/iftaAndFuel/iftaIdlingEvents/carrierRecords'])
    },
    iftaIdlingEventsRecordsPageCount () {
      return (this.$store.getters['eld/iftaAndFuel/iftaIdlingEvents/pageCount'])
    },
    getTitle () {
      switch (this.selectedTab) {
        case 0:
          return 'Drivers'
        case 1:
          return 'Vehicles'
        case 2:
          return 'IFTA Summary'
        case 3:
          return 'Trip Reports'
        case 4:
          return 'Fuel Purchases'
        case 5:
          return 'Idling Events'
        default:
          return ''
      }
    },
    getHeader () {
      switch (this.selectedTab) {
        case 0:
          return this.driverHeaders
        case 1:
          return this.vehicleHeaders
        case 2:
          return this.iftaSummaryHeaders
        case 3:
          return this.tripReportsHeaders
        case 4:
          return this.fuelHeaders
        case 5:
          return this.idlingEventsHeaders
        default:
          return {}
      }
    },
    getTableData () {
      switch (this.selectedTab) {
        case 0:
          return this.iftaDriverRecords // this.driverData for test and this.iftaDriverRecords for real data
        case 1:
          return this.iftaVehicleRecords // this.vehicleData for test and this.iftaVehicleRecords for real data
        case 2:
          return this.iftaSummaryRecords // this.iftaSummaryData for test and this.iftaSummaryRecords for real data
        case 3:
          return this.iftaTripReportsRecords // this.tripReportsData for test and this.iftaTripReportsRecords for real data
        case 4:
          return this.iftaFuelPurchasesRecords // this.fuelData for test and this.iftaFuelPurchasesRecords for real data
        case 5:
          return this.iftaIdlingEventsRecords // this.idlingEventsData for test and this.iftaIdlingEventsRecords for real data
        default:
          return []
      }
    },
    getRequest () {
      switch (this.selectedTab) {
        case 0:
          return this.getIftaDriversRecords
        case 1:
          return this.getIftaVehiclesRecords
        case 2:
          return this.getIftaSummaryRecords
        case 3:
          return this.getIftaTripReportsRecords
        case 4:
          return this.getIftaFuelPurchasesRecords
        case 5:
          return this.getIftaIdlingEventsRecords
        default:
          return null
      }
    },
    getPageCount () {
      switch (this.selectedTab) {
        case 0:
          return this.iftaDriverRecordsPageCount
        case 1:
          return this.iftaVehicleRecordsPageCount
        case 2:
          return this.iftaSummaryRecordsPageCount
        case 3:
          return this.iftaTripReportsRecordsPageCount
        case 4:
          return this.iftaFuelPurchasesRecordsPageCount
        case 5:
          return this.iftaIdlingEventsRecordsPageCount
        default:
          return 0
      }
    }
  },
  methods: {
    ...mapActions({
      // Ifta Drivers
      getIftaDriversRecords: (action, page) => action('eld/iftaAndFuel/iftaDriver/getRecordsByCarrierId', page),

      // Ifta Vehicles
      getIftaVehiclesRecords: (action, page) => action('eld/iftaAndFuel/iftaVehicle/getRecordsByCarrierId', page),

      // Ifta Summary
      getIftaSummaryRecords: (action, page) => action('eld/iftaAndFuel/iftaSummary/getRecordsByCarrierId', page),

      // Ifta Trip Reports
      getIftaTripReportsRecords: (action, page) => action('eld/iftaAndFuel/iftaTripReports/getRecordsByCarrierId', page),

      // Ifta Fuel Purchases
      getIftaFuelPurchasesRecords: (action, page) => action('eld/iftaAndFuel/iftaFuelPurchases/getRecordsByCarrierId', page),

      // Ifta Idling Events
      getIftaIdlingEventsRecords: (action, page) => action('eld/iftaAndFuel/iftaIdlingEvents/getRecordsByCarrierId', page)
    }),
    getKey () {
      this.tableKey = Math.random()
    },
    select (index: number, anchor?: keyof HTMLElementTagNameMap | string | null) {
      console.log(index)
      this.vFilter = {}
      this.selectedTab = index
      this.getKey()
      if (anchor) {
        setTimeout(function () {
          (document.querySelector(anchor) as Element).scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    }
  }
})
</script>
