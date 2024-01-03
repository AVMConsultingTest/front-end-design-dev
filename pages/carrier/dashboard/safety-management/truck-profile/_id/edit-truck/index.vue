<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
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
        <h6 class="font-semibold mb-1 mt-4 text-start">
          Other Information
        </h6>
        <div class="col-6 mb-6">
          <Input
            v-model="request.vin_number"
            name="vinNumber"
            type="text"
            label="VIN Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.registration_renewal_date"
            name="registrationRewenal"
            type="datetime-local"
            label="Registration Rewenal Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.annual_inspection_date"
            name="annualInspection"
            type="datetime-local"
            label="Annual Inspection Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.preventive_maintenance_date"
            name="preventativeMaintenance"
            type="datetime-local"
            label="Preventative Maintenance Due Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.in_service_date"
            name="inserviceDate"
            type="datetime-local"
            label="In Service Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.out_of_service_date"
            name="outServiceDate"
            type="datetime-local"
            label="Out of Service Date"
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
                Save
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
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { Truck } from '~/models/truck/truck'
import { Driver } from '~/models/driver'
export default Vue.extend({
  name: 'EditTruck',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as Truck,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptionsDriver: [
        { id: 1, text: 'Cameron Williamson', selected: true },
        { id: 2, text: 'Name 2', selected: false },
        { id: 3, text: 'Name 3', selected: true },
        { id: 4, text: 'Name 4', selected: true },
        { id: 5, text: 'Name 5', selected: true },
        { id: 6, text: 'Name 6', selected: true },
        { id: 7, text: 'Name 7', selected: true },
        { id: 8, text: 'Name 8', selected: true },
        { id: 9, text: 'Name 9', selected: true }
      ] as SelectOption[],
      testOptionsCoDriver: [
        { id: 1, text: 'Jenny Wilson', selected: true },
        { id: 2, text: 'Name 2', selected: false },
        { id: 3, text: 'Name 3', selected: true },
        { id: 4, text: 'Name 4', selected: true },
        { id: 5, text: 'Name 5', selected: true },
        { id: 6, text: 'Name 6', selected: true },
        { id: 7, text: 'Name 7', selected: true },
        { id: 8, text: 'Name 8', selected: true },
        { id: 9, text: 'Name 9', selected: true }
      ] as SelectOption[]
    }
  },
  computed: {
    truck ():Truck {
      console.log('set Truck', this.$store.getters['truck/truck'])
      return (this.$store.getters['truck/truck'])
    },
    carrierDrivers (): SelectOption[] {
      const driverOptions: SelectOption[] = []
      this.$store.getters['driver/carrierDrivers'].forEach((driver: Driver) => {
        // Eğer driver.id varsa veya undefined değilse, driverOptions listesine eklenir
        if (driver.id) {
          driverOptions.push({ id: driver.id, text: `${driver.first_name} ${driver.last_name}`, selected: false })
        }
      })
      return driverOptions
    }
  },
  created () {
    // this.getDriversByCarrierId({ page_number: 1, id: 1 }).finally(() => {
    this.getTruck(parseInt(this.$route.params.id, 10)).then(() => {
      this.request = { ...this.truck }
    })
    // })
  },
  methods: {
    ...mapActions({
      getTruck: (action, id) => action('truck/getTruck', id),
      updateTruck: (action, param) => action('truck/updateTruck', param),
      getDriversByCarrierId: (action, param) => action('driver/getDriversByCarrierId', param)
    }),
    handleSubmit () {
      if (this.request.primary_driver_id === null) {
        delete this.request.primary_driver_id
      }
      if (this.request.secondary_driver_id === null) {
        delete this.request.secondary_driver_id
      }
      this.updateTruck(this.request).then(() => {
        this.$emit('close-drawer')
      })
      // this.$router.push('/dashboard/safety-management/fleet-management/edit-truck/truck-complete')
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
