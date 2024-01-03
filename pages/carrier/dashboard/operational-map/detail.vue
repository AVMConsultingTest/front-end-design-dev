<template>
  <div class="w-full">
    <PageHeader title="Operational Map" :no-border="true" class="mb-0">
      <template #actions>
        <div class="col-auto ml-auto hidden justify-around items-center">
          <div
            class="
            icon-con
            w-12
            h-12
            min-w-[3rem]
            min-h-[3rem]
            rounded-lg
            border border-gray-200
            hover:bg-gray-100
            transition-all
            flex
            items-center
            justify-center
            cursor-pointer
            mr-2
          "
          >
            <Icon
              icon="calendar"
              variant="linear"
              color="gray"
              :alpha="400"
              class="w-5 h-5"
              :disable-fill="true"
            />
          </div>
          <div
            class="
            icon-con
            w-12
            h-12
            min-w-[3rem]
            min-h-[3rem]
            rounded-lg
            border border-gray-200
            hover:bg-gray-100
            transition-all
            flex
            items-center
            justify-center
            cursor-pointer
            mr-2
          "
          >
            <Icon
              icon="search-normal"
              variant="linear"
              color="gray"
              :alpha="400"
              class="w-5 h-5"
              :disable-fill="true"
            />
          </div>
          <Button class="px-9 h-12 max-h-12" :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.MD" :action="ActionTypeEnum.BUTTON">
            Edit Load
          </Button>
        </div>
      </template>
    </PageHeader>
    <div class="border border-gray-300/50 bg-gray-300/20 -mx-12 px-6 pb-8">
      <span class="text-black text-c-1 py-6 font-medium flex items-center cursor-pointer dark:text-white">
        Load Details
      </span>
      <div class="flex justify-between">
        <div class="flex">
          <InfoBox
            value="BL-09362"
            title="Load ID"
            icon="box"
            :with-bg="true"
            color="dark-blue"
            :alpha="0"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="Intel Corporate"
            title="Customer"
            custom-icon-src="/images/Intel.png"
            :with-bg="true"
            color="dark-blue"
            :alpha="0"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="$ 2,500"
            title="Revenue"
            icon="wallet"
            :with-bg="true"
            color="green"
            :alpha="800"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="$ 2,200"
            title="Max Buy"
            icon="money-send"
            :with-bg="true"
            color="green"
            :alpha="800"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="$ 2,100"
            title="Payout"
            icon="moneys"
            :with-bg="true"
            color="green"
            :alpha="800"
            :fontweight="600"
            class="mr-12"
          />
          <InfoBox
            value="$ 2,100"
            title="Cost"
            icon="money-recive"
            :with-bg="true"
            color="red"
            :alpha="0"
            :fontweight="600"
            class="mr-12"
          />
        </div>
        <div>
          <m-select
            :multiple="false"
            :options="loadOptions"
            :addable="true"
            name="loadOptions"
            wrapper-class="!text-c-1 pl-2 pr-16"
          />
        </div>
      </div>
    </div>
    <div id="map" class="-mx-12" />
    <div class="load-cards">
      <TabManager class="mt-10" :tab-names="tabNames" color="sky">
        <template #overview>
          <LoadOverview />
        </template>
        <template #details>
          <LoadDetails />
        </template>
        <template #messages>
          <LoadMessages />
        </template>
        <template #notes>
          <LoadNotes />
        </template>
        <template #documents>
          <LoadDocuments />
        </template>
      </TabManager>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import USA from '@svg-maps/usa'
import { Map, NavigationControl } from 'maplibre-gl'
import LoadOverview from './-overview.vue'
import LoadDocuments from './-documents.vue'
import LoadDetails from './-details.vue'
import LoadMessages from './-messages.vue'
import LoadNotes from './-notes.vue'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
export default Vue.extend({
  name: 'LoadTransit',
  components: {
    LoadOverview,
    LoadDocuments,
    LoadDetails,
    LoadMessages,
    LoadNotes
  },
  layout: 'Dashboard',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      USA,
      tabNames: ['Overview', 'Details', 'Messages', 'Notes', 'Documents'],
      loadOptions: [
        {
          id: 'In-Transit',
          text: 'In-Transit',
          selected: true,
          icon: { name: 'map-1', variant: 'bulk', color: 'orange' }
        },
        {
          id: 'In-Transit',
          text: 'In-Transit',
          selected: false,
          icon: { name: 'map-1', variant: 'bulk', color: 'orange' }
        },
        {
          id: 'In-Transit',
          text: 'In-Transit',
          selected: false,
          icon: { name: 'map-1', variant: 'bulk' }
        }
      ] as SelectOption[],
      mode: 'list'
    }
  },
  mounted () {
    const mapScript = document.createElement('script')
    mapScript.setAttribute('src', 'https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.js')
    document.body.appendChild(mapScript)
    this.initializeMap()
  },
  methods: {
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    },
    initializeMap () {
      const apiKey = 'v1.public.eyJqdGkiOiJhZTQ3NTEyYy0zOTY0LTRhZjgtYmYyYi04NDE5MTMyODRiMGIifRT-ifes2gm6lEqKp5ca-kF2mrwgxr7pIqjSQMyEh7s85gK9b4XQQ73-Eecn-rRxDDxvauIVDOzJs7afA0o41k7JzrZ8d_Z1bNdqsDKDWptTrkge5UhTxUiNprjlL3MMt4tx6mKdmDZhpPJb5Y4uAQTuFWpg2bAADCwU3ze482Ew61tLz-_UgA9yxUxPg_9isvRCroG7s1iMLufHCPenRxo7BkwaZwBkif8tMdOi3FlBO-2XFp08-WW-Q5enCTQv7xEKyLn2WfLGgQbqbI_NsQqDQXjAn3kvjEVRsndOG8oWpXEFFDlTYPU2vcPTGNmu2i4wMffgJRGXW3Ut3cLzd8A.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx'
      const region = 'us-east-1'
      const mapName = 'NebulaGTS-TMS-Map'
      const styleUrl = `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`
      const map = new Map({
        container: 'map',
        style: styleUrl,
        center: [-100.1187, 39.2819],
        zoom: 4
      })
      map.addControl(new NavigationControl({}), 'top-left')
    }
  }
})
</script>

  <style scoped>
    .filter-tabs .filter-tab {
      @apply mx-2 my-1 px-1 py-[6px] flex items-center cursor-pointer rounded-md;
    }
    .view-mode {
     @apply  flex items-center gap-2 bg-white rounded-lg w-full p-1 border border-gray-300;
    }
    .view-mode .mode {
      @apply w-11 h-8 flex items-center justify-center cursor-pointer z-10;
    }
    #map { height: 500px; }

  </style>
