<template>
  <div>
    <PageHeader title="Hours of Service" />
    <Table
      :id="tableKey"
      :key="tableKey"
      :headers="tableHeaders"
      :data="tableData"
      :filtering-model="vfilter"
      :request-function="getRequest"
      :page-count="getPageCount"
      class="mb-12"
    >
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
              :debounce-timer="1000"
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
      <template #item-driver_name="{ item }">
        <div class="flex items-center">
          <div class="mr-2">
            <img class="inline-block h-10 w-10 min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
          </div>
          <div>
            <span class="block whitespace-nowrap">
              {{ item.driver_name }}
            </span>
            <span class="block text-c-1 text-gray-400">
              Caption
            </span>
          </div>
        </div>
      </template>
      <template #item-duty_status="{ item }">
        <Status
          :item="item"
          :active="null"
          :item-status="item.duty_status"
          :dropdown-menu="dropdownMenu"
          :dropdown-style="dropdownStyle"
          :icon-name="null"
          @extend="extendItem"
          @set-status="setStatus"
        />
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { TodayDetails } from '~/models/eld/hoursOfService/today/today'
import { RecapturedHoursDetails } from '~/models/eld/hoursOfService/recapturedHours/recapturedHours'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      tableKey: 0,
      innerTab: 0,
      innerTabs: [
        'Today',
        'Recaptured Hours'
      ],
      tab1Headers: {
        driver_name: {
          label: 'Driver',
          searchable: true,
          sortable: true
        },
        time_in_curr_status: {
          label: 'Time In Current Status',
          searchable: true,
          sortable: true
        },
        vehicle_id: {
          label: 'Vehicle',
          searchable: true,
          sortable: true
        },
        time_until_break: {
          label: 'Time Until Break',
          searchable: true,
          sortable: true
        },
        drive_remaining: {
          label: 'Drive Remaining',
          searchable: true,
          sortable: true
        },
        shift_remaining: {
          label: 'Shift Remaining',
          searchable: true,
          sortable: true
        },
        cycle_remaining: {
          label: 'Cycle Remaining',
          searchable: true,
          sortable: true
        },
        cycle_tomorrow: {
          label: 'Cycle Tomorrow',
          searchable: true,
          sortable: true
        },
        driving_in_violation: {
          label: 'Driving In Violation (Today)',
          searchable: true,
          sortable: true
        },
        duty_status: {
          label: 'Duty Status',
          searchable: true,
          sortable: true
        }

      },
      tab1Data: [
        {
          driver_name: 'Bill Sanders',
          time_in_curr_status: '1:03',
          vehicle_id: 'TTE5200',
          time_until_break: '6:55',
          drive_remaining: '8:30',
          shift_remaining: '8:16',
          cycle_remaining: '66:49',
          cycle_tomorrow: '66:49',
          driving_in_violation: '-',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Bill Sanders',
          time_in_curr_status: '1:03',
          vehicle_id: 'TTE5200',
          time_until_break: '6:55',
          drive_remaining: '8:30',
          shift_remaining: '8:16',
          cycle_remaining: '66:49',
          cycle_tomorrow: '66:49',
          driving_in_violation: '-',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Cameron Williamson',
          time_in_curr_status: '1:03',
          vehicle_id: 'TTE5200',
          time_until_break: '6:55',
          drive_remaining: '8:30',
          shift_remaining: '8:16',
          cycle_remaining: '66:49',
          cycle_tomorrow: '66:49',
          driving_in_violation: '-',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Eleanor Pena',
          time_in_curr_status: '1:03',
          vehicle_id: 'TTE5200',
          time_until_break: '6:55',
          drive_remaining: '8:30',
          shift_remaining: '8:16',
          cycle_remaining: '66:49',
          cycle_tomorrow: '66:49',
          driving_in_violation: '-',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Brooklyn Simmons',
          time_in_curr_status: '1:03',
          vehicle_id: 'TTE5200',
          time_until_break: '6:55',
          drive_remaining: '8:30',
          shift_remaining: '8:16',
          cycle_remaining: '66:49',
          cycle_tomorrow: '66:49',
          driving_in_violation: '-',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Cameron Williamson',
          time_in_curr_status: '1:03',
          vehicle_id: 'TTE5200',
          time_until_break: '6:55',
          drive_remaining: '8:30',
          shift_remaining: '8:16',
          cycle_remaining: '66:49',
          cycle_tomorrow: '66:49',
          driving_in_violation: '-',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Brooklyn Simmons',
          time_in_curr_status: '1:03',
          vehicle_id: 'TTE5200',
          time_until_break: '6:55',
          drive_remaining: '8:30',
          shift_remaining: '8:16',
          cycle_remaining: '66:49',
          cycle_tomorrow: '66:49',
          driving_in_violation: '-',
          duty_status: 'Driving'
        }

      ],
      tab2Headers: {
        driver_name: {
          label: 'Driver',
          searchable: true,
          sortable: true
        },
        cycle_today: {
          label: 'Cycle Today',
          searchable: true,
          sortable: true
        },
        cycle_tomorrow: {
          label: 'Cycle Tomorrow',
          searchable: true,
          sortable: true
        },
        day_1_recaptured_date: {
          label: 'May 11',
          searchable: true,
          sortable: true
        },
        day_2_recaptured_date: {
          label: 'May 12',
          searchable: true,
          sortable: true
        },
        day_3_recaptured_date: {
          label: 'May 13',
          searchable: true,
          sortable: true
        },
        day_4_recaptured_date: {
          label: 'May 14',
          searchable: true,
          sortable: true
        },
        day_5_recaptured_date: {
          label: 'May 15',
          searchable: true,
          sortable: true
        },
        day_6_recaptured_date: {
          label: 'May 16',
          searchable: true,
          sortable: true
        },
        duty_status: {
          label: 'Duty Status',
          searchable: true,
          sortable: true
        }
      },
      tab2Data: [
        {
          driver_name: 'Bill Sanders',
          cycle_today: '8:27',
          cycle_tomorrow: '8:27',
          day_1_recaptured_date: '+10:56',
          day_2_recaptured_date: '+07:56',
          day_3_recaptured_date: '+10:56',
          day_4_recaptured_date: '+10:56',
          day_5_recaptured_date: '+00:00',
          day_6_recaptured_date: '+10:56',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Bill Sanders',
          cycle_today: '8:27',
          cycle_tomorrow: '8:27',
          day_1_recaptured_date: '+10:56',
          day_2_recaptured_date: '+07:56',
          day_3_recaptured_date: '+10:56',
          day_4_recaptured_date: '+10:56',
          day_5_recaptured_date: '+00:00',
          day_6_recaptured_date: '+10:56',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Cameron Williamson',
          cycle_today: '8:27',
          cycle_tomorrow: '8:27',
          day_1_recaptured_date: '+10:56',
          day_2_recaptured_date: '+07:56',
          day_3_recaptured_date: '+10:56',
          day_4_recaptured_date: '+10:56',
          day_5_recaptured_date: '+00:00',
          day_6_recaptured_date: '+10:56',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Eleanor Pena',
          cycle_today: '8:27',
          cycle_tomorrow: '8:27',
          day_1_recaptured_date: '+10:56',
          day_2_recaptured_date: '+07:56',
          day_3_recaptured_date: '+10:56',
          day_4_recaptured_date: '+10:56',
          day_5_recaptured_date: '+00:00',
          day_6_recaptured_date: '+10:56',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Brooklyn Simmons',
          cycle_today: '8:27',
          cycle_tomorrow: '8:27',
          day_1_recaptured_date: '+10:56',
          day_2_recaptured_date: '+07:56',
          day_3_recaptured_date: '+10:56',
          day_4_recaptured_date: '+10:56',
          day_5_recaptured_date: '+00:00',
          day_6_recaptured_date: '+10:56',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Cameron Williamson',
          cycle_today: '8:27',
          cycle_tomorrow: '8:27',
          day_1_recaptured_date: '+10:56',
          day_2_recaptured_date: '+07:56',
          day_3_recaptured_date: '+10:56',
          day_4_recaptured_date: '+10:56',
          day_5_recaptured_date: '+00:00',
          day_6_recaptured_date: '+10:56',
          duty_status: 'Driving'
        },
        {
          driver_name: 'Brooklyn Simmons',
          cycle_today: '8:27',
          cycle_tomorrow: '8:27',
          day_1_recaptured_date: '+10:56',
          day_2_recaptured_date: '+07:56',
          day_3_recaptured_date: '+10:56',
          day_4_recaptured_date: '+10:56',
          day_5_recaptured_date: '+00:00',
          day_6_recaptured_date: '+10:56',
          duty_status: 'Driving'
        }

      ],
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'driver_name',
          filterName: 'Driver Name',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Tabbatha Sawford' },
            { id: 2, text: 'Queenie McHale' },
            { id: 3, text: 'Giralda Kilfoyle' }
          ]
        },
        {
          modelName: 'duty_status',
          filterName: 'Duty Status',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'vehicle_id',
          filterName: 'Vehicle',
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
          tabShown: 1,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'duty_status',
          filterName: 'Duty Status',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'vehicle_id',
          filterName: 'Vehicle',
          inputType: 'input',
          colSpan: 3,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        }
      ],
      extendeds: [] as any[],
      dropdownMenu: [
        { text: 'Driving', bg: 'green' },
        { text: 'Not Driving', bg: 'red' }
      ],
      dropdownStyle: ''
    }
  },
  computed: {
    // Today
    todayRecords (): TodayDetails {
      return (this.$store.getters['eld/hoursOfService/today/carrierRecords'])
    },
    todayRecordsPageCount () {
      return (this.$store.getters['eld/hoursOfService/today/pageCount'])
    },
    // Recaptured Hours
    recapturedHoursRecords (): RecapturedHoursDetails {
      return (this.$store.getters['eld/hoursOfService/recapturedHours/carrierRecords'])
    },
    recapturedHoursRecordsPageCount () {
      return (this.$store.getters['eld/hoursOfService/recapturedHours/pageCount'])
    },
    tableHeaders () {
      switch (this.innerTab) {
        case 0:
          return this.tab1Headers
        case 1:
          return this.tab2Headers
        case 2:
          return this.tab3Headers
        default:
          return null
      }
    },
    tableData () {
      switch (this.innerTab) {
        case 0:
          return this.todayRecords as TodayDetails[] // this.tab1Data for test and this.todayRecords as TodayDetails[] for real data
        case 1:
          return this.recapturedHoursRecords as RecapturedHoursDetails[] // this.tab2Data for test and this.recapturedHoursRecords as RecapturedHoursDetails[] for real data
        default:
          return null
      }
    },
    getRequest () {
      switch (this.innerTab) {
        case 0:
          return this.getTodayRecords
        case 1:
          return this.getRecapturedHoursRecords
        default:
          return null
      }
    },
    getPageCount () {
      switch (this.innerTab) {
        case 0:
          return this.todayRecordsPageCount
        case 1:
          return this.recapturedHoursRecordsPageCount
        default:
          return 0
      }
    }
  },
  methods: {
    ...mapActions({
      // Today
      getTodayRecords: (action, page) => action('eld/hoursOfService/today/getRecordsByCarrierId', page),

      // Recaptured Hours
      getRecapturedHoursRecords: (action, page) => action('eld/hoursOfService/recapturedHours/getRecordsByCarrierId', page)
    }),
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
      const data = this.todays.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateTodays({
        ...item,
        duty_status: newStatus
      })
    }
  }
})
</script>
