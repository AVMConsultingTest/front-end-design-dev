<template>
  <div
    class="load-card bg-white rounded-xl transition-all duration-500
  hover:border-transparent dark:bg-[#21293B] shadow-2xl shadow-gray-500/10 dark:shadow-none"
  >
    <div class="load-body px-6 pt-5 flex flex-col border-b border-dashed border-b-grey-blue-100 dark:border-b-gray-600">
      <div class="grid gap-12 grid-cols-7">
        <div class="card-left col-span-3 ">
          <div class="row items-center">
            <span class="text-grey-dark-200 text-c-2 col-12 mb-1">Broker Load ID</span>
            <div class="col-auto">
              <h5 class="font-semibold dark:text-white">
                {{ data.broker_load_id }}
              </h5>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-5 2xl:col-3">
              <div class="row">
                <span class="text-grey-dark-200 text-b-4 col-12 mb-1 font-medium">Origin</span>
                <div class="col-auto flex items-center gap-2">
                  <span v-if="data.origin.length > 0" class="text-b-3 font-medium dark:text-white">
                    {{ data.origin }}
                  </span>
                  <span class="w-5 h-5 min-h-[1.25rem] min-w-[1.25rem] max-h-[1.25rem] max-w-[1.25rem] rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                    1
                  </span>
                </div>
                <div class="col-12 text-gray-400 text-c-2">
                  {{ formatDate(data.origin_time) }}
                </div>
              </div>
            </div>
            <div class="col-auto flex items-center pt-3 justify-center">
              <Icon icon="routing-2" color="gray" variant="bulk" :alpha="400" class="w-7 h-7" />
            </div>
            <div class="col-5 2xl:col-3">
              <div class="row">
                <span class="text-grey-dark-200 text-b-4 col-12 mb-1 font-medium">Destination</span>
                <div class="col-auto flex items-center gap-2">
                  <span v-if="data.destination.length > 0" class="text-b-3 font-medium dark:text-white">
                    {{ data.destination }}
                  </span>
                  <span class="w-5 h-5 min-h-[1.25rem] min-w-[1.25rem] max-h-[1.25rem] max-w-[1.25rem] rounded-full flex items-center justify-center bg-melrose text-white text-c-1">
                    {{ stops.length }}
                  </span>
                </div>
                <div class="col-12 text-gray-400 text-c-2">
                  <span class="font-medium">ETA:</span>{{ formatDate(data.destination_time) }}
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4 mx-0">
            <div v-for="(stop,index) in stops" :key="index" class="col-auto p-0 flex items-center" />
          </div>
        </div>
        <div class="card-right col-span-4 mt-auto ml-auto mr-4 mb-4">
          <div class="row mt-7">
            <div class="col-auto">
              <div class="flex gap-1">
                <div class="mx-1 w-1 h-5 bg-green-400 rounded" />
                <div class="flex flex-col">
                  <span class="text-b-3 font-medium dark:text-white">${{ data.miles }}</span>
                  <span class="font-medium text-gray-400 text-c-2 block">Miles</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="flex gap-1">
                <div class="mx-1 w-1 h-5 bg-green-400 rounded" />
                <div class="flex flex-col">
                  <span class="text-b-3 font-medium dark:text-white">${{ data.rate_per_mile }}</span>
                  <span class="font-medium text-gray-400 text-c-2 block">Rate Per Mile</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="flex gap-1">
                <div class="mx-1 w-1 h-5 bg-green-400 rounded" />
                <div class="flex flex-col">
                  <span class="text-b-3 font-medium dark:text-white">$4,200</span>
                  <span class="font-medium text-gray-400 text-c-2 block">Total Payout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="load-footer px-6 pt-3 pb-4">
      <div class="row gap-2">
        <div class="col-auto">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="font-medium text-gray-400 text-c-2 block">Brokerage</span>
              <span class="text-c-1 font-medium dark:text-white">{{ data.brokerage }}</span>
            </div>
          </div>
        </div>

        <div class="col-auto">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="font-medium text-gray-400 text-c-2 block">Equipment Type</span>
              <span class="text-c-1 font-medium dark:text-white">{{ data.equipment_type }}</span>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="font-medium text-gray-400 text-c-2 block">Commodity</span>
              <span class="text-c-1 font-medium dark:text-white">{{ data.commodity }}</span>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <span class="font-medium text-gray-400 text-c-2 block">Weight</span>
              <span class="text-c-1 font-medium dark:text-white">{{ data.weight }} lbs</span>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="flex gap-1">
            <div v-if="!withoutDetails" class="flex flex-col cursor-pointer" @click="showDetail = !showDetail">
              <span class="font-medium text-gray-400 text-c-2 block">Stops</span>
              <span class="text-c-1 font-medium text-dark-blue">{{ stops.length }}</span>
            </div>
          </div>
        </div>
        <div class="col-auto p-0 ml-auto">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <div class="w-28 h-10">
                <Button
                  class="flex max-w-max p-4 !bg-white border border-green-800 text-green-800"
                  :type="ButtonTypeEnum.PRIMARY"
                  :size="SizeTypeEnum.MD"
                  :action="ActionTypeEnum.BUTTON"
                  @click="openModal1"
                >
                  Place Bid
                </Button>
                <Modal ref="modal1" size="sm">
                  <div slot="body" class="row flex items-center justify-center py-16">
                    <div class="col-8 items-center justify-center my-0">
                      <h3 class="font-semibold text-center mb-2">
                        Place Bid
                      </h3>
                      <p class="text-b-4 font-medium text-gray-400 text-center">
                        Something.
                      </p>
                      <Form fclass="row my-2">
                        <div class="col-12 mb-6">
                          <Input
                            name="ratePerMile"
                            type="text"
                            label="Rate Per Mile"
                            rules="required"
                          />
                        </div>
                        <div class="col-12 mb-6">
                          <Input
                            name="totalPayout"
                            type="text"
                            label="Total Payout"
                            rules="required"
                          />
                        </div>
                      </Form>
                    </div>
                    <div class="col-8">
                      <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG">
                        Submit
                      </Button>
                      <Button
                        :type="ButtonTypeEnum.LINK"
                        :size="SizeTypeEnum.LG"
                        :action="ActionTypeEnum.BUTTON"
                        class="mt-2"
                        @click="hideModal1()"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto p-0">
          <div class="flex gap-1">
            <div class="flex flex-col">
              <div class="w-28 h-10">
                <Button
                  class="flex max-w-max p-4 !bg-green-400 !text-sidebar-bg"
                  :type="ButtonTypeEnum.PRIMARY"
                  :size="SizeTypeEnum.MD"
                  :action="ActionTypeEnum.BUTTON"
                  @click="openModal2"
                >
                  Book Now
                </Button>
                <Modal ref="modal2" size="sm">
                  <div slot="body" class="row flex items-center justify-center py-16">
                    <div class="col-8 items-center justify-center my-0">
                      <h3 class="font-semibold text-center mb-2">
                        Book Now
                      </h3>
                      <p class="text-b-4 font-medium text-gray-400 text-center">
                        Something.
                      </p>
                      <Form fclass="row mb-2 mt-12">
                        <div class="col-12 mb-6">
                          <div class="block">
                            <div class="text-c-1 font-normal mb-2 text-dark">
                              Total Payout
                            </div>
                            <div
                              class="bg-[#F9FAFB] p-5 text-b-2 font-medium"
                            >
                              $4,200
                            </div>
                          </div>
                          <div class="block">
                            <div class="text-c-1 font-normal mt-4 mb-2 text-dark">
                              Rate Per Mile
                            </div>
                            <div
                              class="bg-[#F9FAFB] p-5 text-b-2 font-medium"
                            >
                              ${{ data.rate_per_mile }}
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                    <div class="col-8 mt-14">
                      <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.LG">
                        Submit
                      </Button>
                      <Button
                        :type="ButtonTypeEnum.LINK"
                        :size="SizeTypeEnum.LG"
                        :action="ActionTypeEnum.BUTTON"
                        class="mt-2"
                        @click="hideModal2()"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-2">
          <transition name="slide">
            <div v-if="showDetail" class="w-100">
              <MarketPlaceItemDetail :data="{...data, stops: stops}" @openDrawer="drawer('')" @openMessages="drawer(2)" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import moment from 'moment'
import MarketPlaceItemDetail from './MarketPlaceItemDetail.vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { LoadBoardDetails } from '~/models/Marketplace/LoadBoardDetails/LoadBoardDetails'
import { Stop } from '@/models/stops'

export default Vue.extend({
  name: 'BrokerMarketPlaceCard',
  components: { MarketPlaceItemDetail },
  props: {
    // The data for the card that includes
    //  the load details and the stops
    // e.g.: { loadDetails: {}, stops: [] }
    // default: null
    data: {
      type: Object,
      required: true,
      default: null
    } as PropOptions<LoadBoardDetails>,
    // The id that is going to be used to
    // redirect to the load details page
    // e.g.: 123
    // default: null
    // DEPRECATED
    linkId: {
      type: Number,
      default: null
    },
    // Show the details of the loads and stops
    // e.g.: true
    // default: false
    withoutDetails: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      circumference: 30 * 2 * Math.PI,
      currentStop: 3,
      stops: [] as Stop[],
      //   {
      //     id: 10,
      //     value: 'Roanoke, TX',
      //     code: 'CLT5',
      //     driver: 'Jenny Wilson',
      //     totalMiles: 425.5,
      //     totalDuration: '1d 10h 15m',
      //     bolLink: '#'
      //   },
      //   {
      //     id: 11,
      //     value: 'Roanoke, TX',
      //     code: 'BHM1',
      //     driver: 'Jenny Wilson',
      //     totalMiles: 425.5,
      //     totalDuration: '1d 10h 15m',
      //     bolLink: '#'
      //   },
      //   {
      //     id: 12,
      //     value: 'Roanoke, TX',
      //     code: 'AGS5',
      //     driver: 'Jenny Wilson',
      //     totalMiles: 425.5,
      //     totalDuration: '1d 10h 15m',
      //     bolLink: '#'
      //   },
      //   {
      //     id: 13,
      //     value: 'Roanoke, TX',
      //     code: 'HKL1',
      //     driver: 'Guy Hawkins',
      //     totalMiles: 425.5,
      //     totalDuration: '1d 10h 15m',
      //     bolLink: '#'
      //   },
      //   {
      //     id: 14,
      //     value: 'Oxnard, CA',
      //     code: 'MYK3',
      //     driver: 'Guy Hawkins',
      //     totalMiles: 425.5,
      //     totalDuration: '1d 10h 15m',
      //     bolLink: '#'
      //   }
      // ],
      showDetail: false
    }
  },
  computed: {
    percent (): any {
      return this.data?.status === 'On-route' ? 10 : 2
    },
    marketStops (): any {
      console.log(this?.stops)
      if (this?.stops) { return this?.stops } else { return this.stops }
    }
  },
  created () {
    this.$axios.get(`/dispatch_two_api/StopsDetails/Loads/${this.data.id}?page_size=12&page_number=1`).then((res: any) => {
      console.log('res.data', res.data)
      this.stops = res.data.data
    })
  },
  methods: {
    formatDate (date: string): string {
      const fixedArr = date.split('-')
      fixedArr[1] = fixedArr[1] === '00' ? '01' : fixedArr[1]
      return moment(fixedArr.join(), 'YYYY-MM-DD HH:mm:ss').format('MM-DD-YYYY HH:mm')
    },
    hideModal1 (): void {
      (this.$refs.modal1 as Vue & { hideModal: () => Function }).hideModal()
    },
    hideModal2 (): void {
      (this.$refs.modal2 as Vue & { hideModal: () => Function }).hideModal()
    },
    openModal1 () {
      (this.$refs.modal1 as Vue & { showModal: () => Element }).showModal()
    },
    openModal2 () {
      (this.$refs.modal2 as Vue & { showModal: () => Element }).showModal()
    },
    drawer (componentName: string | number) {
      (this.$refs.drawer as Vue & { showDrawer: (component: string | number, routeUrl?: String) => Element }).showDrawer(componentName)
    }
  }
})
</script>
