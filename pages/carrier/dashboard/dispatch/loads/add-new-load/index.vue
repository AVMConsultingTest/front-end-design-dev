<template>
  <div class="w-full">
    <PageHeader title="New Loads" class="mb-10" @goback="$router.go(-1)" />
    <div class="my-5">
      <LoadCard
        v-if="load.saved"
        :data="load"
        :no-link="true"
        :without-details="true"
        :editable="true"
      />
      <widget v-else title="Load Basics" icon="box" icon-color="green">
        <div class="row">
          <div class="col-4 my-5">
            <Input
              v-model="load.broker_contact_name"
              name="brokerContactName"
              type="text"
              label="Broker Contact Name"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model="load.main_driver_name"
              name="mainDriverName"
              type="text"
              label="Main Driver Name"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.main_driver_type"
              :multiple="false"
              :searchable="true"
              :options="driverTypeOptions"
              :addable="true"
              :bind-text="true"
              name="mainDriverType"
              label="Main Driver Type"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <Input
              v-model="load.co_driver_name"
              name="coDriverName"
              type="text"
              label="Co-Driver Name"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.co_driver_type"
              :searchable="true"
              :options="driverTypeOptions"
              :addable="true"
              :bind-text="true"
              name="CoDriverType"
              label="Co-Driver Type"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.dispatcher_name"
              :searchable="true"
              :options="dispatcherOptions"
              :addable="true"
              name="dispatcher"
              label="Dispatcher"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <m-select
              v-model="load.trailer_id"
              :searchable="true"
              :options="trailerOptions"
              :addable="true"
              name="trailer"
              label="Trailer"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.truck_id"
              :searchable="true"
              :options="truckOptions"
              :addable="true"
              name="truck"
              label="Truck"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model.number="load.driver_id"
              name="driverId"
              type="number"
              label="Driver ID"
              rules="required"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <m-select
              v-model="load.equipment_type"
              :searchable="true"
              :options="equipOptions"
              :addable="true"
              name="equipmentType"
              :bind-text="true"
              label="Equipment Type"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model="load.equipment_weight"
              name="equipmentWeight"
              type="number"
              label="Equipment Weight"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.load_status"
              :searchable="true"
              :options="loadStatusOptions"
              :addable="true"
              name="loadStatus"
              :bind-text="true"
              label="Load Status"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <Input
              v-model="load.load_origin"
              name="loadOrigin"
              type="text"
              label="Load Origin"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model="load.load_destination"
              name="loadDestination"
              type="text"
              label="Load Destination"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model.number="load.load_revenue"
              name="loadRevenue"
              type="number"
              label="Load Revenue"
              rules="required"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <Input
              v-model="load.load_pickup_date"
              name="loadPickupDate"
              type="datetime-local"
              label="Load Pickup Date"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model="load.load_delivery_date"
              name="loadDeliveryDate"
              type="datetime-local"
              label="Load Delivery Date"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model.number="load.load_miles"
              name="loadMiles"
              type="number"
              label="Load Miles"
              rules="required"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <Input
              v-model.number="load.load_rate_per_mile"
              name="loadRatePerMile"
              type="number"
              label="Load Rate Per Mile"
              rules="required"
            />
          </div>
          <!-- <div class="col-4 my-5">
            <Input
              v-model.number="load.estimated_base_rate"
              name="estimatedBaseRate"
              type="number"
              label="Estimated Base Rate"
              rules="required"
            />
          </div> -->
          <div class="col-4 my-5">
            <Input
              v-model.number="load.estimated_duration_min"
              name="estimatedDurationMin"
              type="number"
              label="Estimated Duration Minutes"
              rules="required"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4 my-5">
            <Input
              v-model.number="load.estimated_fuel_surcharge"
              name="estimatedFuelSurcharge"
              type="number"
              label="Estimated Fuel Surcharge"
              rules="required"
            />
          </div>
          <div class="col-4 my-5">
            <Input
              v-model.number="load.estimated_total_payout"
              name="estimatedTotalPayout"
              type="number"
              label="Total Payout"
              rules="required"
            />
          </div>
        </div>
      </widget>
    </div>
    <LoadItemDetail :data="load" :splitted="true" :added="true" />
    <the-add-load-stop
      v-for="(addStop,index) in addLoadStopArray"
      :key="`addStop${index}`"
      :ref="'addStop'+index"
    />
    <div class="row mb-5 mt-5 ml-1 items-center">
      <div
        class="col-3 max-w-max p-4  h-12 bg-black rounded-lg flex items-center justify-center cursor-pointer"
        @click="addStop"
      >
        <Icon icon="add" color="white" class="w-6 h-6" />
      </div>
      <span class="col text-b-4 font-medium">
        Add New Stop
      </span>
    </div>
    <div class="row flex justify-end pb-5">
      <div class="flex col-3 items-end h-full">
        <div class="flex flex-1 ml-auto col-3 justify-end">
          <Button
            :type="ButtonTypeEnum.PRIMARY"
            :size="SizeTypeEnum.MD"
            :action="ActionTypeEnum.BUTTON"
            class="max-w-max p-4 "
            @click="saveLoad"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import TheAddLoadStop from '@/components/TheAddLoadStop.vue'
import LoadItemDetail from '~/components/LoadItemDetail.vue'
import { LoadDetails } from '~/models/DISPATCH/load/loadDetails'
import { Stop } from '~/models/stops'
import { SelectOption } from '~/components/ts/interfaces'

type Load = Omit<LoadDetails & {
  saved: boolean,
  main_driver_type: string,
  co_driver_type: string
 }, 'id' | 'updated_date'>

export default Vue.extend({
  components: {
    TheAddLoadStop,
    LoadItemDetail
  },
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      toggle: false,
      savedStops: [],
      id: 0,
      // TODO: Change this when API - Post method returns load id
      loadId: Math.floor(Math.random() * 10) + 1,
      addLoadStopArray: [],
      driverTypeOptions: [
        { id: 1, text: 'Lease Driver', selected: false },
        { id: 2, text: 'Company Driver', selected: false },
        { id: 3, text: 'Owner Operator', selected: false }
      ] as SelectOption[],
      truckOptions: [
      ],
      brokerOptions: [
      ],
      loadStatusOptions: [
        { id: 1, text: 'Waiting' },
        { id: 2, text: 'On-route' },
        { id: 3, text: 'Upcoming' }
      ] as SelectOption[],
      driverOptions: [
      ],
      trailerOptions: [
      ],
      payoutOptions: [
      ],
      tripOptions: [
      ],
      dispatcherOptions: [
      ],
      equipOptions: [
        { id: 1, text: '53\' Dryvan' },
        { id: 2, text: '53\' Reefer' },
        { id: 3, text: '53\' Flatbed' },
        { id: 4, text: '48\' Flatbed' },
        { id: 5, text: 'Step Deck' },
        { id: 6, text: 'Straight Truck' },
        { id: 7, text: 'Hotshot' },
        { id: 8, text: '20\' Container' },
        { id: 9, text: '40\' Container' }
      ],
      load: {
        id: 0,
        carrier_status: "",
        miles: 0,
        rate_per_mile: 0,
        source: "",
        estimated_base_rate: 0,
        estimated_duration_minutes: 0,
        estimated_fuel_surcharge: 0,
        estimated_total_payout: 0,
        pickup_address_line1: "",
        pickup_address_line2: "",
        pickup_city: "",
        pickup_state: "",
        pickup_zip_code: "",
        pickup_date: "",
        drop_off_address_line1: "",
        drop_off_address_line2: "",
        drop_off_city: "",
        drop_off_state: "",
        drop_off_zip_code: "",
        drop_off_date: "",
        carrier_revenue: 0,
        commodity_type: "",
        broker_status: "",
        loading_type: "",
        unloading_type: "",
        is_trailer_required: "",
        total_distance: "",
        customer_id: 0,
        carrier_id: 0,
        primary_driver_id: 0,
        secondary_driver_id: 0,
        broker_id: 0,
        truck_id: 0,
        trailer_id: 0,
        load_stops: [] as Stop[]
      } as unknown as Load,
      
      stopDefault: {
        id: 1,
        load_miles: 425.5,
        totalDuration: '1d 10h 15m',
        bolLink: '#'
      }
    }
  },
  computed: {
    carrierId (): number {
      return this.$store.state.carrierId
    },
    brokerId (): number {
      return this.$store.state.brokerId
    }
  },
  methods: {
    ...mapActions({
      addLoad: (action, payload) => action('loads/addLoad', payload),
      addLoadStop: (action, param) => action('stops/addStop', param)
    }),
    saveLoad () {
      // this.load.broker_id = 'BL - ' + this.load.broker_id
      // this.load.loadId = parseInt(this.load.broker_id)
      this.load.currentStop = 0
      this.load.saved = true
      this.addLoad({
        ...this.load,
        carrier_id: this.carrierId,
        broker_id: this.brokerId,
        stops: {},
        main_driver_type: undefined,
        co_driver_type: undefined,
        saved: undefined,
        currentStop: undefined
      }).then(() => {
        Object.keys(this.$refs).forEach((key) => {
          if (key.toLowerCase().includes('stop')) {
            const returnStop: Stop = {
              ...this.$refs[key][0].returnStop(),
              carrier_id: this.carrierId,
              document_id: 1,
              load_id: this.loadId,
              stop_index: parseInt(key.toLowerCase().replace('addstop', '')),
              pickup_date: this.concatenateDate(this.$refs[key][0].returnStop().pickup_date, this.$refs[key][0].returnStop().pickup_time),
              pickup_time: this.concatenateDate(this.$refs[key][0].returnStop().pickup_date, this.$refs[key][0].returnStop().pickup_time),
              drop_off_date: this.concatenateDate(this.$refs[key][0].returnStop().drop_off_date, this.$refs[key][0].returnStop().drop_off_time),
              drop_off_time: this.concatenateDate(this.$refs[key][0].returnStop().drop_off_date, this.$refs[key][0].returnStop().drop_off_time)
            }
            this.addLoadStop(returnStop)
            this.saveStop(returnStop)
          }
        })
      }).catch((err:unknown) => {
        console.log(err)
      })
    },
    addStop () {
      this.id++
      this.addLoadStopArray.push({})
    },
    concatenateDate (date: string, time: string) {
      return moment(date + ' ' + time, 'YYYY-MM-DD HH:mm').toISOString()
    },
    saveStop (stop:Stop) {
      this.stopDefault.id++
      stop = { ...stop, ...this.stopDefault }
      console.log(stop)
      this.load.stops.push(stop)
      this.addLoadStopArray = []
      this.addStop()
      this.toggle = false
    }
  }
})
</script>
