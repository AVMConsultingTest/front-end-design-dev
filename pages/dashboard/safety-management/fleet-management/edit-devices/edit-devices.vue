<template>
  <div class="h-full">
    <div class="pl-24 pr-28">
      <div class="flex-col justify-center items-start my-8 flex" style="flex: 0.5">
        <h3 class="font-semibold mb-1 mt-4 text-center">
          Edit Devices
        </h3>
      </div>
      <Form fclass="row my-2" @send="handleSubmit">
        <!-- <div class="col-6 mb-6">
          <Input
            v-model.number="request.truck_id"
            name="truckID"
            type="number"
            label="Truck ID"
            rules="required"
          />
        </div> -->
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
            type="datetime-local"
            label="In Service Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.service_end_date"
            name="outOfServiceDate"
            type="datetime-local"
            label="Out of Service Date"
            rules="required"
          />
        </div>
        <div class="col-6 mb-6">
          <Input
            v-model="request.returned_date"
            name="returnedDeviceDate"
            type="datetime-local"
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
              @click="$router.back()"
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
import moment from 'moment'
import {
  SizeTypeEnum,
  ActionTypeEnum,
  ButtonTypeEnum
} from '@/components/ts/enums'
import { DevicesDetails } from '@/models/devices/devicesDetails'
import { SelectOption } from '@/components/ts/interfaces'

export default Vue.extend({
  props: {
    editId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      SizeTypeEnum,
      ActionTypeEnum,
      ButtonTypeEnum,
      request: {} as DevicesDetails,
      testOptions: [
        { id: 1, text: 'BRA', selected: false },
        { id: 2, text: 'Other Option', selected: false }
      ] as SelectOption[]
    }
  },
  computed: {
    device (): DevicesDetails {
      return (this.$store.getters['devices/device'])
    }
  },
  mounted () {
    this.getDevice(this.editId).then(() => {
      setTimeout(() => {
        console.log(this.device)
        this.request = { ...this.device }
      }, 1000)
    })
  },
  methods: {
    ...mapActions({
      getDevice: (action, id) => action('devices/getDevice', id),
      updateDevice: (action, param) => action('devices/updateDevice', param)
    }),
    handleSubmit () {
      const rest = {
        service_start_date: moment().toISOString(),
        service_end_date: moment().toISOString(),
        device_returned_date: moment().toISOString()
      }
      if (this.request.carrier_id) {
        delete this.request.carrier_id
      }
      this.updateDevice(this.request, rest.service_start_date, rest.service_end_date, rest.device_returned_date).then(() => {
        this.$emit('close-drawer')
      })
    }
  }

})
</script>
