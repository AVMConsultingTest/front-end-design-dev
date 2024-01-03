<template>
  <div>
    <header class="bg-landing">
      <LandingHeader />
    </header>
    <LandingBanner title="Read Adidas Case Study" sub-title="The latest industry news, interviews, technologies, and resources." tag="Case Studies" />
    <section class="mt-24">
      <div class="flex justify-center items-start flex-col col-10 my-0 mx-auto">
        <div class="contents">
          <img :src="findTheCase('headImg')" alt="blog-detail" class="object-contain w-full">
        </div>
        <div class="col-12 flex mt-8 justify-between">
          <div class="flex">
            <div class="flex flex-col mr-16">
              <span class="text-[#98A2B3] text-b-4 mb-3 font-semibold">{{ findTheCase('operationManagerTitle') }}</span>
              <span class="text-[18px] font-medium text-dark">{{ findTheCase('operationManager') }}</span>
            </div>
            <div class="flex flex-col ml-3">
              <span class="text-[#98A2B3] text-b-4 mb-3 font-semibold">
                {{ findTheCase('dateTitle') }}
              </span>
              <span class="text-[18px] font-medium text-dark">
                {{ findTheCase('date') }}
              </span>
            </div>
          </div>
          <div class="flex">
            <div class="mr-3">
              <Button
                :type="ButtonTypeEnum.SECONDARY"
                :size="SizeTypeEnum.MD"
                :action="ActionTypeEnum.SUBMIT"
                class="border-[#D0D5DD] !text-[#667085] !w-[124px] !h-10"
              >
                Copy link
                <Icon
                  icon="copy"
                  variant="outline"
                  color="gray"
                  :alpha="0"
                  class="w-5 h-5 cursor-pointer ml-2"
                  :disable-fill="true"
                />
              </button>
            </div>
            <div v-for="(icon, index) in icons" :key="index" class="">
              <div
                class="flex flex-col items-center"
                :class="index === icons.length - 1 ? 'mr-12' : 'mr-3'"
              >
                <div class="p-3 rounded-lg border">
                  <Icon
                    :icon="icon"
                    :disable-fill="true"
                    color="gray"
                    :alpha="0"
                    variant="outline"
                    class="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 mt-[120px] mx-auto m-0">
          <p class="text-b-2 font-normal text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <hr class="mt-8 border[1px] border-[#EAECF0]">
          <h2 class="mt-14 text-b-0 font-bold">
            Introduction
          </h2>
          <p class="text-c-0 font-normal mt-5 text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <p class="text-c-0 font-normal mt-5 text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <div class="mt-8">
            <img src="/images/details-banner.png">
            <p class="mt-4">
              Image courtesy of Scott Webb via <b>Pexels</b>
            </p>
          </div>

          <p class="italic font-medium text-2xl leading-9 text-gray-900 mt-12">
            “In a world older and more complete than ours
            they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.”
          </p>
          <div class="mt-6 text-center flex justify-center items-center flex-col">
            <img src="/images/avatar-women.png">
            <P class="mt-0.5 font-bold">
              Olivia Rhye
            </P>
            <p class="mt-0.5">
              Product Designer
            </p>
          </div>

          <p class="text-c-0 font-normal mt-5 text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <p class="text-c-0 font-normal mt-5 text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <h2 class="mt-14 text-b-0 font-bold">
            Software and tools
          </h2>
          <p class="text-c-0 font-normal mt-5 text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <p class="text-c-0 font-normal mt-5 text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <h2 class="mt-14 text-b-0 font-bold">
            Other resources
          </h2>
          <p class="text-c-0 font-normal mt-5 text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <ol class="text-c-0 font-normal mt-5 text-[#344054]">
            <li>1.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>2.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>3.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          </ol>
          <div class="mt-8">
            <img src="/images/shoes.png">
            <p class="mt-4">
              Image courtesy of Leon via  <b>Unsplash</b>
            </p>
          </div>
          <p class="text-c-0 font-normal mt-5 text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <p class="text-c-0 font-normal mt-5 text-[#344054]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
          </p>
          <div class="bg-[#F3F1F9] p-5 mt-14 rounded-lg">
            <h2 class="text-b-0 font-bold">
              Software and tools
            </h2>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
            </p>
            <p class="text-c-0 font-normal mt-5 text-[#344054]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ButtonTypeEnum, SizeTypeEnum, ActionTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  name: 'LandingCaseDetail',
  components: {},
  layout: 'Landing',
  data () {
    return {
      ButtonTypeEnum,
      SizeTypeEnum,
      ActionTypeEnum,
      cases: [
        {
          id: 1,
          image: '/images/blog_Truck.png',
          tag: 'Design',
          readTime: '8 min read',
          headImg: '/images/blog_detail.png',
          headTitle: 'Place blog’s title here',
          operationManagerTitle: 'Operation Manager',
          operationManager: 'Wade Warren',
          dateTitle: 'Date',
          headDesc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar.png',
          writer: 'Olivia Rhye',
          date: '16 May 2023',
          big: true
        },
        {
          id: 2,
          image: '/images/blog_boat.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 3,
          image: '/images/truck_convoy.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 4,
          image: '/images/blog_load.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 5,
          image: '/images/blog_shipyard.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 6,
          image: '/images/blog_boat_load.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 7,
          image: '/images/blog_load_shipyard.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 8,
          image: '/images/blog_boat_2.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 9,
          image: '/images/blog_study.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        }
      ],
      icons: [
        'twitter',
        'facebook',
        'linkedin'
      ]
    }
  },
  methods: {
    findTheCase (key:string): any {
      return this.cases[this.$route.params.id - 1][key]
    }
  }
})
</script>

<style scoped>

</style>
