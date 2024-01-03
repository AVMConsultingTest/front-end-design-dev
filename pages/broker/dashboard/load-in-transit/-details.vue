<template>
  <div class="mt-10 mb-16">
    <div>
      <div class="flex items-center">
        <div class="bg-purple-blue-100 p-2 rounded-full mr-4">
          <Icon
            icon="location"
            color="purple-blue"
            :alpha="0"
            variant="bulk"
            class="w-6 h-6 min-h-[1.5rem] min-w-[1.5rem] max-h-[1.5rem] max-w-[1.5rem]"
          />
        </div>
        <div class="flex flex-col">
          <span class="text-b-3 font-medium text-black">Pick Up Information</span>
        </div>
      </div>
      <div class="pl-5">
        <div class="border-l border-dashed border-gray pt-4 pb-12 pl-9">
          <div
            class="load-card p-8 bg-white rounded-xl transition-all duration-500
      hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
          >
            <div class="flex flex-col mb-8">
              <span class="text-b-4 font-medium text-gray-800">{{ pickup.location }}</span>
              <span class="text-c-2 font-normal text-grey-dark-300">Pickup Location</span>
            </div>
            <div class="flex">
              <InfoBox
                :value="pickup.address"
                title="Address"
                icon="location"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="pickup.loading_type"
                title="Loading Type"
                icon="category"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="pickup.schedule_date"
                title="Scheduled"
                icon="calendar"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
            </div>
            <div class="flex">
              <InfoBox
                :value="pickup.phone_no"
                title="Phone Number"
                icon="call"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="pickup.actual_in_out_time"
                title="Actual In & Out Time"
                icon="calendar"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="pickup.estimated_arrival_time"
                title="Estimated Time Arrival"
                icon="calendar"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-center">
        <div class="bg-orange-100 p-2 rounded-full mr-4">
          <Icon
            icon="home-hashtag"
            color="orange"
            :alpha="0"
            variant="bulk"
            class="w-6 h-6 min-h-[1.5rem] min-w-[1.5rem] max-h-[1.5rem] max-w-[1.5rem]"
          />
        </div>
        <div class="flex flex-col">
          <span class="text-b-3 font-medium text-black">Delivery Information</span>
        </div>
      </div>
      <div class="pl-5">
        <div class="border-l border-dashed border-gray pt-4 pb-12 pl-9">
          <div
            class="load-card p-8 bg-white rounded-xl transition-all duration-500
      hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
          >
            <div class="flex flex-col mb-8">
              <span class="text-b-4 font-medium text-gray-800">{{ pickup.location }}</span>
              <span class="text-c-2 font-normal text-grey-dark-300">Delivery Location</span>
            </div>
            <div class="flex">
              <InfoBox
                :value="delivery.address"
                title="Address"
                icon="location"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="delivery.unloading_type"
                title="Unloading Type"
                icon="category"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="delivery.schedule_date"
                title="Scheduled"
                icon="calendar"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
            </div>
            <div class="flex">
              <InfoBox
                :value="delivery.phone_no"
                title="Phone Number"
                icon="call"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="delivery.actual_in_out_time"
                title="Actual In & Out Time"
                icon="calendar"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
              <InfoBox
                :value="delivery.estimated_arrival_time"
                title="Estimated Time Arrival"
                icon="calendar"
                color="grey-dark"
                :alpha="300"
                class="col-4 mb-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-center">
        <div class="bg-dark-blue-100 p-2 rounded-full mr-4">
          <Icon
            icon="home-hashtag"
            color="dark-blue"
            :alpha="0"
            variant="bulk"
            class="w-6 h-6 min-h-[1.5rem] min-w-[1.5rem] max-h-[1.5rem] max-w-[1.5rem]"
          />
        </div>
        <div class="flex flex-col">
          <span class="text-b-3 font-medium text-black">Commodity Details</span>
        </div>
      </div>
      <div class="pl-5">
        <div class="pt-4 pb-12 pl-9">
          <div
            class="load-card p-1 flex px-8 bg-white rounded-xl transition-all duration-500
      hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
          >
            <div class="flex col-4 py-7 pr-8 border-r border-grey-blue-100">
              <div class="flex flex-col">
                <div class="flex mt-3">
                  <img :src="commodity.package_image" alt="package-image-one" class="mr-2 rounded-lg w-16 h-16">
                  <img :src="commodity.package_image" alt="package-image-two" class="mr-2 rounded-lg w-16 h-16">
                  <img :src="commodity.package_image" alt="package-image-three" class="mr-2 rounded-lg w-16 h-16">
                </div>
                <span class="text-b-4 font-medium text-gray-800">
                  {{ commodity.total_units }} Pieces {{ commodity.package_type }} Packages
                </span>
              </div>
            </div>
            <div class="col-8 py-7 pl-14">
              <div class="mb-11">
                <span class="text-c-1 font-medium text-black">Commodity Information</span>
              </div>
              <div class="flex">
                <InfoBox
                  :value="commodity.total_units"
                  title="Total Units"
                  icon="category"
                  color="grey-dark"
                  :alpha="300"
                  class="col-3 mb-5"
                />
                <div class="col-9 flex">
                  <div class="col-3 flex flex-col">
                    <span class="text-c-1 font-medium text-gray-800">{{ commodity.length }}</span>
                    <span class="text-c-2 font-normal text-grey-dark-300">Length</span>
                  </div>
                  <div class="col-3 flex flex-col">
                    <span class="text-c-1 font-medium text-gray-800">{{ commodity.width }}</span>
                    <span class="text-c-2 font-normal text-grey-dark-300">Width</span>
                  </div>
                  <div class="col-3 flex flex-col">
                    <span class="text-c-1 font-medium text-gray-800">{{ commodity.height }}</span>
                    <span class="text-c-2 font-normal text-grey-dark-300">Height</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoadDetails',
  data () {
    return {
      pickup: {
        location: 'California TMC Center',
        address: '4517 Washington, Kentucky 39495',
        loading_type: 'Test',
        schedule_date: '20/12/2022 - 13:45 PM',
        phone_no: '(207) 555-0119',
        actual_in_out_time: '14:50 PM - 13:45 PM',
        estimated_arrival_time: '22/12/2022 - 10:45 PM'
      },
      delivery: {
        location: 'California TMC Center',
        address: '4517 Washington, Kentucky 39495',
        unloading_type: 'Test',
        schedule_date: '20/12/2022 - 13:45 PM',
        phone_no: '(207) 555-0119',
        actual_in_out_time: '14:50 PM - 13:45 PM',
        estimated_arrival_time: '22/12/2022 - 10:45 PM'
      },
      commodity: {
        total_units: 200,
        package_image: '/images/package.png',
        package_type: 'Electronic',
        length: '19’5” - 5.919 m',
        width: '7’5” - 2.349 m',
        height: '9’5” - 2.380 m'
      }
    }
  }
})
</script>

<style scoped>

</style>
