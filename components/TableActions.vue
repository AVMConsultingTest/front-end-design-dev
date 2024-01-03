<template>
  <component
    :is="component"
    v-if="(addEnabled || editEnabled || deleteEnabled || uploadEnabled || smsEnabled || viewEnabled)"
    :class="[
      { 'px-6 text-right': !actionsAsDropdown }
    ]"
  >
    <div
      v-if="!actionsAsDropdown"
      class="h-16 inline-flex items-center"
    >
      <div class="flex">
        <div v-if="addEnabled" @click="$emit('add')">
          <Icon
            icon="add"
            variant="linear"
            :alpha="400"
            :disable-fill="true"
            color="gray"
            class="w-6 h-6 mr-2"
          />
        </div>
        <div v-if="editEnabled" @click="$emit('edit')">
          <Icon
            icon="edit-2"
            variant="linear"
            :alpha="400"
            :disable-fill="true"
            color="gray"
            class="w-6 h-6 mr-2"
          />
        </div>
        <div v-if="deleteEnabled" @click="$emit('delete')">
          <Icon
            icon="trash"
            variant="linear"
            :alpha="400"
            :disable-fill="true"
            color="gray"
            class="w-6 h-6 mr-2"
          />
        </div>
        <div v-if="uploadEnabled" @click="$emit('upload')">
          <Icon
            icon="send-square"
            variant="linear"
            :alpha="400"
            :disable-fill="true"
            color="gray"
            class="w-6 h-6 mr-2"
          />
        </div>
        <div v-if="smsEnabled" @click="$emit('sms')">
          <Icon
            icon="sms"
            variant="linear"
            :alpha="400"
            :disable-fill="true"
            color="gray"
            class="w-6 h-6 mr-2"
          />
        </div>
        <div v-if="viewEnabled">
          <Icon
            icon="eye"
            variant="linear"
            :alpha="400"
            :disable-fill="true"
            color="gray"
            class="w-6 h-6 mr-2"
          />
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex justify-center items-center relative cursor-pointer"
    >
      <div class="flex justify-center items-center">
        <div
          v-click-outside="() => { opened = false }"
          @click="() => { opened = !opened }"
        >
          <Icon
            icon="more"
            variant="linear"
            :alpha="400"
            :disable-fill="true"
            color="gray"
            class="w-6 h-6 rotate-90"
          />
        </div>
      </div>
      <transition name="slide">
        <div
          v-if="opened"
          class="z-10 absolute top-10 rounded-lg bg-white left-1/2 -translate-x-1/2 w-20 shadow-2xl"
        >
          <div class="p-2">
            <div v-if="addEnabled" @click="$emit('add')">
              <span class="text-b-4">
                Add
              </span>
            </div>
            <div v-if="editEnabled" @click="$emit('edit')">
              <span class="text-b-4 text-dark-blue">
                Edit
              </span>
            </div>
            <div v-if="deleteEnabled" @click="$emit('delete')">
              <span class="text-b-4 text-red-700">
                Delete
              </span>
            </div>
            <div v-if="uploadEnabled" @click="$emit('upload')">
              <span class="text-b-4">
                Upload
              </span>
            </div>
            <div v-if="smsEnabled" @click="$emit('sms')">
              Send
            </div>
            <div v-if="viewEnabled">
              <span class="text-b-4">
                View
              </span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TableActions',
  props: {
    component: {
      type: String,
      default: 'td'
    },
    actionsAsDropdown: {
      type: Boolean,
      default: false
    },
    addEnabled: {
      type: Boolean,
      default: false
    },
    editEnabled: {
      type: Boolean,
      default: false
    },
    deleteEnabled: {
      type: Boolean,
      default: false
    },
    uploadEnabled: {
      type: Boolean,
      default: false
    },
    smsEnabled: {
      type: Boolean,
      default: false
    },
    viewEnabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      opened: false
    }
  }
})
</script>

<style scoped>

</style>
