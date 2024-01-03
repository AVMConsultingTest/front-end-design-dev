<template>
  <div>
    <header class="h-[30rem] bg-landing relative">
      <LandingHeader />
      <div class="banner-text absolute top-0 bottom-0 flex justify-center items-center flex-col left-0 right-0 z-10 h-[30rem]">
        <span class="border rounded-2xl !border-[#344159] items-center w-24 h-6 bg-[#344159] font-medium text-sm mb-5 leading-5 text-center text-[#98A2B3]">Case Studies</span>
        <h1 class="xl:w-[638px] lg:xl:w-[638px] w-full font-normal text-32 xl:text-5xl lg:text-5xl text-center text-white col-6 !leading-[60px]">
          Do you have any questions?
          <br> We’re here to help you
        </h1>
      </div>
    </header>
    <div class="landing-container landing-mobil xl:max-w-[1440px] lg:max-w-[1440px] lg:mx-auto xl:mx-auto mx-4 max-w-full">
      <section class="xl:mb-36 lg:mb-36 mb-24">
        <div class="text-center xl:mt-24 lg:mt-24 mt-16">
          <h2 class="font-semibold text-36 leading-[44px]">
            Frequently asked questions
          </h2>
          <p class="mt-5 font-light text-b-2 text-[#475467] leading-[30px]">
            Everything you need to know about the brokers and carriers
          </p>
        </div>
        <TabManager class="mt-10 mb-24" :tab-names="tabNames">
          <template #for_carriers>
            <div class="xl:mt-20 lg:mt-20 mt-10">
              <div class="xl:col-6 lg:col-6 mx-auto m-0">
                <BaseAccordion
                  v-for="(accordion, index) in accordions"
                  :key="index"
                  :title="accordion.title"
                  class="font-medium text-c-0 leading-7"
                  :open="index === 0"
                  :index="index"
                  :current-index="currentIndex"
                  @active="currentIndex = index"
                >
                  <p class="col-10 font-normal text-base text-[#101828]">
                    {{ accordion.content }}
                  </p>
                </BaseAccordion>
              </div>
            </div>
          </template>
          <template #for_brokers>
            <div class="xl:mt-20 lg:mt-20 mt-10">
              <div class="xl:col-6 lg:col-6 mx-auto m-0">
                <BaseAccordion
                  v-for="(accordion, index) in accordions"
                  :key="index"
                  :title="accordion.title"
                  class="font-medium text-c-0 leading-7"
                  :open="index === 0"
                  :index="index"
                  :current-index="currentIndex"
                  @active="currentIndex = index"
                >
                  <p class="col-10 font-normal text-base text-[#101828]">
                    {{ accordion.content }}
                  </p>
                </BaseAccordion>
              </div>
            </div>
          </template>
        </TabManager>
      </section>
    </div>

    <LandingFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { ButtonTypeEnum, SizeTypeEnum, ActionTypeEnum } from '~/components/ts/enums'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import TabManager from '~/components/TabManager.vue'
// @ts-ignore
import BaseAccordion from '~/components/BaseAccordion.vue'

export default Vue.extend({
  name: 'LandingHomePage',
  components: { TabManager, BaseAccordion },
  data () {
    return {
      ButtonTypeEnum,
      SizeTypeEnum,
      ActionTypeEnum,
      currentIndex: 0,
      tabNames: ['For Carriers', 'For Brokers'],
      imgUrl: '/images/Logo_White.png',
      companyInfo: {
        img: '/images/company_logo.png',
        name: 'Dirilis Group'
      },
      accordions: [
        {
          title: 'Do I have to provide credit card details for the free trial?',
          content: 'No, we do not require your credit card details for the two-week free trial.'
        },
        {
          title: 'Can I cancel my trial before the two weeks are up?',
          content: 'Yes, you can cancel your trial at any time within the two-week period without any obligation.'
        },
        {
          title: 'Do I need to install any software for the trial?',
          content: 'No, NebulaGTS is a web-based platform. All you need is an internet connection to access our platform.'
        },
        {
          title: 'Will I receive customer support during my free trial?',
          content: 'Absolutely! Our support team is available to assist you throughout your trial period.'
        },
        {
          title: 'Can I change my plan after the trial?',
          content: 'Yes, you can upgrade or downgrade your plan at any time after the trial.'
        },
        {
          title: 'Can I get a demo or training during my trial?',
          content: 'Yes, we can arrange a demo or training session upon request.'
        }
      ]
    }
  }

})
</script>

  <style>
      @media (max-width: 600px) {
  .landing-container.landing-mobil .landing-tab span{
    font-size:16px !important;
       }
       .landing-container.landing-mobil .landing-tab span{
        height: 32px;
       }
      .landing-container .landing-tab{
        height: 40px !important;
       }
    }

    .landing-container .landing-tab{
    align-items: center;
    justify-content: space-evenly;
    width: 320px;
    height: 76px;
    margin: 0 auto;
    border-radius: 3000px;
    background: rgba(228, 244, 249, 0.5);
    border: 1px solid #A7DCFA;
  }
  .landing-container .landing-tab .tab-button{
    background: transparent;
    border: unset;
  }
  .landing-container .landing-tab span{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 146px;
    height: 56px;
    border-radius: 3000px !important;
    font-weight: 500 !important;
    color: #1C1F27;
  }
  .landing-container .landing-tab .bg-green-200  span{
    color:white;
    background: #4478FF;
  }
  .col-11{
    width: 91.6667%;
    flex: 0 0 auto;
  }

  </style>
