<template>
  <div class="lg:w-10/12 w-full mx-auto lg:min-h-[650px] grid grid-rows-3 grid-flow-col gap-4">
    <div class="flex flex-col self-end items-baseline row-start-1 row-end-1">
      <Badge title="Step: 1/2" class="bg-green-200 text-green-800 mb-2" :size="SizeTypeEnum.LG" />
      <h3 class="font-semibold mb-1 text-left">
        Let’s introduce yourself
      </h3>
    </div>
    <Form fclass="row my-8" class="row-start-2 row-span-2" @send="handleSubmit">
      <div class="col-6 mb-6">
        <Input
          v-model="request.user_first_name"
          name="firstName"
          type="text"
          label="First Name *"
          rules="required"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <Input
          v-model="request.user_last_name"
          name="lastName"
          type="text"
          label="Last Name *"
          rules="required"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <Input
          v-model="request.user_username"
          name="userName"
          type="text"
          label="User Name *"
          rules="required"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <Input
          v-model="request.user_job_title"
          name="jobTitle"
          type="text"
          label="Job Title *"
          rules="required"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <PhoneInput
          v-model="request.company_phone_number"
          name="phoneNumber"
          label="Contact Phone Number *"
          rules="required|min:14|max:14"
          :thin="true"
          maxlength="14"
        />
      </div>
      <div class="row mx-0 px-0">
        <div class="col-2 mt-10 ml-auto">
          <Button
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.LG"
            :action="ActionTypeEnum.SUBMIT"
          >
            Continue
          </Button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { CarriersDetails } from '~/models/carriers/carriersDetails'
export default Vue.extend({
  name: 'OnboardingPersonal',
  layout: 'OnboardLayout',
  transition: 'page-right',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as CarriersDetails,
      selectedCode: ''
    }
  },
  computed: {
    onboardCarrier () {
      return this.$store.getters['carriers/carrierRequest']
    }
  },
  mounted () {
    this.setStep(1)
    this.request = { ...this.onboardCarrier }
  },
  methods: {
    handleSubmit () {
      this.fillRequest(this.request)
      console.log(this.request)
      this.$router.push('/onboarding/personal/address')
    },
    ...mapActions({
      fillRequest: (action, param) => action('carriers/fillRequest', param),
      setStep: (action, param) => action('onboard/setStep', param)
    })
  }
})
</script>

<style scoped>

</style>
