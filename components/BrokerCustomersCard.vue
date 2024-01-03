<template>
  <div
    class=" bg-white rounded-xl transition-all duration-500
      hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
  >
    <div class="grid grid-cols-10 py-4 px-3">
      <div class="text-gray-400 text-c-1 font-medium">
        Customer Name
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Customer ID
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        DBA Name
      </div>
      <div class="text-gray-400 text-c-1 font-medium pl-4">
        Sales Rep
      </div>
      <div class="text-gray-400 text-c-1 font-medium pr-2">
        Account Manager
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Credit Limit
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Available Credit
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Revenue
      </div>
      <div class="text-gray-400 text-c-1 font-medium pr-2">
        Margin $/%
      </div>
      <div class="text-gray-400 text-c-1 font-medium pr-2">
        Load Count
      </div>
    </div>
    <div
      class=" bg-white rounded-xl transition-all duration-500
      hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
    >
      <div class="grid grid-cols-10 pb-4 px-3">
        <div class="flex items-center justify-start" @click="$router.push(`/broker/dashboard/listening-profile/${data.id}`)">
          <div class="col-auto cursor-pointer">
            <img src="/images/lcw_small.png" alt="amazon">
          </div>
          <span class="text-c-1 mb-1 font-medium pl-2 cursor-pointer">
            LCW
          </span>
        </div>
        <div class="font-semibold flex items-center justify-start text-dark-blue text-c-1">
          BL - 093662
        </div>
        <div class="flex items-center justify-start text-c-1 font-semibold">
          LCW
        </div>
        <div class="flex items-center justify-start">
          <div class="col-auto">
            <img src="/images/Ellipse_4.png" alt="ellipse">
          </div>
          <span class="text-c-1 mb-1 font-medium pl-2">
            Ellen Rose
          </span>
        </div>
        <div class="font-medium text-c-1 flex items-center justify-start">
          Acct Mgr 1
        </div>
        <div class="font-medium text-c-1 text-green-900 flex items-center justify-start">
          $1,000.000
        </div>
        <div class="font-medium text-c-1 text-green-900 flex items-center justify-start pl-4">
          $560.000
        </div>
        <div class="font-medium text-c-1 flex items-center justify-start">
          $780
        </div>
        <div class="font-semibold text-dark-blue text-c-1 flex items-center justify-start">
          $500 / 12 %
        </div>
        <div class="font-normal text-c-1 flex items-center justify-start pl-4">
          100
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
import { CustomersDetails } from '~/models/Broker/customersDetails/customersDetails'
export default {
  name: 'BrokerCustomersCard',
  props: {
    data: {
      type: Object,
      required: true,
      default: null
    } as PropOptions<CustomersDetails>,
    linkId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
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
          modelName: 'sales_representative',
          filterName: 'Sales Rep',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Driving' }
          ]
        },
        {
          modelName: 'account_manager',
          filterName: 'Account Manager',
          inputType: 'input',
          colSpan: 2,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
  th{
  font-family: 'Euclid Circular A';
  font-weight: 500;
  }
</style>
