<template>
  <div class="h-full">
    <div class="pl-24 pr28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Asset Information
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.vendor_id"
            name="vendorID"
            label="Vendor ID"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="assetType"
            label="Asset Type"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            name="acquistionType"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            :addable="true"
            label="Acquisiton Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="acquistionDate"
            type="date"
            label="Acquisiton Date"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="contactID"
            label="Contact ID"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="down-payment"
            label="Down Payment"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="asset-amount"
            label="Asset Amount"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            name="payment-interval"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            :addable="true"
            label="Payment Interval"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="recurring-payment"
            label="Recurring Payment"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="number-of-payments"
            label="Number of Payments"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            name="payment-method"
            :multiple="false"
            :searchable="true"
            :options="methodOptions"
            :addable="true"
            label="Payment Method"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="payment-start-date"
            type="date"
            label="Payment Start Date"
          />
        </div>
        <div class="col-6 mb-6">
          <FileInput label="Document Upload" name="logo" />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="payoff-amount"
            label="Payoff Amount"
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
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'

interface Asset {
  vendor_id: number,
  asset_type: string,
  acquisiton_type: string,
  acquisiton_date: Date,
  contact_id: number
}

export default Vue.extend({
  name: 'AssetsFirstStep',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as Asset,
      testOptions: [
        { id: 1, text: 'Test', selected: true }
      ] as SelectOption[],
      methodOptions: [
      { id: 1, text: 'ACH', selected: true }
      ] as SelectOption[]
    }
  },
  methods: {
    handleSubmit (): void {
      this.$emit('close-drawer')
    }
  }
})
</script>
