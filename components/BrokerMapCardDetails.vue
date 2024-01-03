<template>
  <div
    class=" bg-white rounded-xl transition-all duration-500
    hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
  >
    <LoadDrawer :id="data?.id" ref="drawer" />
    <div class="grid grid-cols-11 py-4 px-3">
      <div class="text-gray-400 text-c-1 font-medium">
        Shipper Name
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Load ID
      </div>
      <div class="text-gray-400 text-c-1 font-medium col-span-2">
        Origin
      </div>
      <div class="text-gray-400 text-c-1 font-medium col-span-2">
        Destination
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Cargo Type
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Live Location
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Status
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Details
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Action
      </div>
      <div class="flex items-center justify-start">
        <div class="col-auto pr-0 mr-2">
          <img src="/images/Amazon.png" alt="amazon" class="rounded-full w-10 h-10">
        </div>
        <div class="col-auto">
          <span class="block text-c-1 font-semibold whitespace-nowrap">
            {{ response.company_name }}
          </span>
          <span class="block text-c-1 text-[#475467]">
            {{ response.company_desc }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-start font-medium text-dark-blue text-c-1">
        BL-093662
      </div>
      <div class="col-span-4">
        <div class="row mt-3">
          <div class="col-4 2xl:col-3">
            <div class="row">
              <div class="col-auto flex items-center gap-2">
                <span v-if="stops.length > 0" class="text-b-4 font-medium dark:text-white">
                  {{ stops[0].value }}
                </span>
                <span class="w-5 h-5 rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                  1
                </span>
              </div>
              <div class="col-12 text-gray-400 text-c-2">
                12/10/22 - 10:23 PM
              </div>
            </div>
          </div>
          <div class="col-auto flex items-center justify-center">
            <Icon icon="routing-2" color="gray" variant="bulk" :alpha="400" class="w-7 h-7" />
          </div>
          <div class="col-4 2xl:col-3">
            <div class="row">
              <div class="col-auto flex items-center gap-2">
                <span v-if="stops.length > 0" class="text-b-4 font-medium dark:text-white">
                  {{ stops[stops.length-1].value }}
                </span>
                <span class="w-5 h-5 rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                  {{ stops.length }}
                </span>
              </div>
              <div class="col-12 text-gray-400 text-c-2">
                <span class="font-medium">ETA:</span>12/10/22 - 10:23 PM
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-start text-c-1">
        Industrial Equipment
      </div>
      <div class="flex items-center justify-start text-c-1">
        California
      </div>
      <div class="flex items-center justify-start">
        <div class="w-20 items-center">
          <Status
            :item="data"
            :active="extendeds.includes(data.id)"
            :item-status="data.quote_status"
            :dropdown-menu="dropdownQuoteStatusMenu"
            :dropdown-style="dropdownQuoteStatusStyle"
            @extend="extendItemQuoteStatus"
            @set-status="setQuoteStatus"
          />
        </div>
      </div>
      <div class="flex items-center justify-start text-c-1">
        <div v-if="!editable" class="col-auto action-buttons p-0 flex gap-2 ml-[-25px]">
          <div
            class="w-8 h-8 border border-red-200 relative rounded-lg flex items-center justify-center cursor-pointer"
            @click="drawer(2)"
          >
            <Icon
              icon="sms"
              variant="bold"
              color="red"
              :alpha="0"
              class="w-4 h-4"
            />
            <div class="rounded-full border border-white w-3 h-3 flex items-center justify-center text-[8px] text-white absolute -mr-3 -mt-3 bg-red">
              2
            </div>
          </div>
          <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
            <Icon
              icon="map"
              color="grey-dark"
              :alpha="100"
              class="w-4 h-4 cursor-pointer"
            />
          </div>
          <div class="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center">
            <Icon icon="more-2" color="grey-dark" :alpha="100" :disable-fill="false" class="w-4 h-4 cursor-pointer" />
          </div>
        </div>
        <div v-else-if="!vertical" class="rounded-lg col-auto action-buttons p-0 flex gap-2 ml-[-25px] border !w-9 !h-9 border-gray-300 justify-center items-center cursor-pointer">
          <Icon icon="edit-2" variant="bold" color="gray" :alpha="400" class="w-5 h-5" />
        </div>
      </div>
      <div class="w-8 h-8 pt-3 rounded-lg flex items-center justify-center">
        <Icon
          icon="more-2"
          color="grey-dark"
          :alpha="100"
          :disable-fill="false"
          class="w-4 h-4 cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
export default Vue.extend({
  name: 'BrokerMapCardDetails',
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dropdownQuoteStatusStyle: 'a',
      dropdownQuoteStatusMenu: [
        { text: 'Open', bg: 'green' },
        { text: 'Assigned', bg: 'red' },
        { text: 'Dispatched', bg: 'purple' },
        { text: 'At pickup', bg: 'blue' },
        { text: 'In Transit', bg: 'orange' },
        { text: 'At Delivery', bg: 'orange' },
        { text: 'Delivered', bg: 'green' },
        { text: 'Cancelled', bg: 'red' },
        { text: 'Closed', bg: 'gray' }
      ],
      extendeds: [] as any[],
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      data: {
        load_status: 'Active'
      },
      response: {
        company_name: 'Amazon',
        company_desc: 'Amz'
      },
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
  },
  methods: {
    extendItemQuoteStatus (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownQuoteStatusStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setQuoteStatus (id:number, newStatus:any) {
      // const data = this.quotes.slice()
      console.log(id, newStatus)
      const item = this.data
      this.updateQuote({
        ...item,
        quote_status: newStatus,
        delivery_date: moment(item.delivery_date).toISOString(),
        pickup_date: moment(item.pickup_date).toISOString()
      })
    },
    formatDate (date: string): string {
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    ...mapActions({
      updateQuote: (action, request) => action('Broker/quotes/updateQuote', request)
    }),
    drawer (componentName: string | number) {
      (this.$refs.drawer as Vue & { showDrawer: (component: string | number, routeUrl?: String) => Element }).showDrawer(componentName)
    }
  }
})
</script>

<style scoped>
  th{
      font-family: 'Euclid Circular A';
      font-weight: 500;
    }

</style>
