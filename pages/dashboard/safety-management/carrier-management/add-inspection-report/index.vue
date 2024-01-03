<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Inspection Report
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_id"
            :multiple="false"
            :searchable="true"
            :options="driverOptions"
            type="text"
            name="driverId"
            label="Driver"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.category"
            name="category"
            type="text"
            label="Category"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.date"
            name="date"
            type="datetime-local"
            label="Date"
            rules="required"
          />
        </div>
        <StateSelects
          :state.sync="request.state"
          :show-only-states="true"
          :api-fetched="request.state?.length > 0"
        />
        <div class="col-6 mb-6">
          <Input
            v-model="request.report_number"
            name="reportNumber"
            type="text"
            label="Report Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.inspection_level"
            name="inspectionLevel"
            type="number"
            label="Inspection Level"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.violation_group"
            name="violationGroup"
            type="text"
            label="Violation Group"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.description"
            name="description"
            type="text"
            label="Description"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.violations_count"
            name="violationCount"
            type="number"
            label="Violations Count"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.sequence"
            name="sequence"
            type="number"
            label="Sequence"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.out_of_service"
            name="outOfService"
            label="Out of Service"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.violation_severity"
            name="violationSeverity"
            type="number"
            label="Violation Severity"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.oos_violation_severity"
            name="oosViolationSeverity"
            type="number"
            label="OOS Violation Severity"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.total_violation_severity"
            name="totalViolationSeverity"
            type="number"
            label="Total Violation Severity"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.time_weight"
            name="timeWeight"
            type="number"
            label="Time Weight"
            rules="required"
          />
        </div>
        <!-- <div class="col-6 mb-6">
          <FileInput
            v-model="request.document_id"
            label="Upload Document"
            name="upDoc"
          />
        </div> -->
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.total_points"
            name="totalPoints"
            type="number"
            label="Total Points"
            rules="required"
          />
        </div>
        <div class="row mt-10 justify-between mx-0">
          <div class="col-3">
            <Button
              :type="ButtonTypeEnum.LINK"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.BUTTON"
              class="!justify-start"
              @click="$emit('close-drawer')"
            >
              Cancel
            </Button>
          </div>
          <div class="col-3 ml-auto">
            <Button :type="ButtonTypeEnum.PRIMARY" :size="SizeTypeEnum.LG" :action="ActionTypeEnum.SUBMIT">
              Continue
            </Button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { InspectionsDetails } from '~/models/inspections/inspectionsDetails'

export default Vue.extend({
  name: 'AddInspectionReport',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as InspectionsDetails,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Completed', selected: true },
        { id: 2, text: 'Not Completed', selected: false }
      ] as SelectOption[],
      testDrugType: [
        { id: 1, text: 'Pre-Employment', selected: true },
        { id: 2, text: 'Random Breath Alcohol', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    carrierId (): number {
      return this.$store.state.carrierId
    },
    driverOptions () {
      const list = this.$store.getters['driver/allDrivers']
      if (list && list.length > 0) {
        return list.map((driver: { id: number, first_name: string, last_name: string }) => {
          return {
            id: driver.id,
            text: `${driver.first_name} ${driver.last_name}`
          }
        })
      } else {
        return []
      }
    }
  },
  created () {
    this.getAllDrivers()
  },
  methods: {
    ...mapActions({
      addInspection: (action, params) => action('inspectionReport/addReport', params),
      getAllDrivers: action => action('driver/getAllDrivers')

    }),
    handleSubmit () {
      this.addInspection({
        ...this.request
      } as InspectionsDetails).then(() => {
        this.$emit('close-drawer')
      })
    }
  }
})
</script>

      <style>
      .m-modal-overlay {
          @apply bg-dark/80 fixed bottom-0 left-0 right-0 top-0 flex justify-center;
      }
      .m-modal-content {
          @apply bg-white rounded-3xl shadow-2xl relative overflow-hidden;
      }
      </style>
