<template>
  <div class="lg:w-10/12 w-full mx-auto lg:min-h-[650px] grid grid-rows-3 grid-flow-col gap-4">
    <div class="flex flex-col self-end items-baseline row-start-1 row-end-1">
      <Badge title="Step: 1/3" class="bg-orange-200 text-orange-800 mb-2" :size="SizeTypeEnum.LG" />
      <h3 class="font-semibold mb-1 text-left">
        Let’s continue with your company
      </h3>
    </div>
    <Form fclass="row my-8" class="row-start-2 row-span-2" @send="handleSubmit">
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_name"
          name="companyName"
          type="text"
          label="Company Name *"
          rules="required"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <m-select
          v-model="request.company_type"
          :multiple="false"
          :searchable="false"
          :options="companyTypes"
          :addable="true"
          name="companyType"
          :bind-text="true"
          label="Company Type *"
          placeholder=" Select company type"
        />
      </div>
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_email"
          name="email"
          type="text"
          label="Company E-mail Address *"
          rules="required|email"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <PhoneInput
          v-model="request.company_phone_number"
          name="companyPhone"
          label="Company Phone Number *"
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
  name: 'OnboardingCompany',
  layout: 'OnboardLayout',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as CarriersDetails
    }
  },
  computed: {
    onboardCarrier (): CarriersDetails {
      return (this.$store.getters['carriers/carrierRequest'])
    },
    companyTypes () {
      return (this.$store.getters['common/companyTypes'])
    }
  },
  mounted () {
    this.setStep(3)
    this.request = { ...this.onboardCarrier }
  },
  methods: {
    handleSubmit () {
      this.fillRequest(this.request)
      console.log(this.request)
      this.$router.push('/onboarding/company/address')
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
