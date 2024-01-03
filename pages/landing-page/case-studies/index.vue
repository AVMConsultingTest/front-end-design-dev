<template>
  <div>
    <LandingBanner title="Customer Stories" sub-title="The latest industry news, interviews, technologies, and resources." tag="Case Studies" />
    <LandingCaseList />
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
import LandingCaseList from '~/components/landing/LandingCaseList.vue'

export default Vue.extend({
  name: 'LandingCasePage',
  components: { LandingBanner, LandingCaseList },
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
</style>
