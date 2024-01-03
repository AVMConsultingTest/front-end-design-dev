<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <Badge title="Step: 2/2" class="bg-purple-100 text-crocus-purple mb-2" :size="SizeTypeEnum.LG" />
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Trailer
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
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
            type="date"
            label="Registration Rewenal Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.annual_inspection_date"
            name="annualInspection"
            type="date"
            label="Annual Inspection Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.preventive_maintenance_date"
            name="preventativeMaintenance"
            type="date"
            label="Preventative Maintenance Due Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.in_service_date"
            name="inserviceDate"
            type="date"
            label="In Service Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.out_of_service_date"
            name="outServiceDate"
            type="date"
            label="Out of Service Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.equipment_type"
            name="equipmentType"
            type="text"
            label="Equipment Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.equipment_weight"
            name="equipmentWeight"
            type="number"
            label="Equipment Weight"
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
              @click="$router.back()"
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
import { Trailer } from '@/models/trailer/trailer'
export default Vue.extend({
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as Trailer,
      registrationRewenal: '',
      annualInspection: '',
      preventativeMaintenance: '',
      inserviceDate: '',
      outServiceDate: ''
    }
  },
  computed: {
    storeRequest (): Trailer {
      return { ...this.$store.getters['trailer/trailerRequest'] }
    },
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  methods: {
    ...mapActions({
      addTrailer: (action, params: Trailer) => action('trailer/addTrailer', params)
    }),
    handleSubmit (): void {
      console.log('addfiles handlesubmit worked')

      const payload: any = {
        // carrier_id: this.carrierId,
        truck_id: this.storeRequest.truck_id,
        status: this.storeRequest.status,
        brand: this.storeRequest.brand,
        model: this.storeRequest.model,
        color: this.storeRequest.color,
        model_year: this.storeRequest.model_year,
        plate: this.storeRequest.plate,
        unit_number: this.storeRequest.unit_number,
        asset_owner: this.storeRequest.asset_owner,
        ownership_type: this.storeRequest.ownership_type,
        length: this.storeRequest.length,
        width: this.storeRequest.width,
        height: this.storeRequest.height,
        capacity: this.storeRequest.capacity,
        vin_number: this.request.vin_number,
        registration_renewal_date: this.request.registration_renewal_date,
        annual_inspection_date: this.request.annual_inspection_date,
        preventive_maintenance_date: this.request.preventive_maintenance_date,
        in_service_date: this.request.in_service_date,
        out_of_service_date: this.request.out_of_service_date,
        notes: this.storeRequest.notes,
        equipment_type: this.request.equipment_type,
        equipment_weight: this.request.equipment_weight
      }
      this.addTrailer(payload)
      this.$emit('close-drawer')
    }
  }
})
</script>
