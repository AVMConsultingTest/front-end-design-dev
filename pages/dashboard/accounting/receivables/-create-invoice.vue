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
            v-model="request.contract_id"
            name="contractId"
            type="text"
            label="Contract ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.trip_id"
            name="tripId"
            type="number"
            label="Trip ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.load_id"
            name="loadId"
            type="number"
            label="Load ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.invoice_id"
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
          <m-select
            v-model="request.delivery_status"
            :multiple="false"
            :searchable="true"
            :options="deliveryStatus"
            :addable="true"
            name="status"
            :bind-text="true"
            label="Delivery Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_start_date"
            name="startDate"
            type="datetime-local"
            label="Start Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_end_date"
            name="endDate"
            type="datetime-local"
            label="End Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_start_time"
            name="startTime"
            type="datetime-local"
            label="Start Time"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_end_time"
            name="endTime"
            type="datetime-local"
            label="End Time"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_origin"
            name="origin"
            type="text"
            label="Origin"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_destination"
            name="destination"
            type="text"
            label="Destination"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.miles"
            name="miles"
            type="number"
            label="Miles"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.gross_pay"
            name="grossPay"
            type="number"
            label="Gross Pay"
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
          <div class="col-4 flex justify-end ml-auto">
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
              class="p-4 !w-[180px]"
            >
              Create
            </Button>
          </div>
        </div>
      </form>
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
import { InvoicingDetails } from '~/models/accounting/invoicingDetails/invoicingDetails'
export default Vue.extend({
  name: 'CreateInvoice',
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as InvoicingDetails,
      // request: {
      //   contract_id: '',
      //   trip_id: '',
      //   load_id: '',
      //   invoice: '',
      //   status: '',
      //   invoice_date: '',
      //   start_date: '',
      //   end_date: '',
      //   start_time: '',
      //   end_time: '',
      //   origin: '',
      //   destination: '',
      //   miles: '',
      //   gross_pay: '',
      //   notes: ''
      // },
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      cityOptions: [],
      deliveryStatus: [
          { id: 1, text: 'Completed', selected: false },
          { id: 2, text: 'Not Completed', selected: false }
      ]
    }
  },
  // computed: {
  //   addInvoices (): InvoicingDetails {
  //     return (this.$store.getters['Accounting/invoicingDetails/invoiceRequest']) as InvoicingDetails
  //   }
  // },
  methods: {
    ...mapActions({
      addInvoice: (action, param) => action('accounting/invoicingDetails/addInvoice', param)
    }),
    handleSubmit () {
      const rest = {
        documents: {},
        invoice_date: moment(this.request.invoice_date).toISOString(),
        invoice_end_date: moment(this.request.invoice_end_date).toISOString(),
        invoice_end_time: moment(this.request.invoice_end_time).toISOString(),
        invoice_start_date: moment(this.request.invoice_start_date).toISOString(),
        invoice_start_time: moment(this.request.invoice_start_time).toISOString(),
        load_complete_date: moment(this.request.load_complete_date).toISOString(),
        broker_id: 1,
        broker_name: 'test',
        carrier_id: 1,
        driver_id: 1,
        driver_name: 'test'
      }
      this.addInvoice({ ...this.request, ...rest })
      this.$emit('close-drawer')
    }
  }

})
</script>
