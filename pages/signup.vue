<template>
  <div class="lg:w-8/12 w-full mx-auto xl:min-h-[650px] flex justify-center flex-col">
    <div class="mt-20 flex flex-col justify-center items-center" style="flex:.5">
      <h3 class="font-semibold mb-1 text-center">
        Sign Up Now
      </h3>
    </div>
    <Form
      ref="signUpForm"
      fclass="row my-8"
      style="flex: 0.5"
      @send="handleSubmit"
    >
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
      <div class="col-12 mb-6">
        <Input
          v-model="request.confirmPassword"
          name="confirm Password"
          :type="showConfirmPasswordType"
          label="Password (Confirm)"
          rules="required|confirmed:password"
          placeholder="Please confirm your password"
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
      <div class="col-12 mt-4">
        <check-box v-model="request.agreed" :value="request.agreed">
          I agree to receive communication from <strong>Nebula</strong>
        </check-box>
      </div>
      <div class="col-12 mt-10">
        <Button
          :type="ButtonTypeEnum.GREEN"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.SUBMIT"
        >
          Sign Up
        </Button>
      </div>
    </Form>
    <div class="flex justify-center items-end" style="flex: 0.5">
      <div class="text-c-1 text-gray-400">
        Already have a Nebula account?
      </div>
      <nuxt-link
        to="/signin"
        class="ml-1 text-c-1 font-semibold text-green-400"
      >
        Sign In
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '../components/ts/enums'
import { SignUpModel } from '../models/auth'
export default Vue.extend({
  name: 'SignUp',
  layout: 'CenteredCard',
  transition: 'page-right',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showPasswordType: 'password',
      showConfirmPasswordType: 'password',
      request: {} as SignUpModel,
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit () {
      console.log(this.request)
      this.$router.push('/onboarding/personal')
    },
    showPassword () {
      console.log('shw pw')
      this.showPasswordType =
        this.showPasswordType === 'password' ? 'text' : 'password'
    },
    showConfirmPassword () {
      console.log('shw pw')
      this.showConfirmPasswordType =
        this.showConfirmPasswordType === 'password' ? 'text' : 'password'
    }
  }
})
</script>

<style></style>
