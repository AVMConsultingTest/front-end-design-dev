<template>
  <div>
    <div v-for="(driver, index) in load?.drivers" :key="index" class="row col-12 border-b border-grey-blue-100">
      <div class="col-9 flex">
        <div class="col-3 p-4 mt-6">
          <div class="relative w-[6.5rem] h-[6.5rem] mx-auto">
            <img :src="pictureUrl" alt="driver-picture" class="w-full h-full object-cover rounded-full">
            <div
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
            >
              <span
                class="text-c-1 font-medium"
                :class="[{'text-white' : status !== 0 },
                         {'text-gray-800': status === 0 }]"
              >
                {{ status === 0 ? "Active" : status === 1 ? "Terminated" : "Vacation" }}
              </span>
            </div>
          </div>
          <div class="flex justify-center items-center pt-7">
            <span class="ripple-circle w-1 h-1 bg-lime" />
            <span class="ml-[10px] text-c-2 font-medium text-gray-800">
              {{ driver?.driver_state }}
              <span class="text-gray">
                {{ status === 0 ? "(Live)" : "" }}
              </span>
            </span>
          </div>
        </div>
        <div class="col-9 mt-6">
          <div class="mb-6 w-full">
            <div class="flex items-center">
              <h5 class="text-gray-800 font-semibold">
                {{ response?.driver_first_name }} {{ response?.driver_last_name }}
              </h5>
              <div class="ml-4 flex">
                <div class="bg-green-400 w-8 h-8 rounded-full flex items-center justify-center">
                  <Icon
                    icon="call"
                    color="white"
                    class="w-5 h-5"
                    :disable-fill="false"
                  />
                </div>
                <div class="bg-white w-8 h-8 rounded-full flex items-center border-green-300 border-2 ml-2 justify-center">
                  <Icon icon="message" color="green" :disable-fill="false" class="w-5 h-5 " />
                </div>
              </div>
            </div>
            <span class="text-c-1 text-gray">{{ driver?.employee_id }} {{ driver?.driver_type }}</span>
          </div>
          <div class="flex flex-wrap mb-6 w-full">
            <InfoBox
              :value="(driver?.driver_dob)"
              title="Joined Date"
              icon="calendar"
              color="grey-dark"
              :alpha="300"
              class="col-4 mb-5"
            />
            <InfoBox
              :value="driver?.driver_type"
              title="Driver Type"
              icon="category"
              color="grey-dark"
              :alpha="300"
              class="col-4 mb-5"
            />
            <InfoBox
              :value="driver?.driver_contact_phone_number"
              title="Phone Number"
              icon="call"
              color="grey-dark"
              :alpha="300"
              class="col-4 mb-5"
            />
            <InfoBox
              :value="(driver?.birthday_date)"
              title="Birthday"
              icon="cake"
              color="grey-dark"
              :alpha="300"
              class="col-4"
            />
            <InfoBox
              :value="`$ ${driver?.payment_rates}`"
              title="Payment Rates"
              icon="wallet-money"
              class="col-4"
              :fontweight="700"
            />
            <InfoBox
              :value="driver?.driver_email_address"
              title="Business Email"
              icon="sms"
              color="grey-dark"
              :alpha="300"
              class="col-4 mb-5"
            />
          </div>
        </div>
      </div>
      <div class="col-3 flex items-center justify-center">
        <div class="w-full performance-bar">
          <span class="indicator" :style="`transform: rotate(${scorePosition(driver?.fscPercentage)}deg)`">
            <span class="indicator-border shadow-sm shadow-gray-400" />
          </span>
          <div class="score text-center absolute bottom-0 left-0 right-0">
            <h4 class="font-semibold flex justify-center items-end">
              {{ driver?.fscPercentage }}
              <span class="text-b-3 font-medium leading-[1.410rem]">
                %
              </span>
            </h4>
            <span class="text-c-2 font-medium text-gray-400 leading-[0.625rem]">
              Driver Score
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'DriverInfo',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pictureUrl: '/images/Ellipse_49.png',
      status: 0,
      response: {
        driver_first_name: 'Cameron',
        driver_last_name: 'Williamson',
        birthday_date: '10/12/2012'
      }
    }
  },
  computed: {
    load () {
      return this.$store.getters['loads/load']
    },
    requestId (): number {
      return this.id !== null && this.id !== undefined ? this.id : parseInt(this.$route.params.id, 10)
    }
  },
  created () {
    this.getLoad(this.requestId)
  },
  methods: {
    ...mapActions({
      getLoad: (action, id) => action('loads/getLoad', id)
    }),
    scorePosition (percentage: number): number {
      const test = 180 * (percentage / 100)
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
  width: 176px;
  height: 88px;
}

.performance-bar .indicator {
  position: absolute;
  top: -3px;
  left: calc(50% - 2.5px);
  bottom: 0;
  width: 2.5px;
  border-radius: 5px;
  transform: rotate(360deg);
  transform-origin: bottom center;
  transition: all 0.5s ease-in-out;
}

.performance-bar .indicator .indicator-border {
  background: rgba(255, 255, 255, .5);
  width: 3.5px;
  height: 21px;
  position: absolute;
  border-radius: 5px;
  backdrop-filter: blur(10px);
}
</style>
