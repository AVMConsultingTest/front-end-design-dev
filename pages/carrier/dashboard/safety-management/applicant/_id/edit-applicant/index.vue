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
            :multiple="false"
            :searchable="true"
            name="driverFirstName"
            type="text"
            label="Driver First Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.last_name"
            :multiple="false"
            :searchable="true"
            name="driverLastName"
            type="text"
            label="Driver Last Name"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.type"
            :multiple="false"
            :searchable="true"
            :options="typeOptions"
            :addable="true"
            name="type"
            type="text"
            label="Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.hire_date"
            name="hireDate"
            type="datetime-local"
            label="Hire Date"
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
        <!-- <div class="col-6 mb-6">
          <m-select
            v-model="request.number_of_pending_docs"
            :options="pendingOptions"
            :addable="true"
            name="pendingdoc"
            type="text"
            label="Pending Documents"
            rules="required"
          />
        </div> -->
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :options="statusOptions"
            :addable="true"
            name="status"
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
              Go Back
            </Button>
          </div>
          <div class="col-3 ml-auto">
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
              Save
            </Button>
          </div>
        </div>
      </form>
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
import { ApplicantsDetails } from '~/models/applicants'
import PhoneInput from '~/components/PhoneInput.vue'
export default Vue.extend({
  components: { PhoneInput },
  props: {
    editId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as ApplicantsDetails,
      multiSelectedState: [],
      checkBoxTest: false,
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
    applicant (): ApplicantsDetails {
      return (this.$store.getters['applicants/applicant'])
    }
  },
  mounted () {
    this.getApplicant(this.editId).then(() => {
      console.log('editId:', this.editId)
      setTimeout(() => {
        console.log(this.applicant)
        this.request = { ...this.applicant }
      }, 1000)
    })
  },
  methods: {
    ...mapActions({
      getApplicant: (action, id) => action('applicants/getApplicant', id),
      updateApplicant: (action, param) => action('applicants/updateApplicant', param)
    }),
    handleSubmit () {
      if (this.request.carrier_id) {
        delete this.request.carrier_id
      }
      this.updateApplicant({
        ...this.request
      } as ApplicantsDetails).then(() => {
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
