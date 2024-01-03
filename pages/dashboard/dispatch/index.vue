<template>
  <div class="w-full">
    <PageHeader title="Dispatch Dashboard" />
    <div class="row mb-5">
      <div class="col-6 my-5">
        <widget title="Loads" :no-border="true" class="px-2 h-full">
          <template #actions>
            <div class="w-40">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>
          </template>

          <div class="row px-2">
            <div class="col-6">
              <div class="row mb-6">
                <div class=" bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
                  <Icon
                    icon="box"
                    color="green"
                    :alpha="400"
                    variant="bulk"
                    class="w-10 h-10"
                  />
                </div>
              </div>
              <div class="row">
                <StatTracking :size="SizeTypeEnum.LG" sub-title="Total Loads" :stat="dispatchSummaryByCarrierId?.total_loads" />
              </div>
            </div>
            <div class="col-6">
              <div class="grid grid-cols-2 grid-rows-2 gap-[1px] bg-grey-blue-100">
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="dark-blue" :stat-alpha="0" :size="SizeTypeEnum.SM" sub-title="Reserved Loads" :stat="dispatchSummaryByCarrierId?.reserved_loads" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="green" :stat-alpha="800" :size="SizeTypeEnum.SM" sub-title="In-Transit" :stat="dispatchSummaryByCarrierId?.intransit_loads" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="red" :size="SizeTypeEnum.SM" sub-title="Delayed Loads" :stat="dispatchSummaryByCarrierId?.delayed_loads" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking :size="SizeTypeEnum.SM" sub-title="Completed Loads" :stat="dispatchSummaryByCarrierId?.completed_loads" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </widget>
      </div>
      <div class="col-6 my-5">
        <widget title="Drivers" :no-border="true" class="px-2">
          <template #actions>
            <div class="w-40">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>
          </template>

          <div class="row px-2">
            <div class="col-6">
              <div class="row mb-6">
                <div class=" bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center">
                  <Icon
                    icon="user-octagon"
                    color="purple"
                    :alpha="400"
                    variant="bulk"
                    class="w-10 h-10"
                  />
                </div>
              </div>
              <div class="row">
                <StatTracking :size="SizeTypeEnum.LG" sub-title="Total Drivers" :stat="dispatchSummaryByCarrierId?.total_drivers" />
              </div>
            </div>
            <div class="col-6">
              <div class="grid grid-cols-2 grid-rows-2 gap-[1px] bg-grey-blue-100">
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="green" :stat-alpha="800" :size="SizeTypeEnum.SM" sub-title="Active Drivers" :stat="dispatchSummaryByCarrierId?.active_drivers" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="red" :size="SizeTypeEnum.SM" sub-title="Off-Duty Drivers" :stat="dispatchSummaryByCarrierId?.offduty_drivers" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="orange" :size="SizeTypeEnum.SM" sub-title="Underperforming Drivers" :stat="dispatchSummaryByCarrierId?.underperforming_drivers" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="dark-blue" :stat-alpha="0" :size="SizeTypeEnum.SM" sub-title="Best Performing Drivers" :stat="dispatchSummaryByCarrierId?.bestperforming_drivers" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </widget>
      </div>
    </div>
    <div class="row mb-16">
      <div class="col-6 my-5">
        <widget title="Trucks" :no-border="true" class="px-2">
          <template #actions>
            <div class="w-40">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>
          </template>

          <div class="row px-2">
            <div class="col-6">
              <div class="row mb-6">
                <div class=" bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center">
                  <Icon
                    icon="group"
                    color="orange"
                    :alpha="400"
                    variant="bulk"
                    class="w-10 h-10"
                  />
                </div>
              </div>
              <div class="row">
                <StatTracking :size="SizeTypeEnum.LG" sub-title="Total Trucks" :stat="dispatchSummaryByCarrierId?.total_trucks" />
              </div>
            </div>
            <div class="col-6">
              <div class="grid grid-cols-2 grid-rows-2 gap-[1px] bg-grey-blue-100">
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="green" :stat-alpha="800" :size="SizeTypeEnum.SM" sub-title="Enroute Trucks" :stat="dispatchSummaryByCarrierId?.enroute_trucks" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="dark-blue" :stat-alpha="0" :size="SizeTypeEnum.SM" sub-title="Ready Trucks" :stat="dispatchSummaryByCarrierId?.ready_trucks" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="red" :size="SizeTypeEnum.SM" sub-title="In-Service Trucks" :stat="dispatchSummaryByCarrierId?.inservice_trucks" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="orange" :size="SizeTypeEnum.SM" sub-title="In-terminal Trucks" :stat="dispatchSummaryByCarrierId?.interminal_trucks" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </widget>
      </div>
      <div class="col-6 my-5">
        <widget title="Trailers" :no-border="true" class="px-2">
          <template #actions>
            <div class="w-40">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>
          </template>
          <div class="row px-2">
            <div class="col-6">
              <div class="row mb-6">
                <div class=" bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center">
                  <Icon
                    icon="bookmark"
                    color="dark-blue"
                    :alpha="0"
                    variant="bulk"
                    class="w-10 h-10"
                  />
                </div>
              </div>
              <div class="row">
                <StatTracking :size="SizeTypeEnum.LG" sub-title="Total Trailers" :stat="dispatchSummaryByCarrierId?.total_trailers" />
              </div>
            </div>
            <div class="col-6">
              <div class="grid grid-cols-2 grid-rows-2 gap-[1px] bg-grey-blue-100">
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="green" :stat-alpha="800" :size="SizeTypeEnum.SM" sub-title="Enroute Trailers" :stat="dispatchSummaryByCarrierId?.enroute_trailers" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="dark-blue" :stat-alpha="0" :size="SizeTypeEnum.SM" sub-title="Ready Trailers" :stat="dispatchSummaryByCarrierId?.ready_trailers" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="red" :size="SizeTypeEnum.SM" sub-title="In-Service Trailers" :stat="dispatchSummaryByCarrierId?.inservice_trailers" />
                  </div>
                </div>
                <div class="w-full bg-white p-1">
                  <div class="py-4 px-6  transition-all hover:bg-[#E0E1E5]/30 rounded-md">
                    <StatTracking stat-color="orange" :size="SizeTypeEnum.SM" sub-title="In-terminal Trailers" :stat="dispatchSummaryByCarrierId?.interminal_trailers" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </widget>
      </div>
    </div>
    <div class="my-5">
      <widget :no-border="true">
        <div class="px-4 flex items-center justify-between">
          <span class="text-b-3 font-semibold text-gray-800 pb-11 pt-3">
            Gross Financial Overiew
          </span>
          <div class="w-40">
            <m-select
              :multiple="false"
              :options="rangeOptions"
              name="reportRange"
              wrapper-class="!text-c-1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div id="chart">
              <apexchart v-if="dataFetched" type="area" height="350" :options="chartOptions" :series="series" />
            </div>
          </div>
          <div class="col-5">
            <div class="ml-10">
              <div class="mb-5 w-4/5">
                <div>
                  <h2 class="text-b-1 font-medium mb-5">
                    This Week
                  </h2>
                  <div class="flex justify-between">
                    <div>
                      <span class="text-b-4">
                        Gross
                      </span>
                      <h1 class="text-b-1 font-medium">
                        {{ '$' + thisWeekGrossData }}
                      </h1>
                    </div>
                    <div>
                      <span class="text-b-4">
                        Target
                      </span>
                      <h1 class="text-b-1 font-medium">
                        {{ '$' + thisWeekTargetData }}
                      </h1>
                    </div>
                  </div>
                </div>
                <div class="mb-1 text-base font-medium dark:text-white">
                  <span class="hidden">
                    Dark
                  </span>
                </div>
                <div class="mb-1 text-base font-medium bg-purple-500 dark:bg-melrose">
                  <span class="hidden">
                    Dark
                  </span>
                </div>
                <div class="w-70  rounded-r-lg h-8 mb-4 bg-melrose">
                  <div class="h-8 rounded-r-lg bg-purple-500" :style="{'width':thisWeekBarPercentage + '%'}" />
                </div>
                <div class="mt-10">
                  <h2 class="text-b-1 font-medium mb-5">
                    Last Week
                  </h2>
                  <div class="flex justify-between">
                    <div>
                      <span class="text-b-4">
                        Gross
                      </span>
                      <h1 class="text-b-1 font-medium">
                        {{ '$' + lastWeekGrossData }}
                      </h1>
                    </div>
                    <div>
                      <span class="text-b-4">
                        Target
                      </span>
                      <h1 class="text-b-1 font-medium">
                        {{ '$' + lastWeekTargetData }}
                      </h1>
                    </div>
                  </div>
                </div>
                <div class="mb-1 text-base font-medium bg-grey-dark-500">
                  <span class="hidden">
                    Dark
                  </span>
                </div>
                <div class="w-70 rounded-r-lg h-8 bg-grey-dark-100">
                  <div class="h-8 rounded-r-lg bg-grey-dark-500" :style="{'width':lastWeekBarPercentage + '%'}" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </widget>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
/* eslint-enable */
import USA from '@svg-maps/usa'
import { mapActions } from 'vuex'
import { SizeTypeEnum } from '../../../components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { GrossFinancialSummary } from '~/models/DISPATCH/grossFinancial/grossFinancialSummary'
import { DispatchSummary } from '~/models/DISPATCH/dispatch/dispatchSummary'
/* eslint-disable */
// import { SvgMap } from 'vue-svg-map' // eslint-disable-line no-use-before-define
const {SvgMap} = require('vue-svg-map');
export default Vue.extend({
  components: {
    SvgMap
  },
  layout: 'Dashboard',
  data () {
    return {
      thisWeekBarPercentage: 0,
      lastWeekBarPercentage: 0,
      thisWeekGrossData: 0,
      thisWeekTargetData: 0,
      lastWeekGrossData: 0,
      lastWeekTargetData: 0,
      dataFetched: false,
      rangeOptions: [
        {
          id: 'Today',
          text: 'Today',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Next day',
          text: 'Next day',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Next 3 days',
          text: 'Next 3 days',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Next 7 days',
          text: 'Next 7 days',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        }
      ] as SelectOption[],
      USA,
      request: {} as DispatchSummary,
      pointedLocation: null as any,
      tooltipStyle: null as any,
      SizeTypeEnum,

      series: [{
        name: 'Target',
        data: []
      }, {
        name: 'Gross',
        data: []
      }],
      chartOptions: {
        grid: {
          show: true,
          borderColor: '#E0E1E5',
          strokeDashArray: 3 
        },
        legend: {
          itemMargin: {
            horizontal: 24,
            vertical: 0
          },
          labels: {
            colors: ['#92969F']
          },
          position: 'top',
          horizontalAlign: 'right',
          fontSize: 12,
          fontFamily: 'Euclid Circular A',
          fontWeight: 400,
          markers: {
            width: 6,
            height: 16,
            radius: 9999,
            offsetY: 3,
            offsetX: -10
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'category',
          categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
          labels: {
            style: {
              colors:'#979CB7',
              fontSize: 10,
              fontFamily: 'Euclid Circular A',
              fontWeight: 400,
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors:['#979CB7'],
              fontSize: 10,
              fontFamily: 'Euclid Circular A',
              fontWeight: 400,
            }
          }
        },
        tooltip: {
          marker: {
            show: true
          },
          custom ({ series, dataPointIndex }: any) {
            return '<div class="pl-2 pr-10 py-4">' +
      '<span class="text-c-2"><p>29 July 00:00</p></span>' +
      '<h5 class="flex font-medium items-center"><div class="mx-1 w-1 h-5 bg-green-400 rounded"></div>$' + series[0][dataPointIndex] + ' <div class="ml-2 mr-1 w-1 h-4 bg-purple-400 rounded"></div><span class="flex font-normal text-grey-dark-400 text-b-3">$' + series[1][dataPointIndex] + '</span></h5>' +
      '<p class="text-c-2 pt-1">Increase ' + Math.round(series[0][dataPointIndex] / series[1][dataPointIndex] * 100) + '% since last week</p>' +
            '</div>'
          }
        },
        colors: ['#96E5BE', '#9278E5']
      }

    }
  },
  computed: {
    dispatchSummaryByCarrierId (): DispatchSummary {
      return (this.$store.getters['dispatch/carrierDispatchSummary'])
    },
    grossFinancialSummary (): GrossFinancialSummary {
      const Data = (this.$store.getters['grossFinancial/grossFinancial'])
      console.log('getGrossFinancialSummaryByCarrierId', Data)
      return Data[0]
    },  
    // grossFinancialSummaryByCarrierId(): GrossFinancialSummary{
    //   return (this.$store.getters['grossFinancial/carrierGrossFinancialSummary'])
    // },
  },
  created() {
    this.getGrossFinancialSummaryByCarrierId({ page_number: 1 }).then(() => {
      
      
      const grossFinancialData: GrossFinancialSummary[] = this.$store.getters['grossFinancial/carrierGrossFinancialSummary']
      
      console.log(grossFinancialData[0].gross_trailing_week_1);
      this.thisWeekGrossData = grossFinancialData[0].gross_trailing_week_16
      this.thisWeekTargetData = grossFinancialData[0].targeted_trailing_week_16
      this.lastWeekGrossData = grossFinancialData[0].gross_trailing_week_15
      this.lastWeekTargetData = grossFinancialData[0].targeted_trailing_week_15
      this.decideBarPercentage()
      console.log(this.thisWeekBarPercentage);
      console.log(this.lastWeekBarPercentage);
      
      
      this.series[0].data.push(grossFinancialData[0].targeted_trailing_week_1)
      this.series[0].data.push(grossFinancialData[0].targeted_trailing_week_2)
      this.series[0].data.push(grossFinancialData[0].targeted_trailing_week_3)
      this.series[0].data.push(grossFinancialData[0].targeted_trailing_week_4)
      this.series[0].data.push(grossFinancialData[0].targeted_trailing_week_5)
      this.series[0].data.push(grossFinancialData[0].targeted_trailing_week_6)
      this.series[0].data.push(grossFinancialData[0].targeted_trailing_week_7)

      this.series[1].data.push(grossFinancialData[0].gross_trailing_week_1)
      this.series[1].data.push(grossFinancialData[0].gross_trailing_week_2)
      this.series[1].data.push(grossFinancialData[0].gross_trailing_week_3)
      this.series[1].data.push(grossFinancialData[0].gross_trailing_week_4)
      this.series[1].data.push(grossFinancialData[0].gross_trailing_week_5)
      this.series[1].data.push(grossFinancialData[0].gross_trailing_week_6)
      this.series[1].data.push(grossFinancialData[0].gross_trailing_week_7)
    }).catch((err:unknown) => {
      console.log(err)
    }).finally(() => {
      this.dataFetched = true
    })
    // this.getDispatchSummary(3)
    this.getDispatchSummaryByCarrierId(3)
  },
  // mounted () {
  //   this.getGrossFinancialSummaryByCarrierId({ page_number: 1 })
    
  // },
  methods: {
    decideBarPercentage() {
      let thisWeekPercentage = (this.thisWeekGrossData/this.thisWeekTargetData) * 100
      let lastWeekPercentage = (this.lastWeekGrossData/this.lastWeekTargetData) * 100

      if(thisWeekPercentage >=100) {
        this.thisWeekBarPercentage = 100
      } else {
        this.thisWeekBarPercentage = thisWeekPercentage
      }

      if(lastWeekPercentage >=100) {
        this.lastWeekBarPercentage = 100
      } else {
        this.lastWeekBarPercentage = lastWeekPercentage
      }
    },
    changeGraphSeries() {
      
    },
    ...mapActions({
      getDispatchSummaryByCarrierId: (action, id) => action('dispatch/getDispatchSummaryByCarrierId', id),
      getGrossFinancialSummaryByCarrierId: (action, id) => action('grossFinancial/getGrossFinancialSummaryByCarrierId', id),
      getGrossFinancial: (action, id) => action('grossFinancial/getGrossFinancial', id),
      getDispatchSummary: (action, id) => action('dispatch/getDispatch', id)
    }),
    getLocationClass (item:any) {
      const data = this.mapData.filter((dt:any) => {
        return dt.code === item.id
      })[0]

      const path = document.getElementById(item.id) as any
      const name = document.getElementById(`${item.id}_name`)
      if (path && !name) {
        const boundingBox = path.getBBox()
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text') as any
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
    pointLocation (event:any) {
      this.pointedLocation = this.getLocationName(event.target) as any
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
    getLocationName (node:any) {
      const code = node && node.attributes?.id.value
      if (code) {
        const data = this.mapData.filter((item:any) => {
          return item.code === code
        })[0]
        return data
      }
    }
  }
})
</script>

<style src="vue-svg-map/dist/index.css">

</style>
<style>
.svg-map__location {
  stroke: none;
  fill: #EEEFF1;
  transition: all .3s ease-in-out;
}

.svg-map__location.green {
  fill: #BAF1DA;
  stroke: #EEEFF1;
  stroke-width: 2px;
}

.svg-map__location.green:hover {
  fill: #96E5BE;
  /* z-index: 99!important;
  transform: scale(1.05) translate(-25px, -10px);
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,.3)); */
}

.svg-map__location.orange {
  fill: #F2B487;
  stroke: #EEEFF1;
  stroke-width: 2px;
}

.svg-map__location.orange:hover {
  fill: #FC8416;
  /* z-index: 99!important;
  transform: scale(1.05) translate(-25px, -10px);
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,.3)); */
}

.svg-map__location.disabled:hover {
  fill: #EEEFF1 !important;
}

.svg-map__location::before {
  content: 'attr(name)' !important;
  z-index: 9;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  transform: translate(-50%, -50%);
}
</style>
