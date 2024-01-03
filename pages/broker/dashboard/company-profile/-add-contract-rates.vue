<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Add New Contact Rate
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.id"
            name="contractLoadId"
            type="text"
            label="Contract Load ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.carrier_name"
            name="carrierName"
            type="text"
            label="Carrier Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.carrier_id"
            name="carrierId"
            type="number"
            label="Carrier ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.load_origin"
            name="origin"
            type="text"
            label="Origin"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.load_destination"
            name="destination"
            type="text"
            label="Destination"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.equipment_type"
            :multiple="false"
            :searchable="true"
            :options="equipmentOptions"
            :bind-text="true"
            :addable="true"
            name="equipment"
            type="text"
            label="Equipment"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.contract_frequency"
            name="frequency"
            type="number"
            label="Frequency"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contract_interval"
            name="interval"
            type="text"
            label="Interval"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.contract_rate"
            name="rate"
            type="number"
            label="Rate"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.contract_priority"
            name="priority"
            type="number"
            label="Priority"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contract_start_date"
            name="startDate"
            type="datetime-local"
            label="Start Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contract_exp_date"
            name="endDate"
            type="datetime-local"
            label="End Date"
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
                Cancel
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
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { ContractRatesDetails } from '~/models/Broker/contractRates/contractRatesDetails'
export default Vue.extend({
  name: 'CompanyProfileAddContract',
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as ContractRatesDetails,
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      equipmentOptions: [
        { id: 1, text: 'Monitor', selected: false }
      ] as SelectOption[]
    }
  },
  methods: {
    ...mapActions({
      addContract: (action, param) => action('Broker/contractRates/addContract', param)
    }),
    handleSubmit () {
      const rest = {
        ...this.request,
        broker_id: 3
      }
      this.addContract({ ...this.request, ...rest })
      this.$emit('close-drawer')
    }
  }

})
</script>
