<template>
  <div
    class="card widget group relative"
    :class="[
      {'shadow-2xl shadow-[#BDBDBD]/30 dark:shadow-none' : !noShadow},
      {'border border-gray-300 hover:shadow-2xl hover:shadow-[#BDBDBD]/30 dark:shadow-none dark:border-grey-dark-800' : noShadow && !noFrameBorder},
      { '!flex-row items-center' : $slots.image },
      {'h-full': isHFull}
    ]"
  >
    <div v-if="$slots.image" class="card-image p-6">
      <slot name="image" />
    </div>
    <span v-if="hint" v-tooltip="hint" class="cursor-pointer absolute top-3 right-3" :class="[{'ml-1' : noShadow}, {'ml-4' : !noShadow}]" :title="hint">
      <Icon
        icon="info-circle"
        color="gray"
        :alpha="400"
        :disable-fill="true"
        class="w-5 h-5"
      />
    </span>
    <div class="">
      <div
        v-if="title"
        class="card-header items-center"
        :class="[{'border-b border-b-grey-blue-100 dark:border-grey-dark-800' : !noBorder && !$slots.image},
                 {'pb-6': big}]"
      >
        <div v-if="icon" :class="`card-header-icon bg-${iconColor}-100`">
          <Icon
            :icon="icon"
            :color="iconColor"
            :alpha="iconAlpha"
            :variant="iconVariant"
            :disable-fill="iconFill"
            class="w-6 h-6"
          />
        </div>
        <component :is="noShadow ? 'h6' : 'h5'" class="card-header-title">
          {{ title }}
        </component>
        <div v-if="$slots.actions" class="ml-auto">
          <slot name="actions" />
        </div>
      </div>
      <div v-if="!noCardBody" class="card-body  h-full" :class="[{'pt-6': big}]">
        <slot />
        <template v-if="hasAction && !goTo && !$slots.customGoTo">
          <div
            class="goto group-hover:opacity-100"
            @click="() => $emit('action')"
          >
            <Icon
              icon="arrow-right-1"
              color="white"
              :alpha="0"
              class="w-6 h-6"
            />
          </div>
        </template>
        <template v-else-if="goTo && !hasAction && !$slots.customGoTo">
          <div class="relative">
            <nuxt-link :to="goTo">
              <div
                class="goto group-hover:opacity-100"
              >
                <Icon
                  icon="arrow-right-1"
                  color="white"
                  :alpha="0"
                  class="w-6 h-6"
                />
              </div>
            </nuxt-link>
          </div>
        </template>
        <template v-else-if="$slots.customGoTo">
          <slot name="customGoTo" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Widget',
  props: {
    isHFull: {
      type: Boolean,
      default: false
    },
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
    iconFill: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    hint: {
      type: String,
      default: null
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    noFrameBorder: {
      type: Boolean,
      default: false
    },
    noShadow: {
      type: Boolean,
      default: false
    },
    noCardBody: {
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
  },
  computed: {
    hasAction ():boolean {
      return this.$listeners.action !== undefined
    }
  }
}
</script>
<style>
.widget {
  @apply flex flex-col bg-white rounded-xl transition-all duration-500 hover:border-transparent dark:bg-[#21293B]
}
.widget .card-header {
  @apply  flex  pt-6 px-6;
}
.widget .card-header .card-header-title {
  @apply font-medium flex items-start dark:text-white;
}
.widget .card-header .card-header-icon {
  @apply w-9 h-9 min-h-[36px] min-w-[36px] flex items-center justify-center mr-4 rounded-full;
}
.widget .card-body {
  @apply  px-6 py-4 relative;
}
.widget .goto {
  @apply  cursor-pointer transition-all duration-300 absolute w-12 h-12 bottom-3 right-4
        bg-green-400 flex items-center justify-center opacity-0 z-[2] rounded-full
}

</style>
