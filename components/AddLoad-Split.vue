<template>
  <div class="my-5">
    <widget title="Load Basics" icon="box" icon-color="orange" :no-border="true" :no-card-body="!toggle">
      <template #actions>
        <div @click="toggle = !toggle">
          <Icon
            icon="add"
            color="dark"
            :alpha="400"
            class="w-10 h-10"
          />
        </div>
      </template>
      <transition name="slide">
        <div v-show="toggle">
          <p class="font-bold">
            Splited Load Basic
          </p>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="load.loadId"
                name="shipperloadId"
                type="text"
                label="Shipper Load ID"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="load.shipperName"
                :multiple="false"
                :searchable="true"
                :options="shipperNameOptions"
                :bind-text="true"
                :addable="true"
                name="shipperName"
                label="Shipper Name"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="load.loadTrip"
                :multiple="false"
                :searchable="true"
                :options="loadOptions"
                :addable="true"
                name="loadTrip"
                label="Load Trip"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="load.totalRevenue"
                :multiple="false"
                :searchable="true"
                name="totalRevenue"
                label="Total Revenue"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="load.maxBuy"
                :multiple="false"
                :searchable="true"
                name="maxBuy"
                label="Max Buy"
              />
            </div>
            <div class="col-4 my-5">
              <Input
                v-model="load.maxBuyNow"
                :multiple="false"
                :searchable="true"
                name="maxBuyNow"
                label="Max Buy Now"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-4 my-5">
              <Input
                v-model="load.totalDistance"
                :multiple="false"
                :searchable="true"
                name="totalDistance"
                label="Total Distance (Miles)"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="load.trailerRequired"
                :options="trailerRequiredOptions"
                :multiple="false"
                :searchable="true"
                name="trailerRequired"
                type="text"
                label="Trailer Required"
                rules="required"
              />
            </div>
            <div class="col-4 my-5">
              <m-select
                v-model="load.equipment"
                :multiple="false"
                :searchable="true"
                :options="equipmentOptions"
                :addable="true"
                name="equipment"
                label="Equipment"
              />
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-4 my-5">
              <Input
                v-model="load.carrierName"
                name="carrierName"
                type="text"
                label="Carrier Name"
                rules="required"
              />
            </div>
          </div>
          <div class="row mt-1 mb-12">
            <div class="col-2 col-lg-1 ml-auto pt-14">
              <Button
                class="flex"
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.MD"
                :action="ActionTypeEnum.BUTTON"
                @click="$emit('save-stop', stop)"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </transition>
    </widget>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import Vue from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
export default Vue.extend({
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      toggle: false,
      shipperNameOptions: [
        { id: 1, text: 'Test 1' },
        { id: 2, text: 'Test 2' }
      ],
      loadOptions: [
        { id: 1, text: 'Test 1'},
        { id: 2, text: 'Test 2'}
      ],
      trailerRequiredOptions: [
        { id: 1, text: '53 Test' },
        { id: 2, text: '47 Test'}
      ],
      equipmentOptions: [
        { id: 1, text: '53\' Dryvan', selected: false },
        { id: 2, text: '53\' Reefer', selected: false },
        { id: 3, text: '53\' Flatbed', selected: false },
        { id: 4, text: '48\' Flatbed', selected: false },
        { id: 5, text: 'Step Deck', selected: false },
        { id: 6, text: 'Straight Truck', selected: false },
        { id: 7, text: 'Hotshot', selected: false },
        { id: 8, text: '20\' Container', selected: false },
        { id: 9, text: '40\' Container', selected: false }
      ],
      locationOptions: [
        {
          id: 1, text: 'Roanoke, TX'
        }
      ],
      countryOptions: [{
        id: 'USA', text: 'United States', selected: true, img: '/images/flags/united-states.svg'
      }],
      tzOptions: [{
        id: 'EST', text: 'EST', selected: true, img: '/images/flags/united-states.svg'
      }],
      statusOptions: [{
        id: 'Upcoming Load', text: 'Upcoming Load', selected: true, img: '/images/flags/united-states.svg'
      }],
      load: {
        loadId: '',
        shipperName: '',
        loadTrip: '',
        totalRevenue: '',
        maxBuy: '',
        maxBuyNow: '',
        totalDistance: '',
        trailerRequired: 0,
        carrierName: '',
        equipment: '',
        stops: [],
        saved: false
      }
    }
  },
  computed: {
    states () {
      console.log(this.$store.getters['common/states'])
      return this.$store.getters['common/states']
    },
    cities () {
      console.log(this.$store.getters['common/cities'])
      return this.$store.getters['common/cities']
    }
  },
  watch: {
    'state' (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.getCities(this.address.state)
        this.cityOptions = { ...this.cities }
      }
    }
  },
  methods: {
    ...mapActions({
      getStates: action => action('common/getStates'),
      getCities: (action, param) => action('common/getCities', param)
    })
  },
  mounted () {
    this.getStates()
  }
})
</script>
