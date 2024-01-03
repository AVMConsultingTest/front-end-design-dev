<template>
  <transition name="slide-down" mode="in-out">
    <div
      v-show="show"
      v-bind="$attrs"
      class="rounded bg-gradient-to-br min-h-[48px] flex items-center px-4 absolute top-6 left-16 right-16"
      :class="[
        {'from-[#4CC9B2] to-[#5CDC9D]': type === 'success'},
        {'from-[#F28787] to-[#F6C0C0]': type === 'error'},
      ]"
    >
      <Icon
        :icon="type === 'success' ? 'tick-circle' : 'close-circle'"
        color="white"
        :alpha="0"
        variant="linear"
        :disable-fill="true"
        class="w-5 h-5 mr-2"
      />
      <span class="text-c-1 font-semibold text-white">
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SnackBar',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'success'
    }
  }
})
</script>

<style scoped>

</style>
