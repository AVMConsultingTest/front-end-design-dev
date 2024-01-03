<template>
  <div class="w-full">
    <PageHeader title="Operational Map" />
    <div class="row">
      <div class="col-12">
        <div
          class="w-full bg-white rounded-2xl  dark:bg-[#21293B] dark:shadow-none dark:border-grey-dark-800"
        >
          <div class="hidden card-header border-b-gray-200 border-b px-6 py-7 dark:border-grey-dark-800">
            <span class="font-semibold text-b-3 dark:text-white">
              Operational Map
            </span>
          </div>
          <div class="row my-9 flex">
            <div class="col-12">
              <div
                class="map-container relative rounded-2xl  border border-grey-blue-200 dark:bg-[#21293B] dark:shadow-none dark:border-grey-dark-800"
              >
                <svg-map
                  class="max-h-[540px]"
                  :map="USA"
                  :location-class="getLocationClass"
                  @mouseover="pointLocation"
                  @mouseout="unpointLocation"
                />
                <div
                  class="map__tooltip rounded-lg shadow-2xl fixed bg-white w-48 p-2 gap-4 items-center text-[#3C4049] font-medium text-c-1"
                  :style="tooltipStyle"
                >
                  <img
                    :src="`/images/state_flags/${pointedLocation?.code}.jpg`"
                    class="w-7 h-auto rounded-md"
                    :alt="`${pointedLocation?.code}`"
                  >
                  {{ pointedLocation?.name }} ( {{ pointedLocation?.count }} )
                </div>
                <div class="row my-6 mx-10">
                  <div class="col-auto flex items-center">
                    <span class="w-3 h-3 block rounded-full bg-green-800 mr-2" />
                    <span class="text-b-4 font-medium">Active</span>
                  </div>
                  <div class="col-auto flex items-center">
                    <span class="w-3 h-3 block rounded-full bg-orange-800 mr-2" />
                    <span class="text-b-4 font-medium">Off-Duty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SvgMap } from 'vue-svg-map'
import USA from '@svg-maps/usa'
import { mapActions } from 'vuex'
import { SizeTypeEnum } from '~/components/ts/enums'
export default {
  name: 'MapPage',
  components: {
    SvgMap
  },
  layout: 'Dashboard',
  data () {
    return {
      USA,
      SizeTypeEnum,
      pointedLocation: null,
      tooltipStyle: null,
      mapData: [
        {
          code: 'ca',
          name: 'California',
          count: 4,
          status: 'active'
        },
        {
          code: 'mn',
          name: 'Minnesota',
          count: 3,
          status: 'off-duty'
        },
        {
          code: 'wa',
          name: 'Washington',
          count: 2,
          status: 'active'
        },
        {
          code: 'or',
          name: 'Oregon',
          count: 3,
          status: 'active'
        },
        {
          code: 'nc',
          name: 'North Carolina',
          count: 1,
          status: 'off-duty'
        },
        {
          code: 'id',
          name: 'Idaho',
          count: 2,
          status: 'active'
        },
        {
          code: 'wy',
          name: 'Wyoming',
          count: 5,
          status: 'active'
        },
        {
          code: 'wy',
          name: 'Wyoming',
          count: 5,
          status: 'active'
        },
        {
          code: 'ut',
          name: 'Utah',
          count: 4,
          status: 'active'
        },
        {
          code: 'az',
          name: 'Arizona',
          count: 2,
          status: 'active'
        },
        {
          code: 'nm',
          name: 'New Mexico',
          count: 2,
          status: 'active'
        },
        {
          code: 'nd',
          name: 'North Dakota',
          count: 5,
          status: 'active'
        },
        {
          code: 'sd',
          name: 'South Dakota',
          count: 5,
          status: 'active'
        },
        {
          code: 'ne',
          name: 'Nebraska',
          count: 5,
          status: 'active'
        },
        {
          code: 'ks',
          name: 'Kansas',
          count: 12,
          status: 'active'
        },
        {
          code: 'ia',
          name: 'Iowa',
          count: 10,
          status: 'active'
        },
        {
          code: 'ar',
          name: 'Arkansas',
          count: 7,
          status: 'active'
        },
        {
          code: 'la',
          name: 'Louisiana',
          count: 4,
          status: 'active'
        },
        {
          code: 'wi',
          name: 'Wisconsin',
          count: 6,
          status: 'active'
        },
        {
          code: 'il',
          name: 'Illinois',
          count: 6,
          status: 'active'
        },
        {
          code: 'ky',
          name: 'Kentucky',
          count: 6,
          status: 'active'
        },
        {
          code: 'tn',
          name: 'Tennessee',
          count: 16,
          status: 'active'
        },
        {
          code: 'ms',
          name: 'Mississippi',
          count: 12,
          status: 'active'
        },
        {
          code: 'al',
          name: 'Alabama',
          count: 11,
          status: 'active'
        },
        {
          code: 'ga',
          name: 'Georgia',
          count: 11,
          status: 'active'
        },
        {
          code: 'sc',
          name: 'South Carolina',
          count: 11,
          status: 'active'
        },
        {
          code: 'ok',
          name: 'Oklahoma',
          count: 1,
          status: 'active'
        },
        {
          code: 'mi',
          name: 'Michigan',
          count: 2,
          status: 'active'
        },
        {
          code: 'oh',
          name: 'Ohio',
          count: 9,
          status: 'active'
        },
        {
          code: 'va',
          name: 'Virginia',
          count: 9,
          status: 'active'
        },
        {
          code: 'wv',
          name: 'West Virginia',
          count: 9,
          status: 'active'
        },
        {
          code: 'me',
          name: 'Maine',
          count: 12,
          status: 'active'
        },
        {
          code: 'ny',
          name: 'New York',
          count: 22,
          status: 'active'
        },
        {
          code: 'ak',
          name: 'Alaska',
          count: 22,
          status: 'active'
        },
        {
          code: 'hi',
          name: 'Hawaii',
          count: 7,
          status: 'active'
        }
      ]
    }
  },
  computed: {
    vehicleSummary () {
      return (this.$store.getters['vehicles/summary'])
    }
  },
  mounted () {
    this.getVehiclesSummary(1)
  },
  methods: {
    ...mapActions({
      getVehiclesSummary: (action, id) => action('vehicles/getSummary', id)

    }),
    getOffset (el) {
      const rect = el.getBoundingClientRect()
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      }
    },
    pointLocation (event) {
      this.pointedLocation = this.getLocationName(event.target)
      if (this.pointedLocation?.count && this.pointedLocation?.count > 0) {
        const { clientX, clientY } = event
        this.tooltipStyle = {
          display: 'flex',
          top: `${clientY - 80}px`,
          left: `${clientX - 10}px`
        }
      }
    },
    unpointLocation () {
      this.pointedLocation = null
      this.tooltipStyle = { display: 'none' }
    },
    moveOnLocation (event) {
      if (this.pointedLocation?.count && this.pointedLocation?.count > 0) {
        this.tooltipStyle = {
          display: 'flex',
          top: `${event.clientY - 70}px`,
          left: `${event.clientX - 0}px`
        }
      }
    },
    getLocationClass (item) {
      const data = this.mapData.filter((dt) => {
        return dt.code === item.id
      })[0]

      const path = document.getElementById(item.id)
      const name = document.getElementById(`${item.id}_name`)
      if (path && !name) {
        const boundingBox = path.getBBox()
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        text.style['text-anchor'] = 'middle'
        text.style['dominant-baseline'] = 'middle'
        text.style.stroke = '#2B2E3A'
        text.style['font-size'] = '12px'
        text.style['text-transform'] = 'uppercase'
        text.style.pointerEvents = 'none'
        text.setAttribute('id', `${item.id}_name`)
        text.setAttribute('x', boundingBox.x + boundingBox.width / 2)
        text.setAttribute('y', boundingBox.y + boundingBox.height / 2)
        text.textContent = item.id
        path.parentElement.appendChild(text)
      }

      return `svg-map__location ${data?.status === 'active' ? 'green' : data?.status === 'off-duty' ? 'orange' : 'disabled'}`
    },
    getLocationName (node) {
      const code = node && node.attributes?.id.value
      if (code) {
        const data = this.mapData.filter((item) => {
          return item.code === code
        })[0]
        return data
      }
    },
    getSelectedLocationName (map, locationId) {
      return locationId && map.locations.find(location => location.id === locationId).name
    }
  }
}
</script>

<style lang="scss" scoped></style>
