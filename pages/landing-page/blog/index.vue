<template>
  <div>
    <LandingBanner title="Nebula GTS Blog" sub-title="The latest industry news, interviews, technologies, and resources." tag="Blog" />
    <div class="max-w-[1440px] mx-auto">
      <section class="mt-24">
        <div class="xl:mr-5 lg:mr-[55px] flex justify-center items-start flex-col col-11 my-0 mx-auto">
          <h4 class="font-medium mb-3 text-b-3 text-dark-blue">
            Our Blog
          </h4>
          <h2 class="font-normal text-[48px] text-[#101828]">
            Resources and insights
          </h2>
          <h5 class="font-normal mt-6 text-[#475467]">
            The latest industry news, interviews, technologies, and resources.
          </h5>
        </div>
        <LandingBlogList />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { ButtonTypeEnum, SizeTypeEnum, ActionTypeEnum } from '~/components/ts/enums'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import LandingBanner from '~/components/landing/LandingBanner.vue'
import LandingBlogList from '~/components/landing/LandingBlogList.vue'

export default Vue.extend({
  name: 'LandingBlogPage',
  components: { LandingBanner, LandingBlogList },
  layout: 'Landing',
  data () {
    return {
      ButtonTypeEnum,
      SizeTypeEnum,
      ActionTypeEnum,
      imgUrl: '/images/Logo_White.png',
      companyInfo: {
        img: '/images/company_logo.png',
        name: 'Dirilis Group'
      }
    }
  }
})
</script>

<style>
.menu-item.exact-link-active {
    @apply bg-indigo-900
}
.detail-bar {
    border-radius: 16px;
    width: 138px;
    height: 30px;
}
.detail-text {
    background: #EAECF0;
}

.pagination .prev,
  .pagination .next {
    @apply transition-all text-sm w-8 h-8 border-gray-200 mr-2 flex items-center justify-center border rounded-lg dark:border-grey-dark-800 dark:text-white;
  }

  .pagination .page-number {
    @apply transition-all text-sm w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer mr-2 hover:bg-gray-800 hover:text-white dark:text-grey-dark-100 dark:hover:text-white;
  }
</style>
