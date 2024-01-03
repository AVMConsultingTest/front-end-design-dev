<template>
  <div class="w-full">
    <Drawer ref="drawer" />
    <PageHeader title="Carrier Management Overview" />
    <div class="row">
      <div class="col-12">
        <div class="row mx-0 mb-5">
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 10)"
              title="Overview"
              color="green"
              icon="alarm"
              class="alert-plus"
              :is-default="checkDefault(10)"
              :selectable="true"
              @select-method="setTab(10)"
              @click="select(10)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 0)"
              title="Alerts"
              color="green"
              icon="alarm"
              class="alert-plus"
              :is-default="checkDefault(0)"
              :selectable="true"
              @select-method="setTab(0)"
              @click="select(0)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 1)"
              title="Accident Report"
              color="green"
              icon="note-text"
              :is-default="checkDefault(1)"
              :selectable="true"
              @select-method="setTab(1)"
              @click="select(1)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 2)"
              title="Incident Report"
              color="green"
              icon="receipt"
              :is-default="checkDefault(2)"
              :selectable="true"
              @select-method="setTab(2)"
              @click="select(2)"
            />
          </div>
          <div class="col-auto p-0 pr-2">
            <TabButton
              :active="(selectedTab === 3)"
              title="Inspection Report"
              color="green"
              icon="receipt"
              :is-default="checkDefault(3)"
              :selectable="true"
              @select-method="setTab(3)"
              @click="select(3)"
            />
          </div>
        </div>
      </div>
      <div v-if="selectedTab!==10" class="col-12 mb-5">
        <Table
          :id="tableKey"
          ref="table"
          :key="tableKey"
          :selected-tab="selectedTab"
          :request-function="getRequest"
          :delete-function="getDeleteRequest"
          :title="getTitle(selectedTab)"
          :headers="getHeader(selectedTab)"
          :data="getTableData"
          :download-enabled="true"
          :edit-enabled="true"
          :delete-enabled="true"
          :search-enabled="true"
          :page-count="getPageCount"
          :edit-page="drawerEditArr[selectedTab]"
          :view-enabled="checkViewAction"
          :filtering-model="vFilter"
        >
          <template #item-date="{ item }">
            <span class="whitespace-nowrap">
              {{ formatDate(item.date) }}
            </span>
          </template>
          <template #item-status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.status"
              :dropdown-menu="dropdownAlertStatusMenu"
              :dropdown-style="dropdownAlertStatusStyle"
              @extend="extendItemAlertStatus"
              @set-status="setAlertStatus"
            />
          </template>
          <template #item-accident_status="{ item }">
            <Status
              :item="item"
              :active="extendeds.includes(item.id)"
              :item-status="item.accident_status"
              :dropdown-menu="dropdownAccidentStatusMenu"
              :dropdown-style="dropdownAccidentStatusStyle"
              @extend="extendItemAccidentStatus"
              @set-status="setAccidentStatus"
            />
          </template>
          <template #item-accident_date="{ item }">
            <span>
              {{ formatDate(item.accident_date) }}
            </span>
          </template>
          <template #item-drug_screen_date="{ item }">
            <span>
              {{ formatDate(item.drug_screen_date) }}
            </span>
          </template>
          <template #item-incident_date="{ item }">
            <span class="whitespace-nowrap">
              {{ formatDate(item.incident_date) }}
            </span>
          </template>
          <template #item-violation_date="{ item }">
            <span class="whitespace-nowrap">
              {{ formatDate(item.violation_date) }}
            </span>
          </template>
          <template #item-actions>
            <div class="flex items-center">
              <Icon
                icon="edit"
                variant="linear"
                :alpha="400"
                :disable-fill="true"
                color="gray"
                class="w-6 h-6 mr-2"
              />
              <Icon
                icon="send-square"
                variant="linear"
                :alpha="400"
                :disable-fill="true"
                color="gray"
                class="w-6 h-6 mr-2"
              />
              <Icon
                icon="sms"
                variant="linear"
                :alpha="400"
                :disable-fill="true"
                color="gray"
                class="w-6 h-6 mr-2"
              />
            </div>
          </template>
          <div v-if="(selectedTab === 1)" slot="header">
            <div class="flex">
              <button
                v-for="(tab, index) in innerFilters"
                ref="innerTabs"
                :key="index"
                class="rounded-full py-2 px-5 mx-1 flex items-center justify-center cursor-pointer"
                :class="[
                  { 'border border-gray-300' : innerTab !== index },
                  { 'bg-dark-blue' : innerTab === index }
                ]"
                @click="innerSelect(index)"
              >
                <span
                  class="text-c-1 font-medium"
                  :class="[
                    { 'text-gray': innerTab !== index },
                    { 'text-white': innerTab === index },
                  ]"
                >{{ tab }}</span>
              </button>
            </div>
          </div>
          <div slot="actions">
            <div
              v-if="addArr[selectedTab] && innerTab !== 1"
              class="!bg-black !w-14 !border-none m-input flex items-center justify-center cursor-pointer"
              @click="drawer()"
            >
              <Icon icon="add" color="white" class="w-6 h-6" />
            </div>
          </div>
        </Table>
      </div>
    </div>
    <div v-if="selectedTab===10">
      <div class="row mb-5">
        <div class="col-3 mb-6">
          <widget
            class="h-full"
            :title="`Carrier Score`"
            :icon-alpha="400"
            :no-shadow="true"
            :no-border="true"
          >
            <div class="flex gap-4 items-end">
              <StatTracking sub-title="" :stat="safetyMetrics?.carrier_score" :increase="true" />
            </div>
          </widget>
        </div>
        <div class="col-3 mb-6">
          <widget :title="`Unsafe Driving`" :no-shadow="true" :no-border="true" @action="directWithFilter('Unsafe Driving')">
            <div class="flex gap-4 items-end">
              <StatTracking class="col-4" sub-title="Measure" :stat="safetyMetrics?.unsafe_driving_measure" :increase="true" />
              <StatTracking class="col-4" sub-title="Percentile" :stat="safetyMetrics?.unsafe_driving_percentile" />
              <StatTracking class="col-4" sub-title="OOS" :stat="safetyMetrics?.unsafe_driving_oos" />
            </div>
          </widget>
        </div>
        <div class="col-3 mb-6">
          <widget :title="`Driver Fitness`" :no-shadow="true" :no-border="true" @action="directWithFilter('Driver Fitness')">
            <div class="flex gap-4 items-end">
              <StatTracking class="col-4" sub-title="Measure" :stat="safetyMetrics?.driver_fitness_measure" :increase="true" />
              <StatTracking class="col-4" sub-title="Percentile" :stat="safetyMetrics?.driver_fitness_percentile" />
              <StatTracking class="col-4" sub-title="OOS" :stat="safetyMetrics?.driver_fitness_oos" />
            </div>
          </widget>
        </div>
        <div class="col-3 mb-6">
          <widget :title="`Crash Indicator`" :no-shadow="true" :no-border="true" @action="directWithFilter('Crash Indicator')">
            <div class="flex gap-4 items-end">
              <StatTracking class="col-4" sub-title="Measure" :stat="safetyMetrics?.crash_indicator_measure" :increase="true" />
              <StatTracking class="col-4" sub-title="Percentile" :stat="safetyMetrics?.crash_indicator_percentile" />
              <StatTracking class="col-4" sub-title="OOS" :stat="safetyMetrics?.crash_indicator_oos" />
            </div>
          </widget>
        </div>
        <div class="col-3 mb-6">
          <widget :title="`HOS Compliance`" :no-shadow="true" :no-border="true" @action="directWithFilter('HOS Compliance')">
            <div class="flex gap-4 items-end">
              <StatTracking class="col-4" sub-title="Measure" :stat="safetyMetrics?.hos_compliance_measure" :increase="true" />
              <StatTracking class="col-4" sub-title="Percentile" :stat="safetyMetrics?.hos_compliance_percentile" />
              <StatTracking class="col-4" sub-title="OOS" :stat="safetyMetrics?.hos_compliance_oos" />
            </div>
          </widget>
        </div>
        <div class="col-3 mb-6">
          <widget :title="`Vehicle Maintanence`" :no-shadow="true" :no-border="true" @action="directWithFilter('Vehicle Maintenance')">
            <div class="flex gap-4 items-end">
              <StatTracking class="col-4" sub-title="Measure" :stat="safetyMetrics?.vehicle_maintenance_measure" :increase="true" />
              <StatTracking class="col-4" sub-title="Percentile" :stat="safetyMetrics?.vehicle_maintenance_percentile" />
              <StatTracking class="col-4" sub-title="OOS" :stat="safetyMetrics?.vehicle_maintenance_oos" />
            </div>
          </widget>
        </div>
        <div class="col-3 mb-6">
          <widget :title="`Controlled Substance`" :no-shadow="true" :no-border="true" @action="directWithFilter('Controlled Substance')">
            <div class="flex gap-4 items-end">
              <StatTracking class="col-4" sub-title="Measure" :stat="safetyMetrics?.substance_alcohol_measure" :increase="true" />
              <StatTracking class="col-4" sub-title="Percentile" :stat="safetyMetrics?.substance_alcohol_percentile" />
              <StatTracking class="col-4" sub-title="OOS" :stat="safetyMetrics?.substance_alcohol_oos" />
            </div>
          </widget>
        </div>
        <div class="col-3 mb-6">
          <widget :title="`HM Compliance`" :no-shadow="true" :no-border="true" @action="directWithFilter('HM Compliance')">
            <div class="flex gap-4 items-end">
              <StatTracking class="col-4" sub-title="Measure" :stat="safetyMetrics?.hm_compliance_measure" :increase="true" />
              <StatTracking class="col-4" sub-title="Percentile" :stat="safetyMetrics?.hm_compliance_percentile" />
              <StatTracking class="col-4" sub-title="OOS" :stat="safetyMetrics?.hm_compliance_oos" />
            </div>
          </widget>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-12">
          <Table
            title="Changes in Violation Points"
            icon="firstline"
            icon-color="orange"
            :icon-alpha="0"
            :headers="headers"
            :data="violationsPointsDetails"
            :request-function="getViolationsPointsDetails"
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
      <div class="row mb-5 mt-12 hidden">
        <div class="w-full flex items-center justify-between">
          <div>
            <span class="text-secondary text-b-3 font-medium flex items-center cursor-pointer dark:text-white" title="Test">
              Other Metrics
              <Icon
                icon="info-circle"
                color="grey-dark"
                :alpha="400"
                :disable-fill="true"
                class="ml-2 w-4 h-4"
              />
            </span>
          </div>
        </div>
        <div class="col-3 my-5">
          <widget :title="`Crash Indicator`" :no-shadow="true" :no-border="true" go-to="/carrier/dashboard/safety-management/carrier-management/crash-indicator">
            <div class="grid grid-cols-3 gap-4 items-end">
              <StatTracking :stat="safetyMetrics?.crash_indicator_curr_month" :increase="safetyMetrics?.crash_indicator_curr_month > safetyMetrics?.crash_indicator_prev_month" :percentage="safetyMetrics?.crash_indicator_change_per" class="pr-4 col-span-2" />
              <StatTracking :size="SizeTypeEnum.SM" sub-title="Average Score" :stat="97" />
            </div>
          </widget>
        </div>
        <div class="col-3 my-5">
          <widget :title="`HOS Compliance`" :no-shadow="true" :no-border="true" go-to="/carrier/dashboard/safety-management/carrier-management/hos-compliance">
            <div class="grid grid-cols-3 gap-4 items-end">
              <StatTracking :stat="safetyMetrics?.hos_compliance_curr_month" :increase="safetyMetrics?.hos_compliance_curr_month > safetyMetrics?.hm_compliance_prev_month" :percentage="safetyMetrics?.hos_compliance_change_per" class="pr-4 col-span-2" />
              <StatTracking :size="SizeTypeEnum.SM" sub-title="Average Score" :stat="45" />
            </div>
          </widget>
        </div>
        <div class="col-3 my-5">
          <widget :title="`Vehicle Maintanence`" :no-shadow="true" :no-border="true" go-to="/carrier/dashboard/safety-management/carrier-management/vehicle-maintanence">
            <div class="grid grid-cols-3 gap-4 items-end">
              <StatTracking :stat="3.49" :increase="true" :percentage="10" class="pr-4 col-span-2" />
              <StatTracking :size="SizeTypeEnum.SM" sub-title="Average Score" :stat="45" />
            </div>
          </widget>
        </div>
        <div class="col-3 my-5">
          <widget :title="`Controlled Substance`" :no-shadow="true" :no-border="true" go-to="/carrier/dashboard/safety-management/carrier-management/controlled-substance">
            <div class="grid grid-cols-3 gap-4 items-end">
              <StatTracking :stat="1.97" :increase="true" :percentage="10" class="pr-4 col-span-2" />
              <StatTracking :size="SizeTypeEnum.SM" sub-title="Average Score" :stat="45" />
            </div>
          </widget>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import moment from 'moment'
import { SizeTypeEnum } from '@/components/ts/enums'
import { SafetyMetricsSummary } from '~/models/safetyMetrics/safetyMetricsSummary'
import { Accidents } from '@/models/accidents/accidents'
import { AlertsDetails } from '@/models/alerts/alertsDetails'
import { IncidentRegistryDetails } from '~/models/incidentRegistry/incidentRegistryDetails'
import { InspectionReportDetails } from '~/models/inspectionReport/inspectionReportDetails'
import { ViolationsPoints } from '~/models/violationsPoints/violationsPoints'
import { CarrierMetrics } from '~/models/safetyMetrics/carrierMetrics'
import { ViolationsDetails } from '~/models/violationsDetails/violationsDetails'
import { ViolationsPointsDetails } from '~/models/violationsPointsDetails'
import accidentPerimeter from '~/perimeters/accidentPerimeter'
import basePerimeter from '~/perimeters/basePerimeter'
export default ({
  name: 'CarrierManagementTest',
  layout: 'Dashboard',
  perimeters: [accidentPerimeter, basePerimeter],
  data () {
    return {
      vFilter: {},
      extendeds: [] as any[],
      dropdownAlertStatusStyle: 'a',
      dropdownAccidentStatusStyle: 'a',
      dropdownAlertStatusMenu: [
        { text: 'New', bg: 'green' },
        { text: 'Viewed', bg: 'blue' }
      ],
      dropdownAccidentStatusMenu: [
        { text: 'open', bg: 'green' },
        { text: 'close', bg: 'red' }

      ],
      tableKey: 0,
      SizeTypeEnum,
      innerTab: 0,
      selectedTab: 10,
      addArr: [true, true, true, true],
      drawerArr: ['AddAlertPage', 'AddAccidentReport', 'AddIncidentRegistry', 'AddInspectionReport'],
      drawerEditArr: ['EditAlertPage', 'EditAccidentReport', 'EditIncidentRegistry', 'EditInspectionReport'],
      headers: {
        category: {
          label: 'Violation Category',
          // icon: 'category',
          searchable: true,
          sortable: true
        },
        falling: {
          label: 'Falling Point',
          // icon: 'activity',
          searchable: true,
          sortable: true
        },
        new:
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
      innerFilters: [
        'Manuel',
        'Samba Accidents'
      ],
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
          // description: 'Place description here',
          falling_point: Number,
          new_point: Number,
          impact: 'positive'
        }
      ],
      accidentHeaders: {
        driver_id: {
          label: 'Driver Id',
          searchable: true,
          sortable: true
        },
        truck_id: {
          label: 'Truck Id',
          searchable: true,
          sortable: true
        },
        // report_date: {
        //   label: 'Report Date',
        //   searchable: true,
        //   sortable: true
        // },
        report_number: {
          label: 'Report Number',
          searchable: true
        },
        report_state: {
          label: 'Report State',
          searchable: true
        },
        fatal: {
          label: 'Fatal',
          searchable: true
        },
        injury: {
          label: 'Injury',
          searchable: true
        },
        tow: {
          label: 'Tow',
          searchable: true
        },
        haz_mat: {
          label: 'HM',
          searchable: true
        },
        notes: {
          label: 'Notes',
          searchable: true
        }
      },
      alertHeaders: {
        id: {
          label: 'Id'
        },
        // carrier_id: {
        //   label: 'Carrier Id'
        // },
        driver_name: {
          label: 'Driver Name'
        },
        date: {
          label: 'Date of Alerts'
        },
        licence_status: {
          label: 'Licence Status'
        },
        status: {
          label: 'Status'
        },
        description: {
          label: 'Description'
        }
      },
      incidentHeaders: {
        driver_id: {
          label: 'Incident ID',
          searchable: true,
          sortable: true
        },
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        unit_number: {
          label: 'Unit Number',
          searchable: true,
          sortable: true
        },
        event_type: {
          label: 'Event Type',
          searchable: true,
          sortable: true
        },
        incident_date: {
          label: 'Incident Date',
          searchable: true,
          sortable: true
        },
        training_required: {
          label: 'Training Required',
          searchable: true,
          sortable: true
        },
        training_completed: {
          label: 'Training Completed',
          searchable: true,
          sortable: true
        }
      },
      inspectionHeaders: {
        driver_id: {
          label: 'Driver Id',
          searchable: true,
          sortable: true
        },
        category: {
          label: 'Category',
          searchable: true,
          sortable: true
        },
        date: {
          label: 'Date',
          searchable: true,
          sortable: true
        },
        state: {
          label: 'State',
          searchable: true,
          sortable: true
        },
        report_number: {
          label: 'Report Number',
          searchable: true,
          sortable: true
        },
        // upload_document: {
        //   label: 'Upload Document',
        //   searchable: true,
        //   sortable: true
        // },
        inspection_level: {
          label: 'Inspection Level',
          searchable: true,
          sortable: true
        },
        // driver_name: {
        //   label: 'Driver Name',
        //   searchable: true,
        //   sortable: true
        // },
        // vehicle_id: {
        //   label: 'Asset ID',
        //   searchable: true,
        //   sortable: true
        // },
        violation_group: {
          label: 'Violation Group',
          searchable: true,
          sortable: true
        },
        description: {
          label: 'Description',
          searchable: true,
          sortable: true
        },
        violations_count: {
          label: 'Violations Count',
          searchable: true,
          sortable: true
        },
        sequence: {
          label: 'Sequence',
          searchable: true,
          sortable: true
        },
        out_of_service: {
          label: 'Out of Service',
          searchable: true,
          sortable: true
        },
        violation_severity: {
          label: 'Violation Severity',
          searchable: true,
          sortable: true
        },
        oos_violation_severity: {
          label: 'OOS Violation Severity',
          searchable: true,
          sortable: true
        },
        total_violation_severity: {
          label: 'Total Violation Severity',
          searchable: true,
          sortable: true
        },
        time_weight: {
          label: 'Time Weight',
          searchable: true,
          sortable: true
        },
        total_points: {
          label: 'Total Points',
          searchable: true,
          sortable: true
        }
      },
      sambaHeaders: {
        driver_name: {
          label: 'Driver Name',
          searchable: true,
          sortable: true
        },
        driver_type: {
          label: 'Driver Type',
          searchable: true,
          sortable: true
        },
        truck_id: {
          label: 'Truck ID',
          searchable: true,
          sortable: true
        },
        mileage_invoice_period:
        {
          label: 'Invoice Period',
          searchable: true,
          sortable: true
        },
        report_start_date:
        {
          label: 'Start Date',
          searchable: true,
          sortable: true
        },
        report_end_date:
        {
          label: 'End Date',
          searchable: true,
          sortable: true
        },
        driver_designation: {
          label: 'Driver Designation',
          searchable: true,
          sortable: true
        },
        mileage:
        {
          label: 'Mileage',
          searchable: true,
          sortable: true
        },
        deadhead:
        {
          label: 'Deadhead',
          searchable: true,
          sortable: true
        },
        comments: {
          label: 'Comments',
          searchable: true,
          sortable: true
        }
      },
      accidentData: [
        {
          driver_name: 'Tom Hanks',
          mvr_score: 9,
          description: 'Accident',
          accident_date: '05/04/2021',
          accident_score: 8,
          location: 'Palm Beach, FL',
          mvr_date: '05/04/2022',
          most_recent_violation: 'Speeding 15+ MPH Over',
          most_recent_violation_date: '05/04/2022'
        }
      ] as Array<any>,
      alertData: [
        {
          driver_name: 'Bill Sanders',
          date_of_alerts: '16/08/2023',
          license_status: 'Valid',
          status: 'New',
          description: 'Some description'
        },
        {
          driver_name: 'Tom Hanks',
          date_of_alerts: '12/05/2024',
          license_status: 'Invalid',
          status: 'New',
          description: 'Some description'
        },
        {
          driver_name: 'George Best',
          date_of_alerts: '14/02/2025',
          license_status: 'Suspended',
          status: 'Viewed',
          description: 'Some description'
        }
      ],
      incidentData: [
        {
          INCIDENT_DEMO_HEADER: ' incident demo data'
        }
      ] as Array<any>,
      inspectionData: [
        {
          driver_name: ' inspection demo data'
        }
      ] as Array<any>
    }
  },
  computed: {
    innerTableHeaders () {
      switch (this.innerTab) {
        case 0:
          if (this.$accident.isAllowed('read')) {
            return this.getAccidents
          } else {
            return this.getAccidents
          }
        case 1:
          return this.sambaHeaders
        default:
          return null
      }
    },
    innerTableData () {
      switch (this.innerTab) {
        case 0:
          if (this.$accident.isAllowed('read')) {
            return this.getAccidents
          } else {
            return this.getAccidents
          }
        case 1:
          return this.sambaHeaders
        default:
          return null
      }
    },

    safetyMetrics (): SafetyMetricsSummary {
      console.log(this.$store.getters['safetyMetrics/summary'])

      return (this.$store.getters['safetyMetrics/summary'])
    },
    carrierMetrics (): CarrierMetrics {
      const aData = (this.$store.getters['vehicles/carrier_metrics'])
      return aData?.id ? aData : this.carrierMetricData
    },
    accidents (): Accidents[] {
      return (this.$store.getters['accidents/carrierAccidents'])
    },
    alerts (): AlertsDetails[] {
      return (this.$store.getters['alerts/carrierAlerts'])
    },
    incidentRegistry (): IncidentRegistryDetails[] {
      return (this.$store.getters['incidentRegistry/carrierIncidents'])
    },
    inspectionReport (): InspectionReportDetails[] {
      return (this.$store.getters['inspectionReport/inspections'])
    },
    violationsDetails (): ViolationsDetails[] {
      return (this.$store.getters['violationsDetails/carrierViolations'])
    },
    violationsPointsDetails (): ViolationsPointsDetails[] {
      const data: { [x:string]: any } | undefined = this.$store.getters['violationsPointsDetails/carrierViolations'][0]
      const arr: any[] = []
      if (data) {
        Object.keys(data).forEach((key: string) => {
          const isStat: boolean = key.includes('falling') || key.includes('new') || key.includes('impact')
          if (isStat) {
            const wordArr: string[] = key.split('_')
            if (arr.some(w => w.category === `${wordArr[0]} ${wordArr[1]}`)) {
              if (wordArr[2] === 'falling') {
                arr.find(w => w.category === `${wordArr[0]} ${wordArr[1]}`).falling = data[key]
              } else if (wordArr[2] === 'new') {
                arr.find(w => w.category === `${wordArr[0]} ${wordArr[1]}`).new = data[key]
              } else {
                arr.find(w => w.category === `${wordArr[0]} ${wordArr[1]}`).impact = data[key]
              }
            } else {
              arr.push({
                category: `${wordArr[0]} ${wordArr[1]}`,
                falling: wordArr[2] === 'falling' ? data[key] : null,
                new: wordArr[2] === 'new' ? data[key] : null,
                impact: wordArr[2] === 'impact' ? data[key] : null
              })
            }
          }
        })
      }
      return arr
    },
    violationPoints (): ViolationsPoints {
      return (this.$store.getters['violationsPoints/violationPoint'])
    },
    tabs (): any {
      return { ...this.$store.getters.tabs }
    },
    getTableData (): any[] {
      switch (this.selectedTab) {
        case 0:
          return this.alerts as AlertsDetails[]
        case 1:
          if (this.$accident.isAllowed('read')) {
            return this.accidents as Accidents[]
          } else {
            return []
          }
        case 2:
          return this.incidentRegistry as IncidentRegistryDetails[]
        case 3:
          return this.inspectionReport as InspectionReportDetails[]
        default:
          return []
      }
    },
    getRequest () {
      switch (this.selectedTab) {
        case 0:
          return this.getAlerts
        case 1:
          return this.innerTableData
        case 2:
          return this.getAllIncidentRegistryDetails
        case 3:
          return this.getInspectionReport
        default:
          return null
      }
    },
    getDeleteRequest () {
      switch (this.selectedTab) {
        case 0:
          return this.removeAlert
        case 1:
          return this.removeAccident
        case 2:
          return this.removeIncident
        case 3:
          return this.removeInspectionReport
        default:
          return null
      }
    },
    getPageCount () {
      switch (this.selectedTab) {
        case 0:
          return this.alertsPageCount
        case 1:
          return this.accidentPageCount
        case 2:
          return this.incidentPageCount
        case 3:
          return this.inspectionReportPageCount
        default:
          return 0
      }
    },
    checkViewAction () {
      if (this.selectedTab === 0) {
        return true
      } else {
        return false
      }
    },
    incidentPageCount () {
      return (this.$store.getters['incidentRegistry/pageCount'])
    },
    accidentPageCount () {
      return (this.$store.getters['accidents/pageCount'])
    },
    alertsPageCount () {
      return (this.$store.getters['alerts/pageCount'])
    },
    inspectionReportPageCount () {
      return (this.$store.getters['inspectionReport/pageCount'])
    },
    violationsDetailsPageCount () {
      return (this.$store.getters['violationsDetails/pageCount'])
    }
  },
  mounted () {
    this.getSafetyMetrics({ page_number: 1 })
    // this.getCarrierMetrics(1)
    // console.log(this.tabs)
    // this.select(this.tabs?.safety.carrier ?? 10)
    const queryTab = this.$route.query.tab
    if (queryTab) {
      this.selectedTab = parseInt(queryTab)
    } else {
      this.select(this.tabs?.safety.carrier ?? 10)
    }
    // this.getAccidents()
    // this.getAllIncidentRegistryDetails()
    // this.getInspectionReportDetails()
    // this.getViolationPoints(1).then(() => {
    //  const violationPointData = (this.$store.getters['violationsPoints/violationPoint'])
    // for (let index = 0; index < this.testData.length; index++) {
    //  const element = this.testData[index]
    //  element.falling_point = violationPointData[element.key + 'falling']
    //  element.new_point = violationPointData[element.key + 'adding']
    //  element.impact = this.decideImpact(element.new_point, element.falling_point)
    // }
    // })
    // Setting the Violation Points data on the table falling points and new points
  },
  methods: {
    innerSelect (index: number): void {
      this.innerTab = index
      this.getKey()
    },
    directWithFilter (category: string): void {
      this.selectedTab = 4
      this.vFilter.violation_category = category
    },
    extendItemAlertStatus (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownAlertStatusStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    extendItemAccidentStatus (event:MouseEvent, item: any, menuItem?:string | null): void {
      if (menuItem) { item.impact = menuItem }

      if (this.extendeds.includes(item.id)) {
        this.extendeds = this.extendeds.filter((a: any) => {
          return a !== item.id
        })
      } else {
        this.extendeds.push(item.id)
        const { clientX, clientY } = event
        this.dropdownAccidentStatusStyle = {
          top: `${clientY + 20}px`,
          left: `${clientX - 100}px`
        }
      }
    },
    setAlertStatus (id: number, newStatus: any) {
      const data = this.alerts.slice()
      console.log(id, newStatus)
      const item = data.find((w: any) => w.id === id)
      const updatedAlert = {
        ...item,
        status: newStatus,
        licence_status: item.licence_status.toString(),
        date: moment(item.date).toISOString()
      }
      const alertToSend = { ...updatedAlert }
      if (alertToSend.driver_name) {
        delete alertToSend.driver_name
      }
      this.updateAlert(alertToSend)
    },

    setAccidentStatus (id:number, newStatus:any) {
      const data = this.accidents.slice()
      console.log(id, newStatus)
      const item = data.find((w:any) => w.id === id)
      this.updateAccident({
        ...item,
        accident_status: newStatus,
        accident_date: moment(item.accident_date).toISOString(),
        drug_screen_date: moment(item.drug_screen_date).toISOString(),
        driver_id: item.driver_id.toString(),
        unit_number: item.unit_number.toString()
      })
    },
    checkDefault (index:number): boolean {
      return this.tabs.safety.carrier === index
    },
    getKey () {
      this.tableKey = Math.random() * (99 - 15) + 15
    },
    select (index: number) {
      this.selectedTab = index
      this.vFilter = {}
      this.getKey()
    },
    formatDate (date: string): string {
      if (date === '0000-00-00 00:00:00') {
        return '00-00-0000 00:00'
      } else {
        return moment(date).format('MM-DD-yyyy hh:mm')
      }
    },
    // violationRequest () {
    //   return this.getViolationPoints(1).then(() => {
    //     // const violationPointData = this.$store.getters['violationsPoints/violationPoint']
    //     for (let index = 0; index < this.testData.length; index++) {
    //       const element = this.testData[index]
    //       // element.falling_point = violationPointData[element.key + 'falling']
    //       // element.new_point = violationPointData[element.key + 'adding']
    //       element.falling_point = Math.floor(Math.random() * 500)
    //       element.new_point = Math.floor(Math.random() * 500)
    //       element.impact = this.decideImpact(element.new_point, element.falling_point)
    //     }
    //   })
    // },
    decideImpact (newPoint: NumberConstructor, fallPoint: NumberConstructor): string {
      return newPoint > fallPoint ? 'Positive' : newPoint < fallPoint ? 'Negative' : 'Neutral'
    },
    ...mapActions({
      setDefaultTab: (action, tabs) => action('setDefaultTab', tabs),

      // Overview
      getViolationsPointsDetails: (action, id) => action('violationsPointsDetails/getViolationsByCarrierId', id),
      getSafetyMetrics: (action, id) => action('safetyMetrics/getSummaryByCarrierId', id),

      // Alerts
      getAlerts: (action, page) => action('alerts/getAlertsByCarrierId', page),
      updateAlert: (action, request) => action('alerts/updateAlert', request),
      removeAlert: (action, page) => action('alerts/removeAlert', page),

      // Accidents
      getAccidents: (action, page) => action('accidents/getAccidentsByCarrierId', page),
      updateAccident: (action, request) => action('accidents/updateAccidents', request),
      removeAccident: (action, page) => action('accidents/removeAccidents', page),

      // Inspections
      getInspectionReport: (action, page) => action('inspectionReport/getReports', page),
      updateInspectionReport: (action, request) => action('inspectionReport/updateReport', request),
      removeInspectionReport: (action, page) => action('inspectionReport/removeReport', page),

      // Incidents
      getAllIncidentRegistryDetails: (action, page) => action('incidentRegistry/getIncidentsByCarrierId', page),
      removeIncident: (action, page) => action('incidentRegistry/removeIncident', page),

      // Violations
      getViolationsDetails: (action, page) => action('violationsDetails/getViolationsByCarrierId', page),
      removeViolation: (action, page) => action('violationsDetails/removeViolation', page)

      // getCarrierMetrics: (action, id) => action('safetyMetrics/getCarrierMetrics', id),
      // getInspectionReportDetails: (action, page) => action('inspectionReport/getReports', page),
      // getViolationPoints: (action, id) => action('violationsPoints/getViolationPoint', id),
      // getSafetyMetrics: (action, id) => action('safetyMetrics/getSummary', id),
    }),
    setTab (index:number) {
      const newTabs = JSON.parse(JSON.stringify(this.tabs))
      newTabs.safety.carrier = index
      this.setDefaultTab(newTabs)
    },
    getTitle (selectedTab: number): string {
      switch (selectedTab) {
        case 0:
          return 'Alerts'
        case 1:
          return 'Accident Report'
        case 2:
          return 'Incident Report'
        case 3:
          return 'Inspection Report'
        default:
          return ''
      }
    },
    drawer (): void {
      this.$refs.drawer.showDrawer(this.drawerArr[this.selectedTab] as string)
    },
    getHeader (selectedTab: number): Object {
      switch (selectedTab) {
        case 0:
          return this.alertHeaders
        case 1:
          return this.accidentHeaders
        case 2:
          return this.incidentHeaders
        case 3:
          return this.inspectionHeaders
        default:
          return {}
      }
    }
  }
})
</script>

<style scoped>

</style>
