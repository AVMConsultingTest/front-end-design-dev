<template>
  <div class="flex items-center h-full" :class="{ 'rounded-lg border border-[#E0E1E5]': border }">
    <div
      class="
    w-9
    h-9
    min-w-[2.25rem]
    min-h-[2.25rem]
    max-w-[2.25rem]
    max-h-[2.25rem]
    rounded-full
    flex
    justify-center
    items-center
    border
    border-[#E0E1E5]"
      :class="`bg-${withBg ? color : 'none'}-100 ${withBg ? '!border-0' : null}`"
    >
      <img v-if="customIconSrc !== null" :src="customIconSrc" class="w-6 h-6">
      <Icon
        v-else
        :icon="icon"
        :color="color"
        :alpha="alpha"
        :variant="variant"
        class="w-6 h-6"
      />
    </div>
    <div class="ml-2">
      <div class="text-c-1 text-gray-800">
        <span :style="`font-weight:${fontweight}`">{{ value }}</span>
      </div>
      <div class="text-c-2 font-normal text-gray">
        <span>{{ title }}</span>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'InfoBox',
  props: {
    value: {
      type: [String, Number, Date],
      default: null
    },
    fontweight: {
      type: Number,
      default: 500
    },
    title: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      required: false,
      default: 'bulk'
    },
    color: {
      type: String,
      default: 'grey-dark'
    },
    alpha: {
      type: Number,
      default: 500
    },
    withBg: {
      type: Boolean,
      default: false
    },
    customIconSrc: {
      type: String,
      default: null
    }
  }
})
</script>

<style scoped>

</style>
