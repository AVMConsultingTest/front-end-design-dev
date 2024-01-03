<template>
  <div
    class=" bg-white rounded-xl transition-all duration-500
  hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
  >
    <div class="grid grid-cols-11 py-4 px-3">
      <div class="text-gray-400 text-c-1 font-medium">
        Shipper Name
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Load ID
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Quote ID
      </div>
      <div class="text-gray-400 text-c-1 font-medium col-span-2">
        Origin
      </div>
      <div class="text-gray-400 text-c-1 font-medium col-span-2">
        Destination
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Last/New
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Cargo Type
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Status
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Action
      </div>
      <div class="flex items-center justify-start">
        <div class="col-auto pr-0 mr-2">
          <img src="/images/Amazon.png" alt="amazon" class="rounded-full w-10 h-10">
        </div>
        <div class="col-auto">
          <span class="block text-c-1 font-semibold whitespace-nowrap">
            {{ response.company_name }}
          </span>
          <span class="block text-c-1 text-[#475467]">
            {{ response.company_desc }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-start font-medium text-dark-blue text-c-1">
        BL-093662
      </div>
      <div class="flex items-center justify-start text-c-1 font-semibold">
        Q09621
      </div>
      <div class="col-span-4">
        <div class="row mt-3">
          <div class="col-4 2xl:col-3">
            <div class="row">
              <div class="col-auto flex items-center gap-2">
                <span v-if="stops.length > 0" class="text-b-4 font-medium dark:text-white">
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
          <div class="col-auto flex items-center justify-center">
            <Icon icon="routing-2" color="gray" variant="bulk" :alpha="400" class="w-7 h-7" />
          </div>
          <div class="col-4 2xl:col-3">
            <div class="row">
              <div class="col-auto flex items-center gap-2">
                <span v-if="stops.length > 0" class="text-b-4 font-medium dark:text-white">
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
      </div>
      <div class="flex items-center justify-start text-c-1">
        <span class="text-gray">$500</span> <span class="font-semibold">/ $400</span>
      </div>
      <div class="flex items-center justify-start text-c-1">
        Industrial Equipment
      </div>
      <div class="flex items-center justify-start">
        <div class="w-16 items-center">
          <Badge
            :title="data.load_status"
            :size="SizeTypeEnum.SM"
            class="items-center justify-center"
            :class="[
              {'bg-blue-100 text-blue-800' : data.load_status === 'Open'},
              {'bg-gray-100 text-gray-200' : data.load_status === 'Closed'},
              {'bg-green-100 text-green-700' : data.load_status === 'Active'},
              {'bg-red-100 text-red' : data.load_status === 'Cancelled'},
            ]"
          />
        </div>
      </div>
      <div class="w-8 h-8 pt-3 rounded-lg flex items-center justify-center">
        <Icon
          icon="more-2"
          color="grey-dark"
          :alpha="100"
          :disable-fill="false"
          class="w-4 h-4 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
export default Vue.extend({
  name: 'MapCardDetails',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      data: {
        load_status: 'Active'
      },
      response: {
        company_name: 'Amazon',
        company_desc: 'Amz'
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
      ]
    }
  }
})
</script>

<style scoped>
  th{
    font-family: 'Euclid Circular A';
    font-weight: 500;
  }
</style>
