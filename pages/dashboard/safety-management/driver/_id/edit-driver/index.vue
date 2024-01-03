<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit
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
            type="text"
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
        <StateSelects
          :city.sync="request.city"
          :state.sync="request.state"
          :api-fetched="request.state?.length > 0"
        />
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
import PhoneInput from '~/components/PhoneInput.vue'
export default Vue.extend({
  name: 'EditDriver',
  components: { PhoneInput },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      w9: false,
      w2: false,
      choice: '',
      choice_2: '',
      twic_card: '',
      showDrawer: false,
      request: {} as Driver,
      multiSelectedState: [],
      checkBoxTest: false,
      emergencyOption: '',
      testOptions: [
        { id: 1, text: 'Company Driver', selected: false, slotName: 'W2' },
        { id: 2, text: 'Lease Driver', selected: false, slotName: 'W9' },
        { id: 3, text: 'Owner Operator', selected: false, slotName: 'W9' }
      ] as SelectOption[],
      emergencyOptions: [
        { id: 1, text: 'Spouse', selected: true },
        { id: 2, text: 'Son', selected: false },
        { id: 3, text: 'Daughter', selected: false },
        { id: 4, text: 'Father', selected: false }
      ] as SelectOption[],
      choices: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      twic_cards: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[],
      typeOptions: [
        { id: 1, text: 'Main Caption', selected: true },
        { id: 2, text: 'Co-Driver', selected: false }
      ] as SelectOption[],
      pendingOptions: [
        { id: 1, text: '1 Docs', selected: true },
        { id: 2, text: '2 Docs', selected: false },
        { id: 3, text: '3 Docs', selected: false },
        { id: 4, text: '4 Docs', selected: false },
        { id: 5, text: '5 Docs', selected: false },
        { id: 6, text: '6 Docs', selected: false },
        { id: 7, text: '7 Docs', selected: false },
        { id: 8, text: '8 Docs', selected: false },
        { id: 9, text: '9 Docs', selected: false }
      ] as SelectOption[],
      statusOptions: [
        { id: 1, text: 'Active', selected: true },
        { id: 2, text: 'Vacation', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    driver (): Driver {
      return (this.$store.getters['driver/driver'])
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
    twic_card (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === 'Yes') {
          this.request.twic_card = true
        } else {
          this.request.twic_card = false
        }
      }
    }
  },
  created () {
    this.getDriver(parseInt(this.$route.params.id, 10)).then(() => {
      console.log('params', this.$route.params.id)
      this.request = { ...this.driver }
    })
  },
  methods: {
    ...mapActions({
      getDriver: (action, id) => action('driver/getDriver', id),
      updateDriver: (action, param) => action('driver/updateDriver', param)
    }),
    handleSubmit () {
      this.updateDriver({
        ...this.request,
        truck_id: this.request.truck_id == null ? undefined : this.request.truck_id,
        trailer_id: this.request.trailer_id == null ? undefined : this.request.trailer_id,
        score: undefined,
        hire_date: undefined,
        next_drug_test_date: undefined,
        compensation: 1,
        avatar: 2,
        payment_rates: 1,
        w9_exist: true,
        recurring_deductions: 7,
        cdl_expiration_date: moment(this.request.cdl_expiration_date).toISOString(),
        cdl_issue_date: moment(this.request.cdl_issue_date).toISOString(),
        dob: moment(this.request.driver_dob).toISOString()
      } as Driver).then(() => {
        this.$emit('close-drawer')
      })
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
