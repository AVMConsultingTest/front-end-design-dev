<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit Incident Report
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.driver_id"
            :multiple="false"
            :searchable="true"
            :options="driverOptions"
            :bind-text="true"
            type="text"
            name="driverId"
            label="Driver"
            rules="required"
          />
        </div>
        <!-- <div class="col-6 mb-6">
          <Input
            v-model="request.driver_name"
            name="type"
            label="Driver Name"
            rules="required"
          />
        </div> -->
        <div class="col-6 mb-6">
          <Input
            v-model="request.unit_number"
            name="type"
            label="Unit Number"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model.number="request.truck_id"
            type="number"
            name="truckId"
            label="Truck ID"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.event_type"
            type="text"
            name="hireDate"
            label="Event Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.date"
            name="Incident Date"
            type="datetime-local"
            label="Incident Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.training_required"
            :options="selectOptions"
            :bind-text="true"
            name="trainingRequired"
            type="text"
            label="Training Required"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.training_completed"
            :options="selectOptions"
            :bind-text="true"
            name="trainingComp"
            type="text"
            label="Training Completed"
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
import { IncidentRegistryDetails } from '~/models/incidentRegistry/incidentRegistryDetails'
export default Vue.extend({
  name: 'AddIncidentRegistryTest',
  props: {
    editId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as IncidentRegistryDetails,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      selectOptions: [
        { id: 1, text: 'No', selected: false },
        { id: 2, text: 'Yes', selected: true }
      ] as SelectOption[],
      testOptions: [
        { id: 1, text: 'Completed', selected: true },
        { id: 2, text: 'Not Completed', selected: false }
      ] as SelectOption[],
      typeOptions: [
        { id: 1, text: 'Company Driver', selected: true },
        { id: 2, text: 'Owner Driver', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    incident (): IncidentRegistryDetails {
      return (this.$store.getters['incidentRegistry/incident'])
    },
    driverOptions () {
      const list = this.$store.getters['driver/allDrivers']
      if (list && list.length > 0) {
        return list.map((driver: { id: number, first_name: string, last_name: string }) => {
          return {
            id: driver.id,
            text: driver.first_name && driver.last_name
          }
        })
      } else {
        return []
      }
    }
  },
  created () {
    this.getAllTrucks()
    this.getAllDrivers()
  },
  mounted () {
    this.getIncident(this.editId).then(() => {
      setTimeout(() => {
        console.log(this.incident)
        this.request = { ...this.incident }
      }, 1000)
    })
  },
  methods: {
    ...mapActions({
      getIncident: (action, id) => action('incidentRegistry/getIncident', id),
      updateIncident: (action, param) => action('incidentRegistry/updateIncident', param),
      getAllTrucks: action => action('truck/getAllTrucks'),
      getAllDrivers: action => action('driver/getAllDrivers')
    }),
    handleSubmit () {
      if (this.request.driver_name) {
        delete this.request.driver_name
      }
      this.updateIncident(this.request).then(() => {
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
