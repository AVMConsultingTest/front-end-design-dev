<template>
  <div class="w-full">
    <PageHeader title="Driver Board Details" class="mb-10" @goback="$router.go(-1)" />
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
              <img :src="pictureURL.url" alt="driver-picture" class="w-full h-full object-cover rounded-full">
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
                @click="() => { opened = true }"
              >
                <span
                  class="text-c-1 font-medium"
                  :class="[{'text-white' : status !== 0 },
                           {'text-gray-800': status === 0 }]"
                >
                  {{ status === 0 ? "Active" : status === 1 ? "Terminated" : "Vacation" }}
                </span>
                <Icon icon="arrow-down-1" :color="status === 0 ? 'gray' : 'white'" :alpha="800" class="w-4 h-4 ml-3" />
                <transition name="slide">
                  <div v-if="opened" class="absolute top-11 rounded-lg bg-white left-0 right-0 w-60 shadow-2xl">
                    <ul class="px-4 py-5">
                      <li class="text-c-1 font-medium text-gray-800 w-full flex items-center justify-between cursor-pointer mb-7" @click="status=2">
                        Vacation
                        <Icon
                          v-if="status === 2"
                          icon="tick-circle"
                          variant="linear"
                          color="green"
                          :disable-fill="true"
                          class="w-6 h-6"
                        />
                      </li>
                      <li class="text-c-1 font-medium text-gray-800 w-full flex items-center justify-between cursor-pointer mb-7" @click="status=0">
                        Active
                        <Icon
                          v-if="status === 0"
                          icon="tick-circle"
                          variant="linear"
                          color="green"
                          :disable-fill="true"
                          class="w-6 h-6"
                        />
                      </li>
                      <li class="text-c-1 font-medium text-gray-800 w-full flex items-center justify-between cursor-pointer" @click="status=1">
                        Terminated
                        <Icon
                          v-if="status === 1"
                          icon="tick-circle"
                          variant="linear"
                          color="green"
                          :disable-fill="true"
                          class="w-6 h-6"
                        />
                      </li>
                    </ul>
                  </div>
                </transition>
              </div>
            </div>
            <div class="flex justify-center items-center pt-7">
              <span class="ripple-circle w-1 h-1 bg-lime" />
              <span class="ml-[10px] text-c-2 font-medium text-gray-800">
                {{ response.driver_live_location }}
                <span class="text-gray">
                  {{ response?.driver_live_location ? "(Live)" : "" }}
                </span>
              </span>
            </div>
          </div>
          <div class="pl-10 col-8">
            <div class="mb-6">
              <h5 class="text-gray-800 font-semibold">
                {{ response?.driver_first_name }} {{ response?.driver_last_name }}
              </h5>
              <span class="text-c-1 text-gray"> {{ response.driver_type }}</span>
            </div>
            <div class="flex flex-wrap">
              <InfoBox
                :value="response.driver_joined_data"
                title="Joined Date"
                icon="calendar"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response.driver_type"
                title="Driver Type"
                icon="category"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response.driver_phone_number"
                title="Phone Number"
                icon="call"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response.driver_email_address"
                title="Business Email"
                icon="sms"
                class="col-6 mb-5"
              />
              <InfoBox
                :value="response.driver_dob"
                title="Birthday"
                icon="cake"
                class="col-6"
              />
              <InfoBox
                :value="`$ ${response.payment_rates}`"
                title="Payment Rates"
                icon="wallet-money"
                class="col-6"
                :fontweight="700"
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
                {{ response.driver_score }}
                <h3 class="font-medium leading-[38px]">
                  %
                </h3>
              </h1>
              <span class="text-c-1 font-medium text-gray-400">Driver Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 my-5">
      <Table
        ref="table"
        title="Loads"
        icon="driving"
        icon-color="green"
        :icon-alpha="800"
        :headers="headers"
        :data="testData"
        :search-enabled="true"
        :extend-enabled="true"
      >
        <template #extended-area="{ item }">
          <LoadItemDetail :data="item" />
        </template>
        <template #item-icon="{ item }">
          <div class="block">
            <Icon
              variant="linear"
              color="dark-blue"
              :alpha="0"
              :disable-fill="true"
              icon="add"
              class="w-5 h-5 transition-all"
              :class="{ 'rotate-45': extendedItems?.includes(item) }"
            />
          </div>
        </template>
        <template #item-categories="{ item }">
          <div class="block">
            <span class="block">{{ item.categories }}</span>
            <span class="block text-c-1 text-gray-400">
              {{ item.description }}
            </span>
          </div>
        </template>
        <template #item-load_id="{ item }">
          <div class="block text-dark-blue">
            {{ item.load_id }}
          </div>
        </template>
        <template #item-status="{ item }">
          <Status
            :item="item"
            :active="extendeds.includes(item.id)"
            :item-status="item.status"
            :dropdown-menu="dropdownMenu"
            :dropdown-style="dropdownStyle"
            @extend="extendItem"
            @set-status="setStatus"
          />
        </template>
        <template #item-actions>
          <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
            <Icon
              icon="more-2"
              color="grey-dark"
              :alpha="100"
              :disable-fill="false"
              class="w-4 h-4 cursor-pointer"
            />
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import {
  ActionTypeEnum,
  ButtonTypeEnum,
  SizeTypeEnum
} from '~/components/ts/enums'
import { DriversDetails } from '~/models/accounting/drivers/driversDetail'
// import { Address } from '~/models/common/address'
// import { ImageUrl } from '~/models/common/ImageUrl'
// import { Driver } from '~/models/driver'

export default Vue.extend({
  name: 'DriverProfilePage',
  layout: 'Dashboard',
  data () {
    return {
      selectedTab: 0,
      ActionTypeEnum,
      ButtonTypeEnum,
      SizeTypeEnum,
      opened: false,
      status: 0,
      reportRange: '',
      extendeds: [] as any[],
      dropdownStyle: 'a',
      dropdownMenu: [
        { text: 'Active', bg: 'green' },
        { text: 'Inactive', bg: 'red' }
      ],
      statusOptions: [
        { id: 1, text: 'Active' },
        { id: 2, text: 'Inactive' }
      ],
      rangeOptions: [
        {
          id: 'Monthly',
          text: 'Monthly',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Yearly',
          text: 'Yearly',
          selected: false
        }
      ],
      // response: {
      //   driver_first_name: 'Cameron',
      //   driver_last_name: 'Williamson',
      //   dateOfHire: 'Sep 1, 2018',
      //   driver_dob: 'Jan 1, 1970',
      //   driver_type: 'Main Captain',
      //   driver_email_address: 'sara.cruz@example.com',
      //   driver_contact_phone_number: '(229) 555-0109',
      //   driver_emergency_phone_number: '(219) 555-0114',
      //   status: 0,
      pictureURL: {
        url: '/images/Ellipse_49.png'
      },
      //   payment_rates: '1200,98',
      //   driver_state: 'California',
      //   fscPercentage: 95
      // },
      headers: {
        icon: '',
        load_id: {
          label: 'Load ID',
          searchable: true
        },
        status: {
          label: 'Status',
          searchable: true
        },
        truck_id: {
          label: 'Truck ID',
          searchable: true
        },
        trailer_id: {
          label: 'Trailer ID',
          searchable: true
        },
        origin: {
          label: 'Origin',
          searchable: true,
          sortable: true
        },
        destination: {
          label: 'Destination',
          searchable: true
        },
        pickup_date: {
          label: 'Pickup Date',
          searchable: true
        },
        delivery_date: {
          label: 'Delivery Date',
          searchable: true
        },
        rate_mile: {
          label: 'Rate/Mile',
          searchable: true
        },
        revenue: {
          label: 'Revenue',
          searchable: true
        },
        miles: {
          label: 'Miles',
          searchable: true
        },
        equipment: {
          label: 'Equipment',
          searchable: true
        },
        weight: {
          label: 'Weight',
          searchable: true
        },
        broker: {
          label: 'Broker',
          searchable: true
        },
        actions: {
          label: 'Actions',
          searchable: true
        }
      },
      testData: [
        {
          id: 1,
          load_id: 'BL093662',
          status: 'Active',
          truck_id: 'LD6548',
          trailer_id: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          pickup_date: 'Timestamp',
          delivery_date: 'Timestamp',
          rate_mile: '$4.50',
          revenue: '$450',
          miles: '500',
          equipment: '53’ Trailer',
          weight: '45K LBS',
          broker: 'Courtney Henry',
          drivers: [
            {
              id: 123,
              name: 'Jenny Wilson',
              type: 'Main Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Main Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 95
            },
            {
              id: 124,
              name: 'Guy Hawkins',
              type: 'Co- Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Co- Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 72
            }
          ],
          stops: [
            {
              id: 10,
              value: 'Roanoke, TX',
              code: 'CLT5',
              driver: 'Jenny Wilsons',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Preloaded',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 11,
              value: 'Roanoke, TX',
              code: 'BHM1',
              driver: 'Oliver Jake',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 12,
              value: 'Roanoke, TX',
              code: 'AGS5',
              driver: 'Jack Connor',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 13,
              value: 'Roanoke, TX',
              code: 'HKL1',
              driver: 'Harry Callum',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 14,
              value: 'Oxnard, CA',
              code: 'MYK3',
              driver: 'Jacob Kyle',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            }
          ]
        },
        {
          id: '2',
          load_id: 'BL093662',
          status: 'Inactive',
          truck_id: 'LD6548',
          trailer_id: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          pickup_date: 'Timestamp',
          delivery_date: 'Timestamp',
          rate_mile: '$4.50',
          revenue: '$450',
          miles: '500',
          equipment: '53’ Trailer',
          weight: '45K LBS',
          broker: 'Dianne Russell',
          drivers: [
            {
              id: 123,
              name: 'Jenny Wilson',
              type: 'Main Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Main Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 95
            },
            {
              id: 124,
              name: 'Guy Hawkins',
              type: 'Co- Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Co- Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 72
            }
          ],
          stops: [
            {
              id: 10,
              value: 'Roanoke, TX',
              code: 'CLT5',
              driver: 'Jenny Wilsons',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Preloaded',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 11,
              value: 'Roanoke, TX',
              code: 'BHM1',
              driver: 'Oliver Jake',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 12,
              value: 'Roanoke, TX',
              code: 'AGS5',
              driver: 'Jack Connor',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 13,
              value: 'Roanoke, TX',
              code: 'HKL1',
              driver: 'Harry Callum',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 14,
              value: 'Oxnard, CA',
              code: 'MYK3',
              driver: 'Jacob Kyle',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            }
          ]
        },
        {
          id: '3',
          load_id: 'BL093662',
          status: 'Active',
          truck_id: 'LD6548',
          trailer_id: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          pickup_date: 'Timestamp',
          delivery_date: 'Timestamp',
          rate_mile: '$4.50',
          revenue: '$450',
          miles: '500',
          equipment: '53’ Trailer',
          weight: '45K LBS',
          broker: 'Jerome Bell',
          drivers: [
            {
              id: 123,
              name: 'Jenny Wilson',
              type: 'Main Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Main Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 95
            },
            {
              id: 124,
              name: 'Guy Hawkins',
              type: 'Co- Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Co- Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 72
            }
          ],
          stops: [
            {
              id: 10,
              value: 'Roanoke, TX',
              code: 'CLT5',
              driver: 'Jenny Wilsons',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Preloaded',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 11,
              value: 'Roanoke, TX',
              code: 'BHM1',
              driver: 'Oliver Jake',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 12,
              value: 'Roanoke, TX',
              code: 'AGS5',
              driver: 'Jack Connor',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 13,
              value: 'Roanoke, TX',
              code: 'HKL1',
              driver: 'Harry Callum',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 14,
              value: 'Oxnard, CA',
              code: 'MYK3',
              driver: 'Jacob Kyle',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            }
          ]
        },
        {
          id: '4',
          load_id: 'BL093662',
          status: 'Inactive',
          truck_id: 'LD6548',
          trailer_id: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          pickup_date: 'Timestamp',
          delivery_date: 'Timestamp',
          rate_mile: '$4.50',
          revenue: '$450',
          miles: '500',
          equipment: '53’ Trailer',
          weight: '45K LBS',
          broker: 'Darlene Robertson',
          drivers: [
            {
              id: 123,
              name: 'Jenny Wilson',
              type: 'Main Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Main Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 95
            },
            {
              id: 124,
              name: 'Guy Hawkins',
              type: 'Co- Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Co- Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 72
            }
          ],
          stops: [
            {
              id: 10,
              value: 'Roanoke, TX',
              code: 'CLT5',
              driver: 'Jenny Wilsons',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Preloaded',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 11,
              value: 'Roanoke, TX',
              code: 'BHM1',
              driver: 'Oliver Jake',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 12,
              value: 'Roanoke, TX',
              code: 'AGS5',
              driver: 'Jack Connor',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 13,
              value: 'Roanoke, TX',
              code: 'HKL1',
              driver: 'Harry Callum',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 14,
              value: 'Oxnard, CA',
              code: 'MYK3',
              driver: 'Jacob Kyle',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            }
          ]
        },
        {
          id: '5',
          load_id: 'BL093662',
          status: 'Active',
          truck_id: 'LD6548',
          trailer_id: 'BWS',
          origin: 'Roanoke, TX',
          destination: 'Roanoke, TX',
          pickup_date: 'Timestamp',
          delivery_date: 'Timestamp',
          rate_mile: '$4.50',
          revenue: '$450',
          miles: '500',
          equipment: '53’ Trailer',
          weight: '45K LBS',
          broker: 'Devon Lane',
          drivers: [
            {
              id: 123,
              name: 'Jenny Wilson',
              type: 'Main Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Main Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 95
            },
            {
              id: 124,
              name: 'Guy Hawkins',
              type: 'Co- Driver',
              driver_dob: 'Jan 1, 1970',
              driver_type: 'Co- Driver',
              driver_contact_phone_number: '(229) 555-0109',
              driver_email_address: 'sara.cruz@example.com',
              payment_rates: '1200,98',
              driver_state: 'Califronia',
              fscPercentage: 72
            }
          ],
          stops: [
            {
              id: 10,
              value: 'Roanoke, TX',
              code: 'CLT5',
              driver: 'Jenny Wilsons',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Preloaded',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 11,
              value: 'Roanoke, TX',
              code: 'BHM1',
              driver: 'Oliver Jake',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: [
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                }
              ]
            },
            {
              id: 12,
              value: 'Roanoke, TX',
              code: 'AGS5',
              driver: 'Jack Connor',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 13,
              value: 'Roanoke, TX',
              code: 'HKL1',
              driver: 'Harry Callum',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            },
            {
              id: 14,
              value: 'Oxnard, CA',
              code: 'MYK3',
              driver: 'Jacob Kyle',
              address: '7644 Undergrove Street Denver, Co 80249',
              status: 'Drop',
              arrival_date: '10/05 10:15 CDT',
              scheduled_arrival_date: '10/05 10:15 CDT',
              departure_date: '10/05 10:15 CDT',
              scheduled_departure_date: '10/05 10:15 CDT',
              load_status: 'New Load',
              pickup_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              dropoff_instructions: 'Upon arrival driver needs to call and ask for Jane Kammer',
              load_miles: 425.5,
              totalDuration: '1d 10h 15m',
              bolLink: '#',
              documents: []
            }
          ]
        }
      ]
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
      return (this.$store.getters['driverBoard/driver'])
    }
    // extendedItems (): any[] {
    //   return this.$refs.table.getExtendedItems()
    // }
  },
  created () {
    this.getDriver(parseInt(this.$route.params.id, 10))
  },
  methods: {
    ...mapActions({
      getDriver: (action, id) => action('driverBoard/getDriver', id)
    }),
    findDiv (id: number) {
      if (id === undefined) { return '' }
      const offsets = ((document as Document).getElementById(id.toString()) as HTMLElement).getBoundingClientRect()
      const top = offsets.top
      const left = offsets.left
      return `left: ${left}; top: ${top}`
    },
    extendItem (event:any, item: any): void {
      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setStatus (id:number, newStatus:any) {
      const data = this.testData
      console.log(id)
      data.find((w:any) => w.id === id).status = newStatus
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
