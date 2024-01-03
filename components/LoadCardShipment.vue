<template>
  <div
    class="load-card bg-white rounded-xl transition-all duration-500
    hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
  >
    <div class="load-body px-6 py-5 flex flex-col border-b border-dashed border-b-grey-blue-100 dark:border-b-gray-600">
      <div class="grid gap-12 grid-cols-7">
        <div class="card-left col-span-3 border-r border-r-grey-blue-100 dark:border-r-gray-600">
          <div class="row items-center head mb-6">
            <div class="col-auto top-badge">
              <Badge
                :title="data.loadStatus"
                :size="SizeTypeEnum.MD"
                :class="[
                  {'bg-blue-100 text-blue-800' : data.loadStatus === 'Upcoming Load'},
                  {'bg-purple-100 text-crocus-purple' : data.loadStatus === 'Un-assigned'},
                  {'bg-green-100 text-green-700' : data.loadStatus === 'Assigned'},
                  {'bg-orange-100 text-orange' : data.loadStatus === 'In-transit'},
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
                    {'text-green-600' : data.status === 'On-route'},
                    {'text-orange-600' : data.status === 'Waiting'},
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
                  {'text-green-700' : data.status === 'On-route'},
                  {'text-orange' : data.status === 'Waiting'},
                ]"
              >
                {{ data.status }}
              </span>
            </div>
          </div>
          <div class="row items-center">
            <span class="text-grey-dark-200 text-b-4 col-12 mb-1">Shipper Load ID</span>
            <div class="col-auto">
              <h5 class="font-semibold dark:text-white">
                {{ data.shipperLoadId }} SHP - 09362
              </h5>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-4 2xl:col-3">
              <div class="col-auto">
                <div class="col-auto border-r border-r-grey-blue-100 dark:border-r-gray-600">
                  <img src="/images/Amazon.png" alt="amazon">
                </div>
                <span class="text-b-4 mb-1 font-bold">Amazon</span>
                <div class="text-gray-400 text-c-2">
                  <span class="font-medium">
                    Shipper
                  </span>
                </div>

                <div class="col-auto flex items-center gap-2">
                  <span v-if="data.stops.length > 0" class="text-b-3 font-medium dark:text-white">
                    {{ data.stops[0].value }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-4 2xl:col-3">
              <div class="row">
                <div class="col-auto">
                  <img src="/images/vendor_2.png" alt="vendor">
                </div>
                <span class="text-b-4 mb-1 font-bold">Keep Truck</span>
                <div class="text-gray-400 text-c-2">
                  <span class="font-medium">
                    Carrier
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 mx-0">
            <div v-if="!vertical" class="row mt-4 mx-0">
              <div v-for="(stop,index) in stops" :key="index" class="col-auto p-0 flex items-center">
                <span
                  v-tooltip="stop.value"
                  class="w-5 h-5 rounded-full flex items-center justify-center  text-white text-c-1"
                  :class="[
                    {'bg-green-400' : (index+1) <= (data?.currentStop || currentStop) && data?.loadStatus !== 'Waiting'},
                    {'bg-gray-300' : (index+1) >= (data?.currentStop || currentStop) || data?.loadStatus === 'Waiting'},
                  ]"
                >
                  {{ index+1 }}
                </span>
                <div
                  v-if="index+1 !== stops.length"
                  class="h-1 w-3 rounded col-auto mx-2"
                  :class="[
                    {'bg-green-400' : index+2 <= (data?.currentStop || currentStop) && data?.loadStatus !== 'Waiting'},
                    {'bg-gray-300' : index+2 >= (data?.currentStop || currentStop) || data?.loadStatus === 'Waiting'},
                  ]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-right col-span-4">
          <div class="row gap-2">
            <div class="col-auto action-buttons p-0 ml-auto flex gap-2">
              <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
                <Icon
                  icon="edit-2"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div class="row mt-7">
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
                  <span class="font-bold text-b-4 block text-green-700"> {{ data.totalRevenue }} $4,500.12</span>
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
                  <span class="text-grey-dark-200 text-c-1 block">Total Distance</span>
                  <span class="font-medium text-b-4 block">{{ data.totalDistance }} 500 Miles</span>
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
                  <span class="text-grey-dark-200 text-c-1 block">Max Buy</span>
                  <span class="font-medium text-b-4 block">{{ data.maxBuy }} $20,000</span>
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
                  <span class="text-grey-dark-200 text-c-1 block">Buy Now</span>
                  <span class="font-medium text-b-4 block">{{ data.buyNow }} $18,000</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-7">
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
                  <span class="text-grey-dark-200 text-c-1 block">Trailer Required</span>
                  <span class="font-medium text-b-4 block">{{ data.trailerRequired }} TRL-56845</span>
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
                  <span class="text-grey-dark-200 text-c-1 block">Equipment Type</span>
                  <span class="font-medium text-b-4 block">{{ data.equipmentType }} 53’ Trailer</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="box"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Load Type</span>
                  <span class="font-medium text-b-4 block">{{ data.loadTrip }} Round Trip</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import LoadItemDetail from './LoadItemDetail.vue'
import { SizeTypeEnum } from './ts/enums'

export default {
  name: 'LoadCardShipment',
  components: { LoadItemDetail },
  props: {
    data: {
      type: Object,
      required: true,
      default: null
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
    }
  },
  data () {
    return {
      currentStop: 3,
      SizeTypeEnum,
      circumference: 30 * 2 * Math.PI,
      showDetail: false,
    }
  },
  computed: {
    percent () {
      return this.data?.status === 'On-route' ? 10 : 2
    }
  }
}
</script>

  <style scoped>

  </style>
