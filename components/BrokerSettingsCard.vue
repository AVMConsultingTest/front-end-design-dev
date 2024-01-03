<template>
  <div class="h-full card widget group relative shadow-2xl shadow-[#BDBDBD]/30 border border-gray-300 hover:shadow-2xl hover:shadow-[#BDBDBD]/30 dark:shadow-none dark:border-grey-dark-800">
    <div class="p-5">
      <div class="flex flex-row mb-8">
        <div :class="iconContainerClass">
          <Icon
            :icon="icon"
            :variant="iconVariant"
            :color="iconColor"
            :alpha="iconAlpha"
            class="w-6 h-6"
          />
        </div>
        <div class="flex items-center justify-center ml-3">
          <h6 class="font-semibold">
            {{ title }}
          </h6>
        </div>
      </div>
      <div class="text-b-4 h-12">
        {{ body }}
      </div>
    </div>
    <hr class="w-full">
    <div class="p-5">
      <div class="flex flex-row">
        <div class="avatars -space-x-6 overflow-hidden">
          <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
          <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
          <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
          <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
          <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
          <img class="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="/images/Ellipse_49.png" alt="driver">
        </div>
        <div class="flex items-center justify-end ml-auto hover:cursor-pointer" @click="viewTeam">
          <span class="text-b-4 text-grey-dark-100">View Team</span>
          <Icon
            icon="arrow-right"
            variant="linear"
            color="grey-dark"
            :alpha="300"
            class="w-5 h-"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'BrokerSettingsCard',
  props: {
    iconContainerClass: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconColor: {
      type: String,
      default: null
    },
    iconAlpha: {
      type: Number,
      default: 500
    },
    iconVariant: {
      type: String,
      default: 'outline'
    },
    iconFill: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    body: {
      type: String,
      default: null
    }

  },
  methods: {
    viewTeam () {
      this.$router.push('/broker/dashboard/settings/team-settings/team')
    }
  }
})
</script>

<style>
.widget {
  @apply flex flex-col bg-white rounded-xl transition-all duration-500 hover:border-transparent dark:bg-[#21293B]
}
.widget .card-header {
  @apply  flex  pt-6 px-6;
}
.widget .card-header .card-header-title {
  @apply font-medium flex items-start dark:text-white;
}
.widget .card-header .card-header-icon {
  @apply w-9 h-9 min-h-[36px] min-w-[36px] flex items-center justify-center mr-4 rounded-full;
}
.widget .card-body {
  @apply  px-6 py-4 relative;
}
.widget .goto {
  @apply  cursor-pointer transition-all duration-300 absolute w-12 h-12 bottom-4 right-4
        bg-green-400 flex items-center justify-center opacity-0 z-[2] rounded-full
}

</style>
