<template>
  <div class="w-full">
    <PageHeader
      title="Driver Fitness Details"
      class="mb-10"
      @search="''"
      @goback="$router.go(-1)"
    />
    <div class="row mb-5">
      <div class="col-12">
        <Table
          title="Driver Fitness"
          icon="receipt-item"
          icon-color="orange"
          :download-enabled="true"
          :icon-alpha="0"
          :icon-rounded="true"
          :headers="headers"
          :data="driverFitnesses"
          :page-count="totalPageCount"
          :request-function="getDriverFitnesses"
        >
          <template #item-violation_date="{ item }">
            <div class="block whitespace-nowrap">
              {{ formatDate(item.violation_date) }}
            </div>
          </template>
          <div slot="actions" class="w-full flex items-center justify-end">
            <div class="!w-40">
              <m-select
                :multiple="false"
                :options="rangeOptions"
                name="reportRange"
                wrapper-class="!text-c-1"
              />
            </div>
          </div>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import moment from 'moment'
import { SizeTypeEnum } from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'
import { VehiclesMaintenance } from '~/models/vehiclesMaintenance/vehiclesMaintenance'
export default Vue.extend({
  name: 'CrashIndicatorPage',
  layout: 'Dashboard',
  data () {
    return {
      SizeTypeEnum,
      rangeOptions: [
        {
          id: 'Monthly',
          text: 'Monthly',
          selected: true,
          icon: { name: 'calendar', variant: 'bulk' }
        },
        {
          id: 'Yearly',
          text: 'Yearly',
          selected: false
        }
      ] as SelectOption[],
      headers: {
        // category: {
        //   label: 'Violations Category',
        //   searchable: true,
        //   sortable: true
        // },
        violation_date: {
          label: 'Date',
          // icon: 'calendar',
          searchable: true,
          sortable: true
        },
        violation_state:
        {
          label: 'State',
          // icon: 'map',
          searchable: true,
          sortable: true
        },
        violation_report_number:
        {
          label: 'Report Number',
          // icon: 'diagram',
          searchable: true,
          sortable: true
        },
        upload_document:
        {
          label: 'Upload Document',
          // icon: 'document-upload',
          searchable: true,
          sortable: true
        },
        inspection_level:
        {
          label: 'Inspection Level',
          // icon: 'level',
          searchable: true,
          sortable: true
        },
        driver_name:
        {
          label: 'Driver Name',
          // icon: 'driving',
          searchable: true,
          sortable: true
        },
        asset_id:
        {
          label: 'Asset ID',
          // icon: 'dcube',
          searchable: true,
          sortable: true
        },
        violation_group:
        {
          label: 'Violation Group',
          // icon: 'cloud-lightning',
          searchable: true,
          sortable: true
        },
        violation_description:
        {
          label: 'Description',
          // icon: 'note',
          searchable: true,
          sortable: true
        },
        violations_count:
        {
          label: 'Violations Count',
          // icon: 'diagram',
          searchable: true,
          sortable: true
        },
        violation_sequence:
        {
          label: 'Sequence',
          // icon: 'diagram',
          searchable: true,
          sortable: true
        },
        out_of_service:
        {
          label: 'Out of Service',
          // icon: 'candle',
          searchable: true,
          sortable: true
        },
        violation_severity:
        {
          label: 'Violations Severity',
          // icon: 'diagram',
          searchable: true,
          sortable: true
        },
        oos_violation_severity:
        {
          label: 'OOS Violations Severity',
          // icon: 'diagram',
          searchable: true,
          sortable: true
        },
        total_violation_severity:
        {
          label: 'Total Violations Severity',
          // icon: 'diagram',
          searchable: true,
          sortable: true
        },
        time_weight:
        {
          label: 'Time Weight',
          // icon: 'diagram',
          searchable: true,
          sortable: true
        },
        total_points:
        {
          label: 'Total Points',
          // icon: 'diagram',
          searchable: true,
          sortable: true
        }
      },
      testData: [
        {
          category: 'Driver Fitness',
          date: '6/17/2022',
          violation_state: 'TX',
          violation_report_number: '54HG67UY8P',
          upload_document: 'fitness.pdf',
          inspection_level: '2',
          driver_name: 'Joshua Andrew',
          asset_id: 'Unit 1',
          violation_group: 'Lighting',
          violation_description: 'Inoperative turn signal',
          violations_count: 3,
          violation_sequence: 1,
          out_of_service: 'No',
          violation_severity: 6,
          oos_violation_severity: 0,
          total_violation_severity: 6,
          time_weight: 3,
          total_points: 18
        },
        {
          category: 'Driver Fitness',
          date: '4/11/2023',
          violation_state: 'AZ',
          violation_report_number: '6BVI0XHX2X',
          upload_document: 'driver.pdf',
          inspection_level: '2',
          driver_name: 'Jackson Vardy',
          asset_id: 'Unit 2',
          violation_group: 'Tires',
          violation_description: 'Tire-ply or belt material exposed',
          violations_count: 3,
          violation_sequence: 2,
          out_of_service: 'No',
          violation_severity: 7,
          oos_violation_severity: 0,
          total_violation_severity: 8,
          time_weight: 3,
          total_points: 24
        },
        {
          category: 'Driver Fitness',
          date: '6/11/2023',
          state: 'AL',
          report_number: '6BVI08YT56V',
          upload_document: 'violation.pdf',
          Inspection_level: '2',
          driver_name: 'John Smith',
          asset_id: 'Unit 3',
          violation_group: 'Tires',
          description: 'Tire-other tread depth less than 2/32 of inch measured in a major tread groove',
          violations_count: 3,
          sequence: 3,
          out_of_service: 'No',
          violation_severity: 4,
          oos_violation_severity: 0,
          total_violation_severity: 8,
          time_weight: 3,
          total_points: 24
        }
      ],
      tableKey: 1
    }
  },
  computed: {
    driverFitnesses (): VehiclesMaintenance[] {
      const aData = (this.$store.getters['vehicles/driverFitnesses'])
      return aData.length > 0 ? aData : this.testData
    },
    totalPageCount (): number {
      return (this.$store.getters['vehicles/driverFitnessPageCount'])
    }
  },
  mounted () {
    // this.getMaintenances(1).then()
  },
  methods: {
    ...mapActions({
      getDriverFitnesses: (action, page) => action('vehicles/getDriverFitnesses', page)
    }),
    getKey () {
      this.tableKey = Math.random()
    },
    formatDate (date: string) {
      return moment(date).format('MM-DD-yyyy')
    }
  }
})
</script>

<style scoped>

</style>
