<template>
  <div class="w-full min-h-screen max-h-screen flex overflow-hidden">
    <div class="tw-col-[55%] max-md:tw-col-[100%] items-stretch">
      <div class="m-10 max-md:ml-4 max-md:mb-2">
        <nuxt-link to="/">
          <img src="/images/Logo_White.png" class="max-h-10" alt="Nebuga GTS">
        </nuxt-link>
      </div>
      <div class="h-full sweet-scroll overflow-y-scroll">
        <div class="pl-28 pr-[80px] max-md:p-5">
          <div class="col-auto my-5">
            <Badge title="Free Demo" class="bg-green-100 text-green-700 w-32 justify-center" :size="SizeTypeEnum.LG" />
          </div>
          <h3 class="font-semibold dark:text-white">
            Request Demo
          </h3>
          <Form fclass="row" class="py-8" @send="onSubmit">
            <div class="col-6 max-md:col-12 mb-6">
              <Input 
                v-model="request.firstName" 
                name="firstName" 
                type="text" 
                label="First Name *" 
                rules="required" 
              />
            </div>
            <div class="col-6 max-md:col-12 mb-6">
              <Input 
                v-model="request.lastName" 
                name="lastName" 
                type="text" 
                label="Last Name *" 
                rules="required" 
              />
            </div>
            <div class="col-6 max-md:col-12 mb-6">
              <Input 
                v-model="request.email" 
                name="email" 
                type="email" 
                label="E-mail Address *" 
                rules="required|email" 
              />
            </div>
            <div class="col-6 max-md:col-12 mb-6">
              <Input 
                v-model="request.companyName" 
                name="companyName" 
                type="text" 
                label="Company Name *" 
                rules="required" 
              />
            </div>
            <div class="col-6 max-md:col-12 mb-6">
              <m-select
                v-model="request.companyType"
                :bind-text="true"
                :options="companyTypes"
                name="state"
                rules="required"
                label="Company Type *"
                placeholder="Select Company Type"
              />
            </div>
            <div class="col-6 max-md:col-12 mb-6">
              <m-select
                v-model="request.source"
                :options="sourceOptions"
                :addable="true"
                name="state"
                label="Where did you hear about us?"
                placeholder="Select Source"
              />
            </div>

            <div class="col-12 max-md:col-12 mb-6">
              <check-box v-model="agreed" :value="agreed" rules="required">
                I agree to receive communication from <strong>Nebula</strong>
              </check-box>
            </div>
            <div class="col-12 pt-12 max-md:pt-2 pb-28">
              <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.SUBMIT">
                Request for demo
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <div class="tw-col-[45%] max-md:tw-col-[100%]">
      <img src="/images/demo_pic.png" class="w-full h-full object-cover" alt="Demo Picture">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import axios from 'axios'
import {
  ButtonTypeEnum,
  SizeTypeEnum,
  ActionTypeEnum
} from '../../components/ts/enums'
import { SelectOption } from '../../components/ts/interfaces'
import { RequestFreeDemoModel } from '../../models/auth/requestFreeDemoModel'
// import { RequestDemo } from '~/models/requestDemo/requestDemo'

export default Vue.extend({
  name: 'Request',
  transition: 'page-right',
  data () {
    return {
      ButtonTypeEnum,
      SizeTypeEnum,
      ActionTypeEnum,
      request: {} as RequestFreeDemoModel,
      multiSelectedState: '',
      agreed: false,
      sourceOptions: [{
        id: 'fb',
        text: 'facebook'
      },
      {
        id: 'ln',
        text: 'linkedin'
      }
      ] as SelectOption[]
    }
  },
  computed: {
    companyTypes (): SelectOption[] {
      return this.$store.getters['common/companyTypes']
    }
  },
  methods: {
    ...mapActions({
      addDemo: (action, params: RequestFreeDemoModel) => action('requestDemo/addDemo', params)
    }),
    async onSubmit () {
      const formData = {
        ...this.request
        // receive_emails: this.agreed,
        // phoneNumber: this.phoneNumber
      }
      try {
        const response = await axios.post('', formData)
        if (response.status === 200 || response.status === 201) {
          this.$router.push('/request-free-demo/completed')
        } else {
          alert('Incorrect Username or Password')
        }
      } catch (error) {
        alert(error)
      }
    }
  }
})
</script>

<style scoped>

</style>
