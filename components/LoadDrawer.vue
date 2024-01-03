<template>
  <Drawer ref="drawer" :no-padding="true">
    <div class="w-full h-full relative">
      <Button
        class="
          !w-8
          !h-8
          !rounded-full
          absolute
          top-8
          left-9
          !bg-white
        "
        @click="hideDrawer()"
      >
        <Icon
          icon="arrow-left"
          color="black"
          class="w-5 h-5 transition-all"
        />
      </Button>
      <div id="drawer-map" class="h-[50vh]" />
      <div :key="key">
        <TabManager :tab-names="tabNames" :pre-selected-tab="preSelectedTab" theme="minimal">
          <template #overview>
            <Overview :id="id" :load-data="loadData" />
          </template>
          <template #driver_information>
            <DriverInfo :id="id" />
          </template>
          <template #message>
            <Messages />
          </template>
        </TabManager>
      </div>
    </div>
  </Drawer>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Map, NavigationControl } from 'maplibre-gl'
import Messages from './load-drawer/Messages.vue'
import { ActionTypeEnum, ButtonTypeEnum } from './ts/enums'
import Overview from './load-drawer/Overview.vue'
import DriverInfo from './load-drawer/DriverInfo.vue'
import { LoadDetails } from '~/models/DISPATCH/load/loadDetails'

export default Vue.extend({
  name: 'LoadDrawer',
  components: {
    Overview,
    Messages,
    DriverInfo
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    loadData: {
      type: Object,
      default: null
    } as PropOptions<LoadDetails>
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      preSelectedTab: null,
      key: 0,
      tabNames: [
        'Overview',
        'Notes',
        'Message'
      ]
    }
  },
  mounted () {
    // const mapScript = document.createElement('script')
    // mapScript.setAttribute('src', 'https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.js')
    // document.body.appendChild(mapScript)
  },
  methods: {
    showDrawer (tabId:number | string | null):void {
      if (tabId !== null && tabId !== undefined && tabId !== '') {
        this.preSelectedTab = tabId
      } else {
        this.preSelectedTab = 0
      }
      this.$refs.drawer.showDrawer()
      setTimeout(() => {
        this.initializeMap()
      }, 100)
    },
    hideDrawer ():void {
      this.$refs.drawer.hideDrawer()
    },
    initializeMap () {
      const apiKey = 'v1.public.eyJqdGkiOiJhZTQ3NTEyYy0zOTY0LTRhZjgtYmYyYi04NDE5MTMyODRiMGIifRT-ifes2gm6lEqKp5ca-kF2mrwgxr7pIqjSQMyEh7s85gK9b4XQQ73-Eecn-rRxDDxvauIVDOzJs7afA0o41k7JzrZ8d_Z1bNdqsDKDWptTrkge5UhTxUiNprjlL3MMt4tx6mKdmDZhpPJb5Y4uAQTuFWpg2bAADCwU3ze482Ew61tLz-_UgA9yxUxPg_9isvRCroG7s1iMLufHCPenRxo7BkwaZwBkif8tMdOi3FlBO-2XFp08-WW-Q5enCTQv7xEKyLn2WfLGgQbqbI_NsQqDQXjAn3kvjEVRsndOG8oWpXEFFDlTYPU2vcPTGNmu2i4wMffgJRGXW3Ut3cLzd8A.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx'
      const region = 'us-east-1'
      const mapName = 'NebulaGTS-TMS-Map'
      const styleUrl = `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`
      const map = new Map({
        container: 'drawer-map',
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
</style>
