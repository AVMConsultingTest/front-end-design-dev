<template>
  <div class="h-full">
    <div class="pl-24 pr-24">
      <div class="flex-col justify-center items-start mt-20 mb-12 flex" style="flex: 0.5">
        <h3 class="font-semibold text-center">
          Add New Contact
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact_first_name"
            name="firstName"
            type="text"
            label="First Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact_last_name"
            name="lastName"
            type="text"
            label="Last Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.contact_email_address"
            name="mail"
            type="text"
            label="E-mail"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <phone-input
            v-model="request.contact_phone_number"
            name="phoneNumber"
            label="Phone Number"
            :thin="true"
            minlength="14"
            maxlength="14"
            rules="required|min:14|max:14"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.is_verified_contact"
            :multiple="false"
            :searchable="true"
            :options="verifiedOptions"
            name="verifiedContact"
            :bind-text="true"
            label="Verified Contact"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.contact_role"
            :multiple="false"
            :searchable="true"
            :options="roleOptions"
            :addable="true"
            name="role"
            :bind-text="true"
            label="Role"
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
import { ContactsDetails } from '~/models/Broker/contactsDetails/contactsDetails'
import { SelectOption } from '@/components/ts/interfaces'
import PhoneInput from '~/components/PhoneInput.vue'
export default Vue.extend({
  name: 'CompanyProfileAddContact',
  components: { PhoneInput },
  layout: 'Dashboard',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {
        is_verified_contact: false
      } as ContactsDetails,
      //   request: {
      //     phoneNumber: '',
      //     e_mail: '',
      //     mc_number: '',
      //     credit_limit: '',
      //     dot_number: '',
      //     broker_id: '',
      //     average_days_pay: ''
      //   },
      selectedState: 0,
      showModal: false,
      multiSelectedState: [],
      checkBoxTest: false,
      roleOptions: [
        { id: 1, text: 'Manager', selected: false },
        { id: 2, text: 'Broker', selected: false }
      ] as SelectOption[],
      verifiedOptions: [
        { id: 1, text: 'Yes', selected: false },
        { id: 2, text: 'No', selected: false }
      ] as SelectOption[]
    }
  },
  methods: {
    ...mapActions({
      addContact: (action, param) => action('Broker/contactsDetails/addContact', param)
    }),
    handleSubmit () {
      const rest = {
        ...this.request,
        broker_id: 3,
        is_verified_contact: true
      }
      this.addContact({ ...this.request, ...rest })
      this.$emit('close-drawer')
    }
  }

})
</script>
