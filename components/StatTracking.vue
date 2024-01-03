<template>
  <div :class="[{'cursor-pointer': link}]" @click="link ? $router.push(link) : null">
    <div class="flex items-center">
      <div v-if="!noIcon" :class="iconContainerClass">
        <Icon
          :icon="iconName"
          color="grey-dark"
          :alpha="100"
          variant="bulk"
          class="w-6 h-6 mr-1"
        />
      </div>
      <component
        :is="size === SizeTypeEnum.LG ? 'h2' :
          size === SizeTypeEnum.MD ? 'h3' : 'h4'"
        :class="[statClass,`text-${statColor}${trueAlpha} font-medium 2xl:text-4xl`]"
      >
        <template v-if="currency">
          <div class="relative flex items-center">
            <div v-if="currency">
              {{ stat | toCurrency }}
            </div>
            <div v-if="isRedDot" class="before:content-[''] w-[6px] h-[6px] rounded-full block relative bg-lime ml-2" />
          </div>
        </template>
        <template v-else>
          <div class="relative flex items-center">
            <div>
              {{ stat }}
            </div>
            <div v-if="isRedDot" class="before:content-[''] w-[6px] h-[6px] rounded-full block relative bg-lime ml-2" />
          </div>
        </template>
      </component>
      <Icon
        v-if="percentage"
        :icon="increase ? 'increase' : 'decrease'"
        :color="increase ? 'green' : 'lime'"
        :alpha="increase ? 400 : null"
        class="mx-2 w-6 h-6"
      />
      <span
        v-if="percentage"
        :class="[
          { 'text-green-400' : increase },
          { 'text-lime' : !increase }
        ]"
      >
        {{ percentage }}%
      </span>
    </div>

    <p v-if="!subTitle" class="text-grey-dark-200 font-normal text-c-2 hidden  2xl:text-sm">
      Last month
    </p>
    <p v-else class="text-grey-dark-200 font-normal text-c-2  2xl:text-sm">
      {{ subTitle }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { SizeTypeEnum } from './ts/enums'
import { SizeType } from './ts/types'

export default Vue.extend({
  name: 'StatTracking',
  props: {
    isRedDot: {
      type: Boolean,
      default: false
    },
    iconContainerClass: {
      type: String,
      default: null
    },
    iconName: {
      type: String,
      default: null
    },
    noIcon: {
      type: Boolean,
      default: true
    },
    stat: {
      type: Number,
      default: null
    },
    currency: {
      type: Boolean,
      default: false
    },
    increase: {
      type: Boolean,
      default: false
    },
    statColor: {
      type: String,
      default: 'gray'
    },
    statAlpha: {
      type: Number,
      default: 800
    },
    statClass: {
      type: String,
      default: null
    },
    percentage: {
      type: Number,
      default: null
    },
    size: {
      type: String,
      default: 'md'
    } as PropOptions<SizeType>,
    subTitle: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      SizeTypeEnum,
      trueAlpha: '',
      countStat: -1,
      countPercentage: -1
    }
  },
  computed: {
    statColorListeners (): boolean {
      return this.$listeners.statcolor !== undefined
    }
  },
  mounted () {
    this.trueAlpha = this.noAlpha()
    this.countUpStat()
    this.countUpPercentage()
  },
  methods: {
    countUpStat ():void {
      const self = this
      const interval = setInterval(function () {
        self.countStat++
        if (self.countStat >= self.stat) {
          clearInterval(interval)
          self.countStat = self.stat
        }
      }, 0)
    },
    noAlpha () {
      return this.statAlpha === 0 ? '' : `-${this.statAlpha}`
    },
    countUpPercentage ():void {
      const self = this
      const interval = setInterval(function () {
        self.countPercentage++
        if (self.countPercentage >= self.percentage) {
          clearInterval(interval)
          self.countPercentage = self.percentage
        }
      }, 0)
    }
  }
})
</script>

<style scoped>

</style>
