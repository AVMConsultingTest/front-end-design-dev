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
                :title="data.load_status"
                :size="SizeTypeEnum.MD"
                :class="[
                  {'bg-blue-100 text-blue-800' : data.load_status === 'Upcoming Load'},
                  {'bg-purple-100 text-crocus-purple' : data.load_status === 'Un-assigned'},
                  {'bg-green-100 text-green-700' : data.load_status === 'Assigned'},
                  {'bg-orange-100 text-orange' : data.load_status === 'In-transit'},
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
                    {'text-green-600' : data.load_status === 'On-route'},
                    {'text-orange-600' : data.load_status === 'Waiting'},
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
                  {'text-green-700' : data.load_status === 'On-route'},
                  {'text-orange' : data.load_status === 'Waiting'},
                ]"
              >
                {{ data.load_status }}
              </span>
            </div>
          </div>
          <div class="row items-center">
            <span class="text-grey-dark-200 text-b-4 col-12 mb-1">Broker Load ID</span>
            <div class="col-auto">
              <h5 class="font-semibold dark:text-white">
                {{ data.broker_id }}
              </h5>
            </div>
            <nuxt-link :to="`/carrier/dashboard/dispatch/loads/${linkId + 1}`" class="text-dark-blue text-c-1 col-auto border-l border-l-dark-blue items-center flex gap-2 font-medium">
              More Details
              <Icon icon="export-3" color="dark-blue" class="w-4 h-4" />
            </nuxt-link>
          </div>
          <div class="row mt-3">
            <div class="col-4 2xl:col-3">
              <div class="row">
                <span class="text-grey-dark-200 text-b-4 col-12 mb-1 font-medium">Origin</span>
                <div class="col-auto flex items-center gap-2">
                  <span v-if="stops.length > 0" class="text-b-3 font-medium dark:text-white">
                    {{ stops[0].value }}
                  </span>
                  <span class="w-5 h-5 rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                    1
                  </span>
                </div>
                <div class="col-12 text-gray-400 text-c-2">
                  12/10/22 - 10:23 PM
                </div>
              </div>
            </div>
            <div class="col-auto flex items-center pt-3 justify-center">
              <Icon icon="routing-2" color="gray" variant="bulk" :alpha="400" class="w-7 h-7" />
            </div>
            <div class="col-4 2xl:col-3">
              <div class="row">
                <span class="text-grey-dark-200 text-b-4 col-12 mb-1 font-medium">Destination</span>
                <div class="col-auto flex items-center gap-2">
                  <span v-if="stops.length > 0" class="text-b-3 font-medium dark:text-white">
                    {{ stops[stops.length-1].value }}
                  </span>
                  <span class="w-5 h-5 rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                    {{ stops.length }}
                  </span>
                </div>
                <div class="col-12 text-gray-400 text-c-2">
                  <span class="font-medium">ETA:</span>12/10/22 - 10:23 PM
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 mx-0">
            <div v-for="(stop,index) in stops" :key="index" class="col-auto p-0 flex items-center">
              <span
                v-tooltip="stop.value"
                class="w-5 h-5 rounded-full flex items-center justify-center  text-white text-c-1"
                :class="[
                  {'bg-green-400' : (index+1) <= currentStop && data.load_status !== 'Waiting'},
                  {'bg-gray-300' : (index+1) >= currentStop || data.load_status === 'Waiting'},
                ]"
              >
                {{ index+1 }}
              </span>
              <div
                v-if="index+1 !== stops.length"
                class="h-1 w-3 rounded col-auto mx-2"
                :class="[
                  {'bg-green-400' : index+2 <= currentStop && data.load_status !== 'Waiting'},
                  {'bg-gray-300' : index+2 >= currentStop || data.load_status === 'Waiting'},
                ]"
              />
            </div>
          </div>
        </div>
        <div v-if="generalInfo === false" class="card-right col-span-4">
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
                    <span class="font-normal text-c-2">{{ request.main_driver_name }}</span>
                  </div>
                  <div class="col-12 flex items-center gap-2">
                    <Icon
                      icon="call"
                      variant="bulk"
                      color="grey-dark"
                      :alpha="300"
                      class="w-5 h-5"
                    />
                    <span class="font-normal text-c-2">{{ request.co_driver_name }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-auto action-buttons p-0 ml-auto flex gap-2">
              <div class="w-8 h-8 border border-red-200 relative rounded-lg flex items-center justify-center">
                <Icon
                  icon="sms"
                  variant="bold"
                  color="red"
                  :alpha="0"
                  class="w-4 h-4 cursor-pointer"
                />
                <div class="rounded-full border border-white w-3 h-3 flex items-center justify-center text-[8px] text-white absolute -mr-3 -mt-3 bg-red">
                  4
                </div>
              </div>
              <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
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
                  <span class="text-grey-dark-200 text-c-1 block">Customer Load  ID</span>
                  <span class="font-medium text-b-4 block"> {{ request.customer_load_id }}</span>
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
                  <span class="font-medium text-b-4 block text-green-700">{{ request.total_revenue }}</span>
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
                  <span class="text-grey-dark-200 text-c-1 block">Total Cost</span>
                  <span class="font-medium text-b-4 block">{{ request.total_cost }}
                  </span>
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
                  <span class="font-medium text-b-4 block">{{ request.total_miles }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-7">
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="calendar"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Accepted Date</span>
                  <span class="font-medium text-b-4 block">{{ request.accepted_dated }}</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="flex gap-1">
                <Icon
                  icon="truck"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Truck ID</span>
                  <span class="font-medium text-b-4 block">{{ request.truck_id }}</span>
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
                  <span class="font-medium text-b-4 block">{{ request.trailer_id }}</span>
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
                  <span class="font-medium text-b-4 block">{{ request.equipment_type }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card-right col-span-4">
          <div class="row gap-2">
            <div class="col-auto action-buttons p-0 ml-auto flex gap-2">
              <div class="w-8 h-8 border border-red-200 relative rounded-lg flex items-center justify-center">
                <Icon
                  icon="sms"
                  variant="bold"
                  color="red"
                  :alpha="0"
                  class="w-4 h-4 cursor-pointer"
                />
                <div class="rounded-full border border-white w-3 h-3 flex items-center justify-center text-[8px] text-white absolute -mr-3 -mt-3 bg-red">
                  4
                </div>
              </div>
              <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
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
          </div>
          <div class="row">
            <span class="text-c-1 font-medium text-black">Load General Information</span>
          </div>
          <div class="row mt-7">
            <div class="col-3">
              <div class="flex gap-1">
                <Icon
                  icon="weight"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Weight</span>
                  <span class="font-medium text-b-4 block"> {{ data.equipment_weight ?? 'N/a' }}</span>
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="flex gap-1">
                <Icon
                  icon="keyboard"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">BOL Number</span>
                  <span class="font-medium text-b-4 block"> {{ data.bol_document_id ?? 'N/a' }}</span>
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="flex gap-1">
                <Icon
                  icon="keyboard"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Customer Load  ID</span>
                  <span class="font-medium text-b-4 block"> {{ data.broker_id ?? 'N/a' }}</span>
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="flex gap-1">
                <Icon
                  icon="keyboard"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Made</span>
                  <span class="font-medium text-b-4 block text-green-700">{{ data.load_origin }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-7">
            <div class="col-3">
              <div class="flex gap-1">
                <Icon
                  icon="keyboard"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">PO Number</span>
                  <span class="font-medium text-b-4 block">{{ data.po_no }}</span>
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="flex gap-1">
                <Icon
                  icon="keyboard"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Delivery Number</span>
                  <span class="font-medium text-b-4 block">{{ data.delivery_no }}</span>
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="flex gap-1">
                <Icon
                  icon="keyboard"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Temperature</span>
                  <span class="font-medium text-b-4 block">{{ data.temperature }}</span>
                </div>
              </div>
            </div>
            <div class="col-3">
              <div class="flex gap-1">
                <Icon
                  icon="keyboard"
                  variant="bulk"
                  color="grey-dark"
                  :alpha="100"
                  class="w-4 h-4 mt-[2px]"
                />
                <div class="flex flex-col">
                  <span class="text-grey-dark-200 text-c-1 block">Reference Number</span>
                  <span class="font-medium text-b-4 block">{{ data.reference_no }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="load-footer px-6 pt-3 pb-4">
      <div class="row gap-2">
        <div
          class="col-auto px-2 py-1 rounded-md text-c-1 font-medium"
          :class="[
            {'bg-gray-300/50 text-gray-400' : data.load_status === 'Waiting'},
            {'bg-orange-100 text-orange' : data.load_status !== 'Waiting'},
          ]"
        >
          13:24:12 left
        </div>
        <div v-if="data.load_status !== 'Waiting'" class="col-auto px-2 py-1 rounded-md text-c-1 bg-[#F8E8E8]/50 font-medium flex gap-1 items-center dark:text-white">
          <div class="w-2 h-2 rounded-full bg-red-800" /> California <span class="text-gray-400 font-medium dark:text-gray-200">(Live)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import { PropOptions } from 'vue'
import { SizeTypeEnum } from './ts/enums'
import { LoadDetails } from '~/models/DISPATCH/load/loadDetails'

export default {
  name: 'BrokerDetailCard',
  props: {
    data: {
      type: Object,
      required: true,
      default: null
    } as PropOptions<LoadDetails>,
    linkId: {
      type: Number,
      default: null
    },
    generalInfo: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      SizeTypeEnum,
      circumference: 30 * 2 * Math.PI,
      currentStop: 3,
      request: {
        main_driver_name: 'Main Driver',
        co_driver_name: 'Co-Driver',
        customer_load_id: 'CL-75223',
        total_revenue: '$4,500.12',
        total_cost: '$400,50',
        total_miles: '500 Miles',
        accepted_dated: '09/20/2022',
        truck_id: 'TRC-125466',
        trailer_id: 'TRL-56845',
        equipment_type: '53’ Trailer'
      },
      stops: [
        {
          id: 10,
          value: 'Roanoke, TX',
          code: 'CLT5',
          driver: 'Jenny Wilson',
          totalMiles: 425.5,
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
    percent () {
      return this.data?.status === 'On-route' ? 10 : 2
    }
  }
}
</script>

  <style scoped>

  </style>
