<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Applicants
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <Input
            v-model="request.first_name"
            name="applicantName"
            type="text"
            label="Applicant Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.last_name"
            name="applicantLastName"
            type="text"
            label="Applicant Last Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.type"
            :addable="true"
            :bind-text="true"
            name="type"
            :options="typeOptions"
            label="Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.hire_date"
            type="date"
            name="hireDate"
            label="Hire Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <PhoneInput
            v-model="request.phone_number"
            name="phoneNumber"
            label="Phone Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.email"
            name="mail"
            type="text"
            label="E-mail Address"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :addable="true"
            name="status"
            :bind-text="true"
            :options="testOptions"
            label="Status"
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
import moment from 'moment'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { ApplicantsDetails } from '~/models/applicants'
import PhoneInput from '~/components/PhoneInput.vue'
export default Vue.extend({
  name: 'AddApplicantsTest',
  components: { PhoneInput },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as ApplicantsDetails,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Completed', selected: false },
        { id: 2, text: 'Not Completed', selected: false }
      ] as SelectOption[],
      typeOptions: [
        { id: 1, text: 'Company Driver', selected: false },
        { id: 2, text: 'Owner Driver', selected: false },
        { id: 3, text: 'Lease Driver', selected: false }
      ] as SelectOption[],
      testDoc: [
        { id: 1, text: '1 Docs', selected: false },
        { id: 2, text: '2 Docs', selected: false },
        { id: 3, text: '3 Docs', selected: false },
        { id: 4, text: '4 Docs', selected: false },
        { id: 5, text: '5 Docs', selected: false },
        { id: 6, text: '6 Docs', selected: false },
        { id: 7, text: '7 Docs', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    addingApplicant (): ApplicantsDetails {
      return (this.$store.getters['applicants/applicantRequest']) as ApplicantsDetails
    },
    carrierId (): number {
      return this.$store.state.carrierId
    }
  },
  mounted () {
    this.request = { ...this.addingApplicant }
  },
  methods: {
    ...mapActions({
      addApplicant: (action, param) => action('applicants/addApplicant', param)
    }),
    handleSubmit () {
      this.addApplicant({
        ...this.request,
        hire_date: moment(this.applicant_hire_date).toISOString()
      })
      this.$emit('close-drawer')
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
