<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Accident Report
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_id"
            :multiple="false"
            :searchable="true"
            :options="driverOptions"
            type="text"
            name="driverId"
            label="Driver"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.truck_id"
            :multiple="false"
            :searchable="true"
            name="Truck"
            type="text"
            label="Truck"
            rules="required"
            :options="truckOptions"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.report_date"
            type="datetime-local"
            name="reportDate"
            label="Report Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.report_number"
            type="text"
            name="reportNumber"
            label="Report Number"
            rules="required"
          />
        </div>
        <StateSelects :state.sync="request.report_state" :show-only-states="true" />

        <div class="col-6 mb-6">
          <m-select
            v-model="request.fatal"
            :options="fatalOptions"
            :bind-text="true"
            name="Fatal"
            type="text"
            label="Fatal"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.injury"
            :options="injuryOptions"
            :bind-text="true"
            :addable="true"
            name="injury"
            type="text"
            label="Injury"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.tow"
            :options="towedOptions"
            :bind-text="true"
            :addable="true"
            name="towed"
            type="text"
            label="Towed"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.haz_mat"
            :options="hazMatOptions"
            :bind-text="true"
            :addable="true"
            name="hazMat"
            type="text"
            label="HazMat"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.notes"
            type="text"
            name="notes"
            label="Notes"
          />
        </div>
        <div class="row mt-10 justify-between mx-0">
          <div class="col-3">
            <Button
              :type="ButtonTypeEnum.LINK"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              class="!justify-start"
              @click="$emit('close-drawer')"
            >
              Cancel
            </Button>
          </div>
          <div class="col-3 ml-auto">
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
            >
              Continue
            </Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'

import { Accidents } from '~/models/accidents/accidents'
// import { Driver } from '~/models/driver'
export default Vue.extend({
  name: 'AddAccidentsTest',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as Accidents,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      status: [
        { id: 1, text: 'open', selected: false },
        { id: 2, text: 'close', selected: false }
      ] as SelectOption[],
      fatalOptions: [
        { id: 2, text: 'No', selected: false },
        { id: 1, text: 'Yes', selected: false }
      ]as SelectOption[],
      injuryOptions: [
        { id: 2, text: 'No', selected: false },
        { id: 1, text: 'Yes', selected: false }
      ]as SelectOption[],
      towedOptions: [
        { id: 2, text: 'No', selected: false },
        { id: 1, text: 'Yes', selected: false }
      ]as SelectOption[],
      hazMatOptions: [
        { id: 2, text: 'No', selected: false },
        { id: 1, text: 'Yes', selected: false }
      ]as SelectOption[],
      typeOptions: [
        { id: 1, text: 'Company Driver', selected: false },
        { id: 2, text: 'Owner Operator', selected: false },
        { id: 3, text: 'Lease Driver', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    addAccidents (): Accidents {
      return (this.$store.getters['accidents/accidentRequest']) as Accidents
    },
    // carrierDrivers (): SelectOption[] {
    //   const driverOptions: SelectOption[] = []
    //   this.$store.getters['driver/carrierDrivers'].forEach((driver: Driver) => {
    //     driverOptions.push({
    //       id: driver.id,
    //       text: `${driver.driver_first_name} ${driver.driver_last_name}`,
    //       selected: false
    //     } as SelectOption)
    //   })
    //   return driverOptions
    // },
    carrierId (): number {
      return this.$store.state.carrierId
    },
    truckOptions () {
      const list = this.$store.getters['truck/allTrucks']
      if (list && list.length > 0) {
        return list.map((truck: { id: number, unit_number: string }) => {
          return {
            id: truck.id,
            text: truck.unit_number
          }
        })
      } else {
        return []
      }
    },
    driverOptions () {
      const list = this.$store.getters['driver/allDrivers']
      if (list && list.length > 0) {
        return list.map((driver: { id: number, first_name: string, last_name: string }) => {
          return {
            id: driver.id,
            text: `${driver.first_name} ${driver.last_name}`
          }
        })
      } else {
        return []
      }
    }
  },
  created () {
    this.getAllTrucks()
    this.getAllDrivers()
    // this.getDriversByCarrierId({ page_number: 1 })
  },
  methods: {
    ...mapActions({
      addAccident: (action, param) => action('accidents/addAccidents', param),
      getAllTrucks: action => action('truck/getAllTrucks'),
      getAllDrivers: action => action('driver/getAllDrivers')
      // getDriversByCarrierId: (action, param) => action('driver/getDriversByCarrierId', param)
    }),
    handleSubmit () {
      // const name = this.carrierDrivers.find((driver: SelectOption) => driver.id === this.request.driver_id)
      this.addAccident({ ...this.request })
      this.$emit('close-drawer')
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
