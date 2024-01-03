<template>
  <span
    class="badge"
    :class="[
      {'h-10': size === SizeTypeEnum.LG},
      {'h-8': size === SizeTypeEnum.MD},
      {'h-6': size === SizeTypeEnum.SM},
      {'!pl-[13px]': icon},
    ]"
    v-bind="$attrs"
  >
    <Icon
      v-if="icon && !rightIcon"
      :icon="icon"
      :color="iconColor"
      :alpha="iconAlpha"
      :variant="iconVariant"
      class="mr-2"
      :class="[
        {'w-6 h-6': size === SizeTypeEnum.LG},
        {'w-4 h-4': size === SizeTypeEnum.MD},
        {'w-2 h-2': size === SizeTypeEnum.SM},
        iconClass]"
    />
    {{ title }}
    <Icon
      v-if="icon && rightIcon"
      :icon="icon"
      :color="iconColor"
      :alpha="iconAlpha"
      :variant="iconVariant"
      class="ml-2"
      :class="[
        {'w-6 h-6': size === SizeTypeEnum.LG},
        {'w-4 h-4': size === SizeTypeEnum.MD},
        {'w-2 h-2': size === SizeTypeEnum.SM},
        iconClass]"
    />
  </span>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { SizeTypeEnum } from './ts/enums'
import { SizeType } from './ts/types'

export default Vue.extend({
  name: 'Badge',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    size: {
      type: String,
      default: SizeTypeEnum.MD
    } as PropOptions<SizeType>,
    icon: {
      type: String,
      default: null
    },
    rightIcon: {
      type: Boolean,
      default: false
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
    iconClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      SizeTypeEnum
    }
  }
})
</script>

<style>
.badge {
  @apply  flex items-center rounded-full font-medium text-sm px-6 cursor-pointer transition-all duration-500 shadow-transparent whitespace-nowrap;
}
</style>
