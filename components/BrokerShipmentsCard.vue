<template>
  <div
    class=" bg-white rounded-xl transition-all duration-500
    hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
  >
    <div class="grid grid-cols-12 py-4 px-3">
      <div class="text-gray-400 text-c-1 font-medium">
        Customer Name
      </div>
      <div class="text-gray-400 text-c-1 font-medium pl-2">
        Broker Load ID
      </div>
      <div class="text-gray-400 text-c-1 font-medium pl-4">
        Customer Load ID
      </div>
      <div class="text-gray-400 text-c-1 font-medium col-span-2 pl-8">
        Origin
      </div>
      <div class="text-gray-400 text-c-1 font-medium col-span-2">
        Destination
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Revenue/Cost
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Equip. Type
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Accepted Date
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Carrier Name
      </div>
      <div class="text-gray-400 text-c-1 font-medium pl-4">
        Status
      </div>
      <div class="flex items-center justify-start">
        <div class="flex items-center justify-start text-c-1">
          <span class="block text-c-1 font-semibold">
            {{ data.shipper_name }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-start font-medium text-dark-blue text-c-1 pl-9">
        {{ data.broker_id }}
      </div>
      <div class="flex items-center justify-start text-c-1 font-semibold pl-4" />
      <div class="col-span-4">
        <div class="row mt-3">
          <div class="col-4 2xl:col-3">
            <div class="row">
              <div class="col-auto flex items-center gap-2">
                <span class="text-b-4 font-medium dark:text-white" />
              </div>
              <div class="col-12 text-gray-400 text-c-2" />
            </div>
          </div>
          <div class="col-auto flex items-center justify-center mb-4">
            <Icon icon="routing-2" color="gray" variant="bulk" :alpha="400" class="w-7 h-7" />
          </div>
          <div class="col-4 2xl:col-3">
            <div class="row">
              <div class="col-auto flex items-center gap-2">
                <span class="text-b-4 font-medium dark:text-white" />
              </div>
              <div class="col-12 text-gray-400 text-c-2">
                <span class="font-medium" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-start text-c-1">
        <span class="text-green-900 font-medium" /> <span class="font-medium text-gray" />
      </div>
      <div class="flex items-center justify-start text-c-1 pl-6">
        {{ data.equipment }}
      </div>
      <div class="flex items-center justify-start text-c-1">
        <span class="font-medium">{{ data.accepted_date }}</span>
      </div>
      <div class="flex items-center justify-start text-c-1">
        <span class="font-normal">{{ data.carrier_name }}</span>
      </div>
      <div class="flex items-center justify-start">
        <div class="w-16 items-center">
          <Badge
            :title="data.load_status"
            :size="SizeTypeEnum.SM"
            class="items-center justify-center"
            :class="[
              {'bg-green-100 text-green-700' : data.load_status === 'Open'},
              {'bg-gray-100 text-gray-200' : data.load_status === 'Closed'},
              {'bg-green-100 text-green-700' : data.load_status === 'Active'},
              {'bg-red-100 text-red' : data.load_status === 'Cancelled'},
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import { PropOptions } from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { LoadsDetails } from '~/models/Broker/loadsDetails/loadsDetails'
export default ({
  name: 'BrokerShipmentsCard',
  props: {
    data: {
      type: Object,
      required: true,
      default: null
    } as PropOptions<LoadsDetails>,
    linkId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum
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
