<template>
  <div :key="inputKey">
    <label :for="vName">
      <span
        v-if="label"
        class="font-medium text-b-4 mb-1 transition-all duration-200 flex items-center"
      >
        {{ label }}
      </span>
      <div class="input-container m-input flex items-center row mx-0 relative">

        <div class="tw-col-[120px] p-0">
          <m-select
            v-model="selectedCode"
            name="phoneCodes"
            wrapper-class="!border-none"
            container-class="!p-0"
            :options="codes"
          />
        </div>

        <ValidationProvider
          v-slot="{ errors }"
          mode="lazy"
          class="min-h-full flex col p-0 pr-[15px] h-full"
          :name="vName"
          :rules="rules"
        >
          <input
            v-model="vValue"
            :name="name"
            :value="vValue"
            :type="'text'"
            v-bind="$attrs"
            class="dark:border-grey-dark-800 my-auto w-full bg-transparent dark:text-grey-dark-100 p-0 h-9 border-none outline-none text-b-4 text-secondary"
            :placeholder="placeholder || ''"
            :class="[{ thin: thin }]"
            v-on="listeners"
          >
          <transition name="fade" mode="in-out">
            <span
              v-if="errors.length > 0"
              class="input-error mt-1 text-c-1 left-0 text-red font-medium flex items-center absolute whitespace-nowrap -bottom-6"
            >
              <Icon icon="close-circle" color="red" class="w-4 h-4 mr-2" />
              {{ errors[0] }}
            </span>
          </transition>
        </ValidationProvider>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import MSelect from './MSelect.vue'
import { SelectOption } from './ts/interfaces'

export default Vue.extend({
  name: 'PhoneInput',
  components: { MSelect },
  props: {
    name: {
      type: String,
      default: null
    } as PropOptions<string>,
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    thin: {
      type: Boolean,
      default: false
    },
    rules: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      codes: [
        {
          id: '+01',
          img: '/images/flags/united-states.svg',
          text: '+01',
          selected: true
        }
      ] as SelectOption[],
      touched: false,
      focused: false,
      inputKey: 0,
      selectedCode: ''
    }
  },
  computed: {
    vValue () {
      return this.value
    },
    vName ():string {
      // Convert camelCase to kebab-case
      // (e.g. 'firstName' to 'first-name')
      return this.name.replace(/([a-z](?=[A-Z]))/g, '$1 ').toLowerCase()
    },
    listeners (): Object {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus
      }
    }
  },
  mounted () {
    console.log('val:', this.vValue)
    this.$emit('input', this.vValue)
    setTimeout(() => {
      this.inputKey = Math.random()
    }, 1000)
  },
  methods: {
    onInput (evt: Event): void {
      if (!this.touched) {
        // Mark the input as touched
        this.touched = true
      }
      const target = evt?.target as HTMLInputElement
      if (target.value.length <= 14) {
        target.value = target.value.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        this.$emit('input', target.value)
      }
    },
    onFocus (evt: Event): void {
      this.focused = true
      this.$emit('focus', evt)
    },
    onBlur (evt: Event): void {
      this.focused = false
      this.$emit('blur', evt)
    }
  }
})
</script>

<style scoped>
.input-container:focus-within,
.input-container:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>
