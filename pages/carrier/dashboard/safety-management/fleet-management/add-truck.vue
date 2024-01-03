<template>
  <div class="add-truck">
    <nuxt-child @close-drawer="$emit('close-drawer')" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AddTruckPageTEST',
  mounted () {
    this.$router.push('/carrier/dashboard/safety-management/fleet-management/add-truck/add-truck-first-step')
  }
})
</script>

  <style scoped>

  </style>
