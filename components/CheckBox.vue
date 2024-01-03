<template>
  <div class="m-checkbox cursor-pointer">
    <ValidationProvider
      v-slot="{ errors }"
      mode="lazy"
      class="relative"
      :name="vName"
      :rules="rules"
    >
      <label :for="cbId" class="">
        <div class="relative flex items-center">
          <input
            :id="cbId"
            v-model="model"
            class="check-input rounded transition-all duration-150 bg-transparent dark:!border-grey-dark-800"
            :class="[
              {'w-6 h-6': size === SizeTypeEnum.LG},
              {'w-5 h-5': size === SizeTypeEnum.MD},
              {'w-4 h-4': size === SizeTypeEnum.SM},
            ]"
            type="checkbox"
            :value="$attrs.value"
            :disabled="disabled"
            :style="`border-color:${
              !checked ? borderColor : iconColor
            }; color:${iconColor}`"
            @change="$emit('change')"
          >
          <div class="ml-2 text-c-1 dark:text-grey-dark-100">
            <slot />
          </div>
          <transition name="fade" mode="in-out">
            <span v-if="errors.length > 0" class="input-error mt-1 text-c-1 text-red font-medium flex items-center absolute whitespace-nowrap -bottom-6">
              <Icon
                icon="close-circle"
                color="red"
                class="w-4 h-4 mr-2"
              />
              {{ errors[0] }}
            </span>
          </transition>
        </div>
      </label>
    </ValidationProvider>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import resolveConfig from 'tailwindcss/resolveConfig'
import { Config } from 'tailwindcss'
import tailwindConfig from '../tailwind.config'
import { SizeTypeEnum } from './ts/enums'
import { SizeType } from './ts/types'
const fConfig = resolveConfig(tailwindConfig as Config)

export default Vue.extend({
  name: 'CheckBox',
  model: {
    prop: 'checked'
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'green'
    },
    inactiveBorderColor: {
      type: String,
      default: 'grey-blue'
    },
    size: {
      type: String,
      default: SizeTypeEnum.MD
    } as PropOptions<SizeType>
  },
  data () {
    return {
      SizeTypeEnum,
      cbId: '',
      touched: false,
      fullConfig: fConfig
    }
  },
  computed: {
    model: {
      get (): boolean {
        return this.checked
      },
      set (check: boolean): void {
        if (!this.touched) {
          this.touched = true
        }
        this.$emit('input', check)
      }
    },
    borderColor (): string {
      const theme = this.fullConfig.theme as any
      const color: string = theme.colors[this.inactiveBorderColor][400]
      return color
    },
    iconColor (): string {
      const theme = this.fullConfig.theme as any
      const color: string = theme.colors[this.color][400]
      return color
    },
    vName ():string {
      return this.name.replace(/([a-z](?=[A-Z]))/g, '$1 ').toLowerCase()
    }
  },
  mounted () {
    this.cbId = Math.random().toString(16).slice(2)
  }
})
</script>
