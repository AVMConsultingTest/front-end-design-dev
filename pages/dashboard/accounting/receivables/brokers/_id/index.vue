<template>
  <div class="w-full">
    <Drawer ref="drawer" />
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
                :src="pictureURL"
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
              <span class="text-c-1 text-gray">MC# - {{ response?.mc }}</span>
            </div>
            <div class="flex flex-wrap">
              <InfoBox
                :value="`$ ${response?.credit_limit}`"
                title="Credit Limit"
                icon="money-3"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response.billing_option"
                title="Billing Option"
                icon="category"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="`$ ${response.credit_available}`"
                title="Credit Available"
                icon="money-tick"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response.invoicing_email"
                title="Invoicing Email"
                icon="sms"
                color="grey-dark"
                :alpha="300"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="`$ ${response.credit_limit_incrase}`"
                title="Credit Limit Increase"
                icon="money-add"
                color="grey-dark"
                :alpha="300"
                class="col-6"
              />
              <InfoBox
                :value="response.billing_email"
                title="Billing Email"
                icon="sms"
                color="grey-dark"
                :alpha="300"
                class="col-6"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end absolute top-4 right-4">
        <div
          class="!rounded-full border !w-9 !h-9 border-gray-300 flex justify-center items-center cursor-pointer mr-2"
          @click="modalShow()"
        >
          <Icon icon="trash" variant="bold" color="gray" :alpha="400" class="w-5 h-5" />
        </div>
        <div
          class="!rounded-full border !w-9 !h-9 border-gray-300 flex justify-center items-center cursor-pointer"
          @click="drawer('EditAccountingBroker')"
        >
          <Icon icon="edit-2" variant="bold" color="gray" :alpha="400" class="w-5 h-5" />
        </div>
      </div>
        <div class="col-5 flex items-center justify-center">
          <div class="w-full performance-bar">
            <span class="indicator" :style="`transform: rotate(${scorePosition}deg)`">
              <span class="indicator-border shadow-sm shadow-gray-400" />
            </span>
            <div class="score text-center absolute bottom-0 left-0 right-0">
              <h1 class="font-semibold flex justify-center items-end">
                {{ response.score }}
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
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.address_line1"
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
                  :value="response.contact1_phone_number"
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
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.contact1_first_name + ' ' + response.contact2_last_name"
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
                  :value="response.contact1_email"
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
                  :value="response.contact1_phone_number"
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
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.contact2_first_name + ' ' + response.contact2_last_name"
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
                  :value="response.contact2_email"
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
                  :value="response.contact2_phone_number"
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
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.ssn_number"
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
                  :value="response.billing_email"
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
                  :value="response.last_credit_change_date"
                  title="Last Credit Score Change"
                  icon="calendar-1"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                >
                  <div class="ml-2">
                    <div class="text-c-1 text-gray-800">
                      <span class="font-bold text-dark-blue">{{ response.credit_score_prev }}>{{ response.credit_score_curr }}</span>
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
            <StatTracking :stat="brokerMetric?.avg_days_to_pay_curr_month" :increase="brokerMetric?.avg_days_to_pay_curr_month > brokerMetric?.avg_days_to_pay_prev_month" :percentage="brokerMetric?.avg_days_to_pay_change_per" class="pr-4" />
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
          <StatTracking :stat="brokerMetric?.loads_volume_curr_month" :increase="brokerMetric?.loads_volume_curr_month > brokerMetric?.loads_volume_prev_month" :percentage="brokerMetric?.loads_volume_change_per" />
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
          <StatTracking :currency="true" :stat="brokerMetric?.payout_volume_curr_month" :increase="brokerMetric?.payout_volume_curr_month > brokerMetric?.payout_volume_prev_month" :percentage="brokerMetric?.payout_volume_change_per" />
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
          v-for="(item, index) in brokerReviews"
          :key="index"
          :star-count="item.review_rating"
          :picture="item.reviewer_avatar"
          :name="item.reviewer_name"
          :comment="item.review_text"
          :date="item.review_date"
        />
      </div>
    </div>
    <DeleteModal
        ref="modal"
        :delete-id="parseInt($route.params.id, 10)"
        :delete-function="removeBroker"
        :delete-subtext="deleteSubtext"
        :pop-back="true"
      />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  ActionTypeEnum,
  ButtonTypeEnum,
  SizeTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { BrokersDetails } from '~/models/accounting/brokers/brokersDetails'
import { BrokerMetricsDetails } from '~/models/accounting/brokerMetricsDetails'
import { BrokerReviewsDetails } from '~/models/accounting/brokerReviewsDetails'
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
      deleteSubtext: '',
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
      // response: {
      //   name: 'Doe Logistics Inc.',
      //   brokerId: 13990,
      //   creditLimit: '30,000',
      //   billingOption: 'Bill to Address',
      //   creditAvailable: '10,000',
      //   invoicingEmail: 'sara.cruz@example.com',
      //   creditLimitIncrease: '30,000',
      //   billingEmail: 'sara.cruz@example.com',
      pictureURL: '/images/Ellipse49.png',
      picture: ' /images/ellipse21.png'
      //   address1: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
      //   contactNumber: '(219) 555-0114',
      //   primaryFullName: 'Tim Donald',
      //   primaryEmail: 't.donald@test.com',
      //   primaryNumber: '(603) 555-0123',
      //   secondaryFullName: 'David Tim',
      //   secondaryEmail: 't.david@test.com',
      //   secondaryNumber: '(603) 555-0123',
      //   firstActivity: '1/31/14',
      //   lastActivity: '9/23/16',
      //   lastCreditScoreChange: '10/6/13',
      //   previousScore: 'C',
      //   currentScore: 'A',
      //   reliabilityPercentage: 95
      // }
    }
  },
  computed: {
    scorePosition ():number {
      const test = 180 * (this.response.broker_score / 100)
      if (test >= 90) {
        return (test - 90)
      } else {
        return (test + 270)
      }
    },
    response (): BrokersDetails {
      return (this.$store.getters['accounting/brokers/broker'])
    },
    brokerMetric (): BrokerMetricsDetails {
      return (this.$store.getters['accounting/brokerMetricsDetails/brokerMetric'])
    },
    brokerReviews (): BrokerReviewsDetails[] {
      return (this.$store.getters['accounting/brokerReviewsDetails/brokerReviews'])
    }
  },
  created () {
    this.getBroker(parseInt(this.$route.params.id, 10))
    this.getBrokerMetric(parseInt(this.$route.params.id, 10))
    this.getBrokerReviews(parseInt(this.$route.params.id, 10))
  },
  methods: {
    ...mapActions({
      getBroker: (action, id) => action('accounting/brokers/getBroker', id),
      removeBroker: (action, id) => action('accounting/brokers/removeBroker', id),
      getBrokerMetric: (action, id) => action('accounting/brokerMetricsDetails/getBrokerMetric', id),
      getBrokerReviews: (action, id) => action('accounting/brokerReviewsDetails/getBrokerReviewsById', id)
    }),
    modalShow (): void {
      (this.$refs.modal as Vue & { showModal: () => Function }).showModal()
    },
    drawer (drawerName: string) {
      (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer(drawerName)
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
