<template>
  <div class="lg:w-10/12 w-full mx-auto lg:min-h-[650px] grid grid-rows-3 grid-flow-col gap-4">
    <div class="flex flex-col  self-end items-baseline row-start-1 row-end-1">
      <Badge title="Step: 2/3" class="bg-orange-200 text-orange-800 mb-2" :size="SizeTypeEnum.LG" />
      <h3 class="font-semibold mb-1 text-left">
        And your company address
      </h3>
    </div>
    <Form fclass="row my-8" class="row-start-2 row-span-2" @send="handleSubmit">
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_address_line1"
          name="address1"
          type="text"
          label="Address Line 1 *"
          rules="required"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_address_line2"
          name="address2"
          type="text"
          label="Address Line 2"
          :thin="true"
        />
      </div>
      <StateSelects :city.sync="request.company_city" :state.sync="request.company_state" />
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_zip_code"
          name="zip"
          type="text"
          label="Zip Code *"
          rules="required"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <m-select
          v-model="request.company_country"
          :multiple="false"
          :searchable="true"
          :options="countryOptions"
          name="country"
          :bind-text="true"
          label="Country *"
          rules="required"
          placeholder="Select your Country"
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
  name: 'OnboardingCompanyAddress',
  layout: 'OnboardLayout',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as CarriersDetails,
      countryOptions: [{
        id: 'USA', text: 'United States', selected: false, img: '/images/flags/united-states.svg'
      }],
      cityOptions: []
    }
  },
  computed: {
    onboardCarrier () {
      return (this.$store.getters['carriers/carrierRequest'])
    },
    states () {
      return (this.$store.getters['common/states'])
    },
    cities () {
      return (this.$store.getters['common/cities'])
    }
  },
  watch: {
    'request.carrier_state' (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.getCities(this.request?.carrier_state)
        this.cityOptions = [...this.cities]
      }
    }
  },
  mounted () {
    this.setStep(4)
    this.getStates()
    this.request = { ...this.onboardCarrier }
  },
  methods: {
    handleSubmit () {
      this.fillRequest(this.request)
      console.log(this.request)
      this.$router.push('/onboarding/company/information')
    },
    ...mapActions({
      fillRequest: (action, param) => action('carriers/fillRequest', param),
      setStep: (action, param) => action('onboard/setStep', param),
      getStates: action => action('common/getStates'),
      getCities: (action, param) => action('common/getCities', param)
    })
  }

})
</script>

<style scoped>

</style>
