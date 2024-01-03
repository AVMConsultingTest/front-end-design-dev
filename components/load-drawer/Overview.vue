<template>
  <div class="w-full flex mt-12">
    <div class="col-5">
      <div
        v-for="(stop, index) in load?.stops"
        :key="index"
        class="my-8"
        :class="[
          { '!mt-0' : index === 0 }
        ]"
      >
        <div class="flex">
          <div class="col-2 flex justify-center">
            <div
              class="rounded-full w-8 h-8 flex justify-center items-center"
              :class="[
                { 'bg-green-400' : load?.currentStop > index+1 },
                { 'bg-gray-300' : load?.currentStop <= index+1 },
              ]"
            >
              <h6>
                {{ index + 1 }}
              </h6>
            </div>
          </div>
          <div class="col-10 flex">
            <div class="col-5 flex flex-col">
              <h6 class="text-gray-800 font-medium mb-2">
                {{ stop?.drop_off_location }}
              </h6>
              <h6
                class="text-c-1 font-medium"
                :class="[
                  { 'text-green-400' : load?.currentStop > index+1 },
                  { 'text-orange' : load?.currentStop <= index+1 },
                ]"
              >
                {{ load?.currentStop > index+1 ? 'Load Assigned' : 'Waiting' }}
              </h6>
            </div>
            <div class="col-7">
              <span class="text-c-2 font-normal text-gray">
                <span class="font-bold">
                  ETA:
                </span>
                {{ load?.currentStop > index+1 ? stop?.pickup_date : stop?.pickup_time }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-7">
      <LoadCard :data="load" :vertical="true" :editable="true" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapActions } from 'vuex'
import LoadCard from '../LoadCard.vue'
import { LoadDetails } from '~/models/DISPATCH/load/loadDetails'

export default Vue.extend({
  name: 'Overview',
  components: { LoadCard },
  props: {
    id: {
      type: Number,
      default: 0
    },
    loadData: {
      type: Object,
      default: null
    } as PropOptions<LoadDetails>
  },
  computed: {
    load () {
      return this.loadData || this.$store.getters['loads/load']
    },
    requestId (): number {
      return this.id !== null && this.id !== undefined ? this.id : parseInt(this.$route.params.id, 10)
    }
  },
  created () {
    this.getLoad(this.requestId)
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
