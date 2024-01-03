<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Driver
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.first_name"
            name="firstName"
            type="text"
            label="First Name *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.last_name"
            name="lastName"
            type="text"
            label="Last Name *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.ssn"
            name="SSN"
            type="text"
            label="SSN *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.dob"
            name="birth"
            type="datetime-local"
            label="Date of Birth *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.email"
            name="email"
            type="email"
            label="E-mail Address *"
            rules="required|email"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.contact_phone_number"
            name="contactPhoneNo"
            label="Contact Phone Number *"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
          />
        </div>
        <div class="col-6 mb-6">
          <SelectInput
            v-model="request.emergency_phone_number"
            :select.sync="request.emergency_phone_number_name"
            :options="emergencyOptions"
            name="emergencyContact"
            :addable="true"
            type="text"
            label="Emergency Contacts"
            :phone-input="true"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.type"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            :addable="true"
            :bind-text="true"
            name="state"
            label="Driver Type"
            rules="required"
          />
          <div class="flex mt-2">
            <div v-if="request.type === 'Lease Driver' || request.type === 'Owner Operator'" class="flex">
              <check-box v-model="w9" class="pl-2" :value="w9">
                W9
              </check-box>
              <FileInput v-if="w9" class="pl-2" :mini="true" />
            </div>
            <div v-else-if="request.type === 'Company Driver'" class="flex">
              <check-box v-model="w2" class="pl-2" :value="w2">
                W2
              </check-box>
              <FileInput v-if="w2" class="pl-2" :mini="true" />
            </div>
          </div>
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="choice"
            :options="choices"
            name="restricted"
            :bind-text="true"
            label="Restricted"
          />
        </div>
        <div v-if="choice === 'Yes'" class="col-6 mb-6">
          <Input
            v-model="request.restricted_notes"
            :text-area="true"
            name="notes"
            type="text"
            label="Notes"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :multiple="false"
            :searchable="true"
            :bind-text="true"
            :options="statusOptions"
            :addable="true"
            name="status"
            label="Driver Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="choice_2"
            :options="twic_cards"
            name="twic_card"
            :bind-text="true"
            label="TWIC Card"
          />
        </div>
        <div v-if="choice_2 === 'Yes'" class="col-6 mb-6">
          <Input
            v-model="request.twic_card_notes"
            :text-area="true"
            name="notes"
            type="text"
            label="Notes"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.cdl_state"
            name="cdlstate"
            type="text"
            label="CDL State"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.cdl_number"
            name="cdlnumber"
            type="text"
            label="CDL Number *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.cdl_issue_date"
            name="cdldate"
            type="datetime-local"
            label="CDL Issue Date *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.cdl_expiration_date"
            name="CdlExp-Date"
            type="datetime-local"
            label="CDL Expration Date *"
            rules="required"
          />
        </div>
        <h6 class="font-semibold mb-6 mt-4 text-start">
          Driver Address Details
        </h6>
        <div class="col-6 mb-6">
          <Input
            v-model="request.address_line_1"
            name="address1"
            type="text"
            label="Address Line 1 *"
            rules="required"
            :thin="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.address_line_2"
            name="address2"
            type="text"
            label="Address Line 2"
            rules=""
            :thin="true"
          />
        </div>
        <StateSelects :city.sync="request.city" :state.sync="request.state" />
        <div class="col-6 mb-6">
          <Input
            v-model="request.zip_code"
            name="zip"
            type="text"
            label="Zip Code *"
            rules="required"
            :thin="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.employee_id"
            name="employee-id"
            type="text"
            label="Employee ID"
            :thin="true"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.employee_type"
            name="employee-type"
            type="text"
            label="Employee Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.compensation"
            name="compensation"
            type="number"
            label="Compensation"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.caption"
            name="caption"
            type="text"
            label="Caption"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.recurring_deductions"
            name="recurringDeductions"
            type="number"
            label="Recurring Deductions"
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
            v-model="request.routing_number"
            name="routingNumber"
            type="text"
            label="Routing Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.account_number"
            name="accountNumber"
            type="text"
            label="Account Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.payment_type"
            name="paymentType"
            type="text"
            label="Payment Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.payment_rates"
            name="paymentRates"
            type="number"
            label="Payment Rates"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.tax_form"
            name="taxForm"
            type="text"
            label="Tax Form"
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
import { Driver } from '~/models/driver/driver'
export default Vue.extend({
  name: 'AddDriverInfo',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      w9: false,
      w2: false,
      is_restricted: 'Yes',
      choice: '',
      twic_card: 'Yes',
      choice_2: '',
      showDrawer: false,
      request: {} as Driver,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      choices: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      twic_cards: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      testOptions: [
        { id: 1, text: 'Company Driver', selected: false, slotName: 'W2' },
        { id: 2, text: 'Lease Driver', selected: false, slotName: 'W9' },
        { id: 3, text: 'Owner Operator', selected: false, slotName: 'W9' }
      ] as SelectOption[],
      statusOptions: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Inactive', selected: false },
        { id: 3, text: 'Terminated', selected: false },
        { id: 4, text: 'On Vacation', selected: false },
        { id: 5, text: 'Paternal Leave', selected: false },
        { id: 6, text: 'Sick Leave', selected: false },
        { id: 7, text: 'Onboarding', selected: false }
      ] as SelectOption[],
      emergencyOption: '',
      emergencyOptions: [
        { id: 1, text: 'Spouse', selected: true },
        { id: 2, text: 'Son', selected: false },
        { id: 3, text: 'Daughter', selected: false },
        { id: 4, text: 'Father', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    addingDriver ():Driver {
      return (this.$store.getters['driver/driverRequest']) as Driver
    },
    states () {
      return this.$store.getters['common/states']
    },
    cities () {
      return this.$store.getters['common/cities']
    },
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  watch: {
    choice (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === 'Yes') {
          this.request.is_restricted = true
        } else {
          this.request.is_restricted = false
        }
      }
    },
    choice_2 (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === 'Yes') {
          this.request.twic_card = true
        } else {
          this.request.twic_card = false
        }
      }
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.request.driver_contact_phone_number = '(544) 946-9411'
    // }, 100)
    this.request = { ...this.addingDriver }
    this.setDriver({ step: 1, title: 'Add Driver' })
  },
  created () {
  },
  methods: {
    ...mapActions({
      setDriver: (action, param) => action('driver/setDriver', param),
      addDriver: (action, param) => action('driver/addDriver', param),
      getStates: action => action('common/getStates'),
      getCities: (action, param) => action('common/getCities', param)
    }),
    handleSubmit () {
      this.addDriver({
        ...this.request,
        w9_exist: true
      })
      this.$emit('close-drawer')
    },
    changeSelectedText () {
      switch (this.request.driver_type) {
        case 'Company Driver':
          return ' - W9'
        case 'Lease Driver':
          return ' - W9'
        case 'Owner Operator':
          return ' - W2'
        default:
          return ''
      }
    }
  }
})
</script>

    <style>
    .m-modal-overlay {
        @apply bg-dark/80 fixed bottom-0 left-0 right-0 top-0 flex justify-center;
    }
    .m-modal-content {
        @apply bg-white rounded-3xl shadow-2xl relative overflow-hidden;
    }
    </style>
