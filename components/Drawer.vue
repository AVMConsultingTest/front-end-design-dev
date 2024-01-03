<template>
  <div class="flex justify-end m-drawer">
    <transition key="overlay" name="fade" mode="in-out">
      <div v-if="show" class="m-drawer-overlay items-end z-10" />
    </transition>
    <transition key="content" name="slide-left" mode="in-out">
      <div v-if="show" v-click-outside="()=> show = false" class="m-drawer-content z-20 sweet-scroll relative">
        <template v-if="closeButton">
          <div class="h-12 w-12 rounded-full bg-gray-300/50 flex items-center justify-center absolute right-8 top-8" @click="show = false">
            <Icon
              icon="add"
              color="#292D32"
              :alpha="0"
              :disable-fill="false"
              class="w-8 h-8 cursor-pointer rotate-45"
            />
          </div>
        </template>
        <div :class="`m-modal-body min-h-screen flex flex-col justify-between ${noPadding ? '' : 'p-5'}`">
          <slot />
          <component
            :is="component"
            v-if="component"
            :edit-id="editId"
            @close-drawer="hideDrawer"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Drawer',
  props: {
    closeButton: {
      type: Boolean,
      default: false
    },
    editId: {
      type: [String, Number],
      default: null
    },
    noPadding: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      component: ''
    }
  },
  methods: {
    showDrawer (componentName: string) {
      this.show = true
      this.component = componentName
    },
    hideDrawer () {
      this.show = false
    }
  }
})
</script>

<style>
.m-drawer-overlay {
    @apply bg-dark/80 fixed bottom-0 right-0 top-0 flex justify-end w-screen;
}
.m-drawer-content {
    @apply bg-white fixed bottom-0 right-0 top-0 rounded-l-3xl shadow-2xl overflow-x-hidden overflow-y-auto w-3/5 h-screen;
}
</style>
