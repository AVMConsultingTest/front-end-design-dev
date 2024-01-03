<template>
  <div>
    <button
      class="flex justify-between w-full font-medium text-lg leading-7 text-[#101828] mt-10"
      @click="toggleAccordion()"
    >
      <span class="text-start col-10 xl:col-10 lg:col-12">{{ title }}</span>
      <span class="open-icon text-[#667085]">
        <Icon
          :icon="openCheck ? 'minus-cirlce' :'add-circle'"
          class="w-5 h-5"
        />
      </span>
    </button>
    <transition name="slide">
      <div v-show="openCheck" class="mt-2">
        <div class="accordion-content" :style="openCheck ? {'max-height': '1000px'} : {'max-height': '0'}">
          <div class="accordion-inner">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    open: {
      type: Boolean
    },
    index: {
      type: Number,
      default: null
    },
    currentIndex: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    openCheck (): boolean {
      if (this.currentIndex !== null) {
        return this.currentIndex === this.index
      } else {
        return this.isOpen
      }
    }
  },
  created () {
    this.isOpen = this.open
  },
  methods: {
    toggleAccordion () {
      if (this.currentIndex !== null) {
        console.log('active')

        this.$emit('active')
      } else {
        this.isOpen = !this.isOpen
      }
    }
  }
})
</script>
<style scoped>
.accordion-content {
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.accordion-content::after {
  transition: max-height 0.5s ease-out;
}
</style>
