<template>
  <div class="lg:w-8/12 w-full mx-auto lg:min-h-[650px] flex justify-center flex-col">
    <div class="flex flex-col justify-center items-center" style="flex:.5">
      <h3 class="font-semibold mb-1  text-center">
        Log In
      </h3>
    </div>
    <Form fclass="row my-8" style="flex:.5" @send="handleSubmit">
      <div class="col-12 mb-6">
        <Input
          v-model="request.name"
          name="user"
          type="text"
          label="User"
          placeholder="Enter your username"
          :thin="true"
        />
      </div>
      <div class="col-12 mb-6">
        <Input
          v-model="request.pwd"
          vid="password"
          name="password"
          :type="showPasswordType"
          label="Password"
          placeholder="At least 8 characters"
          :thin="true"
        />
      </div>

      <div class="col-12 mt-10">
        <Button
          :type="ButtonTypeEnum.GREEN"
          :size="SizeTypeEnum.LG"
          :action="ActionTypeEnum.SUBMIT"
        >
          Log In
        </Button>
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
import { StaticSecure } from '~/models/staticSecure'
export default Vue.extend({
  name: 'SecureSignIn',
  layout: 'CenteredCardSecure',
  transition: 'page-left',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showPasswordType: 'password',
      request: {} as StaticSecure
    }
  },
  methods: {
    handleSubmit () {
      console.log(this.request)
      this.secureLogin(this.request)
    },
    showPassword () {
      console.log('shw pw')
      this.showPasswordType = this.showPasswordType === 'password' ? 'text' : 'password'
    },
    ...mapActions({
      secureLogin: (action, param) => action('secureLogin', param)
    })
  }
})
</script>
