<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Services
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.driver_id"
            name="driverId"
            type="text"
            label="Driver ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.vehicle_id"
            name="vehicleId"
            type="text"
            label="Vehicle ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.vendor_id"
            name="vendorId"
            type="text"
            label="Vendor ID"
            rules="required"
          />
        </div>
        <!-- <div class="col-6 mb-6">
          <m-select
            v-model="request.asset_id"
            :addable="true"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            name="assetId"
            label="Asset ID"
          />
        </div> -->
        <div class="col-6 mb-6">
          <Input
            v-model="request.vehicle_type"
            name="vehicleType"
            type="text"
            label="Vehicle Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.type"
            name="Type"
            type="text"
            label="Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.repair_start_date"
            name="repairStartDate"
            type="datetime-local"
            label="Repair Start Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.repair_completion_date"
            name="repairCompletionDate"
            type="datetime-local"
            label="Repair Completion Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.repair_description"
            name="repairDescription"
            type="text"
            label="Repair Description"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.repair_facility"
            name="repairFacility"
            type="text"
            label="Repair Facility"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.dot_inspection_number"
            name="inspectionNumber"
            type="text"
            label="Inspection Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.notes"
            name="Notes"
            type="text"
            label="Notes"
            rules="required"
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
              Go Back
            </Button>
          </div>
          <div class="col-3 ml-auto">
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
            >
              Save
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
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { ServicesDetails } from '@/models/services/servicesDetails'
export default Vue.extend({
  data () {
    return {
      deleteThisIsNotExistAtTheDesign: {} as ServicesDetails,
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as ServicesDetails,
      testOptions: [
        { id: 1, text: 'BRA', selected: true },
        { id: 2, text: 'Other Option', selected: false }
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
      addService: (action, params: ServicesDetails) => action('services/addService', params)
    }),
    handleSubmit () {
      // TODO: make api request
      const rest = {
        carrier_id: this.carrierId
      }
      this.addService({ ...this.request, ...rest }).then(() => {
        this.$emit('close-drawer')
      })
    }
  }
})
</script>
