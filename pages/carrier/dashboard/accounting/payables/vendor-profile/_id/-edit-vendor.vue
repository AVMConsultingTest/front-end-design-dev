<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Edit Vendor
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.name"
            name="vendorName"
            label="Vendor Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact_name"
            name="contactName"
            label="Contact Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.email"
            name="email"
            type="text"
            label="Business E-mail"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.phone_number"
            label="Phone Number"
            name="phoneNumber"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.address_line1"
            name="vendorsStreet1"
            type="text"
            label="Street Address 1"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.address_line2"
            name="vendorsStreet2"
            type="text"
            label="Street Address 2"
          />
        </div>
        <!-- <div class="col-6 mb-6">
          <Input
            v-model="request.vendor_type"
            name="type"
            type="text"
            label="Type"
            rules="required"
          />
        </div> -->
        <StateSelects :city.sync="request.city" :state.sync="request.state" :api-fetched="request.state?.length > 0" />
        <div class="col-6 mb-6">
          <Input
            v-model="request.zip_code"
            name="zipCode"
            type="text"
            label="Zip Code"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.country"
            :multiple="false"
            :searchable="true"
            :options="countryOptions"
            :addable="true"
            name="Country"
            :bind-text="true"
            label="Country"
            rules="required"
          />
        </div>

        <div class="col-6 mb-6">
          <Input
            v-model="request.account_number"
            name="bankAccountingNumber"
            type="text"
            label="Bank Accounting Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.business_hours"
            name="workHours"
            type="text"
            label="Work Hours"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.bank_name"
            name="bank"
            type="text"
            label="Bank"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.status"
            name="status"
            type="text"
            label="Status"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.routing_number"
            name="bankRoutingNumber"
            type="text"
            label="Bank Routing Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.line_of_business"
            name="lineOfBussines"
            type="text"
            label="Line Of Bussines"
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
            <div class="col-4 ml-auto justify-end flex">
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.SUBMIT"
                class="max-w-max p-4"
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
import { VendorsDetails } from '~/models/accounting/vendors/vendorsDetails'
import { Driver } from '~/models/driver'

export default Vue.extend({
  name: 'EditVendor',
  components: { PhoneInput },
  layout: 'Dashboard',
  transition: 'page-left',
  props: {
    editId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      selectedState: 0,
      request: {} as VendorsDetails,
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
      state: [
        { id: 1, text: 'New York', selected: false },
        { id: 2, text: 'California', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    vendor (): VendorsDetails {
      return (this.$store.getters['accounting/vendors/vendor'])
    }
  },
   created () {
     this.getVendor(parseInt(this.$route.params.id, 10)).then(() => {
       console.log('params', this.$route.params.id)
       this.request = { ...this.vendor }
     })
   },
  methods: {
    ...mapActions({
      getVendor: (action, id) => action('accounting/vendors/getVendor', id),
      updateVendor: (action, param) => action('accounting/vendors/updateVendor', param)
    }),
    handleSubmit () {
      this.updateVendor(this.request).then(() => {
        this.$emit('close-drawer')
      })
    }
  }

})
</script>
