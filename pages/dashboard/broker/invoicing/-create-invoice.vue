<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Create Invoice
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.broker_name"
            name="brokerName"
            type="text"
            label="Broker Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_title"
            name="invoiceTitle"
            type="text"
            label="Invoice Title"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.customer_name"
            name="customerName"
            type="text"
            label="Customer Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.customer_address"
            name="customerAddress"
            type="text"
            label="Customer Address"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.bill_to_name"
            name="billToName"
            type="text"
            label="Bill to Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.bill_to_address"
            name="billToAddress"
            type="text"
            label="Bill to Address"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.gross_pay"
            name="invoice"
            type="number"
            label="Invoice #"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_date"
            name="invoiceDate"
            type="datetime-local"
            label="Invoice Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.credit_terms"
            name="creditTerms"
            type="text"
            label="Credit Terms"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.broker_id"
            name="brokerLoadId"
            type="text"
            label="Broker Load ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.shipment_date"
            name="shipmentDate"
            type="datetime-local"
            label="Shipment Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.pickup_location"
            name="pickupLocation"
            type="text"
            label="Pick up Location"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.delivery_location"
            name="deliveryLocation"
            type="text"
            label="Delivery Location"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.reference_numbers"
            name="referenceNumber"
            type="text"
            label="Reference Numbers"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.line_items"
            name="lineItems"
            type="text"
            label="Line Items"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.load_weight"
            name="weight"
            type="number"
            label="Weight"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.distance"
            name="distance"
            type="number"
            label="Distance (Miles)"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.total_amount_due"
            name="totalAmountDue"
            type="number"
            label="Total amount due"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.remit_to_address"
            name="remitToAddress"
            type="text"
            label="Remit to Address"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.comments"
            name="comments"
            type="text"
            label="Comments"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.notes"
            name="notes"
            type="text"
            label="Notes"
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
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.SUBMIT"
              >
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
import moment from 'moment'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import { InvoicingDetails } from '~/models/Broker/invoicingDetails/invoicingDetails'
export default Vue.extend({
  name: 'BrokerCreateInvoice',
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as InvoicingDetails,
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      statusOptions: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Inactive', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    brokerId (): number {
      return this.$store.state.brokerId
    }
  },
  methods: {
    ...mapActions({
      addInvoice: (action, param) => action('Broker/invoicingDetails/addInvoice', param)
    }),
    handleSubmit () {
      this.addInvoice({
        ...this.request,
        broker_id: this.brokerId,
        notes: {},
        carrier_id: 1,
        carrier_name: 'test',
        carrier_payment_status: 'test',
        customer_id: 1,
        customer_load_id: 'test',
        customer_payment_status: 'test',
        delivery_date: moment(this.delivery_date).toISOString(),
        documents: {},
        driver_id: 'test',
        driver_name: 'test',
        gross_pay: 1,
        invoice_status: 'test',
        load_id: 1,
        revenue: 1
      })
      this.$emit('close-drawer')
    }
  }

})
</script>
