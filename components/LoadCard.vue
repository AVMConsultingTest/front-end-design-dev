<template>
  <div
    class="load-card bg-white rounded-xl transition-all duration-500
  hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
    :class="[
      { '!shadow-none' : vertical }
    ]"
  >
    <LoadDrawer :id="data?.id" ref="drawer" :load-data="data" />
    <div class="load-body px-6 py-5 flex flex-col border-b border-dashed border-b-grey-blue-100 dark:border-b-gray-600">
      <div
        class="grid gap-12 "
        :class="[
          { '!grid-rows-2' : vertical },
          { 'grid-cols-7': !vertical }
        ]"
      >
        <div
          class="card-left col-span-3 border-r border-r-grey-blue-100 dark:border-r-gray-600"
          :class="[{ '!col-span-3 !border-0' : vertical }]"
        >
          <div class="row items-center head mb-6">
            <div class="col-auto top-badge">
              <Badge
                :title="data?.status"
                :size="SizeTypeEnum.MD"
                :class="[
                  {'bg-blue-100 text-blue-800' : data?.status === 'Upcoming Load'},
                  {'bg-purple-100 text-crocus-purple' : data?.status === 'Un-assigned'},
                  {'bg-green-100 text-green-700' : data?.status === 'Assigned'},
                  {'bg-orange-100 text-orange' : data?.status === 'In-transit'},
                ]"
              />
            </div>
            <div class="col-auto route-stat flex items-center gap-2">
              <svg class="w-6 h-6 transition-all" style="transform: rotate(270deg);">
                <circle
                  class="text-grey-blue-100 transition-all"
                  stroke-width="3"
                  stroke="currentColor"
                  fill="transparent"
                  r="10"
                  cx="12"
                  cy="12"
                />
                <circle
                  class="transition-all"
                  :class="[
                    {'text-green-600' : data?.status === 'On-route'},
                    {'text-orange-600' : data?.status === 'Waiting'},
                  ]"
                  stroke-width="3"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="circumference - percent / 100 * circumference"
                  stroke-linecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="10"
                  cx="12"
                  cy="12"
                />
              </svg>
              <span
                class="text-b-4 font-medium"
                :class="[
                  {'text-green-700' : data?.status === 'On-route'},
                  {'text-orange' : data?.status === 'Waiting'},
                ]"
              >
                {{ data?.status }}
              </span>
            </div>
          </div>
          <div class="row items-center">
            <span class="text-grey-dark-200 text-b-4 col-12 mb-1">Broker Load ID</span>
            <div class="col-auto">
              <h5 class="font-semibold dark:text-white">
                {{ data?.broker_id }}
              </h5>
            </div>
            <nuxt-link v-if="!noLink" :to="`/carrier/dashboard/dispatch/loads/${linkId || data?.id}`" class="text-dark-blue text-c-1 col-auto border-l border-l-dark-blue items-center flex gap-2 font-medium">
              More Details
              <Icon icon="export-3" color="dark-blue" class="w-4 h-4" />
            </nuxt-link>
          </div>
          <div class="col-10 mt-6 mb-6 flex items-center">
            <div class="min-w-[10vw] max-w-[10vw]">
              <div class="row">
                <span class="text-grey-dark-200 text-b-4 col-12 mb-1 font-medium">Origin</span>
                <div class="col-auto flex items-center gap-2">
                  <span v-if="data?.load_stops.length > 0" class="text-b-3 font-medium dark:text-white">
                    {{ data?.load_stops[0]?.pickup_city }}
                  </span>
                  <span class="w-5 h-5 rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                    1
                  </span>
                </div>
                <div class="col-12 text-gray-400 text-c-2">
                  {{ formatDate(data?.load_stops[0]?.pickup_date) }}
                </div>
              </div>
            </div>
            <div class="ml-0 mr-auto">
              <Icon icon="routing-2" color="gray" variant="bulk" :alpha="400" class="w-7 h-7" />
            </div>
            <div class="min-w-[10vw] max-w-[10vw]">
              <div class="row">
                <span class="text-grey-dark-200 text-b-4 col-12 mb-1 font-medium">Destination</span>
                <div class="col-auto flex items-center gap-2">
                  <span v-if="data?.load_stops.length > 0" class="text-b-3 font-medium dark:text-white">
                    {{ data?.load_stops[data?.load_stops.length-1]?.drop_off_city }}
                  </span>
                  <span class="w-5 h-5 rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                    {{ data?.load_stops.length > 1 ? data?.load_stops.length : '2' }}
                  </span>
                </div>
                <div class="col-12 text-gray-400 text-c-2">
                  <span class="font-medium">ETA:</span>{{ formatDate(data?.load_stops[0]?.drop_off_date) }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="!vertical" class="row mt-4 mx-0">
            <div v-for="(stop,index) in data?.load_stops" :key="index" class="col-auto p-0 flex items-center">
              <span
                v-tooltip="stop?.pickup_city"
                class="w-5 h-5 rounded-full flex items-center justify-center  text-white text-c-1"
                :class="[
                  {'bg-green-400' : (index+1) <= (currentStop) && data?.status !== 'Waiting'},
                  {'bg-gray-300' : (index+1) >= (currentStop) || data?.status === 'Waiting'},
                ]"
              >
                {{ index+1 }}
              </span>
              <div
                v-if="index+1 !== data?.load_stops.length || data?.load_stops.length === 1"
                class="h-1 w-3 rounded col-auto mx-2"
                :class="[
                  {'bg-green-400' : index+2 <= (currentStop) && data?.status !== 'Waiting'},
                  {'bg-gray-300' : index+2 >= (currentStop) || data?.status === 'Waiting'},
                ]"
              />
            </div>
            <div v-if="data?.load_stops.length === 1" class="col-auto p-0 flex items-center">
              <span
                v-tooltip="data?.load_stops[0]?.drop_off_city"
                class="w-5 h-5 rounded-full flex items-center justify-center  text-white text-c-1"
                :class="[
                  {'bg-green-400' : data?.status === 'Completed'},
                  {'bg-gray-300' : data?.status !== 'Completed'},
                ]"
              >
                2
              </span>
            </div>
          </div>
        </div>
        <div class="card-right col-span-4" :class="[{ '!col-span-3' : vertical }]">
          <div class="row gap-2">
            <div class="col-auto border-r border-r-grey-blue-100 dark:border-r-gray-600">
              <img src="/images/_truck.png" alt="truck">
            </div>
            <div class="drivers flex col-auto gap-2">
              <div class="avatars -space-x-6 overflow-hidden">
                <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
                <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
              </div>
              <div class="driver-contact flex items-center">
                <div class="">
                  <div class="col-12 flex items-center gap-2">
                    <Icon
                      icon="call"
                      variant="bulk"
                      color="grey-dark"
                      :alpha="300"
                      class="w-5 h-5"
                    />
                    <span class="font-medium text-c-1">{{ data?.primary_driver?.first_name }} </span>
                    <span class="font-normal text-c-2">Main Driver</span>
                  </div>
                  <div class="col-12 flex items-center gap-2">
                    <Icon
                      icon="call"
                      variant="bulk"
                      color="grey-dark"
                      :alpha="300"
                      class="w-5 h-5"
                    />
                    <span class="font-medium text-c-1">{{ data?.secondary_driver?.last_name }}</span>
                    <span class="font-normal text-c-2">Co-Driver</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!editable" class="col-auto action-buttons p-0 ml-auto flex gap-2">
              <div
                class="w-8 h-8 border border-red-200 relative rounded-lg flex items-center justify-center cursor-pointer"
                @click="drawer(2)"
              >
                <Icon
                  icon="sms"
                  variant="bold"
                  color="red"
                  :alpha="0"
                  class="w-4 h-4"
                />
                <div class="rounded-full border border-white w-3 h-3 flex items-center justify-center text-[8px] text-white absolute -mr-3 -mt-3 bg-red">
                  2
                </div>
              </div>
              <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center" @click="drawer('')">
                <Icon
                  icon="map"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 cursor-pointer"
                />
              </div>
              <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
                <Icon icon="more-2" color="grey-dark" :alpha="100" :disable-fill="false" class="w-4 h-4 cursor-pointer" />
              </div>
            </div>
            <div v-else-if="!vertical" class="rounded-lg col-auto action-buttons p-0 ml-auto flex gap-2 border !w-9 !h-9 border-gray-300 justify-center items-center cursor-pointer">
              <Icon icon="edit-2" variant="bold" color="gray" :alpha="400" class="w-5 h-5" />
            </div>
          </div>
          <div class="row mt-7">
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="weight"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Cargo Weight</span>
                  <span class="font-medium text-b-4 block"> {{ data?.load_stops[0]?.weight ?? 'N/a' }}</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="percentage-square"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Rate/Mile</span>
                  <span class="font-medium text-b-4 block">{{ data?.rate_per_mile}}</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="routing-2"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Total Miles</span>
                  <span class="font-medium text-b-4 block">{{ data?.miles }} Miles</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-7">
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="group"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Truck ID</span>
                  <span class="font-medium text-b-4 block">{{ data?.truck_id }}</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="keyboard"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Trailer ID</span>
                  <span class="font-medium text-b-4 block">{{ data?.trailer_id }}</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="scanning"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Commodity Type</span>
                  <span class="font-medium text-b-4 block">{{ data?.commodity_type }}</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="empty-wallet-tick"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Total Revenue</span>
                  <span class="font-medium text-b-4 block text-green-700">{{ data?.carrier_revenue }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!vertical" class="load-footer px-6 pt-3 pb-4">
      <div class="row gap-2">
        <div
          class="col-auto px-2 py-1 rounded-md text-c-1 font-medium"
          :class="[
            {'bg-gray-300/50 text-gray-400' : data?.status === 'Waiting'},
            {'bg-orange-100 text-orange' : data?.status !== 'Waiting'},
          ]"
        >
          13:24:12 left
        </div>
        <div v-if="data?.status !== 'Waiting'" class="col-auto px-2 py-1 rounded-md text-c-1 bg-green-600/50 font-medium flex gap-1 items-center dark:text-white">
          <div class="w-2 h-2 rounded-full bg-green-800" /> California <span class="text-gray-400 font-medium dark:text-gray-200">(Live)</span>
        </div>
        <div v-if="!withoutDetails && data?.load_stops?.length > 1" class="col-auto ml-auto">
          <span v-if="!showDetail" class="text-gray-400 text-c-1 cursor-pointer" @click="showDetail = !showDetail">
            + Show More Details
          </span>
          <span v-else class="text-gray-400 text-c-1 cursor-pointer" @click="showDetail = !showDetail">
            - Show Less Details
          </span>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div v-if="showDetail" class="w-100">
        <LoadItemDetail :data="data" @openDrawer="drawer('')" @openMessages="drawer(2)" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import moment from 'moment'
import LoadItemDetail from './LoadItemDetail.vue'
import { SizeTypeEnum } from './ts/enums'
import { LoadDetails } from '~/models/DISPATCH/load/loadDetails'
import { Stop } from '~/models/stops'

export default Vue.extend({
  name: 'LoadCard',
  components: { LoadItemDetail },
  props: {
    data: {
      type: Object,
      required: true,
      default: null
    } as PropOptions<LoadDetails>,
    noLink: {
      type: Boolean
    },
    linkId: {
      type: Number,
      default: null
    },
    withoutDetails: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    noStopRequest: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      SizeTypeEnum,
      circumference: 30 * 2 * Math.PI,
      currentStop: 3,
      // stops: [] as Stop[],
      stateStops: [
        {
          id: 10,
          value: 'Roanoke, TX',
          code: 'CLT5',
          driver: 'Jenny Wilsonsss',
          load_miles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        },
        {
          id: 11,
          value: 'Roanoke, TX',
          code: 'BHM1',
          driver: 'Jenny Wilson',
          totalMiles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        },
        {
          id: 12,
          value: 'Roanoke, TX',
          code: 'AGS5',
          driver: 'Jenny Wilson',
          totalMiles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        },
        {
          id: 13,
          value: 'Roanoke, TX',
          code: 'HKL1',
          driver: 'Guy Hawkins',
          totalMiles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        },
        {
          id: 14,
          value: 'Oxnard, CA',
          code: 'MYK3',
          driver: 'Guy Hawkins',
          totalMiles: 425.5,
          totalDuration: '1d 10h 15m',
          bolLink: '#'
        }
      ],
      showDetail: false
    }
  },
  computed: {
    percent (): any {
      return this.data?.status === 'On-route' ? 10 : 2
    },
    loadStops (): any {
      console.log(this?.load_stops)
      if (this?.load_stops) { return this?.load_stops } else { return this.load_stops }
    }
  },
  // created () {
  //   if (this.noStopRequest === false) {
  //     this.$axios.get(`/dispatch_two_api/StopsDetails/Loads/${this.data.id}?page_size=12&page_number=1`).then((res: any) => {
  //       console.log('res.data', res.data)
  //       this.stops = res.data.data
  //     })
  //   }
  // },
  methods: {
    drawer (componentName: string | number) {
      (this.$refs.drawer as Vue & { showDrawer: (component: string | number, routeUrl?: String) => Element }).showDrawer(componentName)
    },
    formatDate (date: string) {
      return moment(date).format('MM/DD/YYYY hh:mm A')
    }
  }
})
</script>

<style scoped>

</style>
