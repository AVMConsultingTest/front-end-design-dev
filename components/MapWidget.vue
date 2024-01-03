<template>
  <div
    class="card mapwidget group"
    :class="[
      {'shadow-2xl shadow-[#BDBDBD]/30 dark:shadow-none' : !noShadow},
      {'border border-gray-300 hover:shadow-2xl hover:shadow-[#BDBDBD]/30 dark:shadow-none dark:border-grey-dark-800' : noShadow},
      { '!flex-row items-center' : $slots.image }
    ]"
  >
    <div v-if="$slots.image" class="card-image p-6">
      <slot name="image" />
    </div>
    <div class="">
      <div
        v-if="title"
        class="card-header"
        :class="[{'border-b border-b-grey-blue-100 dark:border-grey-dark-800' : !noBorder && !$slots.image}]"
      >
        <component :is="'span'" class="card-header-title text-b-3 font-medium">
          {{ title }}
          <span v-if="hint" v-tooltip="hint" class="ml-2 cursor-pointer" :title="hint">
            <Icon
              icon="info-circle"
              color="grey-dark"
              :alpha="400"
              :disable-fill="true"
              class="w-5 h-5"
            />
          </span>
        </component>
        <div v-if="icon" :class="`card-header-icon bg-${iconColor}-100 ml-auto !mr-0`">
          <Icon
            :icon="icon"
            :color="iconColor"
            :alpha="iconAlpha"
            :variant="iconVariant"
            class="w-6 h-6"
          />
        </div>
      </div>
      <div class="d-block pl-5 pr-4 mt-2 text-grey-dark-200 text-c-1">
        {{ subTitle }}
      </div>
      <div class="card-body" :class="[{'pt-6': big}]">
        <slot />
        <div class="row">
          <div class="col-auto pr-0">
            <h3 v-if="activeCount" class="font-medium">
              {{ activeCount }}
            </h3>
            <span v-if="activeCount" class="text-c-1 text-grey-dark-200 text-center w-full block">Active</span>
            <h3 v-if="totalLoads" class="font-medium">
              {{ totalLoads }}
            </h3>
            <span v-if="totalLoads" class="text-c-1 text-grey-dark-200 text-center w-full block">Current</span>
            <h3 v-if="currencyCount" class="font-medium">
              ${{ currencyCount }}
            </h3>
          </div>
          <div class="col-auto">
            <h3 v-if="totalCount" class="font-normal text-grey-dark-100">
              /{{ totalCount }}
            </h3>
            <span v-if="totalCount" class="text-c-1 text-grey-dark-200 text-center w-full block">Total</span>
          </div>
        </div>
        <template v-if="goTo">
          <nuxt-link :to="goTo">
            <div class="ml-auto text-right">
              <span class="dark:text-white text-c-1 font-medium">
                Details
              </span>
            </div>
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapWidget',
  props: {
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
    title: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    },
    activeCount: {
      default: null,
      required: true
    },
    currencyCount: {
      type: String,
      default: null,
      requred: false
    },
    totalLoads: {
      type: String,
      default: null
    },
    totalCount: {
      default: 0,
      required: true
    },
    hint: {
      type: String,
      default: null
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    noShadow: {
      type: Boolean,
      default: false
    },
    goTo: {
      type: String,
      default: null
    },
    big: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style>
.mapwidget {
  @apply flex flex-col bg-white rounded-xl transition-all duration-500 hover:border-transparent dark:bg-[#21293B]
}
.mapwidget .card-header {
  @apply  flex items-center pt-4 pl-5 pr-4;
}
.mapwidget .card-header .card-header-title {
  @apply font-semibold flex items-center dark:text-white;
}
.mapwidget .card-header .card-header-icon {
  @apply w-8 h-8 flex items-center justify-center mr-4 rounded-full;
}
.mapwidget .card-body {
  @apply  px-6 py-4 relative;
}
.mapwidget .goto {
  @apply  cursor-pointer transition-all duration-300 absolute -top-[1px] -left-[1px] -right-[1px] -bottom-[1px]
        bg-green-400 flex items-center justify-center opacity-0 z-10  rounded-br-lg rounded-bl-lg
}
</style>
