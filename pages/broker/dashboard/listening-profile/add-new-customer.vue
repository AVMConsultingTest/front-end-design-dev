<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-cent">
          Add Customer
        </h3>
        <span class="text-b-3 font-semibold text-gray-800 mt-10">
          General Information
        </span>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.customer_name"
            name="customerName"
            type="text"
            label="Customer Name"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.customer_dba_name"
            name="dbaName"
            type="text"
            label="DBA Name"
            required="true"
          />
        </div>
        <div class="col-12 mb-6">
          <Input
            v-model="request.customer_address"
            name="address"
            type="text"
            label="Customer Address"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.customer_business_email"
            name="email"
            type="text"
            label="Customer E-mail"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.customer_phone_number"
            name="phoneNumber"
            label="Customer Phone Number"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.sales_representative"
            name="salesRepresentative"
            type="text"
            label="Sales Representative"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.account_manager"
            name="accountManager"
            type="text"
            label="Account Manager"
            required="true"
          />
        </div>
        <span class="text-b-3 font-semibold text-gray-800 mt-6 mb-6">
          Bill Information
        </span>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.bill_method"
            :options="methodOptions"
            :addable="true"
            name="method"
            type="text"
            label="Invoicing Method"
            :bind-text="true"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.bill_frequency"
            :options="frequencyOptions"
            :addable="true"
            name="frequency"
            type="text"
            label="Invoice Frequency"
            :bind-text="true"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.bill_type"
            :options="transmission"
            :addable="true"
            name="transmission"
            type="text"
            label="Transmission Type"
            :bind-text="true"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.pod_required"
            :options="podRequiredType"
            name="podRequired"
            type="text"
            label="POD Required"
            :bind-text="true"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.credit_limit"
            name="creditLimit"
            type="text"
            label="Credit Limit"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.payment_term"
            :options="paymentTermType"
            :addable="true"
            name="paymentTerm"
            type="text"
            label="Payment Terms"
            :bind-text="true"
            required="true"
          />
        </div>
        <span class="text-b-3 font-semibold text-gray-800 mt-6 mb-6">
          Contact Information
        </span>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact_name"
            name="contactName"
            type="text"
            label="Name"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact_email"
            name="e-mail"
            type="text"
            label="E-mail Address"
            required="true"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.contact_phone_number"
            name="contactPhoneNumber"
            label="Phone Number"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.contact_role"
            :options="roleType"
            :addable="true"
            name="role"
            type="text"
            label="Role"
            :bind-text="true"
            required="true"
          />
        </div>
        <div>
          <button class="text-dark-blue text-b-3 font-semibold" type="button" @click="toggleInputs">
            <span v-if="isOpen">- Add Contact</span>
            <span v-else>+ Add Contact</span>
          </button>
          <div class="mt-6">
            <div v-for="(input, index) in inputs" :key="index" class="row mt-6">
              <div class="col-6 mb-6">
                <Input
                  name="contactName"
                  type="text"
                  label="Name"
                  required="true"
                />
              </div>
              <div class="col-6 mb-6">
                <Input
                  name="e-mail"
                  type="text"
                  label="E-mail Address"
                  required="true"
                />
              </div>
              <div class="col-6 mb-6">
                <phone-input
                  label="Phone Number"
                  name="contactTwoPhoneNumber"
                  :thin="true"
                  minlength="14"
                  maxlength="14"
                  rules="required|min:14|max:14"
                />
              </div>
              <div class="col-6 mb-6">
                <m-select
                  :options="roleType"
                  :addable="true"
                  name="role"
                  type="text"
                  label="Role"
                  :bind-text="true"
                  required="true"
                />
              </div>
            </div>
          </div>
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
          <div class="col-4 ml-auto">
            <Button
              class="flex"
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
            >
              Add Customer
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
import { CustomersDetails } from '~/models/Broker/customersDetails/customersDetails'
export default Vue.extend({
  name: 'AddNewCustomer',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      isOpen: false,
      inputs: [],
      request: {} as CustomersDetails,
      methodOptions: [
        { id: 1, text: 'E-mail Invoice', selected: false },
        { id: 2, text: 'Paper Invoice', selected: false },
        { id: 3, text: 'Platform Invoice', selected: false }
      ] as SelectOption[],
      frequencyOptions: [
        { id: 1, text: 'Daily', selected: false },
        { id: 2, text: 'Bi-weekly', selected: false },
        { id: 3, text: 'Weekly', selected: false },
        { id: 4, text: 'Bi-monthly', selected: false },
        { id: 5, text: 'Monthly', selected: false }
      ] as SelectOption[],
      transmission: [
        { id: 1, text: 'Bulk Invoices', selected: false },
        { id: 2, text: 'Single Shipment', selected: false }
      ] as SelectOption[],
      podRequiredType: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      paymentTermType: [
        { id: 1, text: 'Pre-pay', selected: false },
        { id: 2, text: 'Pre-pay Required', selected: false },
        { id: 3, text: 'Net 30', selected: false },
        { id: 4, text: 'Net 45', selected: false },
        { id: 5, text: 'Net 60', selected: false },
        { id: 6, text: 'Net 90', selected: false }
      ] as SelectOption[],
      roleType: [
        { id: 1, text: 'Account Manager', selected: false },
        { id: 2, text: 'Test', selected: false }
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
      addCustomer: (action, param) => action('Broker/customersDetails/addCustomer', param)
    }),
    handleSubmit () {
      this.addCustomer({
        ...this.request,
        broker_id: this.brokerId
      })
      this.$emit('close-drawer')
    },
    toggleInputs () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.addInputs()
      } else {
        this.inputs = []
      }
    },
    addInputs () {
      if (this.inputs.length < 1) {
        const remaining = 1 - this.inputs.length
        for (let i = 0; i < remaining; i++) {
          this.inputs.push({
            name: `input${this.inputs.length + i + 1}`,
            value: ''
          })
        }
      }
    }
  }
})
</script>
