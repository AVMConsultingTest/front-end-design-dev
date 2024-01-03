<template>
  <div>
    <PageHeader title="ELD Alerts" />
    <Table
      :key="tableKey"
      :headers="tableHeaders"
      :data="tableData"
      :filtering-model="vfilter"
      :request-function="getRequest"
      :page-count="getPageCount"
      class="mb-8"
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
      <template #item-preview="{ }">
        <img class="inline-block ring-2 ring-white mx-6 mt-16 w-44 h-24" src="/images/paul_walker.png" alt="pic1"
        >
      </template>
      <template #item-alert_type="{ item }">
        <div v-if="item.alert_type === 'Obstructed Camera'" class="text-red-900">
          {{ item.alert_type }}
        </div>
        <div v-if="item.alert_type === 'Mobile Usage'" class="text-green-900">
          {{ item.alert_type }}
        </div>
        <div v-if="item.alert_type !== 'Obstructed Camera' && item.alert_type !== 'Mobile Usage'">
          {{ item.alert_type }}
        </div>
      </template>
      <template #item-time_of_video="{ }">
        <div>
          <span class="block text-c-1 text-tuna">Mar 20,2023 • 3:04 PM EDT</span>
        </div>
      </template>
      <template #item-actions="{ }">
        <div class="row flex-nowrap items-center">
          <div class="col-auto">
            <Button
              v-if="innerTab === 0 || innerTab === 1"
              class="flex !h-8 !w-auto px-2 bg-gray-400 text-gray-950 border !border-black"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.BUTTON"
              @click="()=> {}"
            >
              Dismiss
            </Button>
          </div>
          <div class="col-auto">
            <Button
              v-if="innerTab === 0"
              class="flex !h-8 !w-auto px-2"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.BUTTON"
              @click="()=> {}"
            >
              Needs Review
            </Button>
            <Button
              v-if="innerTab === 1"
              class="flex !h-8 !w-auto px-2"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.BUTTON"
              @click="()=> {}"
            >
              Reviewed
            </Button>
            <Button
              v-if="innerTab === 2"
              class="flex !h-8 !w-auto px-2 bg-[#D0D5DD] text-white"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.BUTTON"
              @click="()=> {}"
            >
              Dismissed
            </Button>
          </div>
          <div class="col-auto">
            <Icon
              icon="star"
              variant="linear"
              color="green"
              :alpha="800"
              class="w-5 h-5"
            />
          </div>
        </div>
      </template>
      <template #item-alert_status="{ item }">
        <Status
          :item="item"
          :active="null"
          :item-status="item.alert_status"
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
import moment from 'moment'
import { EldAlertsDetails } from '~/models/eld/eldAlerts/eldAlerts'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      tableKey: 0,
      innerTab: 0,
      innerTabs: [
        'Needs Review',
        'All Event',
        'Dismissed',
        'Starred'
      ],
      tab1Headers: {
        preview: {
          label: 'Preview',
          searchable: true,
          sortable: true
        },
        event_type: {
          label: 'Event Type',
          searchable: true,
          sortable: true
        },
        time_of_video: {
          label: 'Time Of Video',
          searchable: true,
          sortable: true
        },
        video_time: {
          label: 'Duration',
          searchable: true,
          sortable: true
        },
        video_url: {
          label: 'URL',
          searchable: true,
          sortable: true
        },
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        status: {
          label: 'Status',
          searchable: true,
          sortable: true
        },
        actions: {
          label: 'Actions',
          searchable: true,
          sortable: false
        }
      },
      tab1Data: [
        {
          preview: '/images/paul_walker.png',
          alert_type: 'Obstructed Camera',
          driver_id: '7777',
          driver_name: 'Paul Walker',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/van_diesel.png',
          alert_type: 'Inattentive Driving',
          driver_id: '3333',
          driver_name: 'Van Diesel',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/eld_alerts_pic3.png',
          alert_type: 'Mobile Usage',
          driver_id: '1234',
          driver_name: 'Bill Sanders',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/eld_alerts_pic4.png',
          alert_type: 'Obstructed Camera',
          driver_id: '4321',
          driver_name: 'Kurt Cobain',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        }

      ],
      tab2Headers: {
        preview: {
          label: 'Preview',
          searchable: true,
          sortable: true
        },
        event_type: {
          label: 'Event Type',
          searchable: true,
          sortable: true
        },
        time_of_video: {
          label: 'Time Of Video',
          searchable: true,
          sortable: true
        },
        video_time: {
          label: 'Duration',
          searchable: true,
          sortable: true
        },
        video_url: {
          label: 'URL',
          searchable: true,
          sortable: true
        },
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        status: {
          label: 'Status',
          searchable: true,
          sortable: true
        },
        actions: {
          label: 'Actions',
          searchable: true,
          sortable: false
        }
      },
      tab2Data: [
        {
          preview: '/images/paul_walker.png',
          alert_type: 'Obstructed Camera',
          driver_id: '7777',
          driver_name: 'Paul Walker',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/van_diesel.png',
          alert_type: 'Inattentive Driving',
          driver_id: '3333',
          driver_name: 'Van Diesel',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/eld_alerts_pic3.png',
          alert_type: 'Mobile Usage',
          driver_id: '1234',
          driver_name: 'Bill Sanders',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/eld_alerts_pic4.png',
          alert_type: 'Obstructed Camera',
          driver_id: '4321',
          driver_name: 'Kurt Cobain',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        }

      ],
      tab3Headers: {
        preview: {
          label: 'Preview',
          searchable: true,
          sortable: true
        },
        event_type: {
          label: 'Event Type',
          searchable: true,
          sortable: true
        },
        time_of_video: {
          label: 'Time Of Video',
          searchable: true,
          sortable: true
        },
        video_time: {
          label: 'Duration',
          searchable: true,
          sortable: true
        },
        video_url: {
          label: 'URL',
          searchable: true,
          sortable: true
        },
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        status: {
          label: 'Status',
          searchable: true,
          sortable: true
        },
        actions: {
          label: 'Actions',
          searchable: true,
          sortable: false
        }
      },
      tab3Data: [
        {
          preview: '/images/paul_walker.png',
          alert_type: 'Obstructed Camera',
          driver_id: '7777',
          driver_name: 'Paul Walker',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/van_diesel.png',
          alert_type: 'Inattentive Driving',
          driver_id: '3333',
          driver_name: 'Van Diesel',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/eld_alerts_pic3.png',
          alert_type: 'Mobile Usage',
          driver_id: '1234',
          driver_name: 'Bill Sanders',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/eld_alerts_pic4.png',
          alert_type: 'Obstructed Camera',
          driver_id: '4321',
          driver_name: 'Kurt Cobain',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        }

      ],
      tab4Headers: {
        preview: {
          label: 'Preview',
          searchable: true,
          sortable: true
        },
        event_type: {
          label: 'Event Type',
          searchable: true,
          sortable: true
        },
        time_of_video: {
          label: 'Time Of Video',
          searchable: true,
          sortable: true
        },
        video_time: {
          label: 'Duration',
          searchable: true,
          sortable: true
        },
        video_url: {
          label: 'URL',
          searchable: true,
          sortable: true
        },
        driver_id: {
          label: 'Driver ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        status: {
          label: 'Status',
          searchable: true,
          sortable: true
        },
        actions: {
          label: 'Actions',
          searchable: true,
          sortable: false
        }
      },
      tab4Data: [
        {
          preview: '/images/paul_walker.png',
          alert_type: 'Obstructed Camera',
          driver_id: '7777',
          driver_name: 'Paul Walker',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/van_diesel.png',
          alert_type: 'Inattentive Driving',
          driver_id: '3333',
          driver_name: 'Van Diesel',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/eld_alerts_pic3.png',
          alert_type: 'Mobile Usage',
          driver_id: '1234',
          driver_name: 'Bill Sanders',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        },
        {
          preview: '/images/eld_alerts_pic4.png',
          alert_type: 'Obstructed Camera',
          driver_id: '4321',
          driver_name: 'Kurt Cobain',
          time_of_video: 'tab1Column2',
          alert_status: 'ACTIVE',
          actions: 'tab1Column4'
        }

      ],
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
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
          modelName: 'alert_type',
          filterName: 'Event Type',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Obstructed Camera' },
            { id: 2, text: 'Mobile Usage' }
          ]
        },
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
          modelName: 'driver_id',
          filterName: 'Driver ID',
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
          modelName: 'alert_type',
          filterName: 'Event Type',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 1,
          options: [
            { id: 1, text: 'Obstructed Camera' },
            { id: 2, text: 'Mobile Usage' }
          ]
        },
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
          modelName: 'driver_name',
          filterName: 'Driver Name',
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
        {
          modelName: 'alert_type',
          filterName: 'Event Type',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 2,
          options: [
            { id: 1, text: 'Obstructed Camera' },
            { id: 2, text: 'Mobile Usage' }
          ]
        },
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
          modelName: 'driver_name',
          filterName: 'Driver Name',
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
        {
          modelName: 'alert_type',
          filterName: 'Event Type',
          inputType: 'select',
          colSpan: 3,
          multiple: true,
          tabShown: 3,
          options: [
            { id: 1, text: 'Obstructed Camera' },
            { id: 2, text: 'Mobile Usage' }
          ]
        }
      ],
      extendeds: [] as any[],
      dropdownMenu: [
        { text: 'Active', bg: 'blue' },
        { text: 'Passive', bg: 'red' }
      ],
      dropdownStyle: ''
    }
  },
  computed: {
    // Eld Alerts
    eldAlertsRecords (): EldAlertsDetails {
      return (this.$store.getters['eld/eldAlerts/carrierRecords'])
    },
    eldAlertsPageCount () {
      return (this.$store.getters['eld/eldAlerts/pageCount'])
    },
    needsReviews (): [] {
      return []
    },
    tableHeaders () {
      switch (this.innerTab) {
        case 0:
          return this.tab1Headers
        case 1:
          return this.tab2Headers
        case 2:
          return this.tab3Headers
        case 3:
          return this.tab4Headers
        default:
          return null
      }
    },
    tableData () {
      switch (this.innerTab) {
        case 0:
          return this.eldAlertsRecords
        case 1:
          return this.eldAlertsRecords
        case 2:
          return this.eldAlertsRecords
        case 3:
          return this.eldAlertsRecords
        default:
          return null
      }
    },
    getRequest () {
      switch (this.innerTab) {
        case 0:
          return this.getEldAlerts
        case 1:
          return this.getEldAlerts
        case 2:
          return this.getEldAlerts
        case 3:
          return this.getEldAlerts
        default:
          return null
      }
    },
    getPageCount () {
      switch (this.innerTab) {
        case 0:
          return this.eldAlertsPageCount
        case 1:
          return this.eldAlertsPageCount
        case 2:
          return this.eldAlertsPageCount
        case 3:
          return this.eldAlertsPageCount
        default:
          return 0
      }
    }
  },
  methods: {
    ...mapActions({
      // Eld Alerts
      getEldAlerts: (action, page) => action('eld/eldAlerts/getRecordsByCarrierId', page)
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
      const data = this.needsReviews.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateNeedsReviews({
        ...item,
        alert_status: newStatus
      })
    }
  }
})
</script>
