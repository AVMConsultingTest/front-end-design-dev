<template>
  <div class="w-full">
    <PageHeader :show-date="false" title="Loads In Transit" class="mb-10">
      <template #actions>
        <Input
          v-model="searchTerm"
          name="search"
          class="mr-2 w-full"
          style="`border:1px solid black`"
          type="text"
        >
          <template slot="addonLeft">
            <Icon
              icon="search-normal"
              variant="linear"
              color="gray"
              :alpha="400"
              class="w-5 h-5 ml-4"
              :disable-fill="true"
            />
          </template>
        </Input>
      </template>
    </PageHeader>
    <div class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg p-3 mb-8 filter-drops">
      <div class="col-12">
        <div class="flex mb-4 mt-6 col-9">
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
          <div class="col-3">
            <div class="flex items-end h-full">
              <Button
                class="flex flex-1 !bg-transparent text-gray col-6 mr-12 !justify-end"
                :type="ButtonTypeEnum.PRIMARY"
                :action="ActionTypeEnum.BUTTON"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="map" />
    <div class="load-cards mb-64 mt-10">
      <transition-group name="fade" mode="in-out">
        <div v-if="mode==='grid'" key="grid" class="w-100">
          <div v-for="(load, index) in loads" :key="index" class="load mb-5">
            <BrokerMapCard :broker-map="true" no-link="true" :link-id="index" :data="load" />
          </div>
        </div>
        <div v-if="mode==='list'" key="list">
          <div v-for="(item, index) in loads" :key="index" class="my-2">
            <BrokerMapCardDetails :data="item" />
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import USA from '@svg-maps/usa'
import { Map, NavigationControl } from 'maplibre-gl'
import loads from '@/static/loads'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { LoadDetailsState } from '~/store/loads'
export default Vue.extend({
  name: '',
  layout: 'Dashboard',
  data () {
    return {
      searchTerm: '',
      USA,
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as LoadDetailsState,
      loads,
      innerTab: 0,
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'equipment_type',
          filterName: 'Equipment Type',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Tabbatha Sawford' },
            { id: 2, text: 'Queenie McHale' },
            { id: 3, text: 'Giralda Kilfoyle' }
          ]
        },
        {
          modelName: 'in_transit',
          filterName: 'In Transit',
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
          modelName: 'shipper_name',
          filterName: 'Shipper Name',
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
          modelName: 'origin',
          filterName: 'Origin',
          inputType: 'select',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Roanoke, TX' }
          ]
        },
        {
          modelName: 'pickup',
          filterName: 'Pickup',
          inputType: 'date',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'delivery',
          filterName: 'Delivery',
          inputType: 'date',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        }
      ],
      headers: {
        icon: '',
        broker_id: {
          label: 'Load ID',
          searchable: true
        },
        load_status: {
          label: 'Status',
          searchable: true
        },
        truck_id: {
          label: 'Truck ID',
          searchable: true
        },
        trailer_id: {
          label: 'Trailer ID',
          searchable: true
        },
        load_origin: {
          label: 'Origin',
          searchable: true
        },
        load_destination: {
          label: 'Destination',
          searchable: true
        },
        load_pickup_date: {
          label: 'Pickup Date',
          searchable: true
        },
        load_delivery_date: {
          label: 'Delivery Date',
          searchable: true
        },
        load_rate_per_mile: {
          label: 'Rate/Mile',
          searchable: true
        },
        load_revenue: {
          label: 'Revenue',
          searchable: true
        },
        load_miles: {
          label: 'Miles',
          searchable: true
        },
        equipment_type: {
          label: 'Equipment',
          searchable: true
        },
        equipment_weight: {
          label: 'Weight',
          searchable: true
        },
        broker_contact_name: {
          label: 'Broker',
          searchable: true
        },
        actions: ''
      },
      filters: [
        { id: 1, text: 'Filter 1', selected: false },
        { id: 2, text: 'Filter 2', selected: false },
        { id: 3, text: 'Filter 3', selected: false },
        { id: 4, text: 'Filter 4', selected: false }
      ] as SelectOption[],
      selectedFilter: '',
      mode: 'list'
    }
  },
  computed: {
    loads () {
      return this.$store.getters['loads/loads']
    },
    loadPageCount () {
      return this.$store.getters['loads/pageCount']
    },
    extendedItems (): any[] {
      return this.$refs.table.getExtendedItems()
    }
  },
  created () {
    this.getLoads(1)
  },
  mounted () {
    const mapScript = document.createElement('script')
    mapScript.setAttribute('src', 'https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.js')
    document.body.appendChild(mapScript)
    this.initializeMap()
  },
  methods: {
    ...mapActions({
      getLoads: (action, page) => action('loads/getLoads', page),
      dummyData: (action, page) => action('loads/getLoads', page)

    }),
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    },
    extendItem (item: any): void {
      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
      }
    },
    initializeMap () {
      const apiKey = 'v1.public.eyJqdGkiOiJhZTQ3NTEyYy0zOTY0LTRhZjgtYmYyYi04NDE5MTMyODRiMGIifRT-ifes2gm6lEqKp5ca-kF2mrwgxr7pIqjSQMyEh7s85gK9b4XQQ73-Eecn-rRxDDxvauIVDOzJs7afA0o41k7JzrZ8d_Z1bNdqsDKDWptTrkge5UhTxUiNprjlL3MMt4tx6mKdmDZhpPJb5Y4uAQTuFWpg2bAADCwU3ze482Ew61tLz-_UgA9yxUxPg_9isvRCroG7s1iMLufHCPenRxo7BkwaZwBkif8tMdOi3FlBO-2XFp08-WW-Q5enCTQv7xEKyLn2WfLGgQbqbI_NsQqDQXjAn3kvjEVRsndOG8oWpXEFFDlTYPU2vcPTGNmu2i4wMffgJRGXW3Ut3cLzd8A.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx'
      const region = 'us-east-1'
      const mapName = 'NebulaGTS-TMS-Map'
      const styleUrl = `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`
      const map = new Map({
        container: 'map',
        style: styleUrl,
        center: [-100.1187, 39.2819],
        zoom: 4
      })
      map.addControl(new NavigationControl({}), 'top-left')
    }
  }
})
</script>

  <style scoped>
    .filter-tabs .filter-tab {
      @apply mx-2 my-1 px-1 py-[6px] flex items-center cursor-pointer rounded-md;
    }
    .view-mode {
     @apply  flex items-center gap-2 bg-white rounded-lg w-full p-1 border border-gray-300;
    }
    .view-mode .mode {
      @apply w-10 h-8 flex items-center justify-center cursor-pointer z-10;
    }
    #map { height: 500px; }

  </style>
