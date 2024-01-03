<template>
  <div class="h-full">
    <div class="pl-24 pr28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-start">
          Add Factoring
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.shipper_name"
            name="shipperCustomerName"
            type="text"
            label="Shipper/Customer Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.reference_number"
            name="referenceNumber"
            type="text"
            label="Reference Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.invoice_number"
            name="invoiceNumber"
            type="text"
            label="Invoice Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_date"
            name="invoiceDate"
            type="datetime-local"
            label="Invoice Date"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.invoice_amount"
            name="invoiceAmount"
            type="number"
            label="Invoice Amount"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.description"
            name="notes"
            type="text"
            label="Notes"
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
          <div class="col-4 ml-auto flex justify-end">
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
              class="!w-40 p-4"
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
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { FactoringDetails } from '~/models/accounting/factoringDetails'
export default Vue.extend({
  name: 'AddFactoring',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as FactoringDetails
    }
  },
  computed: {
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  methods: {
    handleSubmit () {
      this.addFactoring({
        ...this.request,
        carrier_id: this.carrierId,
        invoice_amount: parseInt(this.request.invoice_amount),
        factoring_status: 'Open'
      })
      this.$emit('close-drawer')
    },
    ...mapActions({
      addFactoring: (action, param) => action('accounting/factoring/addFactoring', param)
    })
  }
})
</script>
