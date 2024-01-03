<template>
  <div
    class="page-header flex border-b border-grey-blue-100 pb-5 my-5"
    :class="[
      { '!border-0' : noBorder }
    ]"
  >
    <div class="row items-center w-full justify-between">
      <div
        v-if="hasListener"
        class="col-auto pt-2 cursor-pointer self-start"
        @click="
          () => {
            $emit('goback');
          }
        "
      >
        <Icon icon="arrow-left" color="gray" class="w-5 h-5" />
      </div>
      <div class="col-auto mr-auto">
        <h4 class="font-medium block dark:text-white mb-2">
          {{ title }}
        </h4>
        <div class="font-semibold block">
          <span v-if="showDate" class="font-medium text-b-4 text-gray-800 dark:text-gray-300">{{ currentWeekDay }},</span>
          <span v-if="showDate" class="font-medium text-b-4 text-gray-400 dark:text-gray-500">{{ currentDate }}</span>
        </div>
      </div>
      <div
        v-if="!noActions"
        class="col-auto ml-auto flex justify-around"
        :class="[
          { 'w-[352px]': (!$slots.actions && hasSearch) },
          {'hidden' :!$slots.actions }
        ]"
      >
        <div
          v-if="(!$slots.actions && !hasSearch)"
          class="
            icon-con
            w-10
            h-10
            rounded-lg
            border border-gray-200
            hover:bg-gray-100
            transition-all
            flex
            items-center
            justify-center
            cursor-pointer
            mr-2
          "
        >
          <Icon
            icon="calendar"
            variant="linear"
            color="gray"
            :alpha="400"
            class="w-5 h-5"
            :disable-fill="true"
          />
        </div>
        <div
          v-if="(!$slots.actions && !hasSearch)"
          class="
            icon-con
            w-10
            h-10
            rounded-lg
            border border-gray-200
            hover:bg-gray-100
            transition-all
            flex
            items-center
            justify-center
            cursor-pointer
          "
        >
          <Icon
            icon="search-normal"
            variant="linear"
            color="gray"
            :alpha="400"
            class="w-5 h-5"
            :disable-fill="true"
          />
        </div>
        <Input
          v-if="(!$slots.actions && hasSearch)"
          v-model="searchTerm"
          :thin="true"
          class="w-full"
          :rounded="true"
          @onInput="() => $emit('search')"
        >
          <template slot="addonLeft">
            <Icon
              icon="search-normal"
              color="#3C4049"
              :alpha="0"
              class="w-5 h-5 ml-4"
              :disable-fill="true"
            />
          </template>
        </Input>
        <template v-if="$slots.actions">
          <slot name="actions" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    noActions: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    showDate: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      searchTerm: ''
    }
  },
  computed: {
    currentDate () {
      const date = new Date()
      const formattedDate = new Intl.DateTimeFormat('en-US').format(date)
      return formattedDate
    },
    currentWeekDay () {
      const date = new Date()
      const formattedDate = date.getDay()
      switch (formattedDate) {
        case 0:
          return 'Sunday'
        case 1:
          return 'Monday'
        case 2:
          return 'Tuesday'
        case 3:
          return 'Wednesday'
        case 4:
          return 'Thursday'
        case 5:
          return 'Friday'
        case 6:
          return 'Saturday'
        default:
          return 'No Day'
      }
    },
    hasListener ():boolean {
      return this.$listeners.goback !== undefined
    },
    hasSearch ():boolean {
      return this.$listeners.search !== undefined
    }
  }
})
</script>

<style scoped>
</style>
