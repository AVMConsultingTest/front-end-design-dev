<template>
  <div class="lg:w-8/12 w-full mx-auto lg:min-h-[650px] flex justify-center flex-col">
    <SnackBar :message="responseMessage" :type="responseStatus" :show="showSnack" />
    <div class="flex flex-col justify-end items-center" style="flex:.5">
      <h3 class="font-semibold mb-1 text-center">
        Forgot Password
      </h3>
    </div>
    <Form fclass="row my-8" style="flex:.5" @send="handleSubmit">
      <div class="col-12 mb-6">
        <Input
          v-model="request.email"
          name="email"
          type="email"
          label="E-mail Address"
          rules="required|email"
          :thin="true"
        />
      </div>
      <div class="col-12 mb-6">
        <Input
          v-model="request.password"
          name="password"
          type="password"
          label="Password"
          :thin="true"
        />
      </div>
      <div class="col-12 mb-6">
        <Input
          v-model="request.new_password"
          name="newPassword"
          type="password"
          label="New Password"
          :thin="true"
        />
      </div>

      <div class="col-12 mt-10">
        <Button
          :type="ButtonTypeEnum.GREEN"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.SUBMIT"
          :disabled="!validateEmail"
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
import type { AxiosResponse } from 'axios'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { ForgotPasswordModel } from '~/models/auth'
import { APIResponse } from '~/models/common/apiResponse'

interface PasswordChange {
  access_token: string;
  role: string;
  company_id: number | null
}

export default Vue.extend({
  name: 'ForgotPassword',
  layout: 'CenteredCard',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showSnack: false,
      responseMessage: '',
      responseStatus: '',
      request: {} as ForgotPasswordModel
    }
  },
  computed: {
    validateEmail ():boolean {
      const re = /\S+@\S+\.\S+/
      return re.test(this.request.email)
    }
  },
  created () {
    if (this.$route.query.status && this.$route.query.status === 'new') {
      setTimeout(() => {
        this.responseMessage = 'Please change your password before logging in'
        this.responseStatus = 'error'
        this.showSnack = true
      }, 1000)
      setTimeout(() => {
        this.showSnack = false
      }, 4000)
    }
  },
  methods: {
    async handleSubmit () {
      try {
        const response:PasswordChange = await this.$axios.$post('https://tranquil-everglades-96249-a8ea8630be21.herokuapp.com/api/v1/auth/change-password', this.request) // '/password/reset' kısmını kendi API endpointinizle değiştirin.
        this.responseMessage = 'Your password is updated'
        this.responseStatus = 'success'
        this.showSnack = true
        if (response.company_id === null) {
          setTimeout(() => {
            this.$router.push('/onboarding/personal')
          }, 2000)
        } else {
          setTimeout(() => {
            this.$router.push('/signin')
          }, 2000)
        }
      } catch (err) {
        if (err instanceof Error && err.message) {
          this.responseMessage = err.message
          this.responseStatus = 'error'
          this.showSnack = true
        } else {
          this.responseMessage = 'Bir sorun oluştu'
          this.responseStatus = 'error'
          this.showSnack = true
        }
        console.log('confirm err:', err)
      }
      setTimeout(() => {
        this.showSnack = false
      }, 2000)
    }
  }

})
</script>

  <style>
  </style>
