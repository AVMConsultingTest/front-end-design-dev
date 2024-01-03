<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Trainings
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.employee_type"
            :addable="true"
            :bind-text="true"
            name="employeeType"
            :options="testEmployeeType"
            label="Employee Type"
            rules="required"
          />
        </div>
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
          <m-select
            v-model="request.type"
            :addable="true"
            :bind-text="true"
            name="trainingType"
            type="text"
            :options="testTrainingType"
            label="Training Type"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.description"
            name="desc"
            type="text"
            label="Training Description"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.cadence"
            :addable="true"
            :bind-text="true"
            name="cadence"
            :options="testCadence"
            label="Cadence"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.completion_date"
            name="compDate"
            type="datetime-local"
            label="Completion Date"
            rules="required"
            :min="minDate"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.status"
            :addable="true"
            :bind-text="true"
            name="status"
            :options="testOptions"
            label="Status"
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
              Save
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
import moment from 'moment'
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { Training } from '~/models/training/training'
export default Vue.extend({
  name: 'AddTrainings',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as Training,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Completed', selected: true },
        { id: 2, text: 'Pending', selected: true },
        { id: 3, text: 'Overdue', selected: false }
      ] as SelectOption[],
      testEmployeeType: [
        { id: 1, text: 'Driver', selected: true },
        { id: 2, text: 'Dispatcher', selected: false }
      ] as SelectOption[],
      testTrainingType: [
        { id: 1, text: 'Road', selected: true },
        { id: 2, text: 'Classroom', selected: false }
      ] as SelectOption[],
      testCadence: [
        { id: 1, text: 'One-time', selected: true },
        { id: 2, text: 'Annual', selected: false }
      ] as SelectOption[],
      minDate: moment(new Date()).format('yyyy-MM-DD')
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
      addTraining: (action, param) => action('training/addTraining', param),
      getAllDrivers: action => action('driver/getAllDrivers')

    }),
    handleSubmit () {
      this.addTraining({ ...this.request })
      this.$emit('close-drawer')
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
