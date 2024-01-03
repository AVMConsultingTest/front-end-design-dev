<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Edit Customer Profile
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
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
          <phone-input
            v-model="request.customer_phone_number"
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
            v-model="request.sales_representative"
            name="salesRep"
            type="text"
            label="Sales Rep"
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
            v-model="request.customer_business_email"
            name="email"
            type="text"
            label="Business E-mail"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.account_manager"
            name="accountMan"
            type="text"
            label="Account Manager"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.terms"
            name="terms"
            type="text"
            label="Available Credit"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.shipper_id"
            name="customerId"
            type="text"
            label="Customer ID"
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
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.current_balance"
            name="currentBalance"
            type="number"
            label="Current Balance"
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
              <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
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
import PhoneInput from '~/components/PhoneInput.vue'
import { CustomersDetails } from '~/models/Broker/customersDetails/customersDetails'
export default Vue.extend({
  name: 'EditListeningProfile',
  components: { PhoneInput },
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as CustomersDetails,
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false
    }
  },
  computed: {
    customer (): CustomersDetails {
      return (this.$store.getters['Broker/customersDetails/customer'])
    }
  },
  created () {
    this.getCustomer(parseInt(this.$route.params.id, 10)).then(() => {
      console.log('params', this.$route.params.id)
      this.request = { ...this.customer }
    })
  },
  methods: {
    ...mapActions({
      getCustomer: (action, id) => action('Broker/customersDetails/getCustomer', id),
      updateCustomer: (action, param) => action('Broker/customersDetails/updateCustomer', param)
    }),
    handleSubmit () {
      this.updateCustomer(this.request).then(() => {
        this.$emit('close-drawer')
      })
    }
  }

})
</script>
