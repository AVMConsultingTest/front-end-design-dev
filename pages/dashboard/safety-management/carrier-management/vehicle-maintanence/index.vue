<template>
  <div class="w-full">
    <PageHeader title="Vehicle Maintanence Details" class="mb-10" @search="''" @goback="$router.go(-1)" />
    <div class="row mb-5">
      <div class="col-12">
        <Table
          title="Vehicle Maintanence"
          icon="truck-remove"
          icon-color="orange"
          :icon-alpha="800"
          :icon-rounded="true"
          :download-enabled="true"
          :headers="headers"
          :data="vehicleMaintenances"
          :page-count="totalPageCount"
          :request-function="getMaintenances"
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
  name: 'VehicleMaintenancePage',
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
          selected: false,
          icon: { name: 'calendar', variant: 'bulk' }
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
          category: 'Vehicle Maintenance',
          date: '2/10/2021',
          violation_state: 'TX',
          violation_report_number: '6BVI0XHX2X',
          upload_document: 'broker.pdf',
          inspection_level: 2,
          driver_name: 'Charlie Antony',
          asset_id: 'Unit 1',
          violation_group: 'Lightining',
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
          category: 'Vehicle Maintenance',
          date: '12/17/2023',
          violation_state: 'AL',
          violation_report_number: '65TRQ5413R',
          upload_document: 'vehicle.pdf',
          inspection_level: 2,
          driver_name: 'John Smith',
          asset_id: 'Unit 2',
          violation_group: 'Tires',
          violation_description: 'Tire-ply or belt material exposed',
          violations_count: 3,
          violation_sequence: 2,
          out_of_service: 'No',
          violation_severity: 6,
          oos_violation_severity: 0,
          total_violation_severity: 8,
          time_weight: 3,
          total_points: 24
        },
        {
          category: 'Vehicle Maintenance',
          date: '8/17/2024',
          violation_state: 'AZ',
          violation_report_number: '6B7YVB5611',
          upload_document: 'indicator.pdf',
          inspection_level: 2,
          driver_name: 'Michael Richard',
          asset_id: 'Unit 3',
          violation_group: 'Tires',
          violation_description: 'Tire-other tread depth less than 2/32 of inch measured in a major tread groove',
          violations_count: 3,
          violation_sequence: 3,
          out_of_service: 'No',
          violation_severity: 6,
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
    vehicleMaintenances (): VehiclesMaintenance[] {
      const aData = (this.$store.getters['vehicles/vehicleMaintenances'])
      return aData.length > 0 ? aData : this.testData
    },
    totalPageCount (): number {
      return (this.$store.getters['vehicles/maintenancePageCount'])
    }
  },
  mounted () {
    // this.getMaintenances(1).then()
  },
  methods: {
    ...mapActions({
      getMaintenances: (action, page) => action('vehicles/getMaintenances', page)
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
