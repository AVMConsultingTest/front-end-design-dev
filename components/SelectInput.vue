<template>
  <div>
    <label :for="name">
      <span
        v-if="label"
        class="font-medium text-b-4 mb-1 transition-all duration-200 flex items-center"
      >
        {{ label }}
      </span>
      <div class="input-container m-input flex items-center row mx-0 relative">

        <div class="tw-col-7/12 p-0">
          <m-select
            :key="key"
            v-model="selectData"
            :value="selectData"
            :options="options"
            :name="selectData"
            :bind-text="true"
            wrapper-class="!border-none"
            container-class="!p-0"
            :addable="addable"
            @select="$emit('update:select', $event.text)"
          />
        </div>

        <ValidationProvider
          v-slot="{ errors }"
          mode="lazy"
          class="min-h-full flex col p-0 pr-[15px] h-full"
          :name="vName"
          :rules="phoneInput ? 'min:14|' : '' + rules"
        >
          <input
            v-model="vValue"
            :name="name"
            :value="vValue"
            :type="type === 'datetime-local' ? 'date' : type"
            v-bind="$attrs"
            :placeholder="placeholder || ''"
            class="dark:border-grey-dark-800 my-auto w-full bg-transparent dark:text-grey-dark-100 p-0 h-9 border-none outline-none text-b-4 text-secondary"
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
  name: 'SelectInput',
  components: { MSelect },
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
    name: {
      type: String,
      default: null
    } as PropOptions<string>,
    // Binds to the v-model of the parent component
    // it is used to set the value of the select
    // and to emit the value when the select is changed
    // its written as select.sync in the parent component
    select: {
      type: String,
      default: ''
    },
    // Binds to the v-model of the parent component
    // it is used to set the value of the select
    // and to emit the value when the select is changed
    // its written as input.sync in the parent component
    input: {
      type: String,
      default: ''
    },
    // The classes to be applied to the state selects
    // default is ''
    selectClasses: {
      type: String,
      default: ''
    },
    // The placeholder to be applied to the input
    // default is null
    placeholder: {
      type: String,
      default: null
    },
    // The rules to be applied to the input
    // default is null
    rules: {
      type: String,
      default: null
    },
    // Options of the select
    // default is []
    options: {
      type: Array,
      default: () => []
    },
    // If set to true, the value of the select
    // will be set to the value of the props
    // and the select will be re-rendered
    // default is false
    apiFetched: {
      type: Boolean,
      default: false
    },
    // If set to true, an input will be added
    // to the select for adding new options
    // default is false
    addable: {
      type: Boolean,
      default: false
    },
    phoneInput: {
      type: Boolean,
      default: false
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
      key: 0,
      selectData: '',
      touched: false,
      focused: false,
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
  watch: {
    // Watch for changes in apiFetched
    // and update the selectData
    // Re-renders the select with the value
    // from the parent component
    // when the value is changed
    apiFetched (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.selectData = this.select
      }
    }
  },
  mounted () {
    // Set the data to the props
    // so that the select is set to the value
    if (!this.select) {
      this.$emit('update:select', this.options.find((w: SelectOption) => w.selected === true))
    } else {
      this.selectData = this.select
    }
  },
  methods: {
    onInput (evt: Event): void {
      if (!this.touched) {
        // Mark the input as touched
        this.touched = true
      }
      const target = evt?.target as HTMLInputElement
      if (this.phoneInput) {
        if (target.value.length <= 14) {
          target.value = target.value.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
          this.$emit('input', target.value)
        }
        // target.value = target.value.replace(/^\d{3}\D*\d{3}\D*\d{4}$/, '($1) $2-$3')
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
