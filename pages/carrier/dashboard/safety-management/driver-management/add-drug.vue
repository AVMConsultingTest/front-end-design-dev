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
  name: 'AddDrugTest',
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
        { id: 1, text: 'a2as', selected: false },
        { id: 2, text: 'bdas', selected: true },
        { id: 3, text: 'baads', selected: true },
        { id: 4, text: 'bcasd', selected: true },
        { id: 5, text: 'bdasd', selected: true },
        { id: 6, text: 'b14e', selected: true },
        { id: 7, text: 'bf55', selected: true },
        { id: 8, text: 'bg765', selected: true },
        { id: 9, text: 'bhzxc', selected: true }
      ] as SelectOption[]
    }
  },
  computed: {
    step () {
      return (this.$store.getters['driver/step'])
    }
  },
  mounted () {
    this.$router.push('/carrier/dashboard/safety-management/driver-management/add-drug')
  },
  methods: {
    handleSubmit () {
      console.log('in')
      this.$router.push('/carrier/dashboard/safety-management/driver-management/add-driver/address-details')
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
