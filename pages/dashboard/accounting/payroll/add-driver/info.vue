<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <Badge title="Step: 1/3" class="bg-purple-100 text-crocus-purple mb-2" :size="SizeTypeEnum.LG" />
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Driver
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_first_name"
            name="firstName"
            type="text"
            label="First Name *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_last_name"
            name="lastName"
            type="text"
            label="Last Name *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_ssn"
            name="SSN"
            type="text"
            label="SSN *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_dob"
            name="birth"
            type="date"
            label="Date of Birth *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.driver_email_address"
            name="email"
            type="email"
            label="E-mail Address *"
            rules="required|email"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.driver_contact_phone_number"
            name="phoneNumber"
            label="Contact Phone Number *"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.driver_emergency_phone_number"
            name="emergencyPhoneNumber"
            label="Emergency Phone Number"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="min:14|max:14"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_type"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            :addable="true"
            name="state"
            label="Driver Type"
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
            type="date"
            label="CDL Issue Date *"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.cdl_expiration_date"
            name="CdlExp-Date"
            type="date"
            label="CDL Expration Date *"
            rules="required"
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
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
              Continue
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
import { Driver } from '~/models/driver/driver'
export default Vue.extend({
  name: 'PayrollAddDriver',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as Driver,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Part-time', selected: false },
        { id: 2, text: 'Full-time', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    addingDriver ():Driver {
      return (this.$store.getters['driver/driverRequest']) as Driver
    }
  },
  mounted () {
    this.request = { ...this.addingDriver }
    this.setDriver({ step: 1, title: 'Add Driver' })
  },
  methods: {
    ...mapActions({
      setDriver: (action, param) => action('driver/setDriver', param)
    }),
    handleSubmit () {
      this.setDriver({ driver: this.request })
      console.log(this.addingDriver)
      this.$router.push('/carrier/dashboard/safety-management/driver-management/add-driver/address-details')
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
