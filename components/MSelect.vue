<template>
  <div class="relative">
    <span
      v-if="label"
      class="font-medium text-b-4 mb-1 transition-all duration-200 flex items-center"
      :class="[
        { 'text-secondary dark:text-grey-dark-100': selected.length === 0 },
        { 'text-gray-400 dark:text-grey-dark-400': selected.length > 0 },
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
    <div
      class="m-select-wrapper text-b-4"
      :class="[
        wrapperClass,
        { 'pl-4': selected.length === 0 },
        { 'bg-[#E0E1E5] border-[#E0E1E5]': disabled },
        { '!bg-[#192038] hover:!bg-tuna justify-center' : buttonStyle }
      ]"
      @click.self="disabled ? null : opened = true"
    >
      <ValidationProvider
        v-slot="{ errors }"
        class="relative"
        :name="selected[0]?.text.toString() || placeholder?.toString()"
        :rules="rules"
      >
        <input
          :name="name"
          :value="selected[0]?.id"
          type="hidden"
          :disabled="disabled"
          v-bind="$attrs"
        >
        <transition name="fade" mode="in-out">
          <span v-if="errors.length > 0" class="input-error mt-1 text-c-1 text-red font-medium flex items-center absolute whitespace-nowrap -bottom-12 -left-4">
            <Icon
              icon="close-circle"
              color="red"
              class="w-4 h-4 mr-2"
            />
            {{ errors[0] }}
          </span>
        </transition>
      </ValidationProvider>
      <span
        v-if="!multiple"
        class="flex items-center"
        :class="[
          iconContainerClass,
          { 'bg-[#E0E1E5] border-[#E0E1E5]': disabled },
          { 'text-gray-400': selected.length === 0 },
          { 'text-secondary': selected.length > 0 },
          { 'ml-5': multiple === false && selected.length > 0 },
          { '!ml-0 !text-white ': buttonStyle },
        ]"
      >
        <Icon
          v-if="(selected && selected.length && selected[0].icon != undefined) "
          :icon="useIconObject(selected[0].icon, 'name')"
          :color="(useIconObject(selected[0].icon, 'color') !== null && useIconObject(selected[0].icon, 'color') !== undefined ? useIconObject(selected[0].icon, 'color') : 'gray')"
          :variant="useIconObject(selected[0].icon, 'variant')"
          class="w-6 h-6 mr-3 transition-all duration-150"
        />
        <img
          v-if="selected.length && selected[0].img != undefined"
          :src="`${selected[0]?.img || ''}`"
          class="w-4 h-4 mr-2"
        >
        {{ selected[0]?.text.toString() || placeholder?.toString() }} {{ selected[0]?.text.toString() && additionToSelectedText }}
        <slot v-if="selected[0]?.slotName" :name="selected[0]?.slotName" :option="selected[0]" />
      </span>
      <span
        v-else
        class="flex items-center flex-wrap"
        :class="[{ '!flex-nowrap overflow-y-auto sweet-scroll': multiple && horizontal}]"
      >
        <span v-show="selected.length === 0" class="text-gray-400">
          {{ placeholder }}
        </span>
        <Badge
          v-for="selecting in selected"
          :key="isSelectOption(selecting).id"
          :title="isSelectOption(selecting).text"
          size="sm"
          class="bg-gray-100 text-gray-400 z-20 px-3"
          :class="[
            { 'ml-2' : !buttonStyle},
            { 'whitespace-nowrap': multiple && horizontal }
          ]"
          @click="select(isSelectOption(selecting))"
        />
      </span>
      <Icon
        v-if="!buttonStyle"
        :icon="dropIcon"
        color="gray"
        class="w-4 h-4 absolute right-4 top-4 transition-all duration-150"
        :class="{ 'rotate-180': opened && openedAnimation }"
        :disable-fill="true"
      />
    </div>
    <transition name="slide">
      <div
        v-if="opened"
        v-click-outside="() => (opened = !opened)"
        :class="[
          containerClass,
          { 'top-14': label === null },
          { 'top-24': label !== null },
        ]"
        class="m-select-container"
      >
        <template v-if="searchable">
          <div class="w-full mb-4">
            <Input
              v-model="search"
              type="text"
              name="search0"
              placeholder="Search.."
            />
          </div>
        </template>

        <ul
          class="m-select h-full overflow-y-scroll max-h-48 sweet-scroll"
          :class="[dropdownClass]"
        >
          <li
            v-for="(option, index) in items"
            :key="index"
            class="text-b-4"
            :class="[
              {
                'bg-gray-50 dark:bg-grey-dark-800':
                  option.id === value || index % 2 === 0,
                '!bg-sidebar-bg !text-white': option.id === -1 ? false : selected.includes(option),
              },
            ]"
            @click="select(option)"
          >
            <Icon
              v-if="(options && option && option.icon)"
              :icon="useIconObject(option.icon, 'name')"
              color="gray"
              :variant="useIconObject(option.icon, 'variant')"
              class="w-6 h-6 mr-3 transition-all duration-150"
            />
            <img
              v-if="options && option && option.img && option.img?.length"
              :src="`${option?.img || ''}`"
              class="w-4 h-4 mr-2"
            >
            {{ option.id === -1 ? "Clear" : option.text }}
          </li>
          <li
            v-if="addable"
            class="text-b-4 flex items-center"
            :class="[
              { 'bg-gray-50 dark:bg-grey-dark-800': items.length % 2 === 0 },
            ]"
          >
            <Input v-model="customOption" class="w-10/12 pr-2 mr-1" type="text" />
            <Button class="!w-3/12" @click="addOption">
              <Icon
                icon="add"
                color="white"
                class="w-6 h-6"
              />
            </Button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { SelectOption, IconObject } from './ts/interfaces'

export default Vue.extend({
  name: 'MSelect',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // Selects multiple options
    multiple: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    // Select Options
    // [{ id: 1, text: 'Option 1' }]
    // [{ id: 1, text: 'Option 1', icon: { name: 'icon-name', color: 'gray', variant: 'solid' } }]
    // [{ id: 1, text: 'Option 1', img: 'https://image.png' }]
    options: {
      type: Array,
      default: null
    } as PropOptions<SelectOption[]>,
    value: {
      type: [String, Number, Array],
      default: null
    },
    hint: {
      type: String,
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
    dropIcon: {
      type: String,
      default: 'arrow-down-1'
    },
    rules: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    wrapperClass: {
      type: String,
      default: null
    },
    containerClass: {
      type: String,
      default: null
    },
    iconContainerClass: {
      type: String,
      default: null
    },
    dropdownClass: {
      type: String,
      default: null
    },
    bindText: {
      type: Boolean,
      default: false
    },
    isNullable: {
      type: Boolean,
      default: false
    },
    buttonStyle: {
      type: Boolean,
      default: false
    },
    additionToSelectedText: {
      type: String,
      default: ''
    },
    addable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selected: [] as SelectOption[],
      opened: false,
      search: '',
      customOption: ''
    }
  },
  computed: {
    /**
     * It returns the select options that was given
     * If it's nullable it adds an clearing option to clear selection
     * If it's searchable it adds an search bar and filters according the given input
     */
    items (): SelectOption[] {
      if (this.isNullable === true) {
        // eslint-disable-next-line vue/no-mutating-props, vue/no-side-effects-in-computed-properties
        this.options.unshift({ id: -1, text: '', selected: true })
      }
      if (this.searchable) {
        if (this.search.length > 2) {
          return this.options.filter((item:SelectOption) => item.text.includes(this.search))
        } else {
          return this.options
        }
      } else {
        return this.options
      }
    },
    /**
     * It changes the icon when select is clicked
     */
    openedAnimation () {
      return this.dropIcon === 'arrow-down-1'
    }
  },
  watch: {
    /**
     * Watches the value change and and selects the chosen input
     * @param newValue
     * @param oldValue
     */
    value (newValue, oldValue) {
      if (newValue === '' || newValue === -1) {
        this.selected = []
        this.$emit('input', newValue ?? 1)
      }
      if (oldValue !== newValue && !this.multiple) {
        if (this.bindText === true && this.options.some((s:SelectOption) => s.text === this.value)) {
          console.log('this.options', this.name, this.options)
          this.selected = this.options.find((a: any) => a.text === this.value)
          this.select(this.selected)
        } else if (this.options.some((s:SelectOption) => s.id === this.value)) {
          this.selected = this.options.find((a: any) => a.id === this.value)
          this.select(this.selected)
        }
      }

      this.opened = false
      this.search = ''
    }
  },
  mounted () {
    console.log('value', this.value)
    /**
     * Selects the default select value
     */
    if (this.options && this.options.some((s:any) => s.selected)) {
      this.selected = this.options.filter((a: any) => a.selected === true)
      this.select(this.selected[0])
    }
  },
  methods: {
    /**
     * It selects the selection and changes v-model according to it
     * When bindText is true, it changes the v-model as selection's text
     * If it's not, it changes to id
     * Also if multiple selection is true, it adds the selected selections to v-model array
     * @param option SelectOption
     */
    select (option: SelectOption) {
      if (option.id !== -1) {
        if (!this.multiple) {
          this.selected = []
          // option.selected = true
          if (this.bindText === true) {
            this.$emit('input', option.text ?? 1)
          } else {
            this.$emit('input', option.id ?? 1)
          }
          this.selected.push(option)
        }
        if (this.multiple) {
          if (this.selected.includes(option)) {
          // option.selected = false
            this.selected = this.selected.filter((item:any) => item.id !== option.id)
          } else {
          // option.selected = true
            this.selected.push(option)
          }
          this.$emit('input', this.selected)
        }
      } else {
        this.selected = []
        if (this.bindText === true) {
          this.$emit('input', option.text ?? 1)
        } else {
          this.$emit('input', option.id ?? 1)
        }
      }

      this.opened = false
      this.search = ''
      this.$emit('select', option)
    },
    /**
     * Adds a custom option to options array
     */
    addOption (): void {
      if (this.addable && this.customOption !== '') {
        const newOption: SelectOption = {
          id: this.options.length + 1,
          text: this.customOption,
          selected: true
        }
        this.items.push(newOption)
        this.customOption = ''
        this.select(newOption)
      }
    },
    /**
     * Returns an icon item object property
     * @param obj string |IconObject
     * @param key string
     */
    useIconObject (obj: string | IconObject, key: string) {
      return (obj as IconObject)[key]
    },
    /**
     * Returns object as type casted
     * @param obj unknown | SelectOption
     */
    isSelectOption (obj: unknown | SelectOption): SelectOption {
      return obj as SelectOption
    }
  }
})
</script>

<style>
.m-select-wrapper {
  @apply relative flex
        items-center
        cursor-pointer
        transition-all
        duration-300
        font-medium
        rounded-lg
        border border-[#E0E1E5]
        w-full
        h-12
        caret-green-400
        focus-within:shadow-none focus-within:outline-none
        focus:shadow-none
        focus:outline-1
        focus:outline-green-400
        focus:border-green-400
        dark:border-grey-dark-800;
}
.m-select-container {
  @apply absolute
          left-0
          p-4
          right-0
          bg-white
          rounded-lg
          z-20
          shadow-2xl shadow-gray-300
          dark:bg-grey-dark-900
          dark:shadow-grey-dark-1000;
}
.m-select li {
  @apply flex
              items-center
              mb-1
              transition-all
              duration-150
              cursor-pointer
              rounded-lg
              px-4
              h-12
              border border-transparent
              hover:bg-gray-50
              text-tuna
              font-medium
              dark:hover:bg-grey-dark-800
              dark:text-grey-dark-100;
}
</style>
