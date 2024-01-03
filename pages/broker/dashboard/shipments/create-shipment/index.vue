<template>
  <div class="w-full">
    <PageHeader
      title="Create Shipment"
      class="mb-10"
      @goback="$router.go(-1)"
    />
    <div class="my-5">
      <LoadCardShipment v-if="load.saved" :link-id="load.loadId" :data="load" />
      <widget v-else title="Load Basics" icon="box" icon-color="green">
        <div slot="actions" class="flex items-center">
          <div class="w-4 h-4 rounded-full flex justify-center items-center bg-green-400 ">
            <span class="text-white text-c-2 font-medium">
              1
            </span>
          </div>
          <div class="rounded mx-1 w-3 h-1 block bg-gray-300" />
          <div class="w-4 h-4 rounded-full flex justify-center items-center bg-gray-300">
            <span class="text-white text-c-2 font-medium">
              2
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <Input
              v-model="load.loadId"
              name="shipperloadId"
              type="text"
              label="Customer Load ID"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.shipperName"
              :multiple="false"
              :searchable="true"
              :options="shipperNameOptions"
              :bind-text="true"
              :addable="true"
              name="shipperName"
              label="Customer Name"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.loadType"
              :multiple="false"
              :searchable="true"
              :options="loadOptions"
              :addable="true"
              name="commodityType"
              label="Commodity Type"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <Input
              v-model="load.totalRevenue"
              :multiple="false"
              :searchable="true"
              name="totalRevenue"
              label="Total Revenue"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model="load.maxBuy"
              :multiple="false"
              :searchable="true"
              name="maxBuy"
              label="Max Buy"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model="load.maxBuyNow"
              :multiple="false"
              :searchable="true"
              name="buyNow"
              label="Buy Now"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <Input
              v-model="load.totalDistance"
              :multiple="false"
              :searchable="true"
              name="totalDistance"
              label="Total Distance (Miles)"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              :options="loadingTypeOptions"
              :multiple="false"
              :searchable="true"
              :addable="true"
              name="loadingType"
              type="text"
              label="Loading Type"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              :options="unloadingTypeOptions"
              :multiple="false"
              :searchable="true"
              :addable="true"
              name="unloadingType"
              type="text"
              label="Unloading Type"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <m-select
              v-model="load.trailerRequired"
              :options="trailerRequiredOptions"
              :multiple="false"
              :searchable="true"
              name="trailerRequired"
              type="text"
              label="Trailer"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.equipment"
              :multiple="false"
              :searchable="true"
              :options="equipmentOptions"
              :addable="true"
              name="equipment"
              label="Equipment"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              :multiple="false"
              :searchable="true"
              :options="unitOptions"
              :addable="true"
              name="units"
              label="Units"
            />
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-4 my-5">
            <m-select
              v-model="load.pickup_location"
              :multiple="false"
              :searchable="true"
              :bind-text="true"
              :options="locationsOptions"
              :addable="true"
              type="text"
              name="pickupLocation"
              label="Pickup Location"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.delivery_location"
              :multiple="false"
              :searchable="true"
              :bind-text="true"
              :options="locationsOptions"
              :addable="true"
              type="text"
              name="deliveryLocation"
              label="Delivery Location"
              rules="required"
            />
          </div>
        </div>
      </widget>
    </div>
    <TheAddSegment v-for="(addStop,index) in addSegmentArray" v-if="!load.saved" :key="`addStop${index}`" :index="index" @save-stop="saveLoad" />
    <div v-if="!load.saved" class="row mb-5 mt-5 ml-1 items-center">
      <div
        class="col-1 w-14 h-12 bg-black rounded-lg flex items-center justify-center cursor-pointer"
        @click="addStop"
      >
        <Icon
          icon="add"
          color="white"
          class="w-6 h-6"
        />
      </div>
      <span class="col text-b-4 font-medium">
        Add Segment
      </span>
    </div>
    <div class="row flex pb-5">
      <div class="flex col-12 items-end h-full">
        <div class="items-center">
          <Button
            :type="ButtonTypeEnum.SECONDARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            class="!w-[180px] p-4"
            @goback="$router.go(-1)"
          >
            Split Loads
          </Button>
        </div>
        <div class="flex justify-end ml-auto">
          <Button
            :type="ButtonTypeEnum.SECONDARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            class="!w-[180px] p-4 mr-4"
            @goback="$router.go(-1)"
          >
            Cancel
          </Button>
          <div class="">
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.BUTTON"
              class="!w-[180px] p-4"
              @click="saveLoad"
            >
              Save Shipment
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      toggle: false,
      addSegmentArray: [{}],
      shipperNameOptions: [
      ],
      locationsOptions: [
        { id: 1, text: 'Naperville, IL', selected: false },
        { id: 2, text: 'Tacoma, WA', selected: false },
        { id: 3, text: 'Phoenix, AZ', selected: false },
        { id: 4, text: ' Houston, TX', selected: false }
      ],
      loadOptions: [
        { id: 1, text: 'Retail Goods' },
        { id: 2, text: 'Machinery' },
        { id: 3, text: 'General Goods' },
        { id: 4, text: 'Food Items' },
        { id: 5, text: 'Freight of All kinds' }
      ],
      trailerRequiredOptions: [
        { id: 1, text: 'Required' },
        { id: 2, text: 'Provided' }
      ],
      loadingTypeOptions: [
        { id: 1, text: 'Live Unload' },
        { id: 2, text: 'Drop Trailer' },
        { id: 3, text: 'Power-only' }
      ],
      unloadingTypeOptions: [
        { id: 1, text: 'Live Unload' },
        { id: 2, text: 'Drop Trailer' },
        { id: 3, text: 'Power-only' }
      ],
      unitOptions: [
        { id: 1, text: 'Pallets' },
        { id: 2, text: 'Cases' },
        { id: 3, text: 'Boxes' },
        { id: 4, text: 'Drums' },
        { id: 5, text: 'Totes' },
        { id: 6, text: 'Reels' },
        { id: 7, text: 'Coils' },
        { id: 8, text: 'Pieces' },
        { id: 9, text: 'Rolls' },
        { id: 10, text: 'Bundles' }
      ],
      equipmentOptions: [
        { id: 1, text: '53\' Dryvan' },
        { id: 2, text: '53\' Reefer' },
        { id: 3, text: '53\' Flatbed' },
        { id: 4, text: '48\' Flatbed' },
        { id: 5, text: 'Step Deck' },
        { id: 6, text: 'Straight Truck' },
        { id: 7, text: 'Hotshot' },
        { id: 8, text: '20\' Container' },
        { id: 9, text: '40\' Container' },
        { id: 10, text: 'Sprinter Van' },
        { id: 11, text: 'Power Only' }
      ],
      load: {
        loadId: '',
        shipperName: '',
        loadType: '',
        totalRevenue: '',
        maxBuy: '',
        maxBuyNow: '',
        totalDistance: '',
        trailerRequired: 0,
        carrierName: '',
        equipment: '',
        pickup_location: '',
        delivery_location: '',
        stops: [],
        saved: false
      }
    }
  },
  methods: {
    saveLoad (stop:any) {
      this.load.saved = true
      this.load.stops.push(stop)
    },
    addStop () {
      this.addSegmentArray.push({ })
    },
    saveStop (stop:any) {
      this.load.stops.push(stop)
    },
    // addLoad() {
    //   return new Promise((resolve) => {
    //     resolve(null)
    //   })
    // },
    // saveLoad () {
    //   // this.load.broker_id = 'BL - ' + this.load.broker_id
    //   // this.load.loadId = parseInt(this.load.broker_id)
    //   this.load.currentStop = 0
    //   this.load.saved = true
    //   this.addLoad({
    //     ...this.load,
    //     carrier_id: this.carrierId,
    //     broker_id: this.brokerId,
    //     stops: {},
    //     main_driver_type: undefined,
    //     co_driver_type: undefined,
    //     saved: undefined,
    //     currentStop: undefined
    //   }).then(() => {
    //     Object.keys(this.$refs).forEach((key) => {
    //       if (key.toLowerCase().includes('stop')) {
    //         const returnStop = {
    //           ...this.$refs[key][0].returnStop(),
    //           carrier_id: this.carrierId,
    //           document_id: 1,
    //           load_id: this.loadId,
    //           stop_index: parseInt(key.toLowerCase().replace('addstop', '')),
    //           pickup_date: this.concatenateDate(this.$refs[key][0].returnStop().pickup_date, this.$refs[key][0].returnStop().pickup_time),
    //           pickup_time: this.concatenateDate(this.$refs[key][0].returnStop().pickup_date, this.$refs[key][0].returnStop().pickup_time),
    //           drop_off_date: this.concatenateDate(this.$refs[key][0].returnStop().drop_off_date, this.$refs[key][0].returnStop().drop_off_time),
    //           drop_off_time: this.concatenateDate(this.$refs[key][0].returnStop().drop_off_date, this.$refs[key][0].returnStop().drop_off_time)
    //         }
    //         this.addLoadStop(returnStop)
    //         this.saveStop(returnStop)
    //       }
    //     })
    //   }).catch((err:unknown) => {
    //     console.log(err)
    //   })
    // },
    // addStop () {
    //   this.id++
    //   this.addLoadStopArray.push({})
    // },
    concatenateDate (date: string, time: string) {
      return moment(date + ' ' + time, 'YYYY-MM-DD HH:mm').toISOString()
    }
    // saveStop (stop) {
    //   this.stopDefault.id++
    //   stop = { ...stop, ...this.stopDefault }
    //   console.log(stop)
    //   this.load.stops.push(stop)
    //   this.addLoadStopArray = []
    //   this.addStop()
    //   this.toggle = false
    // }
  }
})
</script>
