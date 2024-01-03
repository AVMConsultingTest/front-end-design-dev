<template>
  <div class="w-full flex items-center justify-between">
    <div>
      <span v-tooltip="hint" class="text-secondary text-b-3 font-medium flex items-center cursor-pointer 2xl:text-2xl dark:text-white" :title="hint">
        <nuxt-link v-if="link" :to="link">
          {{ title }}
        </nuxt-link>
        <template v-else>
          {{ title }}

        </template>
        <Icon
          icon="info-circle"
          color="grey-dark"
          :alpha="400"
          :disable-fill="true"
          class="ml-2 w-4 h-4 hidden"
        />
      </span>
    </div>
    <nuxt-link v-if="link" :to="link" class="text-gray-400 text-c-1 font-medium dark:text-white">
      Go to Details
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    link: {
      type: String,
      default: null
    },
    hint: {
      type: String,
      default: null
    }
  }
})
</script>

<style scoped>

</style>
