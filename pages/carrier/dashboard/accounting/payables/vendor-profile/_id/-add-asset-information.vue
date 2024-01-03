<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Add Asset Information
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.vendor_id"
            name="vendorId"
            type="text"
            label="Vendor ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.asset_type"
            :options="assetType"
            :bind-text="true"
            :addable="true"
            name="assetType"
            type="text"
            label="Asset Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.acquisition_type"
            :options="acquisitionType"
            :bind-text="true"
            :addable="true"
            name="acquisitionType"
            label="Acquisiton Type"
            rules="required"
            type="text"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.acquisition_date"
            name="acquisitonDate"
            type="datetime-local"
            label="Acquisiton Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contract_id"
            name="contractId"
            type="text"
            label="Contract ID"
            rules="required"
          />
        </div>
        <h6 class="font-semibold mb-6 mt-12 text-start">
          Payment Informaiton
        </h6>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.asset_amount"
            name="assetAmount"
            type="number"
            label="Asset Amount"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.down_payment"
            name="downPayment"
            type="number"
            label="Down Payment"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.recurring_payment"
            name="recurringPayment"
            type="number"
            label="Recurring Payment"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.payment_interval"
            :options="paymentInterval"
            :bind-text="true"
            :addable="true"
            name="paymentInterval"
            type="text"
            label="Payment Interval"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.payment_method"
            :options="paymentMethod"
            :bind-text="true"
            :addable="true"
            name="paymentMethod"
            type="text"
            label="Payment Method"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.number_of_payments"
            name="numberofPayments"
            type="number"
            label="Number of Payments"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.payoff_amount"
            name="Payoff Amount"
            type="number"
            label="Payoff Amount"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.payment_start_date"
            name="paymentStartDate"
            type="datetime-local"
            label="Payment Start Date"
          />
        </div>
        <div class="col-6 mb-6">
          <FileInput label="Document Upload" name="logo" />
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
import { AssetsDetails } from '~/models/accounting/assets/assetsDetails'
export default Vue.extend({
  name: 'AddVendorAsset',
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as AssetsDetails,
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      statusOptions: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Inactive', selected: false }
      ] as SelectOption[],
      paymentInterval: [
        { id: 1, text: 'Monthly', selected: false },
        { id: 2, text: 'Yearly', selected: false }
      ] as SelectOption[],
      paymentMethod: [
        { id: 1, text: 'Transphere', selected: false },
        { id: 2, text: 'Card', selected: false }
      ] as SelectOption[],
      assetType: [
        { id: 1, text: 'Groceries', selected: false },
        { id: 2, text: 'Clothing', selected: false },
        { id: 3, text: 'Snacks', selected: false }
      ] as SelectOption[],
      acquisitionType: [
        { id: 1, text: 'Refrigerated hauler', selected: false },
        { id: 2, text: 'Tanker hauler', selected: false },
        { id: 3, text: 'Flatbed hauler', selected: false }
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
      addAsset: (action, param) => action('accounting/assetsDetails/addAsset', param)
    }),
    handleSubmit () {
      this.addAsset({
        ...this.request,
        carrier_id: this.carrierId,
        vendor_id: 1,
        documents: {}
      })
      this.$emit('close-drawer')
    }
  }

})
</script>
