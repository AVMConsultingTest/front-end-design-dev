<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Marketplace" class="mb-10">
    </PageHeader>
    <div class="flex">
      <div class="col-9">
        <div class="flex flex-wrap p-6 border-t border-grey-blue-100">
          <div
            v-for="(filter, index) in filterModels"
            :key="index"
            :class="`col-${filter.colSpan} px-1 mb-2`"
          >
            <Input
              v-if="filter.inputType === 'input' || filter.inputType === 'date'"
              v-model="vfilter[filter.modelName]"
              :name="filter.options"
              :type="filter.inputType === 'input' ? 'text' : 'date'"
              :placeholder="filter.filterName"
            />
            <m-select
              v-else
              v-model="vfilter[filter.modelName]"
              :options="filter.options"
              :name="filter.filterName"
              :placeholder="filter.filterName"
              :bind-text="true"
              :is-nullable="true"
            />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="ml-auto w-[6.5rem]">
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
        <div class="flex p-6 items-end h-full">
          <Button
            class="flex flex-1 !bg-transparent text-gray col-6"
            :type="ButtonTypeEnum.PRIMARY"
            :action="ActionTypeEnum.BUTTON"
          >
            Clear All
          </Button>
          <Button
            class="flex flex-1 !w-32 !bg-dark-blue border border-dark-blue text-white col-6"
            :type="ButtonTypeEnum.PRIMARY"
            :action="ActionTypeEnum.BUTTON"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
    <div v-if="mode==='grid'" key="grid" class="mt-6">
      <div class="flex w-100 flex-wrap">
        <div v-for="(data, index) in loads" :key="index" class="load px-2.5 col-12 mb-5 flex flex-col justify-between">
          <BrokerMarketPlaceCard class="mb-3" :link-id="index" :data="data" />
        </div>
      </div>
      <Pagination :request-function="getLoadsDetails" :page-count="loadsPageCount" />
    </div>
    <div v-if="mode==='list'" key="list" class="mt-6">
      <Table
        title="Marketplace"
        icon="note-2"
        icon-color="purple"
        :icon-alpha="800"
        :headers="headers"
        :data="loads"
        :search-enabled="true"
        :request-function="getLoadsDetails"
        :page-count="loadsPageCount"
        class="mb-10"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { LoadBoardDetails } from '~/models/Marketplace/LoadBoardDetails/LoadBoardDetails'
import BrokerMarketPlaceCard from '~/components/BrokerMarketPlaceCard.vue'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      headers: {
        broker_load_id: {
          label: 'Load ID',
          searchable: true
        },
        origin: {
          label: 'Origin',
          searchable: true
        },
        destination: {
          label: 'Destination',
          searchable: true
        },
        origin_time: {
          label: 'Origin Time',
          searchable: true
        },
        destination_time: {
          label: 'Destination Time',
          searchable: true
        },
        miles: {
          label: 'Miles',
          searchable: true
        },
        all_in_rate: {
          label: 'All in Rate',
          searchable: true
        },
        book_now: {
          label: 'Book Now',
          searchable: true
        },
        commodity: {
          label: 'Commodity',
          searchable: true
        },
        equipment_type: {
          label: 'Equipment',
          searchable: true
        },
        weight: {
          label: 'Weight',
          searchable: true
        }

      },
      filterModels: [
        {
          modelName: 'origin',
          filterName: 'Origin',
          inputType: 'select',
          colSpan: 2,
          options: [
            { id: 1, text: 'Roanoke, TX' },
            { id: 2, text: 'Oxnard, CA' }
          ]
        },
        {
          modelName: 'radius',
          filterName: 'Radius',
          inputType: 'select',
          colSpan: 2,
          options: [
            { id: 1, text: 'Driver' },
            { id: 2, text: 'Operator' }
          ]
        },
        {
          modelName: 'price_max',
          filterName: 'Price Max',
          inputType: 'input',
          colSpan: 2
        },
        {
          modelName: 'price_min',
          filterName: 'Price Min',
          inputType: 'input',
          colSpan: 2
        },
        {
          modelName: 'payout_max',
          filterName: 'Payout Max',
          inputType: 'input',
          colSpan: 2
        },
        {
          modelName: 'payout_min',
          filterName: 'Payout Min',
          inputType: 'select',
          colSpan: 2,
          options: [
            { id: 1, text: '100' },
            { id: 2, text: '200' },
            { id: 3, text: '300' },
            { id: 4, text: '400' }
          ]
        },
        {
          modelName: 'start_date',
          filterName: 'Start Date',
          inputType: 'date',
          colSpan: 2
        },
        {
          modelName: 'end_Date',
          filterName: 'End Date',
          inputType: 'date',
          colSpan: 2
        },
        {
          modelName: 'destination',
          filterName: 'Destination',
          inputType: 'input',
          colSpan: 4
        },
        {
          modelName: 'trailer_status',
          filterName: 'Trailer Status',
          inputType: 'input',
          colSpan: 4
        }
      ],
      vfilter: {} as {
                [key: string]: unknown;
            },
      mode: 'list'
    }
  },
  computed: {
    loads (): LoadBoardDetails[] {
      return (this.$store.getters['marketplace/loadBoardDetails/loads'])
    },
    loadsPageCount (): Number {
      return (this.$store.getters['marketplace/loadBoardDetails/pageCount'])
    }
  },
  created () {
    this.getLoadsDetails()
  },
  methods: {
    ...mapActions({
      getLoadsDetails: (action, page) => action('marketplace/loadBoardDetails/getLoads', page)
    }),
    getKey () {
      this.tableKey = Math.random()
    },
    select (index: number): void {
      this.selectedTab = index
      this.getKey()
    }
  },
  components: { BrokerMarketPlaceCard }
})
</script>
