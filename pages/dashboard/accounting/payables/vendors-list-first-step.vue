<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-6 text-center">
          Add Vendor
        </h3>
        <h6 class="font-semibold mt-4 text-start">
          Basic Information
        </h6>
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
            v-model="request.email"
            name="vendorsEmail"
            type="text"
            label="E-mail Address"
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
        <StateSelects :city.sync="request.city" :state.sync="request.state" />
        <div class="col-6 mb-6">
          <Input
            v-model="request.zip_code"
            name="vendors-zip-code"
            type="text"
            label="Zip Code"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.country"
            name="vendorsCountry"
            :multiple="false"
            :searchable="true"
            :bind-text="true"
            :options="countryOptions"
            :addable="true"
            label="Country"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.business_hours"
            name="business-hours"
            type="type"
            label="Business Hours"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.line_of_business"
            name="line-of-business"
            type="text"
            label="Select Line of Business"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            name="vendorStatus"
            :multiple="false"
            :searchable="true"
            :bind-text="true"
            :options="statusOptions"
            :addable="true"
            label="Status"
            rules="required"
          />
        </div>
        <h6 class="font-semibold mb-6 mt-4 text-start">
          Financial Information
        </h6>
        <div class="col-6 mb-6">
          <Input
            v-model="request.bank_name"
            name="bankName"
            label="Bank Name"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.account_number"
            name="accountingNumber"
            label="Account Number"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.routing_number"
            name="routingNumber"
            label="Routing Number"
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
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { VendorsDetails } from '~/models/accounting/vendors/vendorsDetails'

// interface VendorsDetails {
//   vendor_name: string,
//   phone_number: number,
//   e_mail: string,
//   vendors_street_1: string,
//   vendors_street_2: string,
//   vendors_city: string,
//   vendors_state: string,
//   zipcode: string,
//   business_hours: string,
//   vendors_country: string,
//   select_business: string,
//   bank_name: string,
//   accounting_number: number,
//   routing_number: number,
//   vendor_account: string
// }

export default Vue.extend({
  name: 'VendorsPage',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as VendorsDetails,
      countryOptions: [{
        id: 'USA', text: 'United States', selected: true, img: '/images/flags/united-states.svg'
      }] as SelectOption[],
      testOptions: [
        { id: 1, text: 'Dallas', selected: false },
        { id: 2, text: 'New York', selected: false }
      ] as SelectOption[],
      statusOptions: [
        { id: 1, text: 'Active', selected: false },
        { id: 2, text: 'Inactive', selected: false },
        { id: 3, text: 'In vacation', selected: false }
      ] as SelectOption[],
      testCity: [
        { id: 1, text: 'New York', selected: false },
        { id: 2, text: 'California', selected: false },
        { id: 2, text: 'Los Angeles', selected: false }
      ] as SelectOption[],
      test1: [
        { id: 1, text: 'Test 1', selected: false },
        { id: 2, text: 'Test 2', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    carrierVendors (): SelectOption[] {
      const vendorOptions: SelectOption[] = []
      this.$store.getters['accounting/vendors/carrierVendors'].forEach((vendor: VendorsDetails) => {
        vendorOptions.push({ id: vendor.id, text: `${vendor.vendor_name} ${vendor.contact_name}`, selected: false })
      })
      return vendorOptions
    },
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  created () {
    this.getVendorsByCarrierId({ page_number: 1 })
  },
  methods: {
    ...mapActions({
      addVendor: (action, param) => action('accounting/vendors/addVendor', param),
      getVendorsByCarrierId: (action, param) => action('accounting/vendors/getVendorsByCarrierId', param)
    }),
    handleSubmit () {
      this.addVendor({
        ...this.request
      } as VendorsDetails)
      this.$emit('close-drawer')
    }
  }
})
</script>
