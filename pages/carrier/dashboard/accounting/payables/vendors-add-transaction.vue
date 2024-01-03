<template>
  <div class="h-full">
    <div class="pl-24 pr28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Transaction
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.payment_category"
            name="payment-category"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            :addable="true"
            label="Payment Category"
          />
        </div>
        <div class="col-6 mb-6">
          <Input v-model="request.asset_id" name="asset-id" label="Asset ID" />
        </div>

        <div class="col-6 mb-6">
          <Input v-model="request.vendor_id" name="vendor-id" label="Vendor ID" />
        </div>
        <div class="col-6 mb-6">
          <Input v-model="request.contact_id" name="contract-id" label="Contract ID" />
        </div>
        <div class="col-6 mb-6">
          <Input v-model="request.amount" name="amount" label="Amount" />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.payment_method"
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
            v-model="request.scheduled_date"
            name="transaction-date"
            type="date"
            label="Transaction Date"
          />
        </div>

        <div class="row mt-28 justify-between mx-0">
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
      </Form>
    </div>
    <Modal ref="modal" size="sm" position="center">
      <div slot="body" class="row flex items-center justify-center py-16">
        <div class="col-12 flex items-center justify-center">
          <div class="bg-green-400/40 rounded-full w-40 h-40 relative">
            <svg
              width="160"
              height="160"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="rgb(41, 45, 50)"
                d="M451.392 664.751c-8.533 0-16.64-3.413-22.613-9.387l-120.749-120.747c-12.373-12.373-12.373-32.853 0-45.227s32.853-12.373 45.227 0l98.135 98.133 219.307-219.307c12.373-12.373 32.853-12.373 45.227 0s12.373 32.853 0 45.227l-241.92 241.92c-5.973 5.973-14.080 9.387-22.613 9.387z"
                stroke="#BAF1DA"
              />
            </svg>
          </div>
        </div>
        <div class="col-8 items-center justify-center my-14">
          <h3 class="font-semibold text-center mb-2">
            Congratulations !
          </h3>
          <p class="text-b-4 font-medium text-gray-400 text-center">
            Odio eu purus imperdiet feugiat. Faucibus semper volutpat sapien, morbi neque pulvinar velit.
            Elementum sollicitudin sed sit pellentesque consectetur in neque nisl convallis.
          </p>
        </div>
        <div class="col-8">
          <Button
            :type="ButtonTypeEnum.GREEN"
            :size="SizeTypeEnum.LG"
            @click="() => { $refs.modal.hideModal() }"
          >
            Done
          </Button>
        </div>
      </div>
    </Modal>
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
  name: 'AddTransaction',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      testOptions: [
        { id: 1, text: 'Truck' },
        { id: 2, text: 'Trailer' },
        { id: 2, text: 'Office Building' }
      ] as SelectOption[],
      paymentOptions: [
        { id: 1, text: 'ACH' },
        { id: 2, text: 'Wire' }
      ] as SelectOption[],
      request: {
        payment_category: '',
        asset_id: '',
        contact_id: '',
        vendor_id: '',
        scheduled_date: '',
        amount: 0,
        payment_method: '',
        notes: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      // this.$refs.modal.showModal()
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    }
  }
})
</script>
