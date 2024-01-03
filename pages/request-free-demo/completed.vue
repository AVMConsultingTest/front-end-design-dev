<template>
  <div class="w-full min-h-screen max-h-screen flex overflow-hidden">
    <div class="tw-col-[55%] max-md:tw-col-[100%] items-stretch">
      <div class="m-10 max-md:mb-2">
        <nuxt-link to="/">
          <img
            src="/images/Logo_White.png"
            class="max-h-10"
            alt="Nebuga GTS"
          >
        </nuxt-link>
      </div>
      <div class="h-full sweet-scroll overflow-y-scroll">
        <div>
          <div class="px-40 pt-40 max-md:px-5 flex flex-col items-center max-md:text-center">
            <div
              class="w-[120px] h-[120px] my-5 bg-green-400 rounded-full flex justify-center items-center"
            >
              <Icon
                icon="check"
                color="white"
                variant="linear"
                class="w-14 h-14"
                :disable-fill="true"
              />
            </div>
            <h3 class="font-semibold dark:text-white mb-1">
              Thank you for your request.
            </h3>
            <div class="col-4 mt-4 max-md:col-6">
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.MD"
                :action="ActionTypeEnum.BUTTON"
                @click="()=> $router.push('/')"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-col-[45%] max-md:tw-col-[100%] max-md:absolute max-md:h-full">
      <img
        src="/images/demo_pic.png"
        class="w-full h-full object-cover"
        alt="Demo Picture"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '../../components/ts/enums'

export default Vue.extend({
  name: 'Completed',
  transition: 'page-left',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum
    }
  }
})
</script>

<style scoped></style>
