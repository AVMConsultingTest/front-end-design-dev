<template>
  <div>
    <header class="bg-landing">
      <LandingHeader />
    </header>
    <div class="max-w-[1440px] mx-auto">
      <section>
        <TabManager class="xl:mt-28 lg:mt-28 lg:px-[72px] xl:px-0" :tab-names="tabNames">
          <template #for_carriers>
            <div class="mt-20 mb-24 flex xl:justify-evenly xl:items-center justify-between xl-justify max-md:flex-col">
              <div class="col-5 max-md:col-12 max-md:p-5">
                <img src="/images/profile-2user.png" alt="landing" class="object-contain w-14 h-14">
                <h2 class="title font-medium text-36 leading-[53px] text-gray-900 mt-5">
                  Customer and Carrier Management
                </h2>
                <h6 class="text-[#475467] font-normal text-b-3 !leading-[24px] mt-2 xl:w-[520px]">
                  Optimize your logistics with our powerful Operational Map. Gain real-time visibility and control over your transportation network. Track shipments, monitor routes, and manage resources efficiently. Streamline operations, reduce costs, and deliver exceptional service to your customers.
                </h6>
                <nuxt-link to="/broker/customer-carrier">
                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </nuxt-link>
              </div>
              <div class="xl:col-4 lg:col-5 max-md:col-12">
                <img src="/images/landing-broker-carrier.png" alt="landing" class="object-contain w-full">
              </div>
            </div>
            <div class="flex xl:justify-evenly xl:items-center max-md:flex-col justify-between bg-[#FAFAFC]">
              <div class="xl:col-4 md:col-4 max-md:col-12 max-md:order-2 lg:col-5 mt-[104px] mb-[104px] max-md:mt-5">
                <img src="/images/landing-broker-load.png" alt="landing" class="object-contain w-full">
              </div>
              <div class="col-5 sm:mt-20 xl:mt-0 max-md:col-12 max-md:order-1 max-md:p-5">
                <img src="/images/box-time.png" alt="landing" class="object-contain w-14 h-14">
                <h2 class="title font-medium text-36 text-gray-900 mt-6">
                  Load Management
                </h2>
                <h6 class="text-[#475467] font-normal text-b-3 !leading-[24px] mt-2 xl:w-[520px]">
                  In the dynamic world of transportation, successful dispatch management is crucial. NebulaGTS offers a robust dispatch management system that streamlines your operations, boosts efficiency, and enhances customer satisfaction.
                </h6>
                <nuxt-link to="/broker/load-management">
                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </nuxt-link>
              </div>
            </div>
            <div class="flex xl:justify-evenly xl:items-center justify-between max-md:flex-col">
              <div class="col-5 sm:mt-20 xl:mt-0 max-md:col-12 max-md:p-5">
                <img src="/images/wallet-check-green.png" alt="landing" class="object-contain h-14 w-14">
                <h2 class="title font-medium text-36 text-gray-900 mt-6">
                  Invoicing
                </h2>
                <h6 class="text-[#475467] font-normal text-b-3 !leading-[24px] mt-2 xl:w-[520px]">
                  Supercharge your logistics operations with our innovative Marketplace feature, designed to revolutionize how you source and manage your transportation services. Seamlessly integrated into our Transportation Management System (TMS) platform, our Marketplace opens up a world of possibilities, connecting you with a vast network of trusted carriers, brokers, and shippers.
                </h6>
                <nuxt-link to="/broker/invoicing">
                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </nuxt-link>
              </div>
              <div class="xl:col-4 lg:col-5 max-md:col-12 mt-[104px] mb-[104px] max-md:mt-5">
                <img src="/images/landing-broker-invoicing.png" alt="landing" class="object-contain">
              </div>
            </div>
            <div class="flex xl:justify-evenly xl:items-center justify-between max-md:flex-col bg-[#FAFAFC]">
              <div class="xl:col-4 md:col-4 max-md:col-12 max-md:order-2 lg:col-5 mt-[104px] mb-[104px] max-md:mt-5">
                <img src="/images/landing-broker-access.png" alt="landing" class="object-contain">
              </div>
              <div class="col-5 max-md:col-12 sm:mt-20 xl:mt-0 max-md:order-1 xl:mb-0 lg:mb-10 max-md:p-5">
                <img src="/images/truck-2.png" alt="landing" class="object-contain w-14 h-14">
                <h2 class="title font-medium text-36 text-gray-900 mt-6">
                  Access Management and
                  UI Customization
                </h2>
                <h6 class="text-[#475467] text-b-3 !leading-[24px] mt-2 font-normal xl:w-[520px]">
                  Take control of your logistics operations with our comprehensive Shipment Management feature integrated into our Transportation Management System (TMS) platform. Streamline your shipping process, optimize routes, and ensure timely deliveries with our powerful and intuitive solution.
                </h6>
                <nuxt-link to="/broker/access-management">
                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </nuxt-link>
              </div>
            </div>
          </template>
        </TabManager>
      </section>
      <LandingFooter />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { ButtonTypeEnum, SizeTypeEnum, ActionTypeEnum } from '~/components/ts/enums'

import TabManager from '~/components/TabManager.vue'
// @ts-ignore

export default Vue.extend({
  name: 'LandingHomePage',
  components: { TabManager },
  data () {
    return {
      ButtonTypeEnum,
      SizeTypeEnum,
      ActionTypeEnum,
      currentIndex: 0,
      slickOptions: {
        autoplay: true,
        autoplaySpeed: 5000
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
        }
      ],
      imgUrl: '/images/Logo_White.png',
      companyInfo: {
        img: '/images/company_logo.png',
        name: 'Dirilis Group'
      }
    }
  },
  computed: {
    tabNames () {
      return ['For Carriers', 'For Brokers']
    }
  }
})
</script>

      <style>
      .menu-item.exact-link-active {
        @apply bg-indigo-900
      }
      .landing-tab{
        align-items: center;
        justify-content: space-evenly;
        width: 320px;
        height: 76px;
        margin: 0 auto;
        border-radius: 3000px;
        background: rgba(228, 244, 249, 0.5);
        border: 1px solid #A7DCFA;
        display: none;
      }
      .landing-tab .tab-button{
        background: transparent;
        border: unset;
      }
      .landing-tab span{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 146px;
        height: 56px;
        font-size:20px !important;
        border-radius: 3000px !important;
        font-weight: 500 !important;
        color: #1C1F27;
      }
      .landing-tab .bg-green-200  span{
        color:white;
        background: #4478FF;
      }

      .tab-second .landing-tab{
        margin-top: 3rem;
        background: #131C35;
        width:260px;
        height: 53px;
        margin: auto;
        margin-right: 7rem;
        border: 1px solid #21293B;
        display: none;
      }
      .tab-second {
        padding-top: 64px;
        padding-bottom: 64px;
      }
      .tab-second .text-gray-800{
        color:white;
      }
      .tab-second span{
        width: 115px;
        height: 37px;
        font-size: 14px !important;

      }
      .tab-second .bg-green-200  span{
        background: #344054;
      }
      .box-sizing{
        box-shadow: -2px 6px 13px rgba(209, 209, 209, 0.25);
        border-radius: 24px;
      }

      /* .mail-subrisce{
        display:none;
      } */

      .acord-banner{
        box-shadow: 0px 28px 32px rgba(213, 212, 212, 0.2), 0px 516px 207px rgba(196, 196, 196, 0.01), 0px 290px 174px rgba(196, 196, 196, 0.05), 0px 129px 129px rgba(196, 196, 196, 0.09), 0px 32px 71px rgba(196, 196, 196, 0.1), 0px 0px 0px rgba(196, 196, 196, 0.1);
        border-radius: 0px 0px 48px 48px;
      }

      .col-11{
        width: 91.6667%;
        flex: 0 0 auto;
      }

      .case-gap{
        column-gap: 32px;
        justify-content: space-around;
      }

     .right-icon svg{
      fill: #98A2B3;
     }
    </style>
