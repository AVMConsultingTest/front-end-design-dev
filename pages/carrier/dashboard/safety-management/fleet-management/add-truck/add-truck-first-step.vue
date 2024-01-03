<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <Badge title="Step: 1/2" class="bg-purple-100 text-crocus-purple mb-2" :size="SizeTypeEnum.LG" />
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Truck
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <!-- <div class="col-6 mb-6">
          <m-select
            :multiple="false"
            :searchable="true"
            :model="request.main_driver_id"
            name="MainCaptain"
            type="text"
            label="Main Driver"
            :options="driverOptions"
            @select="handleSelectDriver"
          />
        </div> -->
        <!-- <div class="col-6 mb-6">
          <m-select
            :multiple="false"
            :searchable="true"
            :model="request.co_driver_id"
            name="CoDriver"
            type="text"
            label="Co-Driver"
            :options="driverOptions"
            @select="handleSelectCoDriver"
          />
        </div> -->
        <div class="col-6 mb-6">
          <Input
            v-model="request.status"
            name="status"
            type="text"
            label="Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.brand"
            name="TruckBrand"
            type="text"
            label="Truck Brand"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.model"
            name="TruckModel"
            type="text"
            label="Truck Model"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.color"
            name="TruckColor"
            type="text"
            label="Truck Color"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.model_year"
            name="TruckModelYear"
            type="text"
            label="Truck Model Year"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.plate"
            name="TruckPlate"
            label="Truck Plate"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.unit_number"
            name="unitNumber"
            type="text"
            label="Unit Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.asset_owner"
            name="assetOwner"
            type="text"
            label="Asset Owner"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.acquisition_type"
            name="acquisitionType"
            type="text"
            label="Acquisition Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.notes"
            name="notes"
            type="text"
            label="Notes"
            rules="required"
          />
        </div>

        <div>
          <div class="row mt-10 justify-between mx-0">
            <div class="col-3">
              <Button
                :type="ButtonTypeEnum.LINK"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.BUTTON"
                class="!justify-start"
                @click="$emit('close-drawer')"
              >
                Go Back
              </Button>
            </div>
            <div class="col-3 ml-auto">
              <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { Truck } from '~/models/truck/truck'
export default Vue.extend({
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as Truck,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Cameron Williamson', selected: true },
        { id: 2, text: 'Select 2', selected: false },
        { id: 2, text: 'Select 3', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    driverOptions () {
      const list = this.$store.getters['driver/allDrivers']
      console.log('list', list)
      if (list && list.length > 0) {
        return this.$store.getters['driver/allDrivers']
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions({
      fillRequest: (action, params) => action('truck/fillRequest', params)
    }),
    handleSubmit () {
      this.fillRequest(this.request)
      this.$router.push('/carrier/dashboard/safety-management/fleet-management/add-truck/add-truck-second-step')
    },
    handleSelectDriver (data: any) {
      this.request.main_driver_id = data.id
    },
    handleSelectCoDriver (data: any) {
      this.request.co_driver_id = data.id
    }
  }
})
</script>
