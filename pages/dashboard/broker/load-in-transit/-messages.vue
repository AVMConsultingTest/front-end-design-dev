<template>
  <div class="mt-10 mb-11">
    <div class="border border-gray-300 rounded-lg">
      <div class="px-6 py-3 border-b border-gray-300 flex flex-col">
        <span class="text-b-3 font-medium text-black">Messages</span>
      </div>
      <div class="flex h-[36rem] bg-white">
        <div class="col-4 p-6 border-r border-gray-300 flex flex-col">
          <Input
            v-model="searchTerm"
            :thin="true"
            class="w-full"
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
          <div
            v-for="(chat, index) in chatList"
            :key="index"
            class="flex py-4 border-b border-gray-300"
            @click="(selectedChat = index)"
          >
            <div class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] mr-2 relative">
              <img
                :src="chat.image !== null && chat.image !== '' ? chat.image : '/images/guest.png'"
                alt="profile-picture"
                class="rounded-full w-full h-full"
              >
              <div :class="`w-2 h-2 absolute right-0 bottom-0 rounded-full bg-${chat.isActive ? 'green' : 'gray'}`" />
            </div>
            <div class="flex flex-col w-full">
              <div class="flex justify-between">
                <span :class="`text-b-4 text-gray-800 font-${selectedChat === index ? 'bold' : 'medium'}`">
                  {{ chat.name }}
                </span>
                <span class="text-c-2 text-grey-blue-700 font-normal">
                  {{ chat.messageList[chat.messageList.length - 1].postTime }}
                </span>
              </div>
              <div class="flex justify-between">
                <div class="flex">
                  <span class="text-c-1 font-medium text-tuna mr-1">
                    {{ chat.userCount > 1 ? chat.messageList[chat.messageList.length - 1].name + ':' : null }}
                  </span>
                  <span class="cutted-text text-c-1 font-normal text-gray">
                    {{ chat.messageList[chat.messageList.length - 1].message }}
                  </span>
                </div>
                <div v-if="chat.unreadMessages > 0" class="pl-2">
                  <div class="rounded-full w-4 h-4 flex items-center justify-center text-c-2 font-semibold bg-lime text-white">
                    {{ chat.unreadMessages }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <ChatRoom :messages="chatList[selectedChat].messageList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Chat } from '@/models/common/Chat'

export default Vue.extend({
  name: 'LoadMessages',
  data () {
    return {
      searchTerm: '',
      selectedChat: 0,
      userName: 'Admin',
      chatList: [
        {
          name: 'BL - 09362',
          image: '',
          userCount: 3,
          isActive: true,
          unreadMessages: 0,
          messageList: [
            {
              name: 'Cameron Williamson',
              image: '',
              message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
              postDate: '29 July',
              postTime: '15:58'
            },
            {
              name: 'Guy Howkins',
              image: '/images/Ellipse_49.png',
              message: 'Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
              postDate: '29 July',
              postTime: '16:00'
            },
            {
              name: 'Admin',
              image: '',
              message: 'Test',
              postDate: '29 July, 15:58',
              postTime: '17:12'
            }
            // {
            //   name: 'Bill Sanders',
            //   image: '/images/blog_avatar_2.png',
            //   message: 'Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            //   postDate: '29 July',
            //   postTime: '17:17'
            // }
          ]
        }
      ] as Chat[]
    }
  }
})
</script>

<style scoped>
.cutted-text{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
