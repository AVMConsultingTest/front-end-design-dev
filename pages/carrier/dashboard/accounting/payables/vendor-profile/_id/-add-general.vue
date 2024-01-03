<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Add Contacts
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact_name"
            name="contactName"
            type="text"
            label="Contact Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.department"
            name="department"
            type="text"
            label="Department"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.phone_number"
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
            v-model="request.email"
            name="email"
            type="text"
            label="E-mail Address"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.contact_hierarchy"
            name="contactHierarchy"
            type="number"
            label="Contact Hierarchy"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.business_hours"
            name="businessHours"
            type="text"
            label="Business Hours"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.contact_status"
            :options="statusOptions"
            :bind-text="true"
            :addable="true"
            name="contactStatus"
            type="number"
            label="Contact Status"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.comments"
            name="comments"
            type="text"
            label="Comments"
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
import { SelectOption } from '@/components/ts/interfaces'
import PhoneInput from '~/components/PhoneInput.vue'
import { ContactsDetails } from '~/models/accounting/contacts/contactsDetails'
export default Vue.extend({
  name: 'AddVendorGeneral',
  components: { PhoneInput },
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as ContactsDetails,
      // request: {
      //   contactName: '',
      //   department: '',
      //   phoneNumber: '',
      //   e_mail: '',
      //   contact_hierarchy: '',
      //   business_hours: '',
      //   contact_status: '',
      //   comments: ''
      // },
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      statusOptions: [
            { id: 1, text: 'Active', selected: false },
            { id: 2, text: 'Inactive', selected: false },
            { id: 3, text: 'In vocation', selected: false }
      ] as SelectOption[]

    }
  },
  computed: {
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  methods: {
    ...mapActions({
      addContact: (action, param) => action('accounting/contactsDetails/addContact', param)
    }),
    handleSubmit () {
      this.addContact({ ...this.request, carrier_id: this.carrierId, vendor_id: 1 })
      this.$emit('close-drawer')
    }
  }

})
</script>
