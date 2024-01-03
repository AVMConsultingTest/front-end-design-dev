<template>
  <div>
    <header class="bg-landing relative xl:h-[700px] md:h-[680px]">
      <LandingHeader />
      <div class="max-w-[1440px] mx-auto">
        <div class="banner-text top-0 bottom-0 flex justify-center items-center flex-col left-0 right-0 z-10">
          <div class="col-12 flex xl:mt-[50px] md:mt-10">
            <div class="col-4 my-0 mx-auto flex justify-center flex-col">
              <h1 class="font-medium xl:text-[48px] lg:!text-[28px] text-start text-white">
                The All-In-One Stop<br><br> Ecosystem for<br><br>
                <strong class="text-green-400 xl:text-[48px] lg:!text-[28px] font-medium">Freight Broker & Carrier</strong>
              </h1>
              <span class="mt-4 text-b-3 leading-6 text-[#D0D5DD] font-normal">
                NebulaGTS's innovative TMS redefines carrier operations, offering superior visibility, smart route optimization, and seamless integration, establishing a groundbreaking benchmark in freight transportation.
              </span>
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.LG"
                :action="ActionTypeEnum.SUBMIT"
                class="mt-8 bg-transparent border border-[#696E82] xl:!w-64 lg:!w-48 !h-14 mb-10 !col-4"
                @click="()=> $router.push('/request-free-demo')"
              >
                Book a Demo
              </Button>
            </div>
            <div class="col-6 Banner-images flex">
              <img src="/images/landing-new.png" alt="landing" class="object-contain mt-14 mb-14 md:mt-0 h-[520px]">
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="max-w-[1440px] mx-auto h-[180px] flex justify-center items-center flex-col bg-[#eaedf080]">
      <div class="col-10 my-0 mx-auto">
        <div class="brands justify-center flex mt-7">
          <img src="/images/jrd-logo.png" alt="landing" class="object-contain col-1 max-h-8">
          <img src="/images/gurman-logo.png" alt="landing" class="object-contain col-1 max-h-8 ml-[120px]">
          <img src="/images/sambasafety_logo_horiz_rgb.jpg" alt="landing" class="object-contain col-2 max-h-8 ml-[80px]">
        </div>
        <div class="col-12 flex justify-center mt-6">
          <span class="text-b-3 font-normal text-gray-500">
            NebulaGTS is the Premium Standard in Advanced Transportation Management Systems.
          </span>
        </div>
      </div>
    </section>
    <div class="max-w-[1440px] mx-auto">
      <section class="mt-[120px]">
        <div class="flex justify-center items-center flex-col col-10 my-0 mx-auto">
          <h4 class="font-medium text-xl text-[#98A2B3]">
            Why Nebula?
          </h4>
          <h2 class="font-normal text-3xl text-gray-800">
            You’ve many reasons...
          </h2>
          <div class="col-12 flex text-center mt-16">
            <div class="col-4 mr-12">
              <img src="/images/map.png" alt="landing" class="object-contain my-0 mx-auto">
              <h4 class="font-medium text-c-0 leading-7 text-gray-800 mt-8">
                Transparency
              </h4>
              <p class="mt-2 font-normal text-center my-0 mx-auto">
                Achieve real-time visibility into your operations, empowering carriers with comprehensive oversight of their fleet to minimize downtime and enhance efficiency.
              </p>
            </div>
            <div class="col-3 mr-12">
              <img src="/images/box.png" alt="landing" class="object-contain my-0 mx-auto">
              <h4 class="font-medium text-c-0 leading-7 text-gray-800  mt-8">
                Efficiency
              </h4>
              <p class="mt-2 font-normal text-center my-0 mx-auto">
                NebulaGTS empowers both carriers and brokers to streamline their operations with utmost efficiency.
              </p>
            </div>
            <div class="col-4 ">
              <img src="/images/wallet.png" alt="landing" class="object-contain my-0 mx-auto">
              <h4 class="font-medium text-c-0 leading-7 text-gray-800  mt-8">
                Scalability
              </h4>
              <p class="mt-2 font-normal text-center my-0 mx-auto">
                NebulaGTS is meticulously crafted to accommodate your growth trajectory. Our adaptable platform seamlessly scales to meet the requirements of operations at any scale.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <TabManager class="xl:mt-28 lg:mt-28 lg:px-[72px] xl:px-0" :tab-names="tabNames">
          <template #for_carriers>
            <div class="text-center mt-20 m-0 mx-auto col-7">
              <h4 class="text-b-2 text-[#98A2B3] font-medium">
                Our Solutions
              </h4>
              <h2 class="font-medium xl:text-[40px] lg:text-[27px]">
                Revolutionary Solutions for Your Needs
              </h2>
              <p class="text-b-3 col-10 m-0 mx-auto font-normal text-[#667085]">
                Experience our revolutionary solutions tailored to meet your specific needs, setting a new standard of innovation in the industry.
              </p>
            </div>
            <div class="mt-20 mb-24 flex justify-between xl:justify-evenly xl:items-center">
              <div class="col-5">
                <img src="/images/3d-cube-scan.png" alt="landing" class="object-contain w-14 h-14">

                <h2 class="title font-medium text-36 text-gray-900 mt-6">
                  Safety Management
                </h2>
                <h6 class="text-[#475467] font-normal text-b-3 !leading-[30px] mt-2 xl:w-[520px]">
                  Safety Management is a fundamental aspect of any Transportation Management System (TMS). Nebula GTS integrates cutting-edge safety measures into its platform, safeguarding both personnel and cargo, thereby ensuring the operational continuity of your business.
                </h6>
                <a href="/safety">
                  <Button
                    class="!font-semibold !bg-dark-blue mt-8 !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
              <div class="xl:col-4 lg:col-5">
                <img src="/images/safety.png" alt="landing" class="object-contain w-full">
              </div>
            </div>
            <div class="flex justify-between xl:justify-evenly xl:items-center bg-[#FAFAFC]">
              <div class="xl:col-4 md:col-4 lg:col-5 mt-[104px] mb-[104px]">
                <img src="/images/dispatch.png" alt="landing" class="object-contain">
              </div>
              <div class="col-5 sm:mt-20 xl:mt-0 xl:mb-0 lg:mb-10">
                <img src="/images/tag-right.png" alt="landing" class="object-contain w-14 h-14">
                <h2 class="title font-medium text-36 text-gray-900 mt-6">
                  Dispatch Management
                </h2>
                <h6 class="text-[#475467] !leading-[30px] text-b-3 mt-2 font-normal xl:w-[520px]">
                  In the dynamic world of transportation, successful dispatch management is crucial. NebulaGTS offers a robust dispatch management system that streamlines your operations, boosts efficiency, and enhances customer satisfaction.
                </h6>
                <a href="/dispatch">

                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div class="flex justify-between xl:justify-evenly xl:items-center">
              <div class="col-5 sm:mt-20 xl:mt-0">
                <img src="/images/wallet-check.png" alt="landing" class="object-contain h-14 w-14">
                <h2 class="title font-medium text-36 text-gray-900 mt-6">
                  Accounting Management
                </h2>
                <h6 class="text-[#475467] font-normal text-b-3 !leading-[30px] mt-2 xl:w-[520px]">
                  Streamlining Accounting and Financial Management In the fast-paced world of transportation, efficient and precise financial management is key to success.
                </h6>
                <a href="/accounting">
                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
              <div class="xl:col-4 lg:col-5 mt-[104px] mb-[104px]">
                <img src="/images/accounting.png" alt="landing" class="object-contain">
              </div>
            </div>
          </template>
          <template #for_brokers>
            <div class="text-center mt-20 m-0 mx-auto col-7">
              <h4 class="text-b-2 text-[#98A2B3] font-medium">
                Our Solutions
              </h4>
              <h2 class="font-medium xl:text-[40px] lg:text-[27px]">
                Revolutionary Solutions for Your Needs
              </h2>
              <p class="text-b-3 col-10 m-0 mx-auto font-normal text-[#667085]">
                Experience our revolutionary solutions tailored to meet your specific needs, setting a new standard of innovation in the industry.
              </p>
            </div>
            <div class="mt-20 mb-24 flex xl:justify-evenly xl:items-center justify-between xl-justify">
              <div class="col-5">
                <img src="/images/profile-2user.png" alt="landing" class="object-contain w-14 h-14">
                <h2 class="title font-medium text-36 leading-[53px] text-gray-900 mt-5">
                  Customer and Carrier Management
                </h2>
                <h6 class="text-[#475467] font-normal text-b-3 !leading-[24px] mt-2 xl:w-[520px]">
                  Optimize your logistics with our powerful Operational Map. Gain real-time visibility and control over your transportation network. Track shipments, monitor routes, and manage resources efficiently. Streamline operations, reduce costs, and deliver exceptional service to your customers.
                </h6>
                <a href="/broker/customer-carrier">
                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
              <div class="xl:col-4 lg:col-5">
                <img src="/images/landing-broker-carrier.png" alt="landing" class="object-contain w-full">
              </div>
            </div>
            <div class="flex xl:justify-evenly xl:items-center justify-between bg-[#FAFAFC]">
              <div class="xl:col-4 md:col-4 lg:col-5 mt-[104px] mb-[104px]">
                <img src="/images/landing-broker-load.png" alt="landing" class="object-contain w-full">
              </div>
              <div class="col-5 sm:mt-20 xl:mt-0">
                <img src="/images/box-time.png" alt="landing" class="object-contain w-14 h-14">
                <h2 class="title font-medium text-36 text-gray-900 mt-6">
                  Load Management
                </h2>
                <h6 class="text-[#475467] font-normal text-b-3 !leading-[24px] mt-2 xl:w-[520px]">
                  In the dynamic world of transportation, successful dispatch management is crucial. NebulaGTS offers a robust dispatch management system that streamlines your operations, boosts efficiency, and enhances customer satisfaction.
                </h6>
                <a href="/broker/load-management">

                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            <div class="flex xl:justify-evenly xl:items-center justify-between">
              <div class="col-5 sm:mt-20 xl:mt-0">
                <img src="/images/wallet-check-green.png" alt="landing" class="object-contain h-14 w-14">
                <h2 class="title font-medium text-36 text-gray-900 mt-6">
                  Invoicing
                </h2>
                <h6 class="text-[#475467] font-normal text-b-3 !leading-[24px] mt-2 xl:w-[520px]">
                  Supercharge your logistics operations with our innovative Marketplace feature, designed to revolutionize how you source and manage your transportation services. Seamlessly integrated into our Transportation Management System (TMS) platform, our Marketplace opens up a world of possibilities, connecting you with a vast network of trusted carriers, brokers, and shippers.
                </h6>
                <a href="/broker/invoicing">
                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
              <div class="xl:col-4 lg:col-5 mt-[104px] mb-[104px]">
                <img src="/images/landing-broker-invoicing.png" alt="landing" class="object-contain">
              </div>
            </div>
            <div class="flex xl:justify-evenly xl:items-center justify-between bg-[#FAFAFC]">
              <div class="xl:col-4 md:col-4 lg:col-5 mt-[104px] mb-[104px]">
                <img src="/images/landing-broker-access.png" alt="landing" class="object-contain">
              </div>
              <div class="col-5 sm:mt-20 xl:mt-0 xl:mb-0 lg:mb-10">
                <img src="/images/truck-2.png" alt="landing" class="object-contain w-14 h-14">
                <h2 class="title font-medium text-36 text-gray-900 mt-6">
                  Access Management and
                  UI Customization
                </h2>
                <h6 class="text-[#475467] text-b-3 !leading-[24px] mt-2 font-normal xl:w-[520px]">
                  Take control of your logistics operations with our comprehensive Shipment Management feature integrated into our Transportation Management System (TMS) platform. Streamline your shipping process, optimize routes, and ensure timely deliveries with our powerful and intuitive solution.
                </h6>
                <a href="/broker/access-management">
                  <Button
                    class="!font-semibold mt-8 !bg-dark-blue !col-4 !text-white !border !border-dark-blue !text-b-3 !w-[170px] !h-14"
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          </template>
        </TabManager>
      </section>
      <section class="tab-second bg-landing">
        <TabManager class="" :tab-names="tabNames">
          <template #for_carriers>
            <div class="col-10 xl:col-10 m-0 mx-auto">
              <div>
                <h5 class="font-medium mb-2 text-xl flex items-center text-gray-100">
                  Features
                </h5>
                <h2 class="font-medium text-32 leading-[42px] flex items-center text-white col-7">
                  Streamline Your Operations with Efficient Logistics Management
                </h2>
              </div>
              <div class="col-12 flex">
                <div class="col-4 mt-20">
                  <img src="/images/icon-one.png" alt="landing" class="object-contain w-12 h-12">
                  <h3 class="font-semibold text-xl leading-6 text-white mt-2">
                    Real-Time Visibility and Control
                  </h3>
                  <h6 class="font-normal text-b-4 text-[#D0D5DD] col-10 mt-2">
                    NebulaGTS offers real-time visibility into your logistics operations, providing crucial data on the status of deliveries, vehicle locations, and more.
                  </h6>
                </div>
                <div class="col-4 mt-20">
                  <img src="/images/icon-two.png" alt="landing" class="object-contain w-12 h-12">
                  <h3 class="font-semibold text-xl leading-6 text-white mt-2">
                    Automated Processes
                  </h3>
                  <h6 class="font-normal text-b-4 text-[#D0D5DD] col-10 mt-2">
                    Nebula TMS automates key logistics processes, reducing manual work and increasing accuracy.
                  </h6>
                </div>
                <div class="col-4 mt-20">
                  <img src="/images/icon-three.png" alt="landing" class="object-contain w-12 h-12">
                  <h3 class="font-semibold text-xl leading-6 text-white mt-2">
                    Time-Saving Features
                  </h3>
                  <h6 class="font-normal text-b-4 text-[#D0D5DD] col-12 mt-2">
                    Our platform offers a suite of features designed to save you time. From automated route planning to real-time tracking.
                  </h6>
                </div>
              </div>
              <div class="col-12 flex">
                <div class="col-4 mt-20">
                  <img src="/images/icon-four.png" alt="landing" class="object-contain w-12 h-12">
                  <h3 class="font-semibold text-xl leading-6 text-white mt-2">
                    Seamless Supply Chain Integration
                  </h3>
                  <h6 class="font-normal text-b-4 text-[#D0D5DD] col-10 mt-2">
                    Our platform seamlessly integrates with your supply chain, creating a cohesive and efficient logistics operation.
                  </h6>
                </div>
                <div class="col-4 mt-20">
                  <img src="/images/icon-five.png" alt="landing" class="object-contain w-12 h-12">
                  <h3 class="font-semibold text-xl leading-6 text-white mt-2 xl:w-auto lg:w-[250px]">
                    Optimized Logistics Planning
                  </h3>
                  <h6 class="font-normal text-b-4 text-[#D0D5DD] col-10 mt-2">
                    NebulaGTS allows you to plan and schedule your operations with precision, ensuring optimal utilization of resources and reducing operational costs.
                  </h6>
                </div>
                <div class="col-4 mt-20">
                  <img src="/images/icon-six.png" alt="landing" class="object-contain w-12 h-12">
                  <h3 class="font-semibold text-xl leading-6 text-white mt-2">
                    Cost Reduction
                  </h3>
                  <h6 class="font-normal text-b-4 text-[#D0D5DD] col-12 mt-2">
                    Our platform improves fuel efficiency through optimized route planning, reduces maintenance costs through proactive vehicle management, and minimizes administrative expenses through automation.
                  </h6>
                </div>
              </div>
            </div>
          </template>
        </TabManager>
      </section>
      <section>
        <div class="col-12 xl:col-10 lg:col-10 m-0 mx-auto flex mt-32">
          <div class="col-6">
            <div>
              <h5 class="font-medium font-20 flex mb-3.5 text-[#98A2B3] items-center">
                FAQ
              </h5>
              <h2 class="font-normal text-32  leading-[40px] text-[#060B27] col-10">
                What do you wonder about Nebula GTS ?
              </h2>
              <p class="font-normal  font-20 leading-[30px] flex items-center text-gray-600 mt-6 col-8">
                Simplify your logistics, streamline operations, and optimize efficiency with ease.
              </p>
              <Button
                :type="ButtonTypeEnum.PRIMARY"
                :size="SizeTypeEnum.MD"
                :action="ActionTypeEnum.SUBMIT"
                class="bg-dark-blue mt-6 !col-3 !w-[175px] !h-14"
                @click="() => $router.push(' /faq')"
              >
                See all FAQ
                <Icon
                  icon="arrow-right"
                  variant="linear"
                  color="white"
                  :alpha="400"
                  class="w-6 h-6 cursor-pointer ml-2"
                  :disable-fill="true"
                />
              </Button>
            </div>
          </div>
          <div class="col-6">
            <div>
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
        </div>
        <div class="relative">
          <div class="acord-banner h-[15.75rem] dark:shadow-none absolute left-0 right-0 top-0 -z-10" />
          <div class="col-10 m-0 mx-auto rounded-3xl bg-landing flex mt-24">
            <div class="col-10 xl:col-10 m-0 mx-auto flex justify-between py-16">
              <div class="col-6 mt-3">
                <div class="flex justify-start mb-8 items-center rounded-2xl font-medium leading-7 bg-[#92BAFB1A] text-b-4 text-green-400 w-[262px] h-[36px]">
                  <img src="/images/magicpen.png" alt="landing" class="object-contain max-h-6 max-w-6 mr-2 ml-5">
                  <div class="">
                    Discover all features with us!
                  </div>
                </div>
                <h1 class="font-normal text-3xl leading-10 text-white">
                  Let’s start your journey!
                </h1>
                <p class="font-normal   text-b-3 leading-7 text-[#D0D5DD] mt-3">
                  Experience the power of our cutting-edge solution with a
                  <br>
                  personalized demo. Book now and unlock new
                  <br>
                  possibilities for your business.
                </p>
                <Button
                  :type="ButtonTypeEnum.SECONDARY"
                  :size="SizeTypeEnum.MD"
                  :action="ActionTypeEnum.SUBMIT"
                  class="mt-10 p-4 !col-4 border-[#696E82] !text-white bg-transparent"
                  @click="()=> $router.push('/request-free-demo')"
                >
                  Book a demo
                </Button>
              </div>
              <div clasS="col-6">
                <img src="/images/apple.png" alt="landing" class="object-contain">
              </div>
            </div>
          </div>
        </div>
        <div class="relative mt-[76px] bg-white h-[503px] xl:px-[130px] lg:px-[90px]">
          <div class="col-12 flex">
            <div class="col-12 flex justify-between">
              <div class="col-6 mt-24 mr-[100px]">
                <div class="font-medium text-b-2 !leading-[26px] text-gray-100">
                  About Us
                </div>
                <h1 class="font-semibold mt-[14px] xl:text-[40px] lg:text-[27px] !leading-[50px] text-dark xl:w-[627px] lg:w-[580px]">
                  Forward-thinking entity reshaping the<strong class="text-[#98A2B3] font-semibold xl:text-[40px] lg:text-[27px] !leading-[50px]">
                    landscape of transport management systems
                  </strong>
                </h1>
                <a href="/about-us">
                  <Button
                    :type="ButtonTypeEnum.PRIMARY"
                    :size="SizeTypeEnum.MD"
                    :action="ActionTypeEnum.SUBMIT"
                    class="bg-dark-blue mt-12 !col-3 !w-[174px] !h-14"
                  >
                    Learn More
                    <Icon
                      icon="arrow-right"
                      variant="linear"
                      color="white"
                      :alpha="400"
                      class="w-6 h-6 cursor-pointer ml-2"
                      :disable-fill="true"
                    />
                  </Button>
                </a>
              </div>
              <div clasS="col-5 flex mt-24 justify-center items-center">
                <span class="font-normal text-18 leading-8 text-[#667085]">
                  Our inception was marked by a single, profound question: "How can we redefine the efficiency and user-friendliness of transport management?" This query propelled us to design and develop Nebula GTS, an innovative platform that brings a new level of optimization and simplicity to logistics and supply chain management.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <LandingFooter />
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
