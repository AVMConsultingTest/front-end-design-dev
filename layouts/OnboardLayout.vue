<template>
  <div class="w-full bg-sidebar-bg relative row mx-0 md:overflow-hidden">
    <div class="xl:col-4 sm:col-12 px-10 sweet-scroll">
      <nuxt-link to="/" class="mt-12 block">
        <img
          src="/images/Logo_White.png"
          class="max-h-8"
          alt="Nebuga GTS"
        >
      </nuxt-link>
      <div class="row items-stretch min-h-full md:p-10 md:pt-24">
        <div class="col-12">
          <div class="row flex-col transition-all">
            <div class="col-12 md:col-8 flex transition-all">
              <div class="row relative">
                <div class="col-12 mb-10 flex p-0">
                  <div
                    class="
                !w-[30px]
                !h-[30px]
                flex
                z-10
                items-center
                justify-center
                bg-green-400
                rounded-full"
                  >
                    <h6 v-show="currentStep < 3" :key="'text'" class="text-cinder font-medium">
                      1
                    </h6>

                    <svg
                      v-show="currentStep > 2"
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.8519 10.2723L0.373597 5.79388C-0.0169203 5.40335 -0.016916 4.77019 0.373607 4.37967L0.687862 4.06542C1.07839 3.67489 1.71157 3.6749 2.10209 4.06543L4.8519 6.81536L11.0588 0.608478C11.4493 0.217952 12.0825 0.217955 12.473 0.608484L12.7873 0.922751C13.1778 1.31328 13.1778 1.94644 12.7873 2.33696L4.8519 10.2723Z" fill="#0B0E17" />
                    </svg>
                  </div>
                  <div class="ml-4 col p-0 transition-all">
                    <span class="text-b-3 font-medium mb-2 text-green-400 !h-[30px] flex items-center"> Personal Info</span>
                    <transition name="slide">
                      <div v-if="currentStep < 3" class="text-c-1 font-medium text-gray-400 mb-2">
                      </div>
                    </transition>
                  </div>
                </div>
                <div class="col-12 flex p-0">
                  <div
                    class="
                !w-[30px]
                !h-[30px]
                transition-all
                z-10
                flex
                items-center
                justify-center
                rounded-full"
                    :class="[
                      {'border border-grey-dark-300 bg-sidebar-bg' : currentStep < 3},
                      {'bg-green-400' : currentStep > 2}
                    ]"
                  >
                    <h6
                      class="font-medium transition-all"
                      :class="[
                        {'text-grey-dark-300' : currentStep < 3},
                        {'text-cinder' : currentStep > 2}
                      ]"
                    >
                      2
                    </h6>
                  </div>
                  <div class="ml-4 col p-0">
                    <span
                      class="text-b-3 font-medium !h-[30px] flex items-center mb-2"
                      :class="[
                        {'text-grey-dark-300' : currentStep < 3},
                        {'text-green-400' : currentStep > 2}
                      ]"
                    >
                      Company Info
                    </span>
                    <transition name="slide">
                      <div v-if="currentStep > 2" class="text-c-1 font-medium text-gray-400 mb-2">
                      </div>
                    </transition>
                  </div>
                </div>
                <div
                  class="step-border border-l border-l-[#94A3B6]/50 border-dashed absolute top-[30px]
                bottom-[30px] left-[.95rem]"
                  :class="{'bottom-[100px]': currentStep > 2}"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 flex items-end mb-12">
          <div class="row bg-mirage rounded-2xl flex items-center p-6">
            <div class="w-20 h-20 relative mb-4 p-0  transition-all">
              <svg class="w-20 h-20 transition-all" style="transform: rotate(270deg);">
                <circle
                  class="text-[#474A53] transition-all"
                  stroke-width="5"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="40"
                  cy="40"
                />
                <circle
                  class="text-green-600 transition-all"
                  stroke-width="5"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="circumference - percent / 100 * circumference"
                  stroke-linecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="40"
                  cy="40"
                />
              </svg>
              <span class="absolute text-c-1 font-medium text-white svg-per  transition-all">{{ percent }}%</span>
            </div>
            <div class="col-12">
              <span class="text-b-4 font-medium text-white">About to complete onboarding</span>
            </div>
            <div class="col-12">
              <span class="text-c-1 font-medium text-gray-400 mb-2">
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xl:col-8 sm:col-12 rounded-tl-[32px] rounded-bl-[32px] bg-white md:overflow-hidden">
      <div class="row h-full items-stretch  min-h-screen max-h-screen overflow-y-scroll sweet-scroll">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Onboard',
  middleware: 'secureAuth',
  data () {
    return {
      circumference: 30 * 2 * Math.PI
    }
  },
  computed: {
    currentStep () {
      return (this.$store.getters['onboard/currentStep'])
    },
    totalSteps () {
      return (this.$store.getters['onboard/totalSteps'])
    },
    percent () {
      const t = this.$store.getters['onboard/percent']
      return t
    }
  }
})
</script>
<style>
  @media screen and (max-wwidth:1024px) {
    body {
      overflow-y: hidden;

    }
  }
</style>
<style scoped>

  .svg-per {
    top: calc(50% - 9px);
    left: 2px;
    width: 80px;
    padding: 0 10px;
    text-align: center;
  }
</style>
