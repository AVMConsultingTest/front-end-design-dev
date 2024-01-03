<template>
  <div class="add-trailer">
    <nuxt-child @close-drawer="$emit('close-drawer')" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AddTrailerPageTEST',
  mounted () {
    this.$router.push('/carrier/dashboard/safety-management/fleet-management/add-trailer/add-trailer-first-step')
  }
})
</script>

<style scoped>

</style>
