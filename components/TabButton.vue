<template>
  <div
    class="tab-button border border-transparent relative"
    :class="[
      { 'rounded-lg': !settingsStyle },
      { 'justify-center !border-grey-blue-100' : settingsStyle && !minimalStyle },
      { 'h-12': size === SizeTypeEnum.LG },
      { 'h-8': size === SizeTypeEnum.MD },
      { 'h-6': size === SizeTypeEnum.SM },
      { '!px-2': icon },
      { 'bg-white' : settingsStyle && !active },
      { 'bg-green-200': color === 'green' && active },
      { 'bg-purple-200': color === 'purple' && active },
      { 'bg-orange-200': color === 'orange' && active },
      { 'bg-blue-100': color === 'blue' && active },
      { 'bg-dark-blue': color === 'sky' && active },
      { '!border-[#E0E1E5] text-gray-400': !active && !settingsStyle && !minimalStyle },
      { '!bg-transparent border-0 !w-40 justify-center' : minimalStyle }
    ]"
    v-bind="active ? $attrs : null"
    @click="() => $emit('click')"
  >
    <div
      v-if="minimalStyle && active"
      class="absolute w-12 h-0.5 rounded-full left-1/2 right-1/2 bottom-0 -translate-x-1/2 bg-[#9CA2BA]"
    />
    <span
      v-if="icon !== null"
      class="rounded-lg flex items-center justify-center mr-2 border border-transparent transition-all duration-500"
      :class="[
        { 'bg-green-400': color === 'green' && active },
        { 'bg-purple-500': color === 'purple' && active },
        { 'bg-orange-600': color === 'orange' && active },
        { '!border-[#E0E1E5]': !active },
        { 'w-9 h-9': size === SizeTypeEnum.LG },
        { 'w-7 h-7': size === SizeTypeEnum.MD },
        { 'w-5 h-5': size === SizeTypeEnum.SM },
      ]"
    >
      <Icon
        :icon="icon"
        :color="active ? '#1C1F27' : 'gray'"
        :alpha="iconAlpha"
        :class="[
          { 'w-6 h-6': size === SizeTypeEnum.LG },
          { 'w-4 h-4': size === SizeTypeEnum.MD },
          { 'w-2 h-2': size === SizeTypeEnum.SM },
        ]"
      />
    </span>

    <span
      class="text-b-3 transition-all"
      :class="[
        {'p-5': !icon && !settingsStyle},
        {'!text-b-4 !font-medium text-gray-800 px-4 py-2.5': !active && settingsStyle},
        {'!text-b-4 !font-bold text-gray-800 px-4 py-2.5': active && settingsStyle},
        {'!text-b-4 !font-medium !text-[#9CA2BA] !p-0': !active && minimalStyle},
        {'!text-b-4 !font-semibold text-gray-800 !p-0': active && minimalStyle},
        {'font-bold !text-white': active && color === 'sky'},
        { 'pr-5': icon },
        {'font-medium': active},
        {'font-normal': !active},
      ]"
    >
      {{ title }}
    </span>
    <template v-if="selectable">
      <div
        v-tooltip="`${isDefault ? 'Default Tab' : 'Set Default Tab'}`"
        v-click-outside="() => { opened = false }"
        class="cursor-pointer"
        @click="() => { opened = !opened }"
      >
        <transition name="slide">
          <div v-if="opened" class="z-10 absolute top-11 rounded-lg bg-white left-0 right-0 col-auto shadow-2xl">
            <div
              class="flex justify-between items-center"
              @click="setDefault()"
            >
              <div
                class=" px-4 py-5 col-auto h-full overflow-auto sidebar-scroll"
              >
                Set Default
              </div>
              <div v-if="isDefault" class="flex">
                <Icon
                  icon="tick-circle"
                  variant="linear"
                  color="blue"
                  :disable-fill="true"
                  class="w-6 h-6 mr-2 items-center justify-between cursor-pointer"
                />
              </div>
            </div>
          </div>
        </transition>
        <Icon :icon="isDefault ? 'more-2' : 'more'" :color="isDefault ? 'gray' :'grey-dark'" :alpha="isDefault ? 500 : 100" :disable-fill="false" class="w-4 h-4 rotate-90" />
      </div>
      <Modal ref="modal" content-class="w-6/12">
        <div slot="body" class="row flex items-center justify-center pt-7 px-2">
          <div class="col-12 flex items-center justify-center my-0">
            <h4 class="font-semibold text-start mb-2">
              Are you sure you want to choose it as default?
            </h4>
          </div>
          <div class="col-8 mb-14 mt-14">
            <Button
              class="flex"
              :type="ButtonTypeEnum.GREEN"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              @click="setDefault()"
            >
              Yes
            </Button>
            <Button
              class="flex mt-4 "
              :type="ButtonTypeEnum.SECONDARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              @click="hideModal()"
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { SizeType } from './ts/types'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
export default Vue.extend({
  name: 'TabButton',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: SizeTypeEnum.LG
    } as PropOptions<SizeType>,
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
    settingsStyle: {
      type: Boolean,
      default: false
    },
    minimalStyle: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false
    },
    isDefault: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      opened: false,
      generateActions: [
        'Set Default'
      ]
    }
  },
  methods: {
    openModal () {
      // (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
      (this.$refs.modal as Vue & { showModal: () => Element }).showModal()
    },
    hideModal (): void {
      (this.$refs.modal as Vue & { hideModal: () => Function }).hideModal()
    },
    setDefault (): void {
      this.$emit('select-method')
      this.hideModal()
    }
  }
})
</script>

<style>
.tab-button {
  @apply flex items-center font-medium cursor-pointer transition-all duration-500 shadow-transparent;
}
</style>
