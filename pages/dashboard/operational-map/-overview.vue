<template>
  <div class="mt-10">
    <div class="mb-4 flex flex-col">
      <span class="text-b-3 font-medium text-black">Summary</span>
    </div>
    <div v-for="(load, index) in loads" :key="index" class="load mb-5">
      <MapCard :link-id="index" :data="load" :general-info="true" />
    </div>
    <div class="mt-12 mb-4 flex flex-col">
      <span class="text-b-3 font-medium text-black mb-4">Broker Information</span>
      <span class="text-b-4 font-medium text-gray">Broker Load ID</span>
      <h5 class="font-semibold dark:text-white">
        BL - 09362
      </h5>
    </div>
    <div
      class="load-card mb-24 bg-white rounded-xl transition-all duration-500
      hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
    >
      <div class="px-8 py-6">
        <div class="row">
          <div class="col-4 flex flex-wrap border-r border-grey-blue-100">
            <div class="col-12 mb-10 flex">
              <div class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] mr-2 relative">
                <img :src="carriers.carrier_image" alt="carrier" class="w-full h-full rounded-full">
                <img :src="carriers.carrier_country" alt="country" class="w-3 h-3 rounded-full absolute right-0 bottom-0">
              </div>
              <div class="flex flex-col">
                <span class="text-c-1 font-medium text-gray-800">{{ carriers.carrier_name }}</span>
                <span class="text-c-2 font-medium text-gray">Shipper Name</span>
              </div>
            </div>
            <div class="col-12 flex flex-wrap">
              <div class="col-12 flex">
                <InfoBox
                  :value="carriers.carrier_phone_no"
                  title="Phone Number"
                  icon="call"
                  color="grey-dark"
                  :alpha="300"
                  class="col-6 mb-5"
                />
                <InfoBox
                  :value="carriers.carrier_email"
                  title="Business Email"
                  icon="sms"
                  color="grey-dark"
                  :alpha="300"
                  class="col-6 mb-5"
                />
              </div>
              <div class="col-12 flex">
                <InfoBox
                  :value="carriers.carrier_dot_no"
                  title="DOT Number"
                  icon="clipboard-text"
                  color="grey-dark"
                  :alpha="300"
                  class="col-6 mb-5"
                />
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
  name: 'LoadOverview',
  data () {
    return {
      loads: [
        {
          load_status: 'Upcoming Load',
          status: 'On-route',
          broker_id: 'BL - 09362',
          truck_id: 'TRC-1254662',
          trailer_id: 'TRL-56845',
          load_origin: 'Test',
          equipment_weight: '45k LBS',
          mile_rate: 4.50,
          total_miles: 500,
          total_revenue: 4500.12,
          bol_document_id: 'BOL-99393822',
          delivery_no: 'DLV-125466',
          temperature: 'Test',
          reference_no: '83637279383',
          po_no: '9396202730',
          currentStop: 3,
          pickup: 'Timestamp',
          delivery: 'Timestamp',
          drivers: [
            {
              id: 123,
              name: 'Jenny Wilson',
              type: 'Main Driver'
            },
            {
              id: 124,
              name: 'Guy Hawkins',
              type: 'Co- Driver'
            }
          ],
          stops: [
            {
              id: 10,
              value: 'Roanoke, TX',
              code: 'CLT5',
              driver: 'Jenny Wilson',
              totalMiles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#'
            },
            {
              id: 11,
              value: 'Roanoke, TX',
              code: 'BHM1',
              driver: 'Jenny Wilson',
              totalMiles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#'
            },
            {
              id: 12,
              value: 'Roanoke, TX',
              code: 'AGS5',
              driver: 'Jenny Wilson',
              totalMiles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#'
            },
            {
              id: 13,
              value: 'Roanoke, TX',
              code: 'HKL1',
              driver: 'Guy Hawkins',
              totalMiles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#'
            },
            {
              id: 14,
              value: 'Oxnard, CA',
              code: 'MYK3',
              driver: 'Guy Hawkins',
              totalMiles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#'
            }
          ]
        }
      ],
      carriers: {
        carrier_image: '/images/company_logo.png',
        carrier_country: '/images/usa.png',
        carrier_name: 'Broker Inc.',
        carrier_phone_no: '(229) 555-0109',
        carrier_email: 'sara.cruz@test.com',
        carrier_dot_no: '12345698799',
        carrier_mc_no: '1155152545651',
        dispatcher_image: '/images/stuart.png',
        dispatcher_country: '/images/usa.png',
        dispatcher_name: 'Stuart Inc.',
        dispatcher_phone_no: '(229) 555-0109',
        dispatcher_email: 'info@stuart.com',
        dispatcher_truck_id: 'TRC - 1939383',
        dispatcher_trailer_id: 'TRL - 32928209',
        dispatcher_2_image: '/images/chameleon.png',
        dispatcher_2_phone_no: '(229) 555-0109',
        dispatcher_2_email: 'info@stuart.com'
      }
    }
  }
})
</script>

<style scoped>

</style>
