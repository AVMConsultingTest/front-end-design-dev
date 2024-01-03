<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start mt-28 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Add Locations
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.name"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            :addable="true"
            :bind-text="true"
            name="Locations"
            type="text"
            label="Locations"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.address_line1"
            name="addressline1"
            type="text"
            label="Address Line 1"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.address_line2"
            name="email"
            type="text"
            label="Address Line 2"
            rules="required"
          />
        </div>
        <!-- <div class="col-6 mb-6">
          <Input
            v-model="request.location_full_address"
            name="fullAddress"
            type="text"
            label="Full Address"
            rules="required"
          />
        </div> -->
        <StateSelects :city.sync="request.city" :state.sync="request.state" :api-fetched="request.state?.length > 0" />
        <!-- <div class="col-6 mb-6">
          <m-select
            v-model="request.country"
            :bind-text="true"
            :addable="true"
            name="country"
            label="Country"
            rules="required"
            :options="testCountry"
          />
        </div> -->
        <div class="col-6 mb-6">
          <Input
            v-model="request.zip_code"
            name="zipcode"
            type="text"
            label="Zip Code"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :bind-text="true"
            :addable="true"
            name="status"
            label="Status"
            rules="required"
            :options="statusOptions"
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
                Cancel
              </Button>
            </div>
            <div class="col-4 flex justify-end ml-auto">
              <Button
                class="max-w-max p-4"
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.SUBMIT"
              >
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
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { LocationsDetails } from '~/models/DISPATCH/locations/locationsDetails'
export default Vue.extend({
  name: 'AddLocationsPage',
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as LocationsDetails,
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
      { id: 1, text: 'Test', selected: false }
      ] as SelectOption[],
      testCity: [
      { id: 1, text: 'New York', selected: true },
        { id: 2, text: 'California', selected: false },
        { id: 2, text: 'Los Angeles', selected: false }
      ] as SelectOption[],
      testState: [
      { id: 1, text: 'Texas', selected: true },
        { id: 2, text: 'California', selected: false },
        { id: 2, text: 'Los Angeles', selected: false }
      ] as SelectOption[],
      testCountry: [
      { id: 1, text: 'USA', selected: true }
      ] as SelectOption[],
      statusOptions: [
      { id: 1, text: 'Active', selected: false },
      { id: 2, text: 'Inactive', selected: false },
      { id: 3, text: 'Not In Use', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  methods: {
    ...mapActions({
      addLocation: (action, param) => action('locations/addLocation', param)
    }),
    handleSubmit () {
      this.addLocation({ ...this.request, carrier_id: this.carrierId })
      this.$emit('close-drawer')
    }
  }
})
</script>
