<template>
  <div class="w-full">
    <PageHeader title="Operational Map" class="mb-10">
      <template #actions />
    </PageHeader>
    <div class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg p-3 mb-8 filter-drops">
      <div class="row items-center w-full ">
        <div class="col-2">
          <m-select
            v-model="selectedFilter"
            wrapper-class="bg-white"
            drop-icon="sort"
            name="Filter"
            placeholder="Filters"
            :options="filters"
          />
        </div>
        <div class="col-3">
          <m-select
            v-model="selectedFilter"
            wrapper-class="bg-white"
            name="Filter"
            placeholder="Filters"
            :options="filters"
          />
        </div>
      </div>
      <div class="flex mb-4 mt-6">
        <div class="col-9">
          <div class="flex flex-wrap">
            <div v-for="(filter, index) in filterModels" :key="index" :class="`col-${filter.colSpan} px-1 mb-2`">
              <Input
                v-if="filter.inputType === 'input' || filter.inputType === 'date'"
                :type="filter.inputType === 'input' ? 'text' : 'date'"
                :placeholder="filter.filterName"
              />
              <m-select
                v-else
                :name="filter.filterName"
                :placeholder="filter.filterName"
                :bind-text="true"
                :is-nullable="true"
              />
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="flex items-end h-full">
            <Button
              class="flex flex-1 !bg-transparent text-gray col-6 mr-12 !justify-end"
              :type="ButtonTypeEnum.PRIMARY"
              :action="ActionTypeEnum.BUTTON"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div id="map" />

    <div class="flex items-baseline">
      <h1 class="text-b-1 font-semibold mt-16 mb-4">
        All Loads
      </h1>
      <div class="ml-auto w-[6.5rem]">
        <div class="view-mode relative">
          <div class="mode" @click="mode = 'grid'">
            <Icon
              variant="linear"
              :color="mode === 'grid' ? 'white' : 'gray'"
              :alpha="mode === 'grid' ? 0 : 400"
              :disable-fill="true"
              icon="pause"
              class="w-5 h-5 rotate-90"
            />
          </div>
          <div class="mode" @click="mode = 'list'">
            <Icon
              variant="linear"
              :color="mode === 'list' ? 'white' : 'gray'"
              :alpha="mode === 'list' ? 0 : 400"
              :disable-fill="true"
              icon="textalign-justifycenter"
              class="w-5 h-5"
            />
          </div>
          <div
            class="select-backdrop absolute top-1 left-1 w-10 h-8 z-0 bg-dark-blue rounded-lg transition-all"
            :class="[{ 'translate-x-12': mode === 'list' }]"
          />
        </div>
      </div>
    </div>
    <div
      v-if="mode === 'grid'"
      class="border border-gray-300/50 bg-gray-300/20 w-full rounded-lg flex flex-row mb-4 filter-tabs"
    >
      <div
        class="filter-tab "
        :class="[{ 'bg-white shadow-md shadow-black/10': activeFilter === 'all' }]"
        @click="(filterableLoads = loads)"
      >
        <span class="mx-1 text-xs text-tuna font-medium">
          All
        </span>
      </div>
      <div
        class="filter-tab"
        :class="[{ 'bg-white shadow-md shadow-black/10': activeFilter === 'assigned' }]"
        @click="filterLoads('assigned')"
      >
        <span class="mx-1 text-xs text-tuna font-medium">
          ASSIGNED
        </span>
      </div>
      <div
        class="filter-tab"
        :class="[{ 'bg-white shadow-md shadow-black/10': activeFilter === 'in-transit' }]"
        @click="filterLoads('in-transit')"
      >
        <span class="mx-1 text-xs text-tuna font-medium">
          IN-TRANSIT
        </span>
      </div>
      <div
        class="filter-tab"
        :class="[{ 'bg-white shadow-md shadow-black/10': activeFilter === 'completed' }]"
        @click="filterLoads('completed')"
      >
        <span class="mx-1 text-xs text-tuna font-medium">
          COMPLETED
        </span>
      </div>
    </div>
    <div class="load-cards mb-10">
      <transition-group name="fade" mode="in-out">
        <div v-if="mode === 'grid'" key="grid" class="w-100">
          <div v-for="(load, index) in filterableLoads" :key="index" class="load mb-5">
            <MapCard :link-id="index" :data="load" />
          </div>
        </div>
        <div v-if="mode === 'list'" key="list">
          <div v-for="(item, index) in loads" :key="index" class="my-2">
            <MapCardDetails :data="item" />
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import USA from '@svg-maps/usa'
import { Map, NavigationControl, Popup, Marker } from 'maplibre-gl'
import loads from '@/static/loads'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { LoadDetailsState } from '~/store/loads'
export default Vue.extend({
  name: '',
  layout: 'Dashboard',
  data () {
    return {
      searchTerm: '',
      USA,
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      request: {} as LoadDetailsState,
      loads,
      activeFilter: 'all',
      filterableLoads: loads,
      filterModels: [
        {
          modelName: 'Equipment Type',
          filterName: 'Equipment Type',
          inputType: 'input',
          colSpan: 3
        },
        {
          modelName: 'Pickup',
          filterName: 'Pickup',
          inputType: 'input',
          colSpan: 2
        },
        {
          modelName: 'Delivery',
          filterName: 'Delivery',
          inputType: 'input',
          colSpan: 2
        },
        {
          modelName: 'Shipper Name',
          filterName: 'Shipper Name',
          inputType: 'input',
          colSpan: 3
        },
        {
          modelName: 'Origin',
          filterName: 'Origin',
          inputType: 'input',
          colSpan: 3
        },
        {
          modelName: 'Destination',
          filterName: 'Destination',
          inputType: 'input',
          colSpan: 3
        }
      ],
      headers: {
        icon: '',
        broker_id: {
          label: 'Load ID',
          searchable: true
        },
        load_status: {
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
        load_origin: {
          label: 'Origin',
          searchable: true
        },
        load_destination: {
          label: 'Destination',
          searchable: true
        },
        load_pickup_date: {
          label: 'Pickup Date',
          searchable: true
        },
        load_delivery_date: {
          label: 'Delivery Date',
          searchable: true
        },
        load_rate_per_mile: {
          label: 'Rate/Mile',
          searchable: true
        },
        load_revenue: {
          label: 'Revenue',
          searchable: true
        },
        load_miles: {
          label: 'Miles',
          searchable: true
        },
        equipment_type: {
          label: 'Equipment',
          searchable: true
        },
        equipment_weight: {
          label: 'Weight',
          searchable: true
        },
        broker_contact_name: {
          label: 'Broker',
          searchable: true
        },
        actions: ''
      },
      filters: [
        { id: 1, text: 'Filter 1', selected: true },
        { id: 2, text: 'Filter 2', selected: false },
        { id: 3, text: 'Filter 3', selected: false },
        { id: 4, text: 'Filter 4', selected: false }
      ] as SelectOption[],
      selectedFilter: '',
      mode: 'grid'
    }
  },
  computed: {
    loads () {
      return this.$store.getters['loads/loads']
    },
    loadPageCount () {
      return this.$store.getters['loads/pageCount']
    },
    extendedItems (): any[] {
      return this.$refs.table.getExtendedItems()
    }
  },
  created () {
    this.getLoads(1)
  },
  mounted () {
    const mapScript = document.createElement('script')
    mapScript.setAttribute('src', 'https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.js')
    document.body.appendChild(mapScript)
    this.initializeMap()
  },
  methods: {
    ...mapActions({
      getLoads: (action, page) => action('loads/getLoads', page),
      dummyData: (action, page) => action('loads/getLoads', page)

    }),
    filterLoads (filter: string): void {
      this.activeFilter = filter
      this.filterableLoads = this.loads.filter((w: any) => w.load_status.toLowerCase() === filter)
    },
    removeFilter (): void {
      this.activeFilter = 'all'
      this.filterableLoads = this.loads
    },
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    },
    extendItem (item: any): void {
      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
      }
    },
    initializeMap () {
      const apiKey = 'v1.public.eyJqdGkiOiJhZTQ3NTEyYy0zOTY0LTRhZjgtYmYyYi04NDE5MTMyODRiMGIifRT-ifes2gm6lEqKp5ca-kF2mrwgxr7pIqjSQMyEh7s85gK9b4XQQ73-Eecn-rRxDDxvauIVDOzJs7afA0o41k7JzrZ8d_Z1bNdqsDKDWptTrkge5UhTxUiNprjlL3MMt4tx6mKdmDZhpPJb5Y4uAQTuFWpg2bAADCwU3ze482Ew61tLz-_UgA9yxUxPg_9isvRCroG7s1iMLufHCPenRxo7BkwaZwBkif8tMdOi3FlBO-2XFp08-WW-Q5enCTQv7xEKyLn2WfLGgQbqbI_NsQqDQXjAn3kvjEVRsndOG8oWpXEFFDlTYPU2vcPTGNmu2i4wMffgJRGXW3Ut3cLzd8A.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx'
      const region = 'us-east-1'
      const mapName = 'NebulaGTS-TMS-Map'
      const styleUrl = `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`
      const map = new Map({
        container: 'map',
        style: styleUrl,
        center: [-98, 38.5],
        zoom: 3.5
      })
      map.addControl(new NavigationControl({}), 'top-left')
      const testJson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              description:
                '<div class="w-full flex" style="font-family: Euclid Circular A, sans-serif;"><div class="col-6 border-r border-gray-300 pr-16"><div><div class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] mr-2 relative"><img src="/images/amazon-black.png" alt="carrier" class="w-full h-full rounded-full"><img src="/images/usa.png" alt="country" class="w-3 h-3 rounded-full absolute right-0 bottom-0"></div><div class="flex flex-col mb-4"><span class="text-gray-800 text-c-1 font-medium">Amazon Carrier</span><span class="text-gray text-c-2 font-medium">GSM: +19378029984</span></div><div class="flex mb-4"><div class="col-6 flex flex-col"><span class="text-tuna text-c-2 font-medium">1234566</span><span class="text-gray text-c-2 font-medium">Truck ID</span></div><div class="col-6 flex flex-col"><span class="text-tuna text-c-2 font-medium">551142</span><span class="text-gray text-c-2 font-medium">Trailer ID</span></div></div><div class="flex items-center"><span class="ripple-circle w-1 h-1 bg-lime"></span><span class="ml-[10px] text-c-2 font-medium text-gray-800">California<span class="text-gray"> (Live)</span></span></div></div></div><div class="col-6 pl-4 pt-5 pr-3"><div class="flex mb-8"><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-medium">Istanbul</span><span class="text-gray text-c-2 font-medium">From</span></div><div class="mx-2"><img src="/images/arrow-right.png" alt="arrow-right" class="w-5 h-5"></div><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-medium">California</span><span class="text-gray text-c-2 font-medium">To</span></div></div><div class="flex mb-4"><img src="/images/clock.png" alt="clock" class="w-5 h-5 mr-2"><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-medium">10/21 <span class="font-bold">13:29 (ETA)</span></span><span class="text-gray text-c-2 font-medium">10/20 12:30 (Scheduled)</span></div></div><div class="flex"><img src="/images/calendar-2.png" alt="calendar" class="w-5 h-5 mr-2"><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-medium">10h 29m 0s</span><span class="text-gray text-c-2 font-medium">Late to stop</span></div></div></div></div>',
              iconSize: [50, 50]
            },
            geometry: {
              type: 'Point',
              coordinates: [-98, 38.5]
            }
          },
          {
            type: 'Feature',
            properties: {
              description:
                '<div class="w-full flex" style="font-family: Euclid Circular A, sans-serif;"><div class="col-6 border-r border-gray-300 pr-16"><div><div class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] mr-2 relative"><img src="/images/amazon-black.png" alt="carrier" class="w-full h-full rounded-full"><img src="/images/usa.png" alt="country" class="w-3 h-3 rounded-full absolute right-0 bottom-0"></div><div class="flex flex-col mb-4"><span class="text-gray-800 text-c-1 font-medium">Amazon Carrier</span><span class="text-gray text-c-2 font-medium">GSM: +19378029984</span></div><div class="flex mb-4"><div class="col-6 flex flex-col"><span class="text-tuna text-c-2 font-medium">1234566</span><span class="text-gray text-c-2 font-medium">Truck ID</span></div><div class="col-6 flex flex-col"><span class="text-tuna text-c-2 font-medium">551142</span><span class="text-gray text-c-2 font-medium">Trailer ID</span></div></div><div class="flex items-center"><span class="ripple-circle w-1 h-1 bg-lime"></span><span class="ml-[10px] text-c-2 font-medium text-gray-800">California<span class="text-gray"> (Live)</span></span></div></div></div><div class="col-6 pl-4 pt-5 pr-3"><div class="flex mb-8"><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-medium">Istanbul</span><span class="text-gray text-c-2 font-medium">From</span></div><div class="mx-2"><img src="/images/arrow-right.png" alt="arrow-right" class="w-5 h-5"></div><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-medium">California</span><span class="text-gray text-c-2 font-medium">To</span></div></div><div class="flex mb-4"><img src="/images/clock.png" alt="clock" class="w-5 h-5 mr-2"><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-medium">10/21 <span class="font-bold">13:29 (ETA)</span></span><span class="text-gray text-c-2 font-medium">10/20 12:30 (Scheduled)</span></div></div><div class="flex"><img src="/images/calendar-2.png" alt="calendar" class="w-5 h-5 mr-2"><div class="flex flex-col"><span class="text-gray-800 text-c-1 font-medium">10h 29m 0s</span><span class="text-gray text-c-2 font-medium">Late to stop</span></div></div></div></div>',
              iconSize: [50, 50]
            },
            geometry: {
              type: 'Point',
              coordinates: [-77.020945, 38.878241]
            }
          }
        ]
      }
      map.on('load', function () {
        // map.addSource('drivers', testJson)
        // map.addLayer({
        //   id: 'drivers',
        //   type: 'symbol',
        //   source: 'drivers',
        //   layout: {
        //     'icon-image': '{icon}_15',
        //     'icon-overlap': 'always'
        //   }
        // })

        // map.on('click', 'drivers', function (e: any) {
        //   console.log(e)
        //   const coordinates = e.features[0].geometry.coordinates.slice()
        //   const description = e.features[0].properties.description

        //   // Ensure that if the map is zoomed out such that multiple
        //   // copies of the feature are visible, the popup appears
        //   // over the copy being pointed to.
        //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        //   }

        //   new Popup()
        //     .setLngLat(coordinates)
        //     .setHTML(description)
        //     .addTo(map)
        // })
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'drivers', function () {
          map.getCanvas().style.cursor = 'pointer'
        })

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'drivers', function () {
          map.getCanvas().style.cursor = ''
        })

        // add markers to map
        testJson?.features.forEach(function (marker: any, index: number) {
          // create a DOM element for the marker
          const el = document.createElement('div')
          el.className = 'marker'
          const popUp = new Popup({ offset: 25, closeButton: false, maxWidth: '400px' })
            .setHTML(marker.properties.description)
          popUp.addClassName('rounded-lg')

          // el.style.backgroundImage =
          //   'url(https://placekitten.com/g/' +
          //   marker.properties.iconSize.join('/') +
          //   '/)'
          // el.style.width = marker.properties.iconSize[0] + 'px'
          // el.style.height = marker.properties.iconSize[1] + 'px'

          el.innerText = index.toString()

          el.addEventListener('click', function () {
            console.log(popUp)
            if (!popUp.isOpen()) {
              el.classList.remove('active')
            } else {
              el.classList.add('active')
            }
          })

          // add marker to map
          new Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(popUp)
            .addTo(map)
        })
      })
      // new Popup({ closeOnClick: false })
      //   .setLngLat([-96, 37.8])
      //   .setHTML('<h3>Hello World!</h3>')
      //   .addTo(map)

      // new Marker()
      //   .setLngLat([-96, 37.8])
      //   .addTo(map)
    }
  }
})
</script>

<style scoped>
.filter-tabs .filter-tab {
  @apply mx-2 my-1 px-1 py-[6px] flex items-center cursor-pointer rounded-md;
}

.view-mode {
  @apply flex items-center gap-2 bg-white rounded-lg w-full p-1 border border-gray-300;
}

.view-mode .mode {
  @apply w-10 h-8 flex items-center justify-center cursor-pointer z-10;
}

#map {
  height: 500px;
}
</style>

<style>
.marker {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  transition: all .3s ease-in-out;
}
.marker:hover {
  background-color: orangered;
}
.marker.active {
  background-color: orangered;
}
.maplibregl-popup{
  padding: 1rem;
  display: flex;
  background-color: white;
  border-radius: 0.5rem;
  width: 400px;
  max-width: unset !important;
}
.maplibregl-popup .maplibregl-popup-content {
  padding: 0;
  box-shadow: none;
}
</style>
