<template>
  <div class="w-full">
    <PageHeader v-if="$accident.isAllowed('read')" title="Dashboard" />
    <SectionHeader class="mt-12" title="DRIVERS" link="/carrier/dashboard/safety-management/driver-management" />
    <div class="grid grid-cols-7  gap-4 mb-20 mt-6">
      <div class="col-span-3">
        <widget class="h-full" title="Active Drivers" icon="user-octagon" icon-color="purple" :icon-alpha="800">
          <div class="row">
            <StatTracking class="col-3" :size="SizeTypeEnum.SM" sub-title="Active Drivers" :stat="driverSummaryByCarrierId?.active_drivers" link="/carrier/dashboard/safety-management/driver-management?tab=1&filter=Active" />
            <StatTracking class="col-3" :size="SizeTypeEnum.SM" sub-title="Random" :stat="driverSummaryByCarrierId?.drug_tests" link="/carrier/dashboard/safety-management/driver-management?tab=4&filter=Pending" />
            <StatTracking class="col-3" :size="SizeTypeEnum.SM" sub-title="On Vacation" :stat="driverSummaryByCarrierId?.drivers_on_vacation" link="/carrier/dashboard/safety-management/driver-management?tab=1&filter=On vocation" />
            <StatTracking class="col-3" :size="SizeTypeEnum.SM" sub-title="Dispatched" :stat="driverSummaryByCarrierId?.dispatched_drivers" link="/carrier/dashboard/dispatch/driver-board?filter=Terminated" />
          </div>
        </widget>
      </div>
      <div class="col-span-2">
        <widget class="h-full" title="Inspection Alerts" icon="speedometer" icon-color="red" :icon-alpha="800">
          <div class="row">
            <StatTracking class="col-6" :size="SizeTypeEnum.SM" sub-title="New Inspections" :stat="alertsSummaryByCarrierId?.new_inspections" link="/carrier/dashboard/safety-management/carrier-management?tab=3" />
            <StatTracking class="col-6" :size="SizeTypeEnum.SM" sub-title="Outstanding DVER" :stat="alertsSummaryByCarrierId?.outstanding_dvers" link="/carrier/dashboard/safety-management/carrier-management?tab=3" />
          </div>
        </widget>
      </div>
      <div class="col-span-2">
        <widget class="h-full" title="Telematics Alerts" icon="radar-2" icon-color="orange" :icon-alpha="800">
          <div class="row">
            <StatTracking class="col-6" :size="SizeTypeEnum.SM" sub-title="Total Telematic" :stat="alertsSummaryByCarrierId?.telematic_alerts" link="/carrier/dashboard/safety-management/carrier-management?tab=2" />
            <StatTracking class="col-6" :size="SizeTypeEnum.SM" sub-title="Training Amount" :stat="alertsSummaryByCarrierId?.incomplete_trainings" link="/carrier/dashboard/safety-management/carrier-management?tab=2" />
          </div>
        </widget>
      </div>
    </div>
    <SectionHeader class="mb-5" title="FLEET" link="/carrier/dashboard/safety-management/fleet-management" />
    <div class="mb-20">
      <div class="mb-6">
        <widget class="h-full" title="Trucks" icon="truck" icon-color="blue" :icon-alpha="800">
          <div class="row">
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="Active Trucks" :stat="vehicleSummaryByCarrierId?.active_trucks" link="/carrier/dashboard/safety-management/fleet-management?tab=0&filter=Moving" />
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="Dispatched" :stat="vehicleSummaryByCarrierId?.dispatched_trucks" link="/carrier/dashboard/map" />
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="Available Trucks" :stat="vehicleSummaryByCarrierId?.available_trucks" link="/carrier/dashboard/safety-management/fleet-management?tab=0&filter=Parked" />
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="In-shop Trucks" :stat="vehicleSummaryByCarrierId?.in_shop_trucks" link="/carrier/dashboard/safety-management/fleet-management?tab=0&filter=In%20Service" />
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="Service Tickets" :stat="vehicleSummaryByCarrierId?.trucks_service_tickets" link="/carrier/dashboard/safety-management/fleet-management?tab=4&filter=Pending" />
          </div>
        </widget>
      </div>
      <div>
        <widget class="h-full" title="Trailers" icon="box" icon-color="black" :icon-alpha="800">
          <div class="row">
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="Active Trailers" :stat="vehicleSummaryByCarrierId?.active_trailers" link="/carrier/dashboard/safety-management/fleet-management?tab=1" />
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="Dispatched" :stat="vehicleSummaryByCarrierId?.dispatched_trailers" link="/carrier/dashboard/map" />
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="Available Trailers" :stat="vehicleSummaryByCarrierId?.available_trailers" link="/carrier/dashboard/safety-management/fleet-management?tab=1" />
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="In-shop Trailers" :stat="vehicleSummaryByCarrierId?.in_shop_trailers" link="/carrier/dashboard/safety-management/fleet-management?tab=4" />
            <StatTracking class="col-2" :size="SizeTypeEnum.SM" sub-title="Service Ticket" :stat="vehicleSummaryByCarrierId?.trailers_service_tickets" link="/carrier/dashboard/safety-management/fleet-management?tab=4&filter=Pending" />
          </div>
        </widget>
      </div>
    </div>
    <SectionHeader class="mb-5" title="Overview of Carrier" link="/carrier/dashboard/safety-management/carrier-management" />
    <div class="row mb-14">
      <widget
        class="h-full col-4"
        title="Violation Points"
        icon="speedometer"
        icon-color="red"
        :icon-alpha="800"
        go-to="/carrier/dashboard/safety-management/carrier-management?tab=10"
      >
        <div class="row">
          <StatTracking class="col-6" :size="SizeTypeEnum.SM" sub-title="Failing Points" :stat="violationsPointsSummaryByCarrierId?.current_falling_points" />
          <StatTracking class="col-6" :size="SizeTypeEnum.SM" sub-title="New Points" :stat="violationsPointsSummaryByCarrierId?.current_new_points" />
        </div>
      </widget>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { AlertsSummary } from '~/models/alerts'
import { DriverSummary } from '~/models/driver'
import { VehiclesSummary } from '~/models/vehicles'
import { ViolationsPointsSummary } from '~/models/violationsPoints'
import accidentPerimeter from '~/perimeters/accidentPerimeter'
import basePerimeter from '~/perimeters/basePerimeter'
export default ({
  perimeters: [accidentPerimeter, basePerimeter],
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      isApiData: true,
      driverSummaryStaticData: {
        active_drivers: 130,
        drug_tests: 20,
        drivers_on_vacation: 11,
        dispatched_drivers: 9,
        id: 1,
        carrier_id: 22,
        updated_date: '22/02/2077'
      },
      vehiclesSummaryStaticData: {
        active_trucks: 130,
        active_trailers: 125,
        dispatched_trucks: 9,
        dispatched_trailers: 8,
        available_trucks: 10,
        available_trailers: 8,
        in_shop_trucks: 20,
        in_shop_trailers: 2,
        trucks_service_tickets: 2,
        trailers_service_tickets: 4,
        updated_date: '12/02/3080',
        id: 1,
        carrier_id: 22
      },
      violationsPointsSummaryStaticData: {
        current_new_points: 5,
        current_falling_points: 250,
        updated_date: '12/02/3080',
        id: 1,
        carrier_id: 22
      },
      alertsSummaryStaticData: {
        new_inspections: 19,
        outstanding_dvers: 29,
        incomplete_trainings: 39,
        telematic_alerts: 109,
        updated_date: '12/02/3080',
        id: 17,
        carrier_id: 1
      }
    }
  },
  computed: {
    // driverSummary (): DriverSummary {
    //   const Data = (this.$store.getters['driver/summary'])
    //   return this.isApiData
    //     ? Data
    //     : this.driverSummaryStaticData
    // },
    driverSummaryByCarrierId (): DriverSummary {
      const Data = (this.$store.getters['driver/carrierSummary'])
      console.log('driverSummaryByCarrierId', Data)

      return this.isApiData
        ? Data
        : this.driverSummaryStaticData
    },
    // vehicleSummary (): VehiclesSummary {
    //   const Data = (this.$store.getters['vehicles/summary'])
    //   return this.isApiData
    //     ? Data
    //     : this.vehiclesSummaryStaticData
    // },
    vehicleSummaryByCarrierId (): VehiclesSummary {
      const Data = (this.$store.getters['vehicles/carrierSummary'])
      console.log('vehicleSummaryByCarrierId', Data)

      return this.isApiData
        ? Data
        : this.vehiclesSummaryStaticData
    },
    // violationsPointsSummary (): ViolationsPointsSummary {
    //   const Data = (this.$store.getters['violationsPoints/violationsPointsSummary'])
    //   return this.isApiData ? Data : this.violationsPointsSummaryStaticData
    // },
    violationsPointsSummaryByCarrierId (): ViolationsPointsSummary {
      const Data = (this.$store.getters['violationsPoints/carrierSummary'])
      return this.isApiData ? Data : this.violationsPointsSummaryStaticData
    },
    // alertsSummary (): AlertsSummary {
    //   const Data = (this.$store.getters['alerts/summary'])
    //   return this.isApiData ? Data : this.alertsSummaryStaticData
    // }
    alertsSummaryByCarrierId (): AlertsSummary {
      const Data = (this.$store.getters['alerts/carrierSummary'])
      return this.isApiData ? Data : this.alertsSummaryStaticData
    }
  },
  created () {
    console.log(this.$route.query.code)
    if (this.$route.query.code) {
      console.log('query', this.$route.query.code)
      this.getAccessToken(this.$route.query.code)
    }
    this.$router.push('/carrier/dashboard')
  },
  mounted () {
    // this.getDriverSummary(1)
    this.getDriverSummaryByCarrierId({ page_number: 1 })
    // this.getVehicleSummary(17)
    this.getVehicleSummaryByCarrierId({ page_number: 1 })
    // this.getViolationsPointsSummary(17)
    this.getViolationPointsSummaryByCarrierId({ page_number: 1 })
    // this.getAlertsSummary(17)
    this.getAlertSummaryByCarrierId({ page_number: 1 })
  },
  methods: {
    ...mapActions({
      getAccessToken: (action, param) => action('getAccessToken', param),
      // getDriverSummary: (action, id) => action('driver/getSummary', id),
      getDriverSummaryByCarrierId: (action, id) => action('driver/getSummaryByCarrierId', id),
      // getVehicleSummary: (action, id) => action('vehicles/getSummary', id),
      getVehicleSummaryByCarrierId: (action, id) => action('vehicles/getSummaryByCarrierId', id),
      // getViolationsPointsSummary: (action, id) => action('violationsPoints/getSummary', id),
      getViolationPointsSummaryByCarrierId: (action, id) => action('violationsPoints/getSummaryByCarrierId', id),
      // getAlertsSummary: (action, id) => action('alerts/getSummary', id)
      getAlertSummaryByCarrierId: (action, id) => action('alerts/getSummaryByCarrierId', id)
    })
  }
})
</script>

<style>

</style>
