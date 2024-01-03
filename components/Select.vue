<template>
  <ValidationProvider
    v-slot="{ errors }"
    class="relative"
    :name="name"
    :rules="rules"
  >
    <label :for="name" class="relative">
      <span
        v-if="label"
        class="font-medium text-b-4 block mb-1 transition-all duration-200"
        :class="[
          {'text-secondary' : !value || value.length == 0 },
          {'text-gray-400' : value && value.length > 1 },
        ]"
      >{{ label }}</span>
      <slot name="addonLeft" />
      <select
        v-bind="$attrs"
        :name="name"
        :value="value"
        class="
        transition-all
        duration-300
        text-secondary
        font-medium
        text-b-4
        rounded-lg
        border
        border-[#E0E1E5]
        w-full
        h-12
        indent-2
        caret-green-400
        focus-within:shadow-none
        focus-within:outline-none
        focus:shadow-none
        focus:outline-1
        focus:outline-green-400
        focus:border-green-400"
        :class="{'bg-[#E0E1E5] border-[#E0E1E5]' : disabled}"
      >
        <slot v-if="options === null" />
        <option v-if="placeholder" disabled selected>{{ placeholder }}</option>
        <template v-if="options">
          <option v-for="option in options" :key="option[0]" :value="option.id" :selected="value === option.id || option.selected">
            {{ option.text }}
          </option>
        </template>
      </select>
      <slot name="addonRight" />
    </label>
    <span v-if="errors.length > 0" class="input-error mt-1 text-c-1 text-red font-medium flex items-center">
      <Icon
        icon="close-circle"
        color="red"
        class="w-4 h-4 mr-2"
        :disable-fill="true"
      />
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'Select',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    options: {
      type: Array,
      description: 'Object array e.g [{id:1, text:"a", selected:false, id:2, text:"b", selected:true}]',
      default: null
    },
    value: {
      type: [String, Number],
      description: 'Input value',
      default: null
    },
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    },
    rules: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
