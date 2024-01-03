<template>
  <div class="flex mt-24 col-12">
    <div class="col-4 flex-col flex justify-start items-center">
      <div class="!w-[280px] !h-11">
        <Input
          name="Test"
        />
      </div>
      <div class="xl:col-7 lg:col-10 text-start mt-8">
        <span class="text-b-4 font-medium text-dark-blue">
          Blog categories
        </span>
      </div>
      <div
        v-for="(category, index) in blogCategories"
        :key="index"
        class="col-5 flex items-center h-11 w-[280px] rounded-lg text-start mt-6 transition-all hover:bg-gray-300 cursor-pointer"
      >
        <span class="pl-3 text-b-3 font-medium text-[#344054]">
          {{ category }}
        </span>
      </div>
    </div>
    <div class="flex col-8 flex-wrap">
      <LandingBlog v-for="(blog, index) in blogs" :key="index" :blog="blog" :big-item="blog.big" />
      <div class="flex items-center justify-center">
        <Pagination :page-count="6" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LandingBlog from './LandingBlog.vue'

export default Vue.extend({
  name: 'LandingBlogList',
  components: { LandingBlog },
  data () {
    return {
      blogs: [
        {
          id: 1,
          image: '/images/blog_Truck.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo...',
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
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo...',
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
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo...',
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
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo...',
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
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo...',
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
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo...',
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
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo...',
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
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo...',
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
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo...',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        }
      ],
      blogCategories: [
        'View all',
        'Broker',
        'Carrier',
        'Safety Management',
        'Logistics',
        'Industry',
        'Management'
      ]
    }
  }
})
</script>

<style scoped>

</style>
