<template>
  <div class="lg:w-10/12 w-full mx-auto lg:min-h-[650px] max-h-screen grid grid-rows-3 grid-flow-col gap-4">
    <div class="flex flex-col self-end items-baseline row-start-1 row-end-1">
      <Badge title="Step: 3/3" class="bg-orange-200 text-orange-800 mb-2" :size="SizeTypeEnum.LG" />
      <h3 class="font-semibold mb-1 text-left">
        Lastly, your company information
      </h3>
    </div>
    <Form fclass="row my-8" class="row-start-2 row-span-2" @send="handleSubmit">
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_account_number"
          name="accountNumber"
          type="text"
          label="Account Number"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_routing_number"
          name="routingNumber"
          type="text"
          label="Routing Number"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_ein_number"
          name="ein"
          type="text"
          label="Employer ID Number (EIN)"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_mc_number"
          name="mcNumber"
          type="text"
          label="Motor Carrier Number (MC)"
          :thin="true"
        />
      </div>
      <div class="col-6 mb-6">
        <FileInput label="Company Logo" name="logo" />
      </div>
      <div class="col-6 mb-6">
        <Input
          v-model="request.company_dot_number"
          name="dotNumber"
          type="text"
          rules="required"
          label="US DOT Number *"
          :thin="true"
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
    <Modal ref="modal" size="sm">
      <div slot="body" class="row flex items-center justify-center py-16">
        <div class="col-12 flex items-center justify-center">
          <div class="bg-green-400/40 rounded-full w-40 h-40 relative">
            <svg
              width="160"
              height="160"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="rgb(41, 45, 50)" d="M451.392 664.751c-8.533 0-16.64-3.413-22.613-9.387l-120.749-120.747c-12.373-12.373-12.373-32.853 0-45.227s32.853-12.373 45.227 0l98.135 98.133 219.307-219.307c12.373-12.373 32.853-12.373 45.227 0s12.373 32.853 0 45.227l-241.92 241.92c-5.973 5.973-14.080 9.387-22.613 9.387z" stroke="#BAF1DA" />   </svg>
          </div>
        </div>
        <div class="col-8 items-center justify-center my-14">
          <h3 class="font-semibold text-center mb-2">
            Congratulations !
          </h3>
        </div>
        <div class="col-8">
          <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG" @click="$router.push('/signin')">
            Let’s Get Started
          </Button>
        </div>
      </div>
    </Modal>
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
  name: 'OnboardingInformation',
  layout: 'OnboardLayout',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as CarriersDetails,
      showModal: false
    }
  },
  computed: {
    onboardCarrier () {
      return (this.$store.getters['carriers/carrierRequest'])
    }
  },
  mounted () {
    this.setStep(5)
    this.request = { ...this.onboardCarrier }
  },
  methods: {
    async handleSubmit () {
      this.fillRequest({ ...this.request, })
      console.log(this.request)
      await this.addCarrier(this.request).then((res: unknown) => {
        console.log(res)
        this.openModal()
      }).catch((err:unknown) => {
        console.warn(err)
      })
    },
    openModal () {
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    },
    ...mapActions({
      fillRequest: (action, param) => action('carriers/fillRequest', param),
      setStep: (action, param) => action('onboard/setStep', param),
      addCarrier: (action, param) => action('carriers/addCarrier', param)
    })
  }
})
</script>

<style scoped>

</style>
