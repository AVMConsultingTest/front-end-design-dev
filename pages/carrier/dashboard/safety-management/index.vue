<template>
  <div class="w-full">
    <PageHeader title="Dashboard" />
    <div class="row mb-5 mt-12">
      <SectionHeader title="Drivers" link="/carrier/dashboard/safety-management/driver-management" />
      <div class="col-4 my-5">
        <widget
          class="h-full"
          :title="`Active Drivers`"
          icon="square"
          icon-color="green"
          :icon-alpha="400"
        >
          <div class="grid grid-cols-2 gap-4 items-end">
            <StatTracking :stat="driverSummary?.active_drivers" :increase="true" :percentage="10" class="pr-4 border-r border-[#E0E1E5]" />
            <StatTracking :size="SizeTypeEnum.SM" sub-title="Due for Drug Screen" :stat="30" />
          </div>
        </widget>
      </div>
      <div class="col-4 my-5">
        <widget class="h-full" :title="`Inspection Alerts`" icon="personalcard" icon-color="purple">
          <StatTracking :stat="driverSummary?.outstanding_dvers" :increase="true" :percentage="10" />
        </widget>
      </div>
      <div class="col-4 my-5">
        <widget class="h-full" :title="`Off-duty Drivers`" icon="chart" icon-color="red">
          <StatTracking :stat="driverSummary?.off_duty_drivers" :increase="true" :percentage="10" />
        </widget>
      </div>
    </div>
    <div class="row mb-5 mt-16">
      <SectionHeader title="Fleet" link="/carrier/dashboard/safety-management/fleet-management" />

      <div class="col-6 my-5">
        <widget
          :title="`Trucks`"
          icon="truck"
          icon-color="green"
          :icon-alpha="400"
          class="h-48"
        >
          <img slot="image" src="/images/truck.png" alt="trucks">
          <div class="grid grid-cols-2 gap-4 items-end">
            <StatTracking
              :stat="vehicleSummary?.active_trucks"
              :increase="true"
              :percentage="10"
              sub-title="Active Trucks"
              class="pr-4 border-r border-[#E0E1E5]"
            />
            <StatTracking
              :stat="vehicleSummary?.in_shop_trucks"
              sub-title="In Shop"
              stat-color="lime"
              :stat-alpha="0"
            />
          </div>
        </widget>
      </div>
      <div class="col-6 my-5">
        <widget
          :title="`Trailers`"
          icon="box"
          icon-color="green"
          :icon-alpha="400"
          class="h-48"
        >
          <img slot="image" src="/images/trailer.png" alt="trailers">
          <div class="grid grid-cols-2 gap-4 items-end">
            <StatTracking
              :stat="vehicleSummary?.active_trailers"
              :increase="true"
              :percentage="10"
              sub-title="Active Trailers"
              class="pr-4 border-r border-[#E0E1E5]"
            />
            <StatTracking
              :stat="vehicleSummary?.in_shop_trailers"
              sub-title="In Shop"
              stat-color="lime"
              :stat-alpha="0"
            />
          </div>
        </widget>
      </div>
    </div>
    <div class="row mb-5 mt-16">
      <SectionHeader title="Carrier" link="/carrier/dashboard/safety-management/carrier-management" />
      <div v-if="violationPoints" class="col-12 my-5">
        <Table
          title="Changes in Violation Points"
          icon="firstline"
          icon-color="orange"
          :icon-alpha="0"
          :headers="headers"
          :data="testData"
          :request-function="violationRequest"
        >
          <template #item-categories="{ item }">
            <div class="block">
              <span class="block">{{ item.categories }}</span>
              <span class="block text-c-1 text-gray-400">
                {{ item.description }}
              </span>
            </div>
          </template>
          <template #item-impact="{ item }">
            <Badge
              :icon="item.impact === 'Positive' ? 'increase' : item.impact === 'Negative' ? 'decrease' : 'performance'"
              :icon-color="item.impact === 'Positive' ? 'green' : item.impact === 'Negative' ? 'red' : 'gray'"
              :icon-alpha="item.impact === 'Neutral' ? 400 : 800"
              :title="item.impact"
              :class="[
                {'bg-green-100 text-green-800' : item.impact === 'Positive'},
                {'bg-red-100 text-red-800' : item.impact === 'Negative'},
                {'bg-gray-100 text-gray-400' : item.impact === 'Neutral'},
              ]"
              :size="SizeTypeEnum.MD"
            />
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SizeTypeEnum } from '../../../../components/ts/enums'
import { VehiclesSummary } from '~../../../models/vehicles'
import { DriverSummary } from '~../../../models/driver'
import { ViolationsPoints } from '~../../../models/violationsPoints/violationsPoints'
export default Vue.extend({
  name: 'SafetyDashboard',
  layout: 'Dashboard',
  data () {
    return {
      response: {
        active_trucks: 10
      } as VehiclesSummary,
      SizeTypeEnum,
      headers: {
        categories: {
          label: 'Violation Category',
          // icon: 'category',
          searchable: true,
          sortable: true
        },
        falling_point: {
          label: 'Falling Point',
          // icon: 'activity',
          searchable: true,
          sortable: true
        },
        new_point:
        {
          label: 'New Point',
          // icon: 'bill',
          searchable: true,
          sortable: true
        },
        impact:
        {
          label: 'Impact',
          // icon: 'check',
          searchable: true,
          sortable: true
        }
      },
      testData: [
        {
          categories: 'Vehicle Maintenance',
          key: 'vehicle_maintenance_7_days_',
          // description: 'Place description here',
          falling_point: Number,
          new_point: Number,
          impact: ''
        },
        {
          categories: 'Unsafe Driving',
          key: 'unsafe_driving_7_days_',
          // description: 'Place description here',
          falling_point: Number,
          new_point: Number,
          impact: 'negative'
        },
        {
          categories: 'Driver Fitness',
          key: 'driver_fitness_7_days_',
          // description: 'Place description here',
          falling_point: Number,
          new_point: Number,
          impact: 'neutral'
        },
        {
          categories: 'HOS Compliance',
          key: 'hos_compliance_7_days_',
          // description: 'Place description here',
          falling_point: Number,
          new_point: Number,
          impact: 'positive'
        },
        {
          categories: 'Substance & Alcohol',
          key: 'substance_alcohol_7_days_',
          // description: 'Place description here',
          falling_point: Number,
          new_point: Number,
          impact: 'negative'
        },
        {
          categories: 'HM Compliance',
          key: 'hm_compliance_7_days_',
          // description: 'Place description here',
          falling_point: Number,
          new_point: Number,
          impact: 'neutral'
        },
        {
          categories: 'Crash Indicator',
          key: 'crash_indicator_7_days_',
          description: 'Place description here',
          falling_point: Number,
          new_point: Number,
          impact: 'positive'
        }
      ]
    }
  },
  computed: {
    driverSummary (): DriverSummary {
      return (this.$store.getters['driver/summary'])
      // return {
      //   active_drivers: 10,
      //   active_drivers_documents_overdue: 20,
      //   active_drivers_pending_documents: 23,
      //   high_risk_drivers: 24,
      //   drivers_training_scheduled: 22,
      //   outstanding_drivers: 22,
      //   off_duty_drivers: 72,
      //   outstanding_dvers: 44,
      //   id: 1,
      //   carrier_id: 22,
      //   updated_date: '22/02/2077'
      // }
    },
    vehicleSummary (): VehiclesSummary {
      // return (this.$store.getters['vehicles/summary'])
      return {
        id: 1,
        carrier_id: 1,
        in_shop_trailers: 32,
        available_trailers: 15,
        active_trailers: 19,
        inspections: 26,
        service_reminders: 37,
        available_trucks: 44,
        trailers_service_tickets: 41,
        in_shop_trucks: 21,
        active_trucks: 26,
        service_reminders_overdue: 8,
        dispatched_trailers: 12,
        inspections_overdue: 19,
        dispatched_trucks: 4,
        trucks_service_tickets: 14,
        updated_date: '20/05/2022'
      }
    },
    violationPoints (): ViolationsPoints {
      return (this.$store.getters['violationsPoints/violationPoint'])
    }
  },
  mounted () {
    this.getDriverSummary(1)
    this.getVehicleSummary(1)
  },
  methods: {
    violationRequest () {
      return this.getViolationPoints(1).then(() => {
        // const violationPointData = this.$store.getters['violationsPoints/violationPoint']
        for (let index = 0; index < this.testData.length; index++) {
          const element = this.testData[index]
          // element.falling_point = violationPointData[element.key + 'falling']
          // element.new_point = violationPointData[element.key + 'adding']
          element.falling_point = Math.floor(Math.random() * 500)
          element.new_point = Math.floor(Math.random() * 500)
          element.impact = this.decideImpact(element.new_point, element.falling_point)
        }
      })
    },
    decideImpact (newPoint: Number, fallPoint: Number): String {
      return newPoint > fallPoint ? 'Positive' : newPoint < fallPoint ? 'Negative' : 'Neutral'
    },
    ...mapActions({
      getDriverSummary: (action, id) => action('driver/getSummary', id),
      getVehicleSummary: (action, id) => action('vehicles/getSummary', id),
      getViolationPoints: (action, id) => action('violationsPoints/getViolationPoint', id)
    })
  }
})
</script>

  <style scoped>

 </style>
