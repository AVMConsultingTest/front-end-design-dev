<template>
  <keep-alive>
    <nuxt-child @close-drawer="$emit('close-drawer')" />
  </keep-alive>
</template>

<script lang="ts">
import Vue from 'vue'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { Driver } from '~/models/driver/driver'
export default Vue.extend({
  name: 'PayrollAddDriver2',
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      firstName: '',
      request: {} as Driver,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
          { id: 1, text: 'Active', selected: false },
          { id: 2, text: 'Terminated', selected: true },
          { id: 3, text: 'Vacation', selected: true }
      ] as SelectOption[]
    }
  },
  methods: {
    handleSubmit () {
      console.log('in')
      this.$router.push('/carrier/dashboard/accounting/payroll/add-driver/-address-details')
    }
  }
})
</script>

  <style>
  .m-modal-overlay {
      @apply bg-dark/80 fixed bottom-0 left-0 right-0 top-0 flex justify-center;
  }
  .m-modal-content {
      @apply bg-white rounded-3xl shadow-2xl relative overflow-hidden;
  }
  </style>
