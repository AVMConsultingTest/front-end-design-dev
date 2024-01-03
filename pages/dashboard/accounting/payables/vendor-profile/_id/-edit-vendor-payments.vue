<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Edit Vendor Payments
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
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
            v-model.number="request.asset_id"
            name="assetID"
            type="number"
            label="Asset ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contract_id"
            name="contractID"
            type="text"
            label="Contract ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.scheduled_date"
            name="scheduledDate"
            type="datetime-local"
            label="Scheduled Date"
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
import { VendorPaymentsDetails } from '~/models/accounting/vendorPayments/vendorPaymentsDetails'
export default Vue.extend({
  name: 'EditVendorPayments',
  layout: 'Dashboard',
  transition: 'page-left',
  props: {
    editId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as VendorPaymentsDetails,
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      paymentMethod: [
        { id: 1, text: 'Transphere', selected: false },
        { id: 2, text: 'Card', selected: false }
      ] as SelectOption[],
      paymentCategory: [
        { id: 1, text: 'Transphere', selected: false },
        { id: 2, text: 'Card', selected: false }
      ] as SelectOption[]

    }
  },
  computed: {
    vendorPayment (): VendorPaymentsDetails {
      return (this.$store.getters['accounting/vendorPayments/vendorPayment'])
    },
    carrierVendorPayment (): SelectOption[] {
      const vendorPaymentOptions: SelectOption[] = []
      this.$store.getters['accounting/vendorPayments/vendorPayment'].forEach((vendorPayment: VendorPaymentsDetails) => {
        vendorPaymentOptions.push({
          id: vendorPayment.id,
          text: `${vendorPayment.asset_id} ${vendorPayment.payment_category}`,
          selected: false
        } as SelectOption)
      })
      return vendorPaymentOptions
    }
  },
  created () {
    this.getVendorPaymentByCarrierId({ page_number: 1, id: 1 }).finally(() => {
      this.getVendorPayment(this.editId).then(() => {
        this.request = { ...this.vendorPayment }
      })
    })
  },
  methods: {
    ...mapActions({
      getVendorPayment: (action, id) => action('accounting/vendorPayments/getVendorPayment', id),
      updateVendorPayment: (action, param) => action('accounting/vendorPayments/updateVendorPayment', param),
      getVendorPaymentByCarrierId: (action, param) => action('accounting/vendorPayments/getVendorPaymentByCarrierId', param)
    }),
    handleSubmit () {
      this.updateVendorPayment({
        ...this.request
      } as VendorPaymentsDetails).then(() => {
        this.getVendorPaymentByCarrierId({ page_number: 1 }).then(() => {
          this.$emit('close-drawer')
        })
      })
    }
  }
})
</script>
