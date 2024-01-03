<template>
  <div class="w-full">
    <PageHeader title="Crash Indicator Details" class="mb-10" @search="''" @goback="$router.go(-1)" />
    <div class="row mb-5">
      <div class="col-12">
        <Table
          title="Crash Indicator"
          icon="receipt-item"
          icon-color="orange"
          :icon-alpha="0"
          :download-enabled="true"
          :icon-rounded="true"
          :headers="headers"
          :data="testData"
        >
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
import { SizeTypeEnum } from '@/components/ts/enums'
import { SelectOption } from '~/components/ts/interfaces'

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
        category: {
          label: 'Category',
          // icon: 'category',
          searchable: true,
          sortable: true
        },
        date: {
          label: 'Date',
          // icon: 'calendar',
          searchable: true,
          sortable: true
        },
        state:
        {
          label: 'State',
          // icon: 'map',
          searchable: true,
          sortable: true
        },
        report_number:
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
        fmcsa_detemination:
        {
          label: 'FMCSA Detemination',
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
        fatality:
        {
          label: 'Fatality',
          // icon: 'cloud-lightning',
          searchable: true,
          sortable: true
        },
        tow_away:
        {
          label: 'Tow Away',
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
        injury:
        {
          label: 'Injury',
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
        violations_severity:
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
        hazmat_release:
        {
          label: 'HAZMAT Release',
          // icon: 'diagram',
          searchable: true,
          sortable: true
        }
      },
      testData: [
        {
          category: 'Crash Indicator',
          date: '6/17/2022',
          state: 'CO',
          report_number: '6BVI0XHX2X',
          upload_document: 'safety.pdf',
          fmcsa_detemination: 'Preventable',
          driver_name: 'Cristian Paul ',
          asset_id: 'Unit 1',
          fatality: 'Yes',
          tow_away: 'Yes',
          violations_count: 3,
          injury: 1,
          out_of_service: 'No',
          violations_severity: 6,
          oos_violation_severity: 0,
          total_violation_severity: 6,
          time_weight: 3,
          hazmat_release: 18
        },
        {
          category: 'Crash Indicator',
          date: '7/21/2022',
          state: 'CT',
          report_number: '67HDG239B4',
          upload_document: 'vehicle.pdf',
          fmcsa_detemination: 'Not Preventable',
          driver_name: 'Angelina Morgan',
          asset_id: 'Unit 2',
          fatality: 'No',
          tow_away: 'No',
          violations_count: 3,
          injury: 2,
          out_of_service: 'No',
          violations_severity: 6,
          oos_violation_severity: 0,
          total_violation_severity: 8,
          time_weight: 3,
          hazmat_release: 24
        },
        {
          category: 'Crash Indicator',
          date: '9/27/2023',
          state: 'DE',
          report_number: '47TY61PHTQ',
          upload_document: 'broker.pdf',
          fmcsa_detemination: 'Preventable',
          driver_name: 'George Brown',
          asset_id: 'Unit 3',
          fatality: 'No',
          tow_away: 'No',
          violations_count: 3,
          injury: 3,
          out_of_service: 'No',
          violations_severity: 6,
          oos_violation_severity: 0,
          total_violation_severity: 8,
          time_weight: 3,
          hazmat_release: 24
        }
      ]
    }
  }
})
</script>

  <style scoped>

  </style>
