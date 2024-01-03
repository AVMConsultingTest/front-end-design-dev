<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start mt-10 mb-10 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Add Driver
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.carrier_id"
            name="DriverID"
            type="number"
            label="ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_first_name"
            name="DriverName"
            type="text"
            label="Driver First Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_last_name"
            name="DriverLastName"
            type="text"
            label="Driver Last Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.driver_score"
            name="score"
            type="number"
            label="Score"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_status"
            :options="statusOptions"
            :addable="true"
            type="text"
            :bind-text="true"
            name="status"
            label="Status"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_ssn"
            name="driverSsn"
            type="text"
            label="SSN"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_dob"
            name="dob"
            type="date"
            label="Date of Birth"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_live_location"
            name="driverLiveLocation"
            type="text"
            label="Live Location"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_joined_data"
            name="driverJoinedData"
            type="text"
            label="Joined Data"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_type"
            :options="typeOptions"
            :bind-text="true"
            :addable="true"
            name="type"
            type="text"
            label="Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_business_email"
            name="businessEmail"
            type="text"
            label="Business E-mail"
          />
        </div>
        <div class="col-6 mb-6">
          <PhoneInput
            v-model="request.driver_contact_phone_number"
            label="Contact Phone Number"
            rules="required|min:14|max:14"
            :thin="true"
            maxlength="14"
          />
        </div>
        <h6 class="font-semibold mb-6 mt-1 text-b-3 text-start">
          Driver Address Details
        </h6>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_email_address"
            name="emailAddress"
            type="text"
            label="Driver E-mail Address"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_address"
            name="address"
            type="text"
            label="Driver Address"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_start_date"
            name="startDate"
            type="date"
            label="Start Date"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_end_date"
            name="endDate"
            type="date"
            label="End Date"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoice_number"
            name="invoiceNumber"
            type="text"
            label="Invoice Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.driver_net_pay"
            name="driverNetPay"
            type="number"
            label="Driver Net Pay"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_account_number"
            name="driverAccountNumber"
            type="text"
            label="Driver Account Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_routing_number"
            name="driverRoutingNumber"
            type="text"
            label="Driver Routing Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.payment_type"
            name="driverPaymentType"
            type="text"
            label="Payment Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.payment_rates"
            name="driverPaymentRates"
            type="number"
            label="Payment Rates"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.payment_base"
            name="driverPaymentBase"
            type="number"
            label="Payment Base"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.mileage_rate"
            name="driverMileageRate"
            type="number"
            label="Mileage Rate"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.truck_id"
            name="driverTruckId"
            type="number"
            label="Truck ID"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.trailer_id"
            name="driverTrailerId"
            type="number"
            label="Trailer ID"
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
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '@/components/ts/interfaces'
import PhoneInput from '~/components/PhoneInput.vue'
import { DriversDetails } from '~/models/accounting/drivers/driversDetail'

export default Vue.extend({
  name: 'PayrollAddDriver',
  components: { PhoneInput },
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as DriversDetails,
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      cityOptions: [
        { id: 1, text: 'New York', selected: false },
        { id: 2, text: 'California', selected: false },
        { id: 3, text: 'Texas', selected: false }
      ],
      typeOptions: [
        { id: 1, text: 'Company Driver', selected: false },
        { id: 2, text: 'Lease Driver', selected: false }
      ] as SelectOption[],
      statusOptions: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Vacation', selected: false }
      ] as SelectOption[],
      invoiceNumber: '',
      driverNetPay: '',
      invoicePeriod: '',
      driver_account_number: '',
      driver_routing_number: '',
      payment_type: '',
      payment_rates: '',
      tax_form: '',
      recurring_deductions: '',
      trailer_id: '',
      driver_address_line_1: '',
      driver_address_line_2: '',
      driver_city: '',
      driver_state: '',
      employee_id: '',
      employee_type: '',
      zip: '',
      truck_id: '',
      notes: ''
    }
  },
  computed: {
    states () {
      console.log(this.$store.getters['common/states'])
      return this.$store.getters['common/states']
    },
    addDrivers (): DriversDetails {
      return (this.$store.getters['accounting/drivers/driverRequest']) as DriversDetails
    }
  },
  methods: {
    handleSubmit () {
      this.setDriver({
        ...this.request,
        driver_avatar: 'test'
      } as DriversDetails)
      this.$emit('close-drawer')
    },
    ...mapActions({
      setDriver: (action, param) => action('accounting/drivers/addDriver', param)
    })
  }

})
</script>
