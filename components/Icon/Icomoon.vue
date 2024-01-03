<template>
  <svg
    v-if="currentIcon"
    :viewBox="viewBox"
    :style="styles"
  >
    <path
      v-for="({ d, strokeLinejoin, strokeLinecap, strokeMiterlimit, strokeWidth, fill, ...attrs }, index) in paths"
      :key="index"
      class="pointer-events-none"
      :fill="fill"
      :stroke-linejoin="strokeLinejoin"
      :stroke-linecap="strokeLinecap"
      :stroke-miterlimit="strokeMiterlimit"
      :stroke-width="strokeWidth"
      :d="d"
      v-bind="{ ...attrs }"
    />
    <title v-if="title">{{ title }}</title>
  </svg>
</template>

<script>
export default {
  name: 'Icomoon',
  props: {
    iconSet: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: 32
    },
    disableFill: {
      type: Boolean,
      default: false
    },
    removeInitialStyle: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default: null
    }
  },
  computed: {
    currentIcon () {
      const cIcon = this.iconSet.icons.find(
        item => item.properties.name === this.icon
      )
      return cIcon
    },
    viewBox () {
      return `0 0 ${this.currentIcon.icon.width || '1024'} 1024`
    },
    paths () {
      const iconColor = this.color.toString()
      return this.currentIcon.icon.paths.map((path, index) => {
        const attrs = this.currentIcon.icon.attrs
          ? this.currentIcon.icon.attrs[index]
          : null
        const pathProps = {
          d: path,
          ...(attrs || {})
        }
        if (iconColor && !this.disableFill) {
          pathProps.fill = iconColor
        } else if (iconColor && this.disableFill) {
          pathProps.stroke = iconColor
        }
        return pathProps
      })
    }
  }
}
</script>
