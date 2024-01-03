<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Drug Test
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
          <m-select
            v-model="request.type"
            :addable="true"
            :bind-text="true"
            name="testType"
            :options="testDrugType"
            label="Drug Test Type"
            rules="required"
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
        <div class="col-6 mb-6">
          <Input
            v-model="request.result"
            name="result"
            type="text"
            label="Result"
            rules="required"
          />
        </div>
        <!-- <div class="col-6 mb-6">
          <FileInput label="Document Upload" name="logo" />
        </div> -->
        <div class="col-6 mb-6">
          <Input
            v-model="request.date"
            name="testDate"
            type="datetime-local"
            label="Test Date"
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
import { SelectOption } from '~/components/ts/interfaces'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '~/components/ts/enums'
import { DrugTest } from '~/models/drugs/drugTest'
export default Vue.extend({
  name: 'AddDrugTest',
  data () {
    return {
      ButtonTypeEnum,
      ActionTypeEnum,
      SizeTypeEnum,
      showDrawer: false,
      request: {} as DrugTest,
      selectedState: 0,
      multiSelectedState: [],
      checkBoxTest: false,
      testOptions: [
        { id: 1, text: 'Completed', selected: true },
        { id: 2, text: 'Pending', selected: false },
        { id: 3, text: 'Selected', selected: false }
      ] as SelectOption[],
      testDrugType: [
        { id: 1, text: 'Pre-Employment', selected: true },
        { id: 2, text: 'Random Breath Alcohol', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
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
      addDrugTest: (action, param) => action('drugTest/addDrugTest', param),
      getAllDrivers: action => action('driver/getAllDrivers')
    }),
    handleSubmit () {
      this.addDrugTest({ ...this.request, carrier_id: this.carrierId } as DrugTest)
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
