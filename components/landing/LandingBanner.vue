<template>
  <div>
    <div
      class="bg-landing relative"
      :class="[
        { 'h-[30rem]' : !big },
        { 'h-[21.25rem]' : big }
      ]"
    >
      <div
        class="banner-text absolute flex justify-center items-center flex-col z-10 mt-24"
        :class="[
          { 'top-0 bottom-0 left-0 right-0': !big },
          { 'bottom-16 left-0 right-0': big }
        ]"
      >
        <div class="xl:col-6 lg:col-6 col-10 my-0 mx-auto flex justify-center items-center flex-col">
          <h6
            v-if="tag.length > 0"
            class="border rounded-2xl !border-[#344159] items-center py-1 px-3 bg-[#344159] font-medium text-[0.875rem] mb-5 leading-5 text-center text-[#98A2B3]"
          >
            {{ tag }}
          </h6>
          <h1 class="font-normal text-32 xl:text-[40px] lg:text-[40px] text-center text-white">
            {{ title }}
          </h1>
          <h5 class=" text-18  xl:text-xl font-normal mt-6 text-center text-[#98A2B3]">
            {{ subTitle }}
          </h5>
        </div>
      </div>
    </div>
    <div v-if="big" class="relative">
      <div class="xl:h-[15.75rem] lg:h-[15.75rem] h-auto bg-landing lg:absolute relative xl:absolute left-0 right-0 top-0 -z-10" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LandingBanner',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    big: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>

</style>
