<template>
  <component
    :is="tag"
    :disabled="disabled"
    :type="action"
    class="m-btn"
    :class="[
      { 'text-white bg-[#192038] hover:bg-tuna': primary},
      { 'text-[#192038] bg-white border border-[#192038] hover:border-tuna': secondary},
      { 'text-[#192038] bg-green-400 hover:bg-green-800': green},
      { 'text-grey-dark-200 bg-transparent ': link},
      { 'text-grey-dark-100 bg-grey-blue-200': disabled },
      { 'h-14 text-b-3': size === SizeTypeEnum.LG },
      { 'h-12 text-b-4': size === SizeTypeEnum.MD },
      { 'h-10 text-c-1': size === SizeTypeEnum.SM },
      { disabled: disabled && tag !== 'button' }
    ]"
    @click="handleClick"
  >
    <slot name="icon-before" />
    <slot />
    <slot name="icon" />
  </component>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ActionTypeEnum, ButtonTypeEnum, SizeTypeEnum } from './ts/enums'
import { ActionType, ButtonType, SizeType } from './ts/types'

export default Vue.extend({
  name: 'Button',
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    action: {
      type: String,
      default: ActionTypeEnum.BUTTON
    } as PropOptions<ActionType>,
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ButtonTypeEnum.PRIMARY
    } as PropOptions<ButtonType>,
    nativeType: {
      type: String,
      default: 'button'
      // description: 'Button native type (e.g button, input etc)'
    },
    size: {
      type: String,
      default: 'md'
      // description: 'Button size (sm|md|lg)'
    } as PropOptions<SizeType>
  },
  data () {
    return {
      SizeTypeEnum
    }
  },
  computed: {
    primary (): boolean {
      return this.type === ButtonTypeEnum.PRIMARY && !this.disabled
    },
    secondary (): boolean {
      return this.type === ButtonTypeEnum.SECONDARY && !this.disabled
    },
    green (): boolean {
      return this.type === ButtonTypeEnum.GREEN && !this.disabled
    },
    link (): boolean {
      return this.type === ButtonTypeEnum.LINK && !this.disabled
    }
  },
  methods: {
    handleClick (evt: Event) {
      this.$emit('click', evt)
    }
  }
})

</script>
<style>
.m-btn {
  @apply w-full text-center rounded-lg font-medium  transition-all duration-500 flex items-center justify-center;
}
</style>
