<template>
  <ValidationProvider
    v-slot="{ errors }"
    class="relative"
    :name="vName"
    :rules="rules"
  >
    <label :for="name" class="relative">
      <span
        v-if="label"
        class="font-medium text-b-4 mb-1 transition-all duration-200 flex items-center"
        :class="[
          {'text-secondary dark:text-grey-dark-100' : !value || value.toString().length == 0 },
          {'text-gray-400 dark:text-grey-dark-400' : value && value.toString().length > 1 },
        ]"
      >{{ label }}
        <span v-if="hint" v-tooltip="hint" class="ml-2 cursor-pointer" :title="hint">
          <Icon
            icon="info-circle"
            color="grey-dark"
            :alpha="200"
            class="w-4 h-4"
            :disable-fill="true"
          />
        </span>
      </span>
      <div class="relative" :class="[{ 'm-icon-container' : $slots.addonLeft }, { '!rounded-full' : rounded }]">
        <slot name="addonLeft" />
        <component
          :is="textArea ? 'textarea' : 'input'"
          v-model="vValue"
          :name="name"
          :value="vValue"
          :type="type === 'datetime-local' ? 'date' : type"
          :disabled="disabled"
          v-bind="$attrs"
          :placeholder="placeholder || ''"
          class="text-b-4 text-secondary min-h-[48px]"
          :class="[
            { 'm-icon-input': $slots.addonLeft },
            { 'm-input': !$slots.addonLeft && !minimal },
            { 'm-minimal': !$slots.addonLeft && minimal },
            {'bg-[#E0E1E5] border-[#E0E1E5] dark:border-grey-dark-800 dark:bg-grey-dark-800' : disabled},
            {'thin' : thin},
          ]"
          :style="inputStyle || ''"
          v-on="listeners"
        />
        <div class="absolute top-4 right-4">
          <slot name="addonRight" @click.native="addonRightOnClick" />
        </div>
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
    </label>
  </ValidationProvider>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
export default Vue.extend({
  name: 'Input',
  props: {
    // input type
    // (e.g. 'text', 'email', 'password', 'number', 'date', 'datetime-local')
    type: {
      type: String,
      default: 'text'
    },
    // input value
    value: {
      type: [String, Number],
      default: null
    },
    // label text to be displayed
    // (e.g. 'Email')
    label: {
      type: String,
      default: null
    },
    // hint text to be displayed
    // (e.g. 'Enter your email')
    hint: {
      type: String,
      default: null
    },
    // input name
    // (e.g. 'email')
    name: {
      type: String,
      default: ''
    },
    // placeholder text to be displayed
    // when the input is empty
    // (e.g. 'Enter your email')
    placeholder: {
      type: String,
      default: null
    },
    // validation
    // (e.g. 'required|email')
    rules: {
      type: String,
      default: null
    },
    // if true, the input will be disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // if true, the input will be rendered with a thin border
    thin: {
      type: Boolean,
      default: false
    },
    // custom style to be applied to the input
    // (e.g. 'width: 100%')
    inputStyle: {
      type: String,
      default: null
    },
    // if true, the input will be
    // rendered with rounded corners
    rounded: {
      type: Boolean,
      default: false
    },
    // if true, the input will be rendered as a textarea
    textArea: {
      type: Boolean,
      default: false
    },
    // if true, the input will be
    // rendered with a minimal style
    minimal: {
      type: Boolean,
      default: false
    },
    // debounce timer in milliseconds
    // if set to 0, no debounce will be applied
    debounceTimer: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      focused: false,
      touched: false,
      anyInput: false,
      timeout: null,
      debouncedInput: ''
    }
  },
  computed: {
    // listeners to be passed to the input
    // (e.g. v-on="$listeners")
    listeners (): Object {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus
      }
    },
    vValue () {
      if (this.type === 'datetime-local') {
        // Show the date in the local timezone
        // (e.g. 2021-01-01 12:00)
        return moment(this.value).format('yyyy-MM-DD')
      } else {
        return this.value
      }
    },
    vName ():string {
      // Convert camelCase to kebab-case
      // (e.g. 'firstName' to 'first-name')
      return this.name.replace(/([a-z](?=[A-Z]))/g, '$1 ').toLowerCase()
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (this.type === 'datetime-local') {
          // Send the date in ISO format
          // (e.g. 2021-01-01T12:00:00.000Z)
          this.$emit('input', moment(newValue).seconds(0).toISOString())
        }
      }
    }
  },
  methods: {
    onInput (evt: Event): void {
      if (!this.touched) {
        // Mark the input as touched
        this.touched = true
      }
      const target = evt?.target as HTMLInputElement
      if (this.type === 'datetime-local') {
        const test = moment(target.value)
        // Send the date in ISO format
        // (e.g. 2021-01-01T12:00:00.000Z)
        this.$emit('input', test.toISOString())
      } else if (this.debounceTimer > 0) {
        this.debounceValue(evt)
      } else {
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
    },
    debounceValue (e: Event) {
      const val = (e?.target as HTMLInputElement).value
      if (this.debounceTimer > 0) {
        // Clear the timeout
        if (this.timeout) { clearTimeout(this.timeout) }
        // Set the timeout
        this.timeout = setTimeout(() => {
          this.$emit('input', val)
        }, this.debounceTimer)
      }
    },
    addonRightOnClick () {
      console.log('rightclick')
      this.$emit('click.native')
    }
  }
})
</script>

<style>
.m-input {
  @apply transition-all duration-300 font-medium bg-transparent
    rounded-lg border border-[#E0E1E5] w-full h-12 indent-2 caret-green-400
    focus-within:shadow-none focus-within:outline-none focus:shadow-none focus:outline-1 focus:outline-green-400 focus:border-green-400
    dark:border-grey-dark-800 dark:text-grey-dark-100;
}
.m-icon-container {
  @apply flex items-center transition-all duration-300 font-medium bg-transparent
    rounded-lg border border-[#E0E1E5] w-full h-12 indent-2 caret-green-400
    focus-within:shadow-none focus-within:outline-none focus:shadow-none focus:outline-1 focus:outline-green-400 focus:border-green-400
    dark:border-grey-dark-800 dark:text-grey-dark-100;
}
.m-icon-input {
  @apply border-0 bg-transparent w-full h-full
}
.m-minimal{
  @apply transition-all duration-300 p-0 font-medium placeholder:!text-3xl bg-transparent border-0 !border-b w-full h-[5.5rem] border-[#E0E1E5] focus-within:shadow-none focus-within:outline-none text-3xl focus:shadow-none focus:outline-1 focus:outline-green-400 focus:border-green-400 dark:border-grey-dark-800 dark:text-grey-dark-100;
}
</style>
