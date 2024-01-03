<template>
  <div class="h-full">
    <div class="pl-24 pr28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Asset Transaction
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            name="transaction-id"
            label="Transaction ID"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="asset-id"
            label="Asset ID"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="vendor-id"
            label="Vendor ID"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="contract-id"
            label="Contract ID"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            name="payment-category"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            :addable="true"
            label="Payment Category"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            name="payment-method"
            :multiple="false"
            :searchable="true"
            :options="paymentOptions"
            :addable="true"
            label="Payment Method"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="amount"
            label="Amount"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            name="transaction-date"
            type="date"
            label="Transaction Date"
          />
        </div>
        <div class="col-6 mb-6">
          <FileInput label="Document Upload" name="logo" />
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
              Cancel
            </Button>
          </div>
          <div class="col-3 ml-auto">
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              @click="$emit('close-drawer')"
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
export default Vue.extend({
  name: 'TransactionsAssetStep',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      testOptions: [
        { id: 1, text: 'Truck', selected: true }
      ] as SelectOption[],
      paymentOptions: [
        { id: 1, text: 'Test', selected: true }
      ] as SelectOption[]
    }
  },
  methods: {
    handleSubmit () {
      this.$router.push('')
    }
  }
})
</script>
