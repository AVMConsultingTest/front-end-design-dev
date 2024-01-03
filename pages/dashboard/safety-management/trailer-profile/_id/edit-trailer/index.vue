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
            name="trailerBrand"
            type="text"
            label="Trailer Brand"
            hint="Trailer Brand Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.model"
            name="trailerModel"
            type="text"
            label="Trailer Model"
            hint="Trailer Model Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.color"
            name="trailerColor"
            type="text"
            label="Trailer Color"
            hint="Trailer Color Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.model_year"
            name="trailerModelYear"
            type="text"
            label="Trailer Model Year"
            hint="Trailer Model Year Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.plate"
            name="trailerPlate"
            type="text"
            label="Trailer Plate"
            hint="Trailer Plate Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.unit_number"
            name="trailerUnitNumber"
            type="text"
            label="Trailer Unit Number"
            hint="Trailer Unit Number Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.trailer_id"
            name="trailerID"
            type="text"
            label="Trailer ID"
            hint="Trailer ID Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.asset_owner"
            name="assetOwner"
            type="text"
            label="Asset Owner"
            hint="Asset Owner Hint"
            rules="required"
          />
        </div>
        <h5 class="font-semibold dark:text-white">
          Trailer Size
        </h5>
        <div class="col-6 mb-6">
          <Input
            v-model="request.length"
            name="trailerLength"
            type="text"
            label="Trailer Length"
            hint="Trailer Length Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.width"
            name="trailerWidth"
            type="text"
            label="Trailer Width"
            hint="Trailer Width Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.height"
            name="trailerHeight"
            type="text"
            label="Trailer Height"
            hint="Trailer Height Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.capacity"
            name="trailerCapacity"
            type="text"
            label="Trailer Capacity"
            hint="Trailer Capacity Hint"
            rules="required"
          />
        </div>
        <h5 class="font-semibold dark:text-white">
          Other Information
        </h5>
        <div class="col-6 mb-6">
          <Input
            v-model="request.vin_number"
            name="vinNumber"
            type="text"
            label="VIN Number"
            hint="VIN Number Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.registration_renewal_date"
            name="registrationRenewalDate"
            type="datetime-local"
            label="Registration Renewal Date"
            hint="Registration Renewal Date Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.annual_inspection_date"
            name="annualInspectionDate"
            type="datetime-local"
            label="Annual Inspection Date"
            hint="Annual Inspection Date Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.preventive_maintenance_date"
            name="preventativeMaintenanceDueDate"
            type="datetime-local"
            label="Preventative Maintenance Due Date"
            hint="Preventative Maintenance Due Date Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.in_service_date"
            name="inServiceDate"
            type="datetime-local"
            label="In Service Date"
            hint="In Service Date Hint"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.out_of_service_date"
            name="outOfServiceDate"
            type="datetime-local"
            label="Out of Service Date"
            hint="Out of Service Date Hint"
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
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
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
} from '~/components/ts/enums'
import { Trailer } from '~/models/trailer/trailer'
export default Vue.extend({
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as Trailer
    }
  },
  computed: {
    trailer ():Trailer {
      return (this.$store.getters['trailer/trailer'])
    }
  },
  created () {
    this.getTrailer(parseInt(this.$route.params.id, 10)).then(() => {
      this.request = { ...this.trailer }
    })
  },
  methods: {
    ...mapActions({
      getTrailer: (action, id) => action('trailer/getTrailer', id),
      updateTrailer: (action, param) => action('trailer/updateTrailer', param)
    }),
    handleSubmit () {
      this.updateTrailer(this.request).then(() => {
        this.$emit('close-drawer')
      })
    }
  }
})
</script>
