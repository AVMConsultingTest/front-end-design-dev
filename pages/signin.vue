<template>
  <div>
    <div class="lg:w-8/12 w-full mx-auto lg:min-h-[650px] flex justify-center flex-col">
      <SnackBar :message="responseMessage" :type="responseStatus" :show="showSnack" />
      <div class="my-10 flex flex-col justify-center items-center" style="flex:.5">
        <h3 class="font-semibold mb-1  text-center">
          Log In
        </h3>
      </div>
      <Form fclass="row my-8" style="flex:.5" @send="submit">
        <div class="col-12 mb-6">
          <Input
            v-model="email"
            name="email"
            type="email"
            label="E-mail Address"
            rules="required|email"
            placeholder="Enter your e-mail address"
            :thin="true"
          />
        </div>
        <div class="col-12 mb-6">
          <Input
            v-model="password"
            vid="password"
            name="password"
            :type="showPasswordType"
            label="Password"
            rules="required"
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

        <div class="col-12 flex justify-end mb-12">
          <nuxt-link to="/forgot-password" class="text-c-1 font-semibold text-gray-400">
            Forgot Password
          </nuxt-link>
        </div>
        <div class="col-12 mt-0">
          <Button
            :type="ButtonTypeEnum.GREEN"
            :size="SizeTypeEnum.LG"
            :action="ActionTypeEnum.SUBMIT"
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import type { AxiosError } from 'axios'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { SignInModel } from '~/models/auth'
import { APIResponse } from '~/models/common/apiResponse'

export default Vue.extend({
  name: 'SignIn',
  layout: 'CenteredCardSecure',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showPasswordType: 'password',
      request: {} as SignInModel,
      showSnack: false,
      responseMessage: '',
      responseStatus: '',
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      // setToken: (action, token) => action('setIdtoken', token),
      // setRefreshToken: (action, token) => action('setRefreshToken', token),
      // setSecretKey: (action, token) => action('setSecretKey', token),
      secureLogin: (action, param) => action('secureLogin', param),
      setTokenLogin: (action, token) => action('SetLoginIdToken', token),
      login: (action, token) => action('loginNew', token)
    }),
    // api çalışınca sadece username yi email formatına çevir
    handleSubmit () {
      debugger
      if (this.username === 'dev_admin' && this.password === 'YQ54T896GJSG!47') {
        this.secureLogin({ name: this.username, pwd: this.password })
      } else {

        this.login({ email: this.username, password: this.password })
      }
      // this.$auth.loginWith('oauth2')
      // window.location.href = 'https://stms-backend.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=417f1huokr5pfdo52c0b2s7r13&scope=TMSBackendResourceServer%2F*&redirect_uri=https://nebulagts.com/dashboard'
    },
    showPassword () {
      this.showPasswordType = this.showPasswordType === 'password' ? 'text' : 'password'
    },
    // signIn () {
    //   login(this.username, this.password)
    //     .then((data) => {
    //       console.log('Authentication successful:', data)
    //       if (data?.AuthenticationResult?.IdToken) {
    //         this.setToken(data.AuthenticationResult.IdToken)
    //         this.setSecretKey(data.AuthenticationResult.AccessToken)
    //         this.setRefreshToken(data.AuthenticationResult.RefreshToken)
    //       }
    //     })
    //     .catch((err:unknown) => {
    //       console.log('Authentication error:', err)
    //       alert(err)
    //     })
    // },
    submit () {
      debugger
      this.login({ email: this.email, password: this.password })
        .catch((err:AxiosError<APIResponse>) => {
          if (err.response?.data.message && err.response?.data.message === 'Please change your password before logging in') {
            this.$router.push('/forgot-password?status=new')
          }
          console.log(err.response)
          this.responseMessage = err.response?.data.message || 'An error occured'
          this.responseStatus = 'error'
          this.showSnack = true
          setTimeout(() => {
            this.showSnack = false
          }, 2000)
        })
    }
  }
})
</script>

  <style>
  </style>
