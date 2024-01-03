<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Shipments" class="mb-10">
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
        <div class="">
          <Button
            class="flex !w-[130px]"
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            @click="$router.push(`/broker/dashboard/shipments/create-shipment`)"
          >
            Create Shipment
          </Button>
        </div>
      </template>
    </PageHeader>
    <div class="load-cards">
      <div>
        <Table
          title="Shipments"
          icon="note-text"
          icon-color="orange"
          :icon-alpha="800"
          :headers="headers"
          :data="loadsDetails"
          :filtering-model="vfilter"
          :request-function="getLoads"
          :page-count="loadsDetailPageCount"
          :delete-enabled="true"
          :delete-function="removeLoad"
          :edit-enabled="true"
          edit-page=""
          class="mb-10"
        >
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
                  :label="filter.inputType === 'date' ? filter.filterName : undefined"
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
          <template #item-broker_id="{ data, index }">
            <div class="flex">
              <div class="col-auto text-dark-blue">
                <span>
                  {{ data[index].broker_id }}
                </span>
              </div>
            </div>
          </template>
          <template #item-customerLoadId="{ data, index }">
            <div class="flex">
              <div class="col-auto text-dark-blue">
                <span>
                  {{ data[index].customerLoadId }}
                </span>
              </div>
            </div>
          </template>
          <template #item-load_status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.load_status"
              :dropdown-menu="dropdownShipmentsStatusMenu"
              :dropdown-style="dropdownShipmentsStatusStyle"
              @extend="extendItemShipmentsStatus"
              @set-status="setShipmentsStatus"
            />
          </template>
          <template #item-icon>
            <div class="block">
              <Icon
                variant="linear"
                color="dark-blue"
                :alpha="0"
                :disable-fill="true"
                icon="pause"
                class="w-5 h-5"
              />
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
import moment from 'moment'
import loads from '~/static/loads'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { LoadsDetails } from '~/models/Broker/loadsDetails/loadsDetails'
export default Vue.extend({
  name: 'Shipments',
  layout: 'Dashboard',
  data () {
    return {
      searchTerm: '',
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      dropdownShipmentsStatusStyle: 'a',
      dropdownShipmentsStatusMenu: [
        { text: 'Open', bg: 'green' },
        { text: 'Assigned', bg: 'orange' },
        { text: 'Dispatched', bg: 'red' },
        { text: 'At pickup', bg: 'yellow' },
        { text: 'In Transit', bg: 'blue' },
        { text: 'At Delivery', bg: 'purple' },
        { text: 'Delivered', bg: 'orange' },
        { text: 'Cancelled', bg: 'green' },
        { text: 'Closed', bg: 'gray' }
      ],
      extendeds: [] as any[],
      loads,
      innerTab: 0,
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'shipper_name',
          filterName: 'Customer Name',
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
          modelName: 'load_origin',
          filterName: 'Origin',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'load_destination',
          filterName: 'Destination',
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
          modelName: 'carrier_name',
          filterName: 'Carrier Name',
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
          modelName: 'load_status',
          filterName: 'Load Status',
          inputType: 'select',
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
          modelName: 'delivery_time',
          filterName: 'Delivery Time',
          inputType: 'date',
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
          modelName: 'pickup_time',
          filterName: 'Pickup Time',
          inputType: 'date',
          colSpan: 3,
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
        broker_id: {
          label: 'Broker Load ID',
          searchable: true
        },
        shipper_load_id: {
          label: 'Customer Load ID',
          searchable: true
        },
        shipper_name: {
          label: 'Customer Name',
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
        pickup_time: {
          label: 'Pickup Time',
          searchable: true
        },
        delivery_time: {
          label: 'Delivery Time',
          searchable: true
        },
        total_revenue: {
          label: 'Revenue',
          searchable: true
        },
        load_cost: {
          label: 'Cost',
          searchable: true
        },
        accepted_date: {
          label: 'Accepted Date',
          searchable: true
        },
        load_delivery_date: {
          label: 'Delivered Date',
          searchable: true
        },
        equipment: {
          label: 'Equipment Type',
          searchable: true
        },
        carrier_name: {
          label: 'Carrier Name',
          searchable: true
        },
        load_status: {
          label: 'Load Status',
          searchable: true
        }
        // actions: ''
      },
      testData: [
        {
          id: 1,
          broker_id: 'BL0962',
          customerLoadId: 'CL09621',
          shipper_name: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_time: 'Timestamp',
          delivery_time: 'Timestamp',
          revenue: '$800',
          cost: '$500',
          acceptedDate: '09/07/2022',
          equipmentType: '26’ Trailer',
          carrierName: 'Bill Sanders',
          status: 'Open'
        },
        {
          id: 1,
          broker_id: 'BL0962',
          customerLoadId: 'CL09621',
          shipper_name: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_time: 'Timestamp',
          delivery_time: 'Timestamp',
          revenue: '$600',
          cost: '$500',
          acceptedDate: '09/07/2022',
          equipmentType: '26’ Trailer',
          carrierName: 'Bill Sanders',
          status: 'Cancelled'
        },
        {
          id: 1,
          broker_id: 'BL0962',
          customerLoadId: 'CL09621',
          shipper_name: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_time: 'Timestamp',
          delivery_time: 'Timestamp',
          revenue: '$500',
          cost: '$500',
          acceptedDate: '09/07/2022',
          equipmentType: '26’ Trailer',
          carrierName: 'Bill Sanders',
          status: 'Assigned'
        },
        {
          id: 1,
          broker_id: 'BL0962',
          customerLoadId: 'CL09621',
          shipper_name: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_time: 'Timestamp',
          delivery_time: 'Timestamp',
          revenue: '$800',
          cost: '$500',
          acceptedDate: '09/07/2022',
          equipmentType: '26’ Trailer',
          carrierName: 'Bill Sanders',
          status: 'Closed'
        },
        {
          id: 1,
          broker_id: 'BL0962',
          customerLoadId: 'CL09621',
          shipper_name: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_time: 'Timestamp',
          delivery_time: 'Timestamp',
          revenue: '$900',
          cost: '$500',
          acceptedDate: '09/07/2022',
          equipmentType: '26’ Trailer',
          carrierName: 'Bill Sanders',
          status: 'In-Transit'
        },
        {
          id: 1,
          broker_id: 'BL0962',
          customerLoadId: 'CL09621',
          shipper_name: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_time: 'Timestamp',
          delivery_time: 'Timestamp',
          revenue: '$500',
          cost: '$500',
          acceptedDate: '09/07/2022',
          equipmentType: '26’ Trailer',
          carrierName: 'Bill Sanders',
          status: 'Open'
        },
        {
          id: 1,
          broker_id: 'BL0962',
          customerLoadId: 'CL09621',
          shipper_name: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Phoenix, AZ',
          pickup_time: 'Timestamp',
          delivery_time: 'Timestamp',
          revenue: '$500',
          cost: '$500',
          acceptedDate: '09/07/2022',
          equipmentType: '26’ Trailer',
          carrierName: 'Bill Sanders',
          status: 'Cancelled'
        }
      ],
      selectedFilter: '',
      mode: 'grid'
    }
  },
  computed: {
    loadsDetails (): LoadsDetails[] {
      return (this.$store.getters['Broker/loadsDetails/brokerLoads'])
    },
    loadsDetail (): LoadsDetails {
      return (this.$store.getters['Broker/loadsDetails/load'])
    },
    loadsDetailPageCount (): Number {
      return (this.$store.getters['Broker/loadsDetails/pageCount'])
    }
  },
  methods: {
    extendItemShipmentsStatus (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownShipmentsStatusStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setShipmentsStatus (id:number, newStatus:any) {
      const data = this.loadsDetails.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateLoad({
        ...item,
        load_status: newStatus,
        accepted_date: moment(item.accepted_date).toISOString(),
        load_delivery_date: moment(item.load_delivery_date).toISOString(),
        load_pickup_date: moment(item.load_pickup_date).toISOString(),
        segments: {},
        trailer_required: true
      })
    },
    ...mapActions({
      getLoads: (action, page) => action('Broker/loadsDetails/getLoadsByBrokerId', page),
      removeLoad: (action, id) => action('Broker/loadsDetails/removeLoad', id),
      getLoad: (action, id) => action('Broker/loadsDetails/getLoad', id),
      updateLoad: (action, request) => action('Broker/loadsDetails/updateLoad', request)
    }),
    innerSelect (index: number): void {
      this.innerTab = index
      this.vfilter = {}
      this.getKey()
    },
    drawer () {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer('AddShipmentsQuotes')
    }
  }
})
</script>

<style>
  .filter-tabs .filter-tab {
    @apply mx-2 my-1 px-1 py-[6px] flex items-center cursor-pointer rounded-md;
  }
  .view-mode {
    @apply  flex items-center gap-2 bg-white rounded-lg w-full p-1 border border-gray-300;
  }
  .view-mode .mode {
    @apply w-11 h-8 flex items-center justify-center cursor-pointer z-10;
  }
</style>
