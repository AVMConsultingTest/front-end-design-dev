<template>
  <div class="flex mt-24 col-12">
    <div class="flex col-12 flex-wrap">
      <LandingCaseStudy v-for="(item, index) in cases" :key="index" :item="item" :big-item="item.big" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LandingCaseStudy from './LandingCaseStudy.vue'

export default Vue.extend({
  name: 'LandingCaseList',
  components: { LandingCaseStudy },
  data () {
    return {
      cases: [
        {
          id: 1,
          image: '/images/blog-1.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Read Adidas’s case study',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar.png',
          writer: 'Olivia Rhye',
          date: '16 May 2023',
          big: true
        },
        {
          id: 2,
          image: '/images/blog-1.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Read ebay’s case study',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: true
        },
        {
          id: 3,
          image: '/images/blog-1.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Read Adidas’s case study',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 4,
          image: '/images/blog-1.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Read ebay’s case study',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 5,
          image: '/images/blog-1.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Read Letgo’s case study',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 6,
          image: '/images/blog-1.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Read Letgo’s case study',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 7,
          image: '/images/blog-1.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Read ebay’s case study',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        },
        {
          id: 8,
          image: '/images/blog-1.png',
          tag: 'Design',
          readTime: '8 min read',
          title: 'Read ebay’s case study',
          description: 'Lorem ipsum dolor sit amet consectetur. Rhoncus nec morbi quam leo tristique dignissim consequat quam. Nisl nam viverra.',
          avatar: '/images/blog_avatar_2.png',
          writer: 'Phoenix Baker',
          date: '16 May 2023',
          big: false
        }
      ]
    }
  }
})
</script>

  <style scoped>

  </style>
