<template>
  <div class="w-full">
    <PageHeader title="Broker Details" class="mb-10" @goback="$router.go(-1)" />
    <div
      class="
          mb-12
          col-12
          relative
          bg-white
          shadow-2xl shadow-gray-200
          rounded-xl
          p-12
          dark:bg-[#21293B] dark:shadow-none
        "
    >
      <div class="row col-12">
        <div class="col-7 flex">
          <div class="col-4 p-4">
            <div class="relative w-[152px] h-[152px] mx-auto">
              <img
                :src="response.pictureURL"
                alt="driver-picture"
                class="w-full h-full object-cover rounded-full border border-gray-300"
              >
            </div>
          </div>
          <div class="pl-10 col-8">
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                {{ response.name }}
              </h5>
              <span class="text-c-1 text-gray">MC# - {{ response.brokerId }}</span>
            </div>
            <div class="flex flex-wrap">
              <InfoBox
                :value="`$ ${response.creditLimit}`"
                title="Credit Limit"
                icon="money-3"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response.billingOption"
                title="Billing Option"
                icon="category"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="`$ ${response.creditAvailable}`"
                title="Credit Available"
                icon="money-tick"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response.invoicingEmail"
                title="Invoicing Email"
                icon="sms"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="`$ ${response.creditLimitIncrease}`"
                title="Credit Limit Increase"
                icon="money-add"
                color="grey-dark"
                :alpha="300"
                class="col-6"
              />
              <InfoBox
                :value="response.billingEmail"
                title="Billing Email"
                icon="sms"
                color="grey-dark"
                :alpha="300"
                class="col-6"
              />
            </div>
          </div>
        </div>
        <div class="col-5 flex items-center justify-center">
          <div class="w-full performance-bar">
            <span class="indicator" :style="`transform: rotate(${scorePosition}deg)`">
              <span class="indicator-border shadow-sm shadow-gray-400" />
            </span>
            <div class="score text-center absolute bottom-0 left-0 right-0">
              <h1 class="font-semibold flex justify-center items-end">
                {{ response.reliabilityPercentage }}
                <h3 class="font-medium leading-[38px]">
                  %
                </h3>
              </h1>
              <span class="text-c-1 font-medium text-gray-400">Broker Score</span>
            </div>
          </div>
        </div>
      </div>
      <transition name="slide">
        <div v-show="!slideToggle" class="col-12 mt-[4.5rem]">
          <div class="col-12 mb-10">
            <div class="mb-6">
              <h6 class="font-semibold text-gray-800">
                Address Information
              </h6>
              <span class="text-c-1 text-gray font-medium">Pharetra, velit, commodo vivamus diam ut mauris.</span>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.address1"
                  title="Address Information"
                  icon="location"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.contactNumber"
                  title="Emergency Number"
                  icon="call-calling"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
            </div>
          </div>
          <div class="col-12 mb-10">
            <div class="mb-6">
              <h6 class="font-semibold text-gray-800">
                Primary Contact
              </h6>
              <span class="text-c-1 text-gray font-medium">Pharetra, velit, commodo vivamus diam ut mauris.</span>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.primaryFullName"
                  title="Full Name"
                  icon="security-user"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.primaryEmail"
                  title="E-mail Address"
                  icon="sms"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.primaryNumber"
                  title="Phone Number"
                  icon="call"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
            </div>
          </div>
          <div class="col-12 mb-10">
            <div class="mb-6">
              <h6 class="font-semibold text-gray-800">
                Secondary Contact
              </h6>
              <span class="text-c-1 text-gray font-medium">Pharetra, velit, commodo vivamus diam ut mauris.</span>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.secondaryFullName"
                  title="Full Name"
                  icon="security-user"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.secondaryEmail"
                  title="E-mail Address"
                  icon="sms"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.secondaryNumber"
                  title="Phone Number"
                  icon="call"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
            </div>
          </div>
          <div class="col-12 mb-12">
            <div class="mb-6">
              <h6 class="font-semibold text-gray-800">
                Other Information
                Activities
              </h6>
              <span class="text-c-1 text-gray font-medium">Pharetra, velit, commodo vivamus diam ut mauris.</span>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.firstActivity"
                  title="Social Security Number"
                  icon="calendar-1"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.lastActivity"
                  title="E-mail Address"
                  icon="calendar-1"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.lastCreditScoreChange"
                  title="Last Credit Score Change"
                  icon="calendar-1"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                >
                  <div class="ml-2">
                    <div class="text-c-1 text-gray-800">
                      <span class="font-bold text-dark-blue">{{ response.previousScore }}>{{ response.currentScore }}</span>
                    </div>
                    <div class="text-c-2 font-normal text-gray">
                      <span>Improvement</span>
                    </div>
                  </div>
                </InfoBox>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <Button
        :type="ButtonTypeEnum.PRIMARY"
        :action="ActionTypeEnum.BUTTON"
        class="
!w-5
!h-5
!rounded-full
absolute
-bottom-2.5
left-1/2
-translate-x-1/2
          "
        @click="slideToggle = !slideToggle"
      >
        <Icon
          icon="arrow-down-1"
          color="white"
          class="w-3 h-3 transition-all"
          :class="{ 'rotate-180': !slideToggle }"
        />
      </Button>
    </div>
    <div class="row mb-5 mt-12">
      <SectionHeader title="General Metrics" />

      <div class="col-4 my-5">
        <widget :title="`Average Days to Pay`" icon="calendar-tick" icon-color="purple-blue" :icon-alpha="0">
          <div class="grid grid-cols-2 gap-4 items-end">
            <StatTracking :stat="28" :increase="true" :percentage="10" class="pr-4" />
            <div class="h-full flex flex-col justify-center">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-2"
                icon-container-class="!ml-2"
              />
            </div>
          </div>
        </widget>
      </div>
      <div class="col-4 my-5">
        <widget class="h-full" :title="`Loads Volume`" icon="box" icon-color="orange">
          <StatTracking :stat="6589" :increase="true" :percentage="10" />
        </widget>
      </div>
      <div class="col-4 my-5">
        <widget
          class="h-full"
          :title="`Payout Volume`"
          icon="chart"
          icon-color="green"
          :icon-alpha="400"
        >
          <StatTracking :stat="`$115K`" :increase="true" :percentage="10" />
        </widget>
      </div>
    </div>
    <div class="row mb-5 mt-12">
      <SectionHeader title="Reviews" />
      <div
        class="row mb-5 mt-12
         col-12
         relative
         bg-white
         shadow-2xl shadow-gray-200
         rounded-xl
         pt-0
         p-12
        dark:bg-[#21293B] dark:shadow-none"
      >
        <ProfileComment
          v-for="(item, index) in comments"
          :key="index"
          :star-count="item.starCount"
          :picture="item.picture"
          :name="item.name"
          :comment="item.comment"
          :date="item.date"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  ActionTypeEnum,
  ButtonTypeEnum,
  SizeTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'

export default Vue.extend({
  name: 'BrokerDetailsPage',
  layout: 'Dashboard',
  data () {
    return {
      rangeOptions: [
        {
          id: '60 days',
          text: '60 days',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: '120 days',
          text: '120 days',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        }
      ] as SelectOption[],
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      slideToggle: true,
      comments: [
        {
          name: 'Ellen R.',
          comment: 'Viverra nunc, egestas suspendisse vestibulum eget. Exercitation veniam consequat sunt nostrud amet.',
          starCount: 5,
          picture: '/images/ellipse21.png',
          date: 'Nov 12, 2022'
        },
        {
          name: 'Jane R.',
          comment: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
          starCount: 5,
          picture: '/images/ellipse22.png',
          date: 'Nov 12, 2022'
        },
        {
          name: 'Cameron R.',
          comment: 'Id mauris non lacus accumsan cras lectus sed non. Amt aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
          starCount: 5,
          picture: '/images/ellipse25.png',
          date: 'Nov 12, 2022'
        },
        {
          name: 'Christina R.',
          comment: 'Ideserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. mauris non lacus accumsan cras lectus sed non. Viverra nunc, egestas suspendisse vestibulum eget.',
          starCount: 5,
          picture: '/images/ellipse24.png',
          date: 'Nov 12, 2022'
        },
        {
          name: 'Ellen R.',
          comment: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
          starCount: 5,
          picture: '/images/ellipse23.png',
          date: 'Nov 12, 2022'
        }
      ],
      response: {
        name: 'Doe Logistics Inc.',
        brokerId: 13990,
        creditLimit: '30,000',
        billingOption: 'Bill to Address',
        creditAvailable: '10,000',
        invoicingEmail: 'sara.cruz@example.com',
        creditLimitIncrease: '30,000',
        billingEmail: 'sara.cruz@example.com',
        pictureURL: '/images/Ellipse49.png',
        picture: ' /images/ellipse21.png',
        address1: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        contactNumber: '(219) 555-0114',
        primaryFullName: 'Tim Donald',
        primaryEmail: 't.donald@test.com',
        primaryNumber: '(603) 555-0123',
        secondaryFullName: 'David Tim',
        secondaryEmail: 't.david@test.com',
        secondaryNumber: '(603) 555-0123',
        firstActivity: '1/31/14',
        lastActivity: '9/23/16',
        lastCreditScoreChange: '10/6/13',
        previousScore: 'C',
        currentScore: 'A',
        reliabilityPercentage: 95
      }
    }
  },
  computed: {
    scorePosition ():number {
      const test = 180 * (this.response.reliabilityPercentage / 100)
      if (test >= 90) {
        return (test - 90)
      } else {
        return (test + 270)
      }
    }
  }
})
</script>

  <style scoped>
  .performance-bar {
    background-image: url("/images/performance_bar.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    width: 305px;
    height: 157px;
  }

  .performance-bar .indicator {
    position: absolute;
    top: -3px;
    left: calc(50% - 2.5px);
    bottom: 0;
    width: 5px;
    border-radius: 5px;
    transform: rotate(360deg);
    transform-origin: bottom center;
    transition: all 0.5s ease-in-out;
  }

  .performance-bar .indicator .indicator-border {
    background: rgba(255, 255, 255, .5);
    width: 7px;
    height: 42px;
    position: absolute;
    border-radius: 5px;
    backdrop-filter: blur(10px);
  }
  </style>
