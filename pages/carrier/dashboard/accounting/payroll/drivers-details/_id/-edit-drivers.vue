<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Edit Driver
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_joined_data"
            name="joinedDate"
            type="datetime-local"
            label="Joined Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_type"
            :multiple="false"
            :searchable="true"
            :options="driverOptions"
            name="type"
            :bind-text="true"
            :addable="true"
            label="Driver Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_address"
            name="address"
            type="text"
            label="Address Information"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.driver_contact_phone_number"
            name="phoneNumber"
            label="Phone Number"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_business_email"
            name="email"
            type="text"
            label="Business E-mail"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_fax_number"
            label="Fax Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_dob"
            name="birthday"
            type="datetime-local"
            label="Birthday"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.payment_rates"
            name="paymentRates"
            type="text"
            label="Payment Rates"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_ssn"
            name="socialSecurityNumber"
            type="text"
            label="Social Security Number"
            rules="required"
          />
        </div>
        <h6 class="font-semibold mb-6 mt-4 text-start">
          Payment Information
        </h6>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_routing_number"
            name="bankRoutingNumber"
            type="text"
            label="Bank Routing Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_account_number"
            name="bankAccountingNumber"
            type="text"
            label="Bank Accounting Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.payment_type"
            name="paymentType"
            type="text"
            label="Payment Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.payment_rates"
            name="paymentRates"
            type="text"
            label="Payment Rates"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.payment_base"
            name="base"
            type="number"
            label="Base"
          />
        </div>
        <h6 class="font-semibold mb-6 mt-4 text-start">
          Asset Information
        </h6>
        <div class="col-6 mb-6">
          <Input
            v-model="request.truck_id"
            name="truckId"
            type="text"
            label="Truck ID"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.trailer_id"
            name="trailerId"
            type="text"
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
            <div class="col-3 flex justify-end ml-auto">
              <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT" class="max-w-max p-4">
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
  name: 'PayrollEditDriver',
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
      statusOptions: [
      { id: 1, text: 'Active', selected: false },
      { id: 2, text: 'Inactive', selected: false }
      ] as SelectOption[],
      countryOptions: [{
        id: 'USA', text: 'United States', selected: false, img: '/images/flags/united-states.svg'
      }],
      cityOptions: [],
      driverOptions: [
        { id: 1, text: 'Owner Operator', selected: false },
        { id: 2, text: 'Main Driver', selected: false }
      ]
    }
  },
  computed: {
    driver (): DriversDetails {
      return (this.$store.getters['accounting/drivers/driver'])
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
      getDriver: (action, id) => action('accounting/drivers/getDriver', id),
      updateDriver: (action, param) => action('accounting/drivers/updateDriver', param)
    }),
    handleSubmit () {
      this.updateDriver(this.request).then(() => {
        this.$emit('close-drawer')
      })
    }
  }

})
</script>
