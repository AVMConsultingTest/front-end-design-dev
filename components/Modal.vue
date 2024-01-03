<template>
  <transition name="fade" mode="in-out">
    <div
      v-if="show"
      class="m-modal-overlay z-10"
      :class="[
        {'items-start' : position === 'top'},
        {'items-center' : position === 'center'},
        {'items-end' : position === 'bottom'},
      ]"
    >
      <div
        v-click-outside="()=> show = false"
        class="m-modal-content"
        :class="[
          {'w-3/5' : size === SizeTypeEnum.LG},
          {'w-2/3' : size === SizeTypeEnum.MD},
          {'w-2/5' : size === SizeTypeEnum.SM},
          contentClass,
        ]"
      >
        <div v-show="$slots.header" class="m-modal-header border border-b-grey-blue-300">
          <slot name="header" />
        </div>
        <div class="m-modal-body p-5" v-bind="$attrs">
          <slot name="body" />
        </div>
        <div v-show="$slots.footer" class="m-modal-footer border border-t-grey-blue-300">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { SizeTypeEnum } from './ts/enums'
import { SizeType } from './ts/types'
export default Vue.extend({
  name: 'Modal',
  props: {
    size: {
      type: String,
      default: 'md'
    } as PropOptions<SizeType>,
    position: {
      type: String,
      default: 'center'
    },
    contentClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      SizeTypeEnum,
      show: false
    }
  },
  methods: {
    showModal () {
      this.show = true
    },
    hideModal () {
      this.show = false
    }
  }
})
</script>

<style>
.m-modal-overlay {
    @apply bg-dark/80 fixed bottom-0 left-0 right-0 top-0 flex justify-center;
}
.m-modal-content {
    @apply bg-white rounded-3xl shadow-2xl relative overflow-hidden;
}
</style>
