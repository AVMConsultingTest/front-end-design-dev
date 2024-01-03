<template>
  <div class="contents row">
    <div :class="`col-${colSpan} mb-6 ${selectClasses}`">
      <m-select
        :key="key"
        v-model="stateData"
        :value="stateData"
        :multiple="false"
        :searchable="true"
        :options="states"
        :name="camelize(stateLabel)"
        :bind-text="true"
        :label="stateLabel"
        rules="required"
        @select="$emit('update:state', $event.text)"
      />
    </div>
    <div v-if="!showOnlyStates" :class="`col-${colSpan} mb-6 ${selectClasses}`">
      <m-select
        :key="key"
        v-model="cityData"
        :value="cityData"
        :multiple="false"
        :searchable="true"
        :options="cityOptions"
        :disabled="cityOptions.length === 0"
        name="city"
        :bind-text="true"
        label="City"
        rules="required"
        @select="$emit('update:city', $event.text)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SelectOption } from './ts/interfaces'

export default Vue.extend({
  name: 'StateSelects',
  props: {
    // Binds to the v-model of the parent component
    // it is used to set the value of the select
    // and to emit the value when the select is changed
    // its written as city.sync in the parent component
    city: {
      type: String,
      default: ''
    },
    // Binds to the v-model of the parent component
    // it is used to set the value of the select
    // and to emit the value when the select is changed
    // its written as state.sync in the parent component
    state: {
      type: String,
      default: ''
    },
    // The number of columns the state select should span
    // default is 6
    colSpan: {
      type: Number,
      default: 6
    },
    // The classes to be applied to the state selects
    // default is ''
    selectClasses: {
      type: String,
      default: ''
    },
    // If set to true, only the states will be shown
    // default is false
    showOnlyStates: {
      type: Boolean,
      default: false
    },
    // The label for the state select
    // It also sets the name and placeholder
    // default is 'State'
    stateLabel: {
      type: String,
      default: 'State'
    },
    // If set to true, the value of the state and city
    // will be set to the value of the props
    // and the select will be re-rendered
    // default is false
    apiFetched: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cityOptions: [] as SelectOption[],
      stateOptions: [] as SelectOption[],
      cityData: '',
      stateData: '',
      key: 0
    }
  },
  computed: {
    states () {
      return (this.$store.getters['common/states'])
    },
    cities () {
      return (this.$store.getters['common/cities'])
    }
  },
  watch: {
    // Watch for changes in the stateData
    // and update the cityOptions
    // and emit the value to the parent component
    // when the value is changed
    stateData (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.getCities(this.stateData)
        this.cityOptions = [...this.cities]
      }
      console.log('stateData', oldVal, newVal)
    },
    // Watch for changes in apiFetched
    // and update the stateData and cityData
    // Re-renders the select with the value
    // from the parent component
    // when the value is changed
    apiFetched (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.stateData = this.state
        this.cityData = this.city
      }
    }
  },
  created () {
    // Gets the states from the store
    this.getStates()
  },
  mounted () {
    console.log('city', this.city, 'state', this.state)
    // this.stateOptions = [...this.states]
    // if (this.states.some((state: SelectOption) => state.text === this.state)) {
    //   this.stateOptions.find((state: SelectOption) => state.text === this.state).selected = true
    // }
    // if (this.cityOptions.some((city: SelectOption) => city.text === this.city)) {
    //   this.cityOptions.find((city: SelectOption) => city.text === this.city).selected = true
    // }

    // Set the data to the props
    // so that the select is set to the value
    this.stateData = this.state
    this.cityData = this.city
  },
  methods: {
    // Map the actions to the methods
    ...mapActions({
      getStates: action => action('common/getStates'),
      getCities: (action, param) => action('common/getCities', param)
    }),
    // Converts strings into camelcase strings
    // (e.g. camelize('Camelize This Text') => Output: 'camelizeThisText')
    camelize (str: string): string {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      }).replace(/\s+/g, '')
    }
  }
})
</script>

<style scoped>

</style>
