<template>
  <div>
    <div class="flex flex-row -mr-4 md:-mr-12 max-h-screen relative overflow-hidden">
      <div class="tw-col-96 pr-2 h-full ops">
        <PageHeader title="Map" />
        <widget :no-border="true" :no-shadow="true" class="" :is-h-full="true">
          <div class="head sticky pt-2.5 -top-4 block bg-white z-10">
            <Input
              v-model="searchTerm"
              name="search"
              class="mr-2 w-full"
              type="text"
              @on-input="()=> {}"
            >
              <template slot="addonLeft">
                <Icon
                  icon="search-normal"
                  variant="linear"
                  color="gray"
                  :alpha="400"
                  class="w-5 h-5 ml-4"
                  :disable-fill="true"
                />
              </template>
            </Input>
            <div class="flex flex-wrap mb-4">
              <div
                v-for="(filter, index) in filterModels"
                :key="index"
                :class="`col-${filter.colSpan} px-1 mb-2`"
              >
                <Input
                  v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                  v-model="vfilter[filter.modelName]"
                  :name="filter.modelName"
                  :type="filter.inputType === 'input' ? 'text' : 'date'"
                  :placeholder="filter.filterName"
                />
                <m-select
                  v-else
                  v-model="vfilter[filter.modelName]"
                  :options="filter.options"
                  :name="filter.filterName"
                  :horizontal="filter.multiple !== undefined && filter.multiple"
                  :placeholder="filter.filterName"
                  :bind-text="true"
                  :is-nullable="true"
                />
              </div>
            </div>
          </div>
          <div class="relative">
            <div v-for="(data, index) in vehicleStatusRecords" :key="index">
              <EldOperationalMapCard :data="data" />
            </div>
          </div>
          <Pagination
            :request-function="getVehicleStatus"
            :page-count="vehicleStatusRecordsPageCount"
            :filtering-model="vfilter"
            :request-callback="delayedMapInitialization"
          />
        </widget>
      </div>
      <div class="tw-col">
        <div id="op-map" class="min-h-screen h-full" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { Map, NavigationControl, Popup, Marker } from 'maplibre-gl'
import { VehiclesStatusDetails } from '~/models/eld/vehiclesStatus/vehiclesStatusDetails'
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
      showMap: false,
      searchTerm: '',
      vfilter: {} as { [key: string]: unknown },
      filterModels: [
        {
          modelName: 'vehicle_id',
          filterName: 'Unit No',
          inputType: 'input',
          colSpan: 4,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        },
        {
          modelName: 'driver_name',
          filterName: 'Driver',
          inputType: 'input',
          colSpan: 4,
          multiple: true,
          tabShown: 0,
          options: [
            { id: 1, text: 'Option 1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3' }
          ]
        }
      ]
    }
  },
  computed: {
    // Vehicle Status
    vehicleStatusRecords (): VehiclesStatusDetails {
      return (this.$store.getters['eld/vehicleStatus/carrierRecords'])
    },
    vehicleStatusRecordsPageCount () {
      return (this.$store.getters['eld/vehicleStatus/pageCount'])
    }
  },
  // watch: {
  //   vehicleStatusRecordsPageCount: {
  //     handler (newValue, oldValue) {
  //       if (newValue !== oldValue) {
  //         setTimeout(() => {
  //           this.initializeMap()
  //         }, 100)
  //       }
  //     },
  //     deep: true
  //   }
  // },
  // mounted () {
  //   setTimeout(() => {

  //   }, 100)
  // },
  methods: {
    ...mapActions({
      // Vehicle Status
      getVehicleStatus: (action, page) => action('eld/vehicleStatus/getRecordsByCarrierId', page)
    }),
    initializeMap () {
      const apiKey = 'v1.public.eyJqdGkiOiJhZTQ3NTEyYy0zOTY0LTRhZjgtYmYyYi04NDE5MTMyODRiMGIifRT-ifes2gm6lEqKp5ca-kF2mrwgxr7pIqjSQMyEh7s85gK9b4XQQ73-Eecn-rRxDDxvauIVDOzJs7afA0o41k7JzrZ8d_Z1bNdqsDKDWptTrkge5UhTxUiNprjlL3MMt4tx6mKdmDZhpPJb5Y4uAQTuFWpg2bAADCwU3ze482Ew61tLz-_UgA9yxUxPg_9isvRCroG7s1iMLufHCPenRxo7BkwaZwBkif8tMdOi3FlBO-2XFp08-WW-Q5enCTQv7xEKyLn2WfLGgQbqbI_NsQqDQXjAn3kvjEVRsndOG8oWpXEFFDlTYPU2vcPTGNmu2i4wMffgJRGXW3Ut3cLzd8A.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx'
      const region = 'us-east-1'
      const mapName = 'NebulaGTS-TMS-Map'
      const styleUrl = `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`
      const map = new Map({
        container: 'op-map',
        style: styleUrl,
        center: [-100.1187, 39.2819],
        zoom: 4
      })
      map.addControl(new NavigationControl({}), 'top-left')
      for (let index = 0; index < this.vehicleStatusRecords.length; index++) {
        const long = this.vehicleStatusRecords[index].current_location_lat
        const lat = this.vehicleStatusRecords[index].current_location_long
        console.log(lat)
        console.log(long)
        console.log(this.vehicleStatusRecords.length)
        const popUp = new Popup().setHTML('<div class="w-full h-full flex"><div class="row"><div class="col-auto border-r border-gray-300"><div class="text-b-4 font-bold">' + this.vehicleStatusRecords[index].vehicle_id + '</div><div class="text-c-2 text-gray-400">Truck Unit Number</div><div class="flex mb-8 mt-4"><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-bold">' + this.vehicleStatusRecords[index].load_origin + '</span><span class="text-gray text-c-2">Origin</span></div><div class="mx-2"><img src="/images/arrow-right.png" alt="arrow-right" class="w-5 h-5"></div><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-bold">' + this.vehicleStatusRecords[index].load_destination + '</span><span class="text-gray text-c-2">Destination</span></div></div><div class="flex items-center"><span class="ripple-circle w-1 h-1 bg-lime"></span><span class="ml-[10px] text-c-2 text-gray-800 font-bold">' + this.vehicleStatusRecords[index].vehicle_location + '<span class="text-gray"> (Live)</span></span></div></div><div class="col-auto mr-6 pr-2"><div class="flex mb-4"><svg data-v-f89ea79c="" viewBox="0 0 1024 1024" variant="bulk" alpha="300" class="w-6 h-6"><path fill="#858BA4" d="M503.040 606.293l-139.52 139.52c-15.36-13.653-30.293-27.733-44.8-42.24-43.947-44.373-83.627-90.88-119.040-139.52-34.987-48.64-63.147-97.28-83.627-145.493-20.48-48.64-30.72-95.147-30.72-139.52 0-29.013 5.12-56.747 15.36-82.347 10.24-26.027 26.453-49.92 49.067-71.253 27.307-26.88 57.173-40.107 88.747-40.107 11.947 0 23.893 2.56 34.56 7.68 11.093 5.12 20.907 12.8 28.587 23.893l98.987 139.52c7.68 10.667 13.227 20.48 17.067 29.867 3.84 8.96 5.973 17.92 5.973 26.027 0 10.24-2.987 20.48-8.96 30.293-5.547 9.813-13.653 20.053-23.893 30.293l-32.427 33.707c-4.693 4.693-6.827 10.24-6.827 17.067 0 3.413 0.427 6.4 1.28 9.813 1.28 3.413 2.56 5.973 3.413 8.533 7.68 14.080 20.907 32.427 39.68 54.613 19.2 22.187 39.68 44.8 61.867 67.413 15.36 14.933 30.293 29.44 45.227 42.24z" opacity="0.4" class="pointer-events-none"></path><path fill="#858BA4" d="M937.37 782.080c0 11.947-2.133 24.32-6.4 36.267-1.28 3.413-2.56 6.827-4.267 10.24-7.253 15.36-16.64 29.867-29.013 43.52-20.907 23.040-43.947 39.68-69.973 50.347-0.427 0-0.853 0.427-1.28 0.427-25.173 10.24-52.48 15.787-81.92 15.787-43.52 0-90.027-10.24-139.093-31.147s-98.133-49.067-146.773-84.48c-16.64-12.373-33.28-24.747-49.066-37.973l139.52-139.52c11.947 8.96 22.613 15.787 31.573 20.48 2.133 0.853 4.693 2.133 7.68 3.413 3.413 1.28 6.827 1.707 10.667 1.707 7.253 0 12.8-2.56 17.493-7.253l32.427-32c10.667-10.667 20.907-18.773 30.72-23.893 9.813-5.973 19.627-8.96 30.293-8.96 8.107 0 16.64 1.707 26.027 5.547s19.2 9.387 29.867 16.64l141.227 100.267c11.093 7.68 18.773 16.64 23.467 27.307 4.267 10.667 6.827 21.333 6.827 33.28z" class="pointer-events-none"></path> <!----></svg><div class="flex flex-col ml-2"><span class="text-gray-800 text-c-1"><span class="font-bold">' + this.vehicleStatusRecords[index].driver_name + '</span></span><span class="text-gray text-c-2">Primary Driver</span></div></div><div class="flex mb-4"><svg data-v-f89ea79c="" viewBox="0 0 1024 1024" variant="bulk" alpha="300" class="w-6 h-6"><path fill="#858BA4" d="M503.040 606.293l-139.52 139.52c-15.36-13.653-30.293-27.733-44.8-42.24-43.947-44.373-83.627-90.88-119.040-139.52-34.987-48.64-63.147-97.28-83.627-145.493-20.48-48.64-30.72-95.147-30.72-139.52 0-29.013 5.12-56.747 15.36-82.347 10.24-26.027 26.453-49.92 49.067-71.253 27.307-26.88 57.173-40.107 88.747-40.107 11.947 0 23.893 2.56 34.56 7.68 11.093 5.12 20.907 12.8 28.587 23.893l98.987 139.52c7.68 10.667 13.227 20.48 17.067 29.867 3.84 8.96 5.973 17.92 5.973 26.027 0 10.24-2.987 20.48-8.96 30.293-5.547 9.813-13.653 20.053-23.893 30.293l-32.427 33.707c-4.693 4.693-6.827 10.24-6.827 17.067 0 3.413 0.427 6.4 1.28 9.813 1.28 3.413 2.56 5.973 3.413 8.533 7.68 14.080 20.907 32.427 39.68 54.613 19.2 22.187 39.68 44.8 61.867 67.413 15.36 14.933 30.293 29.44 45.227 42.24z" opacity="0.4" class="pointer-events-none"></path><path fill="#858BA4" d="M937.37 782.080c0 11.947-2.133 24.32-6.4 36.267-1.28 3.413-2.56 6.827-4.267 10.24-7.253 15.36-16.64 29.867-29.013 43.52-20.907 23.040-43.947 39.68-69.973 50.347-0.427 0-0.853 0.427-1.28 0.427-25.173 10.24-52.48 15.787-81.92 15.787-43.52 0-90.027-10.24-139.093-31.147s-98.133-49.067-146.773-84.48c-16.64-12.373-33.28-24.747-49.066-37.973l139.52-139.52c11.947 8.96 22.613 15.787 31.573 20.48 2.133 0.853 4.693 2.133 7.68 3.413 3.413 1.28 6.827 1.707 10.667 1.707 7.253 0 12.8-2.56 17.493-7.253l32.427-32c10.667-10.667 20.907-18.773 30.72-23.893 9.813-5.973 19.627-8.96 30.293-8.96 8.107 0 16.64 1.707 26.027 5.547s19.2 9.387 29.867 16.64l141.227 100.267c11.093 7.68 18.773 16.64 23.467 27.307 4.267 10.667 6.827 21.333 6.827 33.28z" class="pointer-events-none"></path> <!----></svg><div class="flex flex-col ml-2"><span class="text-gray-800 text-c-1"><span class="font-bold">' + this.vehicleStatusRecords[index].co_driver_name + '</span></span><span class="text-gray text-c-2">Secondary Driver</span></div></div></div></div></div>')
        const el = document.createElement('div')
        el.className = 'marker'

        el.innerText = this.vehicleStatusRecords[index].vehicle_id

        el.addEventListener('click', function () {
          console.log(popUp)
          const tesa = document.getElementsByClassName('marker')
          for (let index = 0; index < tesa.length; index++) {
            const element = tesa[index]
            element.classList.remove('active')
          }
          el.classList.toggle('active')
        })
        new Marker(el)
          .setLngLat([lat, long])
          .addTo(map)
          .setPopup(popUp)
      }
    },
    delayedMapInitialization (): void {
      setTimeout(() => {
        this.initializeMap()
      }, 100)
    }
  }
})
</script>

<style scoped>
.maplibregl-popup{
  padding: 1rem;
  display: flex;
  background-color: white;
  border-radius: 0.5rem;
  width: 200px !important;
  height: 800px !important;
  max-width: unset !important;
}

</style>
<style>
.ops .card.widget .card-body {
    height: 89vh;
    overflow-y: scroll;
    position: relative;
}
</style>
