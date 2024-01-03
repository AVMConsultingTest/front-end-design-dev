<template>
  <div class="w-full flex flex-col">
    <div class="overflow-y-auto sweet-scroll h-[30rem]">
      <div v-for="(message, index) in messages" :key="index" class="p-4">
        <div
          class="flex items-center"
          :class="[
            { 'flex-row-reverse' : message.name === userName }
          ]"
        >
          <img
            :src="message.image !== null && message.image !== '' ? message.image : '/images/guest.png'"
            alt="message-picture"
            class="w-8 h-8 rounded-full mr-2"
            :class="[
              { '!ml-2' : message.name === userName }
            ]"
          >
          <span class="text-c-1 font-medium text-[#8E909A]">{{ message.name }}</span>
          <span class="text-c-1 font-medium text-[#8E909A]">({{ message.sendName }})</span>
        </div>
        <div
          class="px-10 flex max-w-[85%]"
          :class="[
            { '!flex-row-reverse ml-auto' : message.name === userName }
          ]"
        >
          <div
            class="flex flex-col"
          >
            <div
              class="bg-green-200/50 px-4 py-2 mb-2 rounded-lg"
              :class="[
                { '!bg-purple-blue ml-auto' : message.name === userName }
              ]"
            >
              <span
                class="text-b-4 font-medium text-dark"
                :class="[
                  { '!text-white' : message.name === userName }
                ]"
              >{{ message.message }}</span>
            </div>
            <div class="flex" :class="[{ 'justify-end' : message.name === userName }]">
              <span class="text-c-1 font-medium text-[#8E909A]">{{ message.postDate + ', ' + message.postTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-6 px-4 flex">
      <Input
        v-model="messageInput"
        :thin="true"
        class="w-full pr-4"
      />
      <Button class="w-12 h-12 min-w-[3rem] min-h-[3rem] max-w-[3rem] max-h-[3rem] p-3 flex justify-center items-center border border-gray-300 rounded-sm">
        <Icon
          icon="communication"
          color="#959AA2"
          :alpha="0"
          class="w-6 h-6"
        />
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropOptions } from 'vue/types/umd'
import { Message } from '~/models/common/Chat'

export default Vue.extend({
  name: 'ChatRoom',
  props: {
    messages: {
      type: Array,
      default () {
        return []
      }
    } as PropOptions<Message[]>
  },
  data () {
    return {
      userName: 'Admin',
      messageInput: ''
    }
  }
})
</script>

<style scoped>

</style>
