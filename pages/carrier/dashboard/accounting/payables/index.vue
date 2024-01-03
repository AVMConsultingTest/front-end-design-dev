<template>
  <div class="w-full">
    <PageHeader title="Dashboard" />
    <div class="row mb-5 mt-14">
      <SectionHeader title="Fleet & Real Estate" link="#" />
      <div class="flex mt-5 col-12">
        <div class="col-6 pr-4">
          <widget class="h-full" title="Fleet" icon="truck-fast" icon-color="purple" :icon-alpha="600">
            <div class="row">
              <StatTracking class="col-4" :size="SizeTypeEnum.SM" sub-title="Active Trucks" :stat="fleet?.active_trucks" />
              <StatTracking class="col-4" :size="SizeTypeEnum.SM" sub-title="Active Trailers" :stat="fleet?.active_trailers" />
            </div>
          </widget>
        </div>
        <div class="col-6">
          <widget title="Real Estate" icon="home-trend-up" icon-color="red" :icon-alpha="600">
            <div class="row">
              <StatTracking class="col-3" :size="SizeTypeEnum.SM" sub-title="Truck Shop" :stat="fleet?.trucks_in_shop" />
              <StatTracking class="col-3" :size="SizeTypeEnum.SM" sub-title="Parking Lot" :stat="fleet?.parking_lot" />
              <StatTracking class="col-3" :size="SizeTypeEnum.SM" sub-title="Office Building" :stat="fleet?.office_building" />
            </div>
          </widget>
        </div>
      </div>
    </div>
    <div class="row mb-5 mt-10">
      <SectionHeader title="Payments" link="#" />
      <div class="flex mb-10 mt-5">
        <div class="col-6 pr-4">
          <widget class="h-full" title="Payments" icon="money-send" icon-color="blue" :icon-alpha="600">
            <template #actions>
              <div class="w-40">
                <m-select
                  :multiple="false"
                  :options="rangeOptionsPayments"
                  name="reportRange"
                  wrapper-class="!text-c-1"
                />
              </div>
            </template>
            <div class="row">
              <StatTracking class="col-4" :size="SizeTypeEnum.SM" sub-title="Fleet" :currency="true" :stat="payments?.fleet_payment" />
              <StatTracking class="col-4" :size="SizeTypeEnum.SM" sub-title="Real Estate" :currency="true" :stat="payments?.real_estate_payment" />
              <StatTracking class="col-4" :size="SizeTypeEnum.SM" sub-title="Operational" :currency="true" :stat="payments?.operational_payment" />
            </div>
          </widget>
        </div>
        <div class="col-6">
          <widget class="h-full" title="Upcoming Vendor Payments" icon="money-send" icon-color="blue" :icon-alpha="600">
            <template #actions>
              <div class="w-40">
                <m-select
                  :multiple="false"
                  :options="rangeOptionsUpcoming"
                  name="reportRange"
                  wrapper-class="!text-c-1"
                />
              </div>
            </template>
            <div class="row">
              <StatTracking class="col-4" :size="SizeTypeEnum.SM" sub-title="Fleet" :currency="true" :stat="payments?.upcoming_fleet_payment" />
              <StatTracking class="col-4" :size="SizeTypeEnum.SM" sub-title="Real Estate" :currency="true" :stat="payments?.upcoming_real_estate_payment" />
              <StatTracking class="col-4" :size="SizeTypeEnum.SM" sub-title="Operational" :currency="true" :stat="payments?.upcoming_operational_payment" />
            </div>
          </widget>
        </div>
      </div>
    </div>
    <div>
      <widget class="mb-8 px-2" title="Payments Trends" :no-border="true">
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
        <div id="graph-chart">
          <apexchart type="area" height="350" :options="chartOptionsPayments" :series="seriesPayments" />
        </div>
      </widget>
    </div>
    <div class="mb-20">
      <widget title="Payments by Top Vendors" :no-border="true" class="px-2">
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
        <div id="graph-chart">
          <apexchart type="area" height="350" :options="chartOptions" :series="seriesTopVendors" />
        </div>
      </widget>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SizeTypeEnum } from '../../../../../components/ts/enums'
import { SelectOption } from '~../../../components/ts/interfaces'
import { PayablePaymentSummary } from '~../../../models/accounting/payablePaymentSummary/payablePaymentSummary'
import { PayableSummary } from '~../../../models/accounting/payableSummary/payableSummary'
export default Vue.extend({
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      rangeOptions: [
        {
          id: 'Weekly',
          text: 'Weekly',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Monthly',
          text: 'Monthly',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Yearly',
          text: 'Yearly',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        }
      ] as SelectOption[],
      rangeOptionsPayments: [
        {
          id: 'Last7',
          text: 'Last 7 Days',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Last14',
          text: 'Last 14 Days',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Last21',
          text: 'Last 21 Days',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        }
      ] as SelectOption[],
      rangeOptionsUpcoming: [
        {
          id: 'Last7',
          text: 'Next 7 Days',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Last14',
          text: 'Next 14 Days',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Last21',
          text: 'Next 21 Days',
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
        }
      ] as SelectOption[],
      series: [{
        name: 'By Amazon',
        data: [31, 40, 28, 51, 42, 109]
      }, {
        name: 'By Factoring',
        data: [11, 32, 45, 32, 34, 52]
      }, {
        name: 'By Broker',
        data: [15, 20, 15, 12, 14, 22]
      }],
      seriesPayments: [{
        name: 'Vendor 1',
        data: [31, 40, 28, 51, 42, 109]
      }, {
        name: 'Vendor 2',
        data: [11, 32, 45, 32, 34, 52]
      }, {
        name: 'Vendor 3',
        data: [15, 20, 15, 12, 14, 22]
      }, {
        name: 'Vendor 4',
        data: [3, 14, 88, 31, 72, 19]
      }, {
        name: 'Vendor 5',
        data: [1, 20, 18, 11, 52, 59]
      }],
      seriesTopVendors: [{
        name: 'Fleet',
        data: [31, 40, 28, 51, 42, 109]
      }, {
        name: 'Real Estate',
        data: [11, 32, 45, 32, 34, 52]
      }, {
        name: 'Operational',
        data: [15, 20, 15, 12, 14, 22]
      }],
      chartOptions: {
        legend: {
          itemMargin: {
            horizontal: 24,
            vertical: 0
          },
          position: 'top',
          horizontalAlign: 'center',
          fontSize: 12,
          fontFamily: 'Euclid Circular A',
          fontWeight: 400,
          markers: {
            width: 6,
            height: 16,
            radius: 9999,
            offsetY: 3,
            offsetX: -4
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
          categories: ['Week 40', 'Week 41', 'Week 42', 'Week43', 'Week 44', 'Week 45']
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
        colors: ['#FFAA00', '#96E5BE', '#9278E5']
      },
      chartOptionsPayments: {
        legend: {
          itemMargin: {
            horizontal: 24,
            vertical: 0
          },
          position: 'top',
          horizontalAlign: 'center',
          fontSize: 12,
          fontFamily: 'Euclid Circular A',
          fontWeight: 400,
          markers: {
            width: 6,
            height: 16,
            radius: 9999,
            offsetY: 0,
            offsetX: -4
          },
          labels: {
            colors: ['#92969F']
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
          categories: ['Week 40', 'Week 41', 'Week 42', 'Week43', 'Week 44', 'Week 45']
        },
        tooltip: {
          marker: {
            show: true
          },
          custom ({ series, dataPointIndex }: any) {
            return '<div class="pl-2 pr-10 py-4">' +
      '<span class="text-c-2"><p>29 July 00:00</p></span>' +
      '<h5 class="flex font-medium items-center"><div class="mx-1 w-1 h-5 bg-orange rounded"></div>$' + series[0][dataPointIndex] + ' <div class="ml-2 mr-1 w-1 h-4 bg-green-400 rounded"></div><span class="flex font-normal text-grey-dark-400 text-b-3">$' + series[1][dataPointIndex] + '</span>' + ' <div class="ml-2 mr-1 w-1 h-4 bg-purple-400 rounded"></div><span class="flex font-normal text-grey-dark-400 text-b-3">$' + series[2][dataPointIndex] + '</span> ' + '</h5>' +
      '<p class="text-c-2 pt-1">Increase ' + Math.round(series[0][dataPointIndex] / series[1][dataPointIndex] * 100) + '% since last week</p>' +
            '</div>'
          }
        },
        colors: ['#FFAA00', '#96E5BE', '#9278E5', '#94E0FC', '#F287A7']
      }
    }
  },
  computed: {
    payments (): PayablePaymentSummary {
      return (this.$store.getters['accounting/payablePaymentSummary/carrierPayablePayments'])
    },
    fleet (): PayableSummary {
      return (this.$store.getters['accounting/payableSummary/carrierPayables'])
    }
    // payments (): PayablePaymentSummary {
    //   return (this.$store.getters['Accounting/payablePaymentSummary/payablePayment'])
    // },
    // fleet (): PayableSummary {
    //   return (this.$store.getters['Accounting/payableSummary/payable'])
    // }
  },
  created () {
    // this.getPayablePayment(3)
    this.getPayablePaymentsByCarrierId({ page_number: 1 })
    this.getPayablesByCarrierId({ page_number: 1 })
    // this.getPayable(3)
  },
  methods: {
    ...mapActions({
      getPayablePaymentsByCarrierId: (action, id) => action('accounting/payablePaymentSummary/getPayablePaymentsByCarrierId', id),
      // getPayablePayment: (action, id) => action('accounting/payablePaymentSummary/getPayablePayment', id),
      getPayablesByCarrierId: (action, id) => action('accounting/payableSummary/getPayablesByCarrierId', id)
      // getPayable: (action, id) => action('accounting/payableSummary/getPayable', id)
    })
  }
})
</script>
