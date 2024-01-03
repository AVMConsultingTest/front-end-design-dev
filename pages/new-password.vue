<template>
  <div class="lg:w-8/12 w-full mx-auto lg:min-h-[650px] flex justify-center flex-col">
    <SnackBar :message="responseMessage" :type="responseStatus" :show="showSnack" />
    <div class="flex flex-col justify-end items-center" style="flex:.5">
      <h3 class="font-semibold mb-1 text-center">
        New Password
      </h3>
      <span class="font-medium text-b-4 text-gray mb-3 text-center">
        Create a new password
      </span>
    </div>
    <Form fclass="row my-8" style="flex:.5" @send="handleSubmit">
      <div class="col-12 mb-6">
        <Input
          v-model="request.password"
          vid="password"
          name="password"
          :type="showPasswordType"
          label="Password"
          min-length="8"
          rules="required|min:8"
          placeholder="At least 8 characters"
          :thin="true"
        >
          <Icon
            slot="addonRight"
            :icon="showPasswordType === 'password' ? 'eye-slash' : 'eye'"
            variant="linear"
            color="gray"
            :alpha="400"
            class="w-4 h-4 cursor-pointer"
            :disable-fill="true"
            @click.native="showPassword"
          />
        </Input>
      </div>
      <div class="col-12 mb-6">
        <Input
          v-model="request.confirmPassword"
          name="confirm Password"
          :type="showConfirmPasswordType"
          label="Verify Password"
          min-length="8"
          rules="required|min:8|confirmed:password"
          placeholder="At least 8 characters"
          :thin="true"
        >
          <Icon
            slot="addonRight"
            :icon="showConfirmPasswordType === 'password' ? 'eye-slash' : 'eye'"
            variant="linear"
            color="gray"
            :alpha="400"
            class="w-4 h-4 cursor-pointer"
            :disable-fill="true"
            @click.native="showConfirmPassword"
          />
        </Input>
      </div>
      <div class="col-12 mt-10">
        <Button
          :type="ButtonTypeEnum.GREEN"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.SUBMIT"
        >
          Reset Password
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
import { NewPasswordModel } from '~/models/auth'
import { confirmPassword } from '~/services/auth'

export default Vue.extend({
  name: 'NewPassword',
  components: { SnackBar },
  layout: 'CenteredCard',
  transition: 'page-right',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showPasswordType: 'password',
      showConfirmPasswordType: 'password',
      request: {} as NewPasswordModel,
      responseMessage: '',
      responseStatus: '',
      showSnack: false,
      email: '',
      verificationCode: ''
    }
  },
  created () {
    if (this.$route.query.email) {
      this.email = this.$route.query.email as string
    }
    if (this.$route.query.code) {
      this.verificationCode = this.$route.query.code as string
    }
  },
  methods: {
    handleSubmit () {
      console.log(this.request, this.email, this.verificationCode)
      confirmPassword(this.email, this.verificationCode, this.request.password)
        .then((response) => {
          console.log('forgot res:', response)
          this.$router.push('/signin')
        })
        .catch((err) => {
          if (err?.message) {
            this.responseMessage = err.message
            this.responseStatus = 'error'
            this.showSnack = true
          } else {
            this.responseMessage = 'Something went wrong'
            this.responseStatus = 'error'
            this.showSnack = true
          }
          console.log('confirm err:', err)
          setTimeout(() => {
            this.showSnack = false
          }, 2000)
        })
      // this.$router.push('/signin')
    },
    showPassword () {
      console.log('shw pw')
      this.showPasswordType = this.showPasswordType === 'password' ? 'text' : 'password'
    },
    showConfirmPassword () {
      console.log('shw pw')
      this.showConfirmPasswordType = this.showConfirmPasswordType === 'password' ? 'text' : 'password'
    }
  }
})
</script>

  <style>
  </style>
