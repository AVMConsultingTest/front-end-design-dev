<template>
  <div class="w-full">
    <PageHeader
      title="Edit Load"
      class="mb-10"
      @goback="$router.go(-1)"
    >
      <template #actions>
        <div class="w-32 h-10">
          <Button :type="ButtonTypeEnum.GREEN" :size="SizeTypeEnum.MD" disabled :action="ActionTypeEnum.BUTTON">
            Save Changes
          </Button>
        </div>
      </template>
    </PageHeader>
    <div class="my-5">
      <LoadCardShipment v-if="load.saved" :link-id="load.loadId" :data="load" />
      <widget v-else title="Load Basic" icon="box" icon-color="green">
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
              label="Shipper Load ID"
              rules="required"
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
              label="Shipper Name"
            />
          </div>
          <div class="col-4 my-5">
            <m-select
              v-model="load.loadTrip"
              :multiple="false"
              :searchable="true"
              :options="loadOptions"
              :addable="true"
              name="loadTrip"
              label="Load Trip"
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
              name="maxBuyNow"
              label="Max Buy Now"
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
              v-model="load.trailerRequired"
              :options="trailerRequiredOptions"
              :multiple="false"
              :searchable="true"
              name="trailerRequired"
              type="text"
              label="Trailer Required"
              rules="required"
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
        </div>
        <div class="row mb-5">
          <div class="col-4 my-5">
            <Input
              v-model="load.carrierName"
              name="carrierName"
              type="text"
              label="Carrier Name"
              rules="required"
            />
          </div>
        </div>
        <div class="row mb-12">
          <div class="col-2 col-lg-1 ml-auto">
            <Button

              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.MD"
              :action="ActionTypeEnum.BUTTON"
              @click="saveLoad"
            >
              Save
            </Button>
          </div>
        </div>
      </widget>
    </div>
    <AddLoad-Split v-for="(stop,index) in load.stops" :key="`stop${index}`" />
    <AddLoad-Split v-for="(addStop,index) in addSegmentArray" :key="`addStop${index}`" @save-stop="saveStop" />
    <div class="flex">
      <div class="row mb-5 mt-5 ml-1 items-center">
        <div
          class="col-1 w-14 h-12 bg-black rounded-lg flex items-center justify-center cursor-pointer"
          @click="addStop"
        >
          <Icon icon="add" color="white" class="w-6 h-6" />
        </div>
        <span class="col text-b-4 font-medium">
          Add Segment
        </span>
      </div>
      <div class="row mb-5 mt-5 ml-5 items-center">
        <div
          class="col-1 w-14 h-12 bg-black rounded-lg flex items-center justify-center cursor-pointer"
          @click="addStop"
        >
          <Icon icon="check" color="white" class="w-6 h-6" />
        </div>
        <span class="col text-b-4 font-medium">
          Split Load
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
      addSegmentArray: [],
      shipperNameOptions: [
      ],
      loadOptions: [
      ],
      trailerRequiredOptions: [
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
        { id: 9, text: '40\' Container' }
      ],
      load: {
        loadId: '',
        shipperName: '',
        loadTrip: '',
        totalRevenue: '',
        maxBuy: '',
        maxBuyNow: '',
        totalDistance: '',
        trailerRequired: 0,
        carrierName: '',
        equipment: '',
        stops: [],
        saved: false
      }
    }
  },
  methods: {
    saveLoad () {
      this.load.saved = true
    },
    addStop () {
      this.addSegmentArray.push({ })
    },
    saveStop (stop:any) {
      this.load.stops.push(stop)
    }
  }
})
</script>
