<template>
  <div class="w-full">
    <PageHeader title="Load Overview" class="mb-10">
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
        <div class="w-32 h-10">
          <Button
            class="flex"
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            @click="$router.push(`/carrier/dashboard/dispatch/loads/add-new-load`)"
          >
            Add New
          </Button>
        </div>
      </template>
    </PageHeader>
    <div class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg flex flex-row mb-4 filter-tabs p-2">
      <div
        class="filter-tab"
        :class="[{ 'bg-white shadow-md shadow-black/10': vfilter.load_status === undefined }]"
        @click="changeFilter()"
      >
        <span class="mx-1 text-xs text-tuna font-medium">
          ALL
        </span>
      </div>
      <div
        class="filter-tab"
        :class="[{ 'bg-white shadow-md shadow-black/10': vfilter.load_status === 'UPCOMING' }]"
        @click="changeFilter('UPCOMING')"
      >
        <span class="mx-1 text-xs text-tuna font-medium">
          UPCOMING
        </span>
      </div>
      <div
        class="filter-tab"
        :class="[{ 'bg-white shadow-md shadow-black/10': vfilter.load_status === 'IN-TRANSIT' }]"
        @click="changeFilter('IN-TRANSIT')"
      >
        <span class="mx-1 text-xs text-tuna font-medium">
          IN-TRANSIT
        </span>
      </div>
      <div
        class="filter-tab"
        :class="[{ 'bg-white shadow-md shadow-black/10': vfilter.load_status === 'COMPLETED' }]"
        @click="changeFilter('COMPLETED')"
      >
        <span class="mx-1 text-xs text-tuna font-medium">
          COMPLETED
        </span>
      </div>
      <div class="ml-auto w-[7.5rem]">
        <div class="view-mode relative">
          <div class="mode" @click="mode = 'grid'">
            <Icon
              variant="linear"
              :color="mode === 'grid' ? 'white': 'gray'"
              :alpha="mode === 'grid' ? 0 : 400"
              :disable-fill="true"
              icon="pause"
              class="w-5 h-5 rotate-90"
            />
          </div>
          <div class="mode" @click="mode = 'list'">
            <Icon
              variant="linear"
              :color="mode === 'list' ? 'white': 'gray'"
              :alpha="mode === 'list' ? 0 : 400"
              :disable-fill="true"
              icon="textalign-justifycenter"
              class="w-5 h-5"
            />
          </div>
          <div
            class="select-backdrop absolute top-1 left-1 w-10 h-8 z-0 bg-dark-blue rounded-lg transition-all"
            :class="[{'translate-x-12' : mode === 'list'}]"
          />
        </div>
      </div>
    </div>
    <div class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg  flex-row p-3 mb-8 filter-drops hidden">
      <div class="row items-center w-full" />
    </div>
    <div class="block my-8">
      <span class="text-b-3">{{ loads.length ?? 0 }} result found for <b class="capitalize">"{{ `${vfilter.load_status?.toLowerCase() ?? 'All'} ` }}Loads"</b></span>
    </div>
    <div class="load-cards">
      <transition-group name="fade" mode="in-out">
        <div v-if="mode==='grid'" key="grid" class="w-100">
          <div v-for="(load, index) in loads" v-if="loads.length > 0" :key="index" class="load mb-5">
            <LoadCard :link-id="index" :data="{ ...load, currentStop: 1}" />
          </div>
          <Pagination :request-function="getLoads" :page-count="loadPageCount" :filtering-model="vfilter" />
        </div>
        <div v-if="mode==='list'" key="list">
          <Table
            ref="table"
            title="Loads"
            icon="driving"
            icon-color="green"
            :icon-alpha="800"
            :headers="headers"
            :data="loads"
            :request-function="getLoads"
            :page-count="loadPageCount"
            :filtering-model="vfilter"
            :extend-enabled="true"
            :download-enabled="true"
            class="mb-10"
          >
            <template #extended-area="{ item }">
              <LoadStopItemWrapper :item="item" />
            </template>
            <template #item-icon="{ item }">
              <div class="block">
                <Icon
                  variant="linear"
                  color="dark-blue"
                  :alpha="0"
                  :disable-fill="true"
                  icon="add"
                  class="w-5 h-5 transition-all"
                  :class="{ 'rotate-45': extendedItems.includes(item) }"
                />
              </div>
            </template>
            <template #item-broker_id="{ item }">
              <div class="block text-dark-blue whitespace-nowrap">
                {{ item.broker_id }}
              </div>
            </template>
            <template #item-load_pickup_date="{ item }">
              <div class="block text-gray-400 whitespace-nowrap">
                {{ formatDate(item.load_pickup_date) }}
              </div>
            </template>
            <template #item-load_delivery_date="{ item }">
              <div class="block whitespace-nowrap">
                {{ formatDate(item.load_delivery_date) }}
              </div>
            </template>
            <template #item-status="{ item }">
              <Badge
                :icon-color="'green'"
                :title="item.status[0].toUpperCase() + item.status.slice(1)"
                class="bg-green-100 text-green-800"
                :size="SizeTypeEnum.MD"
              />
            </template>
            <template #item-actions>
              <div class="flex items-center">
                <Icon
                  icon="edit"
                  variant="linear"
                  :alpha="400"
                  :disable-fill="true"
                  color="gray"
                  class="w-6 h-6 mr-2"
                />
              </div>
            </template>
          </Table>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
// import loads from '@/static/loads'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { LoadDetailsState } from '~/store/loads'
import { LoadDetails } from '~/models/DISPATCH/load/loadDetails'
import LoadStopItemWrapper from '@/components/wrapper/LoadStopItemWrapper.vue'

export default Vue.extend({
  name: 'LoadsPage',
  components: {
    LoadStopItemWrapper
  },
  layout: 'Dashboard',
  data () {
    return {
      searchTerm: '',
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as LoadDetailsState,
      vfilter: {} as Partial<Pick<LoadDetails, 'status'>>,
      // loads,
      headers: {
        // icon: '',
        id: {
          label: 'ID',
          searchable: true
        },
        carrier_id: {
          label: 'Carrier ID',
          searchable: true
        },
        broker_id: {
          label: 'Broker ID',
          searchable: true
        },
        driver_id: {
          label: 'Driver ID',
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
        load_status: {
          label: 'Status',
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
        load_miles: {
          label: 'Miles',
          searchable: true
        },
        load_revenue: {
          label: 'Revenue',
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
        main_driver_name: {
          label: ' Main Driver Name',
          searchable: true
        },
        co_driver_name: {
          label: 'Co Driver Name',
          searchable: true
        },
        stops_list: {
          label: 'Stop List',
          searchable: true
        },
        estimated_duration_min: {
          label: 'Estimated Duration Min',
          searchable: true
        },
        actual_duration_min: {
          label: 'Actual Duration Min',
          searchable: true
        },
        bol_document_id: {
          label: 'Document Id',
          searchable: true
        },
        estimated_base_rate: {
          label: 'Estimated Base Rate',
          searchable: true
        },
        estimated_fuel_surcharge: {
          label: 'Estimated Fuel Surcharge',
          searchable: true
        },
        estimated_total_payout: {
          label: 'Estimated Total Payout',
          searchable: true
        },
        actual_base_rate: {
          label: 'Actual Base Rate',
          searchable: true
        },
        actual_fuel_surcharge: {
          label: 'Actual Fuel Surcharge',
          searchable: true
        },
        actual_total_payout: {
          label: 'Actual Total Payout',
          searchable: true
        },
        actions: ''
      },
      filters: [
        { id: 1, text: 'Filter 1', selected: true },
        { id: 2, text: 'Filter 2', selected: false },
        { id: 3, text: 'Filter 3', selected: false },
        { id: 4, text: 'Filter 4', selected: false }
      ] as SelectOption[],
      selectedFilter: '',
      mode: 'grid'
    }
  },
  computed: {
    loads (): any[] {
      return this.$store.getters['loads/carrierLoads']
    },
    loadPageCount () {
      return this.$store.getters['loads/pageCount']
    },
    extendedItems (): any[] {
      return this.$refs.table.getExtendedItems()
    }
  },
  watch: {
    vfilter: {
      handler (val: any) {
        console.log('filteringModel', val)
        if (this.requestFunction !== null) {
          // this.fetchCompleted = false
          // setTimeout(() => {
          //   this.requestFunction({ page_number: this.currentPage, filterModel: val } as GetPayload).then(() => {
          //     if (this.requestCallback) { this.requestCallback() }
          //     this.pageRanges = this.paginationTest(this.currentPage, this.pageCount)
          //     // this.fetchCompleted = true
          //   }).catch((err: unknown) => {
          //     console.warn(err)
          //   })
          // }, 100)
        } else {
          this.fetchCompleted = true
        }
      },
      deep: true
    }
  },
  created () {
    // this.getLoads(1)
  },
  methods: {
    ...mapActions({
      // getLoads: (action, page) => action('loads/getLoads', page),
      getLoads: (action, page) => action('loads/getLoadsByCarrierId', page),
      dummyData: (action, page) => action('loads/getLoads', page)

    }),
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    },
    changeFilter (filter = 'all') {
      if (filter === 'all') {
        this.vfilter = {}
      } else {
        this.vfilter = { load_status: filter }
      }
    },
    extendItem (item: any): void {
      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
      }
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
