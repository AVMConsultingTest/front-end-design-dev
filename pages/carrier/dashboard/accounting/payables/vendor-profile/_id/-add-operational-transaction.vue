<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Add Operational Transaction
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.transaction_id"
            name="transactionID"
            type="number"
            label="Transaction ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.invoice_id"
            name="Invoice ID"
            type="number"
            label="Invoice ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.payment_category"
            :options="paymentCategory"
            :bind-text="true"
            :addable="true"
            name="paymentCategory"
            type="text"
            label="Payment Category"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.vendor_id"
            name="vendorId"
            type="number"
            label="Vendor ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.payment_amount"
            name="amount"
            type="number"
            label="Amount"
            rules="required"
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
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.notes"
            name="notes"
            type="text"
            label="Notes"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.transaction_date"
            name="transactionDate"
            type="datetime-local"
            label="Transaction Date"
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
import { OperationalTransactionsDetails } from '~/models/accounting/operationalTransactions/operationalTransactionsDetails'
export default Vue.extend({
  name: 'AddOperationalTransaction',
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as OperationalTransactionsDetails,
      // request: {
      //   transaction_id: '',
      //   invoice_id: '',
      //   vendor_id: '',
      //   payment_category: '',
      //   payment_method: '',
      //   amount: '',
      //   transaction_date: '',
      //   document: ''
      // },
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      paymentCategory: [
        { id: 1, text: 'Transphere', selected: false },
        { id: 2, text: 'Card', selected: false }
      ] as SelectOption[],
      paymentMethod: [
        { id: 1, text: 'Transphere', selected: false },
        { id: 2, text: 'Card', selected: false }
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
      addOperational: (action, param) => action('accounting/operationalPayments/addOperational', param)
    }),
    handleSubmit () {
      this.addOperational({
        ...this.request,
        carrier_id: this.carrierId,
        vendor_id: 1,
        parent_case_tag: 'test',
        documents: 0
      })
      this.$emit('close-drawer')
    }
  }

})
</script>
