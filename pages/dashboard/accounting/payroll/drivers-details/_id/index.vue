<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader
      title="Driver Details"
      class="mb-10"
      @goback="$router.go(-1)"
    />
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
      <div class="flex absolute top-4 right-4">
        <div
          class="!rounded-full border !w-9 !h-9 border-gray-300 flex justify-center items-center cursor-pointer"
          @click="drawer('PayrollEditDriver')"
        >
          <Icon
            icon="edit-2"
            variant="bold"
            color="gray"
            :alpha="400"
            class="w-5 h-5"
          />
        </div>
      </div>
      <div class="row col-12">
        <div class="col-9 flex">
          <div class="col-4 p-4">
            <div class="relative w-[152px] h-[152px] mx-auto">
              <img :src="pictureURL.url" alt="driver-picture" class="w-full h-full object-cover rounded-full">
              <div class="relative">
                <div
                  v-click-outside="() => (opened = false)"
                  :class="[
                    { 'bg-green-400': status === 0 },
                    { 'bg-red': status === 1 },
                    { 'bg-orange': status === 2 },
                  ]"
                  class="
                      rounded-full
                      absolute
                      p-2
                      px-3
                      bottom-[-18px]
                      left-1/2
                      -translate-x-1/2
                      flex
                      justify-between
                      items-center
                      h-9
                      m-w-24
                      cursor-pointer
                    "
                  @click="() => { opened = !opened }"
                >
                  <Status
                    :item="response"
                    :active="extendeds.includes(response.id)"
                    :item-status="response.driver_status"
                    :dropdown-menu="dropdownMenu"
                    :dropdown-style="dropdownStyle"
                    @extend="extendItem"
                    @set-status="setStatus"
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-center items-center pt-7">
              <span class="ripple-circle w-1 h-1 bg-lime" />
              <span class="ml-[10px] text-c-2 font-medium text-gray-800">
                {{ response.driver_live_location }}
                <span class="text-gray">
                  {{ status === 0 ? "(Live)" : "" }}
                </span>
              </span>
            </div>
          </div>
          <div class="pl-10 col-12">
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                {{ response.driver_first_name }} {{ response.driver_last_name }}
              </h5>
              <span class="text-c-1 text-gray">{{ response.id }}</span>
            </div>
            <div class="flex flex-wrap">
              <InfoBox
                :value="response.driver_joined_data"
                title="Joined Date"
                icon="calendar"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response.driver_type"
                title="Driver Type"
                icon="category"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response.driver_address"
                title="Address Information"
                icon="location"
                color="grey-dark"
                :alpha="300"
                class="col-4"
              />
              <InfoBox
                :value="response.driver_phone_number"
                title="Phone Number"
                icon="call"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response.driver_business_email"
                title="Business Email"
                icon="sms"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response.driver_fax_number"
                title="Fax Number"
                icon="call"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="response.driver_dob"
                title="Birthday"
                icon="cake"
                color="grey-dark"
                :alpha="300"
                class="col-4"
              />
              <InfoBox
                :value="`$ ${response.payment_rates}`"
                title="Payment Rates"
                icon="wallet-money"
                class="col-4"
                :fontweight="700"
              />
              <InfoBox
                :value="response.driver_ssn"
                title="Social Security Number"
                icon="security-user"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
            </div>
          </div>
        </div>
      </div>
      <transition name="slide">
        <div v-show="!slideToggle" class="col-12 mt-[4.5rem]">
          <div class="col-12 mb-10">
            <div class="mb-6">
              <h6 class="font-semibold text-gray-800">
                Payment Information
              </h6>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.driver_routing_number"
                  title="Bank Routing Number"
                  icon="security-user"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.driver_account_number"
                  title="Bank Accounting Number"
                  icon="bank"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.payment_type"
                  title="Payment Type"
                  icon="moneys"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="`${response.payment_rates}%`"
                  title="Payment Rates"
                  icon="diagram"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="response.payment_base"
                  title="Base"
                  icon="repeate-one"
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
                Asset Information
              </h6>
            </div>
            <div class="flex -mx-1 flex-wrap">
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="`TRC - ${response.truck_id}`"
                  title="Truck ID"
                  icon="truck"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
              <div class="col-4 px-1 mb-4">
                <InfoBox
                  :value="`TRL - ${response.trailer_id}`"
                  title="Trailer ID"
                  icon="document"
                  :alpha="800"
                  variant="outline"
                  class="p-4"
                  :border="true"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import {
  ActionTypeEnum,
  ButtonTypeEnum,
  SizeTypeEnum
} from '~/components/ts/enums'
import { DriversDetails } from '~/models/accounting/drivers/driversDetail'
// import { Address } from '~/models/common/address'
// import { ImageUrl } from '~/models/common/ImageUrl'
// import { Driver } from '~/models/driver'
// import { Truck } from '~/models/truck'

export default Vue.extend({
  name: 'DriverProfilePage',
  layout: 'Dashboard',
  data () {
    return {
      selectedTab: 0,
      opened: false,
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      reportRange: '',
      status: 0,
      slideToggle: false,
      dropdownStyle: 'a',
      dropdownMenu: [
        { text: 'Open', bg: 'green' },
        { text: 'Closed', bg: 'red' }
      ],
      extendeds: [] as any[],
      // response: {
      //   firstName: 'Cameron',
      //   lastName: 'Williamson',
      //   driverId: 13990,
      //   dateOfHire: 'Sep 1, 2018',
      //   dateOfBirth: 'Jan 1, 1970',
      //   driverType: 'Owner Operator',
      //   email: 'sara.cruz@example.com',
      //   phone: '(229) 555-0109',
      //   emergencyNumber: '(219) 555-0114',
      //   status: 0,
      pictureURL: {
        url: '/images/Ellipse_49.png'
      }
      //   payPerDrop: '1200,98',
      //   address: {
      //     state: 'California',
      //     address1: '2118 Thornridge Cir.'
      //   },
      //   bankrouting: '8393930303',
      //   bankaccounting: '903939393',
      //   payType: 'Percent',
      //   paymentrates: '18',
      //   recurringDeductions: 'Gross',
      //   compensation: '2,12',
      //   ssn: '111-22-3333',
      //   fscPercentage: 95
      // },
      // truck: {
      //   truckId: 18373823933
      // },
      // trailer: {
      //   trailerId: 18373823933
      // }
    }
  },
  computed: {
    scorePosition () {
      const test = 180 * (this.response.fscPercentage / 100)
      if (test >= 90) {
        return (test - 90)
      } else {
        return (test + 270)
      }
      // return ((180 * (this.response.fscPercentage / 100)) - this.response.fscPercentage)
    },
    response (): DriversDetails {
      return (this.$store.getters['accounting/drivers/driver'])
    }
  },
  created () {
    this.getDriver(parseInt(this.$route.params.id, 10))
  },
  methods: {
    extendItem (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownStyle = {
          top: `${clientY - 340}px`,
          left: `${clientX - 500}px`
        }
      }
    },
    setStatus (id:number, newStatus:any) {
      // const response = this.response.slice()
      console.log(id, newStatus)
      const item = this.response
      this.updateDriver({
        ...item,
        driver_status: newStatus,
        carrier_id: item.carrier_id.toString(),
        driver_hire_data: moment(item.driver_hire_data).toISOString(),
        driver_dob: moment(item.driver_dob).toISOString(),
        invoice_end_date: moment(item.invoice_end_date).toISOString(),
        invoice_start_date: moment(item.invoice_start_date).toISOString()
      })
    },
    ...mapActions({
      getDriver: (action, id) => action('accounting/drivers/getDriver', id),
      updateDriver: (action, request) => action('accounting/drivers/updateDriver', request)
    }),
    chooseStatus (response:any, index:number): void {
      response.status = index
      this.opened = false
    },
    drawer (componentName:string) {
      this.$refs.drawer.showDrawer(componentName)
    }
  }
  // computed: {
  //   scorePosition () {
  //     const test = 180 * (this.response.fscPercentage / 100)
  //     if (test >= 90) {
  //       return (test - 90)
  //     } else {
  //       return (test + 270)
  //     }
  //     // return ((180 * (this.response.fscPercentage / 100)) - this.response.fscPercentage)
  //   },
  // methods: {
  //   drawer () {
  //     (this.$refs.drawer as Vue & { showDrawer: (component: String, routeUrl?: String) => Element }).showDrawer('AddDriver')
  //   }
  // }
})
</script>

  <style scoped>
  /* .performance-bar {
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
  } */
  </style>
