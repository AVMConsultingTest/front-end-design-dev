<template>
  <div class="lg:w-8/12 w-full mx-auto lg:min-h-[650px] flex justify-center flex-col">
    <SnackBar :message="responseMessage" :type="responseStatus" :show="showSnack" />
    <div class="flex flex-col justify-end items-center" style="flex:.5">
      <h3 class="font-semibold mb-1 text-center">
        Verification Code
      </h3>
      <span class="font-medium text-b-4 text-gray mb-3 text-center">
        We’ll send a link to your e-mail address to reset your password. The link expires in 60 minutes.
      </span>
    </div>
    <Form fclass="row my-8" style="flex:.5" @send="handleSubmit">
      <div class="col-12 mb-6">
        <VOtpInput
          ref="otpInput"
          input-classes="otp-input"
          separator=""
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="true"
          class="justify-center"
          @on-complete="handleOnComplete"
        />
      </div>
      <div class="col-12 mt-10">
        <Button
          :type="ButtonTypeEnum.GREEN"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.SUBMIT"
          :disabled="disabled"
        >
          Verify Code
        </Button>
      </div>
    </Form>
    <div class="flex justify-center items-end" style="flex:.5">
      <nuxt-link class="text-b-4 text-tuna font-semibold flex items-center" to="/signin">
        <Icon
          icon="arrow-left"
          color="tuna"
          :alpha="0"
          class="w-5 h-5 cursor-pointer mr-3"
        />
        Back to Log In
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SnackBar from '~/components/SnackBar.vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { VerifyCodeModel } from '~/models/auth'

export default Vue.extend({
  name: 'VerifyCode',
  components: { SnackBar },
  layout: 'CenteredCard',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as VerifyCodeModel,
      email: '',
      staticCode: '407562',
      disabled: true,
      responseMessage: '',
      responseStatus: '',
      showSnack: false
    }
  },
  created () {
    if (this.$route.query.email) {
      this.email = this.$route.query.email as string
    }
  },
  methods: {
    handleSubmit () {
      console.log(this.request)
      this.$router.push({ path: '/new-password', query: { email: this.email, code: this.request.code } })
    },
    handleOnComplete (value:string) {
      this.request.code = value
      console.log('OTP completed: ', this.request.code === this.staticCode)
      this.disabled = !(this.request.code.length === 6)

      if (!this.disabled) {
        this.responseMessage = 'Your transaction has completed successfully.'
        this.responseStatus = 'success'
        this.showSnack = true

        setTimeout(() => {
          this.$router.push({ path: '/new-password', query: { email: this.email, code: this.request.code } })
        }, 1550)
      }
    }
  }
})
</script>

  <style>
  .otp-input {
    @apply w-14 h-16 transition-all duration-300 bg-transparent text-4xl font-semibold
    rounded-lg border border-[#E0E1E5] text-center
    focus-within:shadow-none focus-within:outline-none focus:shadow-none focus:outline-1 focus:outline-[#E0E1E5] focus:border-[#E0E1E5]
    dark:border-grey-dark-800 dark:text-grey-dark-100 mr-2
  }
  div[is-input-num="true"]>div:last-child{
    @apply [&>input]:mr-0
  }
  </style>
