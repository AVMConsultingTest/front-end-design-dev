<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Check IN/Out        
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.check_text"
            name="checkInOut"
            type="text"
            label="Check In/Out"
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
            v-model="request.vin_number"
            name="vinNumber"
            type="text"
            label="VIN Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.dot_number"
            name="dotNumber"
            type="text"
            label="D.O.T Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.plate_number"
            name="plateNumber"
            type="text"
            label="Plate Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.ifta_number"
            name="iftaNumber"
            type="text"
            label="IFTA Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.ny_number"
            name="nyNumber"
            type="text"
            label="NY Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.binder"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="binderOptions"
            :addable="true"
            name="binder"
            label="Binder"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.ky_permit"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="kyPermitOptions"
            name="kyPermit"
            label="KY Permit Current"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.nv_permit"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="nvPermitOptions"
            name="nvPermit"
            label="NV Permit Current"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.nm_permit"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="nmPermitOptions"
            name="nmPermit"
            label="NM Permit Current"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.or_permit"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="orPermitOptions"
            name="orPermit"
            label="OR Permit Current"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.ct_permit"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="ctPermitOptions"
            name="ctPermit"
            label="CT Permit Current"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.registration_current"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="registrationCurrentOptions"
            name="registrationCurrent"
            label="Registration Current"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.valid_insurance"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="validInsuranceOptions"
            name="validInsurance"
            label="Valid Insurance"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.tablet_charger"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="tabletChargerOptions"
            name="tabletCharger"
            label="Tablet/Charger"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.fuel_card"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="fuelCardOptions"
            name="fuelCard"
            label="Fuel Card"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.mileage"
            name="mileage"
            type="text"
            label="Mileage"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.damage"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="damageOptions"
            name="damage"
            label="Damage"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.damage_type"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="damageTypeOptions"
            :addable="true"
            name="damageType"
            label="Damage Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.main_caption"
            name="mainCaptian"
            type="text"
            label="Main Captian"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.co_driver"
            name="coDriver"
            type="text"
            label="Co-Driver"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <FileInput label="Document Upload" name="logo" />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.fleet_rep"
            name="fleetRep"
            type="text"
            label="Fleet Rep"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.check_options"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="checkInOutOptions"
            name="checkInOut"
            label="Check IN/Out"
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
import { InspectionsDetails } from '@/models/inspections/inspectionsDetails'
export default Vue.extend({
  name: 'AddCheckList',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      binderOptions: [
        { id: 1, text: 'Provided', selected: false },
      ] as SelectOption[],
      kyPermitOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      nvPermitOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      nmPermitOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      orPermitOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      ctPermitOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      registrationCurrentOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      validInsuranceOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      tabletChargerOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      fuelCardOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      damageOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      damageTypeOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      checkInOutOptions: [
        { id: 1, text: 'In', selected: false },
        { id: 2, text: 'Out', selected: false }
      ] as SelectOption[],
      request: {
        check_text: '',
        unit_number: '',
        vin_number: '',
        dot_number: '',
        plate_number: '',
        ifta_number: '',
        ny_number: '',
        binder: '',
        ky_permit: '',
        nv_permit: '',
        nm_permit: '',
        or_permit: '',
        ct_permit: '',
        registration_current: '',
        valid_insurance: '',
        tablet_charger: '',
        fuel_card: '',
        mileage: '',
        damage: '',
        damage_type: '',
        main_caption: '',
        co_driver: '',
        fleet_rep: '',
        check_options: ''
      }
    }
  },
  computed: {
    getInspectionRequest () {
      return this.getInspections
    },
    inspections (): InspectionsDetails[] {
      return (this.$store.getters['inspections/inspections'])
    },
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  methods: {
    ...mapActions({
      addInspection: (action, params: InspectionsDetails) => action('inspections/addInspection', params)
    }),
    handleSubmit () {
      const rest = {
        carrier_id: this.carrierId,
        vehicle_id: 6
      }
      this.addInspection({ ...this.request, ...rest }).then(() => {
        this.$emit('close-drawer')
      })
    }
  }
})
</script>
