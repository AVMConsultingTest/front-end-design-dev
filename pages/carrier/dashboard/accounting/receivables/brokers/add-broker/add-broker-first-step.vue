<template>
  <div class="h-full">
    <div class="pl-24 pr28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-start">
          Add Broker
        </h3>
        <h6 class="font-semibold mb-1 mt-4 text-start">
          Broker Information
        </h6>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.name"
            name="companyName"
            type="text"
            label="Company Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.mc"
            name="mc"
            type="text"
            label="MC#"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.credit_limit"
            name="creditLimit"
            type="number"
            label="Credit Limit"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.credit_available"
            name="creditAvailable"
            type="text"
            label="Credit Available"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.score"
            name="brokerScore"
            type="text"
            label="Broker Score"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.credit_limit_incrase"
            name="creditLimitIncrease"
            type="text"
            label="Credit Limit Increase"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.invoicing_email"
            name="invoicingEmail"
            type="email"
            label="Invoicing E-mail"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :searchable="true"
            :options="statusOptions"
            :bind-text="true"
            :addable="true"
            name="status"
            type="text"
            label="Status"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contract"
            name="contract"
            type="text"
            label="Contract"
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
        <h6 class="font-semibold mb-6 mt-4 text-start">
          Bill Information
        </h6>
        <div class="col-6 mb-6">
          <Input
            name="billToAddresse"
            type="text"
            label="Bill to Addresse"
          />
        </div>
        <div class="col-6 mb-6">
          <check-box
            v-model="request.direct_billing"
            class="mt-11"
          >
            Direct Broker Billing
          </check-box>
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.bill_to_address"
            name="billToAddress"
            type="text"
            label="Bill To Adress"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.address_line1"
            name="addressLine1"
            type="text"
            label="Address Line 1"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.address_line2"
            name="addressLine2"
            type="text"
            label="Address Line 2"
          />
        </div>
        <StateSelects :city.sync="request.city" :state.sync="request.state" />
        <div class="col-6 mb-6">
          <Input
            v-model="request.zip_code"
            name="zipcode"
            type="text"
            label="Zip Code"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.country"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="countryOptions"
            name="state"
            label="Country"
            placeholder="Select your Country"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.billing_email"
            name="billingEmail"
            type="email"
            label="Billing E-mail"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.billing_option"
            name="billingOption"
            type="text"
            label="Billing Option"
          />
        </div>
        <h6 class="font-semibold mb-6 mt-10 text-start">
          Contact Information
        </h6>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact1_first_name"
            name="firstName"
            type="text"
            label="First Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact1_last_name"
            name="lastName"
            type="text"
            label="Last Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact1_email"
            name="emailAddresse"
            type="email"
            label="E-mail Addresse"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.contact1_phone_number"
            label="Contact Phone Number"
            name="phoneNumber"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
          />
        </div>
        <h6 class="font-semibold dark:text-white mt-10 mb-4">
          Contact (secondary)
        </h6>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact2_first_name"
            name="firstName"
            type="text"
            label="First Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact2_last_name"
            name="lastName"
            type="text"
            label="Last Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact2_email"
            name="emailAddresse"
            type="email"
            label="E-mail Addresse"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.contact2_phone_number"
            label="Contact Phone Number"
            name="contactPhoneNumber"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
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
              class="max-w-max p-4"
            >
              Save Broker
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
import moment from 'moment'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { BrokersDetails } from '~/models/accounting/brokers/brokersDetails'

export default Vue.extend({
  name: 'AddBrokerFirstStep',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      direct_billing: false,
      request: {} as BrokersDetails,
      multiSelectedState: [],
      statusOptions: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'New', selected: false },
        { id: 3, text: 'Inactive', selected: false },
        { id: 4, text: 'Suspending', selected: false },
        { id: 5, text: 'Pending', selected: false }
      ] as SelectOption[],
      countryOptions: [{
        id: 'USA', text: 'United States', selected: true, img: '/images/flags/united-states.svg'
      }] as SelectOption[]
    }
  },
  computed: {
    carrierVendors (): SelectOption[] {
      const brokerOptions: SelectOption[] = []
      this.$store.getters['accounting/brokers/carrierBrokers'].forEach((broker: BrokersDetails) => {
        brokerOptions.push({ id: broker.id, text: `${broker.name}`, selected: false })
      })
      return brokerOptions
    },
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  watch: {
    direct_billing (newValue) {
      console.log('Checkbox değeri değişti:', newValue)
      // Burada istediğiniz başka işlemleri de gerçekleştirebilirsiniz.
    }
  },
  created () {
    this.getBrokersByCarrierId({ page_number: 1 })
  },
  methods: {
    ...mapActions({
      addBroker: (action, param) => action('accounting/brokers/addBroker', param),
      getBrokersByCarrierId: (action, param) => action('accounting/brokers/getBrokersByCarrierId', param)
    }),
    handleSubmit () {
      const rest = {
        // first_active_date: moment('2023-01-19').seconds(0).toISOString(),
        // last_active_date: moment('2024-01-19').seconds(0).toISOString(),
        // last_credit_change_date: moment('2024-01-19').seconds(0).toISOString(),
        // credit_score_curr: 'A',
        // credit_score_prev: 'B',
        // broker_address: 'test',
        // broker_caption: 'test',
        // broker_emergency_phone_number: 'test',
        // carrier_id: this.carrierId,
        // ssn_number: 'test',
        // broker_phone_number: 'test'
      }
      this.addBroker({ ...this.request, ...rest })
      this.$emit('close-drawer')
    }
  }
})
</script>
