<template>
  <div class="overflow-hidden">
    <header class="bg-landing">
      <LandingHeader />
    </header>
    <section class="section my-0 mx-auto col-12 max-w-[1440px]">
      <div class="mt-[72px] flex flex-wrap overflow-hidden">
        <div class=" max-md:col-12 col-4 mx-auto my-auto px-4">
          <div class="flex justify-center max-md:mx-auto mb-6 items-center rounded-2xl font-medium leading-[18px] bg-purple-100 text-c-0 text-purple-500 w-[200px] h-[36px]">
            Safety Management
          </div>
          <h2 class="title max-md:text-center font-medium xl:text-[48px] lg:text-[32px] text-xl xl:leading-[60px] lg:leading-10 text-[#101828] mt-3 w-full xl:w-[612px]">
            Safety Management for carrier operations
          </h2>
          <h6 class="text-[#667085] font-normal !leading-[30px] mt-3 w-full xl:w-[548px] max-md:text-center">
            NebulaGTS integrates cutting-edge safety measures into its platform, safeguarding both personnel and cargo, thereby ensuring the operational continuity of your business.
          </h6>
          <span>
            <Button
              class="mt-10 mb-8 max-md:mx-auto  !col-6 xl:!col-4 lg:!col-4  "
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.SUBMIT"
              @click="()=> $router.push('/request-free-demo')"
            >
              Book a demo
            </Button>
          </span>
        </div>
        <div class="max-md:col-12 col-6 pl-4 max-md:px-4">
          <img src="/images/safety-detail.png" alt="landing" class="object-contain w-full max-md:rounded-[24px] ">
        </div>
      </div>
      <section class="mx-auto h-[180px] max-md:h-auto flex justify-center items-center flex-col">
        <div class="col-12 my-0 mx-auto px-4">
          <div class="brands mt-24">
            <vue-slick-carousel v-bind="logoSlickOptions" :arrows="false" :dots="true" class="md:flex md:items-center md:justify-center  slick-dot-pstn-brand">
              <div v-for="(logo, index) in logos" :key="index">
                <img :src="logo.src" :alt="logo.alt" class="object-contain max-md:col-12 col-8 lg:m-0 xl:mx-auto max-h-14 max-md:max-h-48 max-md:min-h-[5rem] max-md:min-w-[150px] max-md:max-w-[150px]">
              </div>
            </vue-slick-carousel>
          </div>
          <div class="col-12 flex justify-center mt-6 mb-10 max-md:text-center">
            <span class="text-b-3 max-md:text-14 font-normal text-gray-500">
              NebulaGTS is the Premium Standard in Advanced Transportation Management Systems.
            </span>
          </div>
        </div>
      </section>

      <div class="bg-[#F9FAFB] max-md:m-5 mx-[7.5rem]">
        <div class="xl:px-[18rem] lg:px-[5rem] flex flex-col items-center bg-[#F9FAFB] max-md:p-5">
          <h3 class="text-[#101828] text-[32px] max-md:text-[24px] mt-[120px] max-md:mt-[60px] font-medium leading-[56px] max-md:leading-[32px] text-center max-md:mb-0 mb-5">
            What Safety Management offer you?
          </h3>
        </div>
        <div class="px-20 max-md:px-0 bg-[#F9FAFB]">
          <div class="px-4 max-md:px-0 col-12">
            <div class="md:flex md:flex-wrap max-md:pb-12 pb-[7.5rem]">
              <vue-slick-carousel v-bind="smSlickOptions" :arrows="false" :dots="true" class="md:flex md:flex-wrap slick-dot-pstn">
                <div class="max-md:col-12 xl:col-4 lg:col-6 px-4 max-md:p-5 xl:mt-16 md:border-r-2 border-[#d0d5dd]">
                  <div class="flex flex-col items-start xl:ml-0 lg:ml-12">
                    <img src="/images/iconFleet.png" alt="landing" class="mt-8 h-16 w-16">
                    <h4 class="font-semibold text-c-0 leading-7 text-[#1C1F27] mt-6">
                      Fleet Management
                    </h4>
                    <p class="font-normal text-b-4 text-[#475467] !leading-[21px] mt-2 xl:mb-8 col-8 my-0 mx-0 w-[272px] max-md:w-full">
                      NebulaGTS provides a sophisticated maintenance tracking system. By scheduling preventative maintenance and closely monitoring the condition of each vehicle, our platform ensures your fleet operates at its peak efficiency, minimizes downtime, and reduces repair costs.
                    </p>
                  </div>
                </div>
                <div class="max-md:col-12 xl:col-4 lg:col-6 px-4 xl:mt-16 max-md:p-5 md:border-r-2 border-[#d0d5dd]">
                  <div class="flex flex-col items-start xl:ml-6 lg:ml-12">
                    <img src="/images/iconSafety.png" alt="landing" class="mt-8 h-16 w-16">
                    <h4 class="font-semibold text-c-0 leading-7 text-[#1C1F27] mt-6">
                      Safety Compliance
                    </h4>
                    <p class="font-normal text-b-4 text-[#475467] !leading-[21px] mt-2 col-8 my-0 mx-0 w-[272px] max-md:w-full">
                      NebulaGTS integrates seamlessly with CSA BASICs reports, providing automated tracking and monitoring of all safety-related aspects of your transportation operations.
                    </p>
                  </div>
                </div>
                <div class="max-md:col-12 xl:col-4 lg:col-6 px-4 xl:mt-16 md:border-none md:border-r-2 md:border-t-2 border-[#d0d5dd]">
                  <div class="flex flex-col items-start xl:ml-6 lg:ml-12">
                    <img src="/images/iconTelematic.png" alt="landing" class="mt-8 h-16 w-16">
                    <h4 class="font-semibold text-c-0 leading-7 text-[#1C1F27] mt-6">
                      Telematics Alerts
                    </h4>
                    <p class="font-normal text-b-4 text-[#475467] !leading-[21px] mt-2 col-8 my-0 mx-0 w-[272px] max-md:w-full">
                      NebulaGTS integrates advanced telematics to offer real-time alerts for potential safety and efficiency issues within your fleet.
                    </p>
                  </div>
                </div>
                <div class="max-md:col-12 xl:col-4 lg:col-6 px-4 md:border-t-2 md:border-r-2 border-[#d0d5dd]">
                  <div class="flex flex-col items-start xl:ml-0 lg:ml-12">
                    <img src="/images/iconDriver.png" alt="landing" class="mt-10 h-16 w-16">
                    <h4 class="font-semibold text-c-0 leading-7 text-[#1C1F27] mt-6">
                      Driver Management
                    </h4>
                    <p class="font-normal text-b-4 text-[#475467] !leading-[21px] mt-2 col-8 my-0 mx-0 w-[272px] max-md:w-full">
                      NebulaGTS provides comprehensive driver management, enabling real-time tracking of driver behavior, performance, and maintenance of driver documents.
                    </p>
                  </div>
                </div>
                <div class="max-md:col-12 xl:col-4 lg:col-6 px-4  md:border-t-2 md:border-r-2 border-[#d0d5dd]">
                  <div class="flex flex-col items-start xl:ml-6 lg:ml-12">
                    <img src="/images/iconMonitor.png" alt="landing" class="mt-10 h-16 w-16">
                    <h4 class="font-semibold text-c-0 leading-7 text-[#1C1F27] mt-6">
                      MVR Monitoring & Training
                    </h4>
                    <p class="font-normal text-b-4 text-[#475467] !leading-[21px] mt-2 col-8 my-0 mx-0 w-[272px] max-md:w-full">
                      NebulaGTS's comprehensive MVR monitoring service provides a robust solution for tracking and analyzing operators' driving records, seamlessly integrating with targeted training programs on the same platform.
                    </p>
                  </div>
                </div>
                <div class="max-md:col-12 xl:col-4 lg:col-6 px-4  mb-40  md:border-t-2 border-[#d0d5dd]">
                  <div class="flex flex-col items-start xl:ml-6 lg:ml-12">
                    <img src="/images/iconRisk.png" alt="landing" class="mt-10 h-16 w-16">
                    <h4 class="font-semibold text-c-0 leading-7 text-[#1C1F27] mt-6">
                      Risk Management
                    </h4>
                    <p class="font-normal text-b-4 text-[#475467] !leading-[21px] mt-2 col-8 my-0 mx-0 w-[272px] max-md:w-full">
                      NebulaGTS's risk management solution is about more than just avoiding problems, it's about leveraging insights to drive operational excellence.
                    </p>
                  </div>
                </div>
              </vue-slick-carousel>
            </div>
          </div>
        </div>
      </div>
      <section class="flex max-md:p-5 px-[7.5rem]">
        <div class="col-12 bg-purple-100">
          <VueSlickCarousel :arrows="true" :dots="false" class=" slick-dot-pstn">
            <template #prevArrow>
              <Icon
                icon="arrow-left"
                color="gray"
                :alpha="100"
                variant="outline"
                class="!w-8 !h-8"
              />
            </template>
            <template #nextArrow>
              <Icon
                icon="arrow-right-1"
                color="gray"
                :alpha="100"
                variant="outline"
                class="!w-8 !h-8"
              />
            </template>
            <div class="content-slider py-32 max-md:py-32 max-md:p-5">
              <div class="md:mx-[20%]">
                <h4 class="tagline font-medium text-[100px] max-md:text-[80px] text-purple-500">
                  “
                </h4>
                <p class="intro mt-2 font-normal max-md:text-14 text-20 leading-10 text-purple-1000">
                  Since implementing NebulaGTS into our operations, we've experienced a noticeable improvement in our efficiency and productivity. The platform's comprehensive features, from dispatch management to real-time fleet tracking, have proven to be invaluable for our day-to-day tasks. Furthermore, the user-friendly interface and dedicated customer support have made the transition seamless
                </p>
                <div class="items-center mt-10 max-md:text-center">
                  <div class="mb-4">
                    <div class="font-medium name text-b-4 text-purple-1000">
                      VP of Operation
                    </div>
                    <div class="font-medium sub-text mt-2 mb-6 text-c-1 text-[#98A2B3]">
                      JRD Transportation
                    </div>
                  </div>
                  <div class="">
                    <div class="">
                      <img src="/images/jrd-logo.png" alt="landing" class="object-contain w-[105px] max-md:m-0 max-md:mx-auto">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-slider py-32 max-md:py-32 max-md:p-5">
              <div class="md:mx-[20%]">
                <h4 class="tagline max-md:text-[80px] font-medium text-[100px] text-purple-500">
                  “
                </h4>
                <p class="intro mt-2 font-normal max-md:text-14 text-20 leading-10 text-purple-1000">
                  Utilizing NebulaGTS for our Transportation Management needs has been a game-changer. The software's robust performance, intuitive interface, and in-depth features have significantly enhanced our operational efficiency. With top-tier customer support and seamless integration capabilities, NebulaGTS has exceeded our expectations, earning a 10/10 satisfaction score from our team. We confidently recommend NebulaGTS as a transformative TMS solution.
                </p>
                <div class="items-center mt-6 max-md:text-center">
                  <div class="">
                    <div class="font-medium name text-b-4 text-purple-1000">
                      VP of Operation
                    </div>
                    <div class="font-medium sub-text mt-2 mb-[14px] text-c-1 text-[#98A2B3]">
                      Gürman Trucking INC
                    </div>
                  </div>
                  <div class="mt-6">
                    <div class="">
                      <img src="/images/gurman-logo.png" alt="landing" class="object-contain w-[105px] max-md:m-0 max-md:mx-auto">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vueslickcarousel>
        </div>
      </section>

      <div class="max-md:p-5 p-[7.5rem]">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="flex max-md:flex-col pt-8 xl:mx-auto xl:m-0 xl:col-12"
          :class="[
            {'flex-row-reverse': index === 1}
          ]"
        >
          <div
            class="col-8 max-md:col-12"
            :class="[
              {'max-md:pr-0 pr-6': index !== 1},
              {'pl-6 max-md:pl-0': index === 1}
            ]"
          >
            <div class="flex rounded-2xl h-[432px]  max-md:h-auto max-md:flex-col max-md:pl-5" :style="section.firstBg">
              <div class="col-6 max-md:col-12 xl:px-16 lg:px-8 flex flex-col justify-center ">
                <div class="col-4 max-md:col-6 max-md:px-4 mb-7 max-md:mt-8 max-md:hidden">
                  <img v-if="section.secondImg" :src="section.secondImg">
                </div>
                <span class="xl:text-32 lg:text-[23px] font-medium max-md:text-[24px] !leading-[48px] xl:w-[232px] max-md:px-4 max-md:mt-6">
                  {{ section.title }}
                </span>
                <span class="font-normal mt-2 text-b-3 max-md:text[14px] leading-6 max-md:px-4">{{ section.text }}</span>
              </div>
              <div class="col-6 max-md:col-12 xl:pt-24 lg:pt-32 max-md:mt-8">
                <div class="ml-2">
                  <img :src="section.img" class="">
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-4 max-md:col-12 rounded-2xl max-md:mt-4"
            :class="[
              {'xl:pl-6 lg:pl-2': index !== 1},
              {'pr-6': index === 1}
            ]"
            :style="section.secondBg"
          >
            <div class="flex rounded-2xl">
              <div class="px-10 flex flex-col justify-center mt-16 max-md:my-8">
                <div :style="section.iconBg" class="rounded-xl mb-4 h-16 w-16 p-2">
                  <Icon
                    :icon="section.icon"
                    color="white"
                    :alpha="0"
                    variant="bulk"
                    class="w-12 h-12"
                  />
                </div>
                <span class="xl:text-[24px] lg:text-[16px] text-white font-semibold">
                  {{ section.subtitle }}
                </span>
                <span class="xl:text-b-3 lg:text-[14px] max-md:text-[14px] xl:leading-[27px] lg:leading-[20px] mt-2 font-normal text-white">{{ section.subtext }}</span>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
      <section class="bg-[#F9FAFB] mx-[7.5rem] max-md:mx-[3rem]">
        <div class="text-center pt-[120px]">
          <h2 class="font-semibold text-[36px] !leading-[44px] text-dark">
            Frequently asked questions
          </h2>
          <p class="font-[20px] !leading-[30px] text-[#475467] mt-5">
            Everything you need to know about the brokers and carriers
          </p>
        </div>
        <div class="xl:col-7 lg:col-9 mx-auto m-0 pb-[120px]">
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
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.SUBMIT"
              class="mt-12 !col-3 !w-[175px] !h-14 m-0 mx-auto max-md:mt-8"
              @click="() => $router.push('/faq')"
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
      </section>
      <div class="relative md:mx-[7.5rem]">
        <div class="bg-landing">
          <div class="col-12 m-0 mx-auto">
            <div class="flex">
              <div class="col-8 max-md:col-12 lg:pl-[5rem] md:pt-11 sm:pt-0">
                <h1 class="max-md:p-5 font-normal max-md:text-[24px] xl:text-5xl text-32 max-md:!leading-[35px] !leading-[60px] text-white">
                  Revolutionize the transportation
                  <br>industry through innovative,</br>
                  <b>user-friendly management solutions</b>
                </h1>
              </div>
              <div class="col-4 max-md:col-12 max-md:absolute ">
                <img src="/images/safetyLine.png" alt="landing" class="object-contain ml-0">
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="relative col-12 m-0 max-[1440px]:px-4 xl:ml-0 md:px-[7.5rem] sm:px-0">
        <div class="mt-[104px]">
          <div class="flex flex-col justify-start">
            <div class="mb-12">
              <h5 class="font-medium text-xl flex items-center text-[#98A2B3]">
                Powered By Sambasafety
              </h5>
              <h2 class="font-normal text-[32px] leading-[42px] my-2 text-[#060B27] col-8">
                Driver Risk Management Solutions
              </h2>
              <p class="font-normal text-[#667085] text-b-3 md:w-[914px]">
                We've partnered with SambaSafety to deliver our clients best-in-class driver risk management solutions to reduce frequency and severity of crashes and claims. Take a look at SambaSafety can do for you:
              </p>
            </div>
          </div>
          <div class="case-gap col-12">
            <VueSlickCarousel v-bind="slickOptions" :arrows="false" :dots="false" class=" slick-dot-pstn">
              <a href="https://partner.sambasafety.com/engage/sambasafety-platform/?sales_rep=WnV5d3NXLzVLZXBKd3dLZzUxOUlPdz09" target="_blank">
                <div class="">
                  <div class="flex col-12 flex-col my-2 box-sizing relative ">
                    <div class="relative rounded-2xl">
                      <img src="/images/samba-detail.png" alt="landing" class="object-contain rounded-2xl">
                      <div class="view-btn">
                        <div class="view-text flex">
                          <p class="">
                            View
                          </p>
                          <Icon
                            icon="arrow-right-1"
                            color="black"
                            class="w-[24px] h-[24px]"
                            :disable-fill="false"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="px-5 h-[212px]">
                      <div class="mt-7">
                        <div class="col-auto items-center justify-center mb-2">
                          <Icon
                            icon="video"
                            variant="bulk"
                            color="#667085"
                            class="w-6 h-6 mr-3"
                            :disable-fill="true"
                          />
                        </div>
                        <span class="text-b-2 max-md:text-16 font-medium !leading-[26px] text-dark ">
                          SambaSafety Platform- Video
                        </span>
                        <div class="flex">
                          <span class="text-b-4 pt-3 font-normal text-[#475467]">
                            Qorta
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a href="https://cdn.allbound.com/sambasafety-ab/2023/05/16150713/Telematics-Nebula-Dirilis-DA-1.pdf" target="_blank">
                <div class="">
                  <div class="flex col-12 flex-col my-2 box-sizing relative ">
                    <div class="relative rounded-2xl">
                      <img src="/images/samba-detail-2.png" alt="landing" class="object-contain rounded-2xl">
                      <div class="view-btn">
                        <div class="view-text flex">
                          <p class="">
                            View
                          </p>
                          <Icon
                            icon="arrow-right-1"
                            color="black"
                            class="w-[24px] h-[24px]"
                            :disable-fill="false"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="px-5 h-[212px]">
                      <div class="mt-7">
                        <div class="col-auto items-center justify-center mb-2">
                          <Icon
                            icon="book"
                            variant="bulk"
                            color="#667085"
                            class="w-6 h-6 mr-3"
                            :disable-fill="true"
                          />
                        </div>
                        <span class="text-b-2 max-md:text-16 font-medium !leading-[26px] text-dark ">
                          All In One Driver Risk Management Platform- Nebula GTS
                        </span>
                        <div class="flex">
                          <span class="text-b-4 pt-3 mt-[-16px] font-normal text-[#475467]">
                            Qorta
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a href="https://cdn.allbound.com/sambasafety-ab/2023/05/16151246/Build-Culture-of-Safety-Nebula-Dirilis-DA-1-1.pdf" target="_blank">
                <div class="">
                  <div class="flex col-12 flex-col my-2 box-sizing relative ">
                    <div class="relative rounded-2xl">
                      <img src="/images/samba-detail-3.png" alt="landing" class="object-contain rounded-2xl">
                      <div class="view-btn">
                        <div class="view-text flex">
                          <p class="">
                            View
                          </p>
                          <Icon
                            icon="arrow-right-1"
                            color="black"
                            class="w-[24px] h-[24px]"
                            :disable-fill="false"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="px-5 h-[212px]">
                      <div class="mt-7">
                        <div class="col-auto items-center justify-center mb-2">
                          <Icon
                            icon="book"
                            variant="bulk"
                            color="#667085"
                            class="w-6 h-6 mr-3"
                            :disable-fill="true"
                          />
                        </div>
                        <span class="text-b-2 max-md:text-16 font-medium !leading-[26px] text-dark ">
                          Build a Culture of Safety- Nebula GTS
                        </span>
                        <div class="flex">
                          <span class="text-b-4 pt-3 font-normal text-[#475467]">
                            Qorta
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a href="https://cdn.allbound.com/sambasafety-ab/2023/05/16150920/Qorta-University-Professional-Nebula-Dirilis-DA-1.pdf" target="_blank">
                <div class="">
                  <div class="flex col-12 flex-col my-2 box-sizing relative ">
                    <div class="relative rounded-2xl">
                      <img src="/images/samba-detail-4.png" alt="landing" class="object-contain rounded-2xl">
                      <div class="view-btn">
                        <div class="view-text flex">
                          <p class="">
                            View
                          </p>
                          <Icon
                            icon="arrow-right-1"
                            color="black"
                            class="w-[24px] h-[24px]"
                            :disable-fill="false"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="px-5 h-[212px]">
                      <div class="mt-7">
                        <div class="col-auto items-center justify-center mb-2">
                          <Icon
                            icon="book"
                            variant="bulk"
                            color="#667085"
                            class="w-6 h-6 mr-3"
                            :disable-fill="true"
                          />
                        </div>
                        <span class="text-b-2 max-md:text-16 font-medium !leading-[26px] text-dark ">
                          Driver Training – Nebula GTS
                        </span>
                        <div class="flex">
                          <span class="text-b-4 pt-3 font-normal text-[#475467]">
                            Qorta University
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a href="https://partner.sambasafety.com/prospect-pages/apcldnmzpjcdghuoqbdwsplpwyzxwhfcd/" target="_blank" class="overlay-btn">
                <div class="">
                  <div class="flex col-12 flex-col my-2 box-sizing relative ">
                    <div class="relative  overlay-image rounded-2xl">
                      <img src="/images/samba-detail-7.png" alt="landing" class="object-contain rounded-2xl">
                      <div class="view-btn">
                        <div class="view-text flex">
                          <p class="">
                            View
                          </p>
                          <Icon
                            icon="arrow-right-1"
                            color="black"
                            class="w-[24px] h-[24px]"
                            :disable-fill="false"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="px-5 h-[212px]">
                      <div class="mt-7">
                        <div class="col-auto items-center justify-center mb-2">
                          <Icon
                            icon="book"
                            variant="bulk"
                            color="#667085"
                            class="w-6 h-6 mr-3"
                            :disable-fill="true"
                          />
                        </div>
                        <span class="text-b-2 max-md:text-16 font-medium !leading-[26px] text-dark ">
                          Monitoring and Training Nebula GTS
                        </span>
                        <div class="flex">
                          <span class="text-b-4 pt-3 font-normal text-[#475467]">
                            Qorta
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a href="https://cdn.allbound.com/sambasafety-ab/2023/05/16150713/Telematics-Nebula-Dirilis-DA-1.pdf" target="_blank">
                <div class="">
                  <div class="flex col-12 flex-col my-2 box-sizing relative ">
                    <div class="relative rounded-2xl">
                      <img src="/images/samba-detail-6.png" alt="landing" class="object-contain rounded-2xl">
                      <div class="view-btn">
                        <div class="view-text flex">
                          <p class="">
                            View
                          </p>
                          <Icon
                            icon="arrow-right-1"
                            color="black"
                            class="w-[24px] h-[24px]"
                            :disable-fill="false"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="px-5 h-[212px]">
                      <div class="mt-7">
                        <div class="col-auto items-center justify-center mb-2">
                          <Icon
                            icon="book"
                            variant="bulk"
                            color="#667085"
                            class="w-6 h-6 mr-3"
                            :disable-fill="true"
                          />
                        </div>
                        <span class="text-b-2 max-md:text-16 font-medium !leading-[26px] text-dark ">
                          Telematics Risk Mitigation- Nebula GTS
                        </span>
                        <div class="flex">
                          <span class="text-b-4 pt-3 font-normal text-[#475467]">
                            Telematics
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </vueslickcarousel>
          </div>
        </div>
      </section>
    </section>

    <LandingFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
// import TabManager from '~/components/TabManager.vue'
// @ts-ignore
import BaseAccordion from '~/components/BaseAccordion.vue'
import { ButtonTypeEnum, SizeTypeEnum, ActionTypeEnum } from '~/components/ts/enums'
export default Vue.extend({
  name: 'LandingSafetyDetail',
  components: { BaseAccordion, VueSlickCarousel },
  data () {
    return {
      slickOptions: {
        slidesToShow: 5,
        centerPadding: '50px',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      },
      smSlickOptions: {
        slidesToShow: 1,
        centerMode: false,
        dots: false,
        arrows: false,

        responsive: [
          {
            breakpoint: 9920,
            settings: 'unslick'
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 0
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      },

      logoSlickOptions: {
        slidesToShow: 3,
        centerMode: false,
        dots: false,
        arrows: false,
        padding: 20,
        responsive: [
          {
            breakpoint: 2160,
            settings: 'unslick'
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 0
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      },
      logos: [
        { src: '/images/jrd-logo.png', alt: 'Logo 1' },
        { src: '/images/gurman-logo.png', alt: 'Logo 2' },
        { src: '/images/sambasafety_logo.png', alt: 'Logo 3' }
      ],
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
      icons: [
        'message-chat-circle',
        'zap',
        'chart-breakout-square',
        'message-smile-circle',
        'command',
        'message-heart-circle'
      ],
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
      ],
      sections: [
        {
          img: '/images/safety-carrier.png',
          firstBg: 'background: rgba(146, 186, 251, 0.3);',
          // linear: 'background: linear-gradient(180deg, rgba(112, 166, 255, 0.4) 0%, rgba(146, 186, 251, 0) 100%);',
          title: 'Carrier KPI',
          text: 'Our platform tracks a wide range of KPIs that are crucial for carriers, including on-time delivery rates, utilization rates, fuel efficiency, idle time, and driver performance metrics.',
          icon: 'monitor-recorder',
          subtitle: 'Out Of Service (OOS) Monitoring',
          subtext: 'Solutions for monitoring out of service incidents, a crucial aspect in maintaining operational efficiency, regulatory compliance, and customer satisfaction in the transportation industry.',
          secondBg: 'background: rgba(68, 120, 255, 1);',
          iconBg: 'background: rgba(252, 252, 253, 0.2)'
        },
        {
          img: '/images/safety-driver.png',
          firstBg: 'background: rgba(202, 189, 249, 0.3);',
          // linear: 'background: linear-gradient(180deg, rgba(202, 189, 249, 0.6) 0%, rgba(202, 189, 249, 0) 100%);',
          title: 'Driver Management',
          text: ' Stay in control and optimize your fleets productivity with our intuitive driver management tools.',
          icon: 'status-up',
          subtitle: 'Tracking Performance',
          subtext: 'Streamline and optimize your fleet operations with our TMS platforms advanced driver management capabilities. Effortlessly track driver performance, assign routes efficiently, and enhance communication to maximize productivity.',
          secondImg: '/images/driver-detail-percentage.png',
          secondBg: 'background: rgba(165, 142, 255, 1);',
          iconBg: 'background: rgba(252, 252, 253, 0.2)'
        },
        {
          img: '/images/safety-fleet.png',
          firstBg: 'background: rgba(234, 244, 240, 1);',
          // linear: 'background: linear-gradient(180deg, rgba(177, 219, 201, 0.4) 0%, rgba(200, 226, 215, 0) 100%);',
          title: 'Fleet Management',
          text: 'Gain complete visibility and control over your fleet, optimize routes for maximum efficiency, reduce fuel costs, and improve customer satisfaction.',
          icon: 'smart-home',
          subtitle: 'Vehicle Maintenance',
          subtext: 'NebulaGTS enables proactive vehicle maintenance, tracking the health of your fleet in real-time. Alerts notify you of upcoming maintenance requirements or potential mechanical issues, allowing you to address them before they lead to an out of service situation.',
          secondBg: 'background: rgba(116, 183, 154, 1);',
          iconBg: 'background: rgba(255, 255, 255, 0.2)'
        }
      ]
    }
  }

})

</script>

<style>
.menu-item.exact-link-active {
  @apply bg-indigo-900
}
.landing-tab{
  display: none;
  align-items: center;
  justify-content: center;
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
  border-radius: 3000px !important;
  box-shadow: 0px 0px 32px rgba(95, 95, 95, 0.16);
}
.landing-tab .bg-green-200  span{
  color:white;
  background: #4478FF;
}
.slick-prev {
  left: 15%;
  z-index:99;
}
.slick-next {
  right: 15%;
}
.case-gap .slick-list{
  padding:0 !important;
  margin-right: 0;
}
.view-btn{
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary-dark, #060B27);
  height: 149px;
  border-radius: 1rem;
}
@media (max-width: 750px) {
  .view-btn{
    height: 120px;
  }
}
.view-btn:hover{
  opacity: 0.8;
}
.view-text{
  display: inline-flex;
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  gap: 29px;
  border-radius: 3000px;
  background: rgb(206 211 222 / 71%);
  backdrop-filter: blur(4px);
}
.view-btn p{
  font-size: 20px;
  font-weight: 500;
  line-height: 131.5%;
  color:black;
}
@media (max-width: 750px) {
  .slick-dot-pstn .slick-dots{
    bottom:40px !important;
  }
  .slick-dot-pstn .slick-next {
    right: 80px;
    top: 90%;
    z-index:99;
  }
  .slick-dot-pstn .slick-prev {
    left: 80px;
    top: 90%;
    z-index:99;
  }
  .slick-dot-pstn .slick-dots li button:before{
    opacity: 1 !important;
    color: black !important;
  }
  .slick-dot-pstn-brand .slick-dots li button:before{
    opacity: 1 !important;
    color: black !important;
  }
  .slick-dot-pstn-brand .slick-dots li.slick-active button:before{
    color: #4478FF !important;
    opacity: 1 !important;
  }
.slick-dot-pstn .slick-dots li.slick-active button:before{
    color: #4478FF !important;
    opacity: 1 !important;
  }
}
/* .case-gap .slick-list {
  margin-left: -20px;
} */
.case-gap .slick-track .slick-slide {
  padding: 0 10px;
}
.case-gap .slick-track .slick-slide>div {
  width: 100%;
}
/* .case-gap .slick-track .slick-slide a{
  padding: 0 20px;
} */
</style>
