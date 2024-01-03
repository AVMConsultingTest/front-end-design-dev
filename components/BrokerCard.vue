<template>
  <div
    class=" bg-white rounded-xl transition-all duration-500
  hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
  >
    <div class="grid grid-cols-11 py-4 px-3">
      <div class="text-gray-400 text-c-1 font-medium">
        Customer Name
      </div>
      <div class="text-gray-400 text-c-1 font-medium ml-[14px]">
        Load ID
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Quote ID
      </div>
      <div class="text-gray-400 text-c-1 font-medium col-span-2">
        Origin
      </div>
      <div class="text-gray-400 text-c-1 font-medium col-span-2">
        Destination
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Last/New
      </div>
      <div class="text-gray-400 text-c-1 font-medium ml-[-15px]">
        Commodity Type
      </div>
      <div class="text-gray-400 text-c-1 font-medium ml-4">
        Status
      </div>
      <div class="text-gray-400 text-c-1 font-medium">
        Action
      </div>
      <div class="flex items-center justify-start">
        <div class="col-auto pr-0">
          <img src="/images/Amazon.png" alt="amazon" class="rounded-full w-10 h-10">
        </div>
        <div class="col-auto">
          <span class="block text-c-1 font-medium whitespace-nowrap">
            {{ data.name }}
          </span>
          <!-- <span class="block text-c-1 text-[#475467]">
            {{ data.company_desc }}
          </span> -->
        </div>
      </div>
      <div class="flex items-center justify-start font-medium text-dark-blue text-c-1 ml-[14px]">
        {{ data.load_id }}
      </div>
      <div class="flex items-center justify-start text-c-1 font-semibold">
        {{ data.quote }}
      </div>
      <div class="col-span-4">
        <div class="row mt-3">
          <div class="col-4 2xl:col-3">
            <div class="row">
              <div class="col-auto flex items-center gap-2">
                <span v-if="stops.length > 0" class="text-b-4 font-medium dark:text-white">
                  {{ data.origin }}
                </span>
                <span class="w-5 h-5 rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                  1
                </span>
              </div>
              <div class="col-12 text-gray-400 text-c-2">
                {{ formatDate(data.pickup_time) }}
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
                  {{ data.destination }}
                </span>
                <span class="w-5 h-5 rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                  {{ stops.length }}
                </span>
              </div>
              <div class="col-12 text-gray-400 text-c-2">
                <span class="font-medium">ETA:</span>{{ formatDate(data.delivery_time) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-start text-c-1">
        <span class="text-gray">${{ data.last_quote }}</span> <span class="font-semibold">/ ${{ data.quote }}</span>
      </div>
      <div class="flex items-center font-normal justify-start text-c-1">
        {{ data.cargo_type }}
      </div>
      <div class="flex items-center justify-start">
        <div class="w-20 items-center">
          <Status
            :item="data"
            :active="extendeds.includes(data.id)"
            :item-status="data.status"
            :dropdown-menu="dropdownQuoteStatusMenu"
            :dropdown-style="dropdownQuoteStatusStyle"
            @extend="extendItemQuoteStatus"
            @set-status="setQuoteStatus"
          />
        </div>
      </div>
      <div class="flex items-center justify-start pl-2">
        <Icon
          icon="more"
          color="gray"
          class="w-5 h-5 cursor-pointer"
          :alpha="400"
          variant="linear"
          :disable-fill="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import { PropOptions } from 'vue'
import moment from 'moment'
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { QuotesDetails } from '~/models/Broker/Quotes/QuotesDetails'
export default ({
  name: 'BrokerCard',
  props: {
    data: {
      type: Object,
      required: true,
      default: null
    } as PropOptions<QuotesDetails>,
    linkId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      dropdownQuoteStatusStyle: 'a',
      dropdownQuoteStatusMenu: [
        { text: 'Open', bg: 'green' },
        { text: 'Closed', bg: 'red' },
        { text: 'Awarded', bg: 'orange' }
      ],
      extendeds: [] as any[],
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
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
    })
  }
})
</script>

<style scoped>
th{
    font-family: 'Euclid Circular A';
    font-weight: 500;
}

</style>
