<template>
  <LoadItemDetail :data="{ ...item, stops: stops }" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Stop } from '@/models/stops'

export default Vue.extend({
  name: 'LoadStopItemWrapper',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      stops: [] as Stop[]
    }
  },
  created () {
    this.$axios.get(`/dispatch_two_api/StopsDetails/Loads/${this.item.id}?page_size=12&page_number=1`).then((res: any) => {
      console.log('res.data', res.data)
      this.stops = res.data.data
    })
  }
})
</script>

<style scoped>

</style>
