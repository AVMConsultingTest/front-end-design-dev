<template>
  <keep-alive>
    <nuxt-child @close-drawer="$emit('close-drawer')" />
  </keep-alive>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AssetsPage',
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {

    }
  },
  mounted () {
    this.$router.push('/carrier/dashboard/accounting/payables/assets/add-assets/assets-first-step')
  }
})
</script>
