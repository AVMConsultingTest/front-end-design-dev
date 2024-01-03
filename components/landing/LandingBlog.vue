<template>
  <div class="contents">
    <div v-if="bigItem" class="col-12 flex mb-12">
      <div class="col-7 flex cursor-pointer" @click="$router.push(`/landing-page/blog/${blog.id}`)">
        <img :src="blog.image" alt="landing" class="object-contain">
      </div>
      <div class="flex col-4 pl-8 flex-col my-0">
        <div class="detail-bar flex justify-center items-center mb-4 bg-[#F2F4F7]">
          <p class="detail-text rounded-2xl bg-[EAECF0] font-medium text-center text-[#667085] w-14 h-[22px] text-c-1 mr-2">
            {{ blog.tag }}
          </p>
          <p class="bg-[EAECF0] font-medium text-[#667085] text-c-1">
            {{ blog.readTime }}
          </p>
        </div>
        <span class="xl:text-[30px] lg:text-[24px] font-medium text-dark cursor-pointer" @click="$router.push(`/landing-page/blog/${blog.id}`)">
          {{ blog.title }}
        </span>
        <span class="xl:text-b-3 lg:text-b-4 mt-3 font-normal text-[#475467] cursor-pointer" @click="$router.push(`/landing-page/blog/${blog.id}`)">
          {{ blog.description }}
        </span>
        <div class="flex items-center mt-5">
          <div class="col-auto pr-0 mr-2">
            <img :src="blog.avatar" alt="blog" class="rounded-full w-10 h-10">
          </div>
          <div class="col-auto">
            <span class="block text-b-4 font-medium whitespace-nowrap">
              {{ blog.writer }}
            </span>
            <span class="block text-b-4 font-normal text-[#98A2B3]">
              {{ blog.date }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="col-6 mb-12">
      <img :src="blog.image" alt="landing" class="object-contain cursor-pointer xl:w-[450px] lg:w-[300px]" @click="$router.push(`/landing-page/blog/${blog.id}`)">
      <div class="detail-bar flex justify-center items-center mt-8 mb-4 bg-[#F2F4F7]">
        <p class="detail-text rounded-2xl bg-[EAECF0] font-medium text-center text-[#667085] w-14 h-[22px] text-c-1 mr-2">
          {{ blog.tag }}
        </p>
        <p class="bg-[EAECF0] font-medium text-[#667085] text-c-1">
          {{ blog.readTime }}
        </p>
      </div>
      <div class="flex col-10 flex-col my-0">
        <div class="flex justify-between">
          <span class="text-b-1 font-medium text-dark cursor-pointer" @click="$router.push(`/landing-page/blog/${blog.id}`)">
            {{ blog.title }}
          </span>
          <div class="col-auto flex items-center justify-center cursor-pointer" @click="$router.push(`/landing-page/blog/${blog.id}`)">
            <Icon
              icon="arrow-up-right"
              color="black"
              class="w-[10px] h-[10px]"
              :disable-fill="true"
            />
          </div>
        </div>
        <span class="text-b-3 mt-3 font-normal text-[#475467] cursor-pointer" @click="$router.push(`/landing-page/blog/${blog.id}`)">
          {{ blog.description }}
        </span>
        <div class="flex items-center mt-5">
          <div class="col-auto pr-0 mr-2">
            <img :src="blog.avatar" alt="blog" class="rounded-full w-10 h-10">
          </div>
          <div class="col-auto">
            <span class="block text-b-4 font-medium whitespace-nowrap">
              {{ blog.writer }}
            </span>
            <span class="block text-b-4 font-normal text-[#98A2B3]">
              {{ blog.date }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LandingBlog',
  props: {
    blog: {
      type: Object,
      default: () => ({})
    },
    bigItem: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>

</style>
