<template>
  <div>
    <PageHeader title="Assets" />
    <Table
      :key="tableKey"
      :headers="tableHeaders"
      :data="tableData"
      :filtering-model="vfilter"
      :request-function="getRequest"
      :page-count="getPageCount"
      class="pb-10"
    >
      <template #item-name="{ data, index } ">
        <div class="flex items-center">
          <div class="col-auto">
            <span class="block text-c-1 font-semibold whitespace-nowrap">
              {{ data[index].name }}
            </span>
            <span class="block text-c-1 text-gray-400">
              {{ data[index].caption }}
            </span>
          </div>
        </div>
      </template>
      <template #item-driver_name="{ item } ">
        <div class="flex items-center">
          <div class="col-auto">
            <span class="block text-c-1 font-semibold whitespace-nowrap">
              {{ item.driver_name }}
            </span>
            <span class="block text-c-1 text-tuna">
              {{ item.driver_username }}
            </span>
            <span class="block text-c-1 text-gray-400">
              {{ item.driver_ssn }}
            </span>
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
      <template #item-trailer_location="{ item } ">
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
      <template #item-truck_tags="{ item }">
        <Status
          :item="item"
          :active="null"
          :item-status="item.tags"
          :dropdown-menu="dropdownMenu"
          :dropdown-style="dropdownStyle"
          :icon-name="null"
          @extend="extendItem"
          @set-status="setStatus"
        />
      </template>
      <template #item-trailer_tags="{ item }">
        <Status
          :item="item"
          :active="null"
          :item-status="item.trailer_tags"
          :dropdown-menu="dropdownMenu"
          :dropdown-style="dropdownStyle"
          :icon-name="null"
          @extend="extendItem"
          @set-status="setStatus"
        />
      </template>
      <template #item-driving_status="{ data, index, item }">
        <div class="flex items-center">
          <div class="w-8 h-8 rounded-full flex items-center justify-center mr-2" :class="[{'bg-purple-100': decideIconColor(item.driving_status) === 'purple' }, {'bg-blue-100': decideIconColor(item.driving_status) === 'blue' }]">
            <Icon
              :icon="decideIcon(item.driving_status)"
              :color="decideIconColor(item.driving_status)"
              :alpha="800"
              variant="bulk"
              class="w-4 h-4"
            />
          </div>
          <div class="col-auto pr-0 mr-2">
            <span class="block whitespace-nowrap">
              {{ data[index].driving_status }}
            </span>
          </div>
        </div>
      </template>
      <template #item-unit_number="{ data, index } ">
        <div class="flex items-center">
          <div class="col-auto">
            <span class="block text-c-1 font-semibold whitespace-nowrap">
              {{ data[index].unit_number }}
            </span>
            <span class="block text-c-1 text-gray">
              {{ data[index].truck_second }}
            </span>
          </div>
        </div>
      </template>
      <template #item-truck_status="{ item, index, data }">
        <div class="flex">
          <div class="col-auto font-semibold">
            <span
              :item="item.status"
              :class="[
                {'text-green-900' : item.status === 'Moving'},
                {'text-red-900' : item.status === 'Off'},
              ]"
            >
              {{ data[index].status }}
            </span>
          </div>
        </div>
      </template>
      <template #item-curr_fuel_level="{ data, index }">
        <div class="flex items-center">
          <div class="col-auto w-full bg-gray-200 rounded-full h-1.5 mr-1 dark:bg-gray-700">
            <div class="bg-green-900 h-1.5 rounded-full dark:bg-blue-500" :style="{'width':data[index].current_fuel_level + '%'}" />
          </div>
          <div class="col-auto">
            <span class="block">
              {{ data[index].current_fuel_level }}
            </span>
          </div>
        </div>
      </template>
      <template #item-trucksActions>
        <div class="flex items-center cursor-pointer">
          <Icon icon="more-square" :alpha="100" :disable-fill="false" color="grey-dark" class="w-6 h-6 mr-2" />
        </div>
      </template>
      <div slot="header">
        <div class="flex">
          <div
            v-for="(tab, index) in innerTabs"
            :key="index"
            class="rounded-full py-2 px-5 mx-1 flex items-center justify-center cursor-pointer"
            :class="[
              { 'border border-gray-300' : innerTab !== index },
              { 'bg-green-400' : innerTab === index }
            ]"
            @click="innerSelect(index)"
          >
            <span
              class="text-c-1 font-medium"
              :class="[
                { 'text-gray': innerTab !== index },
                { 'text-black': innerTab === index },
              ]"
            >{{ tab }}</span>
          </div>
        </div>
      </div>
      <template #custom-filter>
        <div class="flex flex-wrap p-6">
          <div
            v-for="(filter, index) in filterModels"
            v-if="filter.tabShown === innerTab"
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
    </Table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { DriversDetails } from '~/models/eld/entities/drivers/drivers'
import { TrailersDetails } from '~/models/eld/entities/trailers/trailers'
import { TrucksDetails } from '~/models/eld/entities/trucks/trucks'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      tableKey: 0,
      innerTab: 0,
      extendeds: [] as any[],
      dropdownStyle: 'a',
      dropdownMenu: [
        { text: 'Active', bg: 'green' },
        { text: 'Passive', bg: 'gray' }
      ],
      innerTabs: [
        'Drivers',
        'Trucks',
        'Trailers'
      ],
      DriversHeaders: {
        driver_id: {
          label: 'ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Name',
          searchable: true,
          sortable: true
        },
        driving_status: {
          label: 'Driving Status',
          searchable: true,
          sortable: true
        },
        vehicle_id: {
          label: 'Vehicle ID',
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
        current_location: {
          label: 'Current Location',
          searchable: true,
          sortable: true
        },
        app_version: {
          label: 'App Version',
          searchable: true,
          sortable: true
        },
        os: {
          label: 'Operating System',
          searchable: true,
          sortable: true
        }
      },
      DriversData: [
        {
          driver_name: 'Bill Sanders',
          driver_username: 'tuji171094',
          driver_ssn: '612222222598',
          driving_status: 'Sleeper Berth',
          vehicle_id: 'TTR5200',
          curr_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          app_version: '2131.222.2000',
          operating_system: 'Android: 13'
        },
        {
          driver_name: 'Bill Sanders',
          driver_username: 'tuji171094',
          driver_ssn: '612222222598',
          driving_status: 'Driving',
          vehicle_id: 'TTR5200',
          curr_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          app_version: '2131.222.2000',
          operating_system: 'Android: 13'
        },
        {
          driver_name: 'Bill Sanders',
          driver_username: 'tuji171094',
          driver_ssn: '612222222598',
          driving_status: 'Sleeper Berth',
          vehicle_id: 'TTR5200',
          curr_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          app_version: '2131.222.2000',
          operating_system: 'Android: 13'
        },
        {
          driver_name: 'Bill Sanders',
          driver_username: 'tuji171094',
          driver_ssn: '612222222598',
          driving_status: 'Sleeper Berth',
          vehicle_id: 'TTR5200',
          curr_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          app_version: '2131.222.2000',
          operating_system: 'Android: 13'
        },
        {
          driver_name: 'Bill Sanders',
          driver_username: 'tuji171094',
          driver_ssn: '612222222598',
          driving_status: 'Driving',
          vehicle_id: 'TTR5200',
          curr_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          app_version: '2131.222.2000',
          operating_system: 'Android: 13'
        },
        {
          driver_name: 'Bill Sanders',
          driver_username: 'tuji171094',
          driver_ssn: '612222222598',
          driving_status: 'Driving',
          vehicle_id: 'TTR5200',
          curr_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          app_version: '2131.222.2000',
          operating_system: 'Android: 13'
        }
      ],
      TrucksHeaders: {
        truck_id: {
          label: 'ID',
          searchable: true,
          sortable: true
        },
        truck_status: {
          label: 'Status',
          searchable: true,
          sortable: true
        },
        license_plate: {
          label: 'License Plate',
          searchable: true,
          sortable: true
        },
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        current_location: {
          label: 'Location',
          searchable: true,
          sortable: true
        },
        
        
        curr_fuel_level: {
          label: 'Current Fuel Level',
          searchable: true,
          sortable: true
        },

        last_trip: {
          label: 'Last Trip',
          searchable: true,
          sortable: true
        },
        
        truck_tags: {
          label: 'Tags',
          searchable: true,
          sortable: true
        }
        // trucksActions: {
        //   label: 'Actions'
        // }
      },
      TrucksData: [
        {
          unit_number: 'B030 0/0',
          truck_second: 'GBFR-KNW-JN6',
          truck_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          truck_status: 'Moving',
          curr_fuel_level: '75%',
          driver_name: 'Johnson Kenneth JR',
          license_plate: '167234PF',
          truck_tags: 'Active'
        },
        {
          unit_number: 'B030 0/0',
          truck_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          truck_status: 'Off',
          curr_fuel_level: '25%',
          driver_name: '-',
          license_plate: '167234PF',
          truck_tags: 'Passive'
        },
        {
          unit_number: '1141',
          truck_second: 'GBFR-KNW-JN6',
          truck_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          truck_status: 'Moving',
          curr_fuel_level: '75%',
          driver_name: 'Johnson Kenneth JR',
          license_plate: '167234PF',
          truck_tags: 'Active'
        },
        {
          unit_number: '1159',
          truck_second: 'GBFR-KNW-JN6',
          truck_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          truck_status: 'Off',
          curr_fuel_level: '05%',
          driver_name: '-',
          license_plate: '167234PF',
          truck_tags: 'Passive'
        },
        {
          unit_number: 'B030 0/0',
          truck_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          truck_status: 'Moving',
          curr_fuel_level: '75%',
          driver_name: 'Johnson Kenneth JR',
          license_plate: '167234PF',
          truck_tags: 'Active'
        },
        {
          unit_number: '41235',
          truck_second: 'GBFR-KNW-JN6',
          truck_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          truck_status: 'Moving',
          curr_fuel_level: '75%',
          driver_name: 'Johnson Kenneth JR',
          license_plate: '167234PF',
          truck_tags: 'Passive'
        },
        {
          unit_number: 'B030 0/0',
          truck_second: 'GBFR-KNW-JN6',
          truck_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          truck_status: 'Off',
          curr_fuel_level: '05%',
          driver_name: '-',
          license_plate: '167234PF',
          truck_tags: 'Active'
        }
      ],
      TrailersHeaders: {
        trailer_id: {
          label: 'ID',
          searchable: true,
          sortable: true
        },
        
        status: {
          label: 'Status',
          searchable: true,
          sortable: true
        },
        trailer_unit_number: {
          label: 'Trailer Unit Number',
          searchable: true,
          sortable: true
        },
        trailer_location: {
          label: 'Location',
          searchable: true,
          sortable: true
        },

        battary: {
          label: 'Battery',
          searchable: true,
          sortable: true
        },

        last_trip: {
          label: 'Last Trip',
          searchable: true,
          sortable: true
        },
        
        tags: {
          label: 'Tags',
          searchable: true,
          sortable: true
        }
        // action: {
        //   label: 'Action',
        //   searchable: true,
        //   sortable: true
        // }
      },
      TrailersData: [
        {
          trailer_name: '21847171094',
          caption: 'No gateway paried',
          trailer_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          trailer_status: 'No gateway paried',
          battery: ' ',
          trailer_tags: 'Active'
        },
        {
          trailer_name: '21847171094',
          caption: 'No gateway paried',
          trailer_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          trailer_status: 'No gateway paried',
          battery: ' ',
          trailer_tags: 'Active'
        },
        {
          trailer_name: '21847171094',
          caption: 'No gateway paried',
          trailer_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          trailer_status: 'No gateway paried',
          battery: ' ',
          trailer_tags: 'Active'
        },
        {
          trailer_name: '21847171094',
          caption: 'No gateway paried',
          trailer_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          trailer_status: 'No gateway paried',
          battery: ' ',
          trailer_tags: 'Active'
        },
        {
          trailer_name: '21847171094',
          caption: 'No gateway paried',
          trailer_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          trailer_status: 'No gateway paried',
          battery: ' ',
          trailer_tags: 'Active'
        },
        {
          trailer_name: '21847171094',
          caption: 'No gateway paried',
          trailer_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          trailer_status: 'No gateway paried',
          battery: ' ',
          trailer_tags: 'Active'
        },
        {
          trailer_name: '21847171094',
          caption: 'No gateway paried',
          trailer_location: '4517 Washington Ave. Manchester, Kentucky 39495',
          last_trip: '4 days ago',
          trailer_status: 'No gateway paried',
          battery: ' ',
          trailer_tags: 'Active'
        }

      ],
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'driver_name',
          filterName: 'Driver Name',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'driving_status',
          filterName: 'Driving Status',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Driving' },
            { id: 2, text: 'Sleeper Beth' }
          ]
        },
        {
          modelName: 'vehicle_id',
          filterName: 'Vehicle',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'unit_number',
          filterName: 'Unit Number',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 1,
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
          colSpan: 2,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'truck_status',
          filterName: 'Status',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Off' },
            { id: 2, text: 'Moving' }
          ]
        },
        {
          modelName: 'trailer_name',
          filterName: 'Unit Number',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        // {
        //   modelName: 'driver_name',
        //   filterName: 'Driver Name',
        //   inputType: 'input',
        //   colSpan: 2,
        //   multiple: true,
        //   tabShown: 2,
        //   options: [
        //     { id: 1, text: 'Option 1' },
        //     { id: 2, text: 'Option 2' },
        //     { id: 3, text: 'Option 3' }
        //   ]
        // },
        {
          modelName: 'trailer_status',
          filterName: 'Status',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'No gateway paried' }
          ]
        }
      ]
    }
  },
  computed: {
    // Driver
    driverRecords (): DriversDetails {
      return (this.$store.getters['eld/entities/driver/carrierRecords'])
    },
    driverRecordsPageCount () {
      return (this.$store.getters['eld/entities/driver/pageCount'])
    },

    // Truck
    truckRecords (): TrucksDetails {
      return (this.$store.getters['eld/entities/truck/carrierRecords'])
    },
    truckRecordsPageCount () {
      return (this.$store.getters['eld/entities/truck/pageCount'])
    },

    // Trailer
    trailerRecords (): TrailersDetails {
      return (this.$store.getters['eld/entities/trailer/carrierRecords'])
    },
    trailerRecordsPageCount () {
      return (this.$store.getters['eld/entities/trailer/pageCount'])
    },

    tableHeaders () {
      switch (this.innerTab) {
        case 0:
          return this.DriversHeaders
        case 1:
          return this.TrucksHeaders
        case 2:
          return this.TrailersHeaders
        default:
          return null
      }
    },
    tableData () {
      switch (this.innerTab) {
        case 0:
          return this.driverRecords // this.DriversData for test and this.driverRecords for real data
        case 1:
          return this.truckRecords // this.TrucksData for test and this.truckRecords for real data
        case 2:
          return this.trailerRecords // this.TrailersData for test and this.trailerRecords for real data
        default:
          return null
      }
    },

    getRequest () {
      switch (this.innerTab) {
        case 0:
          return this.getDriversRecords
        case 1:
          return this.getTrucksRecords
        case 2:
          return this.getTrailersRecords
        default:
          return null
      }
    },
    getPageCount () {
      switch (this.innerTab) {
        case 0:
          return this.driverRecordsPageCount
        case 1:
          return this.truckRecordsPageCount
        case 2:
          return this.trailerRecordsPageCount
        default:
          return 0
      }
    }
  },
  methods: {
    ...mapActions({
      // Drivers
      getDriversRecords: (action, page) => action('eld/entities/driver/getRecordsByCarrierId', page),

      // Trucks
      getTrucksRecords: (action, page) => action('eld/entities/truck/getRecordsByCarrierId', page),

      // Trailers
      getTrailersRecords: (action, page) => action('eld/entities/trailer/getRecordsByCarrierId', page)
    }),
    decideIconColor (status: any) {
      if (status === 'Driving') {
        return 'blue'
      } else {
        return 'purple'
      }
    },
    decideIcon (status: any) {
      if (status === 'Driving') {
        return 'driving'
      } else {
        return 'house'
      }
    },
    innerSelect (index: number): void {
      this.innerTab = index
      this.vfilter = {}
      this.getKey()
    },
    getKey () {
      this.tableKey = Math.random()
    },
    extendItem (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setStatus (id:number, newStatus:any) {
      // const data = this.trucks.slice()
      console.log(id, newStatus)
      // const item = data.find((w:any) => w.id === id)
      // this.updateTruck({
      //   ...item,
      //   tags: newStatus
      // })
    }
  }
})
</script>
