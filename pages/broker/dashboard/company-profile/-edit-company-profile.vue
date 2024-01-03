<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Edit Company Profile
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.company_name"
            name="companyName"
            type="text"
            label="Company Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.company_address_line1"
            name="addressLine"
            type="text"
            label="Company Address Line"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.broker_phone_number"
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
            v-model="request.broker_mc_number"
            name="mcNumber"
            type="text"
            label="MC Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.credit_limit"
            name="creditLimit"
            type="text"
            label="Credit Limit"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.broker_email"
            name="email"
            type="text"
            label="Business E-mail"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.broker_dot_number"
            name="dotNumber"
            type="text"
            label="DOT Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.avg_days_to_pay"
            name="averageDaysPay"
            type="number"
            label="Average Days to Pay"
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
import { BrokersDetails } from '~/models/Broker/brokersDetails/brokersDetails'
export default Vue.extend({
  name: 'EditCompanyProfile',
  components: { PhoneInput },
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      // request: {
      //   phoneNumber: '',
      //   e_mail: '',
      //   mc_number: '',
      //   credit_limit: '',
      //   dot_number: '',
      //   broker_id: '',
      //   average_days_pay: ''
      // },
      request: {} as BrokersDetails,
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
    broker (): BrokersDetails {
      return (this.$store.getters['Broker/brokersDetails/broker'])
    },
    brokerId (): number {
      return this.$store.state.brokerId
    }
  },
  created () {
    this.getBroker(this.brokerId).then(() => {
      this.request = { ...this.broker }
    })
  },
  methods: {
    ...mapActions({
      getBroker: (action, id) => action('Broker/brokersDetails/getBroker', id),
      updateBroker: (action, param) => action('Broker/brokersDetails/updateBroker', param)
    }),
    handleSubmit () {
      this.updateBroker({
        ...this.request,
        broker_timezone: 'test',
        broker_website: 'test',
        is_verified: true,
        broker_id: 3
      })
      this.$emit('close-drawer')
    }
  }

})
</script>
