<template>
  <Icomoon :icon-set="set" v-bind="props" :color="iconColor" :icon="testIcon" :disable-fill="disableFill" />
</template>

<script>
import colors from 'tailwindcss/colors'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'
import Icomoon from './Icomoon.vue'
import iconSet from './selections/selection.json'
import iconLinearSet from './selections/selection_linear.json'
import iconBulkSet from './selections/selection_bulk.json'
import iconTwotoneSet from './selections/selection_twotone.json'
import iconBold from './selections/selection_bold.json'
export default {
  name: 'Icon',
  components: {
    Icomoon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      required: false,
      default: 'outline'
    },
    color: {
      type: String,
      default: 'gray'
    },
    alpha: {
      type: Number,
      default: 500
    },
    disableFill: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    return {
      props,
      iconSet,
      iconLinearSet,
      iconTwotoneSet,
      iconBulkSet,
      iconBold
    }
  },
  data () {
    return {
      colors,
      fullConfig: resolveConfig(tailwindConfig)
    }
  },
  computed: {
    set () {
      switch (this.variant) {
        case 'bulk':
          return iconBulkSet
        case 'linear':
          return iconLinearSet
        case 'twotone':
          return iconTwotoneSet
        case 'bold':
          return iconBold
        default:
          return iconSet
      }
    },
    testIcon () {
      return this.icon
    },
    iconColor () {
      const color = this.fullConfig.theme.colors[this.color]
      if (color instanceof Object) {
        if (this.alpha === 0) {
          return color.DEFAULT
        } else {
          return color[this.alpha.toString()]
        }
      } else { return color }
    }
  }
}
</script>
