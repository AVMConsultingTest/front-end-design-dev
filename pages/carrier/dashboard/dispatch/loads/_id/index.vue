<template>
  <div class="w-full">
    <PageHeader
      title="Load Details"
      class="mb-10"
      @goback="$router.go(-1)"
      @search="''"
    />
    <LoadCard
      :no-link="true"
      :link-id="parseInt($route.params.id, 10)"
      :data="{ ...load, id: parseInt($route.params.id, 10), stops: stops }"
      :without-details="true"
    />
    <LoadItemDetail :data="{ ...load, stops: stops }" :splitted="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import LoadItemDetail from '~/components/LoadItemDetail.vue'
import { Stop } from '~/models/stops'

export default Vue.extend({
  name: 'LoadDetails',
  components: { LoadItemDetail },
  layout: 'Dashboard',
  data () {
    return {
      stops: [] as Stop[]
    }
  },
  computed: {
    load () {
      return this.$store.getters['loads/load']
    }
  },
  mounted () {
    this.getLoad(parseInt(this.$route.params.id, 10))
    this.$axios.get(`/dispatch_two_api/StopsDetails/Loads/${this.$route.params.id}?page_size=12&page_number=1`).then((res: any) => {
      console.log('res.data', res.data)
      if (res.data.data?.length > 0) {
        this.stops = res.data.data
      }
    })
  },
  methods: {
    ...mapActions({
      getLoad: (action, id) => action('loads/getLoad', id)
    })
  }
})
</script>

<style scoped>

</style>
