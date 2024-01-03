<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Add Devices
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <div class="col-6 mb-6">
          <m-select
            v-model="request.truck_id"
            :multiple="false"
            :searchable="true"
            name="Truck"
            type="text"
            label="Truck"
            rules="required"
            :options="truckOptions"
          />
        </div>
        <div class="col-6 mb-6">
          <m-select
            v-model="request.type"
            :addable="true"
            :bind-text="true"
            :multiple="false"
            :searchable="true"
            :options="testOptions"
            name="devicesType"
            label="Devices Type"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.vendor"
            name="vendor"
            type="text"
            label="Vendor"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.service_start_date"
            name="inserviceDate"
            type="date"
            label="In Service Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.service_end_date"
            name="outOfServiceDate"
            type="date"
            label="Out of Service Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.returned_date"
            name="returnedDeviceDate"
            type="date"
            label="Returned Device Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.notes"
            name="notes"
            type="text"
            label="Notes"
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
              Go Back
            </Button>
          </div>
          <div class="col-3 ml-auto">
            <Button
              :type="ButtonTypeEnum.PRIMARY"
              :size="SizeTypeEnum.LG"
              :action="ActionTypeEnum.SUBMIT"
            >
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
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { DevicesDetails } from '@/models/devices/devicesDetails'
import { SelectOption } from '@/components/ts/interfaces'
export default Vue.extend({
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as DevicesDetails,
      testOptions: [
        { id: 1, text: 'BRA', selected: true },
        { id: 2, text: 'Other Option', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    truckOptions () {
      const list = this.$store.getters['truck/allTrucks']
      if (list && list.length > 0) {
        return list.map((truck: { id: number, unit_number: string }) => {
          return {
            id: truck.id,
            text: truck.unit_number
          }
        })
      } else {
        return []
      }
    }
  },
  created () {
    this.getAllTrucks()
  },
  methods: {
    ...mapActions({
      addDevice: (action, params: DevicesDetails) => action('devices/addDevice', params),
      getAllTrucks: action => action('truck/getAllTrucks')
    }),
    handleSubmit () {
      // TODO: make api request
      const rest = {
        // carrier_id: this.carrierId
      }
      this.addDevice({ ...this.request, ...rest }).then(() => {
        this.$emit('close-drawer')
      })
    }
  }
})
</script>
