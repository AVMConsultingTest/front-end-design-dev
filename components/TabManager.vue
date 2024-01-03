<template>
  <div class="w-full rela">
    <div class="flex landing-tab">
      <TabButton
        v-for="(tabName, index) in tabNames"
        :key="index"
        :active="(activeTab === index)"
        :minimal-style="theme === 'minimal'"
        :settings-style="theme === 'settings'"
        :title="tabName"
        :color="color"
        class=""
        :class="[
          { '!border-r-0': theme !== 'minimal' },
          { '!rounded-l-md' : (index === 0 && theme !== 'minimal') },
          { '!rounded-r-md !border-r' : (index + 1 === tabNames.length && theme !== 'minimal') },
          { '!bg-transparent !w-40 !border-0' : theme === 'minimal' },
        ]"
        @click="(activeTab = index)"
      />
    </div>
    <slot v-for="(slotName, index) in slotNames" v-if="checkTab(index)" :name="slotName" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions, PropType } from 'vue/types/umd'
import { Themes } from '~/enums/themes'

export default Vue.extend({
  name: 'TabManager',
  props: {
    preSelectedTab: {
      type: Number,
      default: null
    },
    tabNames: {
      type: Array,
      default () {
        return []
      }
    } as PropOptions<String[]>,
    theme: {
      type: String as PropType<Themes>,
      default: Themes.Settings
    },
    color: {
      type: String,
      default: 'green'
    }
  },
  data () {
    return {
      activeTab: 0,
      slotArray: []
    }
  },
  computed: {
    slotNames () {
      return this.tabNames.map((tabName: String) => {
        return tabName.toLowerCase().replace(' &', '').replace(' ', '_')
      })
    }
  },
  created () {
    if (this.preSelectedTab !== null) {
      this.activeTab = this.preSelectedTab
    }
  },
  methods: {
    checkTab (index: number): Boolean {
      return index === this.activeTab
    }
  }
})
</script>

<style scoped>

</style>
