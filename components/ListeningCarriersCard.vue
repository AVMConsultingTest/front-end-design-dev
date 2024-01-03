<template>
  <div
    class=" bg-white rounded-xl transition-all duration-500
    hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
  >
    <div class="grid grid-cols-11 py-4 px-3">
      <div class="text-gray-400 text-c-1 font-medium">
        Carrier Name
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Carrier ID
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        DBA Name
      </div>
      <div class="text-gray-400 text-c-1 font-medium pr-4">
        Home Base City
      </div>
      <div class="text-gray-400 text-c-1 font-medium pr-2">
        Home Base State
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        MC Number
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        DOT Number
      </div>
      <div class="text-gray-400 text-c-1 font-medium pr-2">
        Active Insurance
      </div>
      <div class="text-gray-400 text-c-1 font-medium pr-2">
        Insurance Expiration
      </div>
      <div class="text-gray-400 text-c-1 font-medium pr-2">
        Cargo Coverage
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Status
      </div>
    </div>
    <div
      class=" bg-white rounded-xl transition-all duration-500
    hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
    >
      <div class="grid grid-cols-11 py-4 px-3">
        <div class="flex items-center justify-start">
          <div class="col-auto">
            <img src="/images/Amazon.png" alt="ellipse">
          </div>
          <span class="text-c-1 mb-1 font-medium pl-2">
            {{ data.carrier_name }}
          </span>
        </div>
        <div class="font-semibold flex items-center justify-start text-dark-blue text-c-1">
          {{ data.carrier_id }}
        </div>
        <div class="flex items-center justify-start text-c-1 font-semibold">
          {{ data.dba_name }}
        </div>
        <div class="font-semibold text-c-1 flex items-center justify-start">
          {{ data.home_base_city }}
        </div>
        <div class="font-semibold text-c-1 flex items-center justify-start">
          {{ data.home_base_state }}
        </div>
        <div class="font-medium text-c-1 flex items-center justify-start">
          {{ data.mc_number }}
        </div>
        <div class="font-medium text-c-1 flex items-center justify-start">
          {{ data.dot_number }}
        </div>
        <div class="font-semibold text-green-900 text-c-1 flex items-center justify-start">
          {{ data.active_insurance }}
        </div>
        <div class="font-normal text-c-1 flex items-center justify-start">
          {{ data.insurance_exp }}
        </div>
        <div class="font-medium text-c-1 flex items-center justify-start">
          {{ data.cargo_coverage }}
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
                {'bg-red-100 text-red' : data.load_status === 'Inactive'},
              ]"
            />
          </div>
        </div>
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
  name: 'ListeningCarriersCard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      data: {
        load_status: 'Active',
        carrier_name: 'AMZ',
        carrier_id: 'CR219621',
        dba_name: 'AMZ',
        home_base_city: 'Roanoke',
        home_base_state: 'TX',
        mc_number: 'MC 123456789',
        dot_number: 'DOT 1254562',
        active_insurance: 'Yes',
        insurance_exp: '09/07/2022',
        cargo_coverage: '$1,000.000'
      },
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
